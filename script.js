// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to add a new task
    function addTask() {
        // Get and trim the task input value
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create new list item (li)
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        // Use classList.add instead of className
        removeBtn.classList.add("remove-btn");

 
        // Add event listener to remove button
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Append button to list item
        li.appendChild(removeBtn);

        // Append list item to task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Event listener for button click
    addButton.addEventListener("click", addTask);

    // Event listener for pressing Enter key
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
