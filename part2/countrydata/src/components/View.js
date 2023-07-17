import NoneView from "./views/NoneView";
import TooManyMatchesView from "./views/TooManyMatchesView";
import ManyMatchesView from "./views/ManyMatchesView";
import CountryView from "./views/CountryView";

import "./View.css";

const View = ({query, countryData}) => {
    let ret = <NoneView />;
    
    if(query) {
        const searchResults = countryData.filter(c => c.name.common.toLowerCase().includes(query));
        if      (searchResults.length > 10) { ret = <TooManyMatchesView />; }
        else if (searchResults.length > 1)  { ret = <ManyMatchesView countries={searchResults.map(c => c.name.common)} />; }
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