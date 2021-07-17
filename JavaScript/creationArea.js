/*$('.CA-PokemonDropdown').click(function () {
    PokemonDropdown();
    console.log("Testing");
});*/
var optionsReady = false;
//I need these global because they are used in the viewingArea as well when clicking on modify.
var creationDetails;
var creationID = "";
var userBunchArray;
var bunchDropdown = document.querySelector(".CA-BunchDropdown");
var pokemonDropdown = document.querySelector(".CA-PokemonDropdown");
var nicknameInput = document.querySelector(".CA-Nickname");
var ballDropdown = document.querySelector(".CA-BallDropdown");
var genderDropdown = document.querySelector(".CA-GenderDropdown");
var shinyDropdown = document.querySelector(".CA-ShinyDropdown");
var mintDropdown = document.querySelector(".CA-MintDropdown");
var miscDropdown = document.querySelector(".CA-MiscDropdown");
var markDropdown = document.querySelector(".CA-MarkDropdown");
var natureDropdown = document.querySelector(".CA-NatureDropdown");
var abilityDropdown = document.querySelector(".CA-AbilityDropdown");
var otInput = document.querySelector(".CA-OT");
var idInput = document.querySelector(".CA-ID");
var statusDropdown = document.querySelector(".CA-StatusDropdown");
var eventDropdown = document.querySelector(".CA-EventDropdown");
var ivHpDropdown = document.querySelector(".CA-IvHP");
var ivAttDropdown = document.querySelector(".CA-IvAtt");
var ivDefDropdown = document.querySelector(".CA-IvDef");
var ivSpaDropdown = document.querySelector(".CA-IvSpa");
var ivSpdDropdown = document.querySelector(".CA-IvSpd");
var ivSpeDropdown = document.querySelector(".CA-IvSpe");
var evHpDropdown = document.querySelector(".CA-EvHP");
var evAttDropdown = document.querySelector(".CA-EvAtt");
var evDefDropdown = document.querySelector(".CA-EvDef");
var evSpaDropdown = document.querySelector(".CA-EvSpa");
var evSpdDropdown = document.querySelector(".CA-EvSpd");
var evSpeDropdown = document.querySelector(".CA-EvSpe");
var move1Dropdown = document.querySelector(".CA-Move1");
var move2Dropdown = document.querySelector(".CA-Move2");
var move3Dropdown = document.querySelector(".CA-Move3");
var move4Dropdown = document.querySelector(".CA-Move4");
var legacyMove1Dropdown = document.querySelector(".CA-LegacyMove1");
var legacyMove2Dropdown = document.querySelector(".CA-LegacyMove2");
var legacyMove3Dropdown = document.querySelector(".CA-LegacyMove3");
var legacyMove4Dropdown = document.querySelector(".CA-LegacyMove4");
var howObtainedDropdown = document.querySelector(".CA-HowObtained");
var gameObtainedDropdown = document.querySelector(".CA-GameObtained");
var languageDropdown = document.querySelector(".CA-Lang");
var displayDropdown = document.querySelector(".CA-DisplayDropdown");
var proofInput = document.querySelector(".CA-Proof");
var noteFieldInput = document.querySelector(".NoteField");

var Gen6 = "Not Available";
var Gen7 = "Not Available";
var Gen8 = "Not Available";
var Home = "Not Available";
var pokemonValue = "Abomasnow";
var genderValue = "(Any Gender)";
var shinyValue = "(Any Shiny or Normal)";


$('.CA-CloseButton').click(function () {
    document.querySelector("#CreationArea").style.display = "none";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "initial";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "#efefef";
    document.querySelector(".SA-MoveButton").style.pointerEvents = "initial";
    document.querySelector(".SA-MoveButton").style.backgroundColor = "#efefef";
    if (selectedPokemon == null) {
        //document.querySelector("#SelectionArea").style.width = "100%";
        document.querySelector("#PanelArea").style.display = "block";
    } else {
        document.querySelector("#ViewingArea").style.display = "block";
    }
});

$('.CA-EditBunches').click(function () {
    document.querySelector("#CreationArea").style.display = "none";
    document.querySelector("#BunchArea").style.display = "block";
});

