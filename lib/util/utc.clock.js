import moment from "moment";

const utcClock = () =>
  moment.utc().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");

export default utcClock;
