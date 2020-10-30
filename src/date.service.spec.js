import { MomentDateService } from "./moment.service";
import { DayJSDateService } from "./dayjs.service";

const makeSut = () => {
  //const sut = new MomentDateService();
  const sut = new DayJSDateService();

  const ISO86014_REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/;
  const ISO8601_EXAMPLE = "2020-04-02T08:02:17-03:00";
  const UTC_TIMESTAMP_EXAMPLE = "2020-04-02T16:55:00.000Z";
  const FORMAT_DAY_MONTH_YEAR_REGEX = /[0-3][0-9][/][0-9]{2}[/][0-9]{4}/;
  const FORMAT_DAY_MONTH_YEAR_BR = "DD/MM/YYYY";
  const FORMAT_YEAR_MONTH_DAY = "YYYY-MM-DD";
  const TIMEZONE_EXAMPLE = "America/Sao_Paulo";

  return {
    sut,
    ISO86014_REGEX,
    ISO8601_EXAMPLE,
    UTC_TIMESTAMP_EXAMPLE,
    FORMAT_DAY_MONTH_YEAR_REGEX,
    FORMAT_DAY_MONTH_YEAR_BR,
    FORMAT_YEAR_MONTH_DAY,
    TIMEZONE_EXAMPLE,
  };
};

describe("Date Service", () => {
  it("Should instantiate a date object with current date and time", (done) => {
    const { sut } = makeSut();
    const dateObject = sut.instantiate();
    done();
  });

  it("Should instantiate a date object with timestamp passed", (done) => {
    const { sut } = makeSut();
    const customDate = "2020-10-02";
    const dateObject = sut.instantiateWithCustomDate(customDate);
    done();
  });

  it("Should format timestamp in ISO8601, e.g. '2020-04-02T08:02:17-05:00", (done) => {
    const { sut, ISO86014_REGEX } = makeSut();
    sut.instantiate();
    const timestampFormatted = sut.formatByDefaultOrder();
    expect(timestampFormatted).toMatch(ISO86014_REGEX);
    done();
  });

  it("Should format current timestamp in custom format dd/mm/yyyy", (done) => {
    const { sut, FORMAT_DAY_MONTH_YEAR_REGEX, FORMAT_DAY_MONTH_YEAR_BR } = makeSut();
    sut.instantiate();
    const timestampFormatted = sut.formatByCustomOrder(FORMAT_DAY_MONTH_YEAR_BR);
    expect(timestampFormatted).toMatch(FORMAT_DAY_MONTH_YEAR_REGEX);
    done();
  });

  it("Should return current date and time formatted in ISO8601", (done) => {
    const { sut, ISO86014_REGEX } = makeSut();
    const currentTimestamp = sut.currentDateTime();
    expect(currentTimestamp).toMatch(ISO86014_REGEX);
    done();
  });

  it("Should return hours difference between two dates", (done) => {
    const firstDate = "2020-10-01",
      secondDate = "2020-10-02";
    const { sut } = makeSut();
    const hoursDifference = sut.datesDifferenceByHours({
      pastDate: firstDate,
      futureDate: secondDate,
    });

    expect(hoursDifference).toBe(24);
    done();
  });

  it("Should return date (YYYY-MM-DD) from timestamp with timezone", (done) => {
    const { sut, UTC_TIMESTAMP_EXAMPLE } = makeSut();
    const date = sut.getDateFromTimestampWithTimezone(UTC_TIMESTAMP_EXAMPLE);
    expect(date).toMatch("2020-04-02");
    done();
  });

  it("Should return time (HH:mm:ss) from timestamp with timezone", (done) => {
    const { sut, UTC_TIMESTAMP_EXAMPLE } = makeSut();
    const date = sut.getTimeFromTimestampWithTimezone(UTC_TIMESTAMP_EXAMPLE);
    expect(date).toMatch("16:55:00");
    done();
  });

  it("Should return hours (HH) from timestamp with timezone", (done) => {
    const { sut, UTC_TIMESTAMP_EXAMPLE } = makeSut();
    const date = sut.getHoursFromTimestampWithTimezone(UTC_TIMESTAMP_EXAMPLE);
    expect(date).toMatch("16");
    done();
  });

  it("Should check if timestamp is on UTC mode", (done) => {
    const { sut, UTC_TIMESTAMP_EXAMPLE } = makeSut();
    const dateUTC = sut.isTimestampUTC(UTC_TIMESTAMP_EXAMPLE);
    expect(dateUTC).toBeTruthy();
    done();
  });

  it("Should check if timestamp is on ISO_8601 format", (done) => {
    const { sut, ISO8601_EXAMPLE } = makeSut();
    const dateISO8601 = sut.isTimestampISO_8601(ISO8601_EXAMPLE);
    expect(dateISO8601).toBeTruthy();
    done();
  });

  it("Should format timestamp to be with time 00:00:00 and with right timezone", (done) => {
    const { sut, ISO8601_EXAMPLE, TIMEZONE_EXAMPLE } = makeSut();
    const isoDateWithoutTime = "2020-04-02T00:00:00-03:00";

    const dateFormatted = sut.formatAndAddTimezoneToDate(
      ISO8601_EXAMPLE,
      TIMEZONE_EXAMPLE,
    );
    expect(dateFormatted).toBe(isoDateWithoutTime);
    done();
  });

  it("Should get first day of the week since the date passed", (done) => {
    const { sut, ISO8601_EXAMPLE } = makeSut();
    const sevenDaysBefore = "2020-03-26T08:02:17-03:00";
    const dateFormatted = sut.getStartOfWeekSinceDate(ISO8601_EXAMPLE);
    expect(dateFormatted).toBe(sevenDaysBefore);
    done();
  });
});
