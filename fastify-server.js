/*
    CIT 281 Lab 5
    Name: Sierra Baker
*/
const { first } = require("lodash");

const fastify = require("fastify")();

let students = [
    {
        id: 1,
        last: "Last1",
        first: "First1",
    },
    {
        id: 2,
        last: "Last2",
        first: "First2",
    },
    {
        id: 3,
        last: "Last3",
        first: "First3",
    },
];

function getStudentByID(id){
    for(let s of students){
        if (s.id === id) {
            return s;
        }
    }
    return null;
}

fastify.get("/cit/student", function (request,reply){
    // home route
    // request the users info
reply
.code(200) //status code
.header("Conetent-Type", "application/json; charset=utf-8")
.send(students);
});

fastify.post("/cit/student", function (request,reply) {
    // home route
    // request the users info
let {last, first} = request.body;
let id = null;
if (!last || !first){
reply
.code(404) //status code
.header("Conetent-Type", "text/html; charset=utf-8")
.send("NOT FOUND");
}else{
    let id = 0;
    for (const student of students){
        if (student.id > id){
            id = student.id;
        }
    }
    id++
    students.push({id, last, first});
    reply
    .code(200)
    .header("Conetent-Type", "application/json; charset=utf-8")
    .send(students[students.length-1]);
}
let response = request.body
reply
.code(200)
.header("Content-Type", "application/json; charset=utf-8")
.send(response);

});

fastify.get("/cit/student/:id", function (request,reply){
    // home route
    // request the users info
    const {id} = request.params;
    let student = request.parms;
    for (const item of students){
        if (item.id == parseInt(id)){
            student = item;
        break;
        }
    }

    if (student){
reply
.code(200) //status code
.header("Conetent-Type", "application/json; charset=utf-8")
.send(student);

}else{
    if(student){
reply
.code(404) //status code
.header("Conetent-Type", "text/html; charset=utf-8")
.send("NOT FOUND");  
}
 
}
}
);

fastify.get("/*", (request, reply) => {
    reply
      .code(404) 
      .header("Content-Type", "application/json; charset=utf-8") 
      .send(unmatched); 
  });

const listenIP = "localhost"; // localhost:8080
const listenPort = 8080;
fastify.listen(listenPort, listenIP, function (err, address) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
