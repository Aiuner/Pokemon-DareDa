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

https://wireframe.cc/Dup1wp

### MVP/PostMVP

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP 

- Use PokeAPI to collect Pokémon data.
- Render data on page.
- Design a mobile-first webpage for the game.
- Implement basic game using first 151 Pokémon.
  - Have game randomly select a Pokémon for each round.
  - Render silhouette of the Pokemon & generate 4 possible answers (with 1 correct answer).
  - Score player based on # of guesses (up to 3, then lose that round).
  - Override previous round with new round, no repeats.
  - 10 rounds, then shown your score & asked if you want to play again.


#### PostMVP  

- Use local storage to cache Pokémon data.
- Add additional Generations of Pokémon to the game.
- Implement breakpoints in CSS for desktop & tablet versions of the game.
- Make configurable game settings (# of rounds, Pokémon generations used).
- Add additional difficulty setting (hard mode - guess Pokémon name by submitting text input).

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|July 10-12| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|July 13| Project Approval | Incomplete
|July 13| Core Application (HTML, CSS, JS...), Finish Style Sheet | Incomplete
|July 14| Implement User Input & leftover MVP, Troubleshooting MVP | Incomplete
|July 15| Attempt some Post-MVP | Incomplete
|July 16| Troubleshooting Post-MVP | Incomplete
|July 17| Presentations | Incomplete

## Priority Matrix

https://media.discordapp.net/attachments/272881056053592065/731937003238588536/Priority_Matrix.PNG

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Base HTML, CSS & JS | H | 1hrs| --hrs | --hrs |
| Fetching & Rendering API Data | H | 1hrs| --hrs | --hrs |
| Implement Base Game w/o User Input | H | 5hrs| --hrs | --hrs |
| Mobile Page CSS | M | 2hrs| --hrs | --hrs |
| Accepting User Input | M | 2hrs| --hrs | --hrs |
| Troubleshooting | M | 6hrs| --hrs | --hrs |
| Post-MVP - Additional Difficulty & Config Settings | M | 4hrs| --hrs | --hrs |
| Post-MVP - CSS breakpoint for desktop & tablet | L | 2hrs| --hrs | --hrs |
| Post-MVP - Local Storage cache | L | 6hrs| --hrs | --hrs |
| Post-MVP - Additional Pokemon Generations | L | .5hrs| --hrs | -hrs |
| Post-MVP - Additional Troubleshooting | M | 6hrs| --hrs | --hrs |
| Total | H | 35.5hrs| --hrs | --hrs |

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
