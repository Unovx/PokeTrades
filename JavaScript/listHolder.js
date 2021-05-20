var allPokemonArray;
var allBallsArray;
var genderlessPokemonArray;
var femaleOnlyPokemonArray;
var maleOnlyPokemonArray;
var genderDifferencesArray;
var shinyLockedArray;
var shinyExceptionArray;
var allMovesArray;
var allNaturesArray;
var allAbilitiesArray;
var allItemsArray;
var allMarksArray;
var howObtainedArray;
var gameObtainedArray;
var allIconsArray;
var IconDropdown = document.querySelector(".BA-IconDropdown");
var iconExclusivesArray;
var ivValuesArray;
var evValuesArray;
var displayOptionsArray;
var eventOptionsArray;
var genderOptionsArray;
var miscOptionsArray;
var shinyOptionsArray;
var mintOptionsArray;
var statusOptionsArray;
var noteOptionsArray;
var proofOptionsArray;
var languageOptionsArray;

/*$('#Testing').click(function () {
    $.post("https://poketrades.org/PHP/get_list_names.php", { column: "genderless", table: "genderless_pokemon" }, GenderlessPokemon);
    $.post("https://poketrades.org/PHP/get_list_names.php", { column: "female_only", table: "female_only_pokemon" }, FemaleOnlyPokemon);
    $.post("https://poketrades.org/PHP/get_list_names.php", { column: "male_only", table: "male_only_pokemon" }, MaleOnlyPokemon);
    $.post("https://poketrades.org/PHP/get_list_names.php", { column: "gender_differences", table: "gender_different_pokemon" }, GenderDifferentPokemon);
    $.post("https://poketrades.org/PHP/get_list_names.php", { column: "shiny_exceptions", table: "shiny_exception_pokemon" }, ShinyExceptionPokemon);
});*/

$.post("https://poketrades.org/PHP/get_list_names.php", { column: "pokemon", table: "pokemon_names" }, AllPokemon);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "balls", table: "ball_names" }, AllBalls);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "genderless", table: "genderless_pokemon" }, GenderlessPokemon);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "female_only", table: "female_only_pokemon" }, FemaleOnlyPokemon);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "male_only", table: "male_only_pokemon" }, MaleOnlyPokemon);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "gender_differences", table: "gender_different_pokemon" }, GenderDifferentPokemon);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "shiny_locked", table: "shiny_locked_pokemon" }, ShinyLockedPokemon);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "shiny_exceptions", table: "shiny_exception_pokemon" }, ShinyExceptionPokemon);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "moves", table: "move_names" }, AllMoves);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "natures", table: "nature_names" }, AllNatures);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "abilities", table: "ability_names" }, AllAbilities);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "items", table: "item_names" }, AllItems);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "marks", table: "mark_names" }, AllMarks);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "how_obtained", table: "how_obtained_options" }, HowObtained);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "game_obtained", table: "game_obtained_options" }, GameObtained);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "icons", table: "icon_names" }, AllIcons);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "icon_exclusives", table: "icon_exclusive_icons" }, IconExclusives);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "ivs", table: "iv_values" }, IvValues);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "evs", table: "ev_values" }, EvValues);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "display_types", table: "display_options" }, DisplayOptions);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "event_types", table: "event_options" }, EventOptions);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "genders", table: "gender_options" }, GenderOptions);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "misc_types", table: "misc_options" }, MiscOptions);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "shiny_types", table: "shiny_options" }, ShinyOptions);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "mint_types", table: "mint_options" }, MintOptions);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "status_types", table: "status_options" }, StatusOptions);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "note_types", table: "note_options" }, NoteOptions);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "proof_types", table: "proof_options" }, ProofOptions);
$.post("https://poketrades.org/PHP/get_list_names.php", { column: "languages", table: "languages_options" }, LanguagesOptions);

//$.post("https://poketrades.org/PHP/generate_bunch_selection.php", { isOwner: "", searchID: "1", tradeOption: "For Trade" }, GenerateBunch);


