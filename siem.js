var hound = require("hound");
var usb = require("usb");
const nodeDiskInfo = require("node-disk-info");

var watcher;
let path;

usb.on("attach", function (device) {
  document.getElementById("errorLogger").innerHTML = "";
  document.getElementById("messageLogger").innerHTML = `Directory loading...`;
  setTimeout(() => {
    nodeDiskInfo
      .getDiskInfo()
      .then((disks) => {
        path = disks.slice(-1)[0]._mounted;
        StartWatcher(path, device);
      })
      .catch((reason) => {
        console.error(reason);
      });
  }, 5000);
});

usb.on("detach", function (device) {
  if (path) {
    watcher.unwatch(path);
  }
  document.getElementById("stop").style.display = "none";
  document.getElementById("errorLogger").innerHTML = "Nothing is being watched";
  document.getElementById("messageLogger").innerHTML = "";
});

function StartWatcher(path, device) {
  document.getElementById("stop").style.display = "block";
  document.getElementById("usb-logs").innerHTML = "";
  document.getElementById(
    "messageLogger"
  ).innerHTML = `<br> Current Watching Path: ${path}`;
  document.getElementById("errorLogger").innerHTML = "";
  watcher = hound.watch(path);
  watcher.on("create", function (file, stats) {
    fileAddLog("File created", file, stats.size + " bytes");
  });
  watcher.on("change", function (file, stats) {
    fileAddLog("File changed", file, stats.size + " bytes");
  });
  watcher.on("delete", function (file) {
    fileAddLog("File deleted", file, "delete");
  });
}

document.getElementById("stop").addEventListener(
  "click",
  function (e) {
    document.getElementById("stop").style.display = "none";
    document.getElementById("errorLogger").innerHTML =
      "Nothing is being watched";
    document.getElementById("messageLogger").innerHTML = "";
  },
  false
);

let table = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");

table.appendChild(thead);
table.appendChild(tbody);

// Adding the entire table to the body tag
document.getElementById("file-logs").appendChild(table);

//first row
let row_1 = document.createElement("tr");
let heading_1 = document.createElement("th");
heading_1.innerHTML = "Action";
let heading_2 = document.createElement("th");
heading_2.innerHTML = "Location";
let heading_3 = document.createElement("th");
heading_3.innerHTML = "Size";

row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
thead.appendChild(row_1);

function fileAddLog(action, location, size) {
  let row_2 = document.createElement("tr");
  let row_2_data_1 = document.createElement("td");
  row_2_data_1.innerHTML = action;
  let row_2_data_2 = document.createElement("td");
  row_2_data_2.innerHTML = location;
  let row_2_data_3 = document.createElement("td");
  row_2_data_3.innerHTML = size;

  row_2.appendChild(row_2_data_1);
  row_2.appendChild(row_2_data_2);
  row_2.appendChild(row_2_data_3);
  tbody.appendChild(row_2);
}
