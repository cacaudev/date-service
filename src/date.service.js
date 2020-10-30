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

  addDaysToDate({ days, date }) {}
  addHoursToDate({ hours, date }) {}

  datesDifferenceByHours({ firstTimestamp, secondTimestamp }) {}

  parseTimestampByUTC(timestamp) {}

  formatAndAddTimezoneToDate(timestamp, timezone) {}

  getDateFromTimestamp(timestamp) {}
  getHoursFromTimestamp(timestamp) {}
  getTimeFromTimestamp(timestamp) {}

  isTimestampUTC(timestamp) {}
  isTimestampISO_8601(timestamp) {}
}

export { DateServiceInterface };
