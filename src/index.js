import { MomentDateService } from "./moment.service";
import { DayJSDateService } from "./dayjs.service";

const momentDate = new MomentDateService();
momentDate.instantiate();

const toMoment = momentDate.formatByDefaultOrder();
console.log("format default moment", toMoment);

const currentMomentTimestamp = momentDate.currentDateTime();
console.log("currentMomentTimestamp", currentMomentTimestamp);

momentDate.addDaysToDate({ days: 4, date: currentMomentTimestamp });
const momentDateWithAddedDays = momentDate.formatByCustomOrder("DD/MM/YYYY");
console.log("momentDateWithAddedDays", momentDateWithAddedDays);

const firstDate = momentDate.currentDateTime();
console.log("firstDate", firstDate);
momentDate.addDaysToDate({ days: 1, date: firstDate });
const secondDate = momentDate.formatByDefaultOrder();
console.log("secondDate", secondDate);
const momentHourDiff = momentDate.datesDifferenceByHours({
  pastDate: firstDate,
  futureDate: secondDate,
});
console.log("momentHourDiff", momentHourDiff);

const currentDate = momentDate.currentDateTime();
const formatByTimezone = momentDate.parseTimestampByTimezone(
  currentDate,
  "America/Noronha",
);
console.log("formatByTimezone moment", formatByTimezone);

let dayjsDate = new DayJSDateService();
dayjsDate.instantiate();

const toDay = dayjsDate.formatByDefaultOrder();
console.log("format default day", toDay);

const currentDayTimestamp = dayjsDate.currentDateTime();
console.log("currentDayTimestamp", currentDayTimestamp);

dayjsDate.addDaysToDate({ days: 4, date: currentDayTimestamp });
const dayDateWithAddedDays = dayjsDate.formatByCustomOrder("DD/MM/YYYY");
console.log("dayDateWithAddedDays", dayDateWithAddedDays);

const firstDateD = dayjsDate.currentDateTime();
console.log("firstDate", firstDateD);
dayjsDate.addDaysToDate({ days: 1, date: firstDateD });
const secondDateD = dayjsDate.formatByDefaultOrder();
console.log("secondDate", secondDate);
const dayHourDiff = dayjsDate.datesDifferenceByHours({
  pastDate: firstDateD,
  futureDate: secondDateD,
});
console.log("dayHourDiff", dayHourDiff);

const UTC_TIMESTAMP_EXAMPLE = "2020-04-02T16:55:00.000Z";
const dateByTimestamp = dayjsDate.processAndFormatTimestampByTimezone({
  timestamp: UTC_TIMESTAMP_EXAMPLE,
  timezone: "America/New_York",
});
console.log("dateByTimestamp", dateByTimestamp);
