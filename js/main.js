// Seleção de Elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEdit = document.querySelector("#cancel-edit");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Funções

const saveTodo = (text, done = 0, save = 1) => {
    // Inserindo uma nova DIV no HTML
    const todo = document.createElement("div");
    todo.classList.add("todo");
    
    // Inserindo o nome da tarefa
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle)

    // Criando os botões no HTML
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deletebtn = document.createElement("button");
    deletebtn.classList.add("remove-todo");
    deletebtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deletebtn);

    // Utilizando dados da localStorage
    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({ text, done: 0, checkout: false });

    }

    todoList.appendChild(todo);

    todoInput.value = ""

}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide"); 
}

const updateTodo = (text) =>{
    const todoS = document.querySelectorAll(".todo");

    todoS.forEach((todo) => {
        let titleCurrent = todo.querySelector("h3");

        if (titleCurrent.innerText === oldInputValue) {
            titleCurrent.innerText = text;

            // Local Store
            updateTodoLocalStorage(oldInputValue, text);

        }
    })

}

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");
  
    todos.forEach((todo) => {
        // Talvez daria se eu Utiliza-se um TolowerCase 
        const todoTitle = todo.querySelector("h3").innerText;
  

      todo.style.display = "flex";
      console.log(todoTitle);
  
      if (!todoTitle.includes(search)) {
        todo.style.display = "none";
      }
    });
  };
  
  const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");
  
    switch (filterValue) {
      case "all":
        todos.forEach((todo) => (todo.style.display = "flex"));
  
        break;
  
      case "done":
        todos.forEach((todo) =>
          todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );
  
        break;
  
      case "todo":
        todos.forEach((todo) =>
          !todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );
  
        break;
  
      default:
        break;
    }
  };

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;
    // Registrando novas tarefas
    if(inputValue){
        saveTodo(inputValue)
    }
})

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const patherEl = targetEl.closest("div");
    // Pegando qual a tarefa que vou editar
    let todoTitle;
    let checkout;

    if (patherEl && patherEl.querySelector("h3")) {
        todoTitle = patherEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        patherEl.classList.toggle("done");
        localStorage.patherEl.checkout = true;
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();
    
        editInput.value = todoTitle;
        oldInputValue = todoTitle;

    }

    if(targetEl.classList.contains("remove-todo")){
        console.log("Deu bão")
        removeTodoLocalStorage(patherEl.querySelector("h3").innerText)
        patherEl.remove();
        console.log(JSON.parse(localStorage.todos))
      }
})
// Cancelando edição
cancelEdit.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
})
// Salvando a Tarefa
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
})

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;
  
    getSearchedTodos(search);
  });
  
  eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    searchInput.value = "";
  
    searchInput.dispatchEvent(new Event("keyup"));
  });
  
  filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;
  
    filterTodos(filterValue);
  });
  
  // Local Storage
  const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
  
    return todos;
  };
  
  const loadTodos = () => {
    const todos = getTodosLocalStorage();
  
    todos.forEach((todo) => {
      saveTodo(todo.text, todo.done, 0);
    });
  };
  
  const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();
  
    todos.push(todo);
  
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  
  const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();
  
    const filteredTodos = todos.filter((todo) => todo.text != todoText);
  
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  }
  
  const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();
  
    todos.map((todo) =>
      todo.text === todoText ? (todo.done = !todo.done) : null
    );
  
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  
  const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();
  
    todos.map((todo) =>
      todo.text === todoOldText ? (todo.text = todoNewText) : null
    );
  
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  
  loadTodos();
