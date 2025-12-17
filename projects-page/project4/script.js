// Task Management App - JavaScript

// Task Data
let tasks = [
    {
        id: 1,
        title: "Design homepage layout",
        description: "Create wireframes and mockups for the new homepage",
        status: "todo",
        priority: "high",
        dueDate: "2024-03-20",
        assignee: "john",
        labels: ["design"],
        createdAt: "2024-03-10",
        completed: false
    },
    {
        id: 2,
        title: "Implement user authentication",
        description: "Set up login, registration, and password reset functionality",
        status: "in-progress",
        priority: "high",
        dueDate: "2024-03-25",
        assignee: "jane",
        labels: ["development"],
        createdAt: "2024-03-08",
        completed: false
    },
    {
        id: 3,
        title: "Write API documentation",
        description: "Document all API endpoints and provide usage examples",
        status: "review",
        priority: "medium",
        dueDate: "2024-03-18",
        assignee: "alex",
        labels: ["documentation"],
        createdAt: "2024-03-12",
        completed: false
    },
    {
        id: 4,
        title: "Fix mobile responsive issues",
        description: "Address responsive design problems on mobile devices",
        status: "todo",
        priority: "medium",
        dueDate: "2024-03-22",
        assignee: "sarah",
        labels: ["development", "bug"],
        createdAt: "2024-03-15",
        completed: false
    },
    {
        id: 5,
        title: "Create product presentation",
        description: "Prepare slides for the upcoming product launch",
        status: "done",
        priority: "low",
        dueDate: "2024-03-10",
        assignee: "john",
        labels: ["design", "marketing"],
        createdAt: "2024-03-01",
        completed: true
    },
    {
        id: 6,
        title: "Conduct user testing",
        description: "Organize and run usability tests with target users",
        status: "in-progress",
        priority: "medium",
        dueDate: "2024-03-28",
        assignee: "alex",
        labels: ["research"],
        createdAt: "2024-03-05",
        completed: false
    },
    {
        id: 7,
        title: "Update database schema",
        description: "Modify database structure to support new features",
        status: "review",
        priority: "high",
        dueDate: "2024-03-19",
        assignee: "jane",
        labels: ["development"],
        createdAt: "2024-03-14",
        completed: false
    },
    {
        id: 8,
        title: "Write unit tests",
        description: "Create comprehensive unit tests for core modules",
        status: "todo",
        priority: "medium",
        dueDate: "2024-03-30",
        assignee: "sarah",
        labels: ["development", "testing"],
        createdAt: "2024-03-13",
        completed: false
    }
];

// Activity Data
let activities = [
    {
        id: 1,
        type: "task-added",
        user: "John Doe",
        taskTitle: "Design homepage layout",
        time: "2 hours ago"
    },
    {
        id: 2,
        type: "task-completed",
        user: "Jane Smith",
        taskTitle: "Create product presentation",
        time: "1 day ago"
    },
    {
        id: 3,
        type: "task-updated",
        user: "Alex Johnson",
        taskTitle: "Write API documentation",
        time: "3 hours ago"
    },
    {
        id: 4,
        type: "comment-added",
        user: "Sarah Wilson",
        taskTitle: "Fix mobile responsive issues",
        comment: "I think we should prioritize this",
        time: "5 hours ago"
    }
];

// Drag & Drop State
let draggedTask = null;
let dragSourceColumn = null;

// Current filter state
let currentStatusFilter = 'all';
let currentPriorityFilter = 'all';

// Initialize App
function initTaskManager() {
    renderTasks();
    renderActivities();
    updateTaskCounts();
    setupEventListeners();
    setupDragAndDrop();
    
    // Check if today's date is past due dates
    checkOverdueTasks();
}

// Render Tasks to Columns
function renderTasks() {
    // Clear all columns
    document.getElementById('todoColumn').innerHTML = '';
    document.getElementById('progressColumn').innerHTML = '';
    document.getElementById('reviewColumn').innerHTML = '';
    document.getElementById('doneColumn').innerHTML = '';
    
    // Filter tasks based on current filters
    let filteredTasks = [...tasks];
    
    if (currentStatusFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.status === currentStatusFilter);
    }
    
    if (currentPriorityFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.priority === currentPriorityFilter);
    }
    
    // Sort by due date
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    // Render each task to its column
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        
        switch(task.status) {
            case 'todo':
                document.getElementById('todoColumn').appendChild(taskElement);
                break;
            case 'in-progress':
                document.getElementById('progressColumn').appendChild(taskElement);
                break;
            case 'review':
                document.getElementById('reviewColumn').appendChild(taskElement);
                break;
            case 'done':
                document.getElementById('doneColumn').appendChild(taskElement);
                break;
        }
    });
}

