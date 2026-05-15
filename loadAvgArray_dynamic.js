const measureEnum = {
  AVGSYS: 0,
  AVGDIA: 1,
  AVGCHL: 2,
  AVGHDL: 3,
  AVGLDL: 4,
  AVGA1C: 5,
  AVGTRI: 6,
  AVGEGFR: 7,
  AVGSERC: 8,
  AVGMALB: 9,
};

let avgLabs = {};

function loadAvgArray() {
  return fetch("avgValuesDiab.json")
    .then((response) => response.json())
    .then((data) => {
      avgLabs = data;
      console.log("Lab averages loaded", avgLabs);
    })
    .catch((error) => {
      console.error("Failed to load average lab values:", error);
    });
}
