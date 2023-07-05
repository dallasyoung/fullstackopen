import { useState } from "react";

import Header from "./components/Header";
import SearchFilter from "./components/SearchFilter";
import AddUserForm from "./components/AddUserForm";
import Phonebook from "./components/Phonebook";

const App = () => {
  const [persons, setPersons] = useState(
    [
      { name: "Arto Hellas", number: "040-1234567" },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]
  );
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  
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
  const handleFilterOnChange = event => setFilter(event.target.value);

  return (
    <div>
      <Header text="Phonebook" />
      <SearchFilter filter={filter} handler={handleFilterOnChange} />
      <Header text="add a new" />
      <AddUserForm 
        newName={newName}
        newNumber={newNumber}
        handlers={{
            addPerson: addPerson,
            handleNameOnChange: handleNameOnChange,
            handleNumberOnChange: handleNumberOnChange
        }}
      />
      <Header text="Numbers" />
      <Phonebook filter={filter} persons={persons} />
    </div>
  );
};

export default App;