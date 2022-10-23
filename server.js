const express= require("express");
const path= require("path");
const fs= require("fs");
const util= require("util");
const readfile= util.promisify(fs.readFile);
const PORT= process.env.PORT || 3001;
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))
function getNotes(){
    return readfile("db/db.json", "utf-8").then(function(rawnotes){
        let notesArray= [].concat(JSON.parse(rawnotes))
        return notesArray
    })
}

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
app.get("/api/notes", function(req, res){
    getNotes().then(notes=>res.json(notes)).catch(err=>res.json (err))
})
//add post route to add new note
//add delete route to delete new note
app.listen(PORT, ()=>console.log("listening on"+ PORT))