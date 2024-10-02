const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const showCompleteBtn = document.getElementById("show-complete");
const showIncompleteBtn = document.getElementById("show-incomplete");
const deleteAllBtn = document.getElementById("delete-all");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked")
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();


function filterTasks(status){
    let tasks = listContainer.getElementsByTagName("li");
    for (let task of tasks) {
          if(status === "complete" && task.classList.contains("checked")) {
            task.style.display = "block";
          } else if(status === "incomplete" && !task.classList.contains("checked")){
            task.style.display = "block";
          }else{
            task.style.display = "none";
          }
    }
}

showCompleteBtn.addEventListener("click", function() {
    filterTasks("complete");
});

showIncompleteBtn.addEventListener("click", function() {
    filterTasks("incomplete");
});

deleteAllBtn.addEventListener("click", function() {
   if(confirm("Are you sure you want to delete all task?")) {
    listContainer.innerHTML = "";
    saveData();
   }

})
