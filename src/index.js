import { MomentAdapterDateService } from "./moment.adapter";
import { DayJSAdapterDateService } from "./dayjs.adapter";

const momentDate = new MomentAdapterDateService();
momentDate.instantiate();
const toMoment = momentDate.formatByDefaultOrder();
console.log("format default moment", toMoment);

const dayjsDate = new DayJSAdapterDateService();
dayjsDate.instantiate();
const toDay = dayjsDate.formatByDefaultOrder();
console.log("format default day", toDay);
