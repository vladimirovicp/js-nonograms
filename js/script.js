
const body = document.querySelector('body');

let wc = 5; //ширина ячеек
let hc = 5; //высота ячеек


const cells = wc + hc; // всего ячеек
let tableValue = [];
let patternsArr = [];
let currentPatterns = 'NoParent';

let modal;
let modalCloseButton;

    const startHtml = async () =>{

        body.innerHTML = '';

        const main = document.createElement("main");
        main.classList.add('main');

        const containerCells = document.createElement("div");
        containerCells.classList.add('container-cells');


        const table = document.createElement("table");
        table.classList.add('table-game');
        const tbody = document.createElement("tbody");

        let colInfo = [];
        let rowInfo = [];

        //console.log('tableValue',tableValue)

        if (currentPatterns !== 'NoParent'){
            console.log('currentPatterns',currentPatterns);
        }

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
                    createCell.textContent = "";
                } else {

                    if( i === 0){
                        createCell.classList.add('row__title');
                        createCell.classList.add('row__title');
                        createCell.classList.add(`cell-${wc}`);
                        createCell.dataset.col = i;
                        createCell.dataset.row = j;
                        createCell.innerHTML = rowInfo[j - 1].join("<br>");
                    } else {

                        if (j === 0){
                            createCell.classList.add('col__title');
                            createCell.classList.add(`cell-${wc}`);
                            createCell.dataset.col = i;
                            createCell.dataset.row = j;
                            createCell.innerHTML = colInfo[i - 1].join(" ");
                        } else{
                            createCell.classList.add('cell');
                            createCell.classList.add(`cell-${wc}`);
                            createCell.dataset.col = i;
                            createCell.dataset.row = j;
                        }


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

        const btnRestartedCreate = document.createElement("button");
        btnRestartedCreate.classList.add('btn__restarted');
        btnRestartedCreate.textContent = 'Restarted new game';
        controlCreate.appendChild(btnRestartedCreate);

        const selectSize = document.createElement("select");
        selectSize.classList.add('size');
        selectSize.name = 'size';
        for (let i = 1; i < 4; i++) {
            let option = document.createElement("option");
            option.value = 'size' + i * 5;
            option.text = 'size ' + i * 5;
            if( i * 5 === wc) {
                option.selected = true;
            }
            selectSize.appendChild(option);
        }
        controlCreate.appendChild(selectSize);

        const selectParent = document.createElement("select");
        selectParent.name = 'parent';
        selectParent.classList.add('parent');

        for (let i = 0; i < 6; i++) {
            let optionParent = document.createElement("option");
            if(i === 0){
                optionParent.value = 'NoParent';
                optionParent.text = 'No Parent';
            } else {
                optionParent.value = 'parent' + i;
                optionParent.text = 'Parent ' + i;
            }
            selectParent.appendChild(optionParent);
        }
        controlCreate.appendChild(selectParent);

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
        btn.addEventListener('click', renderingTable);
}
    const clickRestarted = () => {
        const btn = document.querySelector('.btn__restarted');
        btn.addEventListener('click', function(){
            go(wc);
        });
    }
    const clickSize = () => {
        const activities = document.querySelector('.size');

        activities.addEventListener("change", (e) => {
            if (e.target.value === 'size10') {
                go(10);
            }else if(e.target.value === 'size15'){
                go(15);
            } else{
                go();
            }
        })

    }
    const clickParent = () =>{
        const activities = document.querySelector('.parent');

        activities.addEventListener("change", (e) => {
            //console.log(e.target.value)
            // if (e.target.value === 'size10') {
            //     go(10);
            // }else if(e.target.value === 'size15'){
            //     go(15);
            // } else{
            //     go();
            // }

            switch(e.target.value) {
                case 'parent1': {
                    currentPatterns = 'parent1';
                    localStorage.setItem('currentPatterns', 'parent1');
                }
                    break;
                case 'NoParent': console.log('NoParent')  
                    break;
                default: console.log('default')  
            }

            
        })
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
    const generateArr = async (size) =>{
        let arr = [];
        let resArr = [];
        wc = size;
        hc = size;
        for (let i = 0; i < wc; i++){
            for (let j = 0; j < hc; j++){
                arr[j] = Math.random() > 0.5 ? 1 : 0;
            }
            resArr[i] = arr;
            arr = [];
        }
        return resArr;
    }

    const comparisonTable = () =>{

        const tableGame = document.querySelector(".table-game");
        const cells = tableGame.querySelectorAll(".cell");
        let comparisonArr = Array(wc).fill().map(() => Array(hc).fill(0));


        cells.forEach( item => {
                if (item.classList.contains('checked')){
                    comparisonArr[item.dataset.col - 1][item.dataset.row - 1] = 1;
                }
        });


        if (isEqual(tableValue, comparisonArr)){


            console.log('Победа!')

            const modalContent = document.querySelector('.modal__content');
            const h2 = document.createElement('h2');
            h2.textContent = 'Победа!'
            modalContent.textContent = '';
            modalContent.appendChild(h2);
            openModal();


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
        clickRestarted();
        clickSize();
        clickParent();

    }


    async function go(size = 5){
        await getLocalStorage();
        tableValue = await generateArr(size); // генерируем массив
        // console.log(tableValue);
        await creatingSkeleton();
        await logic();
    }

    const getLocalStorage = async () => {

        currentPatterns = localStorage.getItem("currentPatterns");
        if(currentPatterns === null){
            currentPatterns = 'NoParent';
            localStorage.setItem('currentPatterns', 'NoParent');
        }

        if(wc === 5){
            let patternsLocalStorage = localStorage.getItem("patterns");
            if(patternsLocalStorage === null){

                for (let i = 0; i < 5; i++){
                    let newPattern = await generateArr(5);
                    patternsArr[i] = newPattern;
                }
                localStorage.setItem('patterns', JSON.stringify(patternsArr));
            } else {
                patternsArr = JSON.parse(patternsLocalStorage);
            }
        } else {
            localStorage.setItem('currentPatterns', 'NoParent');
            currentPatterns = 'NoParent';
        }
    }

    go();


