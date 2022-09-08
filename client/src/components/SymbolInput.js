import { useState } from "react";

export default function SymbolInput(props) {
  const { setSymbols } = props;

  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value.toUpperCase());
  }

  function handleKeyUp(e) {
    if (e.key === "Enter") {
      setSymbols((prevSymbols) => {
        // this prevents duplicates
        // could add something to popup a message that it's duplicate
        return prevSymbols.includes(value)
          ? [...prevSymbols]
          : [...prevSymbols, value];
      });
      setValue("");
    }
  }

  return (
    <input
      className="symbol-input"
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
