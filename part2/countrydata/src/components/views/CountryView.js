import "./CountryView.css";

const CountryView = ({country}) => (
    <>
        <h1>{country.name.common}</h1>
        <h2>{country.region}</h2>

        <p>Capital: <span className="countryCapital">{country.capital[0]}</span></p>
        <p>Area: <span className="countryArea">{country.area} km</span></p>
        <p>Languages:</p>
        <ul>
            {Object.entries(country.languages).map(([k,v], _) => <li key={k}>{v}</li>)}
        </ul>
        <p className="countryFlag">{country.flag}</p>
    </>
);

export default CountryView;