import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState(
    [
      {
        name: "Arto Hellas",
        number: "040-1234567"
      }
    ]
  );
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  
  const addPerson = event => {
    event.preventDefault();
    const warnString = `${newNumber} is already added to phonebook`;
    // Only checking number here because it makes sense that people could have
    // multiple phone numbers
    if(persons.map(p => p.number).includes(newNumber)) {
      alert(warnString);
      return;
    }
    setPersons(persons.concat({name: newName, number: newNumber}));
    setNewName("");
    setNewNumber("");
  };

  const handleNameOnChange = event => setNewName(event.target.value);
  const handleNumberOnChange = event => setNewNumber(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="nameInput">name:</label>
          <input id="nameInput" onChange={handleNameOnChange} value={newName} required />
          <br />
          <label htmlFor="numberInput">number:</label>
          <input id="numberInput" onChange={handleNumberOnChange} value={newNumber} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => <li key={`${p.name}+${p.number}`}>{p.name} ({p.number})</li>)}
      </ul>
    </div>
  );
};

export default App;