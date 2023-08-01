const Person = require("./models/person");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("build"));

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
// eslint-disable-next-line no-unused-vars
morgan.token("postbody", (req, _res) => JSON.stringify(req.body));
const morganTiny = morgan("tiny");
const morganCustom = morgan(":method :url :status :res[content-length] - :response-time ms :postbody");
const morganShim = (req, res, next) => {
    req.method === "POST" ?
        morganCustom(req, res, next) :
        morganTiny(req, res, next);
};
app.use(morganShim);

app.post("/api/persons", async (req, res, next) => {
    // This took WAY too long to do ...
    if(!req.body.name || !req.body.number) {
        return next({ name: "MissingContentError" });
    }

    let nameError = await Person
        .find({ name: req.body.name })
        .then((people) => people.length > 0 ? {  name: "NameAlreadyExistsError" } : null)
        .catch(error => next(error));
    if(nameError) { return next(nameError); }
    let numberError = await Person
        .find({ number: req.body.number })
        .then((people) => people.length > 0 ? { name: "NumberAlreadyExistsError" } : null)
        .catch(error => next(error));
    if(numberError) { return next(numberError); }

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

// Whoops, already took care of this
app.get("/api/persons/:id", (req, res, next) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person);
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

app.put("/api/persons/:id", (req, res, next) => {
    if(!req.body.name || !req.body.number) {
        return res
            .status(400)
            .json({
                error: "missing content"
            });
    }
    Person
        .findByIdAndUpdate(req.params.id, { name: req.body.name, number: req.body.number }, { new: true, runValidators: true })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error));
});

// Whoops, already took care of this
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
        return res.status(400).json({ error: "Malformed person ID" });
    }
    if(error.name === "MissingContentError") {
        return res.status(400).json({ error: "Missing content" });
    }
    if(error.name === "NameAlreadyExistsError") {
        return res.status(400).json({ error: "User already exists" });
    }
    if(error.name === "NumberAlreadyExistsError") {
        return res.status(400).json({ error: "Number already exists" });
    }
    if(error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
    }

    console.error(error);
    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});