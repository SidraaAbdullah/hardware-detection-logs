const electron = require("electron");
// Importing the app module using Electron remote
const app = electron.remote.app;

app.on("gpu-info-update", () => {
  console.log("GPU Information has been Updated");
});

app.on("gpu-process-crashed", (event, killed) => {
  console.log("GPU Process has crashed");
  console.log(event);
  console.log("Whether GPU Process was killed - ", killed);
});

var metrics = document.getElementById("metrics");
metrics.addEventListener("click", () => {
  app
    .getAppMetrics()
    .map((val) =>
      checkGPU(
        "Pid : " + val.pid + " , " + val.type + " : " + val.cpu.percentCPUUsage
      )
    );
  console.log(app.getAppMetrics());
});

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
