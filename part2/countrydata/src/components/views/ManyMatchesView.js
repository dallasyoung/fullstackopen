const ManyMatchesView = ({countries}) => (
    <ul>
        {countries.map(c => <li key={c}>{c}</li>)}
    </ul>
);

export default ManyMatchesView;