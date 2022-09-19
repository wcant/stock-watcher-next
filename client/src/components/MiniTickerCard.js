export default function MiniCard(props) {
  const { ticker } = props;
  // { price: null, change: null, percentChange: null }

  async function getData(queryUrl) {
    try {
      const response = await axios.get(queryUrl);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-row border rounded-xl p-2">
      <div>
        <span className="font-semibold">{ticker}</span>
        <span>{price}</span>
      </div>
      <div>
        <span>{percentChange}</span>
        <span>{change}</span>
      </div>
    </div>
  );
}