function UserBunches(data) {
    arrayInfo = jQuery.parseJSON(data);
    userBunchArray = arrayInfo["Rows"];
    console.log(userBunchArray);

    while (bunchDropdown.lastElementChild) {
        bunchDropdown.removeChild(bunchDropdown.lastElementChild);
    }

    bunchRename = document.querySelector(".BA-BunchRename");
    while (bunchRename.lastElementChild) {
        bunchRename.removeChild(bunchRename.lastElementChild);
    }

    for (let i = 0; i < userBunchArray.length; i++) {
        const creationOption = document.createElement("option");
        const bunchOption = document.createElement("option");
        creationOption.value = userBunchArray[i].name;
        creationOption.textContent = userBunchArray[i].name;
        bunchOption.value = userBunchArray[i].name;
        bunchOption.textContent = userBunchArray[i].name;
        bunchDropdown.appendChild(creationOption);
        bunchToRenameDropdown.appendChild(bunchOption);
    }
}

function AllPokemon(data) {
    arrayInfo = jQuery.parseJSON(data);
    allPokemonArray = arrayInfo["Rows"];
    //console.log(allPokemonArray);

    for (let i = 0; i < allPokemonArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = allPokemonArray[i];
        creationOption.textContent = allPokemonArray[i];
        pokemonDropdown.appendChild(creationOption);
    }
}

function AllBalls(data) {
    arrayInfo = jQuery.parseJSON(data);
    allBallsArray = arrayInfo["Rows"];
    //console.log(allBallsArray);

    for (let i = 0; i < allBallsArray.length; i++) {
        const creationOption = document.createElement("option");
        const filterOption = document.createElement("option");
        creationOption.value = allBallsArray[i];
        creationOption.textContent = allBallsArray[i];
        filterOption.value = allBallsArray[i];
        filterOption.textContent = allBallsArray[i];
        ballDropdown.appendChild(creationOption);
        filterBall.appendChild(filterOption);
    }
}

function GenderlessPokemon(data) {
    arrayInfo = jQuery.parseJSON(data);
    genderlessPokemonArray = arrayInfo["Rows"];
    //console.log(genderlessPokemonArray);
}

function FemaleOnlyPokemon(data) {
    arrayInfo = jQuery.parseJSON(data);
    femaleOnlyPokemonArray = arrayInfo["Rows"];
    //console.log(femaleOnlyPokemonArray);
}

function MaleOnlyPokemon(data) {
    arrayInfo = jQuery.parseJSON(data);
    maleOnlyPokemonArray = arrayInfo["Rows"];
    //console.log(maleOnlyPokemonArray);
}

function GenderDifferentPokemon(data) {
    arrayInfo = jQuery.parseJSON(data);
    genderDifferencesArray = arrayInfo["Rows"];
    //console.log(genderDifferencesArray);
}

function ShinyLockedPokemon(data) {
    arrayInfo = jQuery.parseJSON(data);
    shinyLockedArray = arrayInfo["Rows"];
    //console.log(shinyLockedArray);
}

function ShinyExceptionPokemon(data) {
    arrayInfo = jQuery.parseJSON(data);
    shinyExceptionArray = arrayInfo["Rows"];
    //console.log(shinyExceptionArray);
}

