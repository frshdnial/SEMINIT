CREATE DATABASE IF NOT EXISTS Seminit
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE Seminit;

DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS MeetingReport;
DROP TABLE IF EXISTS Audio;
DROP TABLE IF EXISTS Transcript;
DROP TABLE IF EXISTS Skill;
DROP TABLE IF EXISTS User;

CREATE TABLE User(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(200) NOT NULL,
    password_hash varchar(255) NOT NULL,
    UserID varchar(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE MeetingReport(
    MeetingID INT AUTO_INCREMENT PRIMARY KEY,
    DateTime VARCHAR(200) NOT NULL,
    Description TEXT,
    Duration INT,
    Title VARCHAR(200) NOT NULL,
    CONSTRAINT fk_User_Meeting
    FOREIGN KEY (User_ID) REFERENCES User(UserID)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Audio(
    AudioID VARCHAR(100) NOT NULL UNIQUE,
    FileFormat VARCHAR(100) NOT NULL,
    FilePath VARCHAR(200) NOT NULL,
    FileSize INT,
    CONSTRAINT fk_Meeting_Audio
    FOREIGN KEY (Meeting_ID) REFERENCES MeetingReport(MeetingID)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Transcript(
    TranscriptID VARCHAR(100) NOT NULL UNIQUE,
    GeneratedTime DATE,
    Text TEXT,
    CONSTRAINT fk_Meeting_Transcript
    FOREIGN KEY (Meeting_ID) REFERENCES MeetingReport(MeetingID)
    ON DELETE CASCADE
) ENGINE=InnoDB;