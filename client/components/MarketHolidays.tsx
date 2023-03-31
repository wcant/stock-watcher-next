import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "utils/constants";
import Heading from "./Heading";

type AbbreviatedMonths = {
  [key: number]: string;
};

type EventRowItemProps = {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  month: string;
  day: string;
  desc: string;
};

function convertNumMonthToAbbrev(num: number) {
  const months: AbbreviatedMonths = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  return months[num];
}

function DateBox({ month, day }: { month: string; day: string }) {
  return (
    <div className="flex flex-col bg-sky-200 rounded-lg py-1 px-4">
      <span className="block text-sky-800 text-sm">{month}</span>
      <span className="block text-sky-800 text-lg">{day}</span>
    </div>
  );
}

function EventRowItem(props: EventRowItemProps) {
  const { title, subtitle, date, time, month, day, desc } = props;
  return (
    <div className="flex flex-row">
      {month && day && <DateBox month={month} day={day} />}
      <div className="flex flex-row">
        <div className="flex flex-col self-start px-2">
          {title && <span className="font-semibold">{title}</span>}
          {subtitle && (
            <span className="text-xs font-extralight">{subtitle}</span>
          )}
          <span>
            {date && <span>{date}</span>}
            {time && <span className="px-2">{time}</span>}
          </span>
        </div>
        <div>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
}

function createHolidayEventItems(data) {
  const month = convertNumMonthToAbbrev(data.date.slice(5, 7));
  const day = data.date.slice(8);
  const exchange = data.exchange;
  const description =
    `${data.status}` +
    `${
      data.hasOwnProperty("open")
        ? `, Open: ${data.open.split("T")[1].slice(0, 8)}`
        : ""
    }` +
    `${
      data.hasOwnProperty("close")
        ? `, Close: ${data.close.split("T")[1].slice(0, 8)}`
        : ""
    }`;
  return (
    <EventRowItem
      key={data.date + exchange}
      title={data.name}
      subtitle={exchange}
      month={month}
      day={day}
      desc={description}
    />
  );
}

export default function MarketHolidays(props) {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    async function getUpcomingHolidays() {
      try {
        const response = await axios.get(API_URL + "/marketstatus/upcoming");
        setHolidays(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUpcomingHolidays();
  }, []);

  return (
    <div className="bg-white p-2 mt-4 mb-4 flex flex-col overflow-y-scroll rounded-lg h-1/2 gap-2">
      <div className="p-2">
        <Heading hLevel="h2">Market Holidays</Heading>
        <hr />
      </div>
      {holidays.map((holiday) => createHolidayEventItems(holiday))}
    </div>
  );
}
