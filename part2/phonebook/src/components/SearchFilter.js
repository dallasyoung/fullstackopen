const SearchFilter = ({filter, handler}) => (
    <div>
      <label htmlFor="searchFilter">name filter shown with</label>
      <input onChange={handler} value={filter}/>
    </div>
  );

  export default SearchFilter;