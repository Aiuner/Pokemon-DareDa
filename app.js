//
//global variables are all set up here
//
const domain = `https://pokeapi.co/api/v2/`
let type1 = null;
let type2 = null;
let correctAns = null;
let randomAns = null;
let typeAns1 = null;
let typeAns2 = null;
let roundAnswers = [];
const indexLimiter = 801;
let rtPanel = document.getElementById("right-answers");
let rndScorebar = document.getElementById("round-score");
let round = 0;
let score = 0;
let guess = 0;
let maxRounds = 10;

// This function generates a random index number for a Pokemon
//
let randomIndex = () => {
    let randomIndexNo = Math.ceil(Math.random()*indexLimiter);
    return randomIndexNo;
}

// This is a combined function for getting Pokemon names either from their index number or from a list of Pokemon by their type from PokeAPI.
//
let fetchData = async (searchCriteria, saveTypes = true) => { //saveTypes is used to tell the function whether or not we're generating information for the answer Pokemon or for the random answer.

    if (isNaN(searchCriteria)) {
        //searchCriteria is a type, this api call returns a list of Pokemon of that type.
        const namesByType = `${domain}type/${searchCriteria}`;
        try {
            let pkmnNames = await axios.get(namesByType);

            //if the game's indexLimiter is set to use a value less than PokeAPI's current maximum Pokedex ID value, it will run the for loop to remove any Pokemon in the type lists whose ID exceed that value.
            if (indexLimiter < 801) {
                for (let i = pkmnNames.data.pokemon.length-1; i >= 0; i--) {
                    let currentID = convertURLtoIndex(pkmnNames.data.pokemon[i].pokemon.url);
                    if (currentID > indexLimiter) {
                        pkmnNames.data.pokemon.pop();
                    }
                }
            }
            //selects a random Pokemon from list for the type its currently looking at.
            let ansByType = Math.ceil(Math.random()*(pkmnNames.data.pokemon.length-1));

            //returns the name of the randomly selected pokemon from the current list
            return pkmnNames.data.pokemon[ansByType].pokemon.name;
        }
        catch (error) {
            console.log(`ERROR in Type Function! ${error}`)
        }
    }
    else {
        //searchCriteria is an index number, this API call returns data for the Pokemon with that index number.
        const pkmnByIndexNo = `${domain}pokemon/${searchCriteria}`;
        try {
            let whoisPkmn = await axios.get(pkmnByIndexNo);

            //if saveTypes is true, this is the answer Pokemon and its types are needed to generate two of the answers.
            if (saveTypes) {
                genSilhouette(searchCriteria.toString()); //gets the silhouette to be displayed for the game

                //the if statement deals with the case where a Pokemon is a monotype. If it is, both random Pokemon chosen based on its type will be from the same type list.
                type1 = whoisPkmn.data.types[0].type.name;
                if (whoisPkmn.data.types.length > 1) {
                    type2 = whoisPkmn.data.types[1].type.name;
                }
                else {
                    type2 = whoisPkmn.data.types[0].type.name;
                }

                //checks to make sure type2 was determined, which is done after type1. If type2 is null, the answers can't be fetched.
                //these are both "await" because they need to wait for the recursive call to fetchData to return Pokemon names from the type lists.
                if (type2 !== null) {
                    typeAns1 = await fetchData(type1);
                    typeAns2 = await fetchData(type2);
                }
                //adds the two type-based answers to the possible answer choices for the round. They are stored in an array.
                roundAnswers.push(typeAns1);
                roundAnswers.push(typeAns2);
            }
            //returns the name of the Pokemon for the index number that had been passed into this part of the fetchData function.
            return whoisPkmn.data.name;
        }
        catch (error) {
            console.log(`ERROR in Fetch by Index! ${error}`);
        }
    }
}

//clicking on the yes-buttom ("Let's Play!") begins the game by calling the first game function, nextRound().
//
let startButton = document.querySelector("#yes-button");
startButton.addEventListener('click', async (e) => {
    nextRound();
});

//the nextRound function, which starts the next round of the game when it's called. Takes care of clearing out the old answers, updating the pokemon silhouette and adding new answers, etc.
//
let nextRound = async () => {
    guess = 0;
    if (round < maxRounds) {
        round++;
        document.querySelector('.silhouette').style.filter = "brightness(0%)";
        rndScorebar.innerText = `Round: ${round} || Score: ${score}`;
        roundAnswers.splice(0, roundAnswers.length);
        clearRtPanel();
        correctAns = await fetchData(randomIndex()); //gets silhouette pokemon
        randomAns = await fetchData(randomIndex(), false); //gets random pokemon answer
        roundAnswers.push(correctAns); //adds to answers array
        roundAnswers.push(randomAns); //adds to answers array
        showQM();
        setTimeout ( () => clearRtPanel(), 3600)
        setTimeout( () => answerButtons(randomOrder(roundAnswers)), 3602);
    }
    else {
        newGamePrompt();
    }
}