function AllMoves(data) {
    arrayInfo = jQuery.parseJSON(data);
    allMovesArray = arrayInfo["Rows"];
    //console.log(allMovesArray);

    for (let i = 0; i < allMovesArray.length; i++) {
        const creationOptionMove1 = document.createElement("option");
        const creationOptionMove2 = document.createElement("option");
        const creationOptionMove3 = document.createElement("option");
        const creationOptionMove4 = document.createElement("option");
        const creationOptionLegacyMove1 = document.createElement("option");
        const creationOptionLegacyMove2 = document.createElement("option");
        const creationOptionLegacyMove3 = document.createElement("option");
        const creationOptionLegacyMove4 = document.createElement("option");
        creationOptionMove1.value = allMovesArray[i];
        creationOptionMove1.textContent = allMovesArray[i];
        creationOptionMove2.value = allMovesArray[i];
        creationOptionMove2.textContent = allMovesArray[i];
        creationOptionMove3.value = allMovesArray[i];
        creationOptionMove3.textContent = allMovesArray[i];
        creationOptionMove4.value = allMovesArray[i];
        creationOptionMove4.textContent = allMovesArray[i];
        creationOptionLegacyMove1.value = allMovesArray[i];
        creationOptionLegacyMove1.textContent = allMovesArray[i];
        creationOptionLegacyMove2.value = allMovesArray[i];
        creationOptionLegacyMove2.textContent = allMovesArray[i];
        creationOptionLegacyMove3.value = allMovesArray[i];
        creationOptionLegacyMove3.textContent = allMovesArray[i];
        creationOptionLegacyMove4.value = allMovesArray[i];
        creationOptionLegacyMove4.textContent = allMovesArray[i];
        move1Dropdown.appendChild(creationOptionMove1);
        move2Dropdown.appendChild(creationOptionMove2);
        move3Dropdown.appendChild(creationOptionMove3);
        move4Dropdown.appendChild(creationOptionMove4);
        legacyMove1Dropdown.appendChild(creationOptionLegacyMove1);
        legacyMove2Dropdown.appendChild(creationOptionLegacyMove2);
        legacyMove3Dropdown.appendChild(creationOptionLegacyMove3);
        legacyMove4Dropdown.appendChild(creationOptionLegacyMove4);

        const filterOption = document.createElement("option");
        filterOption.value = allMovesArray[i];
        filterOption.textContent = allMovesArray[i];
        filterMove.appendChild(filterOption);
    }
}

function AllNatures(data) {
    arrayInfo = jQuery.parseJSON(data);
    allNaturesArray = arrayInfo["Rows"];
    //console.log(allNaturesArray);

    for (let i = 0; i < allNaturesArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = allNaturesArray[i];
        creationOption.textContent = allNaturesArray[i];
        natureDropdown.appendChild(creationOption);

        const filterOption = document.createElement("option");
        filterOption.value = allNaturesArray[i];
        filterOption.textContent = allNaturesArray[i];
        filterNature.appendChild(filterOption);
    }
}

function AllAbilities(data) {
    arrayInfo = jQuery.parseJSON(data);
    allAbilitiesArray = arrayInfo["Rows"];
    //console.log(allAbilitiesArray);

    for (let i = 0; i < allAbilitiesArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = allAbilitiesArray[i];
        creationOption.textContent = allAbilitiesArray[i];
        abilityDropdown.appendChild(creationOption);

        const filterOption = document.createElement("option");
        filterOption.value = allAbilitiesArray[i];
        filterOption.textContent = allAbilitiesArray[i];
        filterAbility.appendChild(filterOption);
    }
}

function AllItems(data) {
    arrayInfo = jQuery.parseJSON(data);
    allItemsArray = arrayInfo["Rows"];
    //console.log(allItemsArray);
}

function AllMarks(data) {
    arrayInfo = jQuery.parseJSON(data);
    allMarksArray = arrayInfo["Rows"];
    //console.log(allMarksArray);

    for (let i = 0; i < allMarksArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = allMarksArray[i];
        creationOption.textContent = allMarksArray[i];
        markDropdown.appendChild(creationOption);

        const filterOption = document.createElement("option");
        filterOption.value = allMarksArray[i];
        filterOption.textContent = allMarksArray[i];
        filterMark.appendChild(filterOption);
    }
}

function HowObtained(data) {
    arrayInfo = jQuery.parseJSON(data);
    howObtainedArray = arrayInfo["Rows"];
    //console.log(howObtainedArray);

    for (let i = 0; i < howObtainedArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = howObtainedArray[i];
        creationOption.textContent = howObtainedArray[i];
        howObtainedDropdown.appendChild(creationOption);

        const filterOption = document.createElement("option");
        filterOption.value = howObtainedArray[i];
        filterOption.textContent = howObtainedArray[i];
        filterHowObtained.appendChild(filterOption);
    }
}

