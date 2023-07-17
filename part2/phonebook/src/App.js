import { useState, useEffect } from "react";

import Header from "./components/Header";
import SearchFilter from "./components/SearchFilter";
import AddUserForm from "./components/AddUserForm";
import Phonebook from "./components/Phonebook";
import InfoMessage from "./components/messages/InfoMessage";
import ErrorMessage from "./components/messages/ErrorMessage";

import personsService from "./services/persons";

const PROMPT_TO_DELETE_USERS = false;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  
  useEffect(() => {
    personsService
      .getAll()
      .then(people => setPersons(people))
      .catch(error => {
        console.warn("Failed to retrieve people from database. Any changes made in this session will not be saved", error);
        return [];
      })
  }, []);


  const popInfoMsg = message => {
    setInfoMsg(message);
    setTimeout(() => setInfoMsg(""), 5000);
  };

  const popErrMsg = message => {
    setErrMsg(message);
    setTimeout(() => setErrMsg(""), 5000);
  };

  const addPerson = event => {
    event.preventDefault();
    
    // We are now checking for both existing names & numbers, as exercise 2.15*
    // makes it clear a user can only have one valid number assigned and should
    // be `PATCH`ed/`PUT`ted
    const existingNumber = persons.find(p => (p.number === newNumber));
    if(existingNumber) {
      popErrMsg(`'${newNumber}' is already registered in phonebook by "${existingNumber.name}"`);
      return;
    }

    // Three different outcomes here depending on DB state and user responses:
    //  1. Existing user needs to be patched
    //  2. Existing user should not be patched, entire operation is aborted
    //  3. User doesn't exist needs to be created
    const existingUser = persons.find(p => p.name === newName);
    if(existingUser) {
      if(window.confirm(`'${existingUser.name}' is already added to phonebook, replace the old number with a new one?`)){
        // 1.
        const updatedUser = { ...existingUser, number: newNumber };
        personsService
          .update(updatedUser.id, updatedUser)
          .then(returnedUpdatedUser => {
            setPersons(persons.map(p => p.id !== updatedUser.id ? p : returnedUpdatedUser));
            setNewName("");
            setNewNumber("");
            popInfoMsg(`Updated '${returnedUpdatedUser.name}'`);
          })
          .catch(error => {
            popErrMsg(`Failed to save '${updatedUser.name} (${updatedUser.number})' to the server!`);
            console.error(error);
          });
      } else {
        // 2.
        return;
      }
    } else {
      // 3.
      const newPerson = {name: newName, number: newNumber};
      personsService
        .create(newPerson)
        .then(p => {
          setPersons(persons.concat(p));
          setNewName("");
          setNewNumber("");
          popInfoMsg(`Added '${p.name}'`);
        })
        .catch(error => {
          popErrMsg(`Failed to save '${newPerson.name} (${newPerson.number})' to the server!`);
          console.error(error);
        });
    }
  };

  const delPerson = id => {
    const target = persons.find(p => p.id === id);
    
    if(PROMPT_TO_DELETE_USERS) {
      if(!window.confirm(`Delete '${target.name}'`)) {
        return;
      }
    }

    personsService
      .del(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
        popInfoMsg(`Deleted '${target.name}'`)
      })
      .catch(error => {
        if(error.response?.status === 404) {
          popErrMsg(`'${target.name}' has already been removed from the server`);
        } else if(error?.code === "ERR_NETWORK"){
          popErrMsg("Connectivity to the server has been lost");
        } else {
          popErrMsg(`Failed to delete '${target.name}' from server!`)
        }
        console.error(error);
      })
  };

  const handleNameOnChange = event => setNewName(event.target.value);
  const handleNumberOnChange = event => setNewNumber(event.target.value);
  const handleFilterOnChange = event => setFilter(event.target.value);

  return (
    <div>
      <Header text="Phonebook" />
      {infoMsg ? <InfoMessage message={infoMsg} /> : false}
      {errMsg ? <ErrorMessage message={errMsg} /> : false}
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
      <Phonebook filter={filter} persons={persons} delFunc={delPerson} />
    </div>
  );
};

export default App;