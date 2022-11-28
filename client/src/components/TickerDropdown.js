import useFetch from "hooks/useFetch";
import useDebounce from "hooks/useDebounce";

function ResultsItem(props) {
  const { ticker, name, locale, exchange, handleItemSelect } = props;
  return (
    <div
      className="flex flex-col p-2 z-50 hover:bg-gray-300 max-w-xs"
      onClick={() => handleItemSelect(ticker)}
    >
      <span className="text-sm truncate">{name}</span>
      <span className="text-xs">
        <span className="font-semibold">{ticker}</span> : {exchange} ({locale})
      </span>
    </div>
  );
}

export default function TickerDropdown(props) {
  const { url, setSearch, handleSubmit, setShowDropdown } = props;
  console.log(url);
  const { data, isLoaded, error } = useFetch(url);
  console.log("running tickerdropdown");
  const handleItemSelect = (itemSelected) => {
    setSearch(itemSelected);
    handleSubmit();
    setShowDropdown(false);
  };

  if (error) console.error(error);

  if (isLoaded && data?.results) {
    return (
      <div
        role="listbox"
        className="absolute bg-white divide-y divide-slate-200 shadow-lg border-1"
      >
        {data.results.map((result) => {
          return (
            <ResultsItem
              key={result.ticker}
              ticker={result.ticker}
              name={result.name}
              locale={result.locale.toUpperCase()}
              exchange={result["primary_exchange"]}
              handleItemSelect={handleItemSelect}
            />
          );
        })}
      </div>
    );
  } else
    return (
      <div className="flex flex-col p-2 z-50 hover:bg-gray-300 max-w-xs">
        <p>Loading...</p>
      </div>
    );
}
