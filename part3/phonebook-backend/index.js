const express = require("express");
const app = express();
app.use(express.json());

const data = [
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

app.get("/info", (_, res) => {
    const info_message = `<p>Phonebook has info for ${data.length} people<p>`;
    const date_message = `<p>${new Date()}</p>`;
    res.send(`${info_message}${date_message}`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});