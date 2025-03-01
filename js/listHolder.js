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
var orderOptionsArray;
var progressArray;
var progressBalls;
var progressGames;
var progressGens;
var progressObtainableOptions;
var cannotBreedArray;
var inboxOptionsArray;
var avatarOptions;

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
    //$.post(url + "/PHP/get_list_names.php", { column: "moves", table: "move_names" }, AllMoves);
    $.post(url + "/PHP/get_moves_data.php", AllMoves);
    $.post(url + "/PHP/get_list_names.php", { column: "natures", table: "nature_names" }, AllNatures);
    $.post(url + "/PHP/get_list_names.php", { column: "abilities", table: "ability_names" }, AllAbilities);
    $.post(url + "/PHP/get_list_names.php", { column: "items", table: "item_names" }, AllItems);
    $.post(url + "/PHP/get_list_names.php", { column: "marks", table: "mark_names" }, AllMarks);
    $.post(url + "/PHP/get_list_names.php", { column: "how_obtained", table: "how_obtained_options" }, HowObtained);
    $.post(url + "/PHP/get_list_names.php", { column: "game_obtained", order: "id", table: "game_obtained_options" }, GameObtained);
    $.post(url + "/PHP/get_list_names.php", { column: "icons", table: "icon_names" }, AllIcons);
    $.post(url + "/PHP/get_list_names.php", { column: "icon_exclusives", table: "icon_exclusive_icons" }, IconExclusives);
    $.post(url + "/PHP/get_giveaway_data.php", GiveawayData);
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
    $.post(url + "/PHP/get_list_names.php", { column: "order_types", table: "order_options" }, OrderOptions);
    $.post(url + "/PHP/progress_data.php", ProgressInfo);
    $.post(url + "/PHP/get_list_names.php", { column: "ball", table: "progress_ball_options" }, ProgressBallOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "game", table: "progress_game_options" }, ProgressGameOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "gen", table: "progress_game_options" }, ProgressGenOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "method", table: "progress_obtainable_options" }, ProgressObtainableOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "unavailable", table: "y_swsh_unavailable" }, TempSWSH);
    $.post(url + "/PHP/get_list_names.php", { column: "available", table: "y_la_available" }, TempLA);
    $.post(url + "/PHP/get_list_names.php", { column: "unavailable", table: "y_sv_unavailable" }, TempSV);
    $.post(url + "/PHP/get_list_names.php", { column: "pokemon", table: "unbreedable_pokemon" }, Unbreedable);
    $.post(url + "/PHP/evolution_data.php", EvoLines);
    $.post(url + "/PHP/get_list_names.php", { column: "inbox_options", table: "inbox_options" }, InboxOptions);
    $.post(url + "/PHP/get_list_names.php", { column: "avatars", order: "dex", table: "avatar_options" }, AvatarOptions);
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
    //bunchIconDropdown.value = "Abomasnow";

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
        filterOption.value = allMovesArray[i].moves;
        filterOption.textContent = allMovesArray[i].moves;
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
        detailsOptionMove1.value = allMovesArray[i].moves;
        detailsOptionMove1.textContent = allMovesArray[i].moves;
        detailsOptionMove2.value = allMovesArray[i].moves;
        detailsOptionMove2.textContent = allMovesArray[i].moves;
        detailsOptionMove3.value = allMovesArray[i].moves;
        detailsOptionMove3.textContent = allMovesArray[i].moves;
        detailsOptionMove4.value = allMovesArray[i].moves;
        detailsOptionMove4.textContent = allMovesArray[i].moves;
        detailsOptionLegacyMove1.value = allMovesArray[i].moves;
        detailsOptionLegacyMove1.textContent = allMovesArray[i].moves;
        detailsOptionLegacyMove2.value = allMovesArray[i].moves;
        detailsOptionLegacyMove2.textContent = allMovesArray[i].moves;
        detailsOptionLegacyMove3.value = allMovesArray[i].moves;
        detailsOptionLegacyMove3.textContent = allMovesArray[i].moves;
        detailsOptionLegacyMove4.value = allMovesArray[i].moves;
        detailsOptionLegacyMove4.textContent = allMovesArray[i].moves;
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
        ctsOptionMove1.value = allMovesArray[i].moves;
        ctsOptionMove1.textContent = allMovesArray[i].moves;
        ctsOptionMove2.value = allMovesArray[i].moves;
        ctsOptionMove2.textContent = allMovesArray[i].moves;
        ctsOptionMove3.value = allMovesArray[i].moves;
        ctsOptionMove3.textContent = allMovesArray[i].moves;
        ctsOptionMove4.value = allMovesArray[i].moves;
        ctsOptionMove4.textContent = allMovesArray[i].moves;
        ctsOptionMove1.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionMove2.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionMove3.setAttribute("class", "CTS-DropdownOptions");
        ctsOptionMove4.setAttribute("class", "CTS-DropdownOptions");
        ctsMove1Dropdown.appendChild(ctsOptionMove1);
        ctsMove2Dropdown.appendChild(ctsOptionMove2);
        ctsMove3Dropdown.appendChild(ctsOptionMove3);
        ctsMove4Dropdown.appendChild(ctsOptionMove4);

        const resuableMove1Option = document.createElement("option");
        resuableMove1Option.value = allMovesArray[i].moves;
        resuableMove1Option.textContent = allMovesArray[i].moves;
        resuableMove1Option.setAttribute("class", "DA-DropdownOptions");
        reusableMove1Dropdown.appendChild(resuableMove1Option);

        const resuableMove2Option = document.createElement("option");
        resuableMove2Option.value = allMovesArray[i].moves;
        resuableMove2Option.textContent = allMovesArray[i].moves;
        resuableMove2Option.setAttribute("class", "DA-DropdownOptions");
        reusableMove2Dropdown.appendChild(resuableMove2Option);

        const resuableMove3Option = document.createElement("option");
        resuableMove3Option.value = allMovesArray[i].moves;
        resuableMove3Option.textContent = allMovesArray[i].moves;
        resuableMove3Option.setAttribute("class", "DA-DropdownOptions");
        reusableMove3Dropdown.appendChild(resuableMove3Option);

        const resuableMove4Option = document.createElement("option");
        resuableMove4Option.value = allMovesArray[i].moves;
        resuableMove4Option.textContent = allMovesArray[i].moves;
        resuableMove4Option.setAttribute("class", "DA-DropdownOptions");
        reusableMove4Dropdown.appendChild(resuableMove4Option);

        const resuableTransferMove1Option = document.createElement("option");
        resuableTransferMove1Option.value = allMovesArray[i].moves;
        resuableTransferMove1Option.textContent = allMovesArray[i].moves;
        resuableTransferMove1Option.setAttribute("class", "DA-DropdownOptions");
        reusableTransferMove1Dropdown.appendChild(resuableTransferMove1Option);

        const resuableTransferMove2Option = document.createElement("option");
        resuableTransferMove2Option.value = allMovesArray[i].moves;
        resuableTransferMove2Option.textContent = allMovesArray[i].moves;
        resuableTransferMove2Option.setAttribute("class", "DA-DropdownOptions");
        reusableTransferMove2Dropdown.appendChild(resuableTransferMove2Option);

        const resuableTransferMove3Option = document.createElement("option");
        resuableTransferMove3Option.value = allMovesArray[i].moves;
        resuableTransferMove3Option.textContent = allMovesArray[i].moves;
        resuableTransferMove3Option.setAttribute("class", "DA-DropdownOptions");
        reusableTransferMove3Dropdown.appendChild(resuableTransferMove3Option);

        const resuableTransferMove4Option = document.createElement("option");
        resuableTransferMove4Option.value = allMovesArray[i].moves;
        resuableTransferMove4Option.textContent = allMovesArray[i].moves;
        resuableTransferMove4Option.setAttribute("class", "DA-DropdownOptions");
        reusableTransferMove4Dropdown.appendChild(resuableTransferMove4Option);
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

    ctsNatureArray = new Array(allNaturesArray.length - 1);
    CTSNatureOptions();
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

    for (let i = 0; i < allItemsArray.length; i++) {
        const detailsOption = document.createElement("option");
        detailsOption.value = allItemsArray[i];
        detailsOption.textContent = allItemsArray[i];
        detailsOption.setAttribute("class", "DA-DropdownOptions");
        itemDropdown.appendChild(detailsOption);
    }
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

        const bunchOption = document.createElement("option");
        bunchOption.value = gameObtainedArray[i];
        bunchOption.textContent = gameObtainedArray[i];
        bunchOption.setAttribute("class", "BA-DropdownOptions")
        bunchGameDropdown.appendChild(bunchOption);

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
    CTSGameOptions();
    VAGameOptions();
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
    bunchIconDropdown.value = "Abomasnow";
}

