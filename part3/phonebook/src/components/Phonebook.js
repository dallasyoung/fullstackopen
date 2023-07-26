import PhonebookEntry from "./PhonebookEntry";

const Phonebook = ({filter, persons, delFunc}) => {
  const selectedPersons = filter ? 
    persons
    .filter(p => p
      .name
      .toLowerCase()
      .includes(filter.toLowerCase()))
  :
    persons;

  const genPhoneBookEntry = person => {
    const key=`${person.name}+${person.number}`;
    return(<PhonebookEntry key={key} person={person} handleClick={() => delFunc(person.id)}/>);
  };


  const phonebookEntries = selectedPersons.map(p => genPhoneBookEntry(p));

  return(
    <table>
      <tbody>
        {phonebookEntries}
      </tbody>
    </table>
  );
};

export default Phonebook;