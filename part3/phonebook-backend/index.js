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

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.post("/api/persons", (req, res) => {
    let id = undefined
    do {
        id = Math.floor(Math.random()*1_000);
        flag = true;
    } while (data.find(p => p.id === id));

    if(!req.body.name || !req.body.number) {
        return res
            .status(400)
            .json({
                error: "missing content"
            });
    }
    if(data.find(p => p.name == req.body.name)) {
        return res
            .status(400)
            .json({
                error: `'${req.body.name}' is already in phonebook`
            });
    }

    const newPerson = {
        id,
        name: req.body.name,
        number: req.body.number,
    };

    data = data.concat(newPerson);

    res.json(newPerson);
});

app.get("/api/persons", (_, res) => res.json(data));

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
    const id = Number(req.params.id);
    const person = data.find(person => person.id === id);
    if(person) {
        data = data.filter(person => person.id !== id);
    }
    res.status(204).end();
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