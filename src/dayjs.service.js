import { DateServiceInterface } from "./date.service";
import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs-plugin-utc";

class DayJSDateService extends DateServiceInterface {
  constructor() {
    super();
  }

  instantiate() {
    this.dateInstance = dayjs();
  }
  instantiateWithCustomDate(dateString) {
    if (!dateString) {
      throw new Error("Missing date string in instantiate with custom date method");
    }
    this.dateInstance = dayjs(dateString);
  }

  addDaysToDate({ days, date }) {
    this.dateInstance = dayjs(date).add(days, "day");
  }
  addHoursToDate({ hours, date }) {
    this.dateInstance = dayjs(date).add(hours, "hour");
  }

  datesDifferenceByHours({ pastDate, futureDate }) {
    return dayjs(futureDate).diff(pastDate, "hour");
  }

  parseByTimezone(timezone) {}
  parseTimestampByTimezone(timestamp, timezone) {}
  parseTimestampByUTC() {
    dayjs.extend(dayjsPluginUTC);
    this.dateInstance.utc();
  }

  getDateFromTimestamp(timestamp) {}
  getHoursFromTimestamp(timestamp) {}
  getTimeFromTimestamp(timestamp) {}
}

export { DayJSDateService };
