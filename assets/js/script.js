$(document).ready(function () {
  // Retrieve tasks and nextId from localStorage
  let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  let nextId = JSON.parse(localStorage.getItem('nextId')) || 1;

  // Creates a function to generate a unique task id
  function generateTaskId() {
    let currentId = nextId;
    nextId += 1;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return currentId;
  }

  // References to important DOM elements
  const taskFormEl = $('#taskForm');
  const taskTitleInputEl = $('#taskTitle');
  const taskDueDateInputEl = $('#taskDueDate');
  const taskDescriptionInputEl = $('#taskDescription');
  const todoListEl = $('#todo-cards');
  const inProgressListEl = $('#in-progress-cards');
  const doneListEl = $('#done-cards');

  // Reads tasks from local storage and returns an array of task objects.
  function readTasksFromStorage() {
    return taskList;
  }

  // Saves an array of tasks to localStorage.
  function saveTasksToStorage(tasks) {
    taskList = tasks;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function that creates a task card
  function createTaskCard(task) {
    const taskCard = $('<div>')
      .addClass('card task-card my-3 draggable')
      .attr('data-task-id', task.id);

    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>')
      .addClass('card-text')
      .text(task.description);
    const cardDueDate = $('<p>')
      .addClass('card-text')
      .text(`Due: ${task.dueDate}`);

    const cardDeleteBtn = $('<button>')
      .addClass('btn btn-danger btn-sm delete-task')
      .text('Delete')
      .attr('data-task-id', task.id)
      .on('click', handleDeleteTask); // Fixed this line

    // Sets the card background color based on due date.
    if (task.dueDate && task.status !== 'done') {
      const now = dayjs();
      const taskDueDate = dayjs(task.dueDate, 'MM/DD/YYYY');

      if (now.isSame(taskDueDate, 'day')) {
        taskCard.addClass('bg-warning text-white');
      } else if (now.isAfter(taskDueDate)) {
        taskCard.addClass('bg-danger text-white');
        cardDeleteBtn.addClass('border-light');
      }
    }
    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    //  Return the task card so it can be appended to the correct lane
    return taskCard;
  }

  // This function renders the task list and makes the task cards draggable
  function renderTaskList() {
    const tasks = readTasksFromStorage();

    todoListEl.empty();
    inProgressListEl.empty();
    doneListEl.empty();

    tasks.forEach((task) => {
      const taskCard = createTaskCard(task);
      if (task.status === 'to-do') {
        todoListEl.append(taskCard);
      } else if (task.status === 'in-progress') {
        inProgressListEl.append(taskCard);
      } else if (task.status === 'done') {
        doneListEl.append(taskCard);
      }
    });

    // Make task cards draggable
    $('.draggable').draggable({
      revert: 'invalid',
      helper: 'clone',
      zIndex: 100,
      snap: '.lane',
      snapMode: 'inner',
      snapTolerance: 30,
    });

    // Make lanes droppable
    $('.lane').droppable({
      accept: '.draggable',
      zIndex: 50,
      drop: handleDrop,
      hoverClass: 'bg-light',
    });
  }

  // This function is used to handle adding a new task
  function handleAddTask(event) {
    event.preventDefault();

    // Reads user input from the form
    const title = taskTitleInputEl.val();
    const description = taskDescriptionInputEl.val();
    const dueDate = taskDueDateInputEl.val();

    // Pulls the tasks from localStorage and pushes the new task to the array
    const tasks = readTasksFromStorage();

    const newTask = {
      id: generateTaskId(),
      title,
      description,
      dueDate: dayjs(dueDate).format('MM/DD/YYYY'), // Fixed date format
      status: 'to-do',
    };

    tasks.push(newTask);

    // Save the updated project array to localStorage
    saveTasksToStorage(tasks);

    // Hide the modal after adding task
    $('#formModal').modal('hide');

    // Append the new task card to the 'To Do' lane
    const taskCard = createTaskCard(newTask);
    todoListEl.append(taskCard);
    $('.draggable').draggable({
      revert: 'invalid',
      zIndex: 100,
      helper: 'clone',
      snap: '.lane',
      snapMode: 'inner',
      snapTolerance: 30,
    });

    // Clear the form inputs
    taskFormEl[0].reset();
  }

  // Handle deleting a task
  function handleDeleteTask(event) {
    const taskId = $(event.target).attr('data-task-id');
    let tasks = readTasksFromStorage();

    // Filter out the task to be deleted
    tasks = tasks.filter((task) => task.id != taskId);
    saveTasksToStorage(tasks);
    renderTaskList();
  }

  // Handle dropping a task into a new status lane
  function handleDrop(event, ui) {
    const taskId = ui.draggable.attr('data-task-id');
    const newStatus = $(this).attr('id').replace('-cards', '');

    const tasks = readTasksFromStorage();
    const taskIndex = tasks.findIndex((task) => task.id == taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].status = newStatus;
      saveTasksToStorage(tasks);
      renderTaskList();

      // Change the background of the card to white if moved to the "done" column
      if (newStatus === 'done') {
        $(`[data-task-id=${taskId}]`)
          .removeClass('bg-warning bg-danger text-white')
          .css('bg-white btn-danger');
      }
    }
  }

  // Initialize the task board when the page loads
  renderTaskList();

  // Initialize the date picker for the due date input
  $('#taskDueDate').datepicker({
    dateFormat: 'mm/dd/yy',
  });

  // Event listener for the task form submission
  taskFormEl.on('submit', handleAddTask);
});
