import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

type TableRowProps = {
  type: "head" | "body" | "foot";
  cols: ReactNode[];
};

export function Table({
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLTableElement>>) {
  return <table {...rest}>{children}</table>;
}

export function TableHead({
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>) {
  return <thead {...rest}>{children}</thead>;
}

export function TableBody({
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>) {
  return <tbody {...rest}>{children}</tbody>;
}

export function TableRow({ cols, type, ...rest }: TableRowProps) {
  return (
    <tr {...rest}>
      {cols?.map((col, i) => {
        if (type === "head") return <th key={i}>{col}</th>;
        if (type === "body") return <td key={i}>{col}</td>;
        if (type === "foot") return <td key={i}>{col}</td>;
        return <td key={i}>ERROR: {type} type unkown</td>;
      })}
    </tr>
  );
}
