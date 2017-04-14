// Paul Stanek
// Spring 2017
// Web233 Javascript
// Date: 4/14/2017
// Week 13 Assignment
// Shopping List Version 4.0

//v 4.0 save cookie
//v 4.0 read cookie on load and display
window.onload = function() {
  about();
  populateshoppinglistonload();
   displayShoppinglists();
    clearFocus();
};

function about(){
  alert("This program is used to create and manage shopping lists.\n\n It will also track items as they are purchased.")
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
   str = str.replace(/%20/g, "");
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
  if (arrayLength < 1)
  {
    TheList = ''
    document.getElementById("MyListHeader").innerHTML = '';
  }
  else
  {
    document.getElementById("MyListHeader").innerHTML = 'Shopping List';
  }
  for (var i = 0; i < arrayLength; i++)
  {
    var btndelete =  ' <input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
    var arrays = shoppinglist[i];
    arrays = "'"+arrays+"'";
    //3.2 - Add button changed to checkbox
    var chkaddcart =  ' <input name="add" type="checkbox" value="Add" onclick="addtoshopcart('+arrays+','+ i +')" />';

    TheList = TheList + '<tr><td>  ' + shoppinglist[i] + '  </td><td>  ' + chkaddcart + '  </td><td> ' + btndelete + '  </td></tr>';
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
    TheList = TheList + '<tr><td>  ' + addtocart[i] + '  </td><td>  ' + chkaddlist + '  </td><td> ' + btndelete + '  </td></tr>';
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
