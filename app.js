const input = document.getElementById("todo-input");
const addbtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function savetodos() {
  // save todo array in local storage

  localStorage.setItem("todos", JSON.stringify(todos));
}

//  create a dom node for todo object and append it to list

function createTodoNode(todo, index) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;

    textSpan.style.textDecoration = todo.completed ? "line-through" : "";
    savetodos();
  });

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.style.margin = "0 8px";

  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }
  // add double click event listener to edit todo:
  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit todo", todo.text);

    if (newText !== null) {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      savetodos();
    }
  });

  // Delete todo
  const delbtn = document.createElement("button");
  delbtn.textContent = "Delete";
  delbtn.addEventListener("click", () => {
    todos.splice(index, 1);
    render();
    savetodos();
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delbtn);
  return li;
}

// Render the whole todo list from array to Screen
function render() {
  list.innerHTML = "";

  // Recreate Each Items
  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) {
    return;
  }

  // push a new todo object
  todos.push({ text: text, completed: false });
  input.value = "";
  render();
  savetodos();
}

addbtn.addEventListener("click", addTodo);  
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTodo();
  }
});
render();
