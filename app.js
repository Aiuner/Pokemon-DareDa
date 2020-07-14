const domain = `https://pokeapi.co/api/v2/`
let type1 = null;
let type2 = null;
let correctAns = null;
let randomAns = null;
let typeAns1 = null;
let typeAns2 = null;
let roundAnswers = [];
const indexLimiter = 801;

//this is fine and doesn't need tweaking
let randomIndex = () => { //function to generate a pokemon randomly based on its index number
    let randomIndexNo = Math.ceil(Math.random()*indexLimiter);
    //console.log(randomIndexNo);
    return randomIndexNo;
}

let fetchData = async (searchCriteria, saveTypes = true) => { //fetches data for the pokemon at the index number supplies. saveTypes prevents it from overiding the type answers when generating the random result.
    if (isNaN(searchCriteria)) {
        const namesByType = `${domain}type/${searchCriteria}`;
        try {
            let pkmnNames = await axios.get(namesByType);

            //namesByType as an array, checks URL of each and toss any where ${domain}pokemon/(index#) index# is > 151

            for (let i = pkmnNames.data.pokemon.length-1; i >= 0; i--) {

                let currentID = convertURLtoIndex(pkmnNames.data.pokemon[i].pokemon.url);
                if (currentID > indexLimiter) {
                    pkmnNames.data.pokemon.pop();
                }
            }
            //start from end of array and pop until all >151 are gone
    
            let ansByType = Math.ceil(Math.random()*(pkmnNames.data.pokemon.length-1));

            console.log(pkmnNames.data.pokemon[ansByType].pokemon.name);
            return pkmnNames.data.pokemon[ansByType].pokemon.name;
        }
        catch (error) {
            console.log(`ERROR in Type Function! ${error}`)
        }
    }
    else {
        const pkmnByIndexNo = `${domain}pokemon/${searchCriteria}`;
        try {
            let whoisPkmn = await axios.get(pkmnByIndexNo);
            console.log(whoisPkmn.data.name);

            if (saveTypes) {
                genSilhouette(searchCriteria.toString());

                type1 = whoisPkmn.data.types[0].type.name;
                if (whoisPkmn.data.types.length > 1) {
                    type2 = whoisPkmn.data.types[1].type.name;
                }
                else {
                    type2 = whoisPkmn.data.types[0].type.name;
                }
                //console.log(`${type1} ${type2}`);

                if (type2 !== null) {
                    typeAns1 = await fetchData(type1);
                    typeAns2 = await fetchData(type2);
                }
                roundAnswers.push(typeAns1);
                roundAnswers.push(typeAns2);
            }
            return whoisPkmn.data.name;
        }
        catch (error) {
            console.log(`ERROR in Fetch by Index! ${error}`);
        }
    }
}

//game starts

let startButton = document.querySelector("#yes-button");
startButton.addEventListener('click', async (e) => {
    clearRtPanel();
    correctAns = await fetchData(randomIndex()); //gets silhouette pokemon
    randomAns = await fetchData(randomIndex(), false); //gets random pokemon answer
    roundAnswers.push(correctAns);
    roundAnswers.push(randomAns);
    answerButtons(roundAnswers);
});

let convertURLtoIndex = (url) => {
    let pokeURL = url;
    //console.log(pokeURL);
    let urlArr = pokeURL.split(`/`);
    //console.log(urlArr);
    return urlArr[6];
}

let genSilhouette = (index) => {
    let indexNo = index;
    //console.log(indexNo);
    indexNo = ("00" + indexNo).slice(-3) //appends two zeroes in front, then takes the last three digits- adds placehodler zeroes for serebii url to work.
    document.querySelector('.silhouette').src = `https://serebii.net/pokemon/art/${indexNo}.png`
}

let rtPanel = document.getElementById("right-answers");

let clearRtPanel = () => {
    while (rtPanel.firstChild) {
        rtPanel.removeChild(rtPanel.firstChild);
    }
}

//might need to ask for help with this
let answerButtons = (rndAnswers) => {
    let answerList = document.createElement('div');
    answerList.classList.add("answerList");
    rtPanel.append(answerList);

    for (i = 0; i < rndAnswers.length; i++) {
        let answerButton = document.createElement('button');
        answerButton.classList.add("answers");
        answerButton.innerHTML = `${rndAnswers[i]}`
        answerList.append(answerButton);
    }

}

// **generates a random index number to throw into url.
// **fetches pokemon data based on index number - name = correct answer
// **gets type information for that particular pokemon 
// whoisPkmn is the correct answer

// **uses types from that pokemon and throws them into a new url
// **generate two more answers from type list

// **generates a random index number to throw into url.
// **fetches name of pokemon with that index number = last answer

// randomize order of the answers
// compare strings of answer with correct answer, if it's a match, the selected answer is correct



// start game overides content from right panel ("would you like to play?" & button) with 4 possible answers (buttons)
// replaces left panel image with random pokemon image
// clicking an answer checks current guesses

// set score = 0; before entering round loops
// guess = 0;
// if (name-on-button = correct answer)
//     switch guess = 0
//     +5 pts
//     guess = 1
//     +2 pts 
//     guess = 2
//     +1 pts 
// else if (name-on-button != correct answer && guess <3)
//     guess ++
// else no pts, next rd

//solution to make index numbers shorter than 3 digits be 3 digits w/ placeholder zeroes. val = index number generated by randomizer for indexes
// base url for images: https://serebii.net/pokemon/art/099.png
//