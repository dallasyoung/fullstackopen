const AddUserForm = ({newName, newNumber, handlers}) => (
    <form onSubmit={handlers.addPerson}>
      <div>
        <label htmlFor="nameInput">name:</label>
        <input id="nameInput" onChange={handlers.handleNameOnChange} value={newName} required />
        <br />
        <label htmlFor="numberInput">number:</label>
        <input id="numberInput" onChange={handlers.handleNumberOnChange} value={newNumber} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
  
export default AddUserForm;  