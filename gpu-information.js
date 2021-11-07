const electron = require("electron");
// Importing the app module using Electron remote
const app = electron.remote.app;
var xValues = ["Browser usage", "GPU usage", "Tab usage"];
let yValues = [];
var barColors = ["red", "green", "blue"];
setInterval(function () {
  yValues = [];
  document.getElementById("myChart").innerHTML = "";
  document.getElementById("gpu-info").innerHTML = "";
  app
    .getAppMetrics()
    .map((val) =>
      checkGPU(
        "Pid : " +
          val.pid +
          " , " +
          val.type +
          " usage: " +
          val.cpu.percentCPUUsage,
        val.cpu.percentCPUUsage
      )
    );
}, 5000);

function checkGPU(message, value) {
  var el = document.getElementById("gpu-info");
  var newItem = document.createElement("LI");
  var textnode = document.createTextNode(message);
  newItem.appendChild(textnode);
  el.appendChild(newItem);
  yValues.push(value);
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "",
      },
    },
  });
}

function gpuAppMetric() {
  return (document.getElementById("gpu-info").innerHTML = "");
}
