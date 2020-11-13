import { DateServiceInterface } from "./IDate.service";
import {
  format,
  formatISO,
  parseISO,
  isBefore,
  addDays,
  subDays,
  differenceInHours,
} from "date-fns";

class DateFnsService extends DateServiceInterface {
  constructor() {
    super();
  }

  formatByDefaultOrder(dateString) {
    const dateParsed = parseISO(dateString);
    return formatISO(dateParsed, { format: "extended" });
  }
  formatByCustomOrder(dateString, formatString) {
    const dateParsed = parseISO(dateString);
    return format(dateParsed, formatString);
  }

  currentDateTime() {
    return formatISO(new Date(), { format: "extended" });
  }

  currentDateFormattedByCustom(formatString) {
    return format(new Date(), formatString);
  }

  datesDifferenceByHours({ pastDate, futureDate }) {
    const pastDateParsed = parseISO(pastDate);
    const futureDateParsed = parseISO(futureDate);
    return Math.abs(differenceInHours(pastDateParsed, futureDateParsed));
  }

  addDaysToDate({ days, dateString }) {
    const dateParsed = parseISO(dateString);
    const sevenDaysLaterDate = addDays(dateParsed, days);
    return formatISO(sevenDaysLaterDate, { format: "extended" });
  }

  getStartOfWeekSinceDate(timestamp) {
    const dateParsed = parseISO(timestamp);
    const sevenDaysBeforeDate = subDays(dateParsed, 7);
    return formatISO(sevenDaysBeforeDate, { format: "extended" });
  }

  isDateBefore({ pastTimestamp, futureTimestamp }) {
    const pastDateObject = parseISO(pastTimestamp);
    const futureDateObject = parseISO(futureTimestamp);
    return isBefore(pastDateObject, futureDateObject);
  }

  getHoursFromTimestamp(timestamp) {
    const dateParsed = parseISO(timestamp);
    return format(dateParsed, "HH");
  }
  getDateFromTimestamp(timestamp) {
    const dateParsed = parseISO(timestamp);
    return format(dateParsed, "yyyy-MM-dd");
  }
  getTimeFromTimestamp(timestamp) {
    const dateParsed = parseISO(timestamp);
    return format(dateParsed, "HH:mm:ss");
  }

  formatTimestampByCountry({ timestamp, locale = this.localeDefault }) {
    const formatFound = this.getDateFormatFromLocale(locale);
    const formatValidated = this.validateAndSetDateFormat(formatFound);
    const dateParsed = parseISO(timestamp);
    return format(dateParsed, formatValidated);
  }

  getDateFormatFromCountry(country = this.countryDefault) {
    return countriesDateFormat[country];
  }

  validateAndSetDateFormat(formatString) {
    const isFormatValid = (format) => format !== null && format !== undefined;
    if (isFormatValid(formatString)) {
      return formatString;
    } else {
      return this.dateFormatDefault;
    }
  }
}

export { DateFnsService };