$('.CA-CreatePokemon').click(function () {
    CreatePokemon();
    document.querySelector("#PanelArea").style.display = "block";
});

$('.CA-Gen6').click(function () {
    if (Gen6 == "Not Available") {
        Gen6 = "Available";
        document.querySelector(".CA-Gen6").style.backgroundColor = "#36E26E";
    } else {
        Gen6 = "Not Available";
        document.querySelector(".CA-Gen6").style.backgroundColor = "#C83939";
    }
});

$('.CA-Gen7').click(function () {
    if (Gen7 == "Not Available") {
        Gen7 = "Available";
        document.querySelector(".CA-Gen7").style.backgroundColor = "#36E26E";
    } else {
        Gen7 = "Not Available";
        document.querySelector(".CA-Gen7").style.backgroundColor = "#C83939";
    }
});

$('.CA-Gen8').click(function () {
    if (Gen8 == "Not Available") {
        Gen8 = "Available";
        document.querySelector(".CA-Gen8").style.backgroundColor = "#36E26E";
    } else {
        Gen8 = "Not Available";
        document.querySelector(".CA-Gen8").style.backgroundColor = "#C83939";
    }
});

$('.CA-Home').click(function () {
    if (Home == "Not Available") {
        Home = "Available";
        document.querySelector(".CA-Home").style.backgroundColor = "#36E26E";
    } else {
        Home = "Not Available";
        document.querySelector(".CA-Home").style.backgroundColor = "#C83939";
    }
});

$('.CA-PokemonDropdown').change(function () {
    pokemonValue = document.querySelector(".CA-PokemonDropdown").value;
    ValidatePokemon();
});

$('.CA-GenderDropdown').change(function () {
    genderValue = document.querySelector(".CA-GenderDropdown").value;
    ValidatePokemon();
});

$('.CA-ShinyDropdown').change(function () {
    shinyValue = document.querySelector(".CA-ShinyDropdown").value;
    ValidatePokemon();
});

function ValidatePokemon() {
    if (shinyExceptionArray.includes(pokemonValue) && !shinyValue.includes("Normal")) {
        if (pokemonValue.includes("Minior")) {
            if (genderValue.includes("Genderless") || genderValue.includes("Any Gender")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Minior-Shiny.png");
            }
        } else if (pokemonValue.includes("Alcremie-Strawberry")) {
            if (genderValue.includes("Female") || genderValue.includes("Any Gender")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Strawberry-Shiny.png");
            }
        }
        else if (pokemonValue.includes("Alcremie-Berry")) {
            if (genderValue.includes("Female") || genderValue.includes("Any Gender")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Berry-Shiny.png");
            }
        }
        else if (pokemonValue.includes("Alcremie-Love")) {
            if (genderValue.includes("Female") || genderValue.includes("Any Gender")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Love-Shiny.png");
            }
        }
        else if (pokemonValue.includes("Alcremie-Star")) {
            if (genderValue.includes("Female") || genderValue.includes("Any Gender")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Star-Shiny.png");
            }
        }
        else if (pokemonValue.includes("Alcremie-Clover")) {
            if (genderValue.includes("Female") || genderValue.includes("Any Gender")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Clover-Shiny.png");
            }
        }
        else if (pokemonValue.includes("Alcremie-Flower")) {
            if (genderValue.includes("Female") || genderValue.includes("Any Gender")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Flower-Shiny.png");
            }
        }
        else if (pokemonValue.includes("Alcremie-Ribbon")) {
            if (genderValue.includes("Female") || genderValue.includes("Any Gender")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Ribbon-Shiny.png");
            }
        }
    }

    else if (shinyLockedArray.includes(pokemonValue) && !shinyValue.includes("Normal")) {
        document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
    }

    else if (genderlessPokemonArray.includes(pokemonValue)) {
        if (genderValue.includes("Genderless") || genderValue.includes("(Any Gender)")) {
            if (shinyValue.includes("Normal")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + ".png")
            } else {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Shiny.png")
            }

        } else {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }
    }
    else if (maleOnlyPokemonArray.includes(pokemonValue)) {
        if (genderValue.includes("Male") || genderValue.includes("(Any Gender)")) {
            if (shinyValue.includes("Normal")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + ".png")
            } else {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Shiny.png")
            }

        } else {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }
    }
    else if (femaleOnlyPokemonArray.includes(pokemonValue)) {
        if (genderValue.includes("Female") || genderValue.includes("(Any Gender)")) {
            if (shinyValue.includes("Normal")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + ".png")
            } else {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Shiny.png")
            }

        } else {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }
    }
    else if (genderDifferencesArray.includes(pokemonValue)) {
        if (genderValue.includes("Male") || genderValue.includes("(Any Gender)")) {
            if (shinyValue.includes("Normal")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Male.png")
            } else {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Male-Shiny.png")
            }

        }
        else if (genderValue.includes("Female") || genderValue.includes("(Any Gender)")) {
            if (shinyValue.includes("Normal")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Female.png")
            } else {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Female-Shiny.png")
            }

        } else {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }
    }
    //For Normal pokemon without any gender differences or specific genders
    else if (!genderlessPokemonArray.includes(pokemonValue)) {
        if (!genderValue.includes("Genderless") || genderValue.includes("(Any Gender)")) {
            if (shinyValue.includes("Normal")) {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + ".png")
            } else {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Shiny.png")
            }

        } else {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }
    } else {
        document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
    }
}

