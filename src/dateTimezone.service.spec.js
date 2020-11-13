import { DateFnsTimezoneService } from "./dateFnsTimezone.service";

const makeSut = () => {
  const sutUTC = new DateFnsTimezoneService();

  const ISO86014_REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/;
  const ISO_8601_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXX";
  const ISO8601_EXAMPLE = "2020-04-02T08:02:17-03:00";
  const UTC_TIMESTAMP_EXAMPLE = "2020-04-02T16:55:00.000Z";
  const FORMAT_DAY_MONTH_YEAR_REGEX = /[0-3][0-9][/][0-9]{2}[/][0-9]{4}/;
  const FORMAT_DAY_MONTH_YEAR_BR = "dd/MM/yyyy";
  const FORMAT_YEAR_MONTH_DAY = "yyyy-mm-dd";
  const TIMEZONE_EXAMPLE = "America/Sao_Paulo";

  return {
    sutUTC,
    ISO86014_REGEX,
    ISO_8601_FORMAT,
    ISO8601_EXAMPLE,
    UTC_TIMESTAMP_EXAMPLE,
    FORMAT_DAY_MONTH_YEAR_REGEX,
    FORMAT_DAY_MONTH_YEAR_BR,
    FORMAT_YEAR_MONTH_DAY,
    TIMEZONE_EXAMPLE,
  };
};

describe("Date with Timezone Service", () => {
  it("Should return hours (HH) from timestamp with timezone", (done) => {
    const { sutUTC, UTC_TIMESTAMP_EXAMPLE } = makeSut();
    const date = sutUTC.getHoursFromTimestampWithTimezone(UTC_TIMESTAMP_EXAMPLE);
    const hoursInLocalZone = "13";
    expect(date).toMatch(hoursInLocalZone);
    done();
  });

  it("Should process and format timestamp with right timezone", (done) => {
    const { sutUTC, ISO8601_EXAMPLE } = makeSut();
    const isoDateWithNewTimezone = "2020-04-02T08:02:17-04:00";

    const dateFormatted = sutUTC.processAndFormatTimestampByTimezone({
      timestamp: ISO8601_EXAMPLE,
      timezone: "America/Manaus",
    });
    expect(dateFormatted).toBe(isoDateWithNewTimezone);
    done();
  });

  it("Should process and format timestamp with right timezone and time 00:00", (done) => {
    const { sutUTC } = makeSut();
    const isoExampleWithoutTime = "2020-04-02T00:00:00-03:00";
    const isoDateFormatted = "2020-04-02T00:00:00-04:00";

    const dateFormatted = sutUTC.processAndFormatTimestampByTimezone({
      timestamp: isoExampleWithoutTime,
      timezone: "America/Manaus",
    });
    expect(dateFormatted).toBe(isoDateFormatted);
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

  it("Should format timestamp to be with right timezone", (done) => {
    const { sutUTC, ISO8601_EXAMPLE } = makeSut();
    const isoDateManaus = "2020-04-02T08:02:17-04:00";

    const dateFormatted = sutUTC.formatTimestampByTimezone({
      timestamp: ISO8601_EXAMPLE,
      timezone: "America/Manaus",
    });
    expect(dateFormatted).toBe(isoDateManaus);
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
    const timeInLocalZone = "13:55:00";
    expect(date).toMatch(timeInLocalZone);
    done();
  });
});
