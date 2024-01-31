
const body = document.querySelector('body');

const wc = 5; //ширина ячеек
const hc = 5; //высота ячеек
const cells = wc + hc; // всего ячеек
let tableValue = [];
//console.log(tableValue);



const startHtml = () =>{
    const main = document.createElement("main");
    main.classList.add('main');

    const containerCells = document.createElement("div");
    containerCells.classList.add('container-cells');

    const table = document.createElement("table");
    table.classList.add('table-game');
    const tbody = document.createElement("tbody");

    for (let i = 0; i < wc; i++){
        const tr = document.createElement("tr");
        for (let j = 0; j < hc; j++){
            const createCell =  document.createElement("td");
            createCell.classList.add('cell');
            createCell.dataset.col = i;
            createCell.dataset.row = j;
            tr.appendChild(createCell);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    containerCells.appendChild(table);

    main.append(containerCells);
    body.append(main);

    clickCeil();
    clickSeeResult();
    addModal();
}

const addModal = () =>{
    const modalDiv = document.createElement("div");
    modalDiv.classList.add('modal');

    const modalClose = document.createElement("span");
    modalClose.classList.add('modal__close');

    const modalContainer = document.createElement("div");
    modalContainer.classList.add('modal__container');

    const modalTitle = document.createElement("h2");
    modalTitle.classList.add('modal__title');
    modalContainer.appendChild(modalTitle);

    const modalContent = document.createElement("div");
    modalContent.classList.add('modal__content');
    modalContainer.appendChild(modalContent);


    modalDiv.appendChild(modalClose);
    modalDiv.appendChild(modalContainer);

    body.appendChild(modalDiv);

    settingsModal();
}

const settingsModal = () =>{
    const modal = document.querySelector('.modal');
    const modalCloseButton = modal.querySelector('.modal__close');

    const openModal = () =>{
        modal.classList.add('active');
        body.classList.add('_lock');
    }

    const closeModal = () => {
        modal.classList.remove('active');
        body.classList.remove('_lock');
    }

    modalCloseButton.addEventListener('click', closeModal);
}

function clickCeil(){

    const tableGame = document.querySelector(".table-game");
    const cells = tableGame.querySelectorAll(".cell");

    cells.forEach( item => {
        item.addEventListener("click", (e) => {
            if (item.classList.contains('marked')){
                item.classList.remove('marked');
            }
            if (item.classList.contains('checked')){
                item.classList.remove('checked');
            } else{
                item.classList.add('checked');
                comparisonTable();
            }
        })

        item.addEventListener("contextmenu", (e) => {
            if (item.classList.contains('checked')){
                item.classList.remove('checked');
            }

            if (item.classList.contains('marked')){
                item.classList.remove('marked');
            } else {
                item.classList.add('marked');
            }
            e.preventDefault();
        })
    })
}

const clickSeeResult = () =>{

    const btn = document.querySelector('.btn__see-result');
    btn.addEventListener('click', renderingTable)
}

const renderingTable = () => {
    const cols = tableValue.length;
    const row = tableValue[0].length

    const table = document.createElement("table");
    table.classList.add('table-view');
    const tbody = document.createElement("tbody");

    for (let i = 0; i < cols; i++){
        const tr = document.createElement("tr");
        for (let j = 0; j < row; j++){
            const createCell =  document.createElement("td");
            createCell.classList.add('cell');
            if(tableValue[i][j] == 1){
                createCell.classList.add('checked');
            }
            createCell.dataset.col = i;
            createCell.dataset.row = j;
            tr.appendChild(createCell);
        }
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);


    const modalContent = document.querySelector('.modal__content');

    modalContent.innerHTML = '';
    modalContent.appendChild(table);
    openModal();

}

const generateArr = () =>{
    let arr = [];
    let resArr = [];

    for (let i = 0; i < wc; i++){
        for (let j = 0; j < hc; j++){
            arr[j] = Math.random() > 0.5 ? 1 : 0;
        }
        resArr[i] = arr;
        arr = [];
    }

    console.log(resArr)

    return resArr;
}

const comparisonTable = () =>{


    const tableGame = document.querySelector(".table-game");
    const cells = tableGame.querySelectorAll(".cell");
    let comparisonArr = Array(wc).fill().map(() => Array(hc).fill(0));
    cells.forEach( item => {
            if (item.classList.contains('checked')){
                comparisonArr[item.dataset.col][item.dataset.row] = 1;
            }
    });

    // console.log('comparisonArr',comparisonArr);
    // console.log('tableValue',tableValue)

    if (isEqual(tableValue, comparisonArr)){
        console.log('Победа!')
    }


}
function isEqual(array1, array2) {
    return JSON.stringify(array1) === JSON.stringify(array2);
  }


window.onload = function() {
    startHtml();
    // addModal();
    tableValue = generateArr();
}



//openModal();


