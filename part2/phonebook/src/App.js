import axios from "axios";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import SearchFilter from "./components/SearchFilter";
import AddUserForm from "./components/AddUserForm";
import Phonebook from "./components/Phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      });
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