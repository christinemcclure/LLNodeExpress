import express from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();
const PORT = 3000;

// using the public folder at root
app.use(express.static("public"));

// useing express.json and express.urlencoded
app.use(express.json());

// use images folder at route
app.use("/images", express.static("images"));

// GET
app.get("/", (request, response) => {
    response.json(data);
});



//POST - express.json and express.urlencoded
app.post('/item', (request, response) => {
    console.log(request.body);
    response.send(request.body)
})





//route chaining
app
    .route("/class")
    .get((request, response) => {
        response.send('Retrieve class info')
    })
    .post((request, response) => {
        response.send('Create class info')
    })
    .put((request, response) => {
        response.send('Update class info')
    });

// GET with next
app.get("/next", (request, response, next) => {
    console.log("The response will be sent by the next function");
    next();

}, (request, response) => {
    response.send("I just set up a route with a second callback");
}
);

// redirect method
app.get("/redirect", (request, response) => {
    response.redirect("http://linkedin.com");
});

//get with routing parameters
app.get('/class/:id', (request, response) => {
    const studentId = Number(request.params.id);
    const student = data.filter((student) => student.id === studentId);
    response.send(student);
});



// POST
app.post("/create", (request, response) => {
    response.send("this is a POST request at /create");
});

// PUT
app.put("/edit", (request, response) => {
    response.send("this is a PUT request at /edit");
});

// DELETE
app.delete("/delete", (request, response) => {
    response.send("this is a DELETE request at /delete");
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}.`);
    // console.log(data);
});

