const electron = require("electron");
// Importing the app module using Electron remote
const app = electron.remote.app;

setInterval(function () {
  app
    .getAppMetrics()
    .map((val) =>
      checkGPU(
        "Pid : " + val.pid + " , " + val.type + " : " + val.cpu.percentCPUUsage
      )
    );
}, 3000);

function checkGPU(message) {
  var el = document.getElementById("gpu-info");
  var newItem = document.createElement("LI");
  var textnode = document.createTextNode(message);
  newItem.appendChild(textnode);
  el.appendChild(newItem);
}

function gpuAppMetric() {
  return (document.getElementById("gpu-info").innerHTML = "");
}
