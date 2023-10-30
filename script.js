class Todo {
      constructor() {
        this.tasks = this.loadTasksFromLocalStorage();
        this.editingIndex = -1;
        this.term = '';
        this.draw();
      }

      addTask(taskText, taskDate) {
        if (this.validateTask(taskText, taskDate)) {
          this.tasks.push({ text: taskText, date: taskDate, completed: false });
          this.saveTasksToLocalStorage();
          this.draw();
          this.clearError();
        } else {
          this.setError("Invalid task or date (The task should be between 3 and 255 characters, the date must be in the future)");
        }
      }

      formatDate(date) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      }

      toggleTaskCompletion(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasksToLocalStorage();
        this.draw();
      }

      removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasksToLocalStorage();
        this.draw();
      }

      validateTask(taskText, taskDate) {
        if (taskText.length < 3 || taskText.length > 255) {
          return false;
        }
        const currentDate = new Date().toISOString().split('T')[0];
        return taskDate === '' || taskDate >= currentDate;
      }

      setError(message) {
        const errorText = document.getElementById('errorText');
        errorText.textContent = message;
      }

      clearError() {
        const errorText = document.getElementById('errorText');
        errorText.textContent = '';
      }

      saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }

      loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
      }

      draw() {
        const taskListDiv = document.getElementById('taskList');
        taskListDiv.innerHTML = '';

        const filteredTasks = this.getFilteredTasks(this.tasks, this.term);

        for (let i = 0; i < filteredTasks.length; i++) {
          const task = filteredTasks[i];
          const taskElement = document.createElement('div');
          const formattedDate = task.date ? this.formatDate(task.date) : '';

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = task.completed;
          checkbox.addEventListener('change', () => this.toggleTaskCompletion(this.tasks.indexOf(task)));

          taskElement.appendChild(checkbox);

          const taskTextSpan = document.createElement('span');
          taskTextSpan.className='textTask';
          if (i === this.editingIndex) {
            const editableInput = document.createElement('input');
            editableInput.type = 'text';
            editableInput.value = task.text;
            editableInput.className = 'editable';
            taskTextSpan.appendChild(editableInput);
          } else {
            const taskText = this.highlightSearchTerm(task.text, this.term);
            taskTextSpan.innerHTML = taskText;
          }
          if (task.completed) {
            taskTextSpan.classList.add('completed');
          }

          const dateSpan = document.createElement('span');
          dateSpan.className='textDate';
          if (i === this.editingIndex) {
            const editableDateInput = document.createElement('input');
            editableDateInput.type = 'date';
            editableDateInput.value = task.date;
            editableDateInput.className = 'editable';
            dateSpan.appendChild(editableDateInput);
          } else {
            dateSpan.textContent = formattedDate;
          }

          const editButton = document.createElement('button');
          editButton.className='edit-btn';
          //const saveButton = document.createElement('button');

          if (i === this.editingIndex) {
            editButton.textContent = 'Save';
            editButton.addEventListener('click', () => this.saveTaskChanges(this.tasks.indexOf(task), task, taskTextSpan, dateSpan));
          } else {
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => this.editTask(i));
          }

          const removeButton = document.createElement('button');
          removeButton.textContent = 'X';
          removeButton.className='delete-btn'
          removeButton.addEventListener('click', () => this.removeTask(this.tasks.indexOf(task)));

          taskElement.appendChild(taskTextSpan);
          taskElement.appendChild(dateSpan);
          taskElement.appendChild(editButton);
          taskElement.appendChild(removeButton);

          taskListDiv.appendChild(taskElement);
        }
      }

      highlightSearchTerm(text, term) {
        if (!term) {
          return text;
        }

        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
      }

      setTerm(term) {
        this.term = term;
        this.draw();
      }

      getFilteredTasks(tasks, term) {
        if (term.length < 2) {
          return tasks;
        }
        return tasks.filter(task => task.text.toLowerCase().includes(term.toLowerCase()));
      }

      editTask(index) {
        this.editingIndex = index;
        this.draw();
      }

      saveTaskChanges(index, task, textElement, dateElement) {
        const newText = textElement.firstChild.value;
        const newDate = dateElement.firstChild.value;
        if (this.validateTask(newText, newDate)) {
          task.text = newText;
          task.date = newDate;
          this.saveTasksToLocalStorage();
          this.editingIndex = -1;
          this.draw();
          this.clearError(); 
        } else {
          textElement.className = 'edit-error';
          this.setError("Invalid task or date (The task should be between 3 and 255 characters, the date must be in the future)");
        }
      }
    }

    const todo = new Todo();

    document.getElementById('addTaskButton').addEventListener('click', function() {
      const taskInput = document.getElementById('taskInput');
      const dateInput = document.getElementById('date');
      const taskText = taskInput.value;
      const taskDate = dateInput.value;
      if (taskText) {
        todo.addTask(taskText, taskDate);
        taskInput.value = '';
        dateInput.value = '';
      }
    });

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
      todo.setTerm(searchInput.value);
    });