// Create Task Element
function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.className = `task-card priority-${task.priority}`;
    taskElement.dataset.id = task.id;
    taskElement.draggable = true;
    
    // Check if task is overdue
    const today = new Date().toISOString().split('T')[0];
    const isOverdue = task.dueDate < today && !task.completed;
    
    // Format due date
    const dueDate = new Date(task.dueDate);
    const formattedDate = dueDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
    
    // Get assignee info
    const assigneeInfo = getAssigneeInfo(task.assignee);
    
    taskElement.innerHTML = `
        <div class="task-header">
            <div class="task-title">${task.title}</div>
            <button class="task-menu" onclick="showTaskMenu(${task.id})">
                <i class="fas fa-ellipsis-h"></i>
            </button>
        </div>
        
        <div class="task-description">
            ${task.description}
        </div>
        
        <div class="task-meta">
            <span class="task-priority ${task.priority}">
                ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
            <span class="task-due-date ${isOverdue ? 'overdue' : ''}">
                <i class="far fa-calendar-alt"></i>
                ${formattedDate}
            </span>
        </div>
        
        <div class="task-footer">
            <div class="task-assignee">
                <img src="${assigneeInfo.avatar}" alt="${assigneeInfo.name}" class="assignee-avatar">
            </div>
            <div class="task-labels">
                ${task.labels.map(label => `
                    <span class="label-tag-small ${label}">${label}</span>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add drag event listeners
    taskElement.addEventListener('dragstart', handleDragStart);
    taskElement.addEventListener('dragend', handleDragEnd);
    
    // Add click event for task details
    taskElement.addEventListener('click', (e) => {
        if (!e.target.closest('.task-menu')) {
            showTaskDetails(task.id);
        }
    });
    
    return taskElement;
}

// Get Assignee Info
function getAssigneeInfo(assigneeId) {
    const assignees = {
        john: {
            name: "John Doe",
            avatar: "https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff",
            role: "Product Manager"
        },
        jane: {
            name: "Jane Smith",
            avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=48bb78&color=fff",
            role: "Frontend Developer"
        },
        alex: {
            name: "Alex Johnson",
            avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=ed8936&color=fff",
            role: "Backend Developer"
        },
        sarah: {
            name: "Sarah Wilson",
            avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson&background=9f7aea&color=fff",
            role: "UX Designer"
        }
    };
    
    return assignees[assigneeId] || assignees.john;
}

