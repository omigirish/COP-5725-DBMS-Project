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


# Define the insert query
insert_query = """
    INSERT INTO Traffic_Stats (
        Stat_ID, Start_Time, Trip_frequency, Trips_lt1, Trips_1_3, Trips_3_5, Trips_5_10,
        Trips_10_25, Trips_25_50, Trips_50_100, Trips_100_250, Trips_250_500, Trips_gt500
    ) VALUES (
        :A, TO_TIMESTAMP(:B, 'YYYY/MM/DD'), :C, :D,
        :E, :F, :G, :H,
        :I, :J, :K,
        :L, :M
    )
"""

csv_file = "./Table_Files/Traffic_stats.csv"

# Open CSV file and insert data into Oracle DB
with open(csv_file, newline='') as file:
    reader = csv.DictReader(file)
    cursor = connection.cursor()
    i=0
    for row in reader:
        cursor.execute(insert_query, {
                'A': row['Row_ID'],
                'B': row['Date'],
                'C': row['Number of Trips'],
                'D': row['Number of Trips <1'],
                'E': row['Number of Trips 1-3'],
                'F': row['Number of Trips 3-5'],
                'G': row['Number of Trips 5-10'],
                'H': row['Number of Trips 10-25'],
                'I': row['Number of Trips 25-50'],
                'J': row['Number of Trips 50-100'],
                'K': row['Number of Trips 100-250'],
                'L': row['Number of Trips 250-500'],
                'M': row['Number of Trips >=500']
            })
        print(f"{i} Records Inserted")
        # except:
        #     print("Insert Failed")
        #     continue
        i+=1

    connection.commit()
    cursor.close()

connection.close()