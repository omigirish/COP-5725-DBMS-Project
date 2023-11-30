
import pandas as pd

accidents= pd.read_csv("./Datasets/Accidents.csv")

print(accidents.columns)

Observation_ID = 1
Accident_ID = 1
Stat_ID= 1

location_rows=['City', 'State','Zipcode']

time_rows=['Start_Time', 'End_Time', 'Timezone','Civil_Twilight']

climate_conditions_rows=['Temperature(F)', 'Wind_Chill(F)', 'Humidity(%)',
       'Pressure(in)', 'Visibility(mi)', 'Wind_Direction', 'Wind_Speed(mph)',
       'Precipitation(in)', 'Weather_Condition']


infrastructure_rows=['Bump', 'Crossing', 'Give_Way', 'Junction', 'No_Exit', 'Railway',
       'Roundabout', 'Station', 'Stop', 'Traffic_Calming', 'Traffic_Signal',
       'Turning_Loop']

accident_rows=['Start_Time','Severity', 'Distance(mi)','Zipcode']


location_file= open('./Table_Files/Location.csv', 'w')
time_file= open('./Table_Files/Time.csv', 'w')
climate_conditions_file= open('./Table_Files/Climate_Conditions.csv', 'w')
infrastructure_file= open('./Table_Files/Infrastructure.csv', 'w')
accident_file= open('./Table_Files/Accidents.csv', 'w')
happened_near_file= open('./Table_Files/Happened_Near.csv', 'w')
recorded_at_file= open('./Table_Files/Recorded_At.csv', 'w')
traffic_stat_file = open('./Table_Files/Traffic_stats.csv', 'w')

# Write File Headers
climate_conditions_file.write( 'Observation_ID' + ',' + ','.join(climate_conditions_rows) + '\n')

time_file.write(','.join(time_rows) + '\n')

location_file.write(','.join(location_rows) + '\n')

infrastructure_file.write( f"Infra_ID, {','.join(infrastructure_rows)} \n")

accident_file.write( "Accident_ID,Observation_ID,Start_timestamp,Severity,Distance(mi),Zipcode\n")

happened_near_file.write( "Accident_ID,Infra_ID \n")

recorded_at_file.write("Stat_ID, Loc_ID \n")

I=set()
L=set()

for _, row in accidents.iterrows():
    climate_conditions_file.write( 'O'+ str(Observation_ID) + ',' + ','.join(str(row[col]) for col in climate_conditions_rows) + '\n')
    
    time_file.write( ','.join(str(row[col]) for col in time_rows) + '\n')

    if row['Zipcode'] not in L:
        location_file.write( ','.join(str(row[col]) for col in location_rows) + '\n')
        L.add(row['Zipcode'])
    
    Infra_ID = int(''.join(str(row[col]) for col in infrastructure_rows),2)
    
    if Infra_ID not in I:
        infrastructure_file.write( 'I'+ str(Infra_ID) + ',' + ','.join(str(row[col]) for col in infrastructure_rows) + '\n')
        I.add(Infra_ID)
    
    accident_file.write( f"A{str(Accident_ID)},O{Observation_ID},{','.join(str(row[col]) for col in accident_rows)}\n")

    happened_near_file.write( f"A{str(Accident_ID)},I{Infra_ID}\n")

    # recorded_at_file.write( f"{str(Stat_ID)}, {row['Zipcode']} \n")

    Observation_ID+=1
    Accident_ID+=1


trips = pd.read_csv("./Datasets/Trips.csv")
print(trips.columns)

recorded_at_rows=['Stat_ID', 'Loc_ID']

traffic_stat_rows = ['Row ID', 'Date', 'Number of Trips', 'Number of Trips <1',
       'Number of Trips 1-3', 'Number of Trips 3-5', 'Number of Trips 5-10',
       'Number of Trips 10-25', 'Number of Trips 25-50',
       'Number of Trips 50-100', 'Number of Trips 100-250',
       'Number of Trips 250-500', 'Number of Trips >=500']

traffic_stat_file.write(','.join(traffic_stat_rows) + '\n')
recorded_at_file.write("Row ID,State\n")
for _, row in trips.iterrows():

    traffic_stat_file.write(','.join(str(row[col]) for col in traffic_stat_rows) + '\n')
    recorded_at_file.write( f"{row['Row_ID']}, {row['State']} \n")

    Observation_ID+=1
    Accident_ID+=1

print("Done")