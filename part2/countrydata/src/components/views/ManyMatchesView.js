import "./ManyMatchesView.css";

const ManyMatchesView = ({countries, setQuery}) => (
    <ul className="manyMatches">
        {countries.map(c => (
            <li key={c.name.common}>
                <p>{c.name.common}</p>
                <button onClick={() => setQuery(c.name.common)}>show</button>
            </li>
        ))}
    </ul>

);

export default ManyMatchesView;