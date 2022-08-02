/* Variables */
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;
//Array de tiempo
let timeArray = [25 * 60 , 15 * 60, 5 * 60];

const tasks = [];
const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const startButton = document.getElementById('strt');
const stopButton = document.getElementById('stp');
const pomodoro = document.getElementById('pmdr');
const shortBreak = document.getElementById('shrt-brk');
const longBreak = document.getElementById('lng-brk');

/* Función */

form.addEventListener('submit', e => {
    e.preventDefault();//cuando enviemos elformulario no se envie
    if(itTask.value != ' '){
        createTask(itTask.value);
        itTask.value = '';
        renderTask ();
    }
});

//Crear Task
function createTask(value){

    const newTask={
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false
    }

    tasks.unshift(newTask);
}

//renderizar Tasks
function renderTask(){
    const html = tasks.map(task => {
        return `
            <div class="task">
                <div class="completed">${task.completed ? `<span class="done">Done</span>`:" "}</div>
                <div class="title">${task.title}</div>
            </div>
        `
    });

    const taskContainer = document.querySelector('#tasks');
    taskContainer.innerHTML = html.join('');
}

//start button
startButton.addEventListener('click', e => {
    if(!timer){
        starButtonHandler();
    }
});


function starButtonHandler(){
    timer = setInterval(()=>{
        timeHandler();
    },1000); //1000 milliseconds
}

function timeHandler(){
    time--;
    renderTime();    

    if (time === 0) {
        clearInterval(timer);
        timer = null;
    }
}

function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time/60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent= `${minutes <10 ? "0" : " "}${minutes}:${seconds < 10 ? "0" : " "}${seconds}`; 

}

pomodoro.addEventListener('click', e=>{
    time = timeArray[0];
    renderTime();
})

shortBreak.addEventListener('click', e=>{
    timer = null;
    time = timeArray[2];
    renderTime();
})

longBreak.addEventListener('click', e=>{
    timer=null;
    time = timeArray[1];
    renderTime();
})

stopButton.addEventListener('click', e=>{
    stopTime();
})

function stopTime() {
    clearInterval(timer);
    timer = null;
}



