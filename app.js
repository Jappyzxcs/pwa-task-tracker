document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // FEATURE 1: Load saved tasks from LocalStorage (or create an empty list if none exist)
    let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

    // Helper function to save current tasks to memory
    function saveTasks() {
        localStorage.setItem('myTasks', JSON.stringify(tasks));
    }

    // Function to build a task on the screen
    function renderTask(task) {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        // The text of the task
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        taskSpan.className = 'task-text';
        
        // FEATURE 2: Click text to toggle "Complete"
        taskSpan.addEventListener('click', () => {
            task.completed = !task.completed; // Flip true/false
            li.classList.toggle('completed'); // Add/remove CSS class
            saveTasks(); // Save the new status
        });

        // The Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        
        deleteBtn.addEventListener('click', () => {
            // Remove from the array and save
            tasks = tasks.filter(t => t.id !== task.id); 
            saveTasks();
            // Remove from the screen
            taskList.removeChild(li); 
        });

        // Put it all together
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    // Loop through saved tasks and put them on the screen when the app opens
    tasks.forEach(renderTask);

    // Function to add a brand new task
    function addTask() {
        const text = taskInput.value.trim();
        if (text !== '') {
            // Create a task object with a unique ID
            const newTask = {
                id: Date.now(), 
                text: text,
                completed: false
            };
            
            tasks.push(newTask); // Add to our list
            saveTasks();         // Save to memory
            renderTask(newTask); // Put on screen

            // Clear the input box
            taskInput.value = '';
            taskInput.focus();
        }
    }

    // Event Listeners for clicking "Add" or pressing "Enter"
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
});
