import NoneView from "./views/NoneView";
import TooManyMatchesView from "./views/TooManyMatchesView";
import ManyMatchesView from "./views/ManyMatchesView";
import CountryView from "./views/CountryView";

import "./View.css";

const View = ({query, countryData, setQuery}) => {
    let ret = <NoneView />;
    
    if(query) {
        const searchResults = countryData.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()));
        if      (searchResults.length > 10) { ret = <TooManyMatchesView />; }
        else if (searchResults.length > 1)  { 
            let exactMatch = searchResults.find(c => c.name.common.toLowerCase() === query.toLowerCase());
            if(exactMatch) {
                ret = <CountryView country={exactMatch} />;
            } else {
                ret = <ManyMatchesView countries={searchResults} setQuery={setQuery} />; 
            }
        }
        else if (searchResults.length > 0)  { ret = <CountryView country={searchResults[0]} />; }
        else                                { ret = <NoneView />;}
    }

    return(
        <div id="view">
            {ret}
        </div>
    );
};

export default View;