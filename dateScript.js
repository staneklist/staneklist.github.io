//v 2.1 changed to write to DOM
function displayDate ()
{
  var x = "";
  var date = new Date();
  var month = date.getMonth() + 1;
  var rawDay = date.getDate();
  var day = "0";
  if (parseInt(rawDay) < 10)
  {
    day = day + rawDay;
  }
  else
  {
    day = rawDay;
  }
  var year = date.getFullYear();
  x =  "Today's Date:  " + month + "/" + day + "/" + year;
  document.getElementById("date").innerHTML = x;
}

//call function to display date
displayDate();