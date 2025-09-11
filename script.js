let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".task-tabs div")
let underLine = document.getElementById("under-line");
let taskList = [];
let filterList = [];
let mode ="all";

addBtn.disabled = true;

taskInput.addEventListener("input", function() {
    if(taskInput.value === "") {
        addBtn.disabled = true;
    } else {
        addBtn.disabled = false;
    }
});

tabs.forEach(tab => {
    tab.addEventListener("click", (event) => {
        const width = event.target.offsetWidth;
        const left = event.target.offsetLeft;

        underLine.style.width = width + "px";
        underLine.style.left = left + "px";

        filter(event);
    });
});

window.addEventListener("DOMContentLoaded", () => {
    const firstTab = tabs[1]; // "ALL" 탭
    underLine.style.width = firstTab.offsetWidth + "px";
    underLine.style.left = firstTab.offsetLeft + "px";
});

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

for(let i = 1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {filter(event)})
}

function addTask() {
    let task = {
        id : randomId(),
        taskCon : taskInput.value,
        isComplete : false
    }

    taskList.push(task)
    taskInput.value = "";
    render();
}

function render() {
    let list = [];
    if (mode === "all") {
        list = taskList;
    } else if (mode === "ongoing") {
        list = taskList.filter(task => !task.isComplete);
    } else if (mode === "done") {
        list = taskList.filter(task => task.isComplete);
    }

    let resultHtml = "";

    for (let i = 0; i < list.length; i++) {
        let toggleIcon = list[i].isComplete ? "🔙" : "✅";

        resultHtml += `
            <div class="task">
                <div class="${list[i].isComplete ? "task-done" : ""}">${list[i].taskCon}</div>
                <div>
                    <button class="btn" type="button" onclick="toggleComp('${list[i].id}')">${toggleIcon}</button>
                    <button class="btn" type="button" onclick="deleteTask('${list[i].id}')">🗑</button>
                </div>
            </div>
        `;
    }

    document.getElementById('task-board').innerHTML = resultHtml;
}



function toggleComp(id) {
    for(i=0;i<taskList.length;i++) {
         if (taskList[i].id== id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
         }
    }
    render();
}

function deleteTask(id) {
    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    taskList = taskList.filter(task => task.id !== id);

    render();
}


function filter(event) {
    mode = event.target.id;

    if(mode === "all") {
        render();
    }else if(mode === "ongoing") {
        filterList = [];
        for(let i = 0; i<taskList.length;i++) {
             if(taskList[i].isComplete===false) {
                filterList.push(taskList[i])
             }
        }
        render();
    }else if(mode === "done") {
        filterList = [];
        for(let i = 0; i<taskList.length;i++) {
            if(taskList[i].isComplete===true) {
               filterList.push(taskList[i])
            }
       }
       render();
    }
}

function randomId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}