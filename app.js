const domain = `https://pokeapi.co/api/v2/`

//this is fine and doesn't need tweaking
let randomIndex = () => { //function to generate a pokemon randomly based on its index number
    let randomIndexNo = Math.ceil(Math.random()*801);
    console.log(randomIndexNo);
    return randomIndexNo;
}


let fetchData = async (searchCriteria) => { //fetches data for the pokemon at the index number supplies
    if (isNaN(searchCriteria)) {
        const namesByType = `${domain}type/${searchCriteria}`;
        try {
            let pkmnNames = await axios.get(namesByType);
    
            for (let i = 0; i < pkmnNames.data.pokemon.length; i++)

            console.log(pkmnNames.data.pokemon[i].pokemon.name);
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

            for (let i = 0; i < whoisPkmn.data.types.length; i++) {
            console.log(whoisPkmn.data.types[i].type.name)
            }
            return whoisPkmn;
        }
        catch (error) {
            console.log(`ERROR in Fetch by Index! ${error}`);
        }
    }
}
fetchData(randomIndex());
fetchData(`flying`);

let startButton = document.querySelector("button");
startButton.addEventListener('click', (e) => {
    alert(`You have clicked a button!`);
});

// **generates a random index number to throw into url.
// **fetches pokemon data based on index number - name = correct answer
// **gets type information for that particular pokemon

// uses types from that pokemon and throws them into a new url
// generates a combined list of pokemon that are those type
// randomly selects two pokemon from that combined list = two more answers

// generates a random index number to throw into url.
// fetches name of pokemon with that index number = last answer

// randomize order of the answers
// compare strings of answer with correct answer, if it's a match, the selected answer is correct



// start game removes content from center flex panel ("would you like to play?" & button)
// replaces left panel image with random pokemon image
// replaces right panel contents with 4 possible answers (answers are buttons)
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