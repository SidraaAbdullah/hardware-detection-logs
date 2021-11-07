var hound = require("hound");
var watcher;
function StartWatcher(path) {
  // document.getElementById("start").disabled = true;
  document.getElementById("stop").style.display = "block";
  document.getElementById(
    "messageLogger"
  ).innerHTML += `<br> Current Watching Path: ${path}`;
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

// // Unwatch specific files or directories.
// watcher.unwatch("/tmp/another_file");
// // Unwatch all watched files and directories.
// watcher.clear();

document.getElementById("start").addEventListener(
  "click",
  function (e) {
    const { dialog } = require("electron").remote;
    dialog.showOpenDialog(
      {
        properties: ["openDirectory"],
      },
      function (path) {
        if (path) {
          StartWatcher(path[0]);
        } else {
          console.log("No path selected");
        }
      }
    );
  },
  false
);

document.getElementById("stop").addEventListener(
  "click",
  function (e) {
    watcher.clear();
    document.getElementById("start").disabled = false;
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
