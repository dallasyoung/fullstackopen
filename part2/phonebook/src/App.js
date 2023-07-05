import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState(
    [
      {
        name: "Arto Hellas"
      }
    ]
  );
  const [newName, setNewName] = useState("");
  
  const addPerson = event => {
    event.preventDefault();
    const warnString = `${newName} is already added to phonebook`;
    if(persons.map(p => p.name).includes(newName)) {
      alert(warnString);
      return;
    }
    setPersons(persons.concat({name: newName}));
    setNewName("");
  };

  const handleOnChange = event => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleOnChange} value={newName} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => <li key={p.name}>{p.name}</li>)}
      </ul>
    </div>
  );
};

export default App;