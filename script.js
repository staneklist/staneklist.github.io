// Paul Stanek
// Spring 2017
// Web233 Javascript
// Date: 4/9/2017
// Week 12 Assignment
// Shopping List Version 4.0

//v 4.0 save cookie
//v 4.0 read cookie on load and display
window.onload = function() {
  populateshoppinglistonload();
   displayShoppinglists();
};


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

//v 4.0 save cookie
function savecookie()
{
  delete_cookie('staneklist');
   var date = new Date();
   //keeps for a year
    date.setTime(date.getTime() + Number(365) * 3600 * 1000);
   document.cookie = 'staneklist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
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

//v 3.1 addtocart empty array
var addtocart = [];

//v 2.1: change shoppinglist array empty array
var shoppinglist = [];

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
    //3.2 - Remove edit button
    //var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppinglist(' + i + ')" />';
    var arrays = shoppinglist[i];
    arrays = "'"+arrays+"'";
    //3.2 - Add button changed to checkbox
    var chkaddcart =  ' <input name="add" type="checkbox" value="Add" onclick="addtoshopcart('+arrays+','+ i +')" />Add';
    
    TheList = TheList + shoppinglist[i] + btndelete + ' ' + chkaddcart + '<br>';
  }
  document.getElementById("MyList").innerHTML = TheList;
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
    var chkaddlist =  ' <input name="add" type="checkbox" value="Add" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" checked/>Add';
    TheList = TheList + addtocart[i] + btndelete + ' ' + chkaddlist + '<br>';
  }

  document.getElementById("MyCart").innerHTML = TheList;
}

// for adding a shopping list item with argument
//v 3.0 Update function addShoppinglist by adding objects
function addShoppinglist(item, cost) {
  //v 3.0 declare variable for groc string
  var groc="";
  //v 3.0 v 3.0 declare variable for loop count
  var count=0;
  //v 3.0 edit value for MyItems.name
  MyItems.name=item;
  //v 3.0 edit value for MyItems.cost
  MyItems.price=cost;
  //v 3.0 for loop through object propterties and 
  for (var x in MyItems){
    if (count===1){
      groc += "$";
    }
    //add to groc string from object array item
    groc += MyItems[x];
    if (count===0){
      //v 4.0 replace comma with |
      groc += "|";
      //groc += ", ";
    }
    //increment count by 1
   count++;
  }
  //push to shoppinglist
  shoppinglist.push(groc);
  //display shoppinglist
  displayShoppinglists();
  //v 2.1: call function 'clearFocus'
  clearFocus();
  //v 4.0 save cookie
  savecookie();
}

//v 2.1 add function 'clearFocus'
function clearFocus()
{
  //v 2.1: clear inputbox value out by id
  //v 2.1: http://stackoverflow.com/questions/4135818/how-to-clear-a-textbox-using-javascript 
  document.getElementById("item").value = "";
  //v 3.0 clear cost field
  document.getElementById("cost").value = "";
  //v 2.1: set focus on inputbox after text is cleared
  //v 2.1: http://stackoverflow.com/questions/17500704/javascript-set-focus-to-html-form-element 
  document.getElementById("item").focus();
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











//3.2 - Removed Edit buttons
//function changeShoppinglist(position) {
//  document.getElementById("MyList").innerHTML = shoppinglist[position];
//  var arrays = shoppinglist[position];
//  arrays = arrays.split(",");
//  var e1 = arrays[0];
//  var e2 = arrays[1];
//  var ReplacedAmount = e2.replace(/\$/g,'');
//  var eitem = prompt("Please enter new item", e1);
//  var ecost = prompt("Please enter your name", ReplacedAmount);
//  shoppinglist[position] = eitem + "," + '$' + ecost;
//  displayShoppinglists();
//  displayShoppingCart(); 
//}

//v3.2 - Removed Edit buttons
//function changeShoppingCart(position) {
//  document.getElementById("MyCart").innerHTML = shoppinglist[position];
//  var arrays = addtocart[position];
//  arrays = arrays.split(",");
//    var e1 = arrays[0];
//   var e2 = arrays[1];
// var ReplacedAmount = e2.replace(/\$/g,'');
//  var eitem = prompt("Please enter new item", e1);
//  var ecost = prompt("Please enter your name", ReplacedAmount);
//  addtocart[position] = eitem + "," + '$' + ecost;
//  displayShoppinglists();
//  displayShoppingCart() 
//}


