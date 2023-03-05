const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");

// Retrieve todos from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render the todos on page load
renderTodos();

// Add todo on button click
addTodoBtn.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const todo = { id: new Date().getTime(), text: todoText };
    todos.push(todo);
    saveTodos();
    renderTodos();
    todoInput.value = "";
  }
});

// Edit todo on edit icon click
todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-icon")) {
      const todoId = event.target.dataset.id;
      const todo = todos.find((todo) => todo.id.toString() === todoId);
      const todoTextElement = event.target.parentElement.querySelector('span');
      const todoTextInput = document.createElement('input');
      todoTextInput.setAttribute('type', 'text');
      todoTextInput.setAttribute('value', todo.text);
      todoTextElement.replaceWith(todoTextInput);
      todoTextInput.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
          const newTodoText = todoTextInput.value.trim();
          if (newTodoText !== "") {
            todo.text = newTodoText;
            saveTodos();
            renderTodos();
          }
        }
      });
      todoTextInput.addEventListener('blur', () => {
        todoTextElement.innerHTML = todo.text;
        todoTextInput.replaceWith(todoTextElement);
      });
      todoTextInput.focus();
    }
  });

// Delete todo on delete button click
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-icon")) {
    const todoId = event.target.dataset.id;
    todos = todos.filter((todo) => todo.id.toString() !== todoId);
    saveTodos();
    renderTodos();
  }
});

// Render the todos on the page
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo.text}</span>
      <i class="fas fa-edit edit-icon" data-id="${todo.id}"></i>
      <i class="fas fa-times delete-icon" data-id="${todo.id}"></i>
    `;
    todoList.appendChild(li);
  });
}

// Save the todos to local storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
