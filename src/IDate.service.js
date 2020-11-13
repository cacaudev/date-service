const ISO86014_REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/;

class DateServiceInterface {
  constructor() {
    this.timezone = null;
    this.locale = null;
    this.dateInstance = null;
  }

  formatByDefaultOrder() {}
  formatByCustomOrder(formatString) {}

  currentDateTime() {}

  currentDateFormattedByCustom(order) {}

  instantiateAndFormatByCustom({ timestamp, format }) {}

  addDaysToDate({ days, date }) {}
  addHoursToDate({ hours, date }) {}

  isTimestampUTC(timestamp) {}

  isTimestampISO_8601(timestamp) {
    return ISO86014_REGEX.test(timestamp);
  }

  parseTimestampByUTC(timestamp) {}

  formatTimestampByCountry({ timestamp, country }) {}
  formatTimestampByLanguage({ timestamp, language }) {}
  formatTimestampByTimezone({ timestamp, timezone }) {}

  getDateAndAddTimezone({ timestamp, timezone }) {}

  datesDifferenceByHours({ pastDate, futureDate }) {}
  getStartOfWeekSinceDate(timestamp) {}
  isDateBefore({ firstTimestamp, secondTimestamp }) {}

  getDateFromTimestamp(timestamp) {}
  getHoursFromTimestamp(timestamp) {}
  getTimeFromTimestamp(timestamp) {}
}

export { DateServiceInterface };
