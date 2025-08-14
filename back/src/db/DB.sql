CREATE DATABASE IF NOT EXISTS futbol_equipos;
USE futbol_equipos;

    CREATE TABLE equipos(
        id_equipo INT AUTO_INCREMENT PRIMARY KEY,
        nombre_equipo VARCHAR(100) NOT NULL
    );

    --Insert = POST

    insert into equipos (nombre_equipo)
    values
    ("Alemania",)
    ("Holanda"),
    ("Suecia"),
    ("Frrancia"),
    ("Noruega");

    -- Select = Get
    select * From equipos;