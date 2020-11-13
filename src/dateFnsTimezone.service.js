import { DateFnsService } from "./dateFns.service";
import { parseISO, startOfDay } from "date-fns";
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

  processAndFormatTimestampByTimezone({ timestamp, timezone }) {
    const hourFromTimestamp = this.getHoursFromTimestamp(timestamp);
    if (hourFromTimestamp !== "00") {
      return this.formatTimestampByTimezone({ timestamp, timezone });
    } else {
      return this.getDateAndAddTimezone({ timestamp, timezone });
    }
  }

  formatTimestampByTimezone({ timestamp, timezone }) {
    const date = parseISO(timestamp);
    const dateFormatted = format(date, ISO_8601_FORMAT, {
      timeZone: timezone,
    });
    return dateFormatted;
  }

  getDateAndAddTimezone({ timestamp, timezone }) {
    const date = parseISO(timestamp);
    const dateOnly = startOfDay(date);
    return format(dateOnly, ISO_8601_FORMAT, {
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
