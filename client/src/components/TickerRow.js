export default function TickerRow(props) {
  const { cols, type } = props;
  return (
    <tr>
      {cols.map((col) => {
        if (type === "head") return <th>{col}</th>;
        if (type === "body") return <td>{col}</td>;
        if (type === "foot") return <td>{col}</td>;
        return <td>ERROR: {type} type unkown</td>;
      })}
    </tr>
  );
}
