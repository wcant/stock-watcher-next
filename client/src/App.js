import { useEffect, useState } from "react";
import SymbolInput from "./components/SymbolInput";
import CardContainer from "./components/CardContainer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleXmark);

function App() {
  const [url, setUrl] = useState(
    process.env.NODE_ENV === "production"
      ? "https://stock-watcher-wcant.herokuapp.com/api"
      : "http://localhost:4000/api"
  );

  const [symbols, setSymbols] = useState([]);
  console.log(symbols);
  // useEffect(() => {
  //   try {
  //     fetch(url, {
  //       json: true,
  //       headers: { "User-Agent": "request" },
  //     })
  //       .then((res) => {
  //         if (res.status !== 200) {
  //           console.log("Status:", res.status);
  //         } else {
  //           // data is successfully parsed as a JSON object:
  //           return res.json();
  //         }
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         setData(data);
  //       });
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // }, []);

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="grid grid-cols-3 items-center">
        <h1 className="text-2xl font-bold text-white">Stock Watcher</h1>
        <SymbolInput setSymbols={setSymbols} />
      </div>
      <CardContainer symbols={symbols} setSymbols={setSymbols} dataUrl={url} />
    </div>
  );
}

export default App;
