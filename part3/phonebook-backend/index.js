const Person = require("./models/person");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("build"));

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

app.post("/api/persons", (req, res, next) => {
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
        .then(() => res.json(newPerson))
        .catch(error => next(error));
});

app.get("/api/persons", (_, res, next) => {
    Person
        .find({})
        .then(people => res.json(people))
        .catch(error => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(400).json({ error: "No such person" });
            }
        })
        .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error));
});

app.get("/info", (_, res, next) => {
    Person
        .find({})
        .then(people => {
            const info_message = `<p>Phonebook has info for ${people.length} people<p>`;
            const date_message = `<p>${new Date()}</p>`;
            res.send(`${info_message}${date_message}`);
        })
        .catch(error => next(error));
});

const errorHandler = (error, req, res, next) => {
    if(error.name === "CastError") {
        return res.json({ error: "Malformed person ID" });
    }
   
    console.error(error);
    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});