let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskList = document.getElementById('taskList');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskDueDateInput = document.getElementById('taskDueDate');
const taskPriorityInput = document.getElementById('taskPriority');
const addTaskButton = document.getElementById('addTaskButton');

function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        li.innerHTML = `
            <div>
                <strong>${task.title}</strong> (${task.priority})<br>
                ${task.description} - Due: ${task.dueDate}
            </div>
            <div>
                <button onclick="toggleCompletion(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
}

function addTask() {
    const title = taskTitleInput.value.trim();
    
    if (!title) return alert("Please enter a task title.");
    
    const newTask = {
        title,
        description: taskDescriptionInput.value.trim(),
        dueDate: taskDueDateInput.value,
        priority: taskPriorityInput.value,
        completed: false
    };
    
    tasks.push(newTask);
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
    taskDueDateInput.value = '';
    
    renderTasks();
}

function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    renderTasks();
}

function editTask(index) {
    const title = prompt("Edit Task Title:", tasks[index].title);
    
    if (title !== null) {
        tasks[index].title = title.trim();
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        renderTasks();
    }
}

function deleteTask(index) {
   if (confirm("Are you sure you want to delete this task?")) {
       tasks.splice(index, 1);
       
       localStorage.setItem('tasks', JSON.stringify(tasks));
       
       renderTasks();
   }
}

addTaskButton.addEventListener('click', addTask);
renderTasks();