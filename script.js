

const form = document.querySelector('form');
const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector(".results-display")

const inputs = document.querySelectorAll("input");
form.addEventListener("submit", handleForm);

function handleForm(e) {
    e.preventDefault();

    calculLove();
}



function calculLove() {
    personalName = inputs[0].value;
    partherName = inputs[1].value;

    if (!personalName || !partherName) {
        errorMsg.textContent = "Remplissez correctement les champs demandé";
        errorMsg.style.background = "white";

    } else {

        errorMsg.textContent = "";
        errorMsg.style.background = "none";
        resultsDisplay.textContent = "";

        loveApi(personalName, partherName)

    }
}

//la function pour appeller l'Api 
async function loveApi(personalName, partherName) {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f8cc62a970mshbd912a3a18baf4ap1ccc4ejsn21186e9d3cf6',
            'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
        }
    };



    try {
        const dataResult = await fetch(`https://love-calculator.p.rapidapi.com/getPercentage?sname=${personalName}&fname=${partherName}`, options)

        const data = await dataResult.json()

        const { percentage, result } = data

        createResults(percentage, result)

    } catch (error) {
        errorMsg.textContent = "Une erreur se produite ";
        errorMsg.style.background = "red";
        errorMsg.style.color = "white"
        console.log(error)



    }





}

function createResults(percentage, result) {
    if (percentage == 0) {

        errorMsg.textContent = "veuillez entrer les bonnes informations ";
        errorMsg.style.background = "red";
        errorMsg.style.color="white"


    } else {
        const card = document.createElement("div");
        card.className = "result";

        card.innerHTML = `

        <h1 class="percentage">${percentage} % <h1>
        <p class="info">${result}<p>
        `
        resultsDisplay.appendChild(card)
    }


}










