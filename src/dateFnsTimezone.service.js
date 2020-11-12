import { DateFnsService } from "./dateFns.service";
import { parseISO, formatISO, startOfDay, toDate } from "date-fns";
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";

const UTC_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

class DateFnsTimezoneService extends DateFnsService {
  constructor() {
    super();
    this.timezoneDefault = "America/Sao_Paulo";
    this.localeDefault = "pt";
    this.countryDefault = "BR";
    this.dateFormatDefault = "dd/MM/yyyy";
  }

  processAndFormatTimestampByTimezone({ timestamp, timezone }) {
    let rawUTCInstance = zonedTimeToUtc(timestamp, timezone);
    /*if (this.isTimestampUTC(timestamp)) {
      rawUTCInstance = timestamp;
    } else {
      rawUTCInstance = this.parseTimestampByUTC(timestamp);
    }*/
    console.log("rawUTCInstance", rawUTCInstance);
    const hourFromTimestamp = this.getHoursFromTimestamp(timestamp);

    if (hourFromTimestamp !== "00") {
      return this.formatTimestampByTimezone({ timestamp: rawUTCInstance, timezone });
    } else {
      return this.getDateAndAddTimezone({ timestamp: rawUTCInstance, timezone });
    }
  }

  formatTimestampByTimezone({ timestamp, timezone }) {
    const date = parseISO(timestamp);
    return format(date, "yyyy-MM-dd HH:mm:ssXXX", {
      timeZone: timezone,
    });
  }

  getDateAndAddTimezone({ timestamp, timezone }) {
    const date = parseISO(timestamp);
    const dateOnly = startOfDay(date);
    return format(dateOnly, "yyyy-MM-dd HH:mm:ssXXX", {
      timeZone: timezone,
    });
  }

  getHoursFromTimestampWithTimezone(timestamp) {
    const dateParsed = parseISO(timestamp);
    return format(dateParsed, "HH");
  }
  getTimeFromTimestampWithTimezone(timestamp) {
    const dateParsed = parseISO(timestamp);
    return format(dateParsed, "HH:mm:ss");
  }
  getDateFromTimestampWithTimezone(timestamp) {
    const dateParsed = parseISO(timestamp);
    return format(dateParsed, "yyyy-MM-dd");
  }
}

export { DateFnsTimezoneService };
