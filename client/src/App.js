import { useEffect, useState } from "react";
import "./styles/App.css";

function App() {
  const url = "https://stock-watcher-wcant.herokuapp.com/api";

  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      fetch(url, {
        json: true,
        headers: { "User-Agent": "request" },
      })
        .then((res) => {
          if (res.status !== 200) {
            console.log("Status:", res.status);
          } else {
            // data is successfully parsed as a JSON object:
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          setData(data);
        });
    } catch (error) {
      console.log("Error:", error);
    }
  });

  return (
    <div className="App">
      <p>Data Output:</p>
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default App;
