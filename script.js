const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
    if (taskInput.value === "") {
        document.getElementById("error").innerHTML = "Please enter a task!!";
    } else {
        document.getElementById("error").innerHTML = "";
        addTask(taskInput.value);
        taskInput.value = "";
        saveData();
    }
});

function addTask(taskText) {
    let newList = document.createElement("li");
    newList.innerHTML = taskText;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    newList.appendChild(span);

    span.addEventListener("click", function (e) {
        e.stopPropagation();
        newList.remove();
        saveData();
    });

    taskList.prepend(newList);
}

taskList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        if (e.target.classList.contains("checked")) {
            e.target.style.setProperty('--background-image', 'url("checked.png")');
        } else {
            e.target.style.setProperty('--background-image', 'url("unchecked.png")');
        }
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showTask() {
    taskList.innerHTML = localStorage.getItem("data") || "";

    document.querySelectorAll("#taskList li span").forEach(span => {
        span.addEventListener("click", function (e) {
            e.stopPropagation();
            this.parentElement.remove();
            saveData();
        });
    });
}

showTask();