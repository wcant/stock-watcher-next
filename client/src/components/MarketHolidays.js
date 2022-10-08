import axios from "axios";
import { useState, useEffect } from "react";

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
  const { name, date, time } = props;
  return (
    <div className="flex flex-row">
      <DateBox month={"Oct"} day={12} />
      <div className="flex flex-row">
        <div className="flex flex-col self-start px-2">
          <span className="font-semibold">{name}</span>
          <span>
            {date}
            <span className="px-2">{time && time}</span>
          </span>
        </div>
      </div>
    </div>
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
    <div className="bg-white p-2 flex flex-col overflow-y-scroll">
      <div>
        <h2>Market Holidays</h2>
      </div>
      <EventItem name="Test Co, Inc." date="Oct 12, 2024" time="12:00 PM" />
    </div>
  );
}
