import { useState } from "react";

export default function SymbolInput(props) {
  const [value, setValue] = useState("");

  const { setSymbols } = props;

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.key === "Enter") {
      setSymbols((prevSymbols) => [...prevSymbols, value]);
    }
  }
  console.log(value);
  return (
    <input
      type="text"
      name="symbol"
      id="symbol-input"
      placeholder="Symbol (e.g. IBM, AAPL,...)"
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      value={value}
    />
  );
}
//AAPL CAT MSFT GOOGL CMG MRNA MCD GE SBUX AMZN AMD BAC INTC
