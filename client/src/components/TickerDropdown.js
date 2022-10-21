import useFetch from "hooks/useFetch";

function ResultsItem(props) {
  const { ticker, name, locale, exchange } = props;
  return (
    <div className="flex flex-col p-2 z-50 hover:bg-gray-300 max-w-xs">
      <span className="text-sm truncate">{name}</span>
      <span className="text-xs">
        <span className="font-semibold">{ticker}</span> : {exchange} ({locale})
      </span>
    </div>
  );
}

export default function TickerDropdown(props) {
  const { url } = props;
  const { data, isLoaded, error } = useFetch(url);

  if (error) console.log(error);

  if (isLoaded) {
    // data format: [ [ticker, name, locale, exchange], [...], ... ]
    const results = data?.results.map((result) => [
      result.ticker,
      result.name,
      result.locale.toUpperCase(),
      result["primary_exchange"],
    ]);

    return (
      <div
        role="listbox"
        className="absolute bg-white divide-y divide-slate-200 shadow-lg border-1"
      >
        {results.map((result) => {
          return (
            <ResultsItem
              key={result[0]}
              ticker={result[0]}
              name={result[1]}
              locale={result[2]}
              exchange={result[3]}
            />
          );
        })}
      </div>
    );
  } else return "Loading...";
}