//used to get back the index numbers for Pokemon listed by type. The API does not return the index numbers when used this way, but does return the Pokemon's URL, which *does* have its index number at the very end. Since the Pokemon urls always have the same format, they can be split into an array with the last value being the index number. This is only used when indexLimiter is less than 801.
//
let convertURLtoIndex = (url) => {
    let pokeURL = url;
    let urlArr = pokeURL.split(`/`);

    return urlArr[6];
}

//PokeAPI doesn't have the official art for the Pokemon, only their sprites (which are very tiny.) Serebii.net has the official art and the urls are all in the same format. This function appends zeroes to the front of the index numbers and takes the last 3 digits to ensure that serebii's URL doesn't 404 due to using 3-digit Pokedex index numbers. Once it has the full url, it replaces the current silhouette image with the new one.
//
let genSilhouette = (index) => {
    let indexNo = index;
    indexNo = ("00" + indexNo).slice(-3)
    document.querySelector('.silhouette').src = `https://serebii.net/pokemon/art/${indexNo}.png`
}

// simple function deletes all the previous contents of a panel, used at the start of a round to clear the previous round's contents a la nextRound()
//
let clearRtPanel = () => {
    while (rtPanel.firstChild) {
        rtPanel.removeChild(rtPanel.firstChild);
    }
}

// function to randomize the order of the answer choices
//
let randomOrder = (answers) => { //calling argument deck for consistency
    let randomizedAnswers = answers; //cloning the array
    let temp = null;
    let random = null;
    // Starts from the end of the answers array (roundAnswers will be passed to it) and swaps around the answers to randomize their order.
    for (let i = answers.length-1; i > -1; i--) {
      random = Math.floor(Math.random()*(answers.length)); //picks random index in array
      temp = randomizedAnswers[i]; //stores the value for the current index
      randomizedAnswers[i] = randomizedAnswers[random]; //copies in the value from the random index to the current one
      randomizedAnswers[random] = temp; //puts the stored value into the random index
    }
    return randomizedAnswers;
  }

// checks the text on an answer button to see if it matches the text stored in the correctAns variable.
//
let compareAnswer = (answer) => {
    return (answer.innerHTML === correctAns) ? true : false;
    //returns "true" is the text matches, returns "false" if it doesn't. 
}

// checks each answer you click on and increments the number of guesses if it's wrong. also scores correctly based on the number of guesses made. Also indicates wrong answers after clicking & shows the pokemon at the end of each round.
//
let scoring = (answer) => {
    if (compareAnswer(answer) === false && guess < 2) {
        answer.style.backgroundColor = "darkred";
        if (guess === 0) {
            document.querySelector('.silhouette').style.filter = "brightness(10%)";
        }
        else if (guess === 1) {
            document.querySelector('.silhouette').style.filter = "brightness(20%)";
        }
        guess++;
    }
    else if (compareAnswer(answer) === true && guess === 0) {
        score = score+5;
        document.querySelector('.silhouette').style.filter = "brightness(100%)";
        setTimeout( () => nextRound(), 3000);
    }
    else if (compareAnswer(answer) === true && guess === 1) {
        score = score+2;
        document.querySelector('.silhouette').style.filter = "brightness(100%)";
        setTimeout( () => nextRound(), 3000)
    }
    else if (compareAnswer(answer) === true && guess === 2) {
        score = score+1;
        document.querySelector('.silhouette').style.filter = "brightness(100%)";
        setTimeout( () => nextRound(), 3000);
    }
    else {
        answer.style.backgroundColor = "darkred";
        document.querySelector('.silhouette').style.filter = "brightness(100%)";
        setTimeout( () => nextRound(), 3000);
    }
}

//generates functioning answer buttons by taking in an array containing each possible answer, these are made AFTER the array of answers has been filled
//
let answerButtons = (rndAnswers) => {
    let answerList = document.createElement('div');
    answerList.classList.add("answerList");
    rtPanel.append(answerList);

    for (i = 0; i < rndAnswers.length; i++) {
        let answerButton = document.createElement('button');
        answerButton.classList.add("answers");
        answerButton.innerHTML = `${rndAnswers[i]}`
        answerButton.addEventListener('click', () => { //adds click event to check answers
            scoring(answerButton); //calls compare function when button is clicked
        })
        answerList.append(answerButton);
    }
}

// pop-up that shows up at the end of a game to ask if the player wants to start over or not. if they say no, it refreshes the page, which reloads the original contents of the right side of the play area.
//
let newGamePrompt = () => {
    const newGame = confirm(`The game has ended after ${maxRounds} rounds! Your final score was ${score}. \n\nWould you like to play again?`);
    if (newGame === true) {
        score = 0;
        round = 0;
        nextRound();
    }
    else {
        location.reload();
    }
}

// displays the Dare Da? question mark as a loading animation while the fetchData function grabs all the array answers!
//
let showQM = () => {
    let qm = document.createElement('img');
    qm.classList.add("qm");
    qm.src = `assets/daredaQM.png`;
    let qmDiv = document.createElement('div')
    qmDiv.classList.add('qmDiv');
    rtPanel.append(qmDiv);
    qmDiv.append(qm);
}