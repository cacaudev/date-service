import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs-plugin-utc";
import { DayJSDateService } from "./dayjs.service";
const timezonePlugin = require("dayjs/plugin/timezone");

const UTC_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

class DayjsTimezoneDateService extends DayJSDateService {
  constructor() {
    super();
    dayjs.extend(dayjsPluginUTC);
    dayjs.extend(timezonePlugin);
  }

  processAndFormatTimestampByTimezone({ timestamp, timezone }) {
    let rawUTCInstance;
    if (this.isTimestampUTC(timestamp)) {
      rawUTCInstance = timestamp;
    } else {
      rawUTCInstance = this.parseTimestampByUTC(timestamp);
    }
    console.log("rawUTCInstance", rawUTCInstance);
    const hourFromTimestamp = this.getHoursFromTimestamp(timestamp);

    if (hourFromTimestamp !== "00") {
      return this.formatTimestampByTimezone({ timestamp: rawUTCInstance, timezone });
    } else {
      return this.getDateAndAddTimezone({ timestamp: rawUTCInstance, timezone });
    }
  }

  parseTimestampByUTC(timestamp) {
    return dayjs(timestamp).utc();
  }

  formatTimestampByTimezone({ timestamp, timezone }) {
    return dayjs(timestamp).add(1, "hour").tz(timezone).format();
  }

  getDateAndAddTimezone({ timestamp, timezone }) {
    const rawTimestamp = dayjs(timestamp).format();
    const dateArray = this.getDateFromTimestamp(rawTimestamp);
    return dayjs(dateArray).utc().tz(timezone).format();
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
    return dayjs(timestamp).isUTC();
  }
}

export { DayjsTimezoneDateService };
