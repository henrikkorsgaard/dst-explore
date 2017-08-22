const {Pool} = require("pg");
const DATABASE = 'postgres://localhost:5432/dst';//figure this out please
const pool = new Pool({
    connectionString: DATABASE
});

module.exports = {
    getSubjects: (cb)=>{
        pool.query("SELECT * FROM subjects;", (err, res) => {
            if(err){
                console.error(err)
            }
            console.log(res)
        });
    },
    getSubject: (id, cb) => {

    },
    upsertSubject: (id, subject) => {
        var sql = "SELECT * FROM subjects WHERE id="+id+";"
        pool.query(sql, (err, res) => {
            if(err){
                console.error(err)
            }
            if(res.rowCount === 0){
                sql = "INSERT INTO subjects (id, description, hasTables, hasSubjects, childSubjects, parentSubject, tables)";
                sql += "VALUES ("+id+","+subject.description+","+subject.hasTables+","+subject.hasSubjects+","+subject.childSubjects+","+subject.parentSubject+","+subject.tables+")";
            } else {
                sql = "UPDATE subjects";
                sql += " SET hasTables ="+subject.hasTables+",hasSubjects="+subject.hasSubjects
                sql += ",childSubjects="+subject.childSubjects+",tables="+subject.tables
                sql += " WHERE id="+id+";"
                //update
            }
            pool.query(sql, (err, res) => {
                if(err){
                    console.error(err)
                } else {
                    console.log(res);
                }
            });
        });

    },
    setupDatabase: () => {
        createDB();
    }
}

function createDB(){
    var short_pool = new Pool({
        connectionString: 'postgres://localhost:5432'
    });

    console.log("Creating Database DST");
    short_pool.query("CREATE DATABASE dst;", (err, res) => {
        if(err){
            console.error(err);
            return;
        }
        createDatabaseTables();
    });
    short_pool.end();
}

function createDatabaseTables(){
    console.log("Creating tables in DST");
    createSubjects();
    createTablesMetadata();
    createSubjectHierarchyIndex();
    createUnitIndex();
    createVariableIndex();
}

function createSubjects(){
    console.log("Creating table subject");
    var sql =   "CREATE TABLE subjects ("
    sql+=       "id int primary key,"
    sql+=       "description text,"
    sql+=       "hasTables boolean,"
    sql+=       "childSubjects integer[],"
    sql+=       "parentSubject integer,"
    sql+=       "tables text[]);";

    pool.query(sql, (err, res) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(res);
    });
}
function createTablesMetadata(){
    console.log("Creating table table_metadata");
    var sql =   "CREATE TABLE table_metadata ("
    sql+=       "id text primary key,"
    sql+=       "parentSubject integer,"
    sql+=       "variables text[],"
    sql+=       "firstPeriod text,"
    sql+=       "lastPeriod text,"
    sql+=       "frequency text);"

    pool.query(sql, (err, res) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(res);
    });
}

function createSubjectHierarchyIndex(){
    console.log("Creating table hierachies");
    var sql =   "CREATE TABLE hierarchy_index (";
    sql+=       "rootSubject int primary key,"
    sql+=       "children json[]);"

    pool.query(sql, (err, res) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(res);
    });
}

function createUnitIndex(){
    console.log("Creating table unit_index");
    var sql =   "CREATE TABLE unit_index (";
    sql+=       "unit text primary key,"
    sql+=       "tables text[]);"

    pool.query(sql, (err, res) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(res);
    });
}

function createVariableIndex(){
    console.log("Creating table variable_index");
    var sql =   "CREATE TABLE variable_index (";
    sql+=       "variable text primary key,"
    sql+=       "tables text[]);"

    pool.query(sql, (err, res) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(res);
    });
}
