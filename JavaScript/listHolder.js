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
}

function AllPokemon(data) {
    arrayInfo = jQuery.parseJSON(data);
    allPokemonArray = arrayInfo["Rows"];
    //console.log(allPokemonArray);
}

function AllBalls(data) {
    arrayInfo = jQuery.parseJSON(data);
    allBallsArray = arrayInfo["Rows"];
    //console.log(allBallsArray);
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
}

function AllNatures(data) {
    arrayInfo = jQuery.parseJSON(data);
    allNaturesArray = arrayInfo["Rows"];
    //console.log(allNaturesArray);
}

function AllAbilities(data) {
    arrayInfo = jQuery.parseJSON(data);
    allAbilitiesArray = arrayInfo["Rows"];
    //console.log(allAbilitiesArray);
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
}

function HowObtained(data) {
    arrayInfo = jQuery.parseJSON(data);
    howObtainedArray = arrayInfo["Rows"];
    //console.log(howObtainedArray);
}

function GameObtained(data) {
    arrayInfo = jQuery.parseJSON(data);
    gameObtainedArray = arrayInfo["Rows"];
    //console.log(gameObtainedArray);
}

function AllIcons(data) {
    arrayInfo = jQuery.parseJSON(data);
    allIconsArray = arrayInfo["Rows"];
    //console.log(allIconsArray);
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
}

function EvValues(data) {
    arrayInfo = jQuery.parseJSON(data);
    evValuesArray = arrayInfo["Rows"];
    //console.log(evValuesArray);
}

function DisplayOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    displayOptionsArray = arrayInfo["Rows"];
    //console.log(displayOptionsArray);
}

function EventOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    eventOptionsArray = arrayInfo["Rows"];
    //console.log(eventOptionsArray);
}

function GenderOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    genderOptionsArray = arrayInfo["Rows"];
    //console.log(genderOptionsArray);
}

function MiscOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    miscOptionsArray = arrayInfo["Rows"];
    //console.log(miscOptionsArray);
}

function ShinyOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    shinyOptionsArray = arrayInfo["Rows"];
    //console.log(shinyOptionsArray);
}

function MintOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    mintOptionsArray = arrayInfo["Rows"];
    //console.log(mintOptionsArray);
}

function StatusOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    statusOptionsArray = arrayInfo["Rows"];
    //console.log(statusOptionsArray);
}

function NoteOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    noteOptionsArray = arrayInfo["Rows"];
    //console.log(noteOptionsArray);
}

function ProofOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    proofOptionsArray = arrayInfo["Rows"];
    //console.log(proofOptionsArray);
}

function LanguagesOptions(data) {
    arrayInfo = jQuery.parseJSON(data);
    languageOptionsArray = arrayInfo["Rows"];
    //console.log(languageOptionsArray);
}