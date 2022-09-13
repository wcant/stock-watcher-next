import { useState } from "react";

export default function SymbolInput(props) {
  const { setTickers } = props;

  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value.toUpperCase());
  }

  function handleKeyUp(e) {
    if (e.key === "Enter") {
      setTickers((prevTickers) => {
        // this prevents duplicates
        // could add something to popup a message that it's duplicate
        return prevTickers.includes(value)
          ? [...prevTickers]
          : [...prevTickers, value];
      });
      setValue("");
    }
  }

  return (
    <input
      className="w-46 h-12 rounded-xl p-2"
      type="text"
      name="symbol"
      id="symbol-input"
      placeholder="Symbol (e.g. AMD, AAPL,...)"
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      value={value}
    />
  );
}
//AAPL CAT MSFT GOOGL CMG MRNA MCD GE SBUX AMZN AMD BAC INTC
