const http = require("http");
const db = require("./database.js")
const request = require("request");

//db.setupDatabase();
//postSubject();
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

function iterateSubjects(subjectArray, parent){
    if(!parent){
        parent.id = null,
    }

    for(var i = 0; i<subjectArray.length; i++){
        var subject = subjectArray[i];
        var s = {
            id: subject.id,
            description:subject.description,
            hasSubjects: subject.hasSubjects,
            hasTables:false,
            tables:[],
            childSubjects:[],
            parentSubject:parent.id
        }

        if(subject.tables.length > 0 ){
            s.hasTables = true;
            for(var i = 0; i < subject.tables.length; i++){
                s.tables.push(subject.tables[i].id);
            }
        }
        if(subject.hasSubjects){
            for(var i = 0; i < subject.subjects.length; i++){
                s.childSubjects.push(subject[i].subjects.id);
            }
            iterateSubjects(subject.subjects, subject);
        }

        console.log(s)
        //postSubject(s);

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

function postSubject(subject, callback){
    var data = JSON.stringify(subject);
    request({
        url:"http://localhost:3000/subject/1234",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: data
    }, (err, response, body)=>{
        console.log(response)
    });
}
function getInternalAPI(){}
