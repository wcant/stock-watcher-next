import { useEffect, useState } from "react";
import StockCard from "./StockCard";
import { nanoid } from "nanoid";

export default function CardContainer(props) {
  const { symbols, setSymbols, dataUrl } = props;

  function makeStockCards(symbol, index) {
    return (
      <StockCard
        key={symbol}
        symbol={symbol}
        setSymbols={setSymbols}
        dataUrl={dataUrl}
      />
    );
  }

  return <div className={"card-container"}>{symbols.map(makeStockCards)}</div>;
}
