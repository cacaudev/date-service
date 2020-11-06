import { DateServiceInterface } from "./IDate.service";
import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs-plugin-utc";
const timezonePlugin = require("dayjs/plugin/timezone");

const ISO86014_REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/;
const UTC_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

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

  processAndFormatTimestampByTimezone({ timestamp, timezone }) {
    const rawUTCInstance = this.parseTimestampByUTC(timestamp);
    const hourFromTimestamp = this.getHoursFromTimestamp(timestamp);

    if (hourFromTimestamp !== "00") {
      return this.formatTimestampByTimezone({ timestamp: rawUTCInstance, timezone });
    } else {
      return this.getDateAndAddTimezone({ timestamp: rawUTCInstance, timezone });
    }
  }

  formatTimestampByTimezone({ timestamp, timezone }) {
    dayjs.extend(timezonePlugin);
    return dayjs(timestamp).add(1, "hour").tz(timezone).format();
  }

  getDateAndAddTimezone({ timestamp, timezone }) {
    dayjs.extend(timezonePlugin);
    const rawUTCInstance = this.parseTimestampByUTC(timestamp);
    const rawTimestamp = rawUTCInstance.format();
    const dateArray = this.getDateFromTimestamp(rawTimestamp);
    return dayjs(dateArray).add(1, "day").tz(timezone).format();
  }

  parseTimestampByUTC(timestamp) {
    dayjs.extend(dayjsPluginUTC);
    this.instantiateWithCustomDate(timestamp);
    return this.dateInstance.utc();
  }

  getHoursFromTimestamp(timestamp) {
    return dayjs(timestamp).format("HH");
  }
  getDateFromTimestamp(timestamp) {
    return dayjs(timestamp).format("YYYY-MM-DD");
  }
  getTimeFromTimestamp(timestamp) {
    return dayjs(timestamp).format("HH:mm:ss");
  }

  getHoursFromTimestampWithTimezone(timestamp) {
    const dateInstance = this.parseTimestampByUTC(timestamp);
    return dateInstance.format("HH");
  }
  getTimeFromTimestampWithTimezone(timestamp) {
    const dateInstance = this.parseTimestampByUTC(timestamp);
    return dateInstance.format("HH:mm:ss");
  }
  getDateFromTimestampWithTimezone(timestamp) {
    const dateInstance = this.parseTimestampByUTC(timestamp);
    return dateInstance.format("YYYY-MM-DD");
  }

  isTimestampUTC(timestamp) {
    dayjs.extend(dayjsPluginUTC);
    return dayjs(timestamp).isUTC();
  }

  isTimestampISO_8601(timestamp) {
    return ISO86014_REGEX.test(timestamp);
  }

  getStartOfWeekSinceDate(timestamp) {
    const date = dayjs(timestamp);
    const sevenDaysBefore = date.subtract(7, "day").format();
    return sevenDaysBefore;
  }

  isDateBefore({ pastTimestamp, futureTimestamp }) {
    const pastDateObject = dayjs(pastTimestamp);
    const futureDateObject = dayjs(futureTimestamp);
    return pastDateObject.isBefore(futureDateObject);
  }
}

export { DayJSDateService };
