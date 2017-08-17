const http = require("http");
const db = require("./database.js")

//getAllSubjects();

getAllSubjects();

function getAllSubjects(){
    //API call http://api.statbank.dk/v1/subjects?lang=en&recursive=true&format=JSON

    var path = "/v1/subjects?lang=en&recursive=true&includeTables=true&format=JSON"

    get(path, (err, data)=>{
        if(err){
            console.error(err);
            return;
        }
        try {
            var jsonData = JSON.parse(data)
            iterateSubjects(jsonData);

        } catch(e){
            console.error(e)
        }
    });
}

function iterateSubjects(subjectArray){
    for(var i = 0; i<subjectArray.length; i++){
        var subject = subjectArray[i];
         if(subject.hasSubjects){
             iterateSubjects(subject.subjects);
         }

         if(subject.hasSubjects && subject.hasOwnProperty("tables") && subject.tables.length !== 0){
                console.log(subject)
         }
    }
}

function get(path, callback){
    var host = "http://api.statbank.dk";

    http.get(host+path, (res)=>{
        var data = "";

        res.on("data", (d)=>{
            data += d;
        })

        res.on("end", ()=>{
            callback(null, data)
        });

    }).on("error", (e)=>{
        callback(e, null);
    });
}

/*
    Subjects_:
*/
