import React, { useState } from "react";

export function Tabs(props) {
  const [openTab, setOpenTab] = useState(props.label);
  const { children } = props;
  return (
    <div className="flex flex-col w-full">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { openTab, setOpenTab });
      })}
    </div>
  );
}

export function TabsHeader(props) {
  const { openTab, setOpenTab, children } = props;
  return (
    <nav>
      <ul
        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
        role="tablist"
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { openTab, setOpenTab });
        })}
      </ul>
    </nav>
  );
}

export function TabsBody(props) {
  const { openTab, children } = props;
  return (
    <div className="block w-full overflow-hidden">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { openTab });
      })}
    </div>
  );
}

export function Tab(props) {
  const { label, openTab, setOpenTab, children } = props;
  return (
    <li
      className={
        "mr-2 last:mr-0 text-center" +
        (openTab === label
          ? "text-white-600 bg-blue"
          : "text-black-600 bg-white")
      }
      role="tab"
    >
      <a
        className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal "
        href="#tab"
        onClick={() => setOpenTab(label)}
      >
        {children}
      </a>
    </li>
  );
}

export function TabPanel(props) {
  const { label, openTab, children } = props;
  return (
    <>
      {label === openTab && (
        <div className="flex flex-row" role="tabpanel">
          {children}
        </div>
      )}
    </>
  );
}