function GameObtained(data) {
    arrayInfo = jQuery.parseJSON(data);
    gameObtainedArray = arrayInfo["Rows"];
    //console.log(gameObtainedArray);

    for (let i = 0; i < gameObtainedArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = gameObtainedArray[i];
        creationOption.textContent = gameObtainedArray[i];
        gameObtainedDropdown.appendChild(creationOption);

        const filterOption = document.createElement("option");
        filterOption.value = gameObtainedArray[i];
        filterOption.textContent = gameObtainedArray[i];
        filterGameObtained.appendChild(filterOption);
    }
}

function AllIcons(data) {
    arrayInfo = jQuery.parseJSON(data);
    allIconsArray = arrayInfo["Rows"];
    //console.log(allIconsArray);

    for (let i = 0; i < allIconsArray.length; i++) {
        const bunchOption = document.createElement("option");
        bunchOption.value = allIconsArray[i];
        bunchOption.textContent = allIconsArray[i];
        bunchIconDropdown.appendChild(bunchOption);
    }
}

function IconExclusives(data) {
    arrayInfo = jQuery.parseJSON(data);
    iconExclusivesArray = arrayInfo["Rows"];
    //console.log(iconExclusivesArray);
}

function IvValues(data) {
    arrayInfo = jQuery.parseJSON(data);
    ivValuesArray = arrayInfo["Rows"];
    //console.log(ivValuesArray);

    for (let i = 0; i < ivValuesArray.length; i++) {
        const creationOptionHP = document.createElement("option");
        const creationOptionAtt = document.createElement("option");
        const creationOptionDef = document.createElement("option");
        const creationOptionSpa = document.createElement("option");
        const creationOptionSpd = document.createElement("option");
        const creationOptionSpe = document.createElement("option");
        creationOptionHP.value = ivValuesArray[i];
        creationOptionHP.textContent = ivValuesArray[i];
        creationOptionAtt.value = ivValuesArray[i];
        creationOptionAtt.textContent = ivValuesArray[i];
        creationOptionDef.value = ivValuesArray[i];
        creationOptionDef.textContent = ivValuesArray[i];
        creationOptionSpa.value = ivValuesArray[i];
        creationOptionSpa.textContent = ivValuesArray[i];
        creationOptionSpd.value = ivValuesArray[i];
        creationOptionSpd.textContent = ivValuesArray[i];
        creationOptionSpe.value = ivValuesArray[i];
        creationOptionSpe.textContent = ivValuesArray[i];
        ivHpDropdown.appendChild(creationOptionHP);
        ivAttDropdown.appendChild(creationOptionAtt);
        ivDefDropdown.appendChild(creationOptionDef);
        ivSpaDropdown.appendChild(creationOptionSpa);
        ivSpdDropdown.appendChild(creationOptionSpd);
        ivSpeDropdown.appendChild(creationOptionSpe);

        const filterOptionHP = document.createElement("option");
        const filterOptionAtt = document.createElement("option");
        const filterOptionDef = document.createElement("option");
        const filterOptionSpa = document.createElement("option");
        const filterOptionSpd = document.createElement("option");
        const filterOptionSpe = document.createElement("option");

        filterOptionHP.value = ivValuesArray[i];
        filterOptionHP.textContent = ivValuesArray[i];
        filterOptionAtt.value = ivValuesArray[i];
        filterOptionAtt.textContent = ivValuesArray[i];
        filterOptionDef.value = ivValuesArray[i];
        filterOptionDef.textContent = ivValuesArray[i];
        filterOptionSpa.value = ivValuesArray[i];
        filterOptionSpa.textContent = ivValuesArray[i];
        filterOptionSpd.value = ivValuesArray[i];
        filterOptionSpd.textContent = ivValuesArray[i];
        filterOptionSpe.value = ivValuesArray[i];
        filterOptionSpe.textContent = ivValuesArray[i];

        filterIvHP.appendChild(filterOptionHP);
        filterIvAtt.appendChild(filterOptionAtt);
        filterIvDef.appendChild(filterOptionDef);
        filterIvSpa.appendChild(filterOptionSpa);
        filterIvSpd.appendChild(filterOptionSpd);
        filterIvSpe.appendChild(filterOptionSpe);
    }

    filterIvHP.value = "X";
    filterIvAtt.value = "X";
    filterIvDef.value = "X";
    filterIvSpa.value = "X";
    filterIvSpd.value = "X";
    filterIvSpe.value = "X";
}

