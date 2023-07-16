const PhonebookEntry = ({person}) => <>
    <tr>
        <td className="delete-icon">✗</td>
        <td>{person.name}</td>
        <td>({person.number})</td>
    </tr>
</>;

export default PhonebookEntry;