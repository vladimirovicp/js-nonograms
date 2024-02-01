
const body = document.querySelector('body');

const wc = 10; //ширина ячеек
const hc = 10; //высота ячеек
const cells = wc + hc; // всего ячеек
let tableValue = [];
//console.log(tableValue);

let modal;
let modalCloseButton;

    const startHtml = () =>{
        const main = document.createElement("main");
        main.classList.add('main');

        const containerCells = document.createElement("div");
        containerCells.classList.add('container-cells');


        const table = document.createElement("table");
        table.classList.add('table-game');
        const tbody = document.createElement("tbody");


        let colInfo = [];
        let rowInfo = [];

        console.log(tableValue)

        const cols = tableValue.length;
        const row = tableValue[0].length

        for (let i = 0; i < cols; i++){

            let arrCountCol = [];
            let indexCountCol = 0;
            let arrCountRow = [];
            let indexCountColRow = 0;

            for (let j = 0; j < row; j++){
                if(tableValue[i][j] === 1){
                    arrCountCol[indexCountCol] = arrCountCol[indexCountCol] ? arrCountCol[indexCountCol] + 1 : 1;
                } else{
                    if(arrCountCol.length !== 0 && tableValue[i][j - 1] !== 0 ){
                        indexCountCol += 1;
                    }
                }

                if(tableValue[j][i] === 1){
                    arrCountRow[indexCountColRow] = arrCountRow[indexCountColRow] ? arrCountRow[indexCountColRow] + 1 : 1;
                } else{
                    if(arrCountRow.length !== 0 && tableValue[j - 1][i] !== 0 ){
                        indexCountColRow += 1;
                    }
                }
            }
            colInfo.push(arrCountCol)
            rowInfo.push(arrCountRow)
        }

        // console.log(colInfo)
        // console.log(rowInfo)



        for (let i = 0; i <= wc ; i++){
            const tr = document.createElement("tr");
            for (let j = 0; j <= hc; j++){
                const createCell =  document.createElement("td");

                if ( i === 0 && j===0){
                    createCell.textContent = 'n/n'
                } else {
                    if( i === 0){
                        createCell.dataset.col = 0;
                        createCell.dataset.row = 0;
                        //createCell.textContent = 'top';

                        //console.log(rowInfo[j - 1].join(","));

                        //reateCell.textContent = rowInfo[j - 1].join(",");
                        reateCell.textContent = '123'

                    } else {

                        createCell.classList.add('cell');
                        createCell.dataset.col = i;
                        createCell.dataset.row = j;
                    }
                }

                // if( (i !== 0) && (j !== 0)){

                //     if( i !== 0){
                //         createCell.classList.add('cell');
                //         createCell.dataset.col = i;
                //         createCell.dataset.row = j;
                //     } else {
                //         createCell.classList.add('title');
                //         createCell.dataset.col = 0;
                //         createCell.dataset.row = 0;

                //         // if (i !== wc){
                //         //     console.log(j,rowInfo[j])
                //         //     createCell.classList.add('cell');
                //         //     createCell.innerHTML= rowInfo[j].join("<br>");
                //         // }
                //     }

                // }

                tr.appendChild(createCell);

            }
            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        containerCells.appendChild(table);

        main.append(containerCells);
        body.append(main);

        const controlCreate = document.createElement("div");
        controlCreate.classList.add('control');

        const btnSeeCreate = document.createElement("button");
        btnSeeCreate.classList.add('btn__see-result');
        btnSeeCreate.textContent = 'See the result';

        controlCreate.appendChild(btnSeeCreate);
        body.append(controlCreate);
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


}
    const clickCeil = () => {
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
                if(tableValue[i][j] === 1){
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

        //console.log(resArr)

        tableValue = resArr;
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
        if (isEqual(tableValue, comparisonArr)){
            console.log('Победа!')
        }


    }
    const isEqual = (array1, array2) => {
        return JSON.stringify(array1) === JSON.stringify(array2);
    }
    const openModal = () => {
        modal.classList.add('active');
        body.classList.add('_lock');
    }
    const closeModal = () => {
        modal.classList.remove('active');
        body.classList.remove('_lock');
    }

    const creatingSkeleton = () => {
        startHtml();
        addModal();
    }
    const logic = () => {
        modal = document.querySelector('.modal');
        modalCloseButton = modal.querySelector('.modal__close');
        modalCloseButton.addEventListener('click', closeModal);

        clickCeil();
        clickSeeResult();

    }

    async function go(){
        await generateArr(); // генерируем массив
        await creatingSkeleton();
        await logic();
    }

    go();


