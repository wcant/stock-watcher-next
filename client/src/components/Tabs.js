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
      <ul
        className="flex flex-row flex-wrap  mb-0 list-none p-2 gap-2"
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
    <div className="w-full p-2 ">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { openTab });
      })}
    </div>
  );
}

export function Tab(props) {
  const { label, openTab, setOpenTab, children } = props;
  return (
    <li className="flex -mb-px gap-2 last:mr-0  text-center">
      <a
        className={
          "text-xs font-bold uppercase px-3 py-2 shadow-lg rounded block leading-normal " +
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
        <div
          className="flex flex-row gap-2 overflow-scroll max-w-2xl"
          role="tabpanel"
        >
          {children}
        </div>
      )}
    </>
  );
}
