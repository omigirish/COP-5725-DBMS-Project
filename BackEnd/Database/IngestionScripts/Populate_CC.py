import os
import oracledb
from dotenv import load_dotenv
import csv

# Load environment variables from the .env file
load_dotenv()

# Read database credentials from environment variables
db_username = os.environ.get('DB_USERNAME')
db_password = os.environ.get('DB_PASSWORD')
db_dsn = os.environ.get('DB_DSN')  # Replace with your actual DSN

 # Create a connection
connection = oracledb.connect(user=os.environ.get('DB_USERNAME'), password=os.environ.get('DB_PASSWORD'), dsn=os.environ.get('DB_DSN'))
        
# Create a cursor
cursor = connection.cursor()

# SQL statement to insert data
insert_query = """
    INSERT INTO Climate_Conditions (
        Observation_ID, Pressure, Temperature, Precipitation, Visibility,
        Humidity, Category, Wind_direction, Wind_chill, Wind_speed
    ) VALUES (
        :Observation_ID, :Pressure, :Temperature, :Precipitation, :Visibility,
        :Humidity, :Category, :Wind_direction, :Wind_chill, :Wind_speed
    )
"""

csv_file = "./Table_Files/Climate_Conditions.csv"
# Open CSV file and insert data into Oracle DB
with open(csv_file, newline='') as file:
    reader = csv.DictReader(file)
    cursor = connection.cursor()

    i=0
    for row in reader:
        try:
            cursor.execute(insert_query, {
                'Observation_ID': row['Observation_ID'],
                'Pressure': float(row['Pressure(in)']),
                'Temperature': float(row['Temperature(F)']),
                'Precipitation': float(row['Precipitation(in)']),
                'Visibility': float(row['Visibility(mi)']),
                'Humidity': float(row['Humidity(%)']),
                'Category': row['Weather_Condition'],
                'Wind_direction': row['Wind_Direction'],
                'Wind_chill': row['Wind_Chill(F)'],
                'Wind_speed': float(row['Wind_Speed(mph)'])
            })
            print(f"{i} Records Inserted")
            i+=1
        except:
            print("Insert Failed")
    connection.commit()
    cursor.close()

connection.close()