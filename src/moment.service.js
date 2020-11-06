import { DateServiceInterface } from "./date.service";
import moment from "moment";
import * as momentTZ from "moment-timezone";

const ISO86014_REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/;
const UTC_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

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
    return momentTZ.utc(timestamp);
  }

  formatAndAddTimezoneToDate(timestamp, timezone) {
    const rawUTCInstance = this.parseTimestampByUTC(timestamp);
    const rawTimestamp = rawUTCInstance.format();
    const dateArray = this.getDateFromTimestampWithTimezone(rawTimestamp);
    return moment.tz(dateArray, timezone).format();
  }

  getDateFromTimestampWithTimezone(timestamp) {
    const dateInstance = this.parseTimestampByUTC(timestamp);
    return dateInstance.format("YYYY-MM-DD");
  }
  getHoursFromTimestampWithTimezone(timestamp) {
    const dateInstance = this.parseTimestampByUTC(timestamp);
    return dateInstance.format("HH");
  }
  getTimeFromTimestampWithTimezone(timestamp) {
    const dateInstance = this.parseTimestampByUTC(timestamp);
    return dateInstance.format("HH:mm:ss");
  }

  isTimestampUTC(timestamp) {
    return UTC_REGEX.test(timestamp);
  }

  isTimestampISO_8601(timestamp) {
    const dateCheck = moment(timestamp, moment.ISO_8601, true);
    return dateCheck.isValid();
  }

  getStartOfWeekSinceDate(timestamp) {
    const date = moment(timestamp);
    const sevenDaysBefore = date.subtract(7, "days").format();
    return sevenDaysBefore;
  }

  isDateBefore({ pastTimestamp, futureTimestamp }) {
    return moment(pastTimestamp).isBefore(futureTimestamp);
  }
}

export { MomentDateService };
