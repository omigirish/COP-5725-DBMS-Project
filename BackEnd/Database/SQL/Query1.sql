-- Working query
SELECT daily_state.day, 
       (daily_state.daily_precipitation - monthly_state.monthly_precipitation) as dprep,
       (daily_state.daily_visibility - monthly_state.monthly_visibility) as dvis,
       (daily_state.daily_pressure - monthly_state.monthly_pressure) as dpressure,
       (daily_state.daily_wind_chill - monthly_state.monthly_wind_chill) as dwind_chill,
       (daily_state.daily_humidity - monthly_state.monthly_humidity) as dhumidity,
       (daily_state.daily_wind_speed - monthly_state.monthly_wind_speed) as dwind_speed,
       daily_state.state,
       daily_state.accident_count
FROM
    (
        SELECT DISTINCT TO_CHAR(A.Start_Time, 'DD-MM-YYYY') as day, 
                        AVG(cc.precipitation) OVER (PARTITION BY L.state) as daily_precipitation,
                        AVG(cc.visibility) OVER (PARTITION BY L.state) as daily_visibility,
                        AVG(cc.pressure) OVER (PARTITION BY L.state) as daily_pressure,
                        AVG(cc.wind_chill) OVER (PARTITION BY L.state) as daily_wind_chill,
                        AVG(cc.humidity) OVER (PARTITION BY L.state) as daily_humidity,
                        AVG(cc.wind_speed) OVER (PARTITION BY L.state) as daily_wind_speed,
                        Count(a.accident_id) OVER (PARTITION BY L.state) as accident_count,
                        L.state  
        FROM Accidents A, Climate_Conditions CC, Time T, Location L
        WHERE a.start_time= T.start_time
              AND a.observation_id = cc.observation_id 
              AND L.zip_code = a.zipcode
              AND TO_CHAR(a.Start_Time, 'DD-MM-YYYY') = '18-06-2020'
    ) daily_state,
    
    (
        SELECT DISTINCT TO_CHAR(A.Start_Time, 'MM-YYYY') as day, 
               AVG(cc.precipitation)  OVER (PARTITION BY L.state) as monthly_precipitation,
               AVG(cc.visibility) OVER (PARTITION BY L.state) as monthly_visibility,
               AVG(cc.pressure) OVER (PARTITION BY L.state) as monthly_pressure,
               AVG(cc.wind_chill) OVER (PARTITION BY L.state) as monthly_wind_chill,
               AVG(cc.humidity) OVER (PARTITION BY L.state) as monthly_humidity,
               AVG(cc.wind_speed) OVER (PARTITION BY L.state) as monthly_wind_speed,
               L.state  
        FROM Accidents A, Climate_Conditions CC, Time T, Location L
        WHERE a.start_time= T.start_time 
              AND a.observation_id = cc.observation_id AND L.zip_code = a.zipcode
              AND TO_CHAR(a.Start_Time, 'MM-YYYY') = '06-2020'
    ) monthly_state
    
WHERE daily_state.state = monthly_state.state
      AND daily_state.state= 'FL';


-- Test Query

SELECT daily_state.day, 
    (daily_state.daily_precipitation - monthly_state.monthly_precipitation) as dprep,
    (daily_state.daily_visibility - monthly_state.monthly_visibility) as dvis,
    (daily_state.daily_pressure - monthly_state.monthly_pressure) as dpressure,
    (daily_state.daily_wind_chill - monthly_state.monthly_wind_chill) as dwind_chill,
    (daily_state.daily_humidity - monthly_state.monthly_humidity) as dhumidity,
    (daily_state.daily_wind_speed - monthly_state.monthly_wind_speed) as dwind_speed,
    daily_state.accident_count
FROM
    (
        SELECT DISTINCT TO_CHAR(A.Start_Time, 'DD-MM-YYYY') as day, 
                        AVG(cc.precipitation) OVER (PARTITION BY L.state) as daily_precipitation,
                        AVG(cc.visibility) OVER (PARTITION BY L.state) as daily_visibility,
                        AVG(cc.pressure) OVER (PARTITION BY L.state) as daily_pressure,
                        AVG(cc.wind_chill) OVER (PARTITION BY L.state) as daily_wind_chill,
                        AVG(cc.humidity) OVER (PARTITION BY L.state) as daily_humidity,
                        AVG(cc.wind_speed) OVER (PARTITION BY L.state) as daily_wind_speed,
                        Count(a.accident_id) OVER (PARTITION BY L.state) as accident_count,
                        L.state  
        FROM Accidents A, Climate_Conditions CC, Time T, Location L
        WHERE a.start_time = T.start_time
            AND a.observation_id = cc.observation_id 
            AND L.zip_code = a.zipcode
            AND TO_CHAR(a.Start_Time, 'YYYY-MM-DD') = '2022-01-05'
            AND L.state = 'FL'
    ) daily_state,
    
    (
        SELECT DISTINCT TO_CHAR(A.Start_Time, 'MM-YYYY') as day, 
               AVG(cc.precipitation) OVER (PARTITION BY L.state) as monthly_precipitation,
               AVG(cc.visibility) OVER (PARTITION BY L.state) as monthly_visibility,
               AVG(cc.pressure) OVER (PARTITION BY L.state) as monthly_pressure,
               AVG(cc.wind_chill) OVER (PARTITION BY L.state) as monthly_wind_chill,
               AVG(cc.humidity) OVER (PARTITION BY L.state) as monthly_humidity,
               AVG(cc.wind_speed) OVER (PARTITION BY L.state) as monthly_wind_speed,
               L.state  
        FROM Accidents A, Climate_Conditions CC, Time T, Location L
        WHERE a.start_time = T.start_time 
            AND a.observation_id = cc.observation_id 
            AND L.zip_code = a.zipcode
            AND TO_CHAR(a.Start_Time, 'YYYY-MM') = '2022-01'
            AND L.state = 'FL'
    ) monthly_state
WHERE daily_state.state = monthly_state.state;



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
            AND TO_CHAR(a.Start_Time, 'YYYY-MM') = '2022-01'
            AND L.state = 'FL'
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
            AND TO_CHAR(a.Start_Time, 'YYYY') = '2022'
            AND L.state = 'FL'
    ) yearly_state
WHERE monthly_state.state = yearly_state.state;











