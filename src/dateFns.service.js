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
    this.timezoneDefault = "America/Sao_Paulo";
    this.localeDefault = "PT";
    this.countryDefault = "BR";
    this.dateFormatDefault = "dd/MM/yyyy";
  }

  getDefaultDateFormat() {
    return this.dateFormatDefault;
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

  processAndAdaptFormat(formatString) {
    const isFormatValid = (format) => format !== null && format !== undefined;
    const isPeriodTheLast = (index, totalSize) => {
      const lastPeriod = index + 1;
      return lastPeriod == totalSize;
    };

    if (!isFormatValid(formatString)) {
      throw new Error("Unable to adapt format. Format string is null or undefined");
    }

    let formatSeparator;
    if (formatString.includes("/", 0)) {
      formatSeparator = "/";
    } else if (formatString.includes("-", 0)) {
      formatSeparator = "-";
    }
    let dateCharsSeparated = formatString.split(formatSeparator);
    let dateFormatAdapted = "";

    for (let i = 0; i < dateCharsSeparated.length; i++) {
      const period = dateCharsSeparated[i];
      switch (period) {
        case "DD":
          dateFormatAdapted += "dd";
          break;
        case "dd":
          dateFormatAdapted += "dd";
          break;
        case "YYYY":
          dateFormatAdapted += "yyyy";
          break;
        case "yyyy":
          dateFormatAdapted += "yyyy";
          break;
        case "MM":
          dateFormatAdapted += "MM";
          break;
        case "mm":
          dateFormatAdapted += "MM";
          break;
      }

      if (!isPeriodTheLast(i, dateCharsSeparated.length)) {
        dateFormatAdapted += formatSeparator;
      }
    }

    return dateFormatAdapted;
  }
}

export { DateFnsService };
