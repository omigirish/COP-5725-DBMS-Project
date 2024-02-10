SELECT 
    TO_CHAR(Start_Time, 'YYYY-MM'),
    ROUND(AVG(normalised_impact_duration), 10) as normalised_average_impact_duration
FROM 
    (
        SELECT
            t.start_time,
            ((EXTRACT(SECOND FROM (t.end_time - t.start_time)) - min_impact_duration) / 
            (max_impact_duration - min_impact_duration)) as normalised_impact_duration 
        FROM 
            Accidents a, 
            location l, 
            time t,
            (
                SELECT MAX(EXTRACT(SECOND FROM (t.end_time - t.start_time))) as max_impact_duration
                FROM Accidents a, location l, time t 
                WHERE a.zipcode = l.zip_code AND a.start_time = t.start_time
            ) max_dur,
            (
                SELECT MIN(EXTRACT(SECOND FROM (t.end_time - t.start_time))) as min_impact_duration
                FROM Accidents a, location l, time t 
                WHERE a.zipcode = l.zip_code AND a.start_time = t.start_time
            ) min_dur
        WHERE 
            a.zipcode = l.zip_code AND a.start_time = t.start_time
            AND l.state='CA'
    ) normalized_table
GROUP BY TO_CHAR(Start_Time, 'YYYY-MM')
ORDER BY TO_CHAR(Start_Time, 'YYYY-MM');
