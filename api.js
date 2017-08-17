const db = require("./database.js")
console.log(db)

module.exports = {
    subject : {
        GET:(req, res) => {
            console.log("GET!");
            db.getSubjects((err)=>{
                
            })
        },
        POST:(req, res) => {
            console.log("POST")
        },
        DELETE:(req, res) => {

        }
    }
    /*
    (req, res)=>{
        console.log("kajhl")
    },
    table : (req, res)=>{

    },
    unit : (req, res)=>{

    },
    variable : (req, res)=>{

    }*/
}
