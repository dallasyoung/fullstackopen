const url = process.env.MONGO_SERVER_URL;

const mongoose = require("mongoose")
console.log("Connecting to MongoDB...");
mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Error connecting to MongoDB: ", error.message));

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        required: true
    },
    number: {
        type: String,
        minLength: 9,
        required: true,
        validate: {
            validator: (v) => /^\d{1,3}-\d+$/.test(v),
            message: props => `${props.value} is an invalid number. Numbers must be at least 8 digits long with the first two or three digits separated by '-'`,
        }
    }
});
personSchema.set("toJSON", {
    transform: (_, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id;
        delete returnObject.__v;
    }
});

module.exports = mongoose.model("Person", personSchema);