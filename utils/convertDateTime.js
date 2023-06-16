import dayjs from "dayjs";

function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

function convertDateTime(n, format = "DD/MM/YYYY") {
  // let nn = n.replace(/\-/g, "/");
  // const d = convertTZ(`${nn} +0000`, "Asia/Ho_Chi_Minh");
  // const dformat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") + " " + [d.getHours(), d.getMinutes()].join(":");
  // return dformat;
  return dayjs.utc(n).local().format(format);
}

export default convertDateTime;
