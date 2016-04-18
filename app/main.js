var xhr = new XMLHttpRequest();
xhr.open('GET', "/news", true);
xhr.send();
xhr.onreadystatechange = processRequest;

var response;

function processRequest(event) {
  if(xhr.status === 200){
    response = xhr.response;
    IsJsonString(response);
  } else {
    console.log("Error", xhr.status)
  }
}

function IsJsonString(str) {
  try {
    response = JSON.parse(str);
  } catch (e) {
    return false;
  }
  console.log(response)
  addElements(response);
  return response;
}


function addElements(data){
  var ul = document.getElementById("list-container");

  for(var i = 0; i < data.length; i ++){
    var li = document.createElement("li");
    var content = data[i];
    li.appendChild(document.createTextNode(content.title));
    ul.appendChild(li)
  }
}