function IconExclusives(data) {
    arrayInfo = jQuery.parseJSON(data);
    iconExclusivesArray = arrayInfo["Rows"];
    //console.log(iconExclusivesArray);
}

function IvValues(data) {
    arrayInfo = jQuery.parseJSON(data);
    ivValuesArray = arrayInfo["Rows"];
    ivValuesArray.sort(function (a, b) { return a - b });
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

        const reusableIvHPOption = document.createElement("option");
        reusableIvHPOption.value = ivValuesArray[i];
        reusableIvHPOption.textContent = ivValuesArray[i];
        reusableIvHPOption.setAttribute("class", "DA-DropdownOptions");
        reusableIvHPDropdown.appendChild(reusableIvHPOption);

        const reusableIvAttOption = document.createElement("option");
        reusableIvAttOption.value = ivValuesArray[i];
        reusableIvAttOption.textContent = ivValuesArray[i];
        reusableIvAttOption.setAttribute("class", "DA-DropdownOptions");
        reusableIvAttDropdown.appendChild(reusableIvAttOption);

        const reusableIvDefOption = document.createElement("option");
        reusableIvDefOption.value = ivValuesArray[i];
        reusableIvDefOption.textContent = ivValuesArray[i];
        reusableIvDefOption.setAttribute("class", "DA-DropdownOptions");
        reusableIvDefDropdown.appendChild(reusableIvDefOption);

        const reusableIvSpaOption = document.createElement("option");
        reusableIvSpaOption.value = ivValuesArray[i];
        reusableIvSpaOption.textContent = ivValuesArray[i];
        reusableIvSpaOption.setAttribute("class", "DA-DropdownOptions");
        reusableIvSpaDropdown.appendChild(reusableIvSpaOption);

        const reusableIvSpdOption = document.createElement("option");
        reusableIvSpdOption.value = ivValuesArray[i];
        reusableIvSpdOption.textContent = ivValuesArray[i];
        reusableIvSpdOption.setAttribute("class", "DA-DropdownOptions");
        reusableIvSpdDropdown.appendChild(reusableIvSpdOption);

        const reusableIvSpeOption = document.createElement("option");
        reusableIvSpeOption.value = ivValuesArray[i];
        reusableIvSpeOption.textContent = ivValuesArray[i];
        reusableIvSpeOption.setAttribute("class", "DA-DropdownOptions");
        reusableIvSpeDropdown.appendChild(reusableIvSpeOption);
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
    evValuesArray.sort(function (a, b) { return a - b });
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

        const reusableEvHPOption = document.createElement("option");
        reusableEvHPOption.value = evValuesArray[i];
        reusableEvHPOption.textContent = evValuesArray[i];
        reusableEvHPOption.setAttribute("class", "DA-DropdownOptions");
        reusableEvHPDropdown.appendChild(reusableEvHPOption);

        const reusableEvAttOption = document.createElement("option");
        reusableEvAttOption.value = evValuesArray[i];
        reusableEvAttOption.textContent = evValuesArray[i];
        reusableEvAttOption.setAttribute("class", "DA-DropdownOptions");
        reusableEvAttDropdown.appendChild(reusableEvAttOption);

        const reusableEvDefOption = document.createElement("option");
        reusableEvDefOption.value = evValuesArray[i];
        reusableEvDefOption.textContent = evValuesArray[i];
        reusableEvDefOption.setAttribute("class", "DA-DropdownOptions");
        reusableEvDefDropdown.appendChild(reusableEvDefOption);

        const reusableEvSpaOption = document.createElement("option");
        reusableEvSpaOption.value = evValuesArray[i];
        reusableEvSpaOption.textContent = evValuesArray[i];
        reusableEvSpaOption.setAttribute("class", "DA-DropdownOptions");
        reusableEvSpaDropdown.appendChild(reusableEvSpaOption);

        const reusableEvSpdOption = document.createElement("option");
        reusableEvSpdOption.value = evValuesArray[i];
        reusableEvSpdOption.textContent = evValuesArray[i];
        reusableEvSpdOption.setAttribute("class", "DA-DropdownOptions");
        reusableEvSpdDropdown.appendChild(reusableEvSpdOption);

        const reusableEvSpeOption = document.createElement("option");
        reusableEvSpeOption.value = evValuesArray[i];
        reusableEvSpeOption.textContent = evValuesArray[i];
        reusableEvSpeOption.setAttribute("class", "DA-DropdownOptions");
        reusableEvSpeDropdown.appendChild(reusableEvSpeOption);
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

function OrderOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    orderOptionsArray = arrayInfo["Rows"];
    //console.log(orderOptionsArray);

    for (let i = 0; i < orderOptionsArray.length; i++) {
        const selectionOption1 = document.createElement("option");
        selectionOption1.value = orderOptionsArray[i];
        selectionOption1.textContent = orderOptionsArray[i];
        selectionOption1.setAttribute("class", "SA-DropdownOptions1")
        selectionOrderDropdown1.appendChild(selectionOption1);

        const selectionOption2 = document.createElement("option");
        selectionOption2.value = orderOptionsArray[i];
        selectionOption2.textContent = orderOptionsArray[i];
        selectionOption2.setAttribute("class", "SA-DropdownOptions2")
        selectionOrderDropdown2.appendChild(selectionOption2);
    }
}