function CreationReset() {
    pokemonValue = "Abomasnow";
    genderValue = "(Any Gender)";
    shinyValue = "(Any Shiny or Normal)";
    nicknameInput.value = "";
    otInput.value = "";
    idInput.value = "";
    proofInput.value = "";
    noteFieldInput.value = "";
    Gen6 = "Available";
    document.querySelector(".CA-Gen6").click();
    Gen7 = "Available";
    document.querySelector(".CA-Gen7").click();
    Gen8 = "Available";
    document.querySelector(".CA-Gen8").click();
    Home = "Available";
    document.querySelector(".CA-Home").click();

    displayDropdown.value = "Public";

    ballDropdown.value = "(Any Ball)";
    mintDropdown.value = "(Any or No Mint)";
    miscDropdown.value = "(No Misc)";
    markDropdown.value = "(Any or No Mark)";
    natureDropdown.value = "(Any Nature)";
    abilityDropdown.value = "(Any Ability)";
    statusDropdown.value = "(Any Status)";
    eventDropdown.value = "(Any/No Event)";
    ivHpDropdown.value = "0";
    ivAttDropdown.value = "0";
    ivDefDropdown.value = "0";
    ivSpaDropdown.value = "0";
    ivSpdDropdown.value = "0";
    ivSpeDropdown.value = "0";
    evHpDropdown.value = "0";
    evAttDropdown.value = "0";
    evDefDropdown.value = "0";
    evSpaDropdown.value = "0";
    evSpdDropdown.value = "0";
    evSpeDropdown.value = "0";
    if (tradeOption == "For Trade") {
        move1Dropdown.value = "(No Move)";
        move2Dropdown.value = "(No Move)";
        move3Dropdown.value = "(No Move)";
        move4Dropdown.value = "(No Move)";
        legacyMove1Dropdown.value = "(No Move)";
        legacyMove2Dropdown.value = "(No Move)";
        legacyMove3Dropdown.value = "(No Move)";
        legacyMove4Dropdown.value = "(No Move)";
    } else {
        move1Dropdown.value = "(Any Move)";
        move2Dropdown.value = "(Any Move)";
        move3Dropdown.value = "(Any Move)";
        move4Dropdown.value = "(Any Move)";
        legacyMove1Dropdown.value = "(Any Move)";
        legacyMove2Dropdown.value = "(Any Move)";
        legacyMove3Dropdown.value = "(Any Move)";
        legacyMove4Dropdown.value = "(Any Move)";
    }
    howObtainedDropdown.value = "(Any Obtained)";
    gameObtainedDropdown.value = "(Any Game)";
    languageDropdown.value = "ANY";
    displayDropdown.value = "Public";

    ValidatePokemon();
}

