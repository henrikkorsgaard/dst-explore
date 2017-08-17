const {Pool} = require("pg");
const DATABASE = 'postgres://localhost:5432/dst';//figure this out please
const pool = new Pool({
    connectionString: DATABASE
});
console.log(pool)
module.exports = {
    getSubjects: (cb)=>{
        pool.query("SELECT NOW()", (err, res) => {
            if(err){
                if(err.code === "3D000"){

                    console.log("prolly create db")
                }
                console.error(err)
            }
            console.log(res)
        });
    },
    getSubject: (id, cb) => {

    }
}

function createDSTdatabase(){


}
