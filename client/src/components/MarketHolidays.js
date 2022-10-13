import axios from "axios";
import { useState, useEffect } from "react";
import { convertNumMonthToName } from "utils";

function DateBox(props) {
  const { month, day } = props;
  return (
    <div className="flex flex-col bg-sky-200 rounded-lg py-1 px-4">
      <span className="block text-sky-800 text-sm">{month}</span>
      <span className="block text-sky-800 text-lg">{day}</span>
    </div>
  );
}

function EventItem(props) {
  const { name, date, time, month, day, desc } = props;
  return (
    <div className="flex flex-row">
      {month && day && <DateBox month={month} day={day} />}
      <div className="flex flex-row">
        <div className="flex flex-col self-start px-2">
          {name && <span className="font-semibold">{name}</span>}
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
  const month = convertNumMonthToName(data.date.slice(5, 7));
  const day = data.date.slice(8);
  const description = `Status: ${data.status}${
    data.open && `, Open: ${data.open.split("T")[1].slice(0, 8)}`
  }${data.close && `, Close: ${data.close.split("T")[1].slice(0, 8)}`}`;
  return (
    <EventItem name={data.name} month={month} day={day} desc={description} />
  );
}

export default function MarketHolidays(props) {
  const { apiUrl } = props;
  const [holidays, setHolidays] = useState([]);
  useEffect(() => {
    async function getUpcomingHolidays() {
      try {
        const response = await axios.get(apiUrl + "/marketstatus/upcoming");
        setHolidays(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUpcomingHolidays();
  }, []);

  return (
    <div className="bg-white p-2 mt-4 mb-4 flex flex-col overflow-y-scroll rounded-lg h-1/2">
      <div className="p-2">
        <h2 className="text-xl font-semibold">Market Holidays</h2>
        <hr />
      </div>
      {holidays.map((holiday) => createHolidayEventItems(holiday))}
    </div>
  );
}
