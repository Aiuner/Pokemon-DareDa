const domain = `https://pokeapi.co/api/v2/`

let randomIndex = () => {
    let randomIndexNo = Math.ceil(Math.random()*151);
    console.log(randomIndexNo);
    return randomIndexNo;
}

let fetchData = async (randomIndexNo) => {
    const pkmnByIndexNo = `${domain}pokemon/${randomIndexNo}`
    try {
        let selectedPkmn = await axios.get(pkmnByIndexNo);
        console.log(selectedPkmn);
    }
    catch (error) {
        console.log(`ERROR! ${error}`);
    }
}
fetchData(randomIndex());