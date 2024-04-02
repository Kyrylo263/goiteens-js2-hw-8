// 1.

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

// 2.

const form = document.querySelector(".dataForm");
const name = document.querySelector(".nameInput").value;
const email = document.querySelector(".emailInput").value;
const message = document.querySelector(".messageInput").value;

document.addEventListener("DOMContentLoaded", function () {
    loadFormData();

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        saveFormData();
    });
});

function saveFormData() {

    const formData = {
        name: name,
        email: email,
        message: message
    };

    localStorage.setItem("formData", JSON.stringify(formData));

    alert("Дані збережено!");
};

function loadFormData() {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
        document.querySelector(".nameInput").value = formData.name || "";
        document.querySelector(".emailInput").value = formData.email || "";
        document.querySelector(".messageInput").value = formData.message || "";
    };
};

// 3.

document.addEventListener("DOMContentLoaded", function () {
    loadBookmarks();

    const form = document.querySelector(".bookmarkForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        addBookmark();
    });
});

function addBookmark() {
    const input = document.querySelector(".bookmarkInput");
    const url = input.value.trim();
    if (url === "") return;

    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.push(url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    input.value = "";
    displayBookmarks();
};

function deleteBookmark(index) {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
};

function loadBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const list = document.querySelector(".bookmarkList");
    list.innerHTML = "";
    bookmarks.forEach(function (bookmark, index) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = bookmark;
        link.textContent = bookmark;
        listItem.appendChild(link);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Видалити";
        deleteButton.onclick = function () {
            deleteBookmark(index);
        };
        listItem.appendChild(deleteButton);

        list.appendChild(listItem);
    });
};

function displayBookmarks() {
    loadBookmarks();
};

// 4.

document.addEventListener("DOMContentLoaded", function () {
    loadContacts();

    const form = document.getElementById("contactForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        addContact();
    });
});

function addContact() {
    const firstName = document.getElementById("firstNameInput").value.trim();
    const lastName = document.getElementById("lastNameInput").value.trim();
    const phone = document.getElementById("phoneInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();

    if (firstName === "" || lastName === "" || phone === "" || email === "") {
        alert("Будь ласка, заповніть всі поля");
        return;
    }

    const contact = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email
    };

    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    clearForm();
    displayContacts();
};

function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
};

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const list = document.getElementById("contactList");
    list.innerHTML = "";
    contacts.forEach(function (contact, index) {
        const listItem = document.createElement("li");
        listItem.textContent = contact.firstName + " " + contact.lastName + " - " + contact.phone + " - " + contact.email;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Видалити";
        deleteButton.onclick = function () {
            deleteContact(index);
        };
        listItem.appendChild(deleteButton);

        list.appendChild(listItem);
    });
};

function displayContacts() {
    loadContacts();
};

function clearForm() {
    document.getElementById("firstNameInput").value = "";
    document.getElementById("lastNameInput").value = "";
    document.getElementById("phoneInput").value = "";
    document.getElementById("emailInput").value = "";
};