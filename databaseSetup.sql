

CREATE TABLE subject (
    id int primary key,
    active boolean,
    hasSubjects boolean,
    hasTables boolean,
    childrenSubject integer[],
    parentSubject integer,
    tables text[]
)

CREATE TABLE table (
    id text primary key,
    parentSubject integer,
    variables text[],
    firstPeriod text,
    lastPeriod text,
    frequency text
)

CREATE TABLE variables {
    id text primary key,
    units text[],
    tables text[]
}

CREATE TABLE units {
    id text primary key,
    variables text[],
    tables text[]
}
