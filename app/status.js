function checkConnectionStatus(stat, connected){
  var status = document.getElementById("status")
  if(connected){
    status.classList.add('online')
    status.classList.remove('offline')
  } else {
    status.classList.add('offline')
    status.classList.remove('online')
  }

}

window.addEventListener("load", function(event){
  if(navigator.onLine){
    checkConnectionStatus("online", true)
  } else {
    checkConnectionStatus("offline", false)
  }
}, false)

window.addEventListener("online", function(event){
  checkConnectionStatus("online", true)
}, false)
  
window.addEventListener("offline", function(event){
  checkConnectionStatus("offline", false)
}, false)