function EvValues(data) {
    arrayInfo = jQuery.parseJSON(data);
    evValuesArray = arrayInfo["Rows"];
    //console.log(evValuesArray);

    for (let i = 0; i < evValuesArray.length; i++) {
        const creationOptionHP = document.createElement("option");
        const creationOptionAtt = document.createElement("option");
        const creationOptionDef = document.createElement("option");
        const creationOptionSpa = document.createElement("option");
        const creationOptionSpd = document.createElement("option");
        const creationOptionSpe = document.createElement("option");
        creationOptionHP.value = evValuesArray[i];
        creationOptionHP.textContent = evValuesArray[i];
        creationOptionAtt.value = evValuesArray[i];
        creationOptionAtt.textContent = evValuesArray[i];
        creationOptionDef.value = evValuesArray[i];
        creationOptionDef.textContent = evValuesArray[i];
        creationOptionSpa.value = evValuesArray[i];
        creationOptionSpa.textContent = evValuesArray[i];
        creationOptionSpd.value = evValuesArray[i];
        creationOptionSpd.textContent = evValuesArray[i];
        creationOptionSpe.value = evValuesArray[i];
        creationOptionSpe.textContent = evValuesArray[i];
        evHpDropdown.appendChild(creationOptionHP);
        evAttDropdown.appendChild(creationOptionAtt);
        evDefDropdown.appendChild(creationOptionDef);
        evSpaDropdown.appendChild(creationOptionSpa);
        evSpdDropdown.appendChild(creationOptionSpd);
        evSpeDropdown.appendChild(creationOptionSpe);

        const filterOptionHP = document.createElement("option");
        const filterOptionAtt = document.createElement("option");
        const filterOptionDef = document.createElement("option");
        const filterOptionSpa = document.createElement("option");
        const filterOptionSpd = document.createElement("option");
        const filterOptionSpe = document.createElement("option");

        filterOptionHP.value = evValuesArray[i];
        filterOptionHP.textContent = evValuesArray[i];
        filterOptionAtt.value = evValuesArray[i];
        filterOptionAtt.textContent = evValuesArray[i];
        filterOptionDef.value = evValuesArray[i];
        filterOptionDef.textContent = evValuesArray[i];
        filterOptionSpa.value = evValuesArray[i];
        filterOptionSpa.textContent = evValuesArray[i];
        filterOptionSpd.value = evValuesArray[i];
        filterOptionSpd.textContent = evValuesArray[i];
        filterOptionSpe.value = evValuesArray[i];
        filterOptionSpe.textContent = evValuesArray[i];

        filterEvHP.appendChild(filterOptionHP);
        filterEvAtt.appendChild(filterOptionAtt);
        filterEvDef.appendChild(filterOptionDef);
        filterEvSpa.appendChild(filterOptionSpa);
        filterEvSpd.appendChild(filterOptionSpd);
        filterEvSpe.appendChild(filterOptionSpe);
    }

    filterEvHP.value = "X";
    filterEvAtt.value = "X";
    filterEvDef.value = "X";
    filterEvSpa.value = "X";
    filterEvSpd.value = "X";
    filterEvSpe.value = "X";
}

function DisplayOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    displayOptionsArray = arrayInfo["Rows"];
    //console.log(displayOptionsArray);

    for (let i = 0; i < displayOptionsArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = displayOptionsArray[i];
        creationOption.textContent = displayOptionsArray[i];
        displayDropdown.appendChild(creationOption);
    }
}

function EventOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    eventOptionsArray = arrayInfo["Rows"];
    //console.log(eventOptionsArray);

    for (let i = 0; i < eventOptionsArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = eventOptionsArray[i];
        creationOption.textContent = eventOptionsArray[i];
        eventDropdown.appendChild(creationOption);

        const filterOption = document.createElement("option");
        filterOption.value = eventOptionsArray[i];
        filterOption.textContent = eventOptionsArray[i];
        filterEvent.appendChild(filterOption);
    }
}

function GenderOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    genderOptionsArray = arrayInfo["Rows"];
    //console.log(genderOptionsArray);

    for (let i = 0; i < genderOptionsArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = genderOptionsArray[i];
        creationOption.textContent = genderOptionsArray[i];
        genderDropdown.appendChild(creationOption);

        const bunchOption = document.createElement("option");
        bunchOption.value = genderOptionsArray[i];
        bunchOption.textContent = genderOptionsArray[i];
        bunchGenderDropdown.appendChild(bunchOption);

        const filterOption = document.createElement("option");
        filterOption.value = genderOptionsArray[i];
        filterOption.textContent = genderOptionsArray[i];
        filterGender.appendChild(filterOption);
    }
}

function MiscOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    miscOptionsArray = arrayInfo["Rows"];
    //console.log(miscOptionsArray);

    for (let i = 0; i < miscOptionsArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = miscOptionsArray[i];
        creationOption.textContent = miscOptionsArray[i];
        miscDropdown.appendChild(creationOption);

        const filterOption = document.createElement("option");
        filterOption.value = miscOptionsArray[i];
        filterOption.textContent = miscOptionsArray[i];
        filterMisc.appendChild(filterOption);
    }
}

function ShinyOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    shinyOptionsArray = arrayInfo["Rows"];
    //console.log(shinyOptionsArray);

    for (let i = 0; i < shinyOptionsArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = shinyOptionsArray[i];
        creationOption.textContent = shinyOptionsArray[i];
        shinyDropdown.appendChild(creationOption);

        const bunchOption = document.createElement("option");
        bunchOption.value = shinyOptionsArray[i];
        bunchOption.textContent = shinyOptionsArray[i];
        bunchShinyDropdown.appendChild(bunchOption);

        const filterOption = document.createElement("option");
        filterOption.value = shinyOptionsArray[i];
        filterOption.textContent = shinyOptionsArray[i];
        filterShiny.appendChild(filterOption);
    }
}

function MintOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    mintOptionsArray = arrayInfo["Rows"];
    //console.log(mintOptionsArray);

    for (let i = 0; i < mintOptionsArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = mintOptionsArray[i];
        creationOption.textContent = mintOptionsArray[i];
        mintDropdown.appendChild(creationOption);

        const filterOption = document.createElement("option");
        filterOption.value = mintOptionsArray[i];
        filterOption.textContent = mintOptionsArray[i];
        filterMint.appendChild(filterOption);
    }
}

function StatusOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    statusOptionsArray = arrayInfo["Rows"];
    //console.log(statusOptionsArray);

    for (let i = 0; i < statusOptionsArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = statusOptionsArray[i];
        creationOption.textContent = statusOptionsArray[i];
        statusDropdown.appendChild(creationOption);

        const filterOption = document.createElement("option");
        filterOption.value = statusOptionsArray[i];
        filterOption.textContent = statusOptionsArray[i];
        filterStatus.appendChild(filterOption);
    }
}

function NoteOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    noteOptionsArray = arrayInfo["Rows"];
    //console.log(noteOptionsArray);

    for (let i = 0; i < noteOptionsArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = noteOptionsArray[i];
        filterOption.textContent = noteOptionsArray[i];
        filterNote.appendChild(filterOption);
    }
}

function ProofOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    proofOptionsArray = arrayInfo["Rows"];
    //console.log(proofOptionsArray);

    for (let i = 0; i < proofOptionsArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = proofOptionsArray[i];
        filterOption.textContent = proofOptionsArray[i];
        filterProof.appendChild(filterOption);
    }
}

function LanguagesOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    languageOptionsArray = arrayInfo["Rows"];
    //console.log(languageOptionsArray);

    for (let i = 0; i < languageOptionsArray.length; i++) {
        const creationOption = document.createElement("option");
        creationOption.value = languageOptionsArray[i];
        creationOption.textContent = languageOptionsArray[i];
        languageDropdown.appendChild(creationOption);

        const filterOption = document.createElement("option");
        filterOption.value = languageOptionsArray[i];
        filterOption.textContent = languageOptionsArray[i];
        filterLanguage.appendChild(filterOption);
    }
}