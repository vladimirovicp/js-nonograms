
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

    clickCeil()
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


const generateArr = () =>{

    let arr = [];
    let resArr = [];
    for (let i = 0; i < wc; i++){
        for (let j = 0; j < hc; j++){
            arr[j] = Math.random() > 0.5 ? 1 : 0;
        }
        resArr[i] = arr;
    }
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
    tableValue = generateArr();
}


