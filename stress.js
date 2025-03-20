import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 100,
  duration: "1m",
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function () {
  http.get("https://api.softwhere.work/api/employees?pagination[limit]=100");
  sleep(1);
}
