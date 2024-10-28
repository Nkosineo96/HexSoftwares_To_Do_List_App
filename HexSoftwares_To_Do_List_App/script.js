// Get elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Initialize storage
const storage = window.localStorage;
const tasks = JSON.parse(storage.getItem('tasks')) || [];

// Function to add task
function addTask(task) {
    tasks.push({ text: task, completed: false });
    storage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to remove task
function removeTask(index) {
    tasks.splice(index, 1);
    storage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    storage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskElement.innerHTML = `
            ${task.text}
            <button onclick="removeTask(${index})">Remove</button>
            <button onclick="toggleCompletion(${index})">${task.completed ? 'Uncomplete' : 'Complete'}</button>
        `;
        taskList.appendChild(taskElement);
    });
}

// Event listeners
addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        addTask(task);
        taskInput.value = '';
    }
});

// Initial render
renderTasks();