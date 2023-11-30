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
    INSERT INTO Infrastructure(
        Infra_ID, Bump, Crossing, Give_Way, Junction, No_Exit,
        Railway, Roundabout, Station, Stop, Traffic_Calming,
        Traffic_Signal, Turning_Loop
    ) VALUES (
        :Infra_ID, :Bump, :Crossing, :Give_Way, :Junction, :No_Exit,
        :Railway, :Roundabout, :Station, :Stop, :Traffic_Calming,
        :Traffic_Signal, :Turning_Loop
    )
"""

csv_file = "./Table_Files/Infrastructure.csv"

# Open CSV file and insert data into Oracle DB
with open(csv_file, newline='') as file:
    reader = csv.DictReader(file)
    cursor = connection.cursor()

    for row in reader:
        
        cursor.execute(insert_query, {
            'Infra_ID': row['Infra_ID'],
            'Bump': int(row['Bump']),
            'Crossing': int(row['Crossing']),
            'Give_Way': int(row['Give_Way']),
            'Junction': int(row['Junction']),
            'No_Exit': int(row['No_Exit']),
            'Railway': int(row['Railway']),
            'Roundabout': int(row['Roundabout']),
            'Station': int(row['Station']),
            'Stop': int(row['Stop']),
            'Traffic_Calming': int(row['Traffic_Calming']),
            'Traffic_Signal': int(row['Traffic_Signal']),
            'Turning_Loop': int(row['Turning_Loop'])
        })
        print("Record Inserted")

    connection.commit()
    cursor.close()

connection.close()