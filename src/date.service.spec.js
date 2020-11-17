import { DateFnsService } from "./dateFns.service";

const makeSut = () => {
  const sut = new DateFnsService();

  const ISO86014_REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/;
  const ISO8601_EXAMPLE = "2020-04-02T08:02:17-03:00";
  const UTC_TIMESTAMP_EXAMPLE = "2020-04-02T16:55:00.000Z";
  const FORMAT_DAY_MONTH_YEAR_REGEX = /[0-3][0-9][/][0-9]{2}[/][0-9]{4}/;
  const FORMAT_DAY_MONTH_YEAR_BR = "dd/MM/yyyy";
  const FORMAT_YEAR_MONTH_DAY = "yyyy-mm-dd";
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
  it("Should format timestamp in ISO8601, e.g. '2020-04-02T08:02:17-05:00", (done) => {
    const { sut, ISO86014_REGEX, ISO8601_EXAMPLE } = makeSut();
    const timestampFormatted = sut.formatByDefaultOrder(ISO8601_EXAMPLE);
    expect(timestampFormatted).toMatch(ISO86014_REGEX);
    expect(timestampFormatted).toBe("2020-04-02T08:02:17-03:00");
    done();
  });

  it("Should format current timestamp in custom format dd/mm/yyyy", (done) => {
    const {
      sut,
      ISO8601_EXAMPLE,
      FORMAT_DAY_MONTH_YEAR_REGEX,
      FORMAT_DAY_MONTH_YEAR_BR,
    } = makeSut();
    const timestampFormatted = sut.formatByCustomOrder(
      ISO8601_EXAMPLE,
      FORMAT_DAY_MONTH_YEAR_BR,
    );
    expect(timestampFormatted).toMatch(FORMAT_DAY_MONTH_YEAR_REGEX);
    expect(timestampFormatted).toBe("02/04/2020");
    done();
  });

  it("Should return current date and time formatted in ISO8601", (done) => {
    const { sut, ISO86014_REGEX } = makeSut();
    const currentTimestamp = sut.currentDateTime();
    expect(currentTimestamp).toMatch(ISO86014_REGEX);
    done();
  });

  it("Should return current date and time formatted in dd/mm/yyyy", (done) => {
    const { sut, FORMAT_DAY_MONTH_YEAR_REGEX, FORMAT_DAY_MONTH_YEAR_BR } = makeSut();
    const currentTimestamp = sut.currentDateFormattedByCustom(FORMAT_DAY_MONTH_YEAR_BR);
    expect(currentTimestamp).toMatch(FORMAT_DAY_MONTH_YEAR_REGEX);
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

  it("Should get first day of the week since the date passed", (done) => {
    const { sut, ISO8601_EXAMPLE } = makeSut();
    const sevenDaysBefore = "2020-03-26T08:02:17-03:00";
    const dateFormatted = sut.getStartOfWeekSinceDate(ISO8601_EXAMPLE);
    expect(dateFormatted).toBe(sevenDaysBefore);
    done();
  });

  it("Should check if timestamp is on ISO_8601 format", (done) => {
    const { sut, ISO8601_EXAMPLE } = makeSut();
    const dateISO8601 = sut.isTimestampISO_8601(ISO8601_EXAMPLE);
    expect(dateISO8601).toBeTruthy();
    done();
  });

  it("Should adapt format string to be valid by date-fns", (done) => {
    const { sut } = makeSut();
    const formatValid = "dd/MM/yyyy";
    const formatInvalid = "DD/mm/YYYY";

    const formatAdapted = sut.processAndAdaptFormat(formatInvalid);
    expect(formatAdapted).toBe(formatValid);
    expect(formatAdapted.length).toBe(10);
    done();
  });
});
