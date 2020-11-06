class DateServiceInterface {
  constructor() {
    this.timezone = null;
    this.locale = null;
    this.dateInstance = null;
  }

  instantiate() {}
  instantiateWithCustomDate(dateString) {}

  formatByDefaultOrder() {
    return this.dateInstance.format();
  }
  formatByCustomOrder(formatString) {
    if (!formatString) {
      throw new Error("Missing format string in formatByCustomOrder method");
    }
    return this.dateInstance.format(formatString);
  }

  currentDateTime() {
    this.instantiate();
    return this.formatByDefaultOrder();
  }

  currentDateFormattedByCustom(order) {
    this.instantiate();
    return this.formatByCustomOrder(order);
  }

  instantiateAndFormatByCustom({ timestamp, format }) {
    this.instantiateWithCustomDate(timestamp);
    return this.formatByCustomOrder(format);
  }

  addDaysToDate({ days, date }) {}
  addHoursToDate({ hours, date }) {}

  isTimestampUTC(timestamp) {}
  isTimestampISO_8601(timestamp) {}

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
