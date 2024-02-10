SELECT DISTINCT TO_CHAR(A.Start_Time, 'YYYY-MM') as month, COUNT(a.accident_id) FROM ACCIDENTS A, LOCATION L
WHERE A.zipcode = l.zip_code
AND l.state='FL'
GROUP BY TO_CHAR(A.Start_Time, 'YYYY-MM')
ORDER BY TO_CHAR(A.Start_Time, 'YYYY-MM');