// Render Activities
function renderActivities() {
    const activityFeed = document.getElementById('activityFeed');
    if (!activityFeed) return;
    
    activityFeed.innerHTML = '';
    
    activities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        
        let icon = '';
        let text = '';
        
        switch(activity.type) {
            case 'task-added':
                icon = 'task-added';
                text = `<strong>${activity.user}</strong> added a new task: <strong>${activity.taskTitle}</strong>`;
                break;
            case 'task-completed':
                icon = 'task-completed';
                text = `<strong>${activity.user}</strong> completed the task: <strong>${activity.taskTitle}</strong>`;
                break;
            case 'task-updated':
                icon = 'task-updated';
                text = `<strong>${activity.user}</strong> updated the task: <strong>${activity.taskTitle}</strong>`;
                break;
            case 'comment-added':
                icon = 'comment-added';
                text = `<strong>${activity.user}</strong> commented on <strong>${activity.taskTitle}</strong>: "${activity.comment}"`;
                break;
        }
        
        activityElement.innerHTML = `
            <div class="activity-icon ${icon}">
                <i class="fas fa-${activity.type === 'comment-added' ? 'comment' : 'tasks'}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-text">${text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        
        activityFeed.appendChild(activityElement);
    });
}

// Update Task Counts
function updateTaskCounts() {
    const counts = {
        todo: tasks.filter(task => task.status === 'todo').length,
        'in-progress': tasks.filter(task => task.status === 'in-progress').length,
        review: tasks.filter(task => task.status === 'review').length,
        done: tasks.filter(task => task.status === 'done').length,
        total: tasks.length,
        completed: tasks.filter(task => task.status === 'done').length,
        overdue: tasks.filter(task => {
            const today = new Date().toISOString().split('T')[0];
            return task.dueDate < today && task.status !== 'done';
        }).length
    };
    
    // Update column counts
    document.querySelectorAll('.task-count').forEach((span, index) => {
        const status = ['todo', 'in-progress', 'review', 'done'][index];
        span.textContent = counts[status];
    });
    
    // Update dashboard stats
    document.querySelectorAll('.stat-info h3')[0].textContent = counts.total;
    document.querySelectorAll('.stat-info h3')[1].textContent = counts.done;
    document.querySelectorAll('.stat-info h3')[2].textContent = counts['in-progress'];
    document.querySelectorAll('.stat-info h3')[3].textContent = counts.overdue;
}

// Check Overdue Tasks
function checkOverdueTasks() {
    const today = new Date().toISOString().split('T')[0];
    tasks.forEach(task => {
        if (task.dueDate < today && task.status !== 'done') {
            // In a real app, this would trigger notifications
            console.log(`Task "${task.title}" is overdue!`);
        }
    });
}

// Drag & Drop Handlers
function handleDragStart(e) {
    draggedTask = this;
    dragSourceColumn = this.parentElement;
    
    this.classList.add('dragging');
    
    // Show drag overlay
    document.getElementById('dragOverlay').style.display = 'flex';
    
    // Set drag image
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.id);
}

function handleDragEnd() {
    this.classList.remove('dragging');
    
    // Hide drag overlay
    document.getElementById('dragOverlay').style.display = 'none';
    
    // Reset all columns
    document.querySelectorAll('.column-body').forEach(column => {
        column.classList.remove('drag-over');
    });
    
    draggedTask = null;
    dragSourceColumn = null;
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave() {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (draggedTask) {
        const taskId = parseInt(draggedTask.dataset.id);
        const newStatus = this.parentElement.dataset.status;
        
        // Update task status
        updateTaskStatus(taskId, newStatus);
        
        // Move task to new column
        this.appendChild(draggedTask);
        
        // Add activity
        addActivity('task-updated', `Task moved to ${newStatus.replace('-', ' ')}`);
    }
}

// Update Task Status
function updateTaskStatus(taskId, newStatus) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const oldStatus = task.status;
        task.status = newStatus;
        task.completed = newStatus === 'done';
        
        // Update task counts
        updateTaskCounts();
        
        // Show notification
        showNotification(`Task "${task.title}" moved from ${oldStatus} to ${newStatus}`);
    }
}

// Add Activity
function addActivity(type, description) {
    const activitiesMap = {
        'task-added': 'added a new task',
        'task-completed': 'completed a task',
        'task-updated': 'updated a task',
        'comment-added': 'added a comment'
    };
    
    const newActivity = {
        id: activities.length + 1,
        type: type,
        user: "You",
        taskTitle: description,
        time: "Just now"
    };
    
    activities.unshift(newActivity);
    if (activities.length > 10) activities.pop();
    
    renderActivities();
}

// Show Task Details
function showTaskDetails(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const modal = document.getElementById('taskDetailModal');
    const content = document.getElementById('taskDetailContent');
    
    const assigneeInfo = getAssigneeInfo(task.assignee);
    const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
    const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    content.innerHTML = `
        <div class="task-detail-header">
            <h3>${task.title}</h3>
            <button class="close-detail" onclick="closeTaskDetails()">&times;</button>
        </div>
        
        <div class="task-detail-body">
            <div class="detail-section">
                <h4>Description</h4>
                <p>${task.description}</p>
            </div>
            
            <div class="detail-grid">
                <div class="detail-item">
                    <h5>Status</h5>
                    <span class="detail-status ${task.status}">
                        ${task.status.replace('-', ' ').toUpperCase()}
                    </span>
                </div>
                
                <div class="detail-item">
                    <h5>Priority</h5>
                    <span class="detail-priority ${task.priority}">
                        ${task.priority.toUpperCase()}
                    </span>
                </div>
                
                <div class="detail-item">
                    <h5>Due Date</h5>
                    <span class="detail-date ${isOverdue ? 'overdue' : ''}">
                        <i class="far fa-calendar-alt"></i>
                        ${formattedDate}
                    </span>
                </div>
                
                <div class="detail-item">
                    <h5>Assignee</h5>
                    <div class="detail-assignee">
                        <img src="${assigneeInfo.avatar}" alt="${assigneeInfo.name}">
                        <div>
                            <strong>${assigneeInfo.name}</strong>
                            <span>${assigneeInfo.role}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Labels</h4>
                <div class="detail-labels">
                    ${task.labels.map(label => `
                        <span class="detail-label ${label}">${label}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Task Actions</h4>
                <div class="detail-actions">
                    <button class="btn-action-detail" onclick="changeTaskStatus(${task.id}, 'todo')">
                        <i class="fas fa-redo"></i> Move to To Do
                    </button>
                    <button class="btn-action-detail" onclick="changeTaskStatus(${task.id}, 'in-progress')">
                        <i class="fas fa-play"></i> Start Progress
                    </button>
                    <button class="btn-action-detail" onclick="changeTaskStatus(${task.id}, 'review')">
                        <i class="fas fa-search"></i> Send for Review
                    </button>
                    <button class="btn-action-detail" onclick="changeTaskStatus(${task.id}, 'done')">
                        <i class="fas fa-check"></i> Mark Complete
                    </button>
                    <button class="btn-action-detail delete" onclick="deleteTask(${task.id})">
                        <i class="fas fa-trash"></i> Delete Task
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add CSS for task details
    const style = document.createElement('style');
    style.textContent = `
        .task-detail-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--gray-light);
        }
        
        .task-detail-header h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--dark);
        }
        
        .close-detail {
            background: none;
            border: none;
            font-size: 2rem;
            color: var(--gray);
            cursor: pointer;
            transition: color 0.3s;
        }
        
        .close-detail:hover {
            color: var(--danger);
        }
        
        .detail-section {
            margin-bottom: 25px;
        }
        
        .detail-section h4 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--dark);
            margin-bottom: 10px;
        }
        
        .detail-section p {
            color: var(--gray);
            line-height: 1.6;
        }
        
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 25px 0;
        }
        
        .detail-item h5 {
            font-size: 0.9rem;
            color: var(--gray);
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .detail-status {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .detail-status.todo {
            background: rgba(245, 101, 101, 0.1);
            color: var(--danger);
        }
        
        .detail-status.in-progress {
            background: rgba(237, 137, 54, 0.1);
            color: var(--warning);
        }
        
        .detail-status.review {
            background: rgba(66, 153, 225, 0.1);
            color: var(--info);
        }
        
        .detail-status.done {
            background: rgba(72, 187, 120, 0.1);
            color: var(--success);
        }
        
        .detail-priority {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .detail-priority.high {
            background: rgba(245, 101, 101, 0.1);
            color: var(--danger);
        }
        
        .detail-priority.medium {
            background: rgba(237, 137, 54, 0.1);
            color: var(--warning);
        }
        
        .detail-priority.low {
            background: rgba(72, 187, 120, 0.1);
            color: var(--success);
        }
        
        .detail-date {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
        }
        
        .detail-date.overdue {
            color: var(--danger);
            font-weight: 600;
        }
        
        .detail-assignee {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .detail-assignee img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .detail-assignee strong {
            display: block;
            font-size: 0.9rem;
        }
        
        .detail-assignee span {
            font-size: 0.8rem;
            color: var(--gray);
        }
        
        .detail-labels {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .detail-label {
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .detail-label.design {
            background: rgba(102, 126, 234, 0.1);
            color: var(--primary);
        }
        
        .detail-label.development {
            background: rgba(72, 187, 120, 0.1);
            color: var(--success);
        }
        
        .detail-label.bug {
            background: rgba(245, 101, 101, 0.1);
            color: var(--danger);
        }
        
        .detail-label.feature {
            background: rgba(159, 122, 234, 0.1);
            color: #9f7aea;
        }
        
        .detail-label.research {
            background: rgba(237, 137, 54, 0.1);
            color: var(--warning);
        }
        
        .detail-label.documentation {
            background: rgba(66, 153, 225, 0.1);
            color: var(--info);
        }
        
        .detail-label.marketing {
            background: rgba(159, 122, 234, 0.1);
            color: #9f7aea;
        }
        
        .detail-label.testing {
            background: rgba(102, 126, 234, 0.1);
            color: var(--primary);
        }
        
        .detail-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .btn-action-detail {
            padding: 10px 20px;
            background: var(--light);
            border: 1px solid var(--gray-light);
            border-radius: var(--radius);
            color: var(--dark);
            font-size: 0.9rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
        }
        
        .btn-action-detail:hover {
            background: var(--primary);
            color: var(--white);
            border-color: var(--primary);
        }
        
        .btn-action-detail.delete {
            background: rgba(245, 101, 101, 0.1);
            color: var(--danger);
            border-color: var(--danger);
        }
        
        .btn-action-detail.delete:hover {
            background: var(--danger);
            color: var(--white);
        }
        
        @media (max-width: 768px) {
            .detail-grid {
                grid-template-columns: 1fr;
            }
            
            .detail-actions {
                flex-direction: column;
            }
            
            .btn-action-detail {
                width: 100%;
                justify-content: center;
            }
        }
    `;
    
    if (!document.querySelector('#taskDetailStyle')) {
        style.id = 'taskDetailStyle';
        document.head.appendChild(style);
    }
}

// Close Task Details
function closeTaskDetails() {
    document.getElementById('taskDetailModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Change Task Status
function changeTaskStatus(taskId, newStatus) {
    updateTaskStatus(taskId, newStatus);
    closeTaskDetails();
    renderTasks();
}

// Delete Task
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            const taskTitle = tasks[taskIndex].title;
            tasks.splice(taskIndex, 1);
            
            // Update UI
            renderTasks();
            updateTaskCounts();
            closeTaskDetails();
            
            // Add activity
            addActivity('task-updated', `Task "${taskTitle}" deleted`);
            
            showNotification(`Task "${taskTitle}" deleted successfully`);
        }
    }
}

// Show Task Menu
function showTaskMenu(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Create context menu
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.innerHTML = `
        <button onclick="changeTaskStatus(${taskId}, 'todo')">
            <i class="fas fa-redo"></i> Move to To Do
        </button>
        <button onclick="changeTaskStatus(${taskId}, 'in-progress')">
            <i class="fas fa-play"></i> Start Progress
        </button>
        <button onclick="changeTaskStatus(${taskId}, 'review')">
            <i class="fas fa-search"></i> Send for Review
        </button>
        <button onclick="changeTaskStatus(${taskId}, 'done')">
            <i class="fas fa-check"></i> Mark Complete
        </button>
        <hr>
        <button onclick="editTask(${taskId})">
            <i class="fas fa-edit"></i> Edit Task
        </button>
        <button onclick="deleteTask(${taskId})" class="delete">
            <i class="fas fa-trash"></i> Delete Task
        </button>
    `;
    
    // Position and show menu
    menu.style.position = 'absolute';
    menu.style.background = 'var(--white)';
    menu.style.border = '1px solid var(--gray-light)';
    menu.style.borderRadius = 'var(--radius)';
    menu.style.boxShadow = 'var(--shadow-lg)';
    menu.style.zIndex = '1000';
    menu.style.minWidth = '200px';
    menu.style.padding = '10px 0';
    
    document.body.appendChild(menu);
    
    // Position near the menu button
    const menuButton = document.querySelector(`[onclick="showTaskMenu(${taskId})"]`);
    const rect = menuButton.getBoundingClientRect();
    menu.style.top = `${rect.bottom + 5}px`;
    menu.style.left = `${rect.right - 200}px`;
    
    // Add click outside to close
    const closeMenu = () => {
        menu.remove();
        document.removeEventListener('click', closeMenu);
    };
    
    setTimeout(() => {
        document.addEventListener('click', closeMenu);
    }, 100);
}

// Edit Task
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Fill form with task data
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskStatus').value = task.status;
    document.getElementById('taskDueDate').value = task.dueDate;
    document.getElementById('taskAssignee').value = task.assignee;
    
    // Set labels
    document.querySelectorAll('.label-tag').forEach(tag => {
        tag.classList.remove('selected');
        if (task.labels.includes(tag.dataset.label)) {
            tag.classList.add('selected');
        }
    });
    
    // Set form to edit mode
    const form = document.getElementById('taskForm');
    form.dataset.editId = taskId;
    document.querySelector('.modal-header h3').textContent = 'Edit Task';
    
    // Open modal
    openTaskModal();
}

// Open Task Modal
function openTaskModal() {
    document.getElementById('taskModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('taskTitle').focus();
}

// Close Task Modal
function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('taskForm').reset();
    document.getElementById('taskForm').dataset.editId = '';
    document.querySelector('.modal-header h3').textContent = 'Add New Task';
    
    // Reset labels
    document.querySelectorAll('.label-tag').forEach(tag => {
        tag.classList.remove('selected');
    });
}

// Save Task
function saveTask(e) {
    e.preventDefault();
    
    const form = e.target;
    const editId = form.dataset.editId;
    
    // Get form values
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;
    const status = document.getElementById('taskStatus').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const assignee = document.getElementById('taskAssignee').value;
    
    // Get selected labels
    const labels = Array.from(document.querySelectorAll('.label-tag.selected'))
        .map(tag => tag.dataset.label);
    
    if (!title) {
        showNotification('Please enter a task title', 'error');
        return;
    }
    
    if (editId) {
        // Edit existing task
        const task = tasks.find(t => t.id === parseInt(editId));
        if (task) {
            task.title = title;
            task.description = description;
            task.priority = priority;
            task.status = status;
            task.dueDate = dueDate;
            task.assignee = assignee;
            task.labels = labels;
            
            showNotification('Task updated successfully');
            addActivity('task-updated', `Task "${title}" updated`);
        }
    } else {
        // Create new task
        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            title,
            description,
            status,
            priority,
            dueDate,
            assignee,
            labels,
            createdAt: new Date().toISOString().split('T')[0],
            completed: false
        };
        
        tasks.push(newTask);
        showNotification('Task created successfully');
        addActivity('task-added', `Task "${title}" added`);
    }
    
    // Update UI
    renderTasks();
    updateTaskCounts();
    closeTaskModal();
}

// Show Notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Setup Drag and Drop
function setupDragAndDrop() {
    // Setup column drop zones
    document.querySelectorAll('.column-body').forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('dragleave', handleDragLeave);
        column.addEventListener('drop', handleDrop);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Add task button
    document.getElementById('addTaskBtn').addEventListener('click', openTaskModal);
    
    // Close task modal
    document.getElementById('closeTaskModal').addEventListener('click', closeTaskModal);
    
    // Task form submission
    document.getElementById('taskForm').addEventListener('submit', saveTask);
    
    // Filter toggle
    document.getElementById('filterToggle').addEventListener('click', () => {
        document.getElementById('filterPanel').classList.toggle('active');
    });
    
    // Status filter buttons
    document.querySelectorAll('[data-status]').forEach(button => {
        button.addEventListener('click', function() {
            currentStatusFilter = this.dataset.status;
            
            // Update active state
            document.querySelectorAll('[data-status]').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            renderTasks();
        });
    });
    
    // Priority filter buttons
    document.querySelectorAll('[data-priority]').forEach(button => {
        button.addEventListener('click', function() {
            currentPriorityFilter = this.dataset.priority;
            
            // Update active state
            document.querySelectorAll('[data-priority]').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            renderTasks();
        });
    });
    
    // Sort select
    document.querySelector('.sort-select').addEventListener('change', function() {
        // In a real app, this would sort tasks
        showNotification(`Tasks sorted by ${this.value}`);
    });
    
    // Add column task buttons
    document.querySelectorAll('.btn-add-column-task').forEach(button => {
        button.addEventListener('click', function() {
            const column = this.closest('.board-column');
            const status = column.dataset.status;
            
            // Set default status in form
            document.getElementById('taskStatus').value = status;
            
            // Open modal
            openTaskModal();
        });
    });
    
    // Label selection
    document.querySelectorAll('.label-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.style.setProperty('--light', '#1a202c');
            document.documentElement.style.setProperty('--white', '#2d3748');
            document.documentElement.style.setProperty('--dark', '#f7fafc');
            document.documentElement.style.setProperty('--gray', '#cbd5e0');
            document.documentElement.style.setProperty('--gray-light', '#4a5568');
            showNotification('Dark mode enabled');
        } else {
            document.documentElement.style.setProperty('--light', '#f7fafc');
            document.documentElement.style.setProperty('--white', '#ffffff');
            document.documentElement.style.setProperty('--dark', '#2d3748');
            document.documentElement.style.setProperty('--gray', '#718096');
            document.documentElement.style.setProperty('--gray-light', '#e2e8f0');
            showNotification('Light mode enabled');
        }
    });
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .notification button {
            background: transparent;
            border: none;
            color: white;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        
        .notification button:hover {
            opacity: 1;
        }
        
        .context-menu button {
            display: block;
            width: 100%;
            padding: 10px 20px;
            background: none;
            border: none;
            text-align: left;
            color: var(--dark);
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s;
        }
        
        .context-menu button:hover {
            background: var(--light);
        }
        
        .context-menu button i {
            width: 20px;
            margin-right: 10px;
        }
        
        .context-menu hr {
            border: none;
            border-top: 1px solid var(--gray-light);
            margin: 5px 0;
        }
        
        .context-menu button.delete {
            color: var(--danger);
        }
    `;
    document.head.appendChild(style);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initTaskManager);