function EvoLines(data) {
    arrayInfo = jQuery.parseJSON(data);
    evoDataArray = arrayInfo["Rows"];
    //console.log(evoDataArray);
}

function GiveawayData(data) {
    if (data != "") {
        arrayData = jQuery.parseJSON(data);
        //console.log(arrayData["Rows"][0]);
        giveawayDetails = arrayData["Rows"][0];
        document.querySelector(".MA-Giveaway").style.display = "block";
        SetImage(document.querySelector(".MA-GiveawayImage"), giveawayDetails.pokemon, giveawayDetails.gender, giveawayDetails.shiny, giveawayDetails.game_obtained);
    }
    //document.querySelector(".MA-CTS").style.pointerEvents = "initial";
    //document.querySelector(".MA-PokemonData").style.pointerEvents = "initial";
}

function ProgressInfo(data) {
    arrayInfo = jQuery.parseJSON(data);
    progressArray = arrayInfo["Rows"];
    //console.log(progressArray);
}

function ProgressBallOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    progressBalls = arrayInfo["Rows"];
    //console.log(progressBalls);
    CreateProgressBalls();
}

function ProgressGameOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    progressGames = arrayInfo["Rows"];
    //console.log(progressGames);
}

function ProgressGenOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    progressGens = arrayInfo["Rows"];
    //console.log(progressGens);
}

function ProgressObtainableOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    progressObtainableOptions = arrayInfo["Rows"];
    //console.log(progressObtainableOptions);

    /*for (let i = 0; i < progressObtainableOptions.length; i++) {
        const viewingOption = document.createElement("option");
        viewingOption.value = progressObtainableOptions[i];
        viewingOption.textContent = progressObtainableOptions[i];
        viewingOption.setAttribute("class", "VA-DropdownOptions")
        viewingMethodDropdown.appendChild(viewingOption);
    }*/
}

function Unbreedable(data) {
    arrayInfo = jQuery.parseJSON(data);
    cannotBreedArray = arrayInfo["Rows"];
    //console.log(cannotBreedArray);
}

function InboxOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    inboxOptionsArray = arrayInfo["Rows"];
    //console.log(inboxOptionsArray);

    for (let i = 0; i < inboxOptionsArray.length; i++) {
        const loginOption = document.createElement("option");
        loginOption.value = inboxOptionsArray[i];
        loginOption.textContent = inboxOptionsArray[i];
        loginOption.setAttribute("class", "LA-DropdownOptions")
        document.querySelector(".LA-InboxSettings").appendChild(loginOption);
    }
}

function AvatarOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    avatarOptions = arrayInfo["Rows"];
    CreateAvatarOptions();
    //console.log(avatarOptions);

    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".InitialLoading").style.display = "none";
}

