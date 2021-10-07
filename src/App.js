import React, { useState } from "react";

function App() {
  const [search, setSearch] = useState(""); //from search input.
  const [results, setResults] = useState([]); //array that we get back from the wikipedia search query.
  const [searchInfo, setSearchInfo] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return; // if search is equal to an empty string, we 'return'. If I dont type anything inside of the input form, dont search.

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  };

  return (
    <div className="App">
      <header>
        <h1>Mini-Wiki</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="What are you looking for?"
            value={search} // whenever I change the setSearch value, the input value 'search' will change.
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {searchInfo.totalhits ? (
          <p>Search results: {searchInfo.totalhits}</p>
        ) : (
          ""
        )}
      </header>
      <div className="results">
        {results.map((result, index) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          return (
            <div className="result" key={index}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target="_blank" rel="noreferrer">
                Read more
              </a>
            </div>
          );
        })}
      </div>
      <footer className="footer">
        <center>
          <p>
            Coded by{" "}
            <a href="https://github.com/Valmarinoa">Valentina Marino.</a>
          </p>
        </center>
      </footer>
    </div>
  );
}

export default App;
