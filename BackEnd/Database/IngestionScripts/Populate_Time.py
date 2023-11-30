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
# SQL statement to insert data
# SQL statement to insert data
insert_query = """
    INSERT INTO Time (Start_Time, End_Time, Time_zone, Civil_twilight)
    VALUES (TO_TIMESTAMP(:Start_Time, 'YYYY-MM-DD HH24:MI:SS.FF9'), TO_TIMESTAMP(:End_Time, 'YYYY-MM-DD HH24:MI:SS.FF9'), :Timezone, :Civil_Twilight)
"""


csv_file = "./Table_Files/Time.csv"

# Open CSV file and insert data into Oracle DB
with open(csv_file, newline='') as file:
    reader = csv.DictReader(file)
    cursor = connection.cursor()
    i=0
    for row in reader:
        try:
            cursor.execute(insert_query, {
                'Start_Time': row['Start_Time'],
                'End_Time': row['End_Time'],
                'Timezone': row['Timezone'],
                'Civil_Twilight': row['Civil_Twilight']
            })
            print(f"{i} Records Inserted")
        except:
            print("Insert Failed")
            continue
        
        i+=1

    connection.commit()
    cursor.close()

connection.close()