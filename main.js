const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const addBtn = $(".add-btn");
const taskGrid = $(".task-grid");
const modal = $("#addTaskModal");
const modalOverlay = $(".modal-overlay");
const modalClose = $(".modal-close");
const todoForm = $(".todo-app-form");
const taskTitleInput = $("#taskTitle");
const taskDescriptionInput = $("#taskDescription");
const taskCategorySelect = $("#taskCategory");
const taskPrioritySelect = $("#taskPriority");
const startTimeInput = $("#startTime");
const endTimeInput = $("#endTime");
const taskDateInput = $("#taskDate");
const taskColorSelect = $("#taskColor");
const cancelBtn = $(".btn-secondary");

let todoTasks = [];

function openModal() {
    modal.className = "modal-overlay show";
    taskTitleInput.focus();
}

function closeModal() {
    modal.className = "modal-overlay";
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const newTask = {
        title: taskTitleInput.value.trim(),
        description: taskDescriptionInput.value.trim(),
        category: taskCategorySelect.value,
        priority: taskPrioritySelect.value,
        startTime: startTimeInput.value,
        endTime: endTimeInput.value,
        dueDate: taskDateInput.value,
        cardColor: taskColorSelect.value,
        isCompleted: false
    };
    
    todoTasks.unshift(newTask);
    
    renderTasks();
    
    todoForm.reset();
    closeModal();
}


function renderTasks() {
    taskGrid.innerHTML = '';
    
    todoTasks.forEach((task, index) => {
        const timeDisplay = task.startTime && task.endTime 
            ? `${formatTime(task.startTime)} - ${formatTime(task.endTime)}`
            : 'No time set';
            
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${task.cardColor}${task.isCompleted ? ' completed' : ''}`;
        
        taskCard.innerHTML = `
            <div class="task-header">
                <h3 class="task-title">${task.title}</h3>
                <button class="task-menu">
                    <i class="fa-solid fa-ellipsis fa-icon"></i>
                    <div class="dropdown-menu">
                        <div class="dropdown-item">
                            <i class="fa-solid fa-pen-to-square fa-icon"></i>
                            Edit
                        </div>
                        <div class="dropdown-item complete">
                            <i class="fa-solid fa-check fa-icon"></i>
                            ${task.isCompleted ? 'Mark as Active' : 'Mark as Complete'}
                        </div>
                        <div class="dropdown-item delete">
                            <i class="fa-solid fa-trash fa-icon"></i>
                            Delete
                        </div>
                    </div>
                </button>
            </div>
            <p class="task-description">${task.description || 'No description'}</p>
            <div class="task-time">${timeDisplay}</div>
        `;
        
        taskGrid.appendChild(taskCard);
    });
}


function formatTime(time) {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

addBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
todoForm.addEventListener('submit', handleFormSubmit);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});
