// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log("rerender");

var usbDetect = require("usb-detection");

usbDetect.startMonitoring();

// Detect add/insert
usbDetect.on("add", function (device) {
  addLog("Device added : " + device.deviceName, "add");
});
usbDetect.on("add:vid", function (device) {
  addLog("Device added : " + device.deviceName, "add");
});
usbDetect.on("add:vid:pid", function (device) {
  addLog("Device added : " + device.deviceName, "add");
});

// Detect remove
usbDetect.on("remove", function (device) {
  addLog("Device removed : " + device.deviceName, "remove");
});
usbDetect.on("remove:vid", function (device) {
  addLog("Device removed : " + device.deviceName, "remove");
});
usbDetect.on("remove:vid:pid", function (device) {
  addLog("Device removed : " + device.deviceName, "remove");
});

// Detect add or remove (change)
usbDetect.on("change", function (device) {
  addLog("Device changed : " + device.deviceName, "change");
});
usbDetect.on("change:vid", function (device) {
  addLog("Device changed : " + device.deviceName, "change");
});
usbDetect.on("change:vid:pid", function (device) {
  addLog("Device changed : " + device.deviceName, "change");
});

// Get a list of USB devices on your system, optionally filtered by `vid` or `pid`
usbDetect.find(function (err, devices) {
  console.log("find", devices, err);
});
usbDetect.find(vid, function (err, devices) {
  console.log("find", devices, err);
});
usbDetect.find(vid, pid, function (err, devices) {
  console.log("find", devices, err);
});
// Promise version of `find`:
usbDetect
  .find()
  .then(function (devices) {
    console.log(devices);
  })
  .catch(function (err) {
    console.log(err);
  });
// Allow the process to exit
usbDetect.stopMonitoring();

function addLog(message, type) {
  var el = document.getElementById("usb-log-container");
  var newItem = document.createElement("LI");
  var textnode = document.createTextNode(message);
  if (type == "remove") {
    newItem.style.color = "red";
  } else if (type == "change") {
    newItem.style.color = "blue";
  } else {
    newItem.style.color = "green";
  }
  newItem.appendChild(textnode);
  el.appendChild(newItem);
}
