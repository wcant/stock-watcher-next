import { useState } from "react";

export function Tabs(props) {
  const [openTab, setOpenTab] = useState(props.label);

  return <div className="flex flex-col w-full">{props.children}</div>;
}

export function TabsHeader(props) {
  const { color } = props;
  return (
    <nav>
      <ul
        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
        role="tablist"
      >
        {props.children}
      </ul>
    </nav>
  );
}

export function TabsBody(props) {
  const { color } = props;
  return (
    <div className="block w-full relative bg-transparent overflow-hidden">
      <a
        className={
          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
          (props.openTab === 1
            ? "text-white bg-" + color + "-600"
            : "text-" + color + "-600 bg-white")
        }
        href="#tab"
      >
        props.label
      </a>
      {props.children}
    </div>
  );
}

export function Tab(props) {
  return (
    <li className="mr-2 last:mr-0 flex-auto text-center" role="tab">
      {props.children}
    </li>
  );
}

export function TabPanel(props) {
  return <div role="tabpanel">{props.children}</div>;
}
