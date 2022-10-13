import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";

function ResultsItem(props) {
  const { ticker, name, locale, exchange } = props;

  const [isHovered, setIsHovered] = useState(false);

  function toggleHover() {
    setIsHovered((prevIsHovered) => !prevIsHovered);
  }
  return (
    <div
      role="option"
      className="flex flex-col p-2 z-50 hover:bg-gray-300 max-w-xs"
    >
      <span className="text-sm truncate">{name}</span>
      <span className="text-xs">
        <span className="font-semibold">{ticker}</span> : {exchange} ({locale})
      </span>
    </div>
  );
}

export default function TickerInput(props) {
  const { setTickers, apiUrl } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  // results format: [ [ticker, name, locale, exchange], [...], ... ]

  const dropdown = useRef(null);

  async function handleChange(e) {
    const inputStr = e.target.value.toUpperCase();
    setSearch(inputStr);

    if (inputStr) {
      const response = await axios.get(
        apiUrl + `/reference/tickers/${inputStr}/5`
      );
      const results = response.data.results.map((result) => [
        result.ticker,
        result.name,
        result.locale.toUpperCase(),
        result["primary_exchange"],
      ]);
      setResults(results);
      setShowDropdown(true);
      // clear results when input is cleared
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }

  function handleKeyUp(e) {
    if (e.key === "Enter") {
      setTickers((prevTickers) => {
        // this prevents duplicates
        // could add something to popup a message that it's duplicate
        return prevTickers.includes(search)
          ? [...prevTickers]
          : [...prevTickers, search];
      });
      setSearch("");
    }
    if (e.key === "Escape") {
      console.log("you hit escape");
      setShowDropdown(false);
    }
  }

  const handleUserClick = useCallback(
    (e) => {
      if (
        dropdown.current &&
        showDropdown &&
        !dropdown.current.contains(e.target)
      ) {
        setShowDropdown(false);
      } else if (
        search.length > 0 &&
        dropdown.current &&
        !showDropdown &&
        dropdown.current.contains(e.target)
      ) {
        setShowDropdown(true);
      }
    },
    [showDropdown, search]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleUserClick);
    return () => document.removeEventListener("mousedown", handleUserClick);
  }, [handleUserClick]);

  return (
    <div ref={dropdown} className="relative">
      <input
        className={
          "w-full h-12 rounded-xl p-2 " +
          (showDropdown ? "rounded-bl-none" : "")
        }
        type="text"
        name="symbol"
        id="symbol-input"
        placeholder="Symbol (e.g. AMD, AAPL,...)"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={search}
        autoComplete="off"
      />
      {showDropdown && (
        <div
          role="listbox"
          className="absolute bg-white divide-y divide-slate-200 shadow-lg border-1"
        >
          {results.map((result) => {
            return (
              <ResultsItem
                key={result[0]}
                ticker={result[0]}
                name={result[1]}
                locale={result[2]}
                exchange={result[3]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
//AAPL CAT MSFT GOOGL CMG MRNA MCD GE SBUX AMZN AMD BAC INTC
