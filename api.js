const db = require("./database.js")

module.exports = {
    subject : {
        GET:(req, res) => {
            console.log("GET!");
            db.getSubjects((err)=>{

            })
        },
        POST:(req, res) => {
            var data = '';
            req.on('data', (d)=>{
                data += d;
            });
            req.on('end', ()=>{
                try {
                    var json = JSON.parse(data);
                    var path = req.url.split('/');
                    console.log(path)
                    if(path[path.length-1] !== 'subject'){
                        db.upsertSubject(path[path.length-1], data);
                    } else {
                        res.statusMessage = `Invalid API path ${path} for this request type!`;
                        res.status(418).end();
                    }

                } catch (e){
                    res.statusMessage = `Unable to parse request body as valid JSON`;
                    res.status(404).end();
                }
            });
        },
        DELETE:(req, res) => {
            console.log("DELETE!")
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