//Calling all dropdowns when they are needed.
/*function CreationDropdowns() {

    PokemonDropdown();
    BallDropdown();
    GenderDropdown();
    ShinyDropdown();
    MintDropdown();
    MiscDropdown();
    MarkDropdown();
    NatureDropdown();
    AbilityDropdown();
    StatusDropdown();
    EventDropdown();
    IvHpDropdown();
    IvAttDropdown();
    IvDefDropdown();
    IvSpaDropdown();
    IvSpdDropdown();
    IvSpeDropdown();
    EvHpDropdown();
    EvAttDropdown();
    EvDefDropdown();
    EvSpaDropdown();
    EvSpdDropdown();
    EvSpeDropdown();
    Move1Dropdown();
    Move2Dropdown();
    Move3Dropdown();
    Move4Dropdown();
    LegacyMove1Dropdown();
    LegacyMove2Dropdown();
    LegacyMove3Dropdown();
    LegacyMove4Dropdown();
    HowObtainedDropdown();
    GameObtainedDropdown();
    LanguageDropdown();
    //DisplayDropdown();
    ValidatePokemon();
}*/

function CreatePokemon() {
    //Making sure that if its For Trade, none of the "Any" options are allowed.
    if (document.querySelector(".CA-PokemonImage").getAttribute("src") != "https://poketrades.org/Resources/Fennel2.png") {
        console.log("NO FENNEL");
        if (tradeOption == "For Trade") {
            if (howObtainedDropdown.value.includes("(Any Obtained") || gameObtainedDropdown.value.includes("(Any Game)") || languageDropdown.value.includes("ANY") || ballDropdown.value.includes("(Any Ball)") || genderDropdown.value.includes("(Any Gender)") || shinyDropdown.value.includes("(Any Shiny or Normal)") || mintDropdown.value.includes("(Any or No Mint)") || markDropdown.value.includes("Any or No Mark") || natureDropdown.value.includes("(Any Nature") || abilityDropdown.value.includes("(Any Ability)") || otInput.value == "" || idInput.value.length < 4 || statusDropdown.value.includes("(Any Status)") || eventDropdown.value.includes("(Any Event)") || move1Dropdown.value.includes("(No Move)") || move1Dropdown.value.includes("(Any Move)") || move2Dropdown.value.includes("(Any Move)") || move3Dropdown.value.includes("(Any Move)") || move4Dropdown.value.includes("(Any Move)") || legacyMove1Dropdown.value.includes("(Any Move)") || legacyMove2Dropdown.value.includes("(Any Move)") || legacyMove3Dropdown.value.includes("(Any Move)") || legacyMove4Dropdown.value.includes("(Any Move)")) {
                document.querySelector("#NotificationArea").style.display = "block";
                document.querySelector(".CreationPokemonError").style.display = "block";
            } else {
                if (nicknameInput.value == "") {
                    nicknameInput.value = "(No Nickname)";
                }
                if (proofInput.value == "") {
                    proofInput.value = "(No Proof)";
                }
                if (noteFieldInput.value == "") {
                    noteFieldInput.value = "(No Note)";
                }
                $.post("https://poketrades.org/PHP/create_or_update_selection.php", { token: token, creationID: creationID, bunchname: bunchDropdown.value, tradeOption: tradeOption, pokemon: pokemonDropdown.value, nickname: nicknameInput.value, ball: ballDropdown.value, gender: genderDropdown.value, shiny: shinyDropdown.value, mint: mintDropdown.value, misc: miscDropdown.value, mark: markDropdown.value, lang: languageDropdown.value, gen6: Gen6, gen7: Gen7, gen8: Gen8, home: Home, nature: natureDropdown.value, ability: abilityDropdown.value, gameOT: otInput.value, gameID: idInput.value, status: statusDropdown.value, event: eventDropdown.value, move1: move1Dropdown.value, move2: move2Dropdown.value, move3: move3Dropdown.value, move4: move4Dropdown.value, legacymove1: legacyMove1Dropdown.value, legacymove2: legacyMove2Dropdown.value, legacymove3: legacyMove3Dropdown.value, legacymove4: legacyMove4Dropdown.value, howObtained: howObtainedDropdown.value, gameObtained: gameObtainedDropdown.value, display: displayDropdown.value, proof: proofInput.value, note: noteFieldInput.value, ivhp: ivHpDropdown.value, ivatt: ivAttDropdown.value, ivdef: ivDefDropdown.value, ivspa: ivSpaDropdown.value, ivspd: ivSpdDropdown.value, ivspe: ivSpeDropdown.value, evhp: evHpDropdown.value, evatt: evAttDropdown.value, evdef: evDefDropdown.value, evspa: evSpaDropdown.value, evspd: evSpdDropdown.value, evspe: evSpeDropdown.value }, CreatedPokemon);
            }
        } else if (tradeOption == "Looking For") {
            if (nicknameInput.value == "") {
                nicknameInput.value = "(No Nickname)";
            }
            if (proofInput.value == "") {
                proofInput.value = "(No Proof)";
            }
            if (noteFieldInput.value == "") {
                noteFieldInput.value = "(No Note)";
            }
            $.post("https://poketrades.org/PHP/create_or_update_selection.php", { token: token, creationID: creationID, bunchname: bunchDropdown.value, tradeOption: tradeOption, pokemon: pokemonDropdown.value, nickname: nicknameInput.value, ball: ballDropdown.value, gender: genderDropdown.value, shiny: shinyDropdown.value, mint: mintDropdown.value, misc: miscDropdown.value, mark: markDropdown.value, lang: languageDropdown.value, gen6: Gen6, gen7: Gen7, gen8: Gen8, home: Home, nature: natureDropdown.value, ability: abilityDropdown.value, gameOT: otInput.value, gameID: idInput.value, status: statusDropdown.value, event: eventDropdown.value, move1: move1Dropdown.value, move2: move2Dropdown.value, move3: move3Dropdown.value, move4: move4Dropdown.value, legacymove1: legacyMove1Dropdown.value, legacymove2: legacyMove2Dropdown.value, legacymove3: legacyMove3Dropdown.value, legacymove4: legacyMove4Dropdown.value, howObtained: howObtainedDropdown.value, gameObtained: gameObtainedDropdown.value, display: displayDropdown.value, proof: proofInput.value, note: noteFieldInput.value, ivhp: ivHpDropdown.value, ivatt: ivAttDropdown.value, ivdef: ivDefDropdown.value, ivspa: ivSpaDropdown.value, ivspd: ivSpdDropdown.value, ivspe: ivSpeDropdown.value, evhp: evHpDropdown.value, evatt: evAttDropdown.value, evdef: evDefDropdown.value, evspa: evSpaDropdown.value, evspd: evSpdDropdown.value, evspe: evSpeDropdown.value }, CreatedPokemon);
        }
    } else {
        document.querySelector("#NotificationArea").style.display = "block";
        document.querySelector(".CreationPokemonError").style.display = "block";
    }
}

function CreatedPokemon(data) {
    //console.log(data);
    document.querySelector("#CreationArea").style.display = "none";
    document.querySelector("#ViewingArea").style.display = "none";
    document.querySelector("#SelectionArea").style.width = "100%";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "initial";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "#efefef";
    document.querySelector(".SA-MoveButton").style.pointerEvents = "initial";
    document.querySelector(".SA-MoveButton").style.backgroundColor = "#efefef";

    creationID = "";
    selectedPokemon = null;
    AssigningOutline();
    ShowLoading();
    PostGenerateSelection();
    /*if (bunchname != "") {
        $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption, bunchname: bunchname }, GenerateSelection);
    } else {
        $.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, GenerateBunch);
    }*/
}

//For the BunchDropdown, I need it to remove the previous options already in place so I remove all children to start with.
/*function BunchDropdown() {
    while (bunchDropdown.lastElementChild) {
        bunchDropdown.removeChild(bunchDropdown.lastElementChild);
    }

    bunchRename = document.querySelector(".BA-BunchRename");
    while (bunchRename.lastElementChild) {
        bunchRename.removeChild(bunchRename.lastElementChild);
    }

    const forCreation = document.querySelector(".CA-BunchDropdown");
    forCreation.innerHtml = "";

    const forBunch = document.querySelector(".BA-BunchRename");
    forBunch.innerHtml = "";

    for (let i = 0; i < userBunchArray.length; i++) {
        const creationOption = document.createElement("option");
        const bunchOption = document.createElement("option");
        creationOption.value = userBunchArray[i].name;
        creationOption.textContent = userBunchArray[i].name;
        bunchOption.value = userBunchArray[i].name;
        bunchOption.textContent = userBunchArray[i].name;
        forCreation.appendChild(creationOption);
        forBunch.appendChild(bunchOption);
    }

    for (let i = 0; i < userBunchArray.length; i++) {
        newOption = document.createElement("option");
        bunchDropdown.appendChild(newOption);
        newOption.setAttribute("class", "BunchDropdown" + (i));
        document.querySelector(".BunchDropdown" + (i)).value = userBunchArray[i].name;
        document.querySelector(".BunchDropdown" + (i)).innerHTML = userBunchArray[i].name;
    }
}*/

//Due to having thousands of options overall, they are generated this way to avoid a lot of lag than the way that involves css.
/*function PokemonDropdown() {
    while (pokemonDropdown.lastElementChild) {
        pokemonDropdown.removeChild(pokemonDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-PokemonDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < allPokemonArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allPokemonArray[i];
        optionEl.textContent = allPokemonArray[i];
        selectEl.appendChild(optionEl);
    }
}

function BallDropdown() {
    while (ballDropdown.lastElementChild) {
        ballDropdown.removeChild(ballDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-BallDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < allBallsArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allBallsArray[i];
        optionEl.textContent = allBallsArray[i];
        selectEl.appendChild(optionEl);
    }
}

function GenderDropdown() {
    while (genderDropdown.lastElementChild) {
        genderDropdown.removeChild(genderDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-GenderDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < genderOptionsArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = genderOptionsArray[i];
        optionEl.textContent = genderOptionsArray[i];
        selectEl.appendChild(optionEl);
    }
}

function ShinyDropdown() {
    while (shinyDropdown.lastElementChild) {
        shinyDropdown.removeChild(shinyDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-ShinyDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < shinyOptionsArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = shinyOptionsArray[i];
        optionEl.textContent = shinyOptionsArray[i];
        selectEl.appendChild(optionEl);
    }
}

function MintDropdown() {
    while (mintDropdown.lastElementChild) {
        mintDropdown.removeChild(mintDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-MintDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < mintOptionsArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = mintOptionsArray[i];
        optionEl.textContent = mintOptionsArray[i];
        selectEl.appendChild(optionEl);
    }
}

function MiscDropdown() {
    while (miscDropdown.lastElementChild) {
        miscDropdown.removeChild(miscDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-MiscDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < miscOptionsArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = miscOptionsArray[i];
        optionEl.textContent = miscOptionsArray[i];
        selectEl.appendChild(optionEl);
    }
}

function MarkDropdown() {
    while (markDropdown.lastElementChild) {
        markDropdown.removeChild(markDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-MarkDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < allMarksArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allMarksArray[i];
        optionEl.textContent = allMarksArray[i];
        selectEl.appendChild(optionEl);
    }
}

function NatureDropdown() {
    while (natureDropdown.lastElementChild) {
        natureDropdown.removeChild(natureDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-NatureDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < allNaturesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allNaturesArray[i];
        optionEl.textContent = allNaturesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function AbilityDropdown() {
    while (abilityDropdown.lastElementChild) {
        abilityDropdown.removeChild(abilityDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-AbilityDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < allAbilitiesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allAbilitiesArray[i];
        optionEl.textContent = allAbilitiesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function StatusDropdown() {
    while (statusDropdown.lastElementChild) {
        statusDropdown.removeChild(statusDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-StatusDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < statusOptionsArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = statusOptionsArray[i];
        optionEl.textContent = statusOptionsArray[i];
        selectEl.appendChild(optionEl);
    }
}

function EventDropdown() {
    while (eventDropdown.lastElementChild) {
        eventDropdown.removeChild(eventDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-EventDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < eventOptionsArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = eventOptionsArray[i];
        optionEl.textContent = eventOptionsArray[i];
        selectEl.appendChild(optionEl);
    }
}

function IvHpDropdown() {
    while (ivHpDropdown.lastElementChild) {
        ivHpDropdown.removeChild(ivHpDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-IvHP");
    selectEl.innerHtml = "";

    for (let i = 0; i < ivValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = ivValuesArray[i];
        optionEl.textContent = ivValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function IvAttDropdown() {
    while (ivAttDropdown.lastElementChild) {
        ivAttDropdown.removeChild(ivAttDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-IvAtt");
    selectEl.innerHtml = "";

    for (let i = 0; i < ivValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = ivValuesArray[i];
        optionEl.textContent = ivValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function IvDefDropdown() {
    while (ivDefDropdown.lastElementChild) {
        ivDefDropdown.removeChild(ivDefDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-IvDef");
    selectEl.innerHtml = "";

    for (let i = 0; i < ivValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = ivValuesArray[i];
        optionEl.textContent = ivValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function IvSpaDropdown() {
    while (ivSpaDropdown.lastElementChild) {
        ivSpaDropdown.removeChild(ivSpaDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-IvSpa");
    selectEl.innerHtml = "";

    for (let i = 0; i < ivValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = ivValuesArray[i];
        optionEl.textContent = ivValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function IvSpdDropdown() {
    while (ivSpdDropdown.lastElementChild) {
        ivSpdDropdown.removeChild(ivSpdDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-IvSpd");
    selectEl.innerHtml = "";

    for (let i = 0; i < ivValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = ivValuesArray[i];
        optionEl.textContent = ivValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function IvSpeDropdown() {
    while (ivSpeDropdown.lastElementChild) {
        ivSpeDropdown.removeChild(ivSpeDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-IvSpe");
    selectEl.innerHtml = "";

    for (let i = 0; i < ivValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = ivValuesArray[i];
        optionEl.textContent = ivValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function EvHpDropdown() {
    while (evHpDropdown.lastElementChild) {
        evHpDropdown.removeChild(evHpDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-EvHP");
    selectEl.innerHtml = "";

    for (let i = 0; i < evValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = evValuesArray[i];
        optionEl.textContent = evValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function EvAttDropdown() {
    while (evAttDropdown.lastElementChild) {
        evAttDropdown.removeChild(evAttDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-EvAtt");
    selectEl.innerHtml = "";

    for (let i = 0; i < evValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = evValuesArray[i];
        optionEl.textContent = evValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function EvDefDropdown() {
    while (evDefDropdown.lastElementChild) {
        evDefDropdown.removeChild(evDefDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-EvDef");
    selectEl.innerHtml = "";

    for (let i = 0; i < evValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = evValuesArray[i];
        optionEl.textContent = evValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function EvSpaDropdown() {
    while (evSpaDropdown.lastElementChild) {
        evSpaDropdown.removeChild(evSpaDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-EvSpa");
    selectEl.innerHtml = "";

    for (let i = 0; i < evValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = evValuesArray[i];
        optionEl.textContent = evValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function EvSpdDropdown() {
    while (evSpdDropdown.lastElementChild) {
        evSpdDropdown.removeChild(evSpdDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-EvSpd");
    selectEl.innerHtml = "";

    for (let i = 0; i < evValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = evValuesArray[i];
        optionEl.textContent = evValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function EvSpeDropdown() {
    while (evSpeDropdown.lastElementChild) {
        evSpeDropdown.removeChild(evSpeDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-EvSpe");
    selectEl.innerHtml = "";

    for (let i = 0; i < evValuesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = evValuesArray[i];
        optionEl.textContent = evValuesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function Move1Dropdown() {
    while (move1Dropdown.lastElementChild) {
        move1Dropdown.removeChild(move1Dropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-Move1");
    selectEl.innerHtml = "";

    for (let i = 0; i < allMovesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allMovesArray[i];
        optionEl.textContent = allMovesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function Move2Dropdown() {
    while (move2Dropdown.lastElementChild) {
        move2Dropdown.removeChild(move2Dropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-Move2");
    selectEl.innerHtml = "";

    for (let i = 0; i < allMovesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allMovesArray[i];
        optionEl.textContent = allMovesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function Move3Dropdown() {
    while (move3Dropdown.lastElementChild) {
        move3Dropdown.removeChild(move3Dropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-Move3");
    selectEl.innerHtml = "";

    for (let i = 0; i < allMovesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allMovesArray[i];
        optionEl.textContent = allMovesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function Move4Dropdown() {
    while (move4Dropdown.lastElementChild) {
        move4Dropdown.removeChild(move4Dropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-Move4");
    selectEl.innerHtml = "";

    for (let i = 0; i < allMovesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allMovesArray[i];
        optionEl.textContent = allMovesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function LegacyMove1Dropdown() {
    while (legacyMove1Dropdown.lastElementChild) {
        legacyMove1Dropdown.removeChild(legacyMove1Dropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-LegacyMove1");
    selectEl.innerHtml = "";

    for (let i = 0; i < allMovesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allMovesArray[i];
        optionEl.textContent = allMovesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function LegacyMove2Dropdown() {
    while (legacyMove2Dropdown.lastElementChild) {
        legacyMove2Dropdown.removeChild(legacyMove2Dropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-LegacyMove2");
    selectEl.innerHtml = "";

    for (let i = 0; i < allMovesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allMovesArray[i];
        optionEl.textContent = allMovesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function LegacyMove3Dropdown() {
    while (legacyMove3Dropdown.lastElementChild) {
        legacyMove3Dropdown.removeChild(legacyMove3Dropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-LegacyMove3");
    selectEl.innerHtml = "";

    for (let i = 0; i < allMovesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allMovesArray[i];
        optionEl.textContent = allMovesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function LegacyMove4Dropdown() {
    while (legacyMove4Dropdown.lastElementChild) {
        legacyMove4Dropdown.removeChild(legacyMove4Dropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-LegacyMove4");
    selectEl.innerHtml = "";

    for (let i = 0; i < allMovesArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = allMovesArray[i];
        optionEl.textContent = allMovesArray[i];
        selectEl.appendChild(optionEl);
    }
}

function HowObtainedDropdown() {
    while (howObtainedDropdown.lastElementChild) {
        howObtainedDropdown.removeChild(howObtainedDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-HowObtained");
    selectEl.innerHtml = "";

    for (let i = 0; i < howObtainedArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = howObtainedArray[i];
        optionEl.textContent = howObtainedArray[i];
        selectEl.appendChild(optionEl);
    }
}

function GameObtainedDropdown() {
    while (gameObtainedDropdown.lastElementChild) {
        gameObtainedDropdown.removeChild(gameObtainedDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-GameObtained");
    selectEl.innerHtml = "";

    for (let i = 0; i < gameObtainedArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = gameObtainedArray[i];
        optionEl.textContent = gameObtainedArray[i];
        selectEl.appendChild(optionEl);
    }
}

function LanguageDropdown() {
    while (languageDropdown.lastElementChild) {
        languageDropdown.removeChild(languageDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-Lang");
    selectEl.innerHtml = "";

    for (let i = 0; i < languageOptionsArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = languageOptionsArray[i];
        optionEl.textContent = languageOptionsArray[i];
        selectEl.appendChild(optionEl);
    }
}

function DisplayDropdown() {
    while (displayDropdown.lastElementChild) {
        displayDropdown.removeChild(displayDropdown.lastElementChild);
    }
    const selectEl = document.querySelector(".CA-DisplayDropdown");
    selectEl.innerHtml = "";

    for (let i = 0; i < displayOptionsArray.length; i++) {
        const optionEl = document.createElement("option");
        optionEl.value = displayOptionsArray[i];
        optionEl.textContent = displayOptionsArray[i];
        selectEl.appendChild(optionEl);
    }
}*/

