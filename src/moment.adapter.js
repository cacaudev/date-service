import { DateServiceInterface } from "./date.service";
import moment from "moment";

class MomentAdapterDateService extends DateServiceInterface {
  constructor() {
    super();
  }

  instantiate() {
    this.dateInstance = moment();
  }
  instantiateWithCustomDate(dateString) {
    this.dateInstance = moment(dateString);
  }

  addDays(numberOfDays) {
    return this.dateInstance.add(numberOfDays, "days");
  }
  addHours(numberOfHours) {
    return this.dateInstance.add(numberOfHours, "hours");
  }

  parseByTimezone(timezone) {}
  parseTimestampByTimezone(timestamp, timezone) {}
  parseTimestampByUTC(timestamp) {}

  getDateFromTimestamp(timestamp) {}
  getHoursFromTimestamp(timestamp) {}
  getTimeFromTimestamp(timestamp) {}
}

export { MomentAdapterDateService };
