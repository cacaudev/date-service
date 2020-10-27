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
    return this.dateInstance.format(formatString);
  }

  addDays(numberOfDays) {}
  addHours(numberOfHours) {}

  parseByTimezone(timezone) {}
  parseTimestampByTimezone(timestamp, timezone) {}
  parseTimestampByUTC(timestamp) {}

  getDateFromTimestamp(timestamp) {}
  getHoursFromTimestamp(timestamp) {}
  getTimeFromTimestamp(timestamp) {}
}

export { DateServiceInterface };
