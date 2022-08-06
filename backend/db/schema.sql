DROP DATABASE IF EXISTS data_center;
CREATE DATABASE data_center;

\c data_center;

CREATE TABLE mentors(
    mentor_id SERIAL PRIMARY KEY,
    mentor_fname VARCHAR(50),
    mentor_lname VARCHAR(50),
    bio TEXT,
    email TEXT,
    speciality TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    mentor_image TEXT DEFAULT NULL
);

--users table
CREATE TABLE users(
    uid SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    email TEXT,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    mentor_id INTEGER REFERENCES mentors(mentor_id),
    user_image TEXT DEFAULT NULL

);

--resources
CREATE TABLE resources(
    resource_id SERIAL PRIMARY KEY,
    resource_name VARCHAR(100) NOT NULL,
    description TEXT,
    resource_category VARCHAR(100),
    resourceFor TEXT [],
    start_datetime TEXT,
    end_datetime TEXT,
    url TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE users_resources(
    uid INTEGER REFERENCES users(uid) ON DELETE CASCADE,
    resource_id INTEGER REFERENCES resources(resource_id) ON DELETE CASCADE,
    UNIQUE(uid,resource_id)
);
-- save owners images
CREATE TABLE photos(
    photo_id SERIAL PRIMARY KEY,
    owner_name VARCHAR(50) NOT NULL,
    photo TEXT NOT NULL
);

-- session table
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");