const PhonebookEntry = ({person, handleClick}) => <>
    <tr>
        <td>
            <button onClick={handleClick} className="delete-icon">
                ✗
            </button>
        </td>
        <td>{person.name}</td>
        <td>({person.number})</td>
    </tr>
</>;

export default PhonebookEntry;