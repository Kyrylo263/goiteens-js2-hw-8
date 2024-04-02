const addButton = document.querySelector('.add-button');
const input = document.querySelector(".taskInput");
const list = document.querySelector(".taskList");

document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

addButton.addEventListener("click", () => {
    const task = input.value.trim();
    if (task === "") return;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    displayTasks();
});

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
};

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    list.innerHTML = "";
    tasks.forEach(function (task, index) {
        const listItem = document.createElement("li");
        listItem.textContent = task.name;
        if (task.completed) {
            listItem.classList.add("completed");
        }
        listItem.onclick = function () {
            toggleTask(index);
        };
        list.appendChild(listItem);
    });
};

function displayTasks() {
    loadTasks();
};