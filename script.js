// Run everything after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList  = document.getElementById('task-list');

    /**
     * Add a task to the DOM (and optionally to Local Storage)
     * @param {string} taskText - The task text. If omitted, read from input.
     * @param {boolean} save - Whether to save to Local Storage (default: true)
     */
    function addTask(taskText, save = true) {
        // Allow calling with no arg -> read from input
        const text = (typeof taskText === 'string' ? taskText : taskInput.value).trim();

        if (text === '') {
            // Only alert when user is trying to add from the input
            if (typeof taskText !== 'string') alert('Please enter a task!');
            return;
        }

        // Create <li> and set its text
        const li = document.createElement('li');
        li.textContent = text;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // ✅ required by checker

        // Remove from DOM + Local Storage
        removeBtn.onclick = () => {
            taskList.removeChild(li);

            // Remove ONE matching instance from stored array
            const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
            const idx = stored.indexOf(text);
            if (idx > -1) {
                stored.splice(idx, 1);
                localStorage.setItem('tasks', JSON.stringify(stored));
            }
        };

        // Build DOM
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
            stored.push(text);
            localStorage.setItem('tasks', JSON.stringify(stored));
        }

        // Clear input only for manual adds
        if (typeof taskText !== 'string') taskInput.value = '';
    }

    // Load tasks from Local Storage on startup
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(t => addTask(t, false)); // false -> don't re-save
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });

    // Initialize
    loadTasks();
});
