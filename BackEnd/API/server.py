from datetime import datetime, timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS,cross_origin
import oracledb
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()


# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Establish Oracle DB connection
connection = oracledb.connect(user=os.environ.get('DB_USERNAME'),
                               password=os.environ.get('DB_PASSWORD'),
                               dsn=os.environ.get('DB_DSN'))

@app.route('/total_tuples', methods=['GET'])
@cross_origin(origin='*')
def get_total_tuples():
    try:
        cursor = connection.cursor()

        # Retrieve total tuples in each table
        tables = ['Climate_Conditions', 'Infrastructure', 'Time', 'Traffic_Stats', 'Location', 'Accidents', 'Recorded_At', 'Happened_Near']
        table_counts = {}
        for table in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            table_counts[table] = count

        cursor.close()
        return jsonify(table_counts), 200

    except oracledb.Error as error:
        return jsonify({"error": str(error)}), 500
    
@app.route('/total_accidents_per_year', methods=['GET'])
def total_accidents_per_year():
    try:
        cursor = connection.cursor()

        # SQL query to calculate total accidents per year
        query = """
        SELECT TO_CHAR(T.Start_Time, 'YYYY') AS year, COUNT(*) AS total_accidents
        FROM Accidents A, Time T
        WHERE A.Start_Time = T.Start_Time
        GROUP BY TO_CHAR(T.Start_Time, 'YYYY')
        ORDER BY year
        """

        cursor.execute(query)
        result = dict(cursor.fetchall())

        cursor.close()
        return jsonify({"years":list(result.keys()),"accidents":list(result.values())}), 200

    except oracledb.Error as error:
        return jsonify({"error": str(error)}), 500
    
def increment_date(current_date_str):
    # Assuming input format is YYYY-MM
    current_date = datetime.strptime(current_date_str, '%Y-%m')

    # Get the year and month from the current date
    current_year = current_date.year
    current_month = current_date.month

    # Increment by one month
    new_month = current_month + 1
    new_year = current_year + (new_month // 12)  # Increment year if the month exceeds 12
    new_month %= 12  # Reset month to 1 if it's 13
    if new_month == 0:  # Change 0 to 12 for December
        new_month = 12

    # Construct the new date in 'YYYY-MM' format
    new_date_str = f'{new_year:04d}-{new_month:02d}'
    return new_date_str

@app.route('/deviation_query', methods=['POST'])
def deviation_query():
    data = request.json
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    state = data.get('state')

    cursor = connection.cursor()

    results = {'days': [], 'dprep': [], 'dvis': [], 'dpressure': [], 'dwind_chill': [], 'dhumidity': [], 'dwind_speed': [],'accident_count':[]}
    current_date = start_date
    while current_date <= end_date:
        query = f"""
            SELECT monthly_state.month, 
                (monthly_state.monthly_precipitation - yearly_state.yearly_precipitation) as mprep,
                (monthly_state.monthly_visibility - yearly_state.yearly_visibility) as mvis,
                (monthly_state.monthly_pressure - yearly_state.yearly_pressure) as mpressure,
                (monthly_state.monthly_wind_chill - yearly_state.yearly_wind_chill) as mwind_chill,
                (monthly_state.monthly_humidity - yearly_state.yearly_humidity) as mhumidity,
                (monthly_state.monthly_wind_speed - yearly_state.yearly_wind_speed) as mwind_speed,
                monthly_state.accident_count
            FROM
                (
                    SELECT DISTINCT TO_CHAR(A.Start_Time, 'MM-YYYY') as month, 
                                    AVG(cc.precipitation) OVER (PARTITION BY L.state) as monthly_precipitation,
                                    AVG(cc.visibility) OVER (PARTITION BY L.state) as monthly_visibility,
                                    AVG(cc.pressure) OVER (PARTITION BY L.state) as monthly_pressure,
                                    AVG(cc.wind_chill) OVER (PARTITION BY L.state) as monthly_wind_chill,
                                    AVG(cc.humidity) OVER (PARTITION BY L.state) as monthly_humidity,
                                    AVG(cc.wind_speed) OVER (PARTITION BY L.state) as monthly_wind_speed,
                                    Count(a.accident_id) OVER (PARTITION BY L.state) as accident_count,
                                    L.state  
                    FROM Accidents A, Climate_Conditions CC, Time T, Location L
                    WHERE a.start_time = T.start_time
                        AND a.observation_id = cc.observation_id 
                        AND L.zip_code = a.zipcode
                        AND TO_CHAR(a.Start_Time, 'YYYY-MM') = '{current_date}'
                        AND L.state = '{state}'
                ) monthly_state,
                
                (
                    SELECT DISTINCT TO_CHAR(A.Start_Time, 'YYYY') as month, 
                        AVG(cc.precipitation) OVER (PARTITION BY L.state) as yearly_precipitation,
                        AVG(cc.visibility) OVER (PARTITION BY L.state) as yearly_visibility,
                        AVG(cc.pressure) OVER (PARTITION BY L.state) as yearly_pressure,
                        AVG(cc.wind_chill) OVER (PARTITION BY L.state) as yearly_wind_chill,
                        AVG(cc.humidity) OVER (PARTITION BY L.state) as yearly_humidity,
                        AVG(cc.wind_speed) OVER (PARTITION BY L.state) as yearly_wind_speed,
                        L.state  
                    FROM Accidents A, Climate_Conditions CC, Time T, Location L
                    WHERE a.start_time = T.start_time 
                        AND a.observation_id = cc.observation_id 
                        AND L.zip_code = a.zipcode
                        AND TO_CHAR(a.Start_Time, 'YYYY') = '{current_date[:4]}'  -- Extracting the year part
                        AND L.state = '{state}'
                ) yearly_state
            WHERE monthly_state.state = yearly_state.state
        """
        cursor.execute(query)
        result = cursor.fetchall()
        # results.extend(result)
        if result:
            results['days'].append(result[0][0])
            results['dprep'].append(result[0][1])
            results['dvis'].append(result[0][2])
            results['dpressure'].append(result[0][3])
            results['dwind_chill'].append(result[0][4])
            results['dhumidity'].append(result[0][5])
            results['dwind_speed'].append(result[0][6])
            results['accident_count'].append(result[0][7])

        # Increment date for the next iteration
        # This depends on how you format dates in your database
        # For instance, in Oracle, you might use something like:
        current_date = increment_date(current_date)  # assuming 1 day increment

    cursor.close()
    
    return jsonify(results)


if __name__ == '__main__':
    port = 3000  # Specify the port number
    app.run(debug=True, port=port)
    print(f"Server running on port {port}")
