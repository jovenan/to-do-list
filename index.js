const inputTask = document.querySelector(".task");
const submitBtn = document.querySelector(".submit-task");
const taskList = document.querySelector(".tasks");
const clearBtn = document.querySelector(".clearBtn"); 

const getTasks = () => {
    const storage = localStorage.getItem("tasks") == null ? localStorage.setItem("tasks", "") : localStorage.getItem("tasks");
    const tasks = JSON.parse(storage);
    
    if(tasks.length) {
        tasks.forEach((task) => {
            taskList.innerHTML += createTemplate(task);
        })

        clearBtn.classList.remove("disable");
    }
}

const updateStorage = () => {
    const tasksElements = taskList.querySelectorAll("li")
    if (tasksElements) {
        const tasks = [];

        tasksElements.forEach((item) => tasks.push(item.id));
        
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}

const addTask = () => {
    const task = inputTask.value;
    
    if(task) {
        taskList.innerHTML += createTemplate(task);
        
        inputTask.value = "";

        clearBtn.classList.remove("disable");

        updateStorage();
    }
}

const createTemplate = (task) => {
    const template = `
    <li id="${task}">
        ${task}
        <div class="buttons">
            <button value="update" id="${task}"><i class="fa fa-check-square-o"></i></button>
            <button value="remove" id="${task}"><i class="fa fa-trash"></i></button>
        </div>
    </li>`;

    return template;
}

const updateTask = (e) => {
    if (e.target.parentNode.value == "remove") {
        const task = taskList.querySelector("#" + e.target.parentNode.id)
        taskList.removeChild(task);
    }
    if (e.target.parentNode.value == "update") {
        const task = taskList.querySelector("#" + e.target.parentNode.id)
        inputTask.value = e.target.parentNode.id;
        taskList.removeChild(task);
    }

    if (!taskList.children.length) {
        clearBtn.classList.add("disable");
    }

    updateStorage();
}

const clearTaskList = () => {
    taskList.innerHTML = "";
    clearBtn.classList.add("disable");

    updateStorage();
}

submitBtn.addEventListener("click", addTask);
taskList.addEventListener("click", updateTask);
clearBtn.addEventListener("click", clearTaskList);
window.addEventListener("load", getTasks);