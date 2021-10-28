var hound = require("hound");
var watcher;
function StartWatcher(path) {
  document.getElementById("start").disabled = true;
  document.getElementById("stop").style.display = "block";
  document.getElementById(
    "messageLogger"
  ).innerHTML = `Current Watching Path: ${path}`;

  watcher = hound.watch(path);
  watcher.on("create", function (file, stats) {
    addLog("File created : " + file, "create");
  });
  watcher.on("change", function (file, stats) {
    addLog("File changed : " + file, "change");
  });
  watcher.on("delete", function (file) {
    addLog("File deleted : " + file, "delete");
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
    document.getElementById("messageLogger").innerHTML =
      "Nothing is being watched";
  },
  false
);

function resetLog() {
  return (document.getElementById("log-container").innerHTML = "");
}

function addLog(message, type) {
  var el = document.getElementById("file-log-container");
  var newItem = document.createElement("LI");
  var textnode = document.createTextNode(message);
  if (type == "delete") {
    newItem.style.color = "red";
  } else if (type == "change") {
    newItem.style.color = "blue";
  } else {
    newItem.style.color = "green";
  }
  newItem.appendChild(textnode);
  el.appendChild(newItem);
}
