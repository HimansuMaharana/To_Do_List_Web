document.addEventListener("DOMContentLoaded", () => {
    // Selects input, priority, add button, task list, progress bar, progress text, and theme toggle elements.
    const taskInput = document.getElementById("task-text");
    const taskPriority = document.getElementById("task-priority");
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const progressBar = document.getElementById("task-progress");
    const progressText = document.getElementById("progress-text");
    const themeToggle = document.getElementById("theme-toggle");
    
    // Initializes an empty array to store tasks.
    let tasks = [];

    /**
     * Updates the progress bar and text based on completed tasks.
     */
    function updateProgress() {
        // Filters completed tasks.
        const completedTasks = tasks.filter(task => task.completed).length;
        // Gets the total number of tasks.
        const totalTasks = tasks.length;
        // Calculates progress percentage.
        const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        // Sets progress bar value and updates progress text.
        progressBar.value = progress;
        progressText.textContent = `${Math.round(progress)}% `;
    }

    /**
     * Renders tasks from the tasks array to the task list.
     */
    function renderTasks() {
        // Clears the task list.
        taskList.innerHTML = "";
        // Iterates through each task in the tasks array.
        tasks.forEach((task, index) => {
            // Creates a list item for each task.
            const li = document.createElement("li");
            li.className = "task-item";
            
            // Creates a span for the task content.
            const taskContent = document.createElement("span");
            taskContent.textContent = task.text;
            // Adds line-through style if the task is completed.
            if (task.completed) {
                taskContent.style.textDecoration = "line-through";
            }
            
            // Creates a span for the task priority label.
            const priorityLabel = document.createElement("span");
            priorityLabel.className = `task-priority ${task.priority}`;
            priorityLabel.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
            
            // Creates a div for task actions (complete, edit, delete).
            const actions = document.createElement("div");
            actions.className = "task-actions";
            
            // Creates a complete button.
            const completeBtn = document.createElement("button");
            completeBtn.className = "complete-btn";
            completeBtn.textContent = "✔";
            completeBtn.onclick = () => {
                // Toggles task completion status.
                tasks[index].completed = !tasks[index].completed;
                renderTasks();
                updateProgress();
            };
            
            // Creates an edit button.
            const editBtn = document.createElement("button");
            editBtn.className = "edit-btn";
            editBtn.textContent = "✏";
            editBtn.onclick = () => {
                // Prompts user to edit task text.
                const newText = prompt("Edit task:", task.text);
                if (newText) {
                    tasks[index].text = newText;
                    renderTasks();
                }
            };
            
            // Creates a delete button.
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "🗑";
            deleteBtn.onclick = () => {
                // Confirms deletion and removes task.
                if (confirm("Are you sure you want to delete this task?")) {
                    tasks.splice(index, 1);
                    renderTasks();
                    updateProgress();
                }
            };
            
            // Appends action buttons to the actions div.
            actions.appendChild(completeBtn);
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            
            // Appends task content, priority label, and actions to the list item.
            li.appendChild(taskContent);
            li.appendChild(priorityLabel);
            li.appendChild(actions);
            // Appends the list item to the task list.
            taskList.appendChild(li);
        });
        // Updates the progress after rendering tasks.
        updateProgress();
    }

    // Adds event listener to the add task button.
    addTaskBtn.addEventListener("click", () => {
        // Gets task text and priority.
        const text = taskInput.value.trim();
        const priority = taskPriority.value;
        // Adds task to array if text is not empty.
        if (text) {
            tasks.push({ text, priority, completed: false });
            taskInput.value = "";
            renderTasks();
        }
    });

    // Adds event listener to the theme toggle button.
    themeToggle.addEventListener("click", () => {
        // Toggles dark mode class on the body.
        document.body.classList.toggle("dark-mode");
        // Updates theme toggle button text based on current theme.
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀" : "🌙";
    });
});