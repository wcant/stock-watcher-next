import { useState } from "react";

export default function SymbolInput(props) {
  return (
    <input
      type="text"
      name="symbol"
      id="symbol-input"
      placeholder="Symbol (e.g. IBM, AAPL,...)"
    />
  );
}
