import oracledb
import os
def execute_select_query(query):
    try:
        # Create a connection
        connection = oracledb.connect(user=os.environ.get('DB_USERNAME'), password=os.environ.get('DB_PASSWORD'), dsn=os.environ.get('DB_DSN'))
        
        # Create a cursor
        cursor = connection.cursor()
        
        # Execute the SELECT query
        cursor.execute(query)
        
        # Fetch the result set
        result = cursor.fetchall()
        
        return result

    except oracledb.DatabaseError as error:
        print("Oracle Database Error:", error)

    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()


