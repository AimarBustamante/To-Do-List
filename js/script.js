//* Variables
const theme = document.getElementById("theme");
const newItemInput = document.getElementById("add-item");
const todoList = document.querySelector(".content ul");
const itemsLeft = document.querySelector(".items-left span");

itemsLeft.innerText = document.querySelectorAll('.list-item input[type="checkbox"]').length;


// * Theme switcher

theme.addEventListener("click", () => {
    document.querySelector("body").classList = [theme.checked ? "theme-light" : "theme-dark"];
});

//* Add new task

newItemInput.addEventListener("keypress", (e) => {
    if(e.charCode === 13 && newItemInput.value.length > 0) {
        createNewTodoItem(newItemInput.value);
        newItemInput.value ="";
    }
});

function createNewTodoItem(text){
    const elem = document.createElement("li");
    elem.classList.add("flex-row");
    elem.innerHTML = `
    <label class="list-item">
    <input type="checkbox" name="todoItem">
        <span class="checkmark"></span>
        <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
    `;
    if (document.querySelector(`.filter input[type="radio"]:checked`).id === `completed`){
        elem.classList.add(`hidden`);
    }
    todoList.append(elem);
    updateItemsCount(1);
}

//* Items count

function updateItemsCount(number){
    itemsLeft.innerText = +itemsLeft.innerText + number;
}

//* Remove item

function removeTodoItem(elem){
    elem.remove();
    updateItemsCount(-1);
}

todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")){
        removeTodoItem(event.target.parentElement);
    }
});

//* Clear completed

document.querySelector(".clear").addEventListener("click", () => {
    document.querySelectorAll('.list-item input[type="checkbox"]').forEach(item => {
        removeTodoItem(item.closest("li"));
    });
});

//*Filter

document.querySelectorAll(`.filter input`).addEventListener.forEach(radio => {
    radio.addEventListener(`change`, (e) => {
        filterTodoItems(e.target.id);
    });
});

function filterTodoItems(id) {
    const allItems = todoList.querySelectorAll('li');

    switch(id) {
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden');
            })
            break;
        case 'active':
            allItems.forEach(item => {
                item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
            })
            break;
        default: 
            allItems.forEach(item => {
                !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
            })
            break;
    }
}