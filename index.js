const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'views')));


// In-memory posts array
let posts = [
    { id: uuidv4(), username: "Ankit", content: "My life my rule" },
    { id: uuidv4(), username: "Sanjay", content: "My money my rules" },
    { id: uuidv4(), username: "Sangeeta", content: "I don't have money" }
];

// Display all posts
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

// Show form to create a new post
app.get("/posts/new", (req, res) => {
    res.render("new");
});

// Handle new post submission
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id,username, content });
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs" ,{post});
    
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    res.send("patch request working");
    res.redirect("/posts");

    
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" ,{post});
    
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
