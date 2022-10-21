import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL } from "utils/constants";
import { useNavigate } from "react-router-dom";

function ResultsItem(props) {
  const { ticker, name, locale, exchange } = props;
  return (
    <div className="flex flex-col p-2 z-50 hover:bg-gray-300 max-w-xs">
      <span className="text-sm truncate">{name}</span>
      <span className="text-xs">
        <span className="font-semibold">{ticker}</span> : {exchange} ({locale})
      </span>
    </div>
  );
}

export default function TickerInput() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  // results format: [ [ticker, name, locale, exchange], [...], ... ]

  const dropdown = useRef(null);

  // handle input changes
  async function handleChange(e) {
    const inputStr = e.target.value.toUpperCase();
    setSearch(inputStr);

    // populates dropdown with first 5 tickers matching inputStr
    if (inputStr) {
      const response = await axios.get(
        API_URL + `/reference/tickers/${inputStr}/5`
      );
      const results = response.data.results.map((result) => [
        result.ticker,
        result.name,
        result.locale.toUpperCase(),
        result["primary_exchange"],
      ]);
      setResults(results);
      setShowDropdown(true);
    } else {
      // clear results when input is cleared/empty
      setResults([]);
      setShowDropdown(false);
    }
  }

  function handleKeyUp(e) {
    if (e.key === "Escape") {
      console.log("you hit escape");
      setShowDropdown(false);
    }
  }

  useEffect(() => {
    const handleUserClick = (e) => {
      if (
        dropdown.current &&
        showDropdown &&
        !dropdown.current.contains(e.target)
      ) {
        // if clicked outside dropdown, then hide it
        setShowDropdown(false);
      } else if (
        search.length > 0 &&
        dropdown.current &&
        !showDropdown &&
        dropdown.current.contains(e.target)
      ) {
        // if dropdown is clicked after being hidden, then show if input isn't empty
        setShowDropdown(true);
      }
    };
    document.addEventListener("mousedown", handleUserClick);
    return () => document.removeEventListener("mousedown", handleUserClick);
  }, [search, showDropdown]);

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
