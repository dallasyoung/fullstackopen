const usage = () => {
    console.error("USAGE: node mongo.js <password> [\"<new name>\" \"<new phone number>\"]");
    process.exit(1);
};

if(process.argv.length < 3) { usage(); }

const MONGO_SERVER_DB_NAME="phonebook";
const MONGO_SERVER_PASSWORD=process.argv[2];
const MONGO_SERVER_URL=`mongodb+srv://dallas:${MONGO_SERVER_PASSWORD}@fso.ld2jm3i.mongodb.net/${MONGO_SERVER_DB_NAME}?retryWrites=true&w=majority`;

const mongoose = require("mongoose");
mongoose.connect(MONGO_SERVER_URL);

const personSchema = mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

if(process.argv.length > 3) {
    // Add to phonebook
    if(process.argv.length !== 5) { usage(); }

    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });
    newPerson
        .save()
        .then(() => console.log(`Added ${newPerson.name}...`))
        .then(() => mongoose.connection.close());
} else {
    // Display phonebook entries
    Person
        .find({})
        .then(persons => {
            console.log("phonebook:");
            persons.map(p => console.log(`${p.name} (${p.number})`));
        })
        .then(() => mongoose.connection.close());
}