//Document Objects
const sound = new Audio('clickSound.mp3');
const sellSound = new Audio('sellSound.mp3');
const buySound = new Audio('buySound.mp3');
const button = document.getElementById("kiwi");
const quantityKiwis = document.getElementById("quantity");
const sellButton = document.getElementById("sell");
const money = document.getElementById("money");
const sallesCall = document.getElementById("salesCall");
const buyKiwiPlants = document.getElementById("buyKiwiPlants");
const buyGlovesBtn = document.getElementById("buyGlovesBtn");
const buyBox = document.getElementById("buyBox");
const owned = document.getElementById("owned");

//Valores
let boxes = 1;
let gloves = 0;
let countKiwis = 0;
let dolars = 0;
let value = 1;
let result = 1;
let kiwiPlants = 0;
let maxKiwis= 100*boxes;

//Loop para atualizar o valor final
setInterval(updateValue, 1000)

//Loop para gerar kiwis a base do kiwi plant
setInterval(KiwiPlantGeneration,1000)

//Functions to buy things or update values
function kiwiClick(){
    maxKiwis= 100*boxes;
    if (countKiwis< maxKiwis){
        countKiwis++;
        countKiwis += gloves*2;
        if (countKiwis > maxKiwis){
            countKiwis = maxKiwis;
        }
     }
     updateCount();
}

function buyGloves(){
    if(dolars >= 100){
        gloves++;
        dolars -= 100;
        updateDolars();
        buySound.play();
        }
        updateOwned();
}

function buyKiwiPlant(){
    if(dolars >= 100){
        kiwiPlants++;
        dolars -= 100;
        updateDolars();
        buySound.play();
        }
        updateOwned();
    }

function buyBoxes(){
    if(dolars >= 100){
        boxes++;
        dolars -= 100;
        updateDolars();
        buySound.play();
        }

        updateOwned();
    }


function KiwiPlantGeneration(){
    if (countKiwis< maxKiwis){
        countKiwis += (kiwiPlants * 0.3);
        if (countKiwis > maxKiwis){
            countKiwis = maxKiwis;
        }
     }
     updateCount();
}

function updateValue() {
    let rate = Math.random() * (1.1 - 0.93)+ 0.93;
    value = result;
    result = value * rate;
    result = Math.max(result, 0)
    if (result > value) {
        sallesCall.classList.remove("decaing"); 
        sellButton.classList.remove("decaing");
        sallesCall.classList.add("raising");
        sellButton.classList.add("raising");
    } else {
        sellButton.classList.remove("raising");
        sallesCall.classList.remove("raising")  
        sallesCall.classList.add("decaing");
        sellButton.classList.add("decaing");
        
    }
    
sallesCall.textContent = `Current value:$${result.toFixed(3)}`
}
function updateDolars(){
    money.textContent = `You have $${dolars.toFixed(2)}`
}

function updateCount(){
    quantityKiwis.textContent = `You have :${countKiwis.toFixed(2)} Kiwis`;
}

function updateOwned(){
    owned.innerHTML = `Owned:<br>🌱${kiwiPlants}x<br>🖐${gloves}x<br>📦${boxes}x`
}

//executa scripts obrigatorios
//Ações dos butões
button.onclick = () =>{kiwiClick();sound.play();}
sellButton.onclick= () => {dolars = countKiwis * result + dolars; countKiwis= 0;sellSound.play(); updateCount(); updateDolars()}
buyKiwiPlants.onclick = () => {buyKiwiPlant();}
buyGlovesBtn.onclick = () =>{buyGloves();}
buyBox.onclick = () => {buyBoxes();}

