import { DateServiceInterface } from "./IDate.service";
import {
  format,
  formatISO,
  parseISO,
  isBefore,
  addDays,
  subDays,
  differenceInHours,
  isValid,
} from "date-fns";

class DateFnsService extends DateServiceInterface {
  constructor() {
    super();
  }

  formatByDefaultOrder(dateString) {
    const dateParsed = this.parseDate(dateString);
    return formatISO(dateParsed, { format: "extended" });
  }
  formatByCustomOrder(dateString, formatString) {
    const dateParsed = this.parseDate(dateString);
    return format(dateParsed, formatString);
  }

  currentDateTime() {
    return formatISO(new Date(), { format: "extended" });
  }

  currentDateFormattedByCustom(formatString) {
    return format(new Date(), formatString);
  }

  datesDifferenceByHours({ pastDate, futureDate }) {
    const pastDateParsed = this.parseDate(pastDate);
    const futureDateParsed = this.parseDate(futureDate);
    return Math.abs(differenceInHours(pastDateParsed, futureDateParsed));
  }

  addDaysToDate({ days, dateString }) {
    const dateParsed = this.parseDate(dateString);
    const sevenDaysLaterDate = addDays(dateParsed, days);
    return formatISO(sevenDaysLaterDate, { format: "extended" });
  }

  addHoursToDate({ hours, dateString }) {
    const dateParsed = this.parseDate(dateString);
    const sevenDaysLaterDate = addHours(dateParsed, hours);
    return formatISO(sevenDaysLaterDate, { format: "extended" });
  }

  getStartOfWeekSinceDate(timestamp) {
    const dateParsed = this.parseDate(timestamp);
    const sevenDaysBeforeDate = subDays(dateParsed, 7);
    return formatISO(sevenDaysBeforeDate, { format: "extended" });
  }

  isDateBefore({ pastTimestamp, futureTimestamp }) {
    const pastDateObject = this.parseDate(pastTimestamp);
    const futureDateObject = this.parseDate(futureTimestamp);
    return isBefore(pastDateObject, futureDateObject);
  }

  getHoursFromTimestamp(timestamp) {
    const dateParsed = this.parseDate(timestamp);
    return format(dateParsed, "HH");
  }
  getDateFromTimestamp(timestamp) {
    const dateParsed = this.parseDate(timestamp);
    return format(dateParsed, "yyyy-MM-dd");
  }
  getTimeFromTimestamp(timestamp) {
    const dateParsed = this.parseDate(timestamp);
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

export { DateFnsService };
