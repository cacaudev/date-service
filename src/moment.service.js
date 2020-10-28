import { DateServiceInterface } from "./date.service";
import moment from "moment";

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

  parseByTimezone(timezone) {}
  parseTimestampByTimezone(timestamp, timezone) {}
  parseTimestampByUTC(timestamp) {}

  getDateFromTimestamp(timestamp) {}
  getHoursFromTimestamp(timestamp) {}
  getTimeFromTimestamp(timestamp) {}
}

export { MomentDateService };
