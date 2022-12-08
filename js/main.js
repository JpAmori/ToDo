// Seleção de Elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEdit = document.querySelector("#cancel-edit");
// Funções
const saveTodo = (text) => {
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

    todoList.appendChild(todo);

    todoInput.value = ""

    todoInput.focus();
    
}

const hideForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

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

    if(targetEl.classList.contains("finish-todo")){
        patherEl.classList.toggle("done");

    }

    if(targetEl.classList.contains("edit-todo")){
        hideForms();
    }

    if(targetEl.classList.contains("remove-todo")){
        console.log("Deu bão")
        patherEl.remove();
    }
})

cancelEdit.addEventListener("click", (e) => {
    e.preventDefault();
    hideForms();
})