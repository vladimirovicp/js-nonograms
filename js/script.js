
const body = document.querySelector('body');

const wc = 5; //ширина ячеек
const hc = 5; //высота ячеек
const cells = wc + hc; // всего ячеек


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
    const cells = document.querySelectorAll(".cell");



    cells.forEach( item => {
        item.addEventListener("click", () => {
            item.classList.add('checked');

            //marked

        })
    })




}



window.onload = startHtml;
