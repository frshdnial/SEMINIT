-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS seminit_db;
USE seminit_db;

-- Create the meetings table
CREATE TABLE IF NOT EXISTS meetings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NULL,
    date DATE NULL,
    start_time TIME NULL,
    end_time TIME NULL,
    participants TEXT NULL,      -- Can store comma-separated names or JSON arrays
    agenda TEXT NULL,            -- Can store agenda bullet points
    audio_path VARCHAR(255) NULL, -- Relative storage path of uploaded MP3/WAV/M4A file (e.g. meeting_audio/xyz.mp3)
    status VARCHAR(50) DEFAULT 'Pending Audio',
    transcript LONGTEXT NULL,    -- LongText to prevent cutoff of lengthy audio transcriptions
    summary LONGTEXT NULL,       -- LongText for full Markdown/structured minutes content
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;