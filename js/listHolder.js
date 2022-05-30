var url = "https://poketrades.org";
var pokemonDataArray;
var informationPokemonArray;
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
var templateOptionsArray;
var ribbonOptionsArray;
var allTypesArray;
var nicknameOptionsArray;
var formOptionsArray;
var evoOptionsArray;
var evoDataArray;

/*$('#Testing').click(function () {
    $.post(url + "/PHP/get_list_names.php", { column: "genderless", table: "genderless_pokemon" }, GenderlessPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "female_only", table: "female_only_pokemon" }, FemaleOnlyPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "male_only", table: "male_only_pokemon" }, MaleOnlyPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "gender_differences", table: "gender_different_pokemon" }, GenderDifferentPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "shiny_exceptions", table: "shiny_exception_pokemon" }, ShinyExceptionPokemon);
});*/

$(document).ready(function () {
    $.post(url + "/PHP/pokemon_data.php", PokemonData);
    $.post(url + "/PHP/get_list_names.php", { column: "pokemon", table: "pokemon_names" }, AllPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "pokemon", table: "pokemon_names", order: "dex" }, InformationPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "balls", table: "ball_names" }, AllBalls);
    $.post(url + "/PHP/get_list_names.php", { column: "genderless", table: "genderless_pokemon" }, GenderlessPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "female_only", table: "female_only_pokemon" }, FemaleOnlyPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "male_only", table: "male_only_pokemon" }, MaleOnlyPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "gender_differences", table: "gender_different_pokemon" }, GenderDifferentPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "shiny_locked", table: "shiny_locked_pokemon" }, ShinyLockedPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "shiny_exceptions", table: "shiny_exception_pokemon" }, ShinyExceptionPokemon);
    $.post(url + "/PHP/get_list_names.php", { column: "moves", table: "move_names" }, AllMoves);
    $.post(url + "/PHP/get_list_names.php", { column: "natures", table: "nature_names" }, AllNatures);
    $.post(url + "/PHP/get_list_names.php", { column: "abilities", table: "ability_names" }, AllAbilities);
    $.post(url + "/PHP/get_list_names.php", { column: "items", table: "item_names" }, AllItems);
    $.post(url + "/PHP/get_list_names.php", { column: "marks", table: "mark_names" }, AllMarks);
    $.post(url + "/PHP/get_list_names.php", { column: "how_obtained", table: "how_obtained_options" }, HowObtained);
    $.post(url + "/PHP/get_list_names.php", { column: "game_obtained", table: "game_obtained_options" }, GameObtained);
    $.post(url + "/PHP/get_list_names.php", { column: "icons", table: "icon_names" }, AllIcons);
    $.post(url + "/PHP/get_list_names.php", { column: "icon_exclusives", table: "icon_exclusive_icons" }, IconExclusives);
    $.post(url + "/PHP/get_list_names.php", { column: "ivs", table: "iv_values" }, IvValues);
    $.post(url + "/PHP/get_list_names.php", { column: "evs", table: "ev_values" }, EvValues);
    $.post(url + "/PHP/get_list_names.php", { column: "display_types", table: "display_options" }, DisplayOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "event_types", table: "event_options" }, EventOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "genders", table: "gender_options" }, GenderOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "misc_types", table: "misc_options" }, MiscOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "shiny_types", table: "shiny_options" }, ShinyOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "mint_types", table: "mint_options" }, MintOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "status_types", table: "status_options" }, StatusOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "note_types", table: "note_options" }, NoteOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "proof_types", table: "proof_options" }, ProofOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "languages", table: "languages_options" }, LanguagesOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "ribbons", table: "ribbon_options" }, RibbonOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "types", table: "type_names" }, AllTypes);
    $.post(url + "/PHP/get_list_names.php", { column: "nickname_types", table: "nickname_options" }, NicknameOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "form_types", table: "form_options" }, FormOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "evo_types", table: "evo_options" }, EvoOptions);
    $.post(url + "/PHP/evolution_data.php", EvoLines);
    if (token != null) {
        $.post(url + "/PHP/generate_templates.php", { token: token }, GetTemplateOptions);
    }
});



//$.post(url + "/PHP/generate_bunch_selection.php", { isOwner: "", searchID: "1", tradeOption: "For Trade" }, GenerateBunch);


function UserBunches(data) {
    arrayInfo = jQuery.parseJSON(data);
    userBunchArray = arrayInfo["Rows"];
    console.log(userBunchArray);

    bunchRename = document.querySelector(".BA-BunchRename");
    while (bunchRename.lastElementChild) {
        bunchRename.removeChild(bunchRename.lastElementChild);
    }

    while (bunchSelection.lastElementChild) {
        bunchSelection.removeChild(bunchSelection.lastElementChild);
    }

    for (let i = 0; i < userBunchArray.length; i++) {
        const bunchOption = document.createElement("option");
        const detailsOption = document.createElement("option");
        bunchOption.value = userBunchArray[i].name;
        bunchOption.textContent = userBunchArray[i].name;
        bunchOption.setAttribute("class", "BA-DropdownOptions");
        detailsOption.value = userBunchArray[i].name;
        detailsOption.textContent = userBunchArray[i].name;
        detailsOption.setAttribute("class", "DA-DropdownOptions");
        bunchToRenameDropdown.appendChild(bunchOption);
        bunchSelection.appendChild(detailsOption);
    }
    bunchIconDropdown.value = "Abomasnow";

}

function GetTemplateOptions(data) {
    //console.log(data);
    arrayInfo = jQuery.parseJSON(data);
    templateOptionsArray = arrayInfo["Rows"];

    while (templateSelection.lastElementChild) {
        templateSelection.removeChild(templateSelection.lastElementChild);
    }

    const baseOption = document.createElement("option");
    baseOption.value = "(No Template)";
    baseOption.textContent = "(No Template)";
    baseOption.setAttribute("class", "DA-DropdownOptions");
    templateSelection.appendChild(baseOption);

    for (let i = 0; i < templateOptionsArray.length; i++) {
        const detailsOption = document.createElement("option");
        detailsOption.value = templateOptionsArray[i].name;
        detailsOption.textContent = templateOptionsArray[i].name;
        detailsOption.setAttribute("class", "DA-DropdownOptions");
        templateSelection.appendChild(detailsOption);
    }
}

function PokemonData(data) {
    arrayInfo = jQuery.parseJSON(data);
    pokemonDataArray = arrayInfo["Rows"];
    //console.log(pokemonDataArray);
}

function AllPokemon(data) {
    arrayInfo = jQuery.parseJSON(data);
    allPokemonArray = arrayInfo["Rows"];
    //console.log(allPokemonArray);

    for (let i = 0; i < allPokemonArray.length; i++) {
        const detailsOption = document.createElement("option");
        detailsOption.value = allPokemonArray[i];
        detailsOption.textContent = allPokemonArray[i];
        detailsOption.setAttribute("class", "DA-DropdownOptions")
        pokemonSelection.appendChild(detailsOption);


        const ctsOption = document.createElement("option");
        ctsOption.value = allPokemonArray[i];
        ctsOption.textContent = allPokemonArray[i];
        ctsOption.setAttribute("class", "CTS-DropdownOptions")
        document.querySelector(".CTS-PokemonDropdown").appendChild(ctsOption);
    }
    ctsPokemonDropdown.value = "Abomasnow";
}

function InformationPokemon(data) {
    arrayInfo = jQuery.parseJSON(data);
    informationPokemonArray = arrayInfo["Rows"];
    //console.log(informationPokemonArray);

    for (let i = 0; i < informationPokemonArray.length; i++) {
        const informationOption = document.createElement("option");
        informationOption.value = informationPokemonArray[i];
        informationOption.textContent = informationPokemonArray[i];
        informationOption.setAttribute("class", "IA-DropdownOptions")
        document.querySelector(".IA-PokemonDropdown").appendChild(informationOption);
    }
}

function AllBalls(data) {
    arrayInfo = jQuery.parseJSON(data);
    allBallsArray = arrayInfo["Rows"];
    CreateBallOptions();

    ctsBallArray = new Array(allBallsArray.length - 1);
    CTSBallOptions();
    //console.log(allBallsArray);

    for (let i = 0; i < allBallsArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = allBallsArray[i];
        filterOption.textContent = allBallsArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
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
        const filterOption = document.createElement("option");
        filterOption.value = allMovesArray[i];
        filterOption.textContent = allMovesArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterMove.appendChild(filterOption);

        const detailsOptionMove1 = document.createElement("option");
        const detailsOptionMove2 = document.createElement("option");
        const detailsOptionMove3 = document.createElement("option");
        const detailsOptionMove4 = document.createElement("option");
        const detailsOptionLegacyMove1 = document.createElement("option");
        const detailsOptionLegacyMove2 = document.createElement("option");
        const detailsOptionLegacyMove3 = document.createElement("option");
        const detailsOptionLegacyMove4 = document.createElement("option");
        detailsOptionMove1.value = allMovesArray[i];
        detailsOptionMove1.textContent = allMovesArray[i];
        detailsOptionMove2.value = allMovesArray[i];
        detailsOptionMove2.textContent = allMovesArray[i];
        detailsOptionMove3.value = allMovesArray[i];
        detailsOptionMove3.textContent = allMovesArray[i];
        detailsOptionMove4.value = allMovesArray[i];
        detailsOptionMove4.textContent = allMovesArray[i];
        detailsOptionLegacyMove1.value = allMovesArray[i];
        detailsOptionLegacyMove1.textContent = allMovesArray[i];
        detailsOptionLegacyMove2.value = allMovesArray[i];
        detailsOptionLegacyMove2.textContent = allMovesArray[i];
        detailsOptionLegacyMove3.value = allMovesArray[i];
        detailsOptionLegacyMove3.textContent = allMovesArray[i];
        detailsOptionLegacyMove4.value = allMovesArray[i];
        detailsOptionLegacyMove4.textContent = allMovesArray[i];
        detailsOptionMove1.setAttribute("class", "DA-DropdownOptions");
        detailsOptionMove2.setAttribute("class", "DA-DropdownOptions");
        detailsOptionMove3.setAttribute("class", "DA-DropdownOptions");
        detailsOptionMove4.setAttribute("class", "DA-DropdownOptions");
        detailsOptionLegacyMove1.setAttribute("class", "DA-DropdownOptions");
        detailsOptionLegacyMove2.setAttribute("class", "DA-DropdownOptions");
        detailsOptionLegacyMove3.setAttribute("class", "DA-DropdownOptions");
        detailsOptionLegacyMove4.setAttribute("class", "DA-DropdownOptions");
        move1Selection.appendChild(detailsOptionMove1);
        move2Selection.appendChild(detailsOptionMove2);
        move3Selection.appendChild(detailsOptionMove3);
        move4Selection.appendChild(detailsOptionMove4);
        legacyMove1Selection.appendChild(detailsOptionLegacyMove1);
        legacyMove2Selection.appendChild(detailsOptionLegacyMove2);
        legacyMove3Selection.appendChild(detailsOptionLegacyMove3);
        legacyMove4Selection.appendChild(detailsOptionLegacyMove4);

        const ctsOptionMove1 = document.createElement("option");
        const ctsOptionMove2 = document.createElement("option");
        const ctsOptionMove3 = document.createElement("option");
        const ctsOptionMove4 = document.createElement("option");
        ctsOptionMove1.value = allMovesArray[i];
        ctsOptionMove1.textContent = allMovesArray[i];
        ctsOptionMove2.value = allMovesArray[i];
        ctsOptionMove2.textContent = allMovesArray[i];
        ctsOptionMove3.value = allMovesArray[i];
        ctsOptionMove3.textContent = allMovesArray[i];
        ctsOptionMove4.value = allMovesArray[i];
        ctsOptionMove4.textContent = allMovesArray[i];
        ctsOptionMove1.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionMove2.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionMove3.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionMove4.setAttribute("class", "CTS-DropdownOptions");
        ctsMove1Dropdown.appendChild(ctsOptionMove1);
        ctsMove2Dropdown.appendChild(ctsOptionMove2);
        ctsMove3Dropdown.appendChild(ctsOptionMove3);
        ctsMove4Dropdown.appendChild(ctsOptionMove4);
    }
}

function AllNatures(data) {
    arrayInfo = jQuery.parseJSON(data);
    allNaturesArray = arrayInfo["Rows"];
    //console.log(allNaturesArray);

    for (let i = 0; i < allNaturesArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = allNaturesArray[i];
        filterOption.textContent = allNaturesArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterNature.appendChild(filterOption);

        const detailsOption = document.createElement("option");
        detailsOption.value = allNaturesArray[i];
        detailsOption.textContent = allNaturesArray[i];
        detailsOption.setAttribute("class", "DA-DropdownOptions");
        natureSelection.appendChild(detailsOption);

        const ctsOption = document.createElement("option");
        ctsOption.value = allNaturesArray[i];
        ctsOption.textContent = allNaturesArray[i];
        ctsOption.setAttribute("class", "CTS-DropdownOptions");
        ctsNatureDropdown.appendChild(ctsOption);
    }
}

