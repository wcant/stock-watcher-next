import { useState, useRef, useEffect } from "react";
import { API_URL } from "utils/constants";
import TickerDropdown from "./TickerDropdown";

export default function TickerInput(props) {
  const { handleSubmit } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const url = API_URL + `/reference/tickers/${search}/5`;

  const dropdown = useRef(null);

  // handle input changes
  function handleChange(e) {
    const inputStr = e.target.value.toUpperCase();
    setSearch(inputStr);
    if (inputStr) {
      setShowDropdown(true);
    } else setShowDropdown(false);
  }

  // Handles the showing/hiding of the dropdown on keyup
  function handleKeyUp(e) {
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
      {showDropdown && <TickerDropdown url={url} />}
    </div>
  );
}
