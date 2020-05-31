const http = require("http");
const fs = require("fs"); // FileSystem
var time = {
    hour: 0,
    minute: 0, 
    second: 0
};

fs.readFile("time.json", (err, data) => {
    if(data == "" || data == null){
        writeTime();
    } else if (err) {
        const {code} = err;
        if(code=="ENOENT"){
            writeTime();
        }
    } else {
        time = JSON.parse(data);
    }
});
    
setInterval(()=> {
        time.second++;
    if(time.second===60) {
        time.second=0;
        time.minute++;
    }
    if(time.minute===60) {
        time.minute=0;
        time.hour++;
    }
}, 1000);

setInterval(()=>writeTime(), 5000);

function writeTime(){
    fs.writeFile("time.json", 
`{
"hour":${time.hour},
"minute":${time.minute},
"second":${time.second}
}`
    , (err)=>{
        if (err) throw err;
        console.log("Update");
        console.log(time);
    });   
}

http.createServer((req, res)=>{
    res.write("Server started on port 8080");
}).listen(8080);