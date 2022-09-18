export default function TickerRow(props) {
  const { cols, type } = props;
  return (
    <tr>
      {cols.map((col, i) => {
        if (type === "head") return <th key={i}>{col}</th>;
        if (type === "body") return <td key={i}>{col}</td>;
        if (type === "foot") return <td key={i}>{col}</td>;
        return <td key={i}>ERROR: {type} type unkown</td>;
      })}
    </tr>
  );
}
