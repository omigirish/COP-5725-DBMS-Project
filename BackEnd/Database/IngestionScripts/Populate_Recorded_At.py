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
    INSERT INTO Recorded_At (
        Stat_ID, State
    ) VALUES (
        :Stat_ID, :State
    )
"""

csv_file = "./Table_Files/Recorded_At.csv"

# Open CSV file and insert data into Oracle DB
with open(csv_file, newline='') as file:
    reader = csv.DictReader(file)
    cursor = connection.cursor()
    i=0
    for row in reader:
        cursor.execute(insert_query, {
                'Stat_ID': row['Stat_ID'],
                'State': row['State']
            })
        print(f"{i} Records Inserted")
        i+=1

    connection.commit()
    cursor.close()

connection.close()