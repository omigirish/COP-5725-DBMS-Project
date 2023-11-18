import oracledb
import os
def execute_insert_query(query, data):
    try:
        # Create a connection
        connection = oracledb.connect(user=os.environ.get('DB_USERNAME'), password=os.environ.get('DB_PASSWORD'), dsn=os.environ.get('DB_DSN'))
        
        # Create a cursor
        cursor = connection.cursor()
        
        # Execute the INSERT query with data
        cursor.execute(query, data)
        
        # Commit the changes to the database
        connection.commit()

        print("Insert successful")

    except oracledb.DatabaseError as error:
        print("Oracle Database Error:", error)
        
        # Rollback changes in case of an error
        connection.rollback()

    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()