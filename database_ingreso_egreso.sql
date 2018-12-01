-- Database: egreso_ingreso

-- DROP DATABASE egreso_ingreso;

CREATE DATABASE egreso_ingreso
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'es_PE.UTF-8'
    LC_CTYPE = 'es_PE.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


-- TABLA PERSONA
CREATE TABLE public.persona
(
    id_persona serial,
    nom_persona character varying(60),
    ape_pate_pers character varying(60),
    ape_mate_pers character varying(60),
    nro_documento character varying(8),
    foto_persona character varying(150),
    usuario character varying(60),
    clave character varying(16),
    PRIMARY KEY (id_persona)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.persona
    OWNER to postgres;

--EXTENSION PARA QUITAR ACENTO
CREATE EXTENSION unaccent;

--CREAR TABLA PARA EL INGRESO Y EGRESO
-- Table: public.movimiento

-- DROP TABLE public.movimiento;

CREATE TABLE public.movimiento
(
    id integer NOT NULL DEFAULT nextval('movimiento_id_seq'::regclass),
    descripcion character varying(120) COLLATE pg_catalog."default",
    monto numeric(8,2),
    tipo character varying(60) COLLATE pg_catalog."default",
    _id_persona integer,
    CONSTRAINT movimiento_pkey PRIMARY KEY (id),
    CONSTRAINT fk__id_persona FOREIGN KEY (_id_persona)
        REFERENCES public.persona (id_persona) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
