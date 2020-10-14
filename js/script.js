const form = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");
const clearList = document.querySelector("#clear-list");

let todoItems = [];

const handleItem = function(itemName) {
    const items = itemList.querySelectorAll(".item");
    items.forEach(function(item){
        if(item.querySelector(".item-name").textContent === itemName) {
            //this is a event listener for the editing item
            item.querySelector(".complete-item").addEventListener("click",function() {
                item.querySelector(".item-name").classList.toggle("completed");
                this.classList.toggle("visibility");
            });
            //this is a event listener for the complete item
            item.querySelector(".edit-item").addEventListener("click",function() {
                itemInput.value = itemName;
                itemList.removeChild(item);
                todoItems = todoItems.filter(function(item) {
                    return item != itemName;
                });
            });
            //this is a event listener for deleting items
            item.querySelector(".delete-item").addEventListener("click",function() {
                debugger;
                itemList.removeChild(item);
                todoItems = todoItems.filter(function(item) {
                    return item != itemName;
                });
                showFeedback("item delete","success");
            });
        }
    });
}

const removeItem = function(item) {
    const removeIndex = (todoItems.indexOf(item));
    todoItems.splice(removeIndex,1);
}

//to give icons like complete one and delete one
const getList = function(todoItems) {
    itemList.innerHTML = "";
    todoItems.forEach(function(items) {
        itemList.insertAdjacentHTML("beforeend",
        `<div class="item my-3">
            <h5 class="item-name text-capatilize">${item}</h5>
            <div class="item-icons">
                <a href="#" class="complete-item mx-2 item-icon">
                    <i class="far fa-check-circle"></i>
                </a>
                <a href="#" class="edit-item mx-2 item-icon">
                    <i class="far fa-edit"></i>
                </a>
                <a href="#" class="delete-item mx-2 item-icon">
                    <i class="far fa-times-circle"></i>
                </a>
            </div>
        </div>`);
        handleItem(item);
    });
}

const getLocalStorage = function() {
    const todoStorage = localStorage.getItem("todoItems");
    if(todoStorage === "undefined" || todoStorage === null) {
        todoItems = [];
    }
    else {
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
}

const setLocalStorage = function(todoItems) {
    localStorage.setItem("todoItems",JSON.stringify(todoItems));
}

getLocalStorage();

//adds an item to the list after clicking submit
form.addEventListener("submit",function(e) {
    e.preventDefault();
    const itemName = itemInput.value;
    if(itemName.length === 0) {
        feedback.innerHTML = "Please enter a valid item";
        feedback.classList.add("show-item","alert-danger");
        setTimeout(
            function() {
                feedback.classList.remove("show-item");

            },3000);
    }
    else {
        todoItems.push(itemName);
        setLocalStorage(todoItems);
        getList(todoItems);
    }
    itemInput.value = "";
});

clearList.addEventListener("click",function() {
    todoItems = [];
    localStorage.clear();
    getList(todoItems);
})