// Paul Stanek
// Spring 2017
// Web233 Javascript
// Date: 4/23/2017
// Week 14 Assignment
// Shopping List Version 4.1

//v4.1 get values via URL
function get(name){
    var url = window.location.search;
    var num = url.search(name);
    var namel = name.length;
    var frontlength = namel+num+1; //length of everything before the value
    var front = url.substring(0, frontlength);
    url = url.replace(front, "");
    num = url.search("&");
    if(num>=0) return url.substr(0,num);
    if(num<0)  return url;
}

//v4.1 paslist
function passlist()
{
  var getshorturl=0;
  var login = "pstan429";
  var api_key = "R_725ae10b1fc24f23901e41516368f037";
  var long_url = "https://staneklist.github.io/index.html?list="+ shoppinglist;
  try{
  $.getJSON(
             "https://api-ssl.bitly.com/v3/shorten?callback=?",
              {
                "format": "json",
                "apiKey": api_key,
                "login": login,
                "longUrl": long_url
              },
             function(response)
             {
                getshorturl = 1;
                document.getElementById("sharelist").innerHTML = 'Share List:\n' + response.data.url;
                copyToClipboard(response.data.url);
             });
  } catch(err) {
    document.getElementById("sharelist").innerHTML = 'Share List:\n' + long_url;
    copyToClipboard(long_url);
}
}

//v4.1 share function
function share()
{
   passlist();
}

//v4.1 prompt message to copy URL
function copyToClipboard(text) {
  window.prompt("Your List to Share:  ", text);
}

//v 4.0 save cookie
//v 4.0 read cookie on load and display
window.onload = function() {
  about();
  populateshoppinglistonload();
  displayShoppinglists();
  clearFocus();
};

function about(){
  alert("This app was developed in WEB-233 at Rock Valley College,\nSpring 2017.\n\nThis program is used to create, manage, and share shopping lists.\n\n It will also track items as they are purchased.");
}

//v 4.0 read cookie and return
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


//v. 4.0remove and format cookie
function remove_unwanted(str) {

  if ((str===null) || (str===''))
       return false;
 else
   str = str.toString();
   str = str.replace(/%20/g, " ");
   str = str.replace(/%21/g, "!");
   str = str.replace(/%24/g, "$");
   str = str.replace(/%7C/g, " | ");
  return str.replace(/[^\x20-\x7E]/g, '');
}


