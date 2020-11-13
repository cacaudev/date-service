import { DateFnsService } from "./dateFns.service";
import { parseISO, startOfDay, isValid } from "date-fns";
import { format } from "date-fns-tz";

const ISO_8601_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXX";

class DateFnsTimezoneService extends DateFnsService {
  constructor() {
    super();
    this.timezoneDefault = "America/Sao_Paulo";
    this.localeDefault = "pt";
    this.countryDefault = "BR";
    this.dateFormatDefault = "dd/MM/yyyy";
  }

  processAndFormatTimestampByTimezone({ timestamp, timezone = this.timezoneDefault }) {
    const dateParsed = this.parseDate(timestamp);
    const hourFromTimestamp = format(dateParsed, "HH");
    if (hourFromTimestamp !== "00") {
      return this.formatTimestampByTimezone({ timestamp, timezone });
    } else {
      return this.getDateAndAddTimezone({ timestamp, timezone });
    }
  }

  formatTimestampByTimezone({ timestamp, timezone }) {
    const dateParsed = this.parseDate(timestamp);
    return format(dateParsed, ISO_8601_FORMAT, {
      timeZone: timezone,
    });
  }

  getDateAndAddTimezone({ timestamp, timezone }) {
    const dateParsed = this.parseDate(timestamp);
    const dateOnly = startOfDay(dateParsed);
    return format(dateOnly, ISO_8601_FORMAT, {
      timeZone: timezone,
    });
  }

  getHoursFromTimestampWithTimezone(timestamp) {
    const dateParsed = this.parseDate(timestamp);
    return format(dateParsed, "HH");
  }
  getTimeFromTimestampWithTimezone(timestamp) {
    const dateParsed = this.parseDate(timestamp);
    return format(dateParsed, "HH:mm:ss");
  }
  getDateFromTimestampWithTimezone(timestamp) {
    const dateParsed = this.parseDate(timestamp);
    return format(dateParsed, "yyyy-MM-dd");
  }

  parseDate(timestamp) {
    let dateParsed;
    if (isValid(timestamp)) {
      dateParsed = timestamp;
    } else {
      dateParsed = parseISO(timestamp);
    }
    return dateParsed;
  }
}

export { DateFnsTimezoneService };
