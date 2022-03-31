document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('#taskName'),
          addButton = document.querySelector('.button'),
          taskList = document.querySelector('.task-list');

    let dataArray = {
        do: [],
        done: []
    };
    let activeTab = "do"; // do / done

    if (localStorage.getItem("data")) {
        dataArray = JSON.parse(localStorage.getItem("data"));
    }

    updateList(activeTab);

    function updateList(currentTab) {
        taskList.innerHTML = "";
        for (let i = 0; i < dataArray[currentTab].length; i++) {
            const newTask = document.createElement('div');
            newTask.classList.add('task');
            newTask.innerHTML = `
                <span class="task-number">${i+1}</span>
                <p class="task-text">${dataArray[currentTab][i]}</p>
                <div class="change-buttons">
                    <div class="done-button">&#10003</div>
                    <div class="close-button">&#10006</div>
                </div>
            `;
            taskList.append(newTask);
        }
        localStorage.setItem('data', JSON.stringify(dataArray));
    }

    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        const text = input.value;
        if (text == '') return 0;

        dataArray[activeTab].push(text);
        updateList(activeTab);
        input.value = "";
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        console.log(target);
        if (target && target.classList.contains('close-button')) {
            let index = target.parentNode.parentNode.querySelector('.task-number').textContent - 1;
            dataArray[activeTab] = [].concat(dataArray[activeTab].slice(0, index), dataArray[activeTab].slice(index+1));
            updateList(activeTab);
        }
        else if (target && target.classList.contains('done-button') && activeTab != 'done') {
            let index = target.parentNode.parentNode.querySelector('.task-number').textContent - 1;
            dataArray.done.push(dataArray[activeTab][index]);
            dataArray[activeTab] = [].concat(dataArray[activeTab].slice(0, index), dataArray[activeTab].slice(index+1));
            updateList(activeTab);
        }
    });

    const tabsConteiner = document.querySelector(".tabs"),
          tabs = document.querySelectorAll('.tab');

    tabsConteiner.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("tab")) {
            tabs.forEach(item => item.classList.remove('active-tab'));
            e.target.classList.add('active-tab');
            activeTab = e.target.getAttribute('id');
            updateList(activeTab);
        }
    });
});