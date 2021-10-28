let batteryPromise = navigator.getBattery();
batteryPromise.then(batteryCallback);
function printBatteryStatus(batteryObject) {
  document.getElementById(
    "battery-charging-state"
  ).innerHTML = `Battery charging: ${batteryObject.charging ? "Yes" : "No"}`;
  document.getElementById(
    "battery-percentage"
  ).innerHTML = `Battery level: ${Math.round(batteryObject.level * 100)}%`;
}
function batteryCallback(batteryObject) {
  printBatteryStatus(batteryObject);
  batteryObject.addEventListener("chargingchange", function (ev) {
    printBatteryStatus(batteryObject);
  });
  batteryObject.addEventListener("levelchange", function (ev) {
    printBatteryStatus(batteryObject);
  });
}
