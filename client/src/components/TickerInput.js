import { useState, useRef, useEffect } from "react";
import { API_URL } from "utils/constants";
import TickerDropdown from "./TickerDropdown";

export default function TickerInput(props) {
  // This component is meant to be relatively generic so that you
  // can pass in any "submit" handler to determine what happens
  // when the user presses Enter or clicks an item in the dropdown
  // Reason: I might want the submit to navigate to a new route, or
  //    add something to the page, such as on Chart Grid.

  // Clicking an item in the dropdown will populate search state with
  // the ticker that was clicked so that you only have to worry about
  // the value of search when you handle submitting the input value

  const { handleSubmit } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const url = API_URL + `/reference/tickers/${search}/5/gte`;

  const dropdown = useRef(null);

  // handle input changes
  function handleChange(e) {
    const inputStr = e.target.value.toUpperCase();
    setSearch(inputStr);
    if (inputStr) {
      setShowDropdown(true);
    } else setShowDropdown(false);
  }

  function handleKeyUp(e) {
    // Handles submit of input
    if (e.key === "Enter") {
      handleSubmit(search);
      setShowDropdown(false);
    }

    // Handles the showing/hiding of the dropdown on keyup
    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  }

  // Handles the showing/hiding of the dropdown on clicks
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
        // if dropdown is clicked after being hidden, then show it if input isn't empty
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
        <TickerDropdown
          url={url}
          search={search}
          setSearch={setSearch}
          setShowDropdown={setShowDropdown}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
