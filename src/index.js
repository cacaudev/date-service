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

let dayjsDate = new DayJSDateService();
dayjsDate.instantiate();

const toDay = dayjsDate.formatByDefaultOrder();
console.log("format default day", toDay);

const currentDayTimestamp = dayjsDate.currentDateTime();
console.log("currentDayTimestamp", currentDayTimestamp);

dayjsDate.addDaysToDate({ days: 4, date: currentDayTimestamp });
const dayDateWithAddedDays = dayjsDate.formatByCustomOrder("DD/MM/YYYY");
console.log("dayDateWithAddedDays", dayDateWithAddedDays);
