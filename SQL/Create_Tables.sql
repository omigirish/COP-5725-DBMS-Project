-- Create Table Commands

-- Climate Conditions 
CREATE TABLE Climate_Conditions (
    Observation_ID VARCHAR(255) PRIMARY KEY,
    Pressure REAL,
    Temperature REAL,
    Precipitation REAL,
    Visibility REAL,
    Humidity REAL,
    Category VARCHAR(255),
    Wind_direction VARCHAR(255),
    Wind_chill VARCHAR(255),
    Wind_speed REAL
);

SELECT * FROM Climate_Conditions;

--Create table for Infrastructure:
CREATE TABLE Infrastructure (
    Infra_ID VARCHAR(255) PRIMARY KEY,
    Infra_name VARCHAR(255)
);
SELECT * FROM Infrastructure;

--Create table for Time
CREATE TABLE Time (
    Start_timestamp DATE PRIMARY KEY,
    Civil_twilight VARCHAR(255),
    Time_zone VARCHAR(255),
    End_timestamp DATE,
    Impact_duration NUMBER,
    CONSTRAINT CK_Civil_twilight CHECK (Civil_twilight IN ('Day', 'Night')),
    CONSTRAINT CK_Time_zone CHECK (Time_zone IN ('US/Eastern', 'US/Pacific', 'US/Central', 'US/Mountain'))
);

SELECT * FROM Time;

--Create table for Location
CREATE TABLE Location (
    Loc_ID VARCHAR(255) PRIMARY KEY,
    State VARCHAR(255),
    Country VARCHAR(255),
    State_FIPS VARCHAR(255),
    Zip_code VARCHAR(255),
    Street_name VARCHAR(255),
    Street_no VARCHAR(255),
    City VARCHAR(255),
    Start_lat VARCHAR(255),
    End_lat VARCHAR(255),
    Start_long VARCHAR(255),
    End_long VARCHAR(255)
);

SELECT * FROM Location;

--Create table for Traffic Statistics
CREATE TABLE Traffic_Stats (
    Stat_ID VARCHAR(255) PRIMARY KEY,
    Start_timestamp DATE,
    Trip_frequency INT,
    F_1 INT,
    F_1_3 INT,
    F_3_5 INT,
    F_5_10 INT,
    F_10_25 INT,
    F_25_50 INT,
    F_50_100 INT,
    F_100_250 INT,
    F_250_500 INT,
    F_500 INT,
    FOREIGN KEY(Start_timestamp) REFERENCES Time(Start_timestamp)
);

SELECT * FROM Traffic_Stats;

--Create table for Accidents
CREATE TABLE Accidents (
    Accident_ID VARCHAR(255) PRIMARY KEY,
    Observation_ID VARCHAR(255),
    Start_timestamp DATE,
    Loc_ID VARCHAR(255),
    Severity VARCHAR(255),
    Description VARCHAR(255),
    Distance VARCHAR(255),
    Side VARCHAR(255),
    FOREIGN KEY (Observation_ID) REFERENCES Climate_Conditions(Observation_ID),
    FOREIGN KEY (Loc_ID) REFERENCES Location(Loc_ID),
    FOREIGN KEY(Start_timestamp) REFERENCES Time(Start_timestamp),
    CONSTRAINT CK_Severity CHECK (Severity IN (1, 2, 3, 4))
);

SELECT * FROM Accidents;

--Create table for Happened Near:
CREATE TABLE Happened_Near (
    Accident_ID VARCHAR(255),
    Infra_ID VARCHAR(255),
    FOREIGN KEY (Accident_ID) REFERENCES Accidents(Accident_ID),
    FOREIGN KEY (Infra_ID) REFERENCES Infrastructure(Infra_ID)
);

SELECT * FROM Happened_Near;

--Create table for Recorded At
CREATE TABLE Recorded_At (
    Stat_ID VARCHAR(255),
    Loc_ID VARCHAR(255),
    FOREIGN KEY (Stat_ID) REFERENCES Traffic_Stats(Stat_ID),
    FOREIGN KEY (Loc_ID) REFERENCES Location(Loc_ID)
);

SELECT * FROM Recorded_At;

