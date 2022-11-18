import React, { useState } from "react";

export function Tabs(props) {
  const [openTab, setOpenTab] = useState(props.label);
  const { children } = props;
  return (
    <div className="flex flex-col">
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
      <ul className="flex mb-0 list-none flex-wrap p-2 flex-row" role="tablist">
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
    <div className="w-full p-2">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { openTab });
      })}
    </div>
  );
}

export function Tab(props) {
  const { label, openTab, setOpenTab, children } = props;
  return (
    <li className="-mb-px mr-2 last:mr-0 flex text-center">
      <a
        className={
          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
          (openTab === label
            ? "text-white bg-blue-600"
            : "text-black bg-white hover:bg-gray-200 ")
        }
        onClick={(e) => {
          e.preventDefault();
          setOpenTab(label);
        }}
        href="#tab"
        role="tablist"
        data-toggle="tab"
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
      {openTab === label && (
        <div className="flex flex-row gap-2" role="tabpanel">
          {children}
        </div>
      )}
    </>
  );
}
