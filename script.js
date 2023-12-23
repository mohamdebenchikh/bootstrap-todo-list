document.addEventListener("DOMContentLoaded", function () {
    // Get elements from the DOM
    const taskInput = document.querySelector("#task-input");
    const taskForm = document.querySelector("#task-form");
    const taskList = document.querySelector("#task-list");

    // Event listener for form submission
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addNewTask(taskText);
            taskInput.value = "";
        }
    });

    // Function to add a new task
    function addNewTask(taskText) {
        // Create a new list item
        const listItem = document.createElement("li");

        // Generate a random ID for the task
        const taskId = generateRandomId();
        listItem.id = taskId;
        listItem.draggable = true;
        listItem.classList = "list-group-item py-3 draggable";

        // Create a div for task content and controls
        const taskContentDiv = document.createElement("div");
        taskContentDiv.classList = "d-flex justify-content-between align-items-center";

        // Create a label for the task text
        const taskLabel = document.createElement("label");
        taskLabel.innerText = taskText;

        // Create a checkbox for task completion
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList = "m-2";
        checkbox.addEventListener("change", function () {
            toggleTaskCompletion(taskId);
        });

        // Create a button for task deletion
        const deleteBtn = document.createElement("button");
        deleteBtn.classList = "btn btn-danger btn-sm";
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", function () {
            removeTask(taskId);
        });

        // Append all elements to the task list item
        taskLabel.prepend(checkbox);
        taskContentDiv.appendChild(taskLabel);
        taskContentDiv.appendChild(deleteBtn);
        listItem.appendChild(taskContentDiv);

        // Append the new task to the task list
        taskList.appendChild(listItem);


        // Add event listeners for drag and drop
        listItem.addEventListener("dragstart", handleDragStart);
        listItem.addEventListener("dragover", handleDragOver);
        listItem.addEventListener("dragenter", handleDragEnter);
        listItem.addEventListener("dragleave", handleDragLeave);
        listItem.addEventListener("drop", handleDrop);
        listItem.addEventListener("dragend", handleDragEnd);
    }

    // Function to generate a random ID
    function generateRandomId() {
        return "task" + Math.random().toString(36).substr(2, 9);
    }

    // Function to remove a task
    function removeTask(taskId) {
        const listItem = document.getElementById(taskId);
        taskList.removeChild(listItem);
    }

    // Function to toggle task completion
    function toggleTaskCompletion(taskId) {
        const listItem = document.getElementById(taskId);
        const checkbox = listItem.querySelector("input[type='checkbox']");
        listItem.classList.toggle("completed", checkbox.checked);
    }


    // Drag and Drop Functions

    let draggedItem = null;

    function handleDragStart(event) {
        draggedItem = this;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", this.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    function handleDragEnter(event) {
        this.classList.add("dragging");
    }

    function handleDragLeave(event) {
        this.classList.remove("dragging");
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedItemId = event.dataTransfer.getData("text/plain");
        const droppedItem = document.getElementById(droppedItemId);
        const isBefore = draggedItem.compareDocumentPosition(this) & Node.DOCUMENT_POSITION_PRECEDING;
        taskList.insertBefore(draggedItem, isBefore ? this : this.nextSibling);
        this.classList.remove("dragging");
    }

    function handleDragEnd(event) {
        draggedItem = null;
        const draggingItems = document.querySelectorAll(".dragging");
        draggingItems.forEach(item => item.classList.remove("dragging"));
    }
});
