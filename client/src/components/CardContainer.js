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

  return (
    // <div className="flex flex-wrap gap-8">{symbols.map(makeStockCards)}</div>
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3 p-6">
      {symbols.map(makeStockCards)}
    </div>
  );
}
