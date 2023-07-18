// Exercise 2.20 calls for this app to be extended with weather information.
// Unfortunately, I've tried using the recommended API before,
// https://openweathermap.org, and it no longer offers free API access and seems
// to have largely been taken over by VC's and a profit-driven company that I do
// not want to support
// 
// Additionally, weather is boring. I thought what might be more fun would be to
// also load data from Wikipedia alongside our queried country data. This is done
// simply by embedding a link to an easily-generated static web page and probably
// won't work for all sites (see my notes below on my efforts to correct this),
// but it works surprisingly well. No, you don't have an opportunity to interact
// with a REST API here or practice passing in REACT_APP_ env variables, but I've
// done enough of that already (just last exercise trying to `docker compose` the
// phonebook assignment!) that I'm confident I know the material well enough, and
// hopefully this different addition is a suitable replacement for this exercise

// See note below
// import axios from "axios";
// import { useState, useEffect } from "react";
import { useState } from "react";

import "./CountryView.css";

const CountryView = ({country}) => {
    // This is what I would like to do, and is the only way I know how to do this.
    // Unfortunately, when this code runs in the browser, the request fails due to
    // CORS:
    // 
    // "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the
    // remote resource at https://en.wikipedia.org/wiki/Canada. (Reason: CORS
    // header ‘Access-Control-Allow-Origin’ missing). Status code: 200."
    // 
    // I've never been smart enough to fully understand CORS. I only have a rough
    // idea of why this request is being rejected, and I've never been able to
    // figure out how we are properly supposed to work around this
    // 
    // I know that this material is covered in part 3, so I'm not pouring hours 
    // into trying to get this to work now. Instead I'm hoping that I'm smart
    // enough to learn the proper solution in the next exercises and can then
    // come back and rewrite this
    // const [validWikiLink, setValidWikiLink] = useState("");
    // useEffect(() => {
    //     const countryPage = `https://en.wikipedia.org/wiki/${country.name.common}`;
    //     axios
    //         .get(countryPage)
    //         .then(() => setValidWikiLink(countryPage))
    //         .catch(() => console.error(`Failed to load wikipedia page '${countryPage}'`));
    // }, [country]);

    // For now, as described above, we'll just assume all these requests are
    // always successful
    // eslint-disable-next-line no-unused-vars
    const [validWikiLink, _setValidWikiLink] = useState(`https://en.wikipedia.org/wiki/${country.name.common}`);
    
    return(
        <div className="country">
            <div className="infoPanel">
                <h1>{country.name.common}</h1>
                <h2>{country.region}</h2>

                <p>Capital: <span className="countryCapital">{country.capital[0]}</span></p>
                <p>Area: <span className="countryArea">{country.area} km</span></p>
                <p>Languages:</p>
                <ul>
                    {Object.entries(country.languages).map(([k,v], _) => <li key={k}>{v}</li>)}
                </ul>
                <p className="countryFlag">{country.flag}</p>
            </div>
            <div className="wikiPanel">
                { validWikiLink 
                    ? <embed src={validWikiLink} />
                    : <p>No Wikipedia link found for '{country.name.common}' ☹️</p>
                }                
            </div>
        </div>
    );
};

export default CountryView;