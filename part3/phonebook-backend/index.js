const Person = require("./models/person");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
morgan.token("postbody", (req, res) => JSON.stringify(req.body));
const morganTiny = morgan("tiny");
const morganCustom = morgan(`:method :url :status :res[content-length] - :response-time ms :postbody`);
const morganShim = (req, res, next) => {
    req.method === "POST" ?
        morganCustom(req, res, next) :
        morganTiny(req, res, next);
};
app.use(morganShim);

app.use(express.static("build"));

app.post("/api/persons", (req, res) => {
    if(!req.body.name || !req.body.number) {
        return res
            .status(400)
            .json({
                error: "missing content"
            });
    }
    let newPerson = new Person({
        name: req.body.name,
        number: req.body.number,
    });
    newPerson
        .save()
        .then(() => res.json(newPerson));
    });

app.get("/api/persons", (_, res) => {
    Person
        .find({})
        .then(people => res.json(people))
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = data.find(person => person.id === id);
    if(person) {
        return res.json(person);
    } else {
        return res
            .status(404)
            .json({
                error: `person '${id}' doesn't exist`
            });
    }
});

app.delete("/api/persons/:id", (req, res) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => console.error(error.message));
});

app.get("/info", (_, res) => {
    const info_message = `<p>Phonebook has info for ${data.length} people<p>`;
    const date_message = `<p>${new Date()}</p>`;
    res.send(`${info_message}${date_message}`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});