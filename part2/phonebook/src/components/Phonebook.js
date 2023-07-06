import PhonebookEntry from "./PhonebookEntry";

const Phonebook = ({filter, persons}) => {
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
    return(<PhonebookEntry key={key} person={person} />);
  };


  const phonebookEntries = selectedPersons.map(p => genPhoneBookEntry(p));

  return(
    <ul>
      {phonebookEntries}
    </ul>
  );
};

export default Phonebook;