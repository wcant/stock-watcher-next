import React, { useState } from "react";

export function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.label);
  const { children } = props;
  return (
    <div className="flex flex-col w-11/12 max-w-3xl">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
}

export function TabsHeader(props) {
  const { activeTab, setActiveTab, children } = props;
  return (
    <ul
      className="flex flex-row gap-2 scroll-p-2 p-2 flex-1 overflow-scroll whitespace-nowrap"
      role="tablist"
    >
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </ul>
  );
}

export function Tab(props) {
  const { label, activeTab, setActiveTab, children } = props;
  return (
    <li className="flex -mb-px text-center">
      <a
        className={
          "text-xs font-bold uppercase px-3 py-2 shadow-lg rounded block leading-normal " +
          (activeTab === label
            ? "text-white bg-blue-600"
            : "text-black bg-white hover:bg-gray-200 ")
        }
        onClick={(e) => {
          e.preventDefault();
          setActiveTab(label);
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

export function TabsBody(props) {
  const { activeTab, children } = props;
  return (
    <div className="flex flex-row">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { activeTab });
      })}
    </div>
  );
}

export function TabPanel(props) {
  const { label, activeTab, children } = props;
  return (
    <>
      {activeTab === label && (
        <div className="flex-1 overflow-scroll whitespace-nowrap p-2">
          <div className="flex flex-row gap-2 cursor-pointer" role="tabpanel">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
