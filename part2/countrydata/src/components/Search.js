import "./Search.css";

const Search = ({query, handleQueryUpdate}) => {

    return(
        <div id="search">
            <p>find countries</p>
            <input
                type="text"
                onChange={handleQueryUpdate}
                value={query} />
        </div>
    );
};

export default Search;