import { DayjsTimezoneDateService } from "./dayjsTimezone.service";
import { DateFnsService } from "./dateFns.service";

const makeSut = () => {
  const sutUTC = new DayjsTimezoneDateService();

  const ISO86014_REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/;
  const ISO8601_EXAMPLE = "2020-04-02T08:02:17-03:00";
  const UTC_TIMESTAMP_EXAMPLE = "2020-04-02T16:55:00.000Z";
  const FORMAT_DAY_MONTH_YEAR_REGEX = /[0-3][0-9][/][0-9]{2}[/][0-9]{4}/;
  const FORMAT_DAY_MONTH_YEAR_BR = "DD/MM/YYYY";
  const FORMAT_YEAR_MONTH_DAY = "YYYY-MM-DD";
  const TIMEZONE_EXAMPLE = "America/Sao_Paulo";

  return {
    sutUTC,
    ISO86014_REGEX,
    ISO8601_EXAMPLE,
    UTC_TIMESTAMP_EXAMPLE,
    FORMAT_DAY_MONTH_YEAR_REGEX,
    FORMAT_DAY_MONTH_YEAR_BR,
    FORMAT_YEAR_MONTH_DAY,
    TIMEZONE_EXAMPLE,
  };
};

describe.skip("Date with Timezone Service", () => {
  it("Should return hours (HH) from timestamp with timezone", (done) => {
    const { sutUTC, UTC_TIMESTAMP_EXAMPLE } = makeSut();
    const date = sutUTC.getHoursFromTimestampWithTimezone(UTC_TIMESTAMP_EXAMPLE);
    expect(date).toMatch("16");
    done();
  });

  it("Should check if timestamp is on UTC mode", (done) => {
    const { sutUTC, UTC_TIMESTAMP_EXAMPLE } = makeSut();
    const dateUTC = sutUTC.isTimestampUTC(UTC_TIMESTAMP_EXAMPLE);
    expect(dateUTC).toBeTruthy();
    done();
  });

  it("Should check if timestamp is on ISO_8601 format", (done) => {
    const { sutUTC, ISO8601_EXAMPLE } = makeSut();
    const dateISO8601 = sutUTC.isTimestampISO_8601(ISO8601_EXAMPLE);
    expect(dateISO8601).toBeTruthy();
    done();
  });

  it("Should format timestamp to be with time 00:00:00 and with right timezone", (done) => {
    const { sutUTC, ISO8601_EXAMPLE, TIMEZONE_EXAMPLE } = makeSut();
    const isoDateWithoutTime = "2020-04-02T00:00:00-03:00";

    const dateFormatted = sutUTC.getDateAndAddTimezone({
      timestamp: ISO8601_EXAMPLE,
      timezone: TIMEZONE_EXAMPLE,
    });
    expect(dateFormatted).toBe(isoDateWithoutTime);
    done();
  });

  it("Should return date (YYYY-MM-DD) from timestamp with timezone", (done) => {
    const { sutUTC, UTC_TIMESTAMP_EXAMPLE } = makeSut();
    const date = sutUTC.getDateFromTimestampWithTimezone(UTC_TIMESTAMP_EXAMPLE);
    expect(date).toMatch("2020-04-02");
    done();
  });

  it("Should return time (HH:mm:ss) from timestamp with timezone", (done) => {
    const { sutUTC, UTC_TIMESTAMP_EXAMPLE } = makeSut();
    const date = sutUTC.getTimeFromTimestampWithTimezone(UTC_TIMESTAMP_EXAMPLE);
    expect(date).toMatch("16:55:00");
    done();
  });
});