function AllAbilities(data) {
    arrayInfo = jQuery.parseJSON(data);
    allAbilitiesArray = arrayInfo["Rows"];
    //console.log(allAbilitiesArray);

    for (let i = 0; i < allAbilitiesArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = allAbilitiesArray[i];
        filterOption.textContent = allAbilitiesArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterAbility.appendChild(filterOption);

        const detailsOption = document.createElement("option");
        detailsOption.value = allAbilitiesArray[i];
        detailsOption.textContent = allAbilitiesArray[i];
        detailsOption.setAttribute("class", "DA-DropdownOptions");
        abilitySelection.appendChild(detailsOption);

        const ctsOption = document.createElement("option");
        ctsOption.value = allAbilitiesArray[i];
        ctsOption.textContent = allAbilitiesArray[i];
        ctsOption.setAttribute("class", "DA-DropdownOptions");
        ctsAbilityDropdown.appendChild(ctsOption);
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
    CreateMarkOptions();

    ctsMarkArray = new Array(allMarksArray.length - 1);
    CTSMarkOptions();
    //console.log(allMarksArray);

    for (let i = 0; i < allMarksArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = allMarksArray[i];
        filterOption.textContent = allMarksArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterMark.appendChild(filterOption);
    }
}

function HowObtained(data) {
    arrayInfo = jQuery.parseJSON(data);
    howObtainedArray = arrayInfo["Rows"];
    //console.log(howObtainedArray);

    for (let i = 0; i < howObtainedArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = howObtainedArray[i];
        filterOption.textContent = howObtainedArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterHowObtained.appendChild(filterOption);

        const detailsOption = document.createElement("option");
        detailsOption.value = howObtainedArray[i];
        detailsOption.textContent = howObtainedArray[i];
        detailsOption.setAttribute("class", "DA-DropdownOptions");
        howObtainedSelection.appendChild(detailsOption);

        const ctsOption = document.createElement("option");
        ctsOption.value = howObtainedArray[i];
        ctsOption.textContent = howObtainedArray[i];
        ctsOption.setAttribute("class", "CTS-DropdownOptions");
        ctsHowObtainedDropdown.appendChild(ctsOption);
    }
}

function GameObtained(data) {
    arrayInfo = jQuery.parseJSON(data);
    gameObtainedArray = arrayInfo["Rows"];
    //console.log(gameObtainedArray);

    for (let i = 0; i < gameObtainedArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = gameObtainedArray[i];
        filterOption.textContent = gameObtainedArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterGameObtained.appendChild(filterOption);

        const detailsOption = document.createElement("option");
        detailsOption.value = gameObtainedArray[i];
        detailsOption.textContent = gameObtainedArray[i];
        detailsOption.setAttribute("class", "DA-DropdownOptions");
        gameObtainedSelection.appendChild(detailsOption);

        const ctsOption = document.createElement("option");
        ctsOption.value = gameObtainedArray[i];
        ctsOption.textContent = gameObtainedArray[i];
        ctsOption.setAttribute("class", "CTS-DropdownOptions");
        ctsGameObtainedDropdown.appendChild(ctsOption);
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
        bunchOption.setAttribute("class", "BA-DropdownOptions");
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

        filterOptionHP.setAttribute("class", "FA-DropdownOptions");
        filterOptionAtt.setAttribute("class", "FA-DropdownOptions");
        filterOptionDef.setAttribute("class", "FA-DropdownOptions");
        filterOptionSpa.setAttribute("class", "FA-DropdownOptions");
        filterOptionSpd.setAttribute("class", "FA-DropdownOptions");
        filterOptionSpe.setAttribute("class", "FA-DropdownOptions");

        filterIvHP.appendChild(filterOptionHP);
        filterIvAtt.appendChild(filterOptionAtt);
        filterIvDef.appendChild(filterOptionDef);
        filterIvSpa.appendChild(filterOptionSpa);
        filterIvSpd.appendChild(filterOptionSpd);
        filterIvSpe.appendChild(filterOptionSpe);

        const detailsOptionHP = document.createElement("option");
        const detailsOptionAtt = document.createElement("option");
        const detailsOptionDef = document.createElement("option");
        const detailsOptionSpa = document.createElement("option");
        const detailsOptionSpd = document.createElement("option");
        const detailsOptionSpe = document.createElement("option");
        detailsOptionHP.value = ivValuesArray[i];
        detailsOptionHP.textContent = ivValuesArray[i];
        detailsOptionAtt.value = ivValuesArray[i];
        detailsOptionAtt.textContent = ivValuesArray[i];
        detailsOptionDef.value = ivValuesArray[i];
        detailsOptionDef.textContent = ivValuesArray[i];
        detailsOptionSpa.value = ivValuesArray[i];
        detailsOptionSpa.textContent = ivValuesArray[i];
        detailsOptionSpd.value = ivValuesArray[i];
        detailsOptionSpd.textContent = ivValuesArray[i];
        detailsOptionSpe.value = ivValuesArray[i];
        detailsOptionSpe.textContent = ivValuesArray[i];
        detailsOptionHP.setAttribute("class", "DA-DropdownOptions");
        detailsOptionAtt.setAttribute("class", "DA-DropdownOptions");
        detailsOptionDef.setAttribute("class", "DA-DropdownOptions");
        detailsOptionSpa.setAttribute("class", "DA-DropdownOptions");
        detailsOptionSpd.setAttribute("class", "DA-DropdownOptions");
        detailsOptionSpe.setAttribute("class", "DA-DropdownOptions");
        ivHpSelection.appendChild(detailsOptionHP);
        ivAttSelection.appendChild(detailsOptionAtt);
        ivDefSelection.appendChild(detailsOptionDef);
        ivSpaSelection.appendChild(detailsOptionSpa);
        ivSpdSelection.appendChild(detailsOptionSpd);
        ivSpeSelection.appendChild(detailsOptionSpe);

        const ctsOptionHP = document.createElement("option");
        const ctsOptionAtt = document.createElement("option");
        const ctsOptionDef = document.createElement("option");
        const ctsOptionSpa = document.createElement("option");
        const ctsOptionSpd = document.createElement("option");
        const ctsOptionSpe = document.createElement("option");
        ctsOptionHP.value = ivValuesArray[i];
        ctsOptionHP.textContent = ivValuesArray[i];
        ctsOptionAtt.value = ivValuesArray[i];
        ctsOptionAtt.textContent = ivValuesArray[i];
        ctsOptionDef.value = ivValuesArray[i];
        ctsOptionDef.textContent = ivValuesArray[i];
        ctsOptionSpa.value = ivValuesArray[i];
        ctsOptionSpa.textContent = ivValuesArray[i];
        ctsOptionSpd.value = ivValuesArray[i];
        ctsOptionSpd.textContent = ivValuesArray[i];
        ctsOptionSpe.value = ivValuesArray[i];
        ctsOptionSpe.textContent = ivValuesArray[i];
        ctsOptionHP.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionAtt.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionDef.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionSpa.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionSpd.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionSpe.setAttribute("class", "CTS-DropdownOptions");
        ctsIvHP.appendChild(ctsOptionHP);
        ctsIvAtt.appendChild(ctsOptionAtt);
        ctsIvDef.appendChild(ctsOptionDef);
        ctsIvSpa.appendChild(ctsOptionSpa);
        ctsIvSpd.appendChild(ctsOptionSpd);
        ctsIvSpe.appendChild(ctsOptionSpe);
    }

    filterIvHP.value = "X";
    filterIvAtt.value = "X";
    filterIvDef.value = "X";
    filterIvSpa.value = "X";
    filterIvSpd.value = "X";
    filterIvSpe.value = "X";

    ctsIvHP.value = "X";
    ctsIvAtt.value = "X";
    ctsIvDef.value = "X";
    ctsIvSpa.value = "X";
    ctsIvSpd.value = "X";
    ctsIvSpe.value = "X";
}

function EvValues(data) {
    arrayInfo = jQuery.parseJSON(data);
    evValuesArray = arrayInfo["Rows"];
    //console.log(evValuesArray);

    for (let i = 0; i < evValuesArray.length; i++) {
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

        filterOptionHP.setAttribute("class", "FA-DropdownOptions");
        filterOptionAtt.setAttribute("class", "FA-DropdownOptions");
        filterOptionDef.setAttribute("class", "FA-DropdownOptions");
        filterOptionSpa.setAttribute("class", "FA-DropdownOptions");
        filterOptionSpd.setAttribute("class", "FA-DropdownOptions");
        filterOptionSpe.setAttribute("class", "FA-DropdownOptions");

        filterEvHP.appendChild(filterOptionHP);
        filterEvAtt.appendChild(filterOptionAtt);
        filterEvDef.appendChild(filterOptionDef);
        filterEvSpa.appendChild(filterOptionSpa);
        filterEvSpd.appendChild(filterOptionSpd);
        filterEvSpe.appendChild(filterOptionSpe);

        const detailsOptionHP = document.createElement("option");
        const detailsOptionAtt = document.createElement("option");
        const detailsOptionDef = document.createElement("option");
        const detailsOptionSpa = document.createElement("option");
        const detailsOptionSpd = document.createElement("option");
        const detailsOptionSpe = document.createElement("option");
        detailsOptionHP.value = evValuesArray[i];
        detailsOptionHP.textContent = evValuesArray[i];
        detailsOptionAtt.value = evValuesArray[i];
        detailsOptionAtt.textContent = evValuesArray[i];
        detailsOptionDef.value = evValuesArray[i];
        detailsOptionDef.textContent = evValuesArray[i];
        detailsOptionSpa.value = evValuesArray[i];
        detailsOptionSpa.textContent = evValuesArray[i];
        detailsOptionSpd.value = evValuesArray[i];
        detailsOptionSpd.textContent = evValuesArray[i];
        detailsOptionSpe.value = evValuesArray[i];
        detailsOptionSpe.textContent = evValuesArray[i];
        detailsOptionHP.setAttribute("class", "DA-DropdownOptions");
        detailsOptionAtt.setAttribute("class", "DA-DropdownOptions");
        detailsOptionDef.setAttribute("class", "DA-DropdownOptions");
        detailsOptionSpa.setAttribute("class", "DA-DropdownOptions");
        detailsOptionSpd.setAttribute("class", "DA-DropdownOptions");
        detailsOptionSpe.setAttribute("class", "DA-DropdownOptions");
        evHpSelection.appendChild(detailsOptionHP);
        evAttSelection.appendChild(detailsOptionAtt);
        evDefSelection.appendChild(detailsOptionDef);
        evSpaSelection.appendChild(detailsOptionSpa);
        evSpdSelection.appendChild(detailsOptionSpd);
        evSpeSelection.appendChild(detailsOptionSpe);

        const ctsOptionHP = document.createElement("option");
        const ctsOptionAtt = document.createElement("option");
        const ctsOptionDef = document.createElement("option");
        const ctsOptionSpa = document.createElement("option");
        const ctsOptionSpd = document.createElement("option");
        const ctsOptionSpe = document.createElement("option");
        ctsOptionHP.value = evValuesArray[i];
        ctsOptionHP.textContent = evValuesArray[i];
        ctsOptionAtt.value = evValuesArray[i];
        ctsOptionAtt.textContent = evValuesArray[i];
        ctsOptionDef.value = evValuesArray[i];
        ctsOptionDef.textContent = evValuesArray[i];
        ctsOptionSpa.value = evValuesArray[i];
        ctsOptionSpa.textContent = evValuesArray[i];
        ctsOptionSpd.value = evValuesArray[i];
        ctsOptionSpd.textContent = evValuesArray[i];
        ctsOptionSpe.value = evValuesArray[i];
        ctsOptionSpe.textContent = evValuesArray[i];
        ctsOptionHP.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionAtt.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionDef.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionSpa.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionSpd.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionSpe.setAttribute("class", "CTS-DropdownOptions");
        ctsEvHP.appendChild(ctsOptionHP);
        ctsEvAtt.appendChild(ctsOptionAtt);
        ctsEvDef.appendChild(ctsOptionDef);
        ctsEvSpa.appendChild(ctsOptionSpa);
        ctsEvSpd.appendChild(ctsOptionSpd);
        ctsEvSpe.appendChild(ctsOptionSpe);
    }

    filterEvHP.value = "X";
    filterEvAtt.value = "X";
    filterEvDef.value = "X";
    filterEvSpa.value = "X";
    filterEvSpd.value = "X";
    filterEvSpe.value = "X";

    ctsEvHP.value = "X";
    ctsEvAtt.value = "X";
    ctsEvDef.value = "X";
    ctsEvSpa.value = "X";
    ctsEvSpd.value = "X";
    ctsEvSpe.value = "X";
}

function DisplayOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    displayOptionsArray = arrayInfo["Rows"];
    //console.log(displayOptionsArray);

    for (let i = 0; i < displayOptionsArray.length; i++) {
        const detailsOption = document.createElement("option");
        detailsOption.value = displayOptionsArray[i];
        detailsOption.textContent = displayOptionsArray[i];
        detailsOption.setAttribute("class", "DA-DropdownOptions");
        displaySelection.appendChild(detailsOption);
    }
}

function EventOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    eventOptionsArray = arrayInfo["Rows"];
    //console.log(eventOptionsArray);

    for (let i = 0; i < eventOptionsArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = eventOptionsArray[i];
        filterOption.textContent = eventOptionsArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterEvent.appendChild(filterOption);

        const detailsOption = document.createElement("option");
        detailsOption.value = eventOptionsArray[i];
        detailsOption.textContent = eventOptionsArray[i];
        detailsOption.setAttribute("class", "DA-DropdownOptions");
        eventSelection.appendChild(detailsOption);

        const ctsOption = document.createElement("option");
        ctsOption.value = eventOptionsArray[i];
        ctsOption.textContent = eventOptionsArray[i];
        ctsOption.setAttribute("class", "CTS-DropdownOptions");
        ctsEventDropdown.appendChild(ctsOption);
    }
}

function GenderOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    genderOptionsArray = arrayInfo["Rows"];
    CreateGenderOptions();

    //ctsGenderArray = new Array(genderOptionsArray.length);
    CTSGenderOptions();
    //console.log(genderOptionsArray);

    for (let i = 0; i < genderOptionsArray.length; i++) {
        const bunchOption = document.createElement("option");
        bunchOption.value = genderOptionsArray[i];
        bunchOption.textContent = genderOptionsArray[i];
        bunchOption.setAttribute("class", "BA-DropdownOptions");
        bunchGenderDropdown.appendChild(bunchOption);

        const filterOption = document.createElement("option");
        filterOption.value = genderOptionsArray[i];
        filterOption.textContent = genderOptionsArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterGender.appendChild(filterOption);
    }
}

function MiscOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    miscOptionsArray = arrayInfo["Rows"];
    CreateMiscOptions();

    ctsMiscArray = new Array(miscOptionsArray.length - 1);
    CTSMiscOptions();
    //console.log(miscOptionsArray);

    for (let i = 0; i < miscOptionsArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = miscOptionsArray[i];
        filterOption.textContent = miscOptionsArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterMisc.appendChild(filterOption);
    }
}

function ShinyOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    shinyOptionsArray = arrayInfo["Rows"];
    CreateShinyOptions();

    //ctsShinyArray = new Array(shinyOptionsArray.length);
    CTSShinyOptions();
    //console.log(shinyOptionsArray);

    for (let i = 0; i < shinyOptionsArray.length; i++) {
        const bunchOption = document.createElement("option");
        bunchOption.value = shinyOptionsArray[i];
        bunchOption.textContent = shinyOptionsArray[i];
        bunchOption.setAttribute("class", "BA-DropdownOptions");
        bunchShinyDropdown.appendChild(bunchOption);

        const filterOption = document.createElement("option");
        filterOption.value = shinyOptionsArray[i];
        filterOption.textContent = shinyOptionsArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterShiny.appendChild(filterOption);
    }
}

function MintOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    mintOptionsArray = arrayInfo["Rows"];
    CreateMintOptions();

    CTSMintOptions();
    //console.log(mintOptionsArray);

    for (let i = 0; i < mintOptionsArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = mintOptionsArray[i];
        filterOption.textContent = mintOptionsArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterMint.appendChild(filterOption);
    }
}

function StatusOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    statusOptionsArray = arrayInfo["Rows"];
    //console.log(statusOptionsArray);

    for (let i = 0; i < statusOptionsArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = statusOptionsArray[i];
        filterOption.textContent = statusOptionsArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterStatus.appendChild(filterOption);

        const detailsOption = document.createElement("option");
        detailsOption.value = statusOptionsArray[i];
        detailsOption.textContent = statusOptionsArray[i];
        detailsOption.setAttribute("class", "DA-DropdownOptions");
        statusSelection.appendChild(detailsOption);

        const ctsOption = document.createElement("option");
        ctsOption.value = statusOptionsArray[i];
        ctsOption.textContent = statusOptionsArray[i];
        ctsOption.setAttribute("class", "CTS-DropdownOptions");
        ctsStatusDropdown.appendChild(ctsOption);
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
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterNote.appendChild(filterOption);

        const ctsOption = document.createElement("option");
        ctsOption.value = noteOptionsArray[i];
        ctsOption.textContent = noteOptionsArray[i];
        ctsOption.setAttribute("class", "CTS-DropdownOptions")
        ctsNoteDropdown.appendChild(ctsOption);
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
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterProof.appendChild(filterOption);

        const ctsOption = document.createElement("option");
        ctsOption.value = proofOptionsArray[i];
        ctsOption.textContent = proofOptionsArray[i];
        ctsOption.setAttribute("class", "CTS-DropdownOptions")
        ctsProofDropdown.appendChild(ctsOption);
    }
}

function LanguagesOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    languageOptionsArray = arrayInfo["Rows"];
    CreateLangOptions();

    ctsLangArray = new Array(languageOptionsArray.length - 1);
    CTSLangOptions();
    //console.log(languageOptionsArray);

    for (let i = 0; i < languageOptionsArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = languageOptionsArray[i];
        filterOption.textContent = languageOptionsArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterLanguage.appendChild(filterOption);
    }
}

function RibbonOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    ribbonOptionsArray = arrayInfo["Rows"];
    CreateRibbonOptions();

    ctsRibbonArray = new Array(ribbonOptionsArray.length - 1);
    CTSRibbonOptions();
    //console.log(ribbonOptionsArray);

    for (let i = 0; i < ribbonOptionsArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = ribbonOptionsArray[i];
        filterOption.textContent = ribbonOptionsArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterRibbon.appendChild(filterOption);
    }
}

function AllTypes(data) {
    arrayInfo = jQuery.parseJSON(data);
    allTypesArray = arrayInfo["Rows"];
    //console.log(allTypesArray);

    for (let i = 0; i < allTypesArray.length; i++) {
        const filterOption = document.createElement("option");
        filterOption.value = allTypesArray[i];
        filterOption.textContent = allTypesArray[i];
        filterOption.setAttribute("class", "FA-DropdownOptions")
        filterType.appendChild(filterOption);
    }
}

function NicknameOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    nicknameOptionsArray = arrayInfo["Rows"];
    //console.log(nicknameOptionsArray);

    for (let i = 0; i < nicknameOptionsArray.length; i++) {
        const ctsOption = document.createElement("option");
        ctsOption.value = nicknameOptionsArray[i];
        ctsOption.textContent = nicknameOptionsArray[i];
        ctsOption.setAttribute("class", "CTS-DropdownOptions")
        ctsNicknameDropdown.appendChild(ctsOption);
    }
}

function FormOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    formOptionsArray = arrayInfo["Rows"];
    //console.log(formOptionsArray);

    for (let i = 0; i < formOptionsArray.length; i++) {
        const ctsOption = document.createElement("option");
        ctsOption.value = formOptionsArray[i];
        ctsOption.textContent = formOptionsArray[i];
        ctsOption.setAttribute("class", "CTS-DropdownOptions")
        ctsFormDropdown.appendChild(ctsOption);
    }
}

function EvoOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    evoOptionsArray = arrayInfo["Rows"];
    //console.log(evoOptionsArray);

    for (let i = 0; i < evoOptionsArray.length; i++) {
        const ctsOption = document.createElement("option");
        ctsOption.value = evoOptionsArray[i];
        ctsOption.textContent = evoOptionsArray[i];
        ctsOption.setAttribute("class", "CTS-DropdownOptions")
        ctsEvoDropdown.appendChild(ctsOption);
    }
}

function EvoLines(data) {
    arrayInfo = jQuery.parseJSON(data);
    evoDataArray = arrayInfo["Rows"];
    //console.log(evoDataArray);
}