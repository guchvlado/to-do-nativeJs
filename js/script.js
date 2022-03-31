document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('#taskName'),
          addButton = document.querySelector('.button'),
          taskList = document.querySelector('.task-list');

    let dataArray = [];
    if (localStorage.getItem("data")) {
        dataArray = JSON.parse(localStorage.getItem("data"));
    }

    updateList();

    function updateList() {
        taskList.innerHTML = "";
        for (let i = 0; i < dataArray.length; i++) {
            const newTask = document.createElement('div');
            newTask.classList.add('task');
            newTask.innerHTML = `
                <span class="task-number">${i+1}</span>
                <p class="task-text">${dataArray[i]}</p>
                <div class="close-button">&#10006</div>
            `;
            taskList.append(newTask);
        }
        localStorage.setItem('data', JSON.stringify(dataArray));
    }

    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        const text = input.value;
        if (text == '') return 0;

        dataArray.push(text);
        updateList();
        input.value = "";
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('close-button')) {
            let index = target.parentNode.querySelector('.task-number').textContent - 1;
            dataArray = [].concat(dataArray.slice(0, index), dataArray.slice(index+1));
            updateList();
        }
    });
});