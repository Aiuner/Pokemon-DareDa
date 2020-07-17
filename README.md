# Project Overview

## Project Name

Pokémon - Dare da?

## Project Description

This will be a webapp game based on the old Pokémon anime segment that would mark the commercial break that would happen halfway through an episode. You would be presented with a blacked-out silhouette of a Pokémon, often one that made its debut in that episode, and you were expected to guess what Pokémon it was. After commercial break, the Pokémon would be revealed with its name.

This webapp will be a game of the same nature, but you will be awarded points based on how many tries it takes you to guess the name of the Pokémon, with the potential for additional game modes or difficulty settings later down the line.

The game will make use of the CSS filter property to produce the Pokemon silhouettes.

## API and Data Sample

I will be using PokeAPI (https://pokeapi.co/) to collect Pokemon names and data that can be used in other game modes/difficulties. Since PokeAPI is not up to date with all 896 Pokémon (at the time of writing), I will not be using any Pokemon after #801 Magearna according to National Dex order.

JSON Snippet

{

    "count": 964,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=151&limit=151",
    "previous": null,
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },
        {
            "name": "venusaur",
            "url": "https://pokeapi.co/api/v2/pokemon/3/"
        },
        {
            "name": "charmander",
            "url": "https://pokeapi.co/api/v2/pokemon/4/"
        },
        {
            "name": "charmeleon",
            "url": "https://pokeapi.co/api/v2/pokemon/5/"
        },
        {
            "name": "charizard",
            "url": "https://pokeapi.co/api/v2/pokemon/6/"
        },
        {
            "name": "squirtle",
            "url": "https://pokeapi.co/api/v2/pokemon/7/"
        },
        {
            "name": "wartortle",
            "url": "https://pokeapi.co/api/v2/pokemon/8/"
        },
        {
            "name": "blastoise",
            "url": "https://pokeapi.co/api/v2/pokemon/9/"
        },
	
[...]

## Wireframes

Mobile: https://wireframe.cc/Dup1wp Desktop: https://wireframe.cc/e6z5iw

### MVP/PostMVP

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP 

- Use PokeAPI to collect Pokémon data.
- Render data on page.
- Design a mobile-first webpage for the game.
- Implement breakpoints in CSS for desktop & tablet versions of the game.
- Implement basic game using first 151 Pokémon.
  - Have game randomly select a Pokémon for each round.
  - Render silhouette of the Pokemon & generate 4 possible answers (with 1 correct answer).
  - Score player based on # of guesses (up to 3, then lose that round).
  - Override previous round with new round, no repeats.
  - 10 rounds, then shown your score & asked if you want to play again.


#### PostMVP  

- Use local storage to cache Pokémon data.
- Add additional Generations of Pokémon to the game.
- Make configurable game settings (# of rounds, Pokémon generations used).
- Add additional difficulty setting (hard mode - guess Pokémon name by submitting text input).

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|July 10-12| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|July 13| Project Approval | Complete
|July 13| Core Application (HTML, CSS, JS...), Finish Style Sheets | Complete
|July 14| Implement User Input & leftover MVP, Troubleshooting MVP | Complete
|July 15| Attempt some Post-MVP | Complete
|July 16| Attempting more & Troubleshooting Post-MVP | Complete
|July 17| Presentations | Incomplete

## Priority Matrix

https://media.discordapp.net/attachments/272881056053592065/731937003238588536/Priority_Matrix.PNG

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Base HTML, CSS & JS | H | 1hrs| 1hrs | 1hrs |
| Fetching & Rendering API Data | H | 1hrs| 1hrs | 2hrs |
| Implement Base Game w/o User Input | H | 5hrs| 6hrs | 8hrs |
| Mobile Page CSS | M | 2hrs| 2hrs | 10hrs |
| CSS breakpoints for desktop & tablet | L | 2hrs| 1hrs | 11hrs |
| Accepting User Input | M | 2hrs| .5hrs | 11.5hrs |
| Troubleshooting | M | 6hrs| 6hrs | 17.5hrs |
| Post-MVP - ~~Additional Difficulty~~ & Config Settings | M | 4hrs| 0hrs | 17.5hrs |
| Post-MVP - ~~Local Storage cache~~ | L | 6hrs| 0hrs | 17.5hrs |
| Post-MVP - Additional Pokemon Generations | L | .5hrs| .25hrs | 17.75hrs |
| Post-MVP - Additional Troubleshooting | M | 6hrs| 8hrs | 25.75hrs |
| Total | H | 35.5hrs| 25.75hrs | 25.75hrs |

## Code Snippet

I consider this API call function to be rather impressive, for me anyway. A lot of work went into it, since it consolidated several async functions, and it ended up resolving quite a few errors and issues I'd been having due to needing multiple async API calls..

```
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
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  

1. Opted to position answer choices beside the silhouette to reduce space needed to play the game. It makes the game more mobile friendly.
2. Added an area for game instructions. Not everyone is a huge Pokemon nerd and therefore might not understand how to play.
3. Dropped difficulty setting plans. Due to how the API data is organized, adding in the difficulty setting I had planned would have required far too much time to do. It would essentially be writing an entire second game.
4. Dropped plans to use Local Storage. It would have been too complicated for me to figure out in time for Presentations due to the sheer amount of data I had wanted to cache.
5. Added a loading object in the form of the Who's that Pokemon? question mark from the original series. This tells the player that the game is still doing something when it's taking a while to pick a new silhouette and generate answer options, which both rely on async calls to the API. This also generally prevents the player from seeing the game place buttons one at a time, so they see all the answers at once.