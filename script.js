let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = [];

addBtn.addEventListener("click", addTask);

function addTask() {
    let taskCon = taskInput.value;

    taskList.push(taskCon)
    
    render();
}

function render() {
    let resultHtml = ``;

    for(let i=0; i<taskList.length; i++){
        resultHtml += `
                <div class="task">
                    <div>${taskList[i]}</div>
                    <div>
                        <button type="button">✅</button>
                        <button type="button">🗑 </button>
                    </div>
                </div>
        `
    }

    document.getElementById('task-board').innerHTML = resultHtml;
}