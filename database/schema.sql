CREATE DATABASE IF NOT EXISTS travel_community
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE travel_community;

CREATE TABLE IF NOT EXISTS users (
  user_ID INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  tel_number VARCHAR(40),
  fax_number VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS address_book (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  unit_name VARCHAR(120) NOT NULL,
  tel_number VARCHAR(40),
  fax_number VARCHAR(40),
  email VARCHAR(255),
  remark TEXT,
  user_ID INT NOT NULL,
  CONSTRAINT fk_address_user FOREIGN KEY (user_ID) REFERENCES users(user_ID)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bulletins (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL,
  bulletin_text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS trips (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  trip_name VARCHAR(160) NOT NULL,
  intro TEXT,
  img_url TEXT
);
