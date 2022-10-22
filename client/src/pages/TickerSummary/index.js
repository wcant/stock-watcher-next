import { useParams } from "react-router-dom";
import useFetch from "hooks/useFetch";

export default function TickerSummary() {
  const { ticker } = useParams();
  const { data, isLoading, error, refetch } = useFetch();
  return (
    <main className="flex justify-center">
      <div className="max-w-5xl">
        <h1></h1>
      </div>
    </main>
  );
}
