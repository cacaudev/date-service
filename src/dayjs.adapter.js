import { DateServiceInterface } from "./date.service";
import dayjs from "dayjs";

class DayJSAdapterDateService extends DateServiceInterface {
  constructor() {
    super();
  }

  instantiate() {
    this.dateInstance = dayjs();
  }
  instantiateWithCustomDate(dateString) {
    this.dateInstance = dayjs(dateString);
  }

  addDays(numberOfDays) {
    return this.dateInstance.add(numberOfDays, "days");
  }
  addHours(numberOfHours) {
    return this.dateInstance.add(numberOfHours, "hours");
  }

  parseByTimezone(timezone) {}
  parseTimestampByTimezone(timestamp, timezone) {}
  parseTimestampByUTC(timestamp) {}

  getDateFromTimestamp(timestamp) {}
  getHoursFromTimestamp(timestamp) {}
  getTimeFromTimestamp(timestamp) {}
}

export { DayJSAdapterDateService };
