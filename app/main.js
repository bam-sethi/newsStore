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
    var content = data[i];
    var li = document.createElement("li");
    var head = document.createElement("h2")
    var p = document.createElement("p");
    var img = new Image(250, 150);
    img.src = content.image
    img.classList.add('news-image')
    

    li.appendChild(head);
    li.appendChild(p);
    li.classList.add('items');
    head.classList.add('news-title');

    head.appendChild(document.createTextNode(content.title));
    li.insertBefore(img, head);
    p.appendChild(document.createTextNode(content.summary));
    p.appendChild(document.createTextNode(content.description));
    ul.appendChild(li)
  }
}

