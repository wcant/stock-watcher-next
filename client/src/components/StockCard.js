import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StockCards(props) {
  const { symbol, setSymbol, dataUrl } = props;

  const { data, setData } = useState(() => fetchData());

  function fetchData() {}

  function handleDeleteCard() {
    setSymbol((prevSymbols) => {
      return prevSymbols.filter((prevSymbol) => prevSymbol !== symbol);
    });
  }

  return (
    <div className="stockcard">
      <div>
        <h2 className="stock--symbol">{symbol}</h2>
        <i onClick={handleDeleteCard} class="fa-regular fa-circle-xmark"></i>
      </div>
      <div className="stock--plot"></div>
      <div className="stock--details">
        <span>{date ? date : "-"}</span>
        <span>{open ? open : "-"}</span>
        <span>{close ? close : "-"}</span>
        <span>{high ? high : "-"}</span>
        <span>{low ? low : "-"}</span>
        <span>{volume ? volume : "-"}</span>
      </div>
    </div>
  );
}
