let time = new Date();
function refresh() {
  let el = document.getElementById("wifi");
  let data = navigator.onLine
    ? `Network connected at ${time}`
    : `Network connection failed at ${time}`;
  let newItem = document.createElement("LI");
  let textnode = document.createTextNode(data);
  newItem.appendChild(textnode);
  el.appendChild(newItem);
}

function networkReset() {
  return (document.getElementById("wifi").innerHTML = "");
}