function TempSWSH(data) {
    arrayInfo = jQuery.parseJSON(data);
    tempSWSH = arrayInfo["Rows"];
}

function TempLA(data) {
    arrayInfo = jQuery.parseJSON(data);
    tempLA = arrayInfo["Rows"];
}

function TempSV(data) {
    arrayInfo = jQuery.parseJSON(data);
    tempSV = arrayInfo["Rows"];
}

function SetIVDropdowns(statHP, statAtt, statDef, statSpa, statSpd, statSpe) {
    for (let i = 0; i < ivValuesArray.length; i++) {
        const optionHP = document.createElement("option");
        const optionAtt = document.createElement("option");
        const optionDef = document.createElement("option");
        const optionSpa = document.createElement("option");
        const optionSpd = document.createElement("option");
        const optionSpe = document.createElement("option");

        optionHP.value = ivValuesArray[i];
        optionHP.textContent = ivValuesArray[i];
        optionAtt.value = ivValuesArray[i];
        optionAtt.textContent = ivValuesArray[i];
        optionDef.value = ivValuesArray[i];
        optionDef.textContent = ivValuesArray[i];
        optionSpa.value = ivValuesArray[i];
        optionSpa.textContent = ivValuesArray[i];
        optionSpd.value = ivValuesArray[i];
        optionSpd.textContent = ivValuesArray[i];
        optionSpe.value = ivValuesArray[i];
        optionSpe.textContent = ivValuesArray[i];

        optionHP.setAttribute("class", "DA-DropdownOptions");
        optionAtt.setAttribute("class", "DA-DropdownOptions");
        optionDef.setAttribute("class", "DA-DropdownOptions");
        optionSpa.setAttribute("class", "DA-DropdownOptions");
        optionSpd.setAttribute("class", "DA-DropdownOptions");
        optionSpe.setAttribute("class", "DA-DropdownOptions");

        statHP.appendChild(optionHP);
        statAtt.appendChild(optionAtt);
        statDef.appendChild(optionDef);
        statSpa.appendChild(optionSpa);
        statSpd.appendChild(optionSpd);
        statSpe.appendChild(optionSpe);
    }
}

function SetEvDropdowns(statHP, statAtt, statDef, statSpa, statSpd, statSpe) {
    for (let i = 0; i < evValuesArray.length; i++) {
        const optionHP = document.createElement("option");
        const optionAtt = document.createElement("option");
        const optionDef = document.createElement("option");
        const optionSpa = document.createElement("option");
        const optionSpd = document.createElement("option");
        const optionSpe = document.createElement("option");

        optionHP.value = evValuesArray[i];
        optionHP.textContent = evValuesArray[i];
        optionAtt.value = evValuesArray[i];
        optionAtt.textContent = evValuesArray[i];
        optionDef.value = evValuesArray[i];
        optionDef.textContent = evValuesArray[i];
        optionSpa.value = evValuesArray[i];
        optionSpa.textContent = evValuesArray[i];
        optionSpd.value = evValuesArray[i];
        optionSpd.textContent = evValuesArray[i];
        optionSpe.value = evValuesArray[i];
        optionSpe.textContent = evValuesArray[i];

        optionHP.setAttribute("class", "DA-DropdownOptions");
        optionAtt.setAttribute("class", "DA-DropdownOptions");
        optionDef.setAttribute("class", "DA-DropdownOptions");
        optionSpa.setAttribute("class", "DA-DropdownOptions");
        optionSpd.setAttribute("class", "DA-DropdownOptions");
        optionSpe.setAttribute("class", "DA-DropdownOptions");

        statHP.appendChild(optionHP);
        statAtt.appendChild(optionAtt);
        statDef.appendChild(optionDef);
        statSpa.appendChild(optionSpa);
        statSpd.appendChild(optionSpd);
        statSpe.appendChild(optionSpe);
    }
}