DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    dob VARCHAR(8),
    name VARCHAR(255),
    UNIQUE(email)
);


DROP TABLE IF EXISTS reports;

CREATE TABLE IF NOT EXISTS reports (
    week INT NOT NULL,
    texts TEXT
);


INSERT INTO reports (week, texts) VALUES
(0, "Hej! Jag heter deel18 och studerar för tillfället webbprogrammering vid BTH!")
;
