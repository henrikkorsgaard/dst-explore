const http = require("http");
const api = require("./api.js");
const port = 3000;

const handler = (req, res) => {
    var path = req.url.split('/');
    var method = req.method;

    if(api.hasOwnProperty(path[1]) && api[path[1]].hasOwnProperty(method)){
        api[path[1]][method](req, res) //-> shoudl turn into a 200/201/404
    } else if(api.hasOwnProperty(path[1])){
        methodNotAllowed(req, res)
    } else {
        badRequest(req, res)
    }
}

const server = http.createServer(handler);
server.listen(port, (err) => {
    if(err){
        return console.error(err);
    }
    console.log(`server is listeing on ${port}`);
});


function badRequest(req, res){
    res.statusMessage = `Bad request: Unable to identify respource on ${req.url}`;
    res.status(400).end();
}

function methodNotAllowed(req, res){
    res.statusMessage = `Method ${req.method} not allowed on ${req.url}`;
    res.status(405).end();
}
