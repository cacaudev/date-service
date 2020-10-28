import { DateServiceInterface } from "./date.service";
import moment from "moment";
import * as momentTZ from "moment-timezone";

class MomentDateService extends DateServiceInterface {
  constructor() {
    super();
  }

  instantiate() {
    this.dateInstance = moment();
  }
  instantiateWithCustomDate(dateString) {
    this.dateInstance = moment(dateString);
  }

  addDaysToDate({ days, date }) {
    this.dateInstance = moment(date).add(days, "days");
  }
  addHoursToDate({ hours, date }) {
    this.dateInstance = moment(date).add(hours, "hours");
  }

  datesDifferenceByHours({ pastDate, futureDate }) {
    const firstDate = moment(pastDate);
    return moment(futureDate).diff(firstDate, "hours");
  }

  parseTimestampByUTC(timestamp) {
    const rawUTCInstance = momentTZ.utc(timestamp);
    this.dateInstance = rawUTCInstance;
  }
  parseByTimezone(timezone) {
    this.dateInstance = this.dateInstance.tz(timezone);
  }
  parseTimestampByTimezone(timestamp, timezone) {
    const rawUTCInstance = momentTZ.utc(timestamp);
    const rawTimestamp = rawUTCInstance.format();
    const date = rawTimestamp.substring(0, 10);
    const dateSeparated = date.split("-");
    const year = dateSeparated[0];
    const month = dateSeparated[1] - 1;
    const day = dateSeparated[2];
    const dateArray = [year, month, day];
    return momentTZ.tz(dateArray, timezone).format();
  }

  getDateFromTimestamp(timestamp) {}
  getHoursFromTimestamp(timestamp) {
    const dateInstance = momentTZ(timestamp);
    return dateInstance.format("HH");
  }
  getTimeFromTimestamp(timestamp) {}
}

export { MomentDateService };
