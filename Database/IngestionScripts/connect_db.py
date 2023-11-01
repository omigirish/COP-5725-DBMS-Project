import os
from dotenv import load_dotenv
from Insert import execute_insert_query
from Select import execute_select_query

# Load environment variables from the .env file
load_dotenv()

# Read database credentials from environment variables
db_username = os.environ.get('DB_USERNAME')
db_password = os.environ.get('DB_PASSWORD')
db_dsn = os.environ.get('DB_DSN')  # Replace with your actual DSN


select_query = "SELECT * FROM encompasses"
select_result = execute_select_query(select_query)
for row in select_result:
    print(row)


