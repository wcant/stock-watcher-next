import TickerCategoryRow from "components/TickerCategoryRow";
import TickerRow from "components/TickerRow";

export default function TickerTable(props) {
  const { headings, bodyRows, footerRows } = props;

  return (
    <table className="border-collapse w-full table-auto text-sm">
      {headings?.length && (
        <thead className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400">
          <TickerRow cols={headings} type="head" />
        </thead>
      )}

      {bodyRows?.length && (
        <tbody className="text-xs">
          {bodyRows.map((cols, i) => (
            <TickerRow key={i} cols={cols} type="body" />
          ))}
        </tbody>
      )}
      {footerRows?.length && (
        <tfoot>
          {footerRows.map((cols, i) => (
            <TickerRow key={i} cols={cols} type="foot" />
          ))}
        </tfoot>
      )}
    </table>
  );
}
