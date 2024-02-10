SELECT DISTINCT TO_CHAR(A.Start_Time, 'YYYY-MM') as month, COUNT(a.accident_id) FROM Accidents a, Climate_Conditions cc
WHERE A.Observation_ID = cc.observation_id AND cc.category='Snow and Sleet'
GROUP BY TO_CHAR(A.Start_Time, 'YYYY-MM')
ORDER BY TO_CHAR(A.Start_Time, 'YYYY-MM');



SELECT DISTINCT category
from Climate_conditions;