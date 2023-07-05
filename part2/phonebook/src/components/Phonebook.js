const Phonebook = ({filter, persons}) => (
    <ul>
      {
        filter ? 
          persons
            .filter(p => p
              .name
              .toLowerCase()
              .includes(filter.toLowerCase()))
            .map(p => <li key={`${p.name}+${p.number}`}>{p.name} ({p.number})</li>)
        :
          persons
            .map(p => <li key={`${p.name}+${p.number}`}>{p.name} ({p.number})</li>)
      }
    </ul>
  );

export default Phonebook;