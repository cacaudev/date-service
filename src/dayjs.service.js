import { DateServiceInterface } from "./IDate.service";
import dayjs from "dayjs";

class DayJSDateService extends DateServiceInterface {
  constructor() {
    super();
    this.timezoneDefault = "America/Sao_Paulo";
    this.localeDefault = "pt";
    this.countryDefault = "BR";
    this.dateFormatDefault = "DD/MM/YYYY";
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

  getHoursFromTimestamp(timestamp) {
    return dayjs(timestamp).format("HH");
  }
  getDateFromTimestamp(timestamp) {
    return dayjs(timestamp).format("YYYY-MM-DD");
  }
  getTimeFromTimestamp(timestamp) {
    return dayjs(timestamp).format("HH:mm:ss");
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

  formatTimestampByCountry({ timestamp, locale = this.localeDefault }) {
    const formatFound = this.getDateFormatFromLocale(locale);
    const formatValidated = this.validateAndSetDateFormat(formatFound);
    return days(timestamp).format(formatValidated);
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

export { DayJSDateService };
