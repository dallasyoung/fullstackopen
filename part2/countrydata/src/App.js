import { useState, useEffect } from "react";

import Search from "./components/Search";
import View from "./components/View";

import helsinki from "./services/helsinki";

const App = () => {
  const [query, setQuery] = useState("");
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    helsinki.getCountries()
      .then(countries => setCountryData(countries))
      .then(() => console.log("Country data loaded!"))
      .catch(error => {
        alert("Failed to load country data! App will not work for you :(");
        console.error("Failed to load country data!", error);
      });
  }, []);

  const handleQueryUpdate = event => setQuery(event.target.value);
  
  return(
    <div>
      <Search query={query} handleQueryUpdate={handleQueryUpdate} />
      <View query={query} countryData={countryData} />
    </div>
  );
};

export default App;