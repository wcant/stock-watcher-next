import { useEffect, useState } from "react";
import StockCard from "./StockCard";
import nanoid from "nanoid";

export default function CardContainer(props) {
  const { symbols, setSymbols, dataUrl } = props;

  function makeStockCards(symbol) {
    return (
      <StockCard symbol={symbol} setSymbols={setSymbols} dataUrl={dataUrl} />
    );
  }

  return <div className={"cardContainer"}>{symbols.map(makeStockCards)}</div>;
}
