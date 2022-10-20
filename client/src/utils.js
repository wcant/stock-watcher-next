export function convertNumMonthToAbbrev(num) {
  const months = {
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

export function isNumeric(str) {
  if (typeof str !== "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

// ---------------------------------
// AlphaVantage
// ---------------------------------

// Data format
// "Time Series (5min)": {
//      "2022-08-31 20:00:00": {
//          "1. open": "259.3000",
//          "2. high": "259.5000",
//          "3. low": "259.3000",
//          "4. close": "259.5000",
//          "5. volume": "1195"
//      }
//      ...

// intradayData["Meta Data"]["3. Last Refreshed"];
// intradayData["Meta Data"]["6. Time Zone"];
// intradayData["Time Series (5min)"]["3. Last Refreshed"];

// startTime, endTime format: HH:MM:SS
// interval units: minutes
// data is in EST, so market opens at 09:30:00 and closes at 16:00:00
export function collectDataToArrays(startTime, endTime, interval, data) {
  const date = data["Meta Data"]["3. Last Refreshed"].slice(0, 10);
  const startHour = parseInt(startTime.slice(0, 2));
  const startMinute = parseInt(startTime.slice(3, 5));
  const endHour = parseInt(endTime.slice(0, 2));
  const endMinute = parseInt(endTime.slice(3, 5));

  // might be a good idea to add a check to see if the interval entered
  //   will divide evenly into the endTime entered to avoid an infinite loop
  const trace = {
    x: [],
    close: [],
    high: [],
    low: [],
    open: [],
  };

  let currentHour = startHour;
  let currentMinute = startMinute;
  while (currentHour !== endHour) {
    // Check if need to add "0"
    const strHour =
      currentHour.toString().length === 1
        ? `0${currentHour}`
        : `${currentHour}`;
    const strMinute =
      currentMinute.toString().length === 1
        ? `0${currentMinute}`
        : `${currentMinute}`;

    const key = `${date} ${strHour}:${strMinute}:00`;

    // make sure key exists
    if (data["Time Series (5min)"].hasOwnProperty(key)) {
      const timeSeries = data["Time Series (5min)"];
      trace.x.push(`${key}`);
      trace.open.push(timeSeries[key]["1. open"]);
      trace.high.push(timeSeries[key]["2. high"]);
      trace.low.push(timeSeries[key]["3. low"]);
      trace.close.push(timeSeries[key]["4. close"]);
    } else {
      console.log(`WARNING: Key "${key}" not found.`);
    }
    if (currentMinute + interval === 60) {
      currentMinute = 0;
      currentHour++;
    } else {
      currentMinute += interval;
    }
  }

  return trace;
}
