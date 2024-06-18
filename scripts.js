const inputValue = document.querySelector('.user-input');
const taskAddBtn = document.querySelector('.add-task-btn');
const taskOutputContainer = document.querySelector('.tasks-container');
const progressBar = document.querySelector('.progressbar');
const saveBtn = document.querySelector('.save-btn');
let counter = 0;


function calculateTasksSetProgressBar(){
    let tasksQuantity = document.querySelectorAll('.tasks-output');
    let resultWidth = counter / tasksQuantity.length * 100;
    if (resultWidth == 100){
        progressBar.classList.add('animated-bar');
    } else {
        progressBar.classList.remove('animated-bar');
    }
    let progressbar = document.querySelector('.progressbar');
    progressbar.style.width = resultWidth + '%';
    if (tasksQuantity.length == 0){
        progressbar.style.width = 0 + '%';
    }
    
}

function saveTasksToLocalStorage(){
    let saveTasks = [];
    let actualTasksCollection = document.querySelectorAll('i');
    let taskStatus = [];
    let currentTasksStatus = document.querySelectorAll('.checkbox');
    for ( let i = 0; i < actualTasksCollection.length; i++ ){
        saveTasks.push(actualTasksCollection[i].textContent);
    }
    currentTasksStatus.forEach((item) => {
        if (item.checked){
            taskStatus.push('done');
        } else {
            taskStatus.push('undone');
        }
    });
    localStorage.setItem('tasks', JSON.stringify(saveTasks));
    localStorage.setItem('status', JSON.stringify(taskStatus));
}

function createElementsAndSetListeners(){
    if (!inputValue.value){
        return
    }
    let newLi = document.createElement('li');
    newLi.classList.add('tasks-output');
    taskOutputContainer.appendChild(newLi);

    let newLabel = document.createElement('label');
    newLi.appendChild(newLabel);

    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'checkbox');
    newInput.classList.add('checkbox');
    newLabel.appendChild(newInput);

    let userText = document.createElement('i');
    userText.textContent = inputValue.value;
    newLabel.appendChild(userText);

    let taskRemover = document.createElement('span');
    taskRemover.textContent = 'X';
    taskRemover.classList.add('task-remover');
    newLi.appendChild(taskRemover);
    inputValue.value = '';

    newInput.addEventListener('click', (event) => {
        if (event.target.checked){
            counter++;
            calculateTasksSetProgressBar();
            saveTasksToLocalStorage();
        } else {
            counter--;
            calculateTasksSetProgressBar()
            saveTasksToLocalStorage();
        }
    });

    taskRemover.addEventListener('click', (e) => {
        e.target.parentNode.remove();
        if (e.target.previousElementSibling.firstElementChild.checked){
            counter--;
            calculateTasksSetProgressBar();
            saveTasksToLocalStorage();
        } else {
            calculateTasksSetProgressBar();
            saveTasksToLocalStorage();
        }
    });

}

inputValue.addEventListener('keypress', (eventKey) => {
    if (eventKey.key === 'Enter'){
        createElementsAndSetListeners();
        calculateTasksSetProgressBar();
        saveTasksToLocalStorage();
    }
});

taskAddBtn.addEventListener('click', () => { 
    createElementsAndSetListeners();
    calculateTasksSetProgressBar();
    saveTasksToLocalStorage();
});






function loadTasksFromLocalStorage(){
    let loadTasks = JSON.parse(localStorage.getItem('tasks'));
    let loadStatus = JSON.parse(localStorage.getItem('status'));
    if (loadTasks) {
        loadTasks.forEach(createTask =>{
            let newLi = document.createElement('li');
            newLi.classList.add('tasks-output');
            taskOutputContainer.appendChild(newLi);

            let newLabel = document.createElement('label');
            newLi.appendChild(newLabel);

            let newInput = document.createElement('input');
            newInput.setAttribute('type', 'checkbox');
            newInput.classList.add('checkbox');
            newLabel.appendChild(newInput);

            let userText = document.createElement('i');
            userText.textContent = createTask;
            newLabel.appendChild(userText);

            let taskRemover = document.createElement('span');
            taskRemover.textContent = 'X';
            taskRemover.classList.add('task-remover');
            newLi.appendChild(taskRemover);
            inputValue.value = ''; 

            

            newInput.addEventListener('click', (event) => {
                if (event.target.checked){
                    counter++;
                    calculateTasksSetProgressBar();
                    saveTasksToLocalStorage();
                } else {
                    counter--;
                    calculateTasksSetProgressBar();
                    saveTasksToLocalStorage();
                }
            });
        
            taskRemover.addEventListener('click', (e) => {
                e.target.parentNode.remove();
                if (e.target.previousElementSibling.firstElementChild.checked){
                    counter--;
                    calculateTasksSetProgressBar();
                    saveTasksToLocalStorage();
                } else {
                    calculateTasksSetProgressBar();
                    saveTasksToLocalStorage();
                }
            });
        });
    }
    if (loadStatus){
        let loadedCheckboxes = document.querySelectorAll('.checkbox');
        loadStatus.forEach(function(setStatus, index) {
            if (setStatus == 'done'){
                loadedCheckboxes[index].checked = true;
                counter++;
            }
        });
    }

    calculateTasksSetProgressBar();
}

loadTasksFromLocalStorage();


