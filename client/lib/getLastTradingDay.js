import axios from "axios";
import { DateTime } from "luxon";
import { API_URL } from "utils/constants";
import { useQuery } from "@tanstack/react-query";

function getLastTradingDay() {
  const today = DateTime.now().toFormat("yyyy-LL-dd");
}

export default getLastTradingDay;
