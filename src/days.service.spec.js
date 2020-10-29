import { DayJSDateService } from "./dayjs.service";

const makeSut = () => {
  return new DayJSDateService();
};

describe("DayJS Date Service", () => {
  it("Should instantiate a date object with current date and time", (done) => {
    const sut = makeSut();
    const dateObject = sut.instantiate();
    done();
  });

  it("Should instantiate a date object with timestamp passed", (done) => {
    const sut = makeSut();
    const customTimestamp = "2020-10-02";
    const dateObject = sut.instantiateWithCustomDate(customTimestamp);
    done();
  });

  it("Should format timestamp in ISO8601, e.g. '2020-04-02T08:02:17-05:00", (done) => {
    const sut = makeSut();
    sut.instantiate();
    const timestampFormatted = sut.formatByDefaultOrder();
    done();
  });

  it("Should format current timestamp in custom format", (done) => {
    const customOrder = "DD/MM/YYYY";
    const sut = makeSut();
    sut.instantiate();
    const timestampFormatted = sut.formatByCustomOrder(customOrder);
    done();
  });

  it("Should return current date and time formatted in ISO8601", (done) => {
    const sut = makeSut();
    const currentTimestamp = sut.currentDateTime();
    done();
  });

  it("Should return hours difference between two dates", (done) => {
    const firstDate = "2020-10-01",
      secondDate = "2020-10-02";
    const sut = makeSut();
    const hoursDifference = sut.datesDifferenceByHours({
      pastDate: firstDate,
      futureDate: secondDate,
    });

    expect(hoursDifference).toBe(24);
    done();
  });
});