//v 4.0 save cookie
function savecookie()
{
  delete_cookie('staneklist');
   var date = new Date();
   //keeps for a year
    date.setTime(date.getTime() + Number(365) * 3600 * 1000);
   document.cookie = 'staneklist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}



//v 4.0 delete cookie
function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


//v 4.0 populateshoppinglistonload()
function populateshoppinglistonload()
{
  shoppinglist = [];
  addtocart = [];
  //load cookie into array
  var y = readCookie('staneklist');
  //remove unwanted chars and format
  y = remove_unwanted(y);
  //spit array by comma %2C
  y = y.split('%2C');
  if (y) {
    shoppinglist = y;
   }

   //v 4.1 get URL
var geturllistvalue = get("list");
  if (geturllistvalue) {
     geturllistvalue = remove_unwanted(geturllistvalue);
     geturllistvalue = geturllistvalue.split(',');
    shoppinglist = geturllistvalue;
  }
  else if (y){
  y = y.split('%2C');
  shoppinglist = y;
  }
}




//v 3.0 Create Objects for Shoppinglist
var MyItems = {
  name:"",
  price:""
};



//v 2.1: change shoppinglist array empty array
var shoppinglist = [];

//v 3.1 addtocart empty array
var addtocart = [];

//display date at top of page
displayDate();



//v 3.1 Update function addShoppinglist by adding objects
function addtoshopcart(item, num) {
    deleteShoppinglists(num);
    addtocart.push(item);
  //display shoppinglist
  displayShoppinglists();
  //v3.1 display displayShoppingCart()
  displayShoppingCart();
  //Clear
  clearFocus();
  //v 4.0 save cookie
  savecookie();
}

// for adding a shopping list item with argument
//v 3.0 Update function addShoppinglist by adding objects
function addShoppinglist(item) {
  //push to shoppinglist
  shoppinglist.push(item);
  //display shoppinglist
  displayShoppinglists();
  //v3.1 display displayShoppingCart()
  displayShoppingCart();
  //v 2.1: call function 'clearFocus'
  clearFocus();
  //v 4.0 save cookie
  savecookie();
}

//v 2.1 add function 'clearFocus'
function clearFocus()
{
  document.getElementById("item").value = "";
  //v 4.0 cost field removed
  //document.getElementById("cost").value = "";
  document.getElementById("item").focus();
}


//My Shopping List:
function displayShoppinglists()
{
  var TheList = "";
  var arrayLength = shoppinglist.length;
  var btnsharelist = '<input class="button" id="shares" name="shares" type="submit" value="Share Shopping List URL" onclick="share()" />';
  if (arrayLength < 1)
  {
    TheList = '';
    document.getElementById("MyListHeader").innerHTML = '';
    document.getElementById("sharediv").innerHTML = '';
    document.getElementById("sharebutton").innerHTML = '';
  }
  else
  {
    document.getElementById("MyListHeader").innerHTML = 'Shopping List';
    document.getElementById("sharediv").innerHTML = '<hr>';
    document.getElementById("sharebutton").innerHTML = btnsharelist;
  }
  for (var i = 0; i < arrayLength; i++)
  {
    var btndelete =  ' <input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
    var arrays = shoppinglist[i];
    arrays = "'"+arrays+"'";
    //3.2 - Add button changed to checkbox
    var chkaddcart =  ' <input name="add" type="checkbox" value="Add" onclick="addtoshopcart('+arrays+','+ i +')" />';

    TheList = TheList + '<tr><td>  ' + chkaddcart + '  </td><td>  ' + shoppinglist[i] + '  </td><td> ' + btndelete + '  </td></tr>';
  }
  document.getElementById("MyList").innerHTML = '<table id="shoppingTable"> ' + TheList + ' </table>';
}

function displayShoppingCart() {
  var TheList = "";
  var arrayLength = addtocart.length;
  if (arrayLength < 1)
  {
    TheList = TheList + '';
    document.getElementById("MyCartHeader").innerHTML = '';
  }
  else
  {
    document.getElementById("MyCartHeader").innerHTML = 'Shopping Cart';
  }
  for (var i = 0; i < arrayLength; i++)
  {
    var btndelete =  ' <input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppingCart(' + i + ')" />';
    //3.2 - Remove edit button
    //var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppingCart(' + i + ')" />';
    var arrays = addtocart[i];
    arrays = "'"+arrays+"'";
    //3.2 - Add button changed to checkbox
    var chkaddlist =  ' <input name="add" type="checkbox" value="Add" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" checked/>';
    //TheList = TheList + addtocart[i] + btndelete + ' ' + chkaddlist + '<br>';
    TheList = TheList + '<tr><td>  ' + chkaddlist + '  </td><td>  ' + addtocart[i] + '  </td><td> ' + btndelete + '  </td></tr>';
  }

  document.getElementById("MyCart").innerHTML = '<table id="cartTable"> ' + TheList + ' </table>';
}

//v3.1
function addbacktoshoppinglist(item,num) {
  //push to deleteShoppingCar
   deleteShoppingCart(num);
  shoppinglist.push(item);
  //display shoppinglist
  displayShoppinglists();
  //v3.1 display displayShoppingCart()
  displayShoppingCart();
  clearFocus();
  //v 4.0 save cookie
  savecookie();
}



//function for deleting a Shoppinglists item
//v3.1
function deleteShoppinglists(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
    //v 4.0 save cookie
  savecookie();
}

//v3.1
function deleteShoppingCart(position) {
  addtocart.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
    //v 4.0 save cookie
  savecookie();
}
