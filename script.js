let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = [];

addBtn.addEventListener("click", addTask);

function addTask() {
    let task = {
        id : randomId(),
        taskCon : taskInput.value,
        isComplete : false
    }

    taskList.push(task)
    render();
}

function render() {
    let resultHtml = ``;

    for (let i = 0; i < taskList.length; i++) {
        let toggleIcon = taskList[i].isComplete ? "🔙" : "✅";

        if (taskList[i].isComplete == true) {
            resultHtml += `
                <div class="task">
                    <div class="task-done">${taskList[i].taskCon}</div>
                    <div>
                        <button type="button" onclick="toggleComp('${taskList[i].id}')">${toggleIcon}</button>
                        <button type="button" onclick="deleteTask('${taskList[i].id}')">🗑</button>
                    </div>
                </div>
            `
        } else {
            resultHtml += `
                <div class="task">
                    <div>${taskList[i].taskCon}</div>
                    <div>
                        <button class="btn" type="button" onclick="toggleComp('${taskList[i].id}')">${toggleIcon}</button>
                        <button class="btn" type="button" onclick="deleteTask('${taskList[i].id}')">🗑</button>
                    </div>
                </div>
            `
        }
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
    for(i=0;i<taskList.length;i++) {
        if(taskList[i].id == id ) {
            taskList.splice(i,1)
            break
        }
   }
   render();
}

function randomId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}