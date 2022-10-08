import { useEffect, useState } from "react";

export function Table(props) {
  const { children } = props;
  return <table>{children}</table>;
}

export function TableHead(props) {
  const { children } = props;
  return <thead>{children}</thead>;
}

export function TableRow(props) {
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
