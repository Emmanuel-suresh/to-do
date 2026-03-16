const input = document.getElementById("search");
const time = document.getElementById("time");
const list = document.getElementById("list");
const counter = document.getElementById("task-count");

function Add(){

if(input.value === ""){
alert("Write a task");
return;
}

let li = document.createElement("li");

let taskText = input.value;
let taskTime = time.value ? " (" + time.value + ")" : "";

li.innerHTML = taskText + taskTime;

let editBtn = document.createElement("button");
editBtn.innerText = "Edit";
editBtn.className = "edit-btn";
li.appendChild(editBtn);

let span = document.createElement("span");
span.innerHTML = "\u00d7";
li.appendChild(span);

list.appendChild(li);

input.value="";
time.value="";

saveData();
updateCounter();
}

list.addEventListener("click",function(e){

if(e.target.tagName === "LI"){
e.target.classList.toggle("checked");
}

else if(e.target.tagName === "SPAN"){
e.target.parentElement.remove();
}

else if(e.target.classList.contains("edit-btn")){
let li = e.target.parentElement;

let newTask = prompt("Edit task:", li.childNodes[0].nodeValue);

if(newTask !== null && newTask !== ""){
li.childNodes[0].nodeValue = newTask;
}
}

saveData();
updateCounter();

},false);

input.addEventListener("keypress",function(e){
if(e.key === "Enter"){
Add();
}
});

function saveData(){
localStorage.setItem("tasks",list.innerHTML);
}

function showTask(){
list.innerHTML = localStorage.getItem("tasks") || "";
updateCounter();
}

function updateCounter(){
let tasks = list.getElementsByTagName("li").length;
counter.textContent = "Tasks: " + tasks;
}

showTask();