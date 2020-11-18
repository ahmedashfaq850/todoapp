var list = document.getElementById("list")
var task = document.getElementById("task")

// get data function
firebase.database().ref('todos').on('child_added',function(data){
   
    //create li tag with text node
    var li = document.createElement('li');
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)
    // create delete button
    var delbtn = document.createElement("button")
    var delText = document.createTextNode("DELETE")
    delbtn.setAttribute("class","btn")
    delbtn.setAttribute("onclick","deleteItem(this)")
    delbtn.setAttribute("id",data.val().key)
    delbtn.appendChild(delText);
    // create edit button
    var editbtn = document.createElement("button");
    var editText = document.createTextNode("EDIT");
    editbtn.setAttribute("class","btn")
    editbtn.setAttribute("onclick","editItem(this)")
    editbtn.setAttribute("id",data.val().key)
    editbtn.appendChild(editText);

    li.appendChild(delbtn);
    li.appendChild(editbtn);

    list.appendChild(li)
})

function addtodo(){
    var task = document.getElementById("task")
    if (task.value!=""){
        // create firebase ref 
    var database = firebase.database().ref('todos');
    // create key 
    var key = database.push().key;
    // create object
    var todo = {
        value: task.value,
        key: key,
    }
    database.child(key).set(todo);
    task.value = "";
    }else{
        alert("Please Enter the task")
    }
    
}

function editItem(e){
    var val = prompt("Enter Updated Value",e.parentNode.firstChild.nodeValue)
    var edittodo = {
        value:val,
        key:e.id
    }
    firebase.database().ref("todos").child(e.id).set(edittodo);
    e.parentNode.firstChild.nodeValue = val;
}

function deleteItem(e){
    firebase.database().ref('todos').child(e.id).remove();
    e.parentNode.remove();
}

function deleteall(){
    firebase.database().ref("todos").remove();
    list.innerHTML = "";
}