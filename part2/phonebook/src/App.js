import { useState, useEffect } from "react";

import Header from "./components/Header";
import SearchFilter from "./components/SearchFilter";
import AddUserForm from "./components/AddUserForm";
import Phonebook from "./components/Phonebook";

import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  
  useEffect(() => {
    personsService
      .getAll()
      .then(people => setPersons(people))
      .catch(error => {
        console.warn("Failed to retrieve people from database. Any changes made in this session will not be saved", error);
        return [];
      })
  }, []);

  const addPerson = event => {
    event.preventDefault();
    const warnString = `${newNumber} is already added to phonebook`;
    // Only checking number here because it makes sense that people could have
    // multiple phone numbers
    if(persons.map(p => p.number).includes(newNumber)) {
      alert(warnString);
      return;
    }

    const newPerson = {name: newName, number: newNumber};

    personsService
      .create(newPerson)
      .then(p => {
        setPersons(persons.concat(p));
        setNewName("");
        setNewNumber("");
      })
      .catch(error => console.error(`Failed to save '${newPerson.name} (${newPerson.number})' to the server!`, error));
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