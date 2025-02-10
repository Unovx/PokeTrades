console.log(40 + 8 + 23 - 10);

const observer = lozad();
observer.observe();

document.querySelector(".SA-Searchbar").value = "";
var searchPokemonText = document.querySelector(".SA-Searchbar");
let selectionOrderDropdown1 = document.querySelector(".SA-OrderDropdown1");
let selectionOrderDropdown2 = document.querySelector(".SA-OrderDropdown2");
let selectionOffset = document.querySelector(".SA-Offset");
let selectionLimit = document.querySelector(".SA-Limit");
let reusableIvHPDropdown = document.querySelector(".SA-ReusableIvHPDropdown");
let reusableIvAttDropdown = document.querySelector(".SA-ReusableIvAttDropdown");
let reusableIvDefDropdown = document.querySelector(".SA-ReusableIvDefDropdown");
let reusableIvSpaDropdown = document.querySelector(".SA-ReusableIvSpaDropdown");
let reusableIvSpdDropdown = document.querySelector(".SA-ReusableIvSpdDropdown");
let reusableIvSpeDropdown = document.querySelector(".SA-ReusableIvSpeDropdown");
let reusableEvHPDropdown = document.querySelector(".SA-ReusableEvHPDropdown");
let reusableEvAttDropdown = document.querySelector(".SA-ReusableEvAttDropdown");
let reusableEvDefDropdown = document.querySelector(".SA-ReusableEvDefDropdown");
let reusableEvSpaDropdown = document.querySelector(".SA-ReusableEvSpaDropdown");
let reusableEvSpdDropdown = document.querySelector(".SA-ReusableEvSpdDropdown");
let reusableEvSpeDropdown = document.querySelector(".SA-ReusableEvSpeDropdown");
let reusableMove1Dropdown = document.querySelector(".SA-ReusableMove1Dropdown");
let reusableMove2Dropdown = document.querySelector(".SA-ReusableMove2Dropdown");
let reusableMove3Dropdown = document.querySelector(".SA-ReusableMove3Dropdown");
let reusableMove4Dropdown = document.querySelector(".SA-ReusableMove4Dropdown");
let reusableTransferMove1Dropdown = document.querySelector(".SA-ReusableTransferMove1Dropdown");
let reusableTransferMove2Dropdown = document.querySelector(".SA-ReusableTransferMove2Dropdown");
let reusableTransferMove3Dropdown = document.querySelector(".SA-ReusableTransferMove3Dropdown");
let reusableTransferMove4Dropdown = document.querySelector(".SA-ReusableTransferMove4Dropdown");
var previousSpace;
//The Image Displayed in the Viewing Area
var pokemonImage;
var bunchname = "";
//The Element that holds
var selectedPokemon;
var movingPokemon;
var moving = false;
var copying = false;
//The Number of Arrays used in for statements in other scripts for outlining
//var numberOfArrays;
//The Array data for Pokemon Generation (Not Bunch) used in  for statements for other scripts for outlining
var arrayData;

var numberOfBunches;

var currentlyRearranging = false;
var oldPosition = "";
var newPosition = "";

var limitWidth = 768;

var insideDetails = true;
var storedValue;

$(selectionOrderDropdown1).change(function () {
    ShowLoading();
    PostGenerateSelection();
});

//This is needed so I can get the visible height of elements.
$.fn.visibleHeight = function () {
    var elBottom, elTop, scrollBot, scrollTop, visibleBottom, visibleTop;
    scrollTop = $(window).scrollTop();
    scrollBot = scrollTop + $(window).height();
    elTop = this.offset().top;
    elBottom = elTop + this.outerHeight();
    visibleTop = elTop < scrollTop ? scrollTop : elTop;
    visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
    return visibleBottom - visibleTop
}

//Getting the visible heiht of the Selection Area.
var selectionVH = $("#SelectionArea").visibleHeight();
console.log(document.querySelector('#SelectionArea').clientWidth);
//console.log($(selection).visibleHeight());

/*document.querySelector('#DetailsArea').onmouseover = function () {
    if (!creationInProgress) {
        if (selectedPokemon == null && hoverInfo == true && !showingGiveaway) {
            $('.DA-Close').click();
        }
    }
}*/

//Making sure the Selection Area height is constantly updated.
$(function UpdateSelectionHeight() {
    setInterval(oneSecondFunction, 1);
});

function oneSecondFunction() {
    if (window.innerWidth <= 768) {
        if (document.querySelector('#FilterArea').style.display == "block") {
            //document.querySelector('#SelectionArea').style.height = "100%"
            document.querySelector('#SelectionArea').style.height = selectionVH - $("#FilterArea").visibleHeight() + "px";
        }
        else if (document.querySelector('#BunchArea').style.display == "block") {
            //document.querySelector('#SelectionArea').style.height = "100%"
            document.querySelector('#SelectionArea').style.height = selectionVH - $("#BunchArea").visibleHeight() + "px";
        }
        else if (document.querySelector('#DetailsArea').style.display == "block") {
            //document.querySelector('#SelectionArea').style.height = "100%"
            document.querySelector('#SelectionArea').style.height = selectionVH - $("#DetailsArea").visibleHeight() + "px";
        }
        else if (document.querySelector('#CTSArea').style.display == "block") {
            //document.querySelector('#SelectionArea').style.height = "100%"
            document.querySelector('#SelectionArea').style.height = selectionVH - $("#CTSArea").visibleHeight() + "px";
        }
        else if (document.querySelector('#ImportArea').style.display == "block") {
            //document.querySelector('#SelectionArea').style.height = "100%"
            document.querySelector('#SelectionArea').style.height = selectionVH - $("#ImportArea").visibleHeight() + "px";
        }
        else if (document.querySelector('#PanelArea').style.display == "block") {
            //document.querySelector('#SelectionArea').style.height = "100%"
            document.querySelector('#SelectionArea').style.height = selectionVH - $("#PanelArea").visibleHeight() + "px";
        } else {
            document.querySelector('#SelectionArea').style.height = "100%";
            //document.querySelector('#SelectionArea').style.height = $(selection).visibleHeight() - 1 + "px";
            //alert($(selection).visibleHeight())
        }
    } else {
        document.querySelector('#SelectionArea').style.height = "100%";
    }
}

$(".SA-Searchbar").keyup(function () {
    FilterResults();
});

$('.SA-MainMenu').click(function () {
    bunchname = "";
    //making the Selection Area bunch name invisible (can't turn it off or the space for it goes)
    document.querySelector(".SA-Bunch").style.opacity = "0%";
    selectedPokemon = null;
    pokemonDetails = null;
    //AssigningOutline();
    //Removing the GridContainer so a new one can be created later
    $("#GridContainer").remove();
    ResetFilters();
    CloseAll();
    document.querySelector("#MainArea").style.display = "block";
    document.querySelector(".DA-Place").style.display = "block";
    document.querySelector(".DA-Place").innerHTML = "Place";
    document.querySelector(".DA-Delete").style.display = "block";
    CreationReset();
    BunchReset();
    creationInProgress = false;
    placingPokemon = false;
    searchPokemonText.value = "";
    ctsSeaching = false;
    currentlyImporting = false;
    document.querySelector(".SA-CreateButton").style.display = "initial";
    document.querySelector(".SA-MoveButton").style.display = "initial";
    document.querySelector(".SA-CopyButton").style.display = "initial";
    document.querySelector(".SA-OrderDropdown1").style.pointerEvents = "initial";
    document.querySelector(".SA-Order1Circle").style.background = "#00ba06";
    document.querySelector(".SA-Order1Circle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-OrderDropdown1").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-OrderDropdown2").style.pointerEvents = "initial";
    document.querySelector(".SA-Order2Circle").style.background = "#00ba06";
    document.querySelector(".SA-Order2Circle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-OrderDropdown2").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-Offset").style.pointerEvents = "initial";
    document.querySelector(".SA-OffsetCircle").style.background = "#00ba06";
    document.querySelector(".SA-OffsetCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-Offset").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-Limit").style.pointerEvents = "initial";
    document.querySelector(".SA-LimitCircle").style.background = "#00ba06";
    document.querySelector(".SA-LimitCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-Limit").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-RefreshButton").style.pointerEvents = "initial";
    //document.querySelector(".SA-RefreshButton").style.backgroundColor = "#171d2c";
});

$('.SA-CreateButton').click(function () {
    //document.querySelector("#SelectionArea").style.width = "100%"
    document.querySelector("#FilterArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#InformationArea").style.display = "none";
    document.querySelector("#DetailsArea").style.display = "block";
    document.querySelector("#CommunicationArea").style.display = "none";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "none";
    document.querySelector(".SA-CreateCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-CreateCircle").style.boxShadow = "none";
    //document.querySelector(".SA-CreateButton").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-MoveButton").style.pointerEvents = "none";
    document.querySelector(".SA-MoveCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-MoveCircle").style.boxShadow = "none";
    //document.querySelector(".SA-MoveButton").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-CopyButton").style.pointerEvents = "none";
    document.querySelector(".SA-CopyCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-CopyCircle").style.boxShadow = "none";
    //document.querySelector(".SA-CopyButton").style.backgroundColor = "#1e1e1e";
    /*document.querySelector(".SA-OrderDropdown1").style.pointerEvents = "none";
    document.querySelector(".SA-Order1Circle").style.background = "#4e4e4e";
    document.querySelector(".SA-Order1Circle").style.boxShadow = "none";
    //document.querySelector(".SA-OrderDropdown1").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-OrderDropdown2").style.pointerEvents = "none";
    document.querySelector(".SA-Order2Circle").style.background = "#4e4e4e";
    document.querySelector(".SA-Order2Circle").style.boxShadow = "none";
    //document.querySelector(".SA-OrderDropdown2").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-Offset").style.pointerEvents = "none";
    document.querySelector(".SA-OffsetCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-OffsetCircle").style.boxShadow = "none";
    //document.querySelector(".SA-Offset").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-Limit").style.pointerEvents = "none";
    document.querySelector(".SA-LimitCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-LimitCircle").style.boxShadow = "none";
    //document.querySelector(".SA-Limit").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-RefreshButton").style.pointerEvents = "none";*/
    //document.querySelector(".SA-RefreshButton").style.backgroundColor = "#1e1e1e";
    document.querySelector(".DA-Place").style.display = "block";
    document.querySelector(".DA-PlaceInfo").style.display = "none";
    document.querySelector(".DA-Delete").style.display = "none";
    /*document.querySelector(".DA-Lock").style.pointerEvents = "none";
    document.querySelector(".DA-Lock").style.background = "#1e1e1e";
    detailsLocked = false;
    document.querySelector(".DA-Lock").innerHTML = "Lock";*/
    document.querySelector(".DA-DefaultView").style.pointerEvents = "initial";

    //So it doesn't add to an already existing row
    creationID = "";
    creationInProgress = true;
    CreationReset();
    selectedPokemon = null;
    pokemonDetails = null;
    document.querySelector(".DA-DefaultView").style.display = "block";
    while (document.querySelector("#DA-NestHolder").lastElementChild) {
        document.querySelector("#DA-NestHolder").removeChild(document.querySelector("#DA-NestHolder").lastElementChild);
    }

    templateSelection.value = "(No Template)";

    if (document.querySelector(".SA-Bunch").innerHTML != "All Pokemon") {
        bunchSelection.value = document.querySelector(".SA-Bunch").innerHTML;
    }

    //ShowPokemonDetails();
    ShowAllDropdowns();

    var cols = document.getElementsByClassName("Ribbons");
    document.querySelector(".DA-RibbonIcon").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Ribbons/(No Ribbon).png";
    for (i = 0; i < cols.length; i++) {
        cols[i].style.background = "linear-gradient(#302b75, #112354)";
        cols[i].style.display = "block";
    }
    ribbonData = new Array(103);
    ribbonString = "";

    var cols = document.getElementsByClassName("Marks");
    document.querySelector(".DA-MarkIcon").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Marks/(No Mark).png";
    for (i = 0; i < cols.length; i++) {
        cols[i].style.background = "linear-gradient(#302b75, #112354)";
        cols[i].style.display = "block";
    }
    markData = new Array(54);
    markString = "";


    if (toggleOn) {
        $('.DA-ToggleProof').click();
    }

    /*if (competitiveView) {
        document.querySelector(".DA-CompetitiveViewOptions").style.display = "block";
    } else {
        document.querySelector(".DA-CompetitiveViewOptions").style.display = "none";
    }*/

    UpdateEVs();
    SetStatColour();
    SetIVColours();
});

$('.SA-MoveButton').click(function () {
    if (currentlyRearranging == false) {
        moving = true;
        currentlyRearranging = true;
        document.querySelector(".SA-MoveText").innerHTML = "Cancel";
        //OpacityHalf();
        MoveStarted();
    } else {
        moving = false;
        currentlyRearranging = false;
        AssigningOutline();
        if (movingPokemon == selectedPokemon && movingPokemon != null) {
            movingPokemon.style.opacity = "1px";
        } else if (movingPokemon != null) {
            movingPokemon.style.opacity = "1px";
        }
        movingPokemon = null;
        oldPosition = "";
        newPosition = "";
        document.querySelector(".SA-MoveText").innerHTML = "Move";
        //OpacityFull();
        //RemoveBunchOutline();
        MoveFinished();
    }

});

$('.SA-CopyButton').click(function () {
    if (currentlyRearranging == false) {
        currentlyRearranging = true;
        copying = true;
        document.querySelector(".SA-CopyText").innerHTML = "Cancel";
        //OpacityHalf();
        CopyStarted();
    } else {
        copying = false;
        currentlyRearranging = false;
        AssigningOutline();
        if (movingPokemon == selectedPokemon && movingPokemon != null) {
            movingPokemon.style.opacity = "1px";
        } else if (movingPokemon != null) {
            movingPokemon.style.opacity = "1px";
        }
        movingPokemon = null;
        oldPosition = "";
        newPosition = "";
        document.querySelector(".SA-CopyText").innerHTML = "Copy";
        //OpacityFull();
        //RemoveBunchOutline();
        CopyFinished();
    }

});

$('.SA-FiltersButton').click(function () {
    //$.post(url + "/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
    //document.querySelector("#SelectionArea").style.width = "100%";
    document.querySelector("#FilterArea").style.display = "block";
    document.querySelector("#DetailsArea").style.display = "none";
    document.querySelector("#BunchArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#CTSArea").style.display = "none";
    document.querySelector("#CommunicationArea").style.display = "none";
});

$('.SA-RefreshButton').click(function () {
    ShowLoading();
    if (!ctsSeaching) {
        PostGenerateSelection();
    } else {
        $.post(url + "/PHP/cts_search.php", { offset: selectionOffset.value, limit: selectionLimit.value, pokemon: ctsPokemonDropdown.value, lang: ctsLangArray, ball: ctsBallArray, gender: ctsGenderOption, shiny: ctsShinyOption, mint: ctsMintOption, misc: ctsMiscArray, mark: ctsMarkArray, ribbons: ctsRibbonArray, nickname: ctsNicknameDropdown.value, ability: ctsAbilityDropdown.value, nature: ctsNatureDropdown.value, gen6: cstGen6, gen7: cstGen7, gen8: cstGen8, home: cstHome, gameObtained: ctsGameObtainedDropdown.value, howObtained: ctsHowObtainedDropdown.value, formEvos: ctsFormEvos, forms: ctsForms, formOption: ctsFormDropdown.value, evos: ctsEvos, evoOption: ctsEvoDropdown.value, OT: ctsOT.value, ID: ctsID.value, status: ctsStatusDropdown.value, event: ctsEventDropdown.value, ivhp: ctsIvHP.value, ivatt: ctsIvAtt.value, ivdef: ctsIvDef.value, ivspa: ctsIvSpa.value, ivspd: ctsIvSpd.value, ivspe: ctsIvSpe.value, evhp: ctsEvHP.value, evatt: ctsEvAtt.value, evdef: ctsEvDef.value, evspa: ctsEvSpa.value, evspd: ctsEvSpd.value, evspe: ctsEvSpe.value, move1: ctsMove1Dropdown.value, move2: ctsMove2Dropdown.value, move3: ctsMove3Dropdown.value, move4: ctsMove4Dropdown.value, proof: ctsProofDropdown.value, note: ctsNoteDropdown.value }, GenerateSelection);
    }
});

function AssigningOutline() {
    //Makes sure arrayData isn't null so an error doesn't get brought up in specific cases like on the bunch area
    if (arrayData != null) {
        for (let i = 0; i < arrayData["Rows"].length; i++) {
            if (currentlyRearranging == true && movingPokemon == document.getElementById("GenerationGridDiv" + (i))) {

            }
            //if no pokemon is selected, then no pokemon need an outline
            else if (selectedPokemon == null) {
                document.getElementById("GenerationGridDiv" + (i)).style.opacity = "1";
                /*.boxShadow = "rgb(0 0 0) 5px 5px 0px 1px";
                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#343f5f";
                var cols = document.getElementsByClassName("insideDetails" + (i));
                document.getElementById("GenerationGridDiv" + (i)).style.height = "100px";*/
            }
            //If it finds a generated row that has the same creation id as the current viewing id, it gives that div a outline
            else if (arrayData["Rows"][i].creation_id == pokemonDetails.creation_id && currentlyRearranging) {
                document.getElementById("GenerationGridDiv" + (i)).style.opacity = "0.5";
                /*selectedPokemon = document.getElementById("GenerationGridDiv" + (i));
                document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "rgb(0 0 0) 5px 5px 0px 1px";
                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#353d54";
                if (expandView) {
                    var cols = document.getElementsByClassName("insideDetails" + (i));
                    for (j = 0; j < cols.length; j++) {
                        cols[j].style.display = "flex";
                    }
                    document.getElementById("GenerationGridDiv" + (i)).style.height = "200px";
                }*/
            } else {
                document.getElementById("GenerationGridDiv" + (i)).style.opacity = "1";
                /*document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "rgb(0 0 0) 5px 5px 0px 1px";
                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#343f5f";
                document.getElementById("GenerationGridDiv" + (i)).style.height = "100px";*/
            }
        }
    }
}

function MoveStarted() {
    moving = true;
    document.querySelector(".SA-MainMenu").style.pointerEvents = "none";
    document.querySelector(".SA-MainMenuCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-MainMenuCircle").style.boxShadow = "none";
    //document.querySelector(".SA-MainMenu").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-CopyButton").style.pointerEvents = "none";
    document.querySelector(".SA-CopyCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-CopyCircle").style.boxShadow = "none";
    //document.querySelector(".SA-CopyButton").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "none";
    document.querySelector(".SA-CreateCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-CreateCircle").style.boxShadow = "none";
    //document.querySelector(".SA-CreateButton").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-FiltersButton").style.pointerEvents = "none";
    document.querySelector(".SA-FilterCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-FilterCircle").style.boxShadow = "none";
    //document.querySelector(".SA-FiltersButton").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-Searchbar").disabled = true;
    document.querySelector(".SA-OrderDropdown1").style.pointerEvents = "none";
    document.querySelector(".SA-Order1Circle").style.background = "#4e4e4e";
    document.querySelector(".SA-Order1Circle").style.boxShadow = "none";
    //document.querySelector(".SA-OrderDropdown1").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-OrderDropdown2").style.pointerEvents = "none";
    document.querySelector(".SA-Order2Circle").style.background = "#4e4e4e";
    document.querySelector(".SA-Order2Circle").style.boxShadow = "none";
    //document.querySelector(".SA-OrderDropdown2").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-Offset").style.pointerEvents = "none";
    document.querySelector(".SA-OffsetCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-OffsetCircle").style.boxShadow = "none";
    //document.querySelector(".SA-Offset").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-Limit").style.pointerEvents = "none";
    document.querySelector(".SA-LimitCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-LimitCircle").style.boxShadow = "none";
    //document.querySelector(".SA-Limit").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-RefreshButton").style.pointerEvents = "none";
    //document.querySelector(".SA-RefreshButton").style.backgroundColor = "#1e1e1e";
    document.querySelector(".PA-Searchbar").disabled = true;
    document.querySelector("#PanelArea").style.pointerEvents = "none";
    document.querySelector(".MA-TopRow").style.pointerEvents = "none";
}

function MoveFinished() {
    moving = false;
    document.querySelector(".SA-MainMenu").style.pointerEvents = "initial";
    document.querySelector(".SA-MainMenuCircle").style.background = "#00ba06";
    document.querySelector(".SA-MainMenuCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-MainMenu").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-CopyButton").style.pointerEvents = "initial";
    document.querySelector(".SA-CopyCircle").style.background = "#00ba06";
    document.querySelector(".SA-CopyCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-CopyButton").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "initial";
    document.querySelector(".SA-CreateCircle").style.background = "#00ba06";
    document.querySelector(".SA-CreateCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-CreateButton").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-FiltersButton").style.pointerEvents = "initial";
    document.querySelector(".SA-FilterCircle").style.background = "#00ba06";
    document.querySelector(".SA-FilterCircle").style.boxShadow = "0px 0px 8px #00ff07";
    /*if (filtersApplied) {
        document.querySelector(".SA-FiltersButton").style.backgroundColor = "#005c2c";
    } else {
        document.querySelector(".SA-FiltersButton").style.backgroundColor = "#171d2c";
    }*/
    document.querySelector(".SA-OrderDropdown1").style.pointerEvents = "initial";
    document.querySelector(".SA-Order1Circle").style.background = "#00ba06";
    document.querySelector(".SA-Order1Circle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-OrderDropdown1").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-OrderDropdown2").style.pointerEvents = "initial";
    document.querySelector(".SA-Order2Circle").style.background = "#00ba06";
    document.querySelector(".SA-Order2Circle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-OrderDropdown2").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-Offset").style.pointerEvents = "initial";
    document.querySelector(".SA-OffsetCircle").style.background = "#00ba06";
    document.querySelector(".SA-OffsetCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-Offset").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-Limit").style.pointerEvents = "initial";
    document.querySelector(".SA-LimitCircle").style.background = "#00ba06";
    document.querySelector(".SA-LimitCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-Limit").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-RefreshButton").style.pointerEvents = "initial";
    //document.querySelector(".SA-RefreshButton").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-Searchbar").disabled = false;
    document.querySelector("#GeneratedSelection").style.pointerEvents = "initial";
    document.querySelector(".PA-Searchbar").disabled = false;
    document.querySelector("#PanelArea").style.pointerEvents = "initial";
    document.querySelector(".MA-TopRow").style.pointerEvents = "initial";
    //OpacityFull();
}

function CopyStarted() {
    copying = true;
    document.querySelector(".SA-MainMenu").style.pointerEvents = "none";
    document.querySelector(".SA-MainMenuCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-MainMenuCircle").style.boxShadow = "none";
    //document.querySelector(".SA-MainMenu").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-MoveButton").style.pointerEvents = "none";
    document.querySelector(".SA-MoveCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-MoveCircle").style.boxShadow = "none";
    //document.querySelector(".SA-MoveButton").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "none";
    document.querySelector(".SA-CreateCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-CreateCircle").style.boxShadow = "none";
    //document.querySelector(".SA-CreateButton").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-FiltersButton").style.pointerEvents = "none";
    document.querySelector(".SA-FilterCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-FilterCircle").style.boxShadow = "none";
    //document.querySelector(".SA-FiltersButton").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-Searchbar").disabled = true;
    document.querySelector(".SA-OrderDropdown1").style.pointerEvents = "none";
    document.querySelector(".SA-Order1Circle").style.background = "#4e4e4e";
    document.querySelector(".SA-Order1Circle").style.boxShadow = "none";
    //document.querySelector(".SA-OrderDropdown1").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-OrderDropdown2").style.pointerEvents = "none";
    document.querySelector(".SA-Order2Circle").style.background = "#4e4e4e";
    document.querySelector(".SA-Order2Circle").style.boxShadow = "none";
    //document.querySelector(".SA-OrderDropdown2").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-Offset").style.pointerEvents = "none";
    document.querySelector(".SA-OffsetCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-OffsetCircle").style.boxShadow = "none";
    //document.querySelector(".SA-Offset").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-Limit").style.pointerEvents = "none";
    document.querySelector(".SA-LimitCircle").style.background = "#4e4e4e";
    document.querySelector(".SA-LimitCircle").style.boxShadow = "none";
    //document.querySelector(".SA-Limit").style.backgroundColor = "#1e1e1e";
    document.querySelector(".SA-RefreshButton").style.pointerEvents = "none";
    //document.querySelector(".SA-RefreshButton").style.backgroundColor = "#1e1e1e";
    document.querySelector(".PA-Searchbar").disabled = true;
    document.querySelector("#PanelArea").style.pointerEvents = "none";
    document.querySelector(".MA-TopRow").style.pointerEvents = "none";
}

function CopyFinished() {
    copying = false;
    document.querySelector(".SA-MainMenu").style.pointerEvents = "initial";
    document.querySelector(".SA-MainMenuCircle").style.background = "#00ba06";
    document.querySelector(".SA-MainMenuCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-MainMenu").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-MoveButton").style.pointerEvents = "initial";
    document.querySelector(".SA-MoveCircle").style.background = "#00ba06";
    document.querySelector(".SA-MoveCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-MoveButton").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "initial";
    document.querySelector(".SA-CreateCircle").style.background = "#00ba06";
    document.querySelector(".SA-CreateCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-CreateButton").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-FiltersButton").style.pointerEvents = "initial";
    document.querySelector(".SA-FilterCircle").style.background = "#00ba06";
    document.querySelector(".SA-FilterCircle").style.boxShadow = "0px 0px 8px #00ff07";
    /*if (filtersApplied) {
        document.querySelector(".SA-FiltersButton").style.backgroundColor = "#005c2c";
    } else {
        document.querySelector(".SA-FiltersButton").style.backgroundColor = "#171d2c";
    }*/
    document.querySelector(".SA-OrderDropdown1").style.pointerEvents = "initial";
    document.querySelector(".SA-Order1Circle").style.background = "#00ba06";
    document.querySelector(".SA-Order1Circle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-OrderDropdown1").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-OrderDropdown2").style.pointerEvents = "initial";
    document.querySelector(".SA-Order2Circle").style.background = "#00ba06";
    document.querySelector(".SA-Order2Circle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-OrderDropdown2").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-Offset").style.pointerEvents = "initial";
    document.querySelector(".SA-OffsetCircle").style.background = "#00ba06";
    document.querySelector(".SA-OffsetCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-Offset").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-Limit").style.pointerEvents = "initial";
    document.querySelector(".SA-LimitCircle").style.background = "#00ba06";
    document.querySelector(".SA-LimitCircle").style.boxShadow = "0px 0px 8px #00ff07";
    //document.querySelector(".SA-Limit").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-RefreshButton").style.pointerEvents = "initial";
    //document.querySelector(".SA-RefreshButton").style.backgroundColor = "#171d2c";
    document.querySelector(".SA-Searchbar").disabled = false;
    //document.querySelector("#GeneratedSelection").style.pointerEvents = "initial";
    document.querySelector(".PA-Searchbar").disabled = false;
    document.querySelector("#PanelArea").style.pointerEvents = "initial";
    document.querySelector(".MA-TopRow").style.pointerEvents = "initial";
}

//Setting Opacity to half to show that moving is in progress.
function OpacityHalf() {
    for (let i = 0; i < arrayData["Rows"].length; i++) {
        document.getElementById("GenerationGridDiv" + (i)).style.opacity = "50%";
    }

    for (let i = 0; i < ftBunches; i++) {
        document.querySelector(".ForTradeGridDiv" + (i)).style.opacity = "50%";
    }

    for (let i = 0; i < lfBunches; i++) {
        document.querySelector(".LookingForGridDiv" + (i)).style.opacity = "50%";
    }
}
//Setting Opacity to normal to show that moving is done.
function OpacityFull() {
    for (let i = 0; i < arrayData["Rows"].length; i++) {
        document.getElementById("GenerationGridDiv" + (i)).style.opacity = "100%";
    }

    for (let i = 0; i < ftBunches; i++) {
        document.querySelector(".ForTradeGridDiv" + (i)).style.opacity = "100%";
    }

    for (let i = 0; i < lfBunches; i++) {
        document.querySelector(".LookingForGridDiv" + (i)).style.opacity = "100%";
    }
}

function GenerateSelection(data) {
    numberOfBunches = null;
    if (bunchname != "" && !ctsSeaching) {
        //Showing the bunch name and setting up the ability to exit out the bunch.
        document.querySelector(".SA-Bunch").style.opacity = "100%";
    }

    //Using Jquery to parse the data and getting the length.
    arrayData = jQuery.parseJSON(data);

    //Removing the grid container so I can create a new one and making it a child of GeneratedSelection.
    $("#GridContainer").remove();
    gridTest = document.createElement("div");
    gridTest.setAttribute("id", "GridContainer");
    gridTest.style.gridTemplateColumns = "repeat( auto-fill, minmax(230px, 1fr) )";
    gridTest.style.marginTop = "5px";
    document.getElementById("GeneratedSelection").appendChild(gridTest);
    $("#DA-NestHolder").remove();

    if (arrayData["Rows"] == null) {
        HideLoading();
        return;
    }

    if (ctsSeaching) {
        console.log(arrayData["Rows"].length + " Pokemon in CTS Search");
    } else {
        console.log(arrayData["Rows"].length + " Pokemon in " + bunchname);
    }

    arrayData["Rows"] = arrayData["Rows"].sort(SortBy2);
    arrayData["Rows"] = arrayData["Rows"].sort(SortBy);

    console.log(arrayData["Rows"]);

    for (let i = 0; i < arrayData["Rows"].length; i++) {

        //Creating newDivs for each pokemon and making them children of the GridContainer
        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "GenerationGridDiv" + (i));
        newDiv.setAttribute("class", "Lozad");
        newDiv.classList.add("SA-PokemonDiv");
        //newDiv.className += "Lozad";
        document.getElementById("GridContainer").appendChild(newDiv);
        newDiv.style.width = "240px";
        newDiv.style.height = "250px";

        frontSide = document.createElement("div");
        frontSide.setAttribute("id", "FrontSide " + (i));
        newDiv.appendChild(frontSide);

        if (insideDetails) {
            //document.getElementById("GenerationGridDiv" + (i)).style.height = "200px";
        }

        /*document.getElementById("GenerationGridDiv" + (i)).style.overflow = "hidden";
        document.getElementById("GenerationGridDiv" + (i)).style.display = "flex";
        document.getElementById("GenerationGridDiv" + (i)).style.position = "relative";
        document.getElementById("GenerationGridDiv" + (i)).style.cursor = "pointer";*/
        /*document.getElementById("GenerationGridDiv" + (i)).style.backgroundImage = "url('https://poketrades.org/Resources/Designs/Unselected Holder.png')";
        document.getElementById("GenerationGridDiv" + (i)).style.backgroundSize = "contain";*/
        /*document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "rgb(0 0 0) 5px 5px 0px 1px";
        document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#343f5f";
        document.getElementById("GenerationGridDiv" + (i)).style.borderTopLeftRadius = "15px";
        document.getElementById("GenerationGridDiv" + (i)).style.borderTopRightRadius = "15px";
        document.getElementById("GenerationGridDiv" + (i)).style.borderBottomLeftRadius = "15px";
        document.getElementById("GenerationGridDiv" + (i)).style.borderBottomRightRadius = "15px";*/

        //Storing each pokemon in a array.
        loopArray = [];
        loopArray = arrayData["Rows"][i];
        var index;

        for (let j = 0; j < pokemonDataArray.length; j++) {
            if (loopArray.pokemon == "Meowstic") {
                for (let k = 0; k < pokemonDataArray.length; k++) {
                    if (loopArray.pokemon + "-" + loopArray.gender == pokemonDataArray[k].pokemon) {
                        index = k;
                    }
                }
            }

            if (loopArray.pokemon == "Indeedee") {
                for (let k = 0; k < pokemonDataArray.length; k++) {
                    if (loopArray.pokemon + "-" + loopArray.gender == pokemonDataArray[k].pokemon) {
                        index = k;
                    }
                }
            }

            if (loopArray.pokemon == "Basculegion") {
                for (let k = 0; k < pokemonDataArray.length; k++) {
                    if (loopArray.pokemon + "-" + loopArray.gender == pokemonDataArray[k].pokemon) {
                        index = k;
                    }
                }
            }

            if (loopArray.pokemon == "Oinkologne") {
                for (let k = 0; k < pokemonDataArray.length; k++) {
                    if (loopArray.pokemon + "-" + loopArray.gender == pokemonDataArray[k].pokemon) {
                        index = k;
                    }
                }
            }

            if (loopArray.pokemon == pokemonDataArray[j].pokemon) {
                index = j;
            }
        }

        var dataPokemon = null;

        type1 = document.createElement("IMG");
        type1.setAttribute("class", "TypeDisplay");
        type1.style.verticalAlign = "middle";
        //type1.style.marginTop = "5px";
        type1.style.marginLeft = "5px";
        type1.style.marginRight = "2px";
        type1.setAttribute("width", "13px");
        type1.setAttribute("height", "13px");
        type1.setAttribute("src", url + "/Resources/Misc/HP " + pokemonDataArray[index].type_1 + ".png");


        frontSide.appendChild(type1);

        newDiv.classList.add("SA-" + pokemonDataArray[index].type_1 + "Holder");

        if (pokemonDataArray[index].type_2 != null) {
            type2 = document.createElement("IMG");
            type2.setAttribute("class", "TypeDisplay");
            type2.style.verticalAlign = "middle";
            //type2.style.marginTop = "5px";
            type2.setAttribute("width", "13px");
            type2.setAttribute("height", "13px");
            type2.setAttribute("src", url + "/Resources/Misc/HP " + pokemonDataArray[index].type_2 + ".png");
            frontSide.appendChild(type2);
        }

        pokemon = document.createElement("Text");


        pokemon.setAttribute("height", "auto");
        pokemon.setAttribute("id", "Pokemon" + (i));
        pokemon.style.height = "13px";

        pokemon.innerHTML = loopArray.pokemon;

        pokemon.style.fontWeight = "bold";
        pokemon.style.color = "white";
        pokemon.style.fontFamily = "'Orbitron', sans-serif";
        pokemon.style.fontSize = "10.2px";
        pokemon.style.display = "inline-flex";
        pokemon.style.marginLeft = "5px";
        pokemon.style.marginTop = "4px";

        frontSide.appendChild(pokemon);

        dexLangDiv = document.createElement("div");

        dexLangDiv.style.position = "absolute";
        dexLangDiv.style.zIndex = "1";
        dexLangDiv.style.top = "17px";
        dexLangDiv.style.left = "5px";
        dexLangDiv.style.display = "flex";

        frontSide.appendChild(dexLangDiv);

        dex = document.createElement("Text");
        dex.setAttribute("id", "Dex" + (i));
        dex.style.height = "13px";
        dex.innerHTML = "#" + pokemonDataArray[index].pokedex;
        dex.style.fontWeight = "bold";
        dex.style.color = "white";
        dex.style.fontFamily = "'Orbitron', sans-serif";
        dex.style.fontSize = "10.2px";

        dexLangDiv.appendChild(dex);

        language = document.createElement("Text");
        language.setAttribute("id", "language" + (i));
        language.style.height = "13px";
        language.innerHTML = "[" + loopArray.language + "]";
        language.style.marginLeft = "5px";
        language.style.fontWeight = "bold";
        language.style.color = "white";
        language.style.fontFamily = "'Orbitron', sans-serif";
        language.style.fontSize = "10.2px";

        dexLangDiv.appendChild(language);

        if (loopArray.level != null) {
            level = document.createElement("Text");
            level.setAttribute("id", "level" + (i));
            level.style.height = "13px";
            level.innerHTML = "Lv " + loopArray.level;
            level.style.fontWeight = "bold";
            level.style.color = "#ececec";
            level.style.fontFamily = "'Orbitron', sans-serif";
            level.style.fontSize = "10.2px";
            level.style.zIndex = 1;
            level.style.position = "absolute";
            level.style.top = "117px";
            level.style.left = "2px";
            level.style.display = "flex";

            frontSide.appendChild(level);
        }

        //Setting the Image
        theImage = document.createElement("IMG");
        theImage.setAttribute("id", "GeneratedSelection " + (i));
        theImage.setAttribute("width", "100");
        theImage.setAttribute("height", "100");
        theImage.style.position = "absolute";
        theImage.style.top = "20px";
        theImage.style.cursor = "pointer";
        newDiv.appendChild(theImage);

        theImage.onclick = function () {
            IAPokemonDropdown.value = arrayData["Rows"][i].pokemon;
            if (arrayData["Rows"][i].shiny.includes("Normal")) {
                shinyStatus = "";
                document.querySelector(".IA-ShinySprite").setAttribute("src", url + "/Resources/Designs/Not Shiny Icon.png");
            } else {
                shinyStatus = "-Shiny";
                document.querySelector(".IA-ShinySprite").setAttribute("src", url + "/Resources/Designs/Shiny Icon.png");
            }
            $('.IA-PokemonDropdown').change();
            document.querySelector("#InformationArea").style.display = "block";
            document.querySelector("#DetailsArea").style.display = "none";
            document.querySelector("#PanelArea").style.display = "none";
        }

        newTable = document.createElement("table");
        newTable.style.position = "absolute";
        newTable.style.zIndex = "1";
        newTable.style.top = "16px";
        //newDiv.style.width = "100%";
        newTable.style.left = "115px";
        newTable.style.height = "90px";
        newTable.style.width = "130px";

        newDiv.appendChild(newTable);


        var tr = newTable.insertRow();
        tr.style.display = "table-row";
        tr.style.height = "20px";
        var td = tr.insertCell();
        nickname = document.createElement("Text");
        td.setAttribute("height", "13px");
        nickname.setAttribute("height", "13px");
        nickname.innerHTML = loopArray.nickname;
        nickname.style.fontWeight = "bold";
        nickname.style.color = "white";
        nickname.style.fontFamily = "'Orbitron', sans-serif";
        nickname.style.fontSize = "10.2px";

        td.appendChild(nickname);

        var tr = newTable.insertRow();
        newTable.bottom = "unset";
        tr.style.display = "flex";
        tr.style.marginBottom = "2px";

        var td = tr.insertCell();
        ball = document.createElement("IMG");
        td.setAttribute("width", "15px");
        td.setAttribute("height", "15px");
        td.style.marginRight = "0.5px";
        ball.setAttribute("width", "15px");
        ball.setAttribute("height", "15px");
        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/" + loopArray.pokeball + ".png");

        td.appendChild(ball);

        var td = tr.insertCell();
        gender = document.createElement("IMG");
        td.setAttribute("width", "15px");
        td.setAttribute("height", "15px");
        td.style.marginRight = "0.5px";
        gender.setAttribute("width", "15px");
        gender.setAttribute("height", "15px");
        gender.setAttribute("src", url + "/Resources/Misc/" + loopArray.gender + ".png");

        td.appendChild(gender);

        var td = tr.insertCell();
        shiny = document.createElement("IMG");
        td.setAttribute("width", "15px");
        td.setAttribute("height", "15px");
        td.style.marginRight = "0.5px";
        shiny.setAttribute("width", "15px");
        shiny.setAttribute("height", "15px");
        shiny.setAttribute("src", url + "/Resources/Misc/" + loopArray.shiny + ".png");

        if ((loopArray.shiny == "Normal" || loopArray.shiny == "(Any Shiny or Normal)") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            shiny.style.opacity = "0.5";
        }

        td.appendChild(shiny);

        var td = tr.insertCell();
        mint = document.createElement("IMG");
        td.setAttribute("width", "15px");
        td.setAttribute("height", "15px");
        td.style.marginRight = "0.5px";
        mint.setAttribute("width", "15px");
        mint.setAttribute("height", "15px");
        mint.setAttribute("src", url + "/Resources/Misc/" + loopArray.mint + ".png");


        if ((loopArray.mint == "Not Minted" || loopArray.mint == "(Any or No Mint)") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            mint.style.opacity = "0.5";
        }

        td.appendChild(mint);

        var td = tr.insertCell();
        misc = document.createElement("IMG");
        td.setAttribute("width", "15px");
        td.setAttribute("height", "15px");
        td.style.marginRight = "0.5px";
        misc.setAttribute("width", "15px");
        misc.setAttribute("height", "15px");
        misc.setAttribute("src", url + "/Resources/Misc/" + loopArray.misc + ".png");


        if ((loopArray.misc == "(No Misc)") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            misc.style.opacity = "0.5";
        }

        td.appendChild(misc);

        /*var td = tr.insertCell();
        mark = document.createElement("IMG");
        td.setAttribute("width", "15px");
        td.setAttribute("height", "15px");
        td.style.marginRight = "0.5px";
        mark.setAttribute("width", "15px");
        mark.setAttribute("height", "15px");
        mark.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Marks/" + loopArray.mark + ".png");


        if ((loopArray.mark == "(No Mark)" || loopArray.mark == "(Any or No Mark") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            mark.style.opacity = "0.5";
        }

        td.appendChild(mark);*/

        var td = tr.insertCell();
        marks = document.createElement("IMG");
        marks.setAttribute("id", "Marks " + i);
        td.setAttribute("width", "15px");
        td.setAttribute("height", "15px");
        td.style.marginRight = "0.5px";
        marks.setAttribute("width", "15px");
        marks.setAttribute("height", "15px");
        if (loopArray.mark != "(No Mark)" && loopArray.mark != "(Any or No Marks") {
            marks.style.cursor = "pointer";
        }


        if ((loopArray.mark == "(No Mark)" || loopArray.mark == "(Any or No Marks") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            marks.style.opacity = "0.5";
        }

        var arrayTempMarks = loopArray.mark.split(",");
        if (loopArray.mark == "(No Mark)") {
            marks.setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Marks/(No Mark).png");
        } else {
            for (let j = 0; j < allMarksArray.length; j++) {
                for (let k = 0; k < arrayTempMarks.length; k++) {
                    if (allMarksArray[j] == arrayTempMarks[k]) {
                        marks.setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Marks/" + allMarksArray[j] + ".png");
                        break;
                    }
                }
            }
        }

        td.appendChild(marks);

        markDisplay = document.createElement("div");
        markDisplay.setAttribute("id", "MarkDisplay " + i);
        markDisplay.style.width = "-webkit-fill-available";
        markDisplay.style.width = "-moz-available";
        markDisplay.style.display = "none";
        markDisplay.style.gridTemplateColumns = "repeat(auto-fit, minmax(60px, 1fr)";
        markDisplay.style.margin = "4px";
        markDisplay.style.position = "absolute";
        markDisplay.style.background = "linear-gradient(#302b75, #112354)";
        markDisplay.style.zIndex = "2";
        markDisplay.style.top = "55px";
        for (let j = 0; j < allMarksArray.length; j++) {
            for (let k = 0; k < arrayTempMarks.length; k++) {
                if (allMarksArray[j] == arrayTempMarks[k]) {
                    markDiv = document.createElement("div");
                    markDiv.style.textAlign = "center";
                    markDiv.style.borderStyle = "solid";
                    markDisplay.appendChild(markDiv);
                    newMark = document.createElement("img");
                    newMark.style.width = "20px";
                    newMark.style.height = "20px";
                    newMark.setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Marks/" + allMarksArray[j] + ".png");
                    markDiv.appendChild(newMark);
                    theText = document.createElement("text");
                    theText.style.display = "block";
                    theText.style.fontWeight = "bold";
                    theText.style.color = "white";
                    theText.style.fontFamily = "'Orbitron', sans-serif";
                    theText.style.fontSize = "8px";
                    theText.style.marginBottom = "4px";
                    if (allMarksArray[j].includes("No Mark")) {
                        theText.innerHTML = allMarksArray[j];
                        markDiv.appendChild(theText);
                    } else {
                        theText.innerHTML = allMarksArray[j].replace("Mark", '');
                        markDiv.appendChild(theText);
                    }
                }
            }
        }

        frontSide.appendChild(markDisplay);

        document.getElementById("Marks " + i).onclick = function () {
            if (document.getElementById("MarkDisplay " + i).style.display == "none") {
                document.getElementById("MarkDisplay " + i).style.display = "grid";
            } else {
                document.getElementById("MarkDisplay " + i).style.display = "none";
            }
        }

        var td = tr.insertCell();
        ribbons = document.createElement("IMG");
        ribbons.setAttribute("id", "Ribbons " + i);
        td.setAttribute("width", "15px");
        td.setAttribute("height", "15px");
        td.style.marginRight = "0.5px";
        ribbons.setAttribute("width", "15px");
        ribbons.setAttribute("height", "15px");
        if (loopArray.ribbons != "(No Ribbon)" && loopArray.ribbons != "(Any or No Ribbons") {
            ribbons.style.cursor = "pointer";
        }


        if ((loopArray.ribbons == "(No Ribbon)" || loopArray.ribbons == "(Any or No Ribbons") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            ribbons.style.opacity = "0.5";
        }

        var arrayTempRibbons = loopArray.ribbons.split(",");
        if (loopArray.ribbons == "(No Ribbon)") {
            ribbons.setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Ribbons/(No Ribbon).png");
        } else {
            for (let j = 0; j < ribbonOptionsArray.length; j++) {
                for (let k = 0; k < arrayTempRibbons.length; k++) {
                    if (ribbonOptionsArray[j] == arrayTempRibbons[k]) {
                        ribbons.setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Ribbons/" + ribbonOptionsArray[j] + ".png");
                        break;
                    }
                }
            }
        }

        td.appendChild(ribbons);

        ribbonDisplay = document.createElement("div");
        ribbonDisplay.setAttribute("id", "RibbonDisplay " + i);
        ribbonDisplay.style.width = "-webkit-fill-available";
        ribbonDisplay.style.width = "-moz-available";
        ribbonDisplay.style.display = "none";
        ribbonDisplay.style.gridTemplateColumns = "repeat(auto-fit, minmax(60px, 1fr)";
        ribbonDisplay.style.margin = "4px";
        ribbonDisplay.style.position = "absolute";
        ribbonDisplay.style.background = "linear-gradient(#302b75, #112354)";
        ribbonDisplay.style.zIndex = "2";
        ribbonDisplay.style.top = "55px";
        for (let j = 0; j < ribbonOptionsArray.length; j++) {
            for (let k = 0; k < arrayTempRibbons.length; k++) {
                if (ribbonOptionsArray[j] == arrayTempRibbons[k]) {
                    ribbonDiv = document.createElement("div");
                    ribbonDiv.style.textAlign = "center";
                    ribbonDiv.style.borderStyle = "solid";
                    ribbonDisplay.appendChild(ribbonDiv);
                    newRibbon = document.createElement("img");
                    newRibbon.style.width = "20px";
                    newRibbon.style.height = "20px";
                    newRibbon.setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Ribbons/" + ribbonOptionsArray[j] + ".png");
                    ribbonDiv.appendChild(newRibbon);
                    theText = document.createElement("text");
                    theText.style.display = "block";
                    theText.style.fontWeight = "bold";
                    theText.style.color = "white";
                    theText.style.fontFamily = "'Orbitron', sans-serif";
                    theText.style.fontSize = "8px";
                    theText.style.marginBottom = "4px";
                    if (ribbonOptionsArray[j].includes("No Ribbon")) {
                        theText.innerHTML = ribbonOptionsArray[j];
                        ribbonDiv.appendChild(theText);
                    } else {
                        theText.innerHTML = ribbonOptionsArray[j].replace("Ribbon", '');
                        ribbonDiv.appendChild(theText);
                    }
                }
            }
        }

        frontSide.appendChild(ribbonDisplay);

        document.getElementById("Ribbons " + i).onclick = function () {
            if (document.getElementById("RibbonDisplay " + i).style.display == "none") {
                document.getElementById("RibbonDisplay " + i).style.display = "grid";
            } else {
                document.getElementById("RibbonDisplay " + i).style.display = "none";
            }
        }

        frontSide.appendChild(newTable);


        var tr = newTable.insertRow();
        tr.style.display = "table-row";
        var td = tr.insertCell();
        ability = document.createElement("Text");
        td.setAttribute("height", "13px");
        ability.setAttribute("height", "13px");
        ability.style.fontWeight = "bold";
        ability.style.color = "white";
        ability.style.fontFamily = "'Orbitron', sans-serif";

        ability.style.fontSize = "10.2px";

        if (loopArray.ability == pokemonDataArray[index].hidden_ability_1 || loopArray.ability == pokemonDataArray[index].hidden_ability_2) {
            ability.innerHTML = loopArray.ability + " (H)";
            td.appendChild(ability);
        }
        if (loopArray.ability == pokemonDataArray[index].old_ability_1) {
            ability.innerHTML = loopArray.ability + " (O)";
            td.appendChild(ability);
        }
        if (loopArray.ability == pokemonDataArray[index].old_hidden_ability_1) {
            ability.innerHTML = loopArray.ability + " (OH)";
            td.appendChild(ability);
        }
        else {
            ability.innerHTML = loopArray.ability;
            td.appendChild(ability);
        }


        var tr = newTable.insertRow();
        tr.style.display = "table-row";
        var td = tr.insertCell();
        nature = document.createElement("Text");
        td.setAttribute("height", "13px");
        nature.setAttribute("height", "13px");
        nature.innerHTML = loopArray.nature;
        nature.style.fontWeight = "bold";
        nature.style.color = "white";
        nature.style.fontFamily = "'Orbitron', sans-serif";
        nature.style.fontSize = "10.2px";


        td.appendChild(nature);

        var tr = newTable.insertRow();
        tr.style.display = "table-row";
        var td = tr.insertCell();
        item = document.createElement("Text");
        td.setAttribute("height", "13px");
        item.setAttribute("height", "13px");
        if (loopArray.item != "(No Item)") {
            item.innerHTML = loopArray.item;
        }
        item.style.fontWeight = "bold";
        item.style.color = "white";
        item.style.fontFamily = "'Orbitron', sans-serif";
        item.style.fontSize = "10.2px";

        td.appendChild(item);

        ivEvGrid = document.createElement("div");
        frontSide.appendChild(ivEvGrid);

        ivGrid = document.createElement("div");
        ivGrid.setAttribute("id", "IvGrid " + i);
        ivGrid.style.display = "grid";
        ivGrid.style.gridTemplateColumns = "repeat( 6, minmax(40px, 1fr) )";
        ivGrid.style.position = "absolute";
        ivGrid.style.top = "130px";
        ivGrid.style.width = "100%";
        ivGrid.style.cursor = "pointer";
        //ivGrid.style.marginLeft = "0.5px";
        //ivGrid.style.marginRight = "0.5px";

        ivEvGrid.appendChild(ivGrid);

        statIvHP = document.createElement("button");
        statIvHP.setAttribute("id", "IvHP " + i);
        statIvHP.setAttribute("class", "SA-StatHolder");
        statIvHP.style.borderLeft = "none";

        ivGrid.appendChild(statIvHP);

        statIvAtt = document.createElement("button");
        statIvAtt.setAttribute("id", "IvAtt " + i);
        statIvAtt.setAttribute("class", "SA-StatHolder");

        ivGrid.appendChild(statIvAtt);

        statIvDef = document.createElement("button");
        statIvDef.setAttribute("id", "IvDef " + i);
        statIvDef.setAttribute("class", "SA-StatHolder");

        ivGrid.appendChild(statIvDef);

        statIvSpa = document.createElement("button");
        statIvSpa.setAttribute("id", "IvSpa " + i);
        statIvSpa.setAttribute("class", "SA-StatHolder");

        ivGrid.appendChild(statIvSpa);

        statIvSpd = document.createElement("button");
        statIvSpd.setAttribute("id", "IvSpd " + i);
        statIvSpd.setAttribute("class", "SA-StatHolder");

        ivGrid.appendChild(statIvSpd);

        statIvSpe = document.createElement("button");
        statIvSpe.setAttribute("id", "IvSpe " + i);
        statIvSpe.setAttribute("class", "SA-StatHolder");
        statIvSpe.style.borderRight = "none";

        ivGrid.appendChild(statIvSpe);

        statIvHP.innerHTML = loopArray.iv_hp;
        statIvAtt.innerHTML = loopArray.iv_att;
        statIvDef.innerHTML = loopArray.iv_def;
        statIvSpa.innerHTML = loopArray.iv_spa;
        statIvSpd.innerHTML = loopArray.iv_spd;
        statIvSpe.innerHTML = loopArray.iv_spe;

        if (statIvHP.innerHTML == 31) {
            statIvHP.style.color = "#71c771";
        } else if (statIvHP.innerHTML == 0) {
            statIvHP.style.color = "#ff6767";
        } else if (statIvHP.innerHTML == "HT") {
            statIvHP.style.color = "#d2b30c";
        } else {
            statIvHP.style.color = "#edeaea";
        }

        if (statIvAtt.innerHTML == 31) {
            statIvAtt.style.color = "#71c771";
        } else if (statIvAtt.innerHTML == 0) {
            statIvAtt.style.color = "#ff6767";
        } else if (statIvAtt.innerHTML == "HT") {
            statIvAtt.style.color = "#d2b30c";
        } else {
            statIvAtt.style.color = "#edeaea";
        }

        if (statIvDef.innerHTML == 31) {
            statIvDef.style.color = "#71c771";
        } else if (statIvDef.innerHTML == 0) {
            statIvDef.style.color = "#ff6767";
        } else if (statIvDef.innerHTML == "HT") {
            statIvDef.style.color = "#d2b30c";
        } else {
            statIvDef.style.color = "#edeaea";
        }

        if (statIvSpa.innerHTML == 31) {
            statIvSpa.style.color = "#71c771";
        } else if (statIvSpa.innerHTML == 0) {
            statIvSpa.style.color = "#ff6767";
        } else if (statIvSpa.innerHTML == "HT") {
            statIvSpa.style.color = "#d2b30c";
        } else {
            statIvSpa.style.color = "#edeaea";
        }

        if (statIvSpd.innerHTML == 31) {
            statIvSpd.style.color = "#71c771";
        } else if (statIvSpd.innerHTML == 0) {
            statIvSpd.style.color = "#ff6767";
        } else if (statIvSpd.innerHTML == "HT") {
            statIvSpd.style.color = "#d2b30c";
        } else {
            statIvSpd.style.color = "#edeaea";
        }

        if (statIvSpe.innerHTML == 31) {
            statIvSpe.style.color = "#71c771";
        } else if (statIvSpe.innerHTML == 0) {
            statIvSpe.style.color = "#ff6767";
        } else if (statIvSpe.innerHTML == "HT") {
            statIvSpe.style.color = "#d2b30c";
        } else {
            statIvSpe.style.color = "#edeaea";
        }

        /*if (loopArray.nature.includes("+Att")) {
            statIvAtt.style.boxShadow = "0px 0px 6px #ff345a";
        } else if (loopArray.nature.includes("-Att")) {
            statIvAtt.style.boxShadow = "0px 0px 6px #00fbff"
        } else {
            statIvAtt.style.boxShadow = "none";
        }

        if (loopArray.nature.includes("+Def")) {
            statIvDef.style.boxShadow = "0px 0px 6px #ff345a";
        } else if (loopArray.nature.includes("-Def")) {
            statIvDef.style.boxShadow = "0px 0px 6px #00fbff"
        } else {
            statIvDef.style.boxShadow = "none";
        }

        if (loopArray.nature.includes("+Spa")) {
            statIvSpa.style.boxShadow = "0px 0px 6px #ff345a";
        } else if (loopArray.nature.includes("-Spa")) {
            statIvSpa.style.boxShadow = "0px 0px 6px #00fbff"
        } else {
            statIvSpa.style.boxShadow = "none";
        }

        if (loopArray.nature.includes("+Spd")) {
            statIvSpd.style.boxShadow = "0px 0px 6px #ff345a";
        } else if (loopArray.nature.includes("-Spd")) {
            statIvSpd.style.boxShadow = "0px 0px 6px #00fbff"
        } else {
            statIvSpd.style.boxShadow = "none";
        }

        if (loopArray.nature.includes("+Spe")) {
            statIvSpe.style.boxShadow = "0px 0px 6px #ff345a";
        } else if (loopArray.nature.includes("-Spe")) {
            statIvSpe.style.boxShadow = "0px 0px 6px #00fbff"
        } else {
            statIvSpe.style.boxShadow = "none";
        }*/

        /*statIvHP.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("IvHP " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("IvGrid " + correctNum).insertBefore(reusableIvHPDropdown, document.getElementById("IvHP " + correctNum));
                reusableIvHPDropdown.style.display = "initial";
                reusableIvHPDropdown.value = document.getElementById("IvHP " + i).innerHTML;
                document.getElementById("IvHP " + correctNum).style.display = "none";
            }
        }

        reusableIvHPDropdown.onblur = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("IvHP " + correctNum).innerHTML = reusableIvHPDropdown.value;
        }

        statIvAtt.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("IvAtt " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("IvGrid " + correctNum).insertBefore(reusableIvAttDropdown, document.getElementById("IvAtt " + correctNum));
                reusableIvAttDropdown.style.display = "initial";
                reusableIvAttDropdown.value = document.getElementById("IvAtt " + i).innerHTML;
                document.getElementById("IvAtt " + correctNum).style.display = "none";
            }
        }

        reusableIvAttDropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("IvAtt " + correctNum).innerHTML = reusableIvAttDropdown.value;
        }

        statIvDef.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("IvDef " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("IvGrid " + correctNum).insertBefore(reusableIvDefDropdown, document.getElementById("IvDef " + correctNum));
                reusableIvDefDropdown.style.display = "initial";
                reusableIvDefDropdown.value = document.getElementById("IvDef " + i).innerHTML;
                document.getElementById("IvDef " + correctNum).style.display = "none";
            }
        }

        reusableIvDefDropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("IvDef " + correctNum).innerHTML = reusableIvDefDropdown.value;
        }

        statIvSpa.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("IvSpa " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("IvGrid " + correctNum).insertBefore(reusableIvSpaDropdown, document.getElementById("IvSpa " + correctNum));
                reusableIvSpaDropdown.style.display = "initial";
                reusableIvSpaDropdown.value = document.getElementById("IvSpa " + i).innerHTML;
                document.getElementById("IvSpa " + correctNum).style.display = "none";
            }
        }

        reusableIvSpaDropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("IvSpa " + correctNum).innerHTML = reusableIvSpaDropdown.value;
        }

        statIvSpd.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("IvSpd " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("IvGrid " + correctNum).insertBefore(reusableIvSpdDropdown, document.getElementById("IvSpd " + correctNum));
                reusableIvSpdDropdown.style.display = "initial";
                reusableIvSpdDropdown.value = document.getElementById("IvSpd " + i).innerHTML;
                document.getElementById("IvSpd " + correctNum).style.display = "none";
            }
        }

        reusableIvSpdDropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("IvSpd " + correctNum).innerHTML = reusableIvSpdDropdown.value;
        }

        statIvSpe.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("IvSpe " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("IvGrid " + correctNum).insertBefore(reusableIvSpeDropdown, document.getElementById("IvSpe " + correctNum));
                reusableIvSpeDropdown.style.display = "initial";
                reusableIvSpeDropdown.value = document.getElementById("IvSpe " + i).innerHTML;
                document.getElementById("IvSpe " + correctNum).style.display = "none";
            }
        }

        reusableIvSpeDropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("IvSpe " + correctNum).innerHTML = reusableIvSpeDropdown.value;
        }

        ivGrid.onmouseleave = function () {
            correctNum = this.id.substring(7);
            document.querySelector('#SelectionArea').prepend(reusableIvHPDropdown);
            document.querySelector('#SelectionArea').prepend(reusableIvAttDropdown);
            document.querySelector('#SelectionArea').prepend(reusableIvDefDropdown);
            document.querySelector('#SelectionArea').prepend(reusableIvSpaDropdown);
            document.querySelector('#SelectionArea').prepend(reusableIvSpdDropdown);
            document.querySelector('#SelectionArea').prepend(reusableIvSpeDropdown);
            reusableIvHPDropdown.style.display = "none";
            reusableIvAttDropdown.style.display = "none";
            reusableIvDefDropdown.style.display = "none";
            reusableIvSpaDropdown.style.display = "none";
            reusableIvSpdDropdown.style.display = "none";
            reusableIvSpeDropdown.style.display = "none";
            document.getElementById("IvHP " + correctNum).style.display = "block";
            document.getElementById("IvAtt " + correctNum).style.display = "block";
            document.getElementById("IvDef " + correctNum).style.display = "block";
            document.getElementById("IvSpa " + correctNum).style.display = "block";
            document.getElementById("IvSpd " + correctNum).style.display = "block";
            document.getElementById("IvSpe " + correctNum).style.display = "block";

        }*/

        evGrid = document.createElement("div");
        evGrid.setAttribute("id", "EvGrid " + i);
        evGrid.style.display = "grid";
        evGrid.style.gridTemplateColumns = "repeat( 6, minmax(40px, 1fr) )";
        evGrid.style.position = "absolute";
        evGrid.style.top = "150px";
        evGrid.style.width = "100%";
        evGrid.style.cursor = "pointer";
        //evGrid.style.marginLeft = "0.5px";
        //evGrid.style.marginRight = "0.5px";

        ivEvGrid.appendChild(evGrid);

        statEvHP = document.createElement("button");
        statEvHP.setAttribute("id", "EvHP " + i);
        statEvHP.setAttribute("class", "SA-StatHolder");
        statEvHP.style.borderLeft = "none";

        evGrid.appendChild(statEvHP);

        statEvAtt = document.createElement("button");
        statEvAtt.setAttribute("id", "EvAtt " + i);
        statEvAtt.setAttribute("class", "SA-StatHolder");

        evGrid.appendChild(statEvAtt);

        statEvDef = document.createElement("button");
        statEvDef.setAttribute("id", "EvDef " + i);
        statEvDef.setAttribute("class", "SA-StatHolder");

        evGrid.appendChild(statEvDef);

        statEvSpa = document.createElement("button");
        statEvSpa.setAttribute("id", "EvSpa " + i);
        statEvSpa.setAttribute("class", "SA-StatHolder");

        evGrid.appendChild(statEvSpa);

        statEvSpd = document.createElement("button");
        statEvSpd.setAttribute("id", "EvSpd " + i);
        statEvSpd.setAttribute("class", "SA-StatHolder");

        evGrid.appendChild(statEvSpd);

        statEvSpe = document.createElement("button");
        statEvSpe.setAttribute("id", "EvSpe " + i);
        statEvSpe.setAttribute("class", "SA-StatHolder");
        statEvSpe.style.borderRight = "none";

        evGrid.appendChild(statEvSpe);

        statEvHP.innerHTML = loopArray.ev_hp;
        statEvAtt.innerHTML = loopArray.ev_att;
        statEvDef.innerHTML = loopArray.ev_def;
        statEvSpa.innerHTML = loopArray.ev_spa;
        statEvSpd.innerHTML = loopArray.ev_spd;
        statEvSpe.innerHTML = loopArray.ev_spe;

        if (statEvHP.innerHTML == 0) {
            statEvHP.style.color = "#c2c2c2";
        } else if (statEvHP.innerHTML == 252) {
            statEvHP.style.color = "#4cb7cd";
        } else {
            statEvHP.style.color = "#edeaea";
        }

        if (statEvAtt.innerHTML == 0) {
            statEvAtt.style.color = "#c2c2c2";
        } else if (statEvAtt.innerHTML == 252) {
            statEvAtt.style.color = "#4cb7cd";
        } else {
            statEvAtt.style.color = "#edeaea";
        }

        if (statEvDef.innerHTML == 0) {
            statEvDef.style.color = "#c2c2c2";
        } else if (statEvDef.innerHTML == 252) {
            statEvDef.style.color = "#4cb7cd";
        } else {
            statEvDef.style.color = "#edeaea";
        }

        if (statEvSpa.innerHTML == 0) {
            statEvSpa.style.color = "#c2c2c2";
        } else if (statEvSpa.innerHTML == 252) {
            statEvSpa.style.color = "#4cb7cd";
        } else {
            statEvSpa.style.color = "#edeaea";
        }

        if (statEvSpd.innerHTML == 0) {
            statEvSpd.style.color = "#c2c2c2";
        } else if (statEvSpd.innerHTML == 252) {
            statEvSpd.style.color = "#4cb7cd";
        } else {
            statEvSpd.style.color = "#edeaea";
        }

        if (statEvSpe.innerHTML == 0) {
            statEvSpe.style.color = "#c2c2c2";
        } else if (statEvSpe.innerHTML == 252) {
            statEvSpe.style.color = "#4cb7cd";
        } else {
            statEvSpe.style.color = "#edeaea";
        }

        /*statEvHP.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("EvHP " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("EvGrid " + correctNum).insertBefore(reusableEvHPDropdown, document.getElementById("EvHP " + correctNum));
                reusableEvHPDropdown.style.display = "initial";
                reusableEvHPDropdown.value = document.getElementById("EvHP " + i).innerHTML;
                document.getElementById("EvHP " + correctNum).style.display = "none";
            }
        }

        reusableEvHPDropdown.onblur = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("EvHP " + correctNum).innerHTML = reusableEvHPDropdown.value;
        }

        statEvAtt.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("EvAtt " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("EvGrid " + correctNum).insertBefore(reusableEvAttDropdown, document.getElementById("EvAtt " + correctNum));
                reusableEvAttDropdown.style.display = "initial";
                reusableEvAttDropdown.value = document.getElementById("EvAtt " + i).innerHTML;
                document.getElementById("EvAtt " + correctNum).style.display = "none";
            }
        }

        reusableEvAttDropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("EvAtt " + correctNum).innerHTML = reusableEvAttDropdown.value;
        }

        statEvDef.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("EvDef " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("EvGrid " + correctNum).insertBefore(reusableEvDefDropdown, document.getElementById("EvDef " + correctNum));
                reusableEvDefDropdown.style.display = "initial";
                reusableEvDefDropdown.value = document.getElementById("EvDef " + i).innerHTML;
                document.getElementById("EvDef " + correctNum).style.display = "none";
            }
        }

        reusableEvDefDropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("EvDef " + correctNum).innerHTML = reusableEvDefDropdown.value;
        }

        statEvSpa.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("EvSpa " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("EvGrid " + correctNum).insertBefore(reusableEvSpaDropdown, document.getElementById("EvSpa " + correctNum));
                reusableEvSpaDropdown.style.display = "initial";
                reusableEvSpaDropdown.value = document.getElementById("EvSpa " + i).innerHTML;
                document.getElementById("EvSpa " + correctNum).style.display = "none";
            }
        }

        reusableEvSpaDropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("EvSpa " + correctNum).innerHTML = reusableEvSpaDropdown.value;
        }

        statEvSpd.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("EvSpd " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("EvGrid " + correctNum).insertBefore(reusableEvSpdDropdown, document.getElementById("EvSpd " + correctNum));
                reusableEvSpdDropdown.style.display = "initial";
                reusableEvSpdDropdown.value = document.getElementById("EvSpd " + i).innerHTML;
                document.getElementById("EvSpd " + correctNum).style.display = "none";
            }
        }

        reusableEvSpdDropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("EvSpd " + correctNum).innerHTML = reusableEvSpdDropdown.value;
        }

        statEvSpe.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("EvSpe " + correctNum).style.display = "block";
            }
            correctNum = this.parentNode.id.substring(7);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("EvGrid " + correctNum).insertBefore(reusableEvSpeDropdown, document.getElementById("EvSpe " + correctNum));
                reusableEvSpeDropdown.style.display = "initial";
                reusableEvSpeDropdown.value = document.getElementById("EvSpe " + i).innerHTML;
                document.getElementById("EvSpe " + correctNum).style.display = "none";
            }
        }

        reusableEvSpeDropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(7);
            previousSpace = correctNum;
            document.getElementById("EvSpe " + correctNum).innerHTML = reusableEvSpeDropdown.value;
        }

        evGrid.onmouseleave = function () {
            correctNum = this.id.substring(7);
            document.querySelector('#SelectionArea').prepend(reusableEvHPDropdown);
            document.querySelector('#SelectionArea').prepend(reusableEvAttDropdown);
            document.querySelector('#SelectionArea').prepend(reusableEvDefDropdown);
            document.querySelector('#SelectionArea').prepend(reusableEvSpaDropdown);
            document.querySelector('#SelectionArea').prepend(reusableEvSpdDropdown);
            document.querySelector('#SelectionArea').prepend(reusableEvSpeDropdown);
            reusableEvHPDropdown.style.display = "none";
            reusableEvAttDropdown.style.display = "none";
            reusableEvDefDropdown.style.display = "none";
            reusableEvSpaDropdown.style.display = "none";
            reusableEvSpdDropdown.style.display = "none";
            reusableEvSpeDropdown.style.display = "none";
            document.getElementById("EvHP " + correctNum).style.display = "block";
            document.getElementById("EvAtt " + correctNum).style.display = "block";
            document.getElementById("EvDef " + correctNum).style.display = "block";
            document.getElementById("EvSpa " + correctNum).style.display = "block";
            document.getElementById("EvSpd " + correctNum).style.display = "block";
            document.getElementById("EvSpe " + correctNum).style.display = "block";

        }*/

        if (loopArray.level != null) {
            statIvHP.style.cursor = "pointer";
            statIvAtt.style.cursor = "pointer";
            statIvDef.style.cursor = "pointer";
            statIvSpa.style.cursor = "pointer";
            statIvSpd.style.cursor = "pointer";
            statIvSpe.style.cursor = "pointer";
            statEvHP.style.cursor = "pointer";
            statEvAtt.style.cursor = "pointer";
            statEvDef.style.cursor = "pointer";
            statEvSpa.style.cursor = "pointer";
            statEvSpd.style.cursor = "pointer";
            statEvSpe.style.cursor = "pointer";
        }

        let seeingStats = false;
        ivEvGrid.onclick = function () {
            if (seeingStats) {
                seeingStats = false;
                document.getElementById("IvHP " + i).innerHTML = arrayData["Rows"][i].iv_hp;
                document.getElementById("IvAtt " + i).innerHTML = arrayData["Rows"][i].iv_att;
                document.getElementById("IvDef " + i).innerHTML = arrayData["Rows"][i].iv_def;
                document.getElementById("IvSpa " + i).innerHTML = arrayData["Rows"][i].iv_spa;
                document.getElementById("IvSpd " + i).innerHTML = arrayData["Rows"][i].iv_spd;
                document.getElementById("IvSpe " + i).innerHTML = arrayData["Rows"][i].iv_spe;
                document.getElementById("EvHP " + i).innerHTML = arrayData["Rows"][i].ev_hp;
                document.getElementById("EvAtt " + i).innerHTML = arrayData["Rows"][i].ev_att;
                document.getElementById("EvDef " + i).innerHTML = arrayData["Rows"][i].ev_def;
                document.getElementById("EvSpa " + i).innerHTML = arrayData["Rows"][i].ev_spa;
                document.getElementById("EvSpd " + i).innerHTML = arrayData["Rows"][i].ev_spd;
                document.getElementById("EvSpe " + i).innerHTML = arrayData["Rows"][i].ev_spe;
            } else {
                if (arrayData["Rows"][i].level != null) {
                    seeingStats = true;
                    for (let j = 0; j < pokemonDataArray.length; j++) {
                        if (arrayData["Rows"][i].pokemon == pokemonDataArray[j].pokemon || pokemonDataArray[j].pokemon == "Meowstic-Male" && arrayData["Rows"][i].pokemon == "Meowstic" && arrayData["Rows"][i].gender == "Male" || pokemonDataArray[j].pokemon == "Meowstic-Female" && arrayData["Rows"][i].pokemon == "Meowstic" && arrayData["Rows"][i].gender == "Female" || pokemonDataArray[j].pokemon == "Indeedee-Male" && arrayData["Rows"][i].pokemon == "Indeedee" && arrayData["Rows"][i].gender == "Male" || pokemonDataArray[j].pokemon == "Indeedee-Female" && arrayData["Rows"][i].pokemon == "Indeedee" && arrayData["Rows"][i].gender == "Female" || pokemonDataArray[j].pokemon == "Basculegion-Male" && arrayData["Rows"][i].pokemon == "Basculegion" && arrayData["Rows"][i].gender == "Male" || pokemonDataArray[j].pokemon == "Basculegion-Female" && arrayData["Rows"][i].pokemon == "Basculegion" && arrayData["Rows"][i].gender == "Female" || pokemonDataArray[j].pokemon == "Oinkologne-Male" && arrayData["Rows"][i].pokemon == "Oinkologne" && arrayData["Rows"][i].gender == "Male" || pokemonDataArray[j].pokemon == "Oinkologne-Female" && arrayData["Rows"][i].pokemon == "Oinkologne" && arrayData["Rows"][i].gender == "Female") {
                            document.getElementById("IvHP " + i).innerHTML = pokemonDataArray[j].stat_hp;
                            document.getElementById("IvAtt " + i).innerHTML = pokemonDataArray[j].stat_att;
                            document.getElementById("IvDef " + i).innerHTML = pokemonDataArray[j].stat_def;
                            document.getElementById("IvSpa " + i).innerHTML = pokemonDataArray[j].stat_spa;
                            document.getElementById("IvSpd " + i).innerHTML = pokemonDataArray[j].stat_spd;
                            document.getElementById("IvSpe " + i).innerHTML = pokemonDataArray[j].stat_spe;

                            let theStat = 0;

                            if (arrayData["Rows"][i].iv_hp == "X") {
                                document.getElementById("EvHP " + i).innerHTML = "?";
                            } else {
                                if (arrayData["Rows"][i].ev_hp != "X") {
                                    theStat = parseInt(arrayData["Rows"][i].iv_hp);
                                    if (arrayData["Rows"][i].iv_hp == "HT") {
                                        theStat = 31;
                                    }
                                    document.getElementById("EvHP " + i).innerHTML = Math.floor((2 * pokemonDataArray[j].stat_hp + theStat + Math.floor(parseInt(arrayData["Rows"][i].ev_hp) / 4)) * arrayData["Rows"][i].level / 100 + arrayData["Rows"][i].level + 10);
                                } else {
                                    document.getElementById("EvHP " + i).innerHTML = "?";
                                }
                                if (arrayData["Rows"][i].pokemon == "Shedinja") {
                                    document.getElementById("EvHP " + i).innerHTML = "1";
                                }
                            }
                            if (arrayData["Rows"][i].iv_att == "X") {
                                document.getElementById("EvAtt " + i).innerHTML = "?";
                            } else {
                                if (arrayData["Rows"][i].ev_att != "X") {
                                    theStat = parseInt(arrayData["Rows"][i].iv_att);
                                    if (arrayData["Rows"][i].iv_att == "HT") {
                                        theStat = 31;
                                    }
                                    statModifier = 1;
                                    if (arrayData["Rows"][i].nature.includes("+Att")) {
                                        statModifier = 1.1;
                                    }
                                    else if (arrayData["Rows"][i].nature.includes("-Att")) {
                                        statModifier = 0.9;
                                    }
                                    document.getElementById("EvAtt " + i).innerHTML = Math.floor(((2 * pokemonDataArray[j].stat_att + theStat + Math.floor(parseInt(arrayData["Rows"][i].ev_att) / 4)) * arrayData["Rows"][i].level / 100 + 5) * statModifier);
                                } else {
                                    document.getElementById("EvAtt " + i).innerHTML = "?";
                                }
                            }
                            if (arrayData["Rows"][i].iv_def == "X") {
                                document.getElementById("EvDef " + i).innerHTML = "?";
                            } else {
                                if (arrayData["Rows"][i].ev_def != "X") {
                                    theStat = parseInt(arrayData["Rows"][i].iv_def);
                                    if (arrayData["Rows"][i].iv_def == "HT") {
                                        theStat = 31;
                                    }
                                    statModifier = 1;
                                    if (arrayData["Rows"][i].nature.includes("+Def")) {
                                        statModifier = 1.1;
                                    }
                                    else if (arrayData["Rows"][i].nature.includes("-Def")) {
                                        statModifier = 0.9;
                                    }
                                    document.getElementById("EvDef " + i).innerHTML = Math.floor(((2 * pokemonDataArray[j].stat_def + theStat + Math.floor(parseInt(arrayData["Rows"][i].ev_def) / 4)) * arrayData["Rows"][i].level / 100 + 5) * statModifier);
                                } else {
                                    document.getElementById("EvDef " + i).innerHTML = "?";
                                }
                            }
                            if (arrayData["Rows"][i].iv_spa == "X") {
                                document.getElementById("EvSpa " + i).innerHTML = "?";
                            } else {
                                if (arrayData["Rows"][i].ev_spa != "X") {
                                    theStat = parseInt(arrayData["Rows"][i].iv_spa);
                                    if (arrayData["Rows"][i].iv_spa == "HT") {
                                        theStat = 31;
                                    }
                                    statModifier = 1;
                                    if (arrayData["Rows"][i].nature.includes("+Spa")) {
                                        statModifier = 1.1;
                                    }
                                    else if (arrayData["Rows"][i].nature.includes("-Spa")) {
                                        statModifier = 0.9;
                                    }
                                    document.getElementById("EvSpa " + i).innerHTML = Math.floor(((2 * pokemonDataArray[j].stat_spa + theStat + Math.floor(parseInt(arrayData["Rows"][i].ev_spa) / 4)) * arrayData["Rows"][i].level / 100 + 5) * statModifier);
                                } else {
                                    document.getElementById("EvSpa " + i).innerHTML = "?";
                                }
                            }
                            if (arrayData["Rows"][i].iv_spd == "X") {
                                document.getElementById("EvSpd " + i).innerHTML = "?";
                            } else {
                                if (arrayData["Rows"][i].ev_spd != "X") {
                                    theStat = parseInt(arrayData["Rows"][i].iv_spd);
                                    if (arrayData["Rows"][i].iv_spd == "HT") {
                                        theStat = 31;
                                    }
                                    statModifier = 1;
                                    if (arrayData["Rows"][i].nature.includes("+Spd")) {
                                        statModifier = 1.1;
                                    }
                                    else if (arrayData["Rows"][i].nature.includes("-Spd")) {
                                        statModifier = 0.9;
                                    }
                                    document.getElementById("EvSpd " + i).innerHTML = Math.floor(((2 * pokemonDataArray[j].stat_spd + theStat + Math.floor(parseInt(arrayData["Rows"][i].ev_spd) / 4)) * arrayData["Rows"][i].level / 100 + 5) * statModifier);
                                } else {
                                    document.getElementById("EvSpd " + i).innerHTML = "?";
                                }
                            }
                            if (arrayData["Rows"][i].iv_spe == "X") {
                                document.getElementById("EvSpe " + i).innerHTML = "?";
                            } else {
                                if (arrayData["Rows"][i].ev_spe != "X") {
                                    theStat = parseInt(arrayData["Rows"][i].iv_spe);
                                    if (arrayData["Rows"][i].iv_spe == "HT") {
                                        theStat = 31;
                                    }
                                    statModifier = 1;
                                    if (arrayData["Rows"][i].nature.includes("+Spe")) {
                                        statModifier = 1.1;
                                    }
                                    else if (arrayData["Rows"][i].nature.includes("-Spe")) {
                                        statModifier = 0.9;
                                    }
                                    document.getElementById("EvSpe " + i).innerHTML = Math.floor(((2 * pokemonDataArray[j].stat_spe + theStat + Math.floor(parseInt(arrayData["Rows"][i].ev_spe) / 4)) * arrayData["Rows"][i].level / 100 + 5) * statModifier);
                                } else {
                                    document.getElementById("EvSpe " + i).innerHTML = "?";
                                }
                            }
                        }
                    }
                }
                //alert(Math.floor((2 * 76 + parseInt(loopArray.iv_hp) + Math.floor(parseInt(loopArray.ev_hp) / 4)) * loopArray.level / 100 + loopArray.level + 10));
            }
        }

        normalMoveGrid = document.createElement("div");
        normalMoveGrid.setAttribute("id", "NormalMoveGrid " + i);
        normalMoveGrid.style.display = "grid";
        normalMoveGrid.style.gridTemplateColumns = "repeat( 2, minmax(120px, 1fr) )";
        normalMoveGrid.style.position = "absolute";
        normalMoveGrid.style.top = "180px";
        normalMoveGrid.style.width = "100%";

        frontSide.appendChild(normalMoveGrid);


        normalMove1 = document.createElement("Text");
        normalMove1.setAttribute("id", "normalMove1 " + i);
        normalMove1.setAttribute("height", "13px");
        normalMove1.innerHTML = loopArray.move_1;
        normalMove1.style.fontWeight = "bold";
        normalMove1.style.color = "white";
        normalMove1.style.fontFamily = "'Orbitron', sans-serif";
        normalMove1.style.fontSize = "11px";
        normalMove1.style.marginLeft = "2px";
        normalMove1.style.marginRight = "1px";
        //normalMove1.style.marginBottom = "4px";
        normalMove1.style.textAlign = "center";
        normalMove1.style.paddingTop = "4px";
        normalMove1.style.paddingBottom = "4px";
        normalMove1.style.pointerEvents = "none";
        //normalMove1.style.background = "none";
        //normalMove1.style.border = "none";

        for (let j = 0; j < allMovesArray.length; j++) {
            if (allMovesArray[j].moves == loopArray.move_1) {
                //normalMove1.classList.add("SA-" + allMovesArray[j].move_type + "MoveHolder");
                if (allMovesArray[j].moves == "Hidden Power") {
                    if (loopArray.misc.includes("HP")) {
                        normalMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(3, loopArray.misc.length)) + "_1.png')";
                    }
                } else if (allMovesArray[j].moves == "Tera Blast") {
                    if (loopArray.misc.includes("Tera")) {
                        normalMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(5, loopArray.misc.length)) + "_1.png')";
                    }
                } else if (allMovesArray[j].moves == "Raging Bull") {
                    if (loopArray.pokemon.includes("Blaze")) {
                        normalMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fire_1.png')";
                    } if (loopArray.pokemon.includes("Aqua")) {
                        normalMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Water_1.png')";
                    } else {
                        normalMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fighting_1.png')";
                    }
                } else {
                    normalMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + allMovesArray[j].move_type + "_1.png')";
                }
                normalMove1.style.backgroundSize = "cover";
            }
        }

        if ((loopArray.move_1 == "(No Move)" || loopArray.move_1 == "(Any Move)") && (userData == null || userData != null && loopArray.user_id != userData.user_id)) {
            normalMove1.style.opacity = "0";
        }

        normalMoveGrid.appendChild(normalMove1);

        /*normalMove1.onmouseenter = function () {
            //previousSpace is needed because otherwise if you move the mouse too fast, it will not unhide the element on the onmouseout method.
            //So this just is backup so in case it didn't make it visable already, it will.
            if (previousSpace != null) {
                document.getElementById("normalMove1 " + correctNum).style.display = "block";
            }
            //"this" is basically necessary for getting the current element as otherwise it will grab the last value of i.
            //In this case we need to get the right number (index) for the movegrid so we can append the dropdown to it which is why all but
            //that number is removed with the substring and set to a variable.

            //The + i works for the innerHTML part, not 100% sure why, but I'll replace it with correct number if that works instead.
            //The if statement makes sure that the user is the owner before they are allowed to make any changes.
            correctNum = this.parentNode.id.substring(15);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("NormalMoveGrid " + correctNum).insertBefore(reusableMove1Dropdown, document.getElementById("normalMove1 " + correctNum));
                reusableMove1Dropdown.style.display = "initial";
                reusableMove1Dropdown.value = document.getElementById("normalMove1 " + i).innerHTML;
                document.getElementById("normalMove1 " + correctNum).style.display = "none";
            }
        }
        //Here we set the previousSpace to be the correctNum and copy the value from the dropdown to the move.
        reusableMove1Dropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(15);
            previousSpace = correctNum;
            document.getElementById("normalMove1 " + correctNum).innerHTML = reusableMove1Dropdown.value;
        }*/

        if ((loopArray.move_1 == "(No Move)" || loopArray.move_1 == "(Any Move)") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            document.getElementById("normalMove1 " + i).innerHTML = "";
        }


        normalMove2 = document.createElement("Text");
        normalMove2.setAttribute("id", "normalMove2 " + i);
        normalMove2.setAttribute("height", "13px");
        normalMove2.innerHTML = loopArray.move_2;
        normalMove2.style.fontWeight = "bold";
        normalMove2.style.color = "white";
        normalMove2.style.fontFamily = "'Orbitron', sans-serif";
        normalMove2.style.fontSize = "11px";
        normalMove2.style.marginLeft = "1px";
        normalMove2.style.marginRight = "2px";
        //normalMove2.style.marginBottom = "4px";
        normalMove2.style.textAlign = "center";
        normalMove2.style.paddingTop = "4px";
        normalMove2.style.paddingBottom = "4px";
        normalMove2.style.pointerEvents = "none";
        //normalMove2.style.background = "none";
        //normalMove2.style.border = "none";

        for (let j = 0; j < allMovesArray.length; j++) {
            if (allMovesArray[j].moves == loopArray.move_2) {
                //normalMove2.classList.add("SA-" + allMovesArray[j].move_type + "MoveHolder");
                if (allMovesArray[j].moves == "Hidden Power") {
                    if (loopArray.misc.includes("HP")) {
                        normalMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(3, loopArray.misc.length)) + "_2.png')";
                    }
                } else if (allMovesArray[j].moves == "Tera Blast") {
                    if (loopArray.misc.includes("Tera")) {
                        normalMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(5, loopArray.misc.length)) + "_2.png')";
                    }
                } else if (allMovesArray[j].moves == "Raging Bull") {
                    if (loopArray.pokemon.includes("Blaze")) {
                        normalMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fire_2.png')";
                    } else if (loopArray.pokemon.includes("Aqua")) {
                        normalMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Water_2.png')";
                    } else {
                        normalMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fighting_2.png')";
                    }
                } else {
                    normalMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + allMovesArray[j].move_type + "_2.png')";
                }
                normalMove2.style.backgroundSize = "cover";
            }
        }

        if ((loopArray.move_2 == "(No Move)" || loopArray.move_2 == "(Any Move)") && (userData == null || userData != null && loopArray.user_id != userData.user_id)) {
            normalMove2.style.opacity = "0";
        }

        normalMoveGrid.appendChild(normalMove2);

        /*normalMove2.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("normalMove2 " + correctNum).style.display = "block";
            }

            correctNum = this.parentNode.id.substring(15);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("NormalMoveGrid " + correctNum).insertBefore(reusableMove2Dropdown, document.getElementById("normalMove2 " + correctNum));
                reusableMove2Dropdown.style.display = "initial";
                reusableMove2Dropdown.value = document.getElementById("normalMove2 " + i).innerHTML;
                document.getElementById("normalMove2 " + correctNum).style.display = "none";
            }
        }

        reusableMove2Dropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(15);
            previousSpace = correctNum;
            document.getElementById("normalMove2 " + correctNum).innerHTML = reusableMove2Dropdown.value;
        }*/

        if ((loopArray.move_2 == "(No Move)" || loopArray.move_2 == "(Any Move)") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            document.getElementById("normalMove2 " + i).innerHTML = "";
        }


        normalMove3 = document.createElement("Text");
        normalMove3.setAttribute("id", "normalMove3 " + i);
        normalMove3.setAttribute("height", "13px");
        normalMove3.innerHTML = loopArray.move_3;
        normalMove3.style.fontWeight = "bold";
        normalMove3.style.color = "white";
        normalMove3.style.fontFamily = "'Orbitron', sans-serif";
        normalMove3.style.fontSize = "11px";
        normalMove3.style.marginLeft = "2px";
        normalMove3.style.marginRight = "1px";
        //normalMove3.style.marginBottom = "4px";
        normalMove3.style.textAlign = "center";
        normalMove3.style.paddingTop = "4px";
        normalMove3.style.paddingBottom = "4px";
        normalMove3.style.pointerEvents = "none";
        //normalMove3.style.background = "none";
        //normalMove3.style.border = "none";

        for (let j = 0; j < allMovesArray.length; j++) {
            if (allMovesArray[j].moves == loopArray.move_3) {
                //normalMove3.classList.add("SA-" + allMovesArray[j].move_type + "MoveHolder");
                if (allMovesArray[j].moves == "Hidden Power") {
                    if (loopArray.misc.includes("HP")) {
                        normalMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(3, loopArray.misc.length)) + "_3.png')";
                    }
                } else if (allMovesArray[j].moves == "Tera Blast") {
                    if (loopArray.misc.includes("Tera")) {
                        normalMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(5, loopArray.misc.length)) + "_3.png')";
                    }
                } else if (allMovesArray[j].moves == "Raging Bull") {
                    if (loopArray.pokemon.includes("Blaze")) {
                        normalMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fire_3.png')";
                    } if (loopArray.pokemon.includes("Aqua")) {
                        normalMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Water_3.png')";
                    } else {
                        normalMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fighting_3.png')";
                    }
                } else {
                    normalMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + allMovesArray[j].move_type + "_3.png')";
                }
                normalMove3.style.backgroundSize = "cover";
            }
        }

        if ((loopArray.move_3 == "(No Move)" || loopArray.move_3 == "(Any Move)") && (userData == null || userData != null && loopArray.user_id != userData.user_id)) {
            normalMove3.style.opacity = "0";
        }

        normalMoveGrid.appendChild(normalMove3);

        /*normalMove3.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("normalMove3 " + correctNum).style.display = "block";
            }

            correctNum = this.parentNode.id.substring(15);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("NormalMoveGrid " + correctNum).insertBefore(reusableMove3Dropdown, document.getElementById("normalMove3 " + correctNum));
                reusableMove3Dropdown.style.display = "initial";
                reusableMove3Dropdown.value = document.getElementById("normalMove3 " + i).innerHTML;
                document.getElementById("normalMove3 " + correctNum).style.display = "none";
            }
        }

        reusableMove3Dropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(15);
            previousSpace = correctNum;
            document.getElementById("normalMove3 " + correctNum).innerHTML = reusableMove3Dropdown.value;
        }*/

        if ((loopArray.move_3 == "(No Move)" || loopArray.move_3 == "(Any Move)") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            document.getElementById("normalMove3 " + i).innerHTML = "";
        }



        normalMove4 = document.createElement("Text");
        normalMove4.setAttribute("id", "normalMove4 " + i);
        normalMove4.setAttribute("height", "13px");
        normalMove4.innerHTML = loopArray.move_4;
        normalMove4.style.fontWeight = "bold";
        normalMove4.style.color = "white";
        normalMove4.style.fontFamily = "'Orbitron', sans-serif";
        normalMove4.style.fontSize = "11px";
        normalMove4.style.marginLeft = "1px";
        normalMove4.style.marginRight = "2px";
        //normalMove4.style.marginBottom = "4px";
        normalMove4.style.textAlign = "center";
        normalMove4.style.paddingTop = "4px";
        normalMove4.style.paddingBottom = "4px";
        normalMove4.style.pointerEvents = "none";
        //normalMove4.style.background = "none";
        //normalMove4.style.border = "none";

        for (let j = 0; j < allMovesArray.length; j++) {
            if (allMovesArray[j].moves == loopArray.move_4) {
                //normalMove4.classList.add("SA-" + allMovesArray[j].move_type + "MoveHolder");
                if (allMovesArray[j].moves == "Hidden Power") {
                    if (loopArray.misc.includes("HP")) {
                        normalMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(3, loopArray.misc.length)) + "_4.png')";
                    }
                } else if (allMovesArray[j].moves == "Tera Blast") {
                    if (loopArray.misc.includes("Tera")) {
                        normalMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(5, loopArray.misc.length)) + "_4.png')";
                    }
                } else if (allMovesArray[j].moves == "Raging Bull") {
                    if (loopArray.pokemon.includes("Blaze")) {
                        normalMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fire_4.png')";
                    } if (loopArray.pokemon.includes("Aqua")) {
                        normalMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Water_4.png')";
                    } else {
                        normalMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fighting_4.png')";
                    }
                } else {
                    normalMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + allMovesArray[j].move_type + "_4.png')";
                }
                normalMove4.style.backgroundSize = "cover";
            }
        }

        if ((loopArray.move_4 == "(No Move)" || loopArray.move_4 == "(Any Move)") && (userData == null || userData != null && loopArray.user_id != userData.user_id)) {
            normalMove4.style.opacity = "0";
        }

        normalMoveGrid.appendChild(normalMove4);

        /*normalMove4.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("normalMove4 " + correctNum).style.display = "block";
            }

            correctNum = this.parentNode.id.substring(15);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("NormalMoveGrid " + correctNum).insertBefore(reusableMove4Dropdown, document.getElementById("normalMove4 " + correctNum));
                reusableMove4Dropdown.style.display = "initial";
                reusableMove4Dropdown.value = document.getElementById("normalMove4 " + i).innerHTML;
                document.getElementById("normalMove4 " + correctNum).style.display = "none";
            }
        }

        reusableMove4Dropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(15);
            previousSpace = correctNum;
            document.getElementById("normalMove4 " + correctNum).innerHTML = reusableMove4Dropdown.value;
        }*/

        if ((loopArray.move_4 == "(No Move)" || loopArray.move_4 == "(Any Move)") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            document.getElementById("normalMove4 " + i).innerHTML = "";
        }


        /*normalMoveGrid.onmouseleave = function () {
            correctNum = this.id.substring(15);
            document.querySelector('#SelectionArea').prepend(reusableMove1Dropdown);
            document.querySelector('#SelectionArea').prepend(reusableMove2Dropdown);
            document.querySelector('#SelectionArea').prepend(reusableMove3Dropdown);
            document.querySelector('#SelectionArea').prepend(reusableMove4Dropdown);
            reusableMove1Dropdown.style.display = "none";
            reusableMove2Dropdown.style.display = "none";
            reusableMove3Dropdown.style.display = "none";
            reusableMove4Dropdown.style.display = "none";
            document.getElementById("normalMove1 " + correctNum).style.display = "block";
            document.getElementById("normalMove2 " + correctNum).style.display = "block";
            document.getElementById("normalMove3 " + correctNum).style.display = "block";
            document.getElementById("normalMove4 " + correctNum).style.display = "block";

        }*/

        buttonGrid = document.createElement("div");
        buttonGrid.setAttribute("id", "ButtonGrid " + i);
        buttonGrid.style.display = "grid";
        buttonGrid.style.gridTemplateColumns = "repeat( auto-fit, minmax(40px, 1fr) )";
        buttonGrid.style.position = "absolute";
        buttonGrid.style.top = "225px";
        buttonGrid.style.width = "-webkit-fill-available";
        buttonGrid.style.width = "-moz-available";
        buttonGrid.style.marginLeft = "4px";
        buttonGrid.style.marginRight = "4px";

        newDiv.appendChild(buttonGrid);

        /*button2 = document.createElement("button");
        button2.setAttribute("class", "SA-ButtonDesign");
        button2.innerHTML = "Save";

        buttonGrid.appendChild(button2);*/

        flipButton = document.createElement("button");
        flipButton.setAttribute("class", "SA-ButtonDesign");
        flipButton.innerHTML = "Flip";

        flipButton.onclick = function () {
            correctNum = this.parentNode.id.substring(11);
            if (document.getElementById("BackSide " + correctNum).style.display == "none") {
                document.getElementById("BackSide " + correctNum).style.display = "block";
                document.getElementById("FrontSide " + correctNum).style.display = "none";
            } else {
                document.getElementById("FrontSide " + correctNum).style.display = "block";
                document.getElementById("BackSide " + correctNum).style.display = "none";
            }
        }

        buttonGrid.appendChild(flipButton);

        editButton = document.createElement("button");
        editButton.setAttribute("class", "SA-ButtonDesign");
        editButton.innerHTML = "Edit";

        buttonGrid.appendChild(editButton);

        if (userData == null || userData != null && userData.user_id != loopArray.user_id || ctsSeaching || currentlyImporting) {
            editButton.style.pointerEvents = "none";
            //editButton.style.backgroundColor = "#1e1e1e";
            editButton.style.display = "none";
        }

        editButton.onclick = function () {
            if (!creationInProgress) {
                console.log("Clicked");
                if (!currentlyRearranging && !placingPokemon) {
                    if (selectedPokemon != null && pokemonDetails.creation_id == arrayData["Rows"][i].creation_id) {
                        $('.DA-Close').click();
                        CloseDetailOptions();
                        return;
                    } else {
                        CloseDetailOptions();
                        selectedPokemon = document.getElementById("GenerationGridDiv" + (i));
                        pokemonDetails = arrayData["Rows"][i];

                        //$.post(url + "/PHP/generate_selection.php", { token: token, searchID: pokemonDetails.user_id, tradeOption: "Looking For" }, MatchMaking);
                        ShowPokemonDetails();
                        document.querySelector("#CTSArea").style.display = "none";
                        document.querySelector("#FilterArea").style.display = "none";
                    }

                    /*if (ctsSeaching) {
                        $.post(url + "/PHP/modify_check.php", { token: token, searchID: 0 }, ModifyCheckViewing);
                    } else {
                        $.post(url + "/PHP/modify_check_viewing.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
                    }*/
                }
            }
        }


        addButton = document.createElement("button");
        addButton.setAttribute("class", "SA-ButtonDesign");
        addButton.innerHTML = "Add";

        buttonGrid.appendChild(addButton);

        if (userData == null || userData != null && userData.user_id == loopArray.user_id) {
            addButton.style.pointerEvents = "none";
            //addButton.style.backgroundColor = "#1e1e1e";
            addButton.style.display = "none";
        }

        addButton.onclick = function () {
            $.post(url + "/PHP/add_selection.php", { token: token, creationID: pokemonDetails.creation_id });
            document.querySelector("#NotificationArea").style.display = "block";
            document.querySelector(".ViewingPokemonAdded").style.display = "block";
            $.post(url + "/PHP/format_import.php", { token: token });
        }

        /*pokemonMenuButton = document.createElement("button");
        pokemonMenuButton.setAttribute("class", "SA-ButtonDesign");
        pokemonMenuButton.innerHTML = "Pokemon Menu";

        buttonGrid.appendChild(pokemonMenuButton);

        pokemonMenu = document.createElement("div");
        pokemonMenu.style.width = "50%";
        pokemonMenu.style.position = "absolute";
        pokemonMenu.style.display = "grid";
        pokemonMenu.style.top = "17%";
        pokemonMenu.style.marginLeft = "50%";
        pokemonMenu.style.background = "#243048";
        pokemonMenu.style.zIndex = "1";
        pokemonMenu.style.display = "none";
        newDiv.appendChild(pokemonMenu);

        saveButton = document.createElement("button");
        saveButton.setAttribute("class", "SA-StatHolder");
        saveButton.style.height = "31px";
        saveButton.innerHTML = "Save";

        pokemonMenu.appendChild(saveButton);

        placeButton = document.createElement("button");
        placeButton.setAttribute("class", "SA-StatHolder");
        placeButton.style.height = "31px";
        placeButton.innerHTML = "Place";

        pokemonMenu.appendChild(placeButton);

        proofButton = document.createElement("button");
        proofButton.setAttribute("class", "SA-StatHolder");
        proofButton.style.height = "31px";
        proofButton.innerHTML = "View Proof";

        pokemonMenu.appendChild(proofButton);

        noteButton = document.createElement("button");
        noteButton.setAttribute("class", "SA-StatHolder");
        noteButton.style.height = "31px";
        noteButton.innerHTML = "View Note";

        pokemonMenu.appendChild(noteButton);

        deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "SA-StatHolder");
        deleteButton.style.height = "31px";
        deleteButton.innerHTML = "Delete";

        pokemonMenu.appendChild(deleteButton);

        addButton = document.createElement("button");
        addButton.setAttribute("class", "SA-StatHolder");
        addButton.style.height = "31px";
        addButton.innerHTML = "Add Pokemon";

        pokemonMenu.appendChild(addButton); */



        /*button4 = document.createElement("button");
        button4.setAttribute("class", "SA-ButtonDesign");
        button4.innerHTML = "Delete";

        buttonGrid.appendChild(button4);

        button5 = document.createElement("button");
        button5.setAttribute("class", "SA-ButtonDesign");
        button5.innerHTML = "Add";

        buttonGrid.appendChild(button5);*/

        //frontSide.style.display = "none";

        backSide = document.createElement("div");
        backSide.setAttribute("id", "BackSide " + (i));
        newDiv.appendChild(backSide);

        templateHolder = document.createElement("div");
        templateHolder.setAttribute("id", "TemplateHolder " + i);
        templateHolder.style.position = "absolute";
        templateHolder.style.width = "100%";
        templateHolder.style.display = "flex";
        templateHolder.style.marginTop = "2px";

        backSide.appendChild(templateHolder);

        /*addTemplate = document.createElement("button");
        addTemplate.setAttribute("id", "addTemplate " + i);
        addTemplate.setAttribute("class", "SA-DataGrid");
        addTemplate.innerHTML = "+";
        addTemplate.style.width = "30px";
        addTemplate.style.marginLeft = "5px";

        templateHolder.appendChild(addTemplate);

        templateInput = document.createElement("input");
        templateInput.setAttribute("id", "templateInput " + i);
        templateInput.setAttribute("class", "SA-DataGrid");
        templateInput.placeholder = "Type Template..."
        templateInput.style.width = "100px";
        templateInput.maxLength = "15";

        templateHolder.appendChild(templateInput);

        removeTemplate = document.createElement("button");
        removeTemplate.setAttribute("id", "removeTemplate " + i);
        removeTemplate.setAttribute("class", "SA-DataGrid");
        removeTemplate.innerHTML = "-";
        removeTemplate.style.width = "30px";

        templateHolder.appendChild(removeTemplate);

        template = document.createElement("button");
        template.setAttribute("id", "template " + i);
        template.setAttribute("class", "SA-DataGrid");
        template.innerHTML = "(No Template)";
        template.style.width = "-webkit-fill-available";
        template.style.width = "-moz-available";
        template.style.marginRight = "5px";

        templateHolder.appendChild(template);*/

        proofNoteGrid = document.createElement("div");
        proofNoteGrid.setAttribute("id", "ProofNoteGrid " + i);
        proofNoteGrid.style.display = "grid";
        proofNoteGrid.style.gridTemplateColumns = "repeat( 2, minmax(60px, 1fr) )";
        proofNoteGrid.style.position = "absolute";
        //proofNoteGrid.style.top = "20px";
        proofNoteGrid.style.width = "-webkit-fill-available";
        proofNoteGrid.style.width = "-moz-available";
        //proofNoteGrid.style.marginLeft = "115px";
        //proofNoteGrid.style.marginRight = "20px";
        proofNoteGrid.style.marginLeft = "5px";
        proofNoteGrid.style.marginRight = "5px";
        proofNoteGrid.style.top = "5px";

        backSide.appendChild(proofNoteGrid);

        /*proofButton = document.createElement("button");
        proofButton.setAttribute("class", "SA-ButtonDesign");
        proofButton.innerHTML = "Proof";*/
        proofButton = document.createElement("button");
        proofButton.setAttribute("id", "ProofButton " + i);
        proofButton.setAttribute("width", "15px");
        proofButton.setAttribute("height", "15px");
        proofButton.innerHTML = "Proof";
        proofButton.setAttribute("class", "SA-DataGrid");
        if (loopArray.proof != "") {
            proofButton.style.color = "white";
            proofButton.style.cursor = "pointer";
            //proofButton.style.background = "#494141b0";
        }

        proofNoteGrid.appendChild(proofButton);

        /*noteButton = document.createElement("button");
        noteButton.setAttribute("class", "SA-ButtonDesign");
        noteButton.innerHTML = "Note";*/

        proofMedia = document.createElement("a");
        proofMedia.setAttribute("target", "_blank");
        proofMedia.setAttribute("href", loopArray.proof);
        proofMedia.setAttribute("id", "ProofMedia " + i);
        proofMedia.style.display = "block";
        proofMedia.style.position = "absolute";
        proofMedia.style.zIndex = "2";
        proofMedia.style.width = "100%";
        proofMedia.style.top = "39px";
        proofMedia.style.textAlign = "center";
        backSide.appendChild(proofMedia);

        proofURL = document.createElement("text");
        proofURL.setAttribute("id", "ProofURL " + i);
        proofURL.style.minWidth = "100%";
        proofURL.style.width = "max-content";
        proofURL.style.overflow = "hidden";
        proofURL.style.overflow = "-moz-hidden-unscrollable";
        proofURL.style.whiteSpace = "no-wrap";
        proofURL.innerHTML = loopArray.proof;
        proofURL.style.background = "linear-gradient(#302b75, #112354)";
        proofURL.style.fontWeight = "bold";
        proofURL.style.color = "white";
        proofURL.style.fontFamily = "'Orbitron', sans-serif";
        proofURL.style.fontSize = "10.2px";
        proofURL.style.top = "20px";
        proofURL.style.zIndex = "2";
        proofURL.style.position = "absolute";
        proofURL.style.paddingLeft = "5px";
        proofURL.style.paddingRight = "5px";
        proofURL.style.paddingTop = "5px";
        proofURL.style.paddingBottom = "1px";
        proofURL.style.marginRight = "5px";
        backSide.appendChild(proofURL);

        proofURL.style.display = "none";


        proofVideo = document.createElement("video");
        proofVideo.setAttribute("id", "ProofVideo " + i);
        //proofVideo.style.maxWidth = "230px";
        //proofVideo.style.maxHeight = "230px";
        proofVideo.style.width = "100%";
        proofVideo.style.margin = "auto";
        proofVideo.style.cursor = "pointer";
        proofVideo.setAttribute("controls", "true");
        proofVideo.style.zIndex = "2";
        proofVideo.style.margin = "auto";
        proofMedia.appendChild(proofVideo);

        proofImage = document.createElement("img");
        proofImage.setAttribute("id", "ProofImage " + i);
        proofImage.style.zIndex = "2";
        proofImage.style.maxWidth = "100%";
        proofImage.style.maxHeight = "211px";
        proofImage.style.margin = "auto";
        proofMedia.appendChild(proofImage);

        proofMedia.style.display = "none";

        noteButton = document.createElement("button");
        noteButton.setAttribute("id", "NoteButton " + i);
        noteButton.setAttribute("width", "15px");
        noteButton.setAttribute("height", "15px");
        noteButton.innerHTML = "Note";
        noteButton.setAttribute("class", "SA-DataGrid");

        proofNoteGrid.appendChild(noteButton);

        noteArea = document.createElement("text");
        noteArea.setAttribute("id", "NoteArea " + i);
        noteArea.style.width = "230px";
        noteArea.innerHTML = loopArray.note;
        noteArea.style.background = "linear-gradient(#302b75, #112354)";
        noteArea.style.fontWeight = "bold";
        noteArea.style.color = "white";
        noteArea.style.fontFamily = "'Orbitron', sans-serif";
        noteArea.style.fontSize = "10.2px";
        noteArea.style.top = "20px";
        noteArea.style.zIndex = "2";
        noteArea.style.position = "absolute";
        noteArea.style.overflowWrap = "anywhere";
        noteArea.style.paddingLeft = "5px";
        noteArea.style.paddingRight = "5px";
        noteArea.style.paddingTop = "5px";
        noteArea.style.paddingBottom = "1px";
        noteArea.style.marginRight = "5px";

        if (loopArray.note != "") {
            noteButton.style.color = "white";
            noteButton.style.cursor = "pointer";
            //noteButton.style.background = "#494141b0";
        }

        backSide.appendChild(noteArea);


        noteArea.style.display = "none";

        document.getElementById("ProofButton " + i).onclick = function () {
            if (document.getElementById("ProofURL " + i).innerHTML != "") {
                document.getElementById("NoteArea " + i).style.display = "none";
                tempURL = document.getElementById("ProofURL " + i).innerHTML;
                if (document.getElementById("ProofMedia " + i).style.display == "none") {
                    document.getElementById("ProofMedia " + i).style.display = "block";
                    document.getElementById("ProofURL " + i).style.display = "block";
                    if (tempURL.includes("mp4")) {
                        document.getElementById("ProofImage " + i).style.display = "none";
                        document.getElementById("ProofVideo " + i).style.display = "block";
                        document.getElementById("ProofVideo " + i).setAttribute("src", tempURL);
                    } else {
                        document.getElementById("ProofVideo " + i).style.display = "none";
                        document.getElementById("ProofImage " + i).style.display = "block";
                        document.getElementById("ProofImage " + i).setAttribute("src", tempURL);
                    }
                } else {
                    document.getElementById("ProofMedia " + i).style.display = "none";
                    document.getElementById("ProofURL " + i).style.display = "none";
                }
            }
        }

        document.getElementById("NoteButton " + i).onclick = function () {
            if (document.getElementById("NoteArea " + i).innerHTML != "") {
                document.getElementById("ProofMedia " + i).style.display = "none";
                if (document.getElementById("NoteArea " + i).style.display == "none") {
                    document.getElementById("NoteArea " + i).style.display = "block";
                } else {
                    document.getElementById("NoteArea " + i).style.display = "none";
                }
            }
        }

        newTable = document.createElement("table");
        newTable.style.position = "absolute";
        newTable.style.zIndex = "1";

        newTable.style.top = "16px";
        newTable.style.left = "115px";

        backSide.appendChild(newTable);

        var tr = newTable.insertRow();
        tr.style.display = "table-row";
        var td = tr.insertCell();

        message = document.createElement("img");
        message.src = "https://poketrades.org/Resources/Designs/Message_Icon.png";
        message.setAttribute("height", "9px");
        message.setAttribute("width", "15px");
        message.style.verticalAlign = "inherit";
        message.style.paddingRight = "8px";
        message.style.cursor = "pointer";

        message.onclick = function () {
            if (!ctsSeaching) {
                if (userData != null && userData.user_id != searchData.user_id) {
                    document.getElementById("CommunicationArea").style.display = "block";
                    document.getElementById("ContactsList").style.display = "none";
                    document.getElementById("BlockedList").style.display = "none";
                    document.getElementById("Inbox").style.display = "block";
                    document.querySelector(".CA-UsersInvolved").innerHTML = userData.username + "#" + userData.user_id + " to " + searchData.username + "#" + searchData.user_id;
                    otherParty = searchData.user_id;
                    source = new EventSource("https://poketrades.org/PHP/sse_event.php");
                    source.onmessage = function () {
                        $.post(url + "/PHP/get_messages.php", { token: token, otherParty: searchData.user_id }, UpdateMessages);
                    };
                }
            } else {
                if (userData != null && userData.user_id != arrayData["Rows"][i].user_id) {
                    document.getElementById("CommunicationArea").style.display = "block";
                    document.getElementById("ContactsList").style.display = "none";
                    document.getElementById("BlockedList").style.display = "none";
                    document.getElementById("Inbox").style.display = "block";
                    document.querySelector(".CA-UsersInvolved").innerHTML = userData.username + "#" + userData.user_id + " to " + arrayData["Rows"][i].username + "#" + arrayData["Rows"][i].user_id;
                    otherParty = arrayData["Rows"][i].user_id;
                    source = new EventSource("https://poketrades.org/PHP/sse_event.php");
                    source.onmessage = function () {
                        $.post(url + "/PHP/get_messages.php", { token: token, otherParty: arrayData["Rows"][i].user_id }, UpdateMessages);
                    };
                }
            }

        }

        td.appendChild(message);

        userInfo = document.createElement("Text");
        td.setAttribute("height", "13px");
        userInfo.setAttribute("height", "13px");
        userInfo.style.textWrap = "no-wrap";
        userInfo.style.width = "95px";
        userInfo.style.overflow = "hidden";
        userInfo.style.display = "inline-flex";
        if (currentlyImporting) {
            userInfo.innerHTML = userData.username + "#" + userData.user_id;
        }
        else if (!ctsSeaching) {
            userInfo.innerHTML = searchData.username + "#" + searchData.user_id;
        } else {
            userInfo.innerHTML = loopArray.username + "#" + loopArray.user_id;
            //userInfo.style.cursor = "pointer";
        }
        userInfo.style.fontWeight = "bold";
        userInfo.style.color = "#c2c2c2";
        userInfo.style.fontFamily = "'Orbitron', sans-serif";
        userInfo.style.fontSize = "10.2px";

        /*userInfo.onclick = function () {
            if (ctsSeaching) {
                document.querySelector("#FilterArea").style.display = "none";
                document.querySelector("#DetailsArea").style.display = "none";
                document.querySelector("#BunchArea").style.display = "none";
                document.querySelector("#CTSArea").style.display = "none";
                document.querySelector("#CommunicationArea").style.display = "none";
                document.querySelector("#PanelArea").style.display = "block";
                document.querySelector(".PA-TradeShopPanel").style.display = "block";
                document.querySelector(".PA-Searchbar").value = arrayData["Rows"][i].user_id;
                $('.PA-Searchbar').keyup();

            }
        }*/

        td.appendChild(userInfo);

        var tr = newTable.insertRow();
        tr.style.display = "table-row";
        var td = tr.insertCell();
        statusInfo = document.createElement("Text");
        td.setAttribute("height", "13px");
        statusInfo.setAttribute("height", "13px");
        statusInfo.innerHTML = loopArray.status;
        statusInfo.style.fontWeight = "bold";
        statusInfo.style.color = "#ececec";
        statusInfo.style.fontFamily = "'Orbitron', sans-serif";
        statusInfo.style.fontSize = "10.2px";

        td.appendChild(statusInfo);

        var tr = newTable.insertRow();
        tr.style.display = "table-row";
        var td = tr.insertCell();
        eventInfo = document.createElement("Text");
        td.setAttribute("height", "13px");
        eventInfo.setAttribute("height", "13px");
        eventInfo.innerHTML = loopArray.event_info;
        eventInfo.style.fontWeight = "bold";
        eventInfo.style.color = "#ececec";
        eventInfo.style.fontFamily = "'Orbitron', sans-serif";
        eventInfo.style.fontSize = "10.2px";

        td.appendChild(eventInfo);

        var tr = newTable.insertRow();
        tr.style.display = "table-row";
        var td = tr.insertCell();
        gameObtained = document.createElement("Text");
        td.setAttribute("height", "13px");
        gameObtained.setAttribute("height", "13px");
        gameObtained.innerHTML = loopArray.game_obtained;
        gameObtained.style.fontWeight = "bold";
        gameObtained.style.color = "#ececec";
        gameObtained.style.fontFamily = "'Orbitron', sans-serif";
        gameObtained.style.fontSize = "10.2px";

        td.appendChild(gameObtained);

        var tr = newTable.insertRow();
        tr.style.display = "table-row";
        var td = tr.insertCell();
        howObtained = document.createElement("Text");
        td.setAttribute("height", "13px");
        howObtained.setAttribute("height", "13px");
        howObtained.innerHTML = loopArray.how_obtained;
        howObtained.style.fontWeight = "bold";
        howObtained.style.color = "#ececec";
        howObtained.style.fontFamily = "'Orbitron', sans-serif";
        howObtained.style.fontSize = "10.2px";

        td.appendChild(howObtained);

        dataGrid1 = document.createElement("div");
        dataGrid1.setAttribute("id", "DataGrid1 " + i);
        dataGrid1.style.display = "flex";
        //dataGrid1.style.gridTemplateColumns = "repeat( 3, minmax(80px, 1fr) )";
        dataGrid1.style.position = "absolute";
        dataGrid1.style.top = "130px";
        dataGrid1.style.width = "100%";

        backSide.appendChild(dataGrid1);

        /*gameObtained = document.createElement("button");
        gameObtained.setAttribute("id", "GameObtained " + i);
        gameObtained.setAttribute("class", "SA-DataGrid");
        gameObtained.innerHTML = loopArray.game_obtained;
        gameObtained.style.height = "16px";
        gameObtained.style.width = "65px";

        dataGrid1.appendChild(gameObtained);*/

        gameOT = document.createElement("button");
        gameOT.setAttribute("id", "GameOT " + i);
        gameOT.setAttribute("class", "SA-DataGrid");
        gameOT.innerHTML = loopArray.game_ot;
        gameOT.style.height = "16px";
        gameOT.style.width = "130px";


        dataGrid1.appendChild(gameOT);

        gameID = document.createElement("button");
        gameID.setAttribute("id", "GameID " + i);
        gameID.setAttribute("class", "SA-DataGrid");
        gameID.innerHTML = loopArray.game_id;
        gameID.style.height = "16px";
        gameID.style.width = "55px";

        dataGrid1.appendChild(gameID);

        /*level = document.createElement("button");
        level.setAttribute("id", "Level " + i);
        level.setAttribute("class", "SA-DataGrid");
        if (loopArray.level != null) {
            level.innerHTML = "Lv" + loopArray.level;
        } else {
            level.style.display = "none";
            gameID.style.width = "110px";
        }

        level.style.height = "16px";
        level.style.width = "55px";

        dataGrid1.appendChild(level);*/
        gameID.style.width = "110px";

        dataGrid2 = document.createElement("div");
        dataGrid2.setAttribute("id", "DataGrid2 " + i);
        dataGrid2.style.position = "absolute";
        dataGrid2.style.top = "150px";
        dataGrid2.style.width = "100%";
        dataGrid2.style.display = "flex";

        backSide.appendChild(dataGrid2);

        display = document.createElement("button");
        display.setAttribute("id", "display " + i);
        display.setAttribute("class", "SA-DataGrid");
        display.innerHTML = loopArray.display;
        display.style.minWidth = "60px";
        display.style.height = "16px";
        if (userData == null || userData != null && loopArray.user_id != userData.user_id) {
            display.style.display = "none";
        }

        dataGrid2.appendChild(display);

        bunch = document.createElement("button");
        bunch.setAttribute("id", "Bunch " + i);
        bunch.setAttribute("class", "SA-DataGrid");
        bunch.innerHTML = loopArray.bunch;
        bunch.style.width = "-webkit-fill-available";
        bunch.style.width = "-moz-available";
        bunch.style.height = "16px";

        dataGrid2.appendChild(bunch);

        legacyMoveGrid = document.createElement("div");
        legacyMoveGrid.setAttribute("id", "LegacyMoveGrid " + i);
        legacyMoveGrid.style.display = "grid";
        legacyMoveGrid.style.gridTemplateColumns = "repeat( 2, minmax(120px, 1fr) )";
        legacyMoveGrid.style.position = "absolute";
        legacyMoveGrid.style.top = "180px";
        legacyMoveGrid.style.width = "100%";

        backSide.appendChild(legacyMoveGrid);

        legacyMoveGrid = document.createElement("div");
        legacyMoveGrid.setAttribute("id", "LegacyMoveGrid " + i);
        legacyMoveGrid.style.display = "grid";
        legacyMoveGrid.style.gridTemplateColumns = "repeat( 2, minmax(120px, 1fr) )";
        legacyMoveGrid.style.position = "absolute";
        legacyMoveGrid.style.top = "180px";
        legacyMoveGrid.style.width = "100%";

        backSide.appendChild(legacyMoveGrid);


        legacyMove1 = document.createElement("Text");
        legacyMove1.setAttribute("id", "legacyMove1 " + i);
        legacyMove1.setAttribute("height", "13px");
        legacyMove1.innerHTML = loopArray.legacy_move_1;
        legacyMove1.style.fontWeight = "bold";
        legacyMove1.style.color = "white";
        legacyMove1.style.fontFamily = "'Orbitron', sans-serif";
        legacyMove1.style.fontSize = "11px";
        legacyMove1.style.marginLeft = "2px";
        legacyMove1.style.marginRight = "1px";
        //legacyMove1.style.marginBottom = "4px";
        legacyMove1.style.textAlign = "center";
        legacyMove1.style.paddingTop = "4px";
        legacyMove1.style.paddingBottom = "4px";
        legacyMove1.style.pointerEvents = "none";
        //legacyMove1.style.background = "none";
        //legacyMove1.style.border = "none";

        for (let j = 0; j < allMovesArray.length; j++) {
            if (allMovesArray[j].moves == loopArray.legacy_move_1) {
                //legacyMove1.classList.add("SA-" + allMovesArray[j].move_type + "MoveHolder");
                if (allMovesArray[j].moves == "Hidden Power") {
                    if (loopArray.misc.includes("HP")) {
                        legacyMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(3, loopArray.misc.length)) + "_1.png')";
                    }
                } else if (allMovesArray[j].moves == "Tera Blast") {
                    if (loopArray.misc.includes("Tera")) {
                        legacyMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(5, loopArray.misc.length)) + "_1.png')";
                    }
                } else if (allMovesArray[j].moves == "Raging Bull") {
                    if (loopArray.pokemon.includes("Blaze")) {
                        legacyMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fire_1.png')";
                    } if (loopArray.pokemon.includes("Aqua")) {
                        legacyMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Water_1.png')";
                    } else {
                        legacyMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fighting_1.png')";
                    }
                } else {
                    legacyMove1.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + allMovesArray[j].move_type + "_1.png')";
                }
                legacyMove1.style.backgroundSize = "cover";
            }
        }

        if ((loopArray.legacy_move_1 == "(No Move)" || loopArray.legacy_move_1 == "(Any Move)") && (userData == null || userData != null && loopArray.user_id != userData.user_id || ctsSeaching)) {
            legacyMove1.style.opacity = "0";
        }

        legacyMoveGrid.appendChild(legacyMove1);

        /*legacyMove1.onmouseenter = function () {
            //previousSpace is needed because otherwise if you move the mouse too fast, it will not unhide the element on the onmouseout method.
            //So this just is backup so in case it didn't make it visable already, it will.
            if (previousSpace != null) {
                document.getElementById("legacyMove1 " + correctNum).style.display = "block";
            }
            //"this" is basically necessary for getting the current element as otherwise it will grab the last value of i.
            //In this case we need to get the right number (index) for the movegrid so we can append the dropdown to it which is why all but
            //that number is removed with the substring and set to a variable.

            //The + i works for the innerHTML part, not 100% sure why, but I'll replace it with correct number if that works instead.
            //The if statement makes sure that the user is the owner before they are allowed to make any changes.
            correctNum = this.parentNode.id.substring(15);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("LegacyMoveGrid " + correctNum).insertBefore(reusableMove1Dropdown, document.getElementById("legacyMove1 " + correctNum));
                reusableMove1Dropdown.style.display = "initial";
                reusableMove1Dropdown.value = document.getElementById("legacyMove1 " + i).innerHTML;
                document.getElementById("legacyMove1 " + correctNum).style.display = "none";
            }
        }
        //Here we set the previousSpace to be the correctNum and copy the value from the dropdown to the move.
        reusableMove1Dropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(15);
            previousSpace = correctNum;
            document.getElementById("legacyMove1 " + correctNum).innerHTML = reusableMove1Dropdown.value;
        }*/

        if ((loopArray.legacy_move_1 == "(No Move)" || loopArray.legacy_move_1 == "(Any Move)") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            document.getElementById("legacyMove1 " + i).innerHTML = "";
        }


        legacyMove2 = document.createElement("Text");
        legacyMove2.setAttribute("id", "legacyMove2 " + i);
        legacyMove2.setAttribute("height", "13px");
        legacyMove2.innerHTML = loopArray.legacy_move_2;
        legacyMove2.style.fontWeight = "bold";
        legacyMove2.style.color = "white";
        legacyMove2.style.fontFamily = "'Orbitron', sans-serif";
        legacyMove2.style.fontSize = "11px";
        legacyMove2.style.marginLeft = "1px";
        legacyMove2.style.marginRight = "2px";
        //legacyMove2.style.marginBottom = "4px";
        legacyMove2.style.textAlign = "center";
        legacyMove2.style.paddingTop = "4px";
        legacyMove2.style.paddingBottom = "4px";
        legacyMove2.style.pointerEvents = "none";
        //legacyMove2.style.background = "none";
        //legacyMove2.style.border = "none";

        for (let j = 0; j < allMovesArray.length; j++) {
            if (allMovesArray[j].moves == loopArray.legacy_move_2) {
                //legacyMove2.classList.add("SA-" + allMovesArray[j].move_type + "MoveHolder");
                if (allMovesArray[j].moves == "Hidden Power") {
                    if (loopArray.misc.includes("HP")) {
                        legacyMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(3, loopArray.misc.length)) + "_2.png')";
                    }
                } else if (allMovesArray[j].moves == "Tera Blast") {
                    if (loopArray.misc.includes("Tera")) {
                        legacyMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(5, loopArray.misc.length)) + "_2.png')";
                    }
                } else if (allMovesArray[j].moves == "Raging Bull") {
                    if (loopArray.pokemon.includes("Blaze")) {
                        legacyMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fire_2.png')";
                    } if (loopArray.pokemon.includes("Aqua")) {
                        legacyMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Water_2.png')";
                    } else {
                        legacyMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fighting_2.png')";
                    }
                } else {
                    legacyMove2.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + allMovesArray[j].move_type + "_2.png')";
                }
                legacyMove2.style.backgroundSize = "cover";
            }
        }

        if ((loopArray.legacy_move_2 == "(No Move)" || loopArray.legacy_move_2 == "(Any Move)") && (userData == null || userData != null && loopArray.user_id != userData.user_id || ctsSeaching)) {
            legacyMove2.style.opacity = "0";
        }

        legacyMoveGrid.appendChild(legacyMove2);

        /*legacyMove2.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("legacyMove2 " + correctNum).style.display = "block";
            }

            correctNum = this.parentNode.id.substring(15);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("LegacyMoveGrid " + correctNum).insertBefore(reusableMove2Dropdown, document.getElementById("legacyMove2 " + correctNum));
                reusableMove2Dropdown.style.display = "initial";
                reusableMove2Dropdown.value = document.getElementById("legacyMove2 " + i).innerHTML;
                document.getElementById("legacyMove2 " + correctNum).style.display = "none";
            }
        }

        reusableMove2Dropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(15);
            previousSpace = correctNum;
            document.getElementById("legacyMove2 " + correctNum).innerHTML = reusableMove2Dropdown.value;
        }*/

        if ((loopArray.legacy_move_2 == "(No Move)" || loopArray.legacy_move_2 == "(Any Move)") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            document.getElementById("legacyMove2 " + i).innerHTML = "";
        }


        legacyMove3 = document.createElement("Text");
        legacyMove3.setAttribute("id", "legacyMove3 " + i);
        legacyMove3.setAttribute("height", "13px");
        legacyMove3.innerHTML = loopArray.legacy_move_3;
        legacyMove3.style.fontWeight = "bold";
        legacyMove3.style.color = "white";
        legacyMove3.style.fontFamily = "'Orbitron', sans-serif";
        legacyMove3.style.fontSize = "11px";
        legacyMove3.style.marginLeft = "2px";
        legacyMove3.style.marginRight = "1px";
        //legacyMove3.style.marginBottom = "4px";
        legacyMove3.style.textAlign = "center";
        legacyMove3.style.paddingTop = "4px";
        legacyMove3.style.paddingBottom = "4px";
        legacyMove3.style.pointerEvents = "none";
        //legacyMove3.style.background = "none";
        //legacyMove3.style.border = "none";

        for (let j = 0; j < allMovesArray.length; j++) {
            if (allMovesArray[j].moves == loopArray.legacy_move_3) {
                //legacyMove3.classList.add("SA-" + allMovesArray[j].move_type + "MoveHolder");
                if (allMovesArray[j].moves == "Hidden Power") {
                    if (loopArray.misc.includes("HP")) {
                        legacyMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(3, loopArray.misc.length)) + "_3.png')";
                    }
                } else if (allMovesArray[j].moves == "Tera Blast") {
                    if (loopArray.misc.includes("Tera")) {
                        legacyMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(5, loopArray.misc.length)) + "_3.png')";
                    }
                } else if (allMovesArray[j].moves == "Raging Bull") {
                    if (loopArray.pokemon.includes("Blaze")) {
                        legacyMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fire_3.png')";
                    } if (loopArray.pokemon.includes("Aqua")) {
                        legacyMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Water_3.png')";
                    } else {
                        legacyMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fighting_3.png')";
                    }
                } else {
                    legacyMove3.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + allMovesArray[j].move_type + "_3.png')";
                }
                legacyMove3.style.backgroundSize = "cover";
            }
        }

        if ((loopArray.legacy_move_3 == "(No Move)" || loopArray.legacy_move_3 == "(Any Move)") && (userData == null || userData != null && loopArray.user_id != userData.user_id || ctsSeaching)) {
            legacyMove3.style.opacity = "0";
        }

        legacyMoveGrid.appendChild(legacyMove3);

        /*legacyMove3.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("legacyMove3 " + correctNum).style.display = "block";
            }

            correctNum = this.parentNode.id.substring(15);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("LegacyMoveGrid " + correctNum).insertBefore(reusableMove3Dropdown, document.getElementById("legacyMove3 " + correctNum));
                reusableMove3Dropdown.style.display = "initial";
                reusableMove3Dropdown.value = document.getElementById("legacyMove3 " + i).innerHTML;
                document.getElementById("legacyMove3 " + correctNum).style.display = "none";
            }
        }

        reusableMove3Dropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(15);
            previousSpace = correctNum;
            document.getElementById("legacyMove3 " + correctNum).innerHTML = reusableMove3Dropdown.value;
        }*/

        if ((loopArray.legacy_move_3 == "(No Move)" || loopArray.legacy_move_3 == "(Any Move)") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            document.getElementById("legacyMove3 " + i).innerHTML = "";
        }



        legacyMove4 = document.createElement("Text");
        legacyMove4.setAttribute("id", "legacyMove4 " + i);
        legacyMove4.setAttribute("height", "13px");
        legacyMove4.innerHTML = loopArray.legacy_move_4;
        legacyMove4.style.fontWeight = "bold";
        legacyMove4.style.color = "white";
        legacyMove4.style.fontFamily = "'Orbitron', sans-serif";
        legacyMove4.style.fontSize = "11px";
        legacyMove4.style.marginLeft = "1px";
        legacyMove4.style.marginRight = "2px";
        //legacyMove4.style.marginBottom = "4px";
        legacyMove4.style.textAlign = "center";
        legacyMove4.style.paddingTop = "4px";
        legacyMove4.style.paddingBottom = "4px";
        legacyMove4.style.pointerEvents = "none";
        //legacyMove4.style.background = "none";
        //legacyMove4.style.border = "none";

        for (let j = 0; j < allMovesArray.length; j++) {
            if (allMovesArray[j].moves == loopArray.legacy_move_4) {
                //legacyMove4.classList.add("SA-" + allMovesArray[j].move_type + "MoveHolder");
                if (allMovesArray[j].moves == "Hidden Power") {
                    if (loopArray.misc.includes("HP")) {
                        legacyMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(3, loopArray.misc.length)) + "_4.png')";
                    }
                } else if (allMovesArray[j].moves == "Tera Blast") {
                    if (loopArray.misc.includes("Tera")) {
                        legacyMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + (loopArray.misc.substring(5, loopArray.misc.length)) + "_4.png')";
                    }
                } else if (allMovesArray[j].moves == "Raging Bull") {
                    if (loopArray.pokemon.includes("Blaze")) {
                        legacyMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fire_4.png')";
                    } if (loopArray.pokemon.includes("Aqua")) {
                        legacyMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Water_4.png')";
                    } else {
                        legacyMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/Fighting_4.png')";
                    }
                } else {
                    legacyMove4.style.background = "url('https://poketrades.org/Resources/PokemonContainers/Moves/" + allMovesArray[j].move_type + "_4.png')";
                }
                legacyMove4.style.backgroundSize = "cover";
            }
        }

        if ((loopArray.legacy_move_4 == "(No Move)" || loopArray.legacy_move_4 == "(Any Move)") && (userData == null || userData != null && loopArray.user_id != userData.user_id || ctsSeaching)) {
            legacyMove4.style.opacity = "0";
        }

        legacyMoveGrid.appendChild(legacyMove4);

        /*legacyMove4.onmouseenter = function () {
            if (previousSpace != null) {
                document.getElementById("legacyMove4 " + correctNum).style.display = "block";
            }

            correctNum = this.parentNode.id.substring(15);
            if (userData != null && userData.user_id == loopArray.user_id) {
                document.getElementById("LegacyMoveGrid " + correctNum).insertBefore(reusableMove4Dropdown, document.getElementById("legacyMove4 " + correctNum));
                reusableMove4Dropdown.style.display = "initial";
                reusableMove4Dropdown.value = document.getElementById("legacyMove4 " + i).innerHTML;
                document.getElementById("legacyMove4 " + correctNum).style.display = "none";
            }
        }

        reusableMove4Dropdown.onmouseout = function () {
            correctNum = this.parentNode.id.substring(15);
            previousSpace = correctNum;
            document.getElementById("legacyMove4 " + correctNum).innerHTML = reusableMove4Dropdown.value;
        }*/

        if ((loopArray.legacy_move_4 == "(No Move)" || loopArray.legacy_move_4 == "(Any Move)") && (userData == null || (userData != null && userData.user_id != loopArray.user_id))) {
            document.getElementById("legacyMove4 " + i).innerHTML = "";
        }


        /*legacyMoveGrid.onmouseleave = function () {
            correctNum = this.id.substring(17);
            document.querySelector('#SelectionArea').prepend(reusableLegacyMove1Dropdown);
            document.querySelector('#SelectionArea').prepend(reusableLegacyMove2Dropdown);
            document.querySelector('#SelectionArea').prepend(reusableLegacyMove3Dropdown);
            document.querySelector('#SelectionArea').prepend(reusableLegacyMove4Dropdown);
            reusableLegacyMove1Dropdown.style.display = "none";
            reusableLegacyMove2Dropdown.style.display = "none";
            reusableLegacyMove3Dropdown.style.display = "none";
            reusableLegacyMove4Dropdown.style.display = "none";
            document.getElementById("legacyMove1 " + correctNum).style.display = "block";
            document.getElementById("legacyMove2 " + correctNum).style.display = "block";
            document.getElementById("legacyMove3 " + correctNum).style.display = "block";
            document.getElementById("legacyMove4 " + correctNum).style.display = "block";

        }*/

        backSide.style.display = "none";


        SetImage(theImage, loopArray.pokemon, loopArray.gender, loopArray.shiny, loopArray.game_obtained);

        //Setting up the onclick to open the details area and to set the information required for it.
        newDiv.onclick = function () {
            if (!creationInProgress) {
                //console.log("Clicked");
                if (currentlyRearranging) {
                    /*if (!currentlyRearranging) {
                        if (selectedPokemon != null && pokemonDetails.creation_id == arrayData["Rows"][i].creation_id) {
                            $('.DA-Close').click();
                            CloseDetailOptions();
                            return;
                        } else {
                            CloseDetailOptions();
                            selectedPokemon = document.getElementById("GenerationGridDiv" + (i));
                            pokemonDetails = arrayData["Rows"][i];
    
                            //$.post(url + "/PHP/generate_selection.php", { token: token, searchID: pokemonDetails.user_id, tradeOption: "Looking For" }, MatchMaking);
                            ShowPokemonDetails();
                            document.querySelector("#CTSArea").style.display = "none";
                            document.querySelector("#FilterArea").style.display = "none";
                        }
    
                        if (ctsSeaching) {
                            $.post(url + "/PHP/modify_check.php", { token: token, searchID: 0 }, ModifyCheckViewing);
                        } else {
                            $.post(url + "/PHP/modify_check_viewing.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
                        }
    
                    } else {*/
                    if (oldPosition == "") {
                        movingPokemon = document.getElementById("GenerationGridDiv" + (i));
                        oldPosition = arrayData["Rows"][i].position;
                        tempCreationID = arrayData["Rows"][i].creation_id;
                        document.getElementById("GenerationGridDiv" + (i)).style.opacity = "0.5";
                    } else {
                        newPosition = arrayData["Rows"][i].position;
                        if (oldPosition != newPosition && moving) {
                            movingPokemon = null;
                            selectedPokemon = null;
                            ShowLoading();
                            $.post(url + "/PHP/move_selection.php", { token: token, creationID: tempCreationID, firstSelection: oldPosition, secondSelection: newPosition, tradeOption: tradeOption }, MovePokemon);
                        }

                        if (oldPosition == newPosition && copying) {
                            movingPokemon = null;
                            selectedPokemon = null;
                            ShowLoading();
                            $.post(url + "/PHP/copy_selection.php", { token: token, creationID: tempCreationID, originalPosition: oldPosition, tradeOption: tradeOption }, CopyPokemon);
                        }
                    }
                }
            } else {
                if (placingPokemon) {
                    tempPosition = arrayData["Rows"][i].position - 0.1;
                    document.querySelector(".DA-PlaceInfo").style.display = "none";
                    PlacePokemon();
                }
            }
        }

        /*newDiv.onmouseenter = function () {
            if (!creationInProgress) {
                if (selectedPokemon == null && hoverInfo == true && window.innerWidth > limitWidth) {
                    pokemonDetails = arrayData["Rows"][i];
                    //$.post(url + "/PHP/generate_selection.php", { token: token, searchID: pokemonDetails.user_id, tradeOption: "Looking For" }, MatchMaking);

                    ShowPokemonDetails();
                    document.querySelector("#CTSArea").style.display = "none";

                    if (window.innerWidth < limitWidth) {
                        //Making it so when you click on a mon and Details Area hides it, that mon is scrolled to the new bottom.
                        var imageView = $(".GenerationGridDiv" + (i)).offset();
                        var imageViewTop = Math.abs(imageView.top);
                        console.log(imageViewTop)
                        console.log(document.querySelector('#SelectionArea').clientHeight)
                        if (imageViewTop > document.querySelector('#SelectionArea').clientHeight) {
                            document.getElementById("GenerationGridDiv" + (i)).scrollIntoView(false);
                        } else {
                            console.log("Else " + imageViewTop)
                        }
                    }
                    if (ctsSeaching) {
                        $.post(url + "/PHP/modify_check.php", { token: token, searchID: 0 }, ModifyCheckViewing);
                    } else {
                        $.post(url + "/PHP/modify_check_viewing.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
                    }
                }
            }
        }*/
        if (!creationInProgress) {
            if (pokemonDetails != null && selectedPokemon != null) {
                if (arrayData["Rows"][i].creation_id == pokemonDetails.creation_id) {
                    selectedPokemon = document.getElementById("GenerationGridDiv" + (i));
                }
            }
        }

        if (currentlyImporting) {
            document.getElementById("GeneratedSelection " + i).onerror = function () {
                arrayData["Rows"][i].display = "Private";
            }
            ball.onerror = function () {
                arrayData["Rows"][i].display = "Private";
            }
            gender.onerror = function () {
                arrayData["Rows"][i].display = "Private";
            }
            shiny.onerror = function () {
                arrayData["Rows"][i].display = "Private";
            }
            mint.onerror = function () {
                arrayData["Rows"][i].display = "Private";
            }
            misc.onerror = function () {
                arrayData["Rows"][i].display = "Private";
            }
            marks.onerror = function () {
                arrayData["Rows"][i].display = "Private";
            }
            ribbons.onerror = function () {
                arrayData["Rows"][i].display = "Private";
            }
            if (language.innerHTML == "[UKN]") {
                arrayData["Rows"][i].display = "Private";
            }
        }
    }
    FilterResults();
    HideLoading();
}

function MovePokemon() {
    MoveFinished();
    document.querySelector(".SA-MoveText").innerHTML = "Move";
    currentlyRearranging = false;
    oldPosition = "";
    newPosition = "";
    ShowLoading();
    PostGenerateSelection();
}

function CopyPokemon() {
    CopyFinished();
    document.querySelector(".SA-CopyText").innerHTML = "Copy";
    currentlyRearranging = false;
    oldPosition = "";
    newPosition = "";
    ShowLoading();
    PostGenerateSelection();
}

function MoveBunch() {
    BunchMoveFinished();
    //$("#GridContainer").remove();
    document.querySelector(".PA-ForTradeBunchMove").innerHTML = "Move For Trade Bunches";
    document.querySelector(".PA-LookingForBunchMove").innerHTML = "Move Looking For Bunches";
    document.querySelector("#GeneratedSelection").style.pointerEvents = "initial";
    currentlyRearranging = false;
    oldPosition = "";
    newPosition = "";
    ShowLoading();
    if (tradeOption == "For Trade") {
        $.post(url + "/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: "For Trade", showEmpty: showEmpty }, ForTradeData);
    } else if (tradeOption == "Looking For") {
        $.post(url + "/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption, showEmpty: showEmpty }, LookingForData);
    }
    //$.post(url + "/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, GenerateBunch);
}

function GettingFTBunches(data) {
    arrayInfo = jQuery.parseJSON(data);
    ft = arrayInfo["Rows"];
    if (tempTradeOption == "For Trade") {
        while (bunchSelection.lastElementChild) {
            bunchSelection.removeChild(bunchSelection.lastElementChild);
        }
        for (let i = 0; i < ft.length; i++) {
            const detailsOption = document.createElement("option");
            detailsOption.value = ft[i].name;
            detailsOption.textContent = ft[i].name;
            detailsOption.setAttribute("class", "DA-DropdownOptions");
            bunchSelection.appendChild(detailsOption);
        }
        //This is needed for on mouse over for details or else you get an error since pokemonDetails set to null
        //when details area not open.
        if (pokemonDetails != null) {
            bunchSelection.value = pokemonDetails.bunch;
        }

    }
}

function GettingLFBunches(data) {
    arrayInfo = jQuery.parseJSON(data);
    lf = arrayInfo["Rows"];
    if (tempTradeOption == "Looking For") {
        while (bunchSelection.lastElementChild) {
            bunchSelection.removeChild(bunchSelection.lastElementChild);
        }
        for (let i = 0; i < lf.length; i++) {
            const detailsOption = document.createElement("option");
            detailsOption.value = lf[i].name;
            detailsOption.textContent = lf[i].name;
            detailsOption.setAttribute("class", "DA-DropdownOptions");
            bunchSelection.appendChild(detailsOption);
        }
        //This is needed for on mouse over for details or else you get an error since pokemonDetails set to null
        //when details area not open.
        if (pokemonDetails != null) {
            bunchSelection.value = pokemonDetails.bunch;
        }
    }
}

function ShowPokemonDetails() {
    document.querySelector(".DA-Place").style.display = "none";
    document.querySelector(".DA-PlaceInfo").style.display = "none";
    document.querySelector(".DA-Delete").style.display = "block";
    tempUserID = "";
    if (ctsSeaching) {

    }
    else if (userData != null) {
        tempUserID = userData.user_id;
    }
    if (pokemonDetails != null) {
        creationID = pokemonDetails.creation_id;
    }
    /*if (document.querySelector("#DetailsArea").style.display != "block" && document.querySelector("#FilterArea").style.display != "block" && document.querySelector("#InformationArea").style.display != "block") {
        document.querySelector("#DetailsArea").style.display = "block";
        document.querySelector("#PanelArea").style.display = "none";
    }*/
    document.querySelector("#DetailsArea").style.display = "block";
    document.querySelector(".DA-DefaultView").style.display = "block";
    document.querySelector(".DA-CompetitiveView").style.display = "block";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#InformationArea").style.display = "none";
    document.querySelector("#CommunicationArea").style.display = "none";

    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        document.querySelector(".DA-DefaultView").style.pointerEvents = "none";

        bunchSelection.style.appearance = "none";
        displaySelection.style.appearance = "none";
        pokemonSelection.style.appearance = "none";
        abilitySelection.style.appearance = "none";
        natureSelection.style.appearance = "none";
        statusSelection.style.appearance = "none";
        eventSelection.style.appearance = "none";
        howObtainedSelection.style.appearance = "none";
        gameObtainedSelection.style.appearance = "none";
        ivHpSelection.style.appearance = "none";
        ivAttSelection.style.appearance = "none";
        ivDefSelection.style.appearance = "none";
        ivSpaSelection.style.appearance = "none";
        ivSpdSelection.style.appearance = "none";
        ivSpeSelection.style.appearance = "none";
        evHpSelection.style.appearance = "none";
        evAttSelection.style.appearance = "none";
        evDefSelection.style.appearance = "none";
        evSpaSelection.style.appearance = "none";
        evSpdSelection.style.appearance = "none";
        evSpeSelection.style.appearance = "none";
        move1Selection.style.appearance = "none";
        move2Selection.style.appearance = "none";
        move3Selection.style.appearance = "none";
        move4Selection.style.appearance = "none";
        legacyMove1Selection.style.appearance = "none";
        legacyMove2Selection.style.appearance = "none";
        legacyMove3Selection.style.appearance = "none";
        legacyMove4Selection.style.appearance = "none";
    } else {
        document.querySelector(".DA-DefaultView").style.pointerEvents = "initial";

        bunchSelection.style.appearance = "auto";
        displaySelection.style.appearance = "auto";
        pokemonSelection.style.appearance = "auto";
        abilitySelection.style.appearance = "auto";
        natureSelection.style.appearance = "auto";
        statusSelection.style.appearance = "auto";
        eventSelection.style.appearance = "auto";
        howObtainedSelection.style.appearance = "auto";
        gameObtainedSelection.style.appearance = "auto";
        ivHpSelection.style.appearance = "auto";
        ivAttSelection.style.appearance = "auto";
        ivDefSelection.style.appearance = "auto";
        ivSpaSelection.style.appearance = "auto";
        ivSpdSelection.style.appearance = "auto";
        ivSpeSelection.style.appearance = "auto";
        evHpSelection.style.appearance = "auto";
        evAttSelection.style.appearance = "auto";
        evDefSelection.style.appearance = "auto";
        evSpaSelection.style.appearance = "auto";
        evSpdSelection.style.appearance = "auto";
        evSpeSelection.style.appearance = "auto";
        move1Selection.style.appearance = "auto";
        move2Selection.style.appearance = "auto";
        move3Selection.style.appearance = "auto";
        move4Selection.style.appearance = "auto";
        legacyMove1Selection.style.appearance = "auto";
        legacyMove2Selection.style.appearance = "auto";
        legacyMove3Selection.style.appearance = "auto";
        legacyMove4Selection.style.appearance = "auto";
    }

    tempTradeOption = "";
    tempTradeOption = pokemonDetails.trade_option;

    document.querySelector(".DA-Username").innerHTML = pokemonDetails.username + "#" + pokemonDetails.user_id;
    //document.querySelector(".DA-Username").innerHTML = searchData.username + "#" + pokemonDetails.user_id;

    if (tempUserID == pokemonDetails.user_id) {
        bunchSelection.value = pokemonDetails.bunch;
    }
    if (!showingGiveaway) {
        $.post(url + "/PHP/generate_bunch_selection.php", { token: token, searchID: pokemonDetails.user_id, tradeOption: pokemonDetails.trade_option, showEmpty: "Yes" }, GettingFTBunches);

        $.post(url + "/PHP/generate_bunch_selection.php", { token: token, searchID: pokemonDetails.user_id, tradeOption: pokemonDetails.trade_option, showEmpty: "Yes" }, GettingLFBunches);
    }

    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        document.querySelector(".DA-TemplateSection").style.display = "none";
    } else {
        document.querySelector(".DA-TemplateSection").style.display = "table";
    }

    templateName.value = null;
    document.querySelector(".DA-TemplateDropdown").value = "(No Template)";

    document.querySelector(".DA-LangIcon").innerHTML = "[" + pokemonDetails.language + "]";
    howObtainedSelection.value = pokemonDetails.how_obtained;
    gameObtainedSelection.value = pokemonDetails.game_obtained;
    gameObtainedValue = pokemonDetails.game_obtained;

    displaySelection.value = pokemonDetails.display;
    //Commented Out due to redesign
    /*document.querySelector(".DA-DisplayRow").style.display == "table-row";
    
    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        document.querySelector(".DA-DisplayRow").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-DisplayRow").style.visibility = "unset";
    }*/

    gen6Data = pokemonDetails.gen6_availability;
    gen7Data = pokemonDetails.gen7_availability;
    gen8Data = pokemonDetails.gen8_availability;
    homeData = pokemonDetails.home_availability;
    if (pokemonDetails.gen6_availability == "Not Available") {
        gen6Data = "Not Available";
        document.querySelector(".DA-Gen6").style.color = "#dc7878";
    } else {
        gen6Data = "Available";
        document.querySelector(".DA-Gen6").style.color = "#74db96";
    }

    if (pokemonDetails.gen7_availability == "Not Available") {
        gen7Data = "Not Available";
        document.querySelector(".DA-Gen7").style.color = "#dc7878";
    } else {
        gen7Data = "Available";
        document.querySelector(".DA-Gen7").style.color = "#74db96";
    }

    if (pokemonDetails.gen8_availability == "Not Available") {
        gen8Data = "Not Available";
        document.querySelector(".DA-Gen8").style.color = "#dc7878";
    } else {
        gen8Data = "Available";
        document.querySelector(".DA-Gen8").style.color = "#74db96";
    }

    if (pokemonDetails.home_availability == "Not Available") {
        homeData = "Not Available";
        document.querySelector(".DA-Home").style.color = "#dc7878";
    } else {
        homeData = "Available";
        document.querySelector(".DA-Home").style.color = "#74db96";
    }

    ballData = pokemonDetails.pokeball;
    document.querySelector(".DA-BallIcon").setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/" + pokemonDetails.pokeball + ".png");
    genderData = pokemonDetails.gender;
    document.querySelector(".DA-GenderIcon").setAttribute("src", url + "/Resources/Misc/" + pokemonDetails.gender + ".png");
    shinyData = pokemonDetails.shiny;
    document.querySelector(".DA-ShinyIcon").setAttribute("src", url + "/Resources/Misc/" + pokemonDetails.shiny + ".png");
    mintData = pokemonDetails.mint;
    document.querySelector(".DA-MintIcon").setAttribute("src", url + "/Resources/Misc/" + pokemonDetails.mint + ".png");
    miscData = pokemonDetails.misc;
    document.querySelector(".DA-MiscIcon").setAttribute("src", url + "/Resources/Misc/" + pokemonDetails.misc + ".png");
    //markData = pokemonDetails.mark;
    //document.querySelector(".DA-MarkIcon").setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Marks/" + pokemonDetails.mark + ".png");
    langData = pokemonDetails.language;
    document.querySelector(".DA-LangIcon").innerHTML = "[" + langData + "]";

    var cols = document.getElementsByClassName("Marks");
    document.querySelector(".DA-MarkIcon").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Marks/(No Mark).png";
    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        for (i = 0; i < cols.length; i++) {
            cols[i].style.background = "linear-gradient(#302b75, #112354)";
            cols[i].style.display = "none";
        }
    } else {
        for (i = 0; i < cols.length; i++) {
            cols[i].style.background = "linear-gradient(#302b75, #112354)";
            cols[i].style.display = "block";
        }
    }
    markData = new Array(54);
    markString = "";
    if (pokemonDetails.mark != null) {
        var arrayTempMarks = pokemonDetails.mark.split(",");
        for (let i = 0; i < allMarksArray.length; i++) {
            for (let j = 0; j < arrayTempMarks.length; j++) {
                if (allMarksArray[i] == arrayTempMarks[j]) {
                    markData[i] = allMarksArray[i];
                    document.querySelector(".DA-MarkIcon").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Marks/" + allMarksArray[i] + ".png";
                    document.getElementById("DA-" + allMarksArray[i]).style.background = "#1e5578";
                    document.getElementById("DA-" + allMarksArray[i]).style.display = "block";
                    //console.log(markData);
                }
            }
        }
    }

    var cols = document.getElementsByClassName("Ribbons");
    document.querySelector(".DA-RibbonIcon").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Ribbons/(No Ribbon).png";
    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        for (i = 0; i < cols.length; i++) {
            cols[i].style.background = "linear-gradient(#302b75, #112354)";
            cols[i].style.display = "none";
        }
    } else {
        for (i = 0; i < cols.length; i++) {
            cols[i].style.background = "linear-gradient(#302b75, #112354)";
            cols[i].style.display = "block";
        }
    }
    ribbonData = new Array(103);
    ribbonString = "";
    if (pokemonDetails.ribbons != null) {
        var arrayTempRibbons = pokemonDetails.ribbons.split(",");
        for (let i = 0; i < ribbonOptionsArray.length; i++) {
            for (let j = 0; j < arrayTempRibbons.length; j++) {
                if (ribbonOptionsArray[i] == arrayTempRibbons[j]) {
                    ribbonData[i] = ribbonOptionsArray[i];
                    document.querySelector(".DA-RibbonIcon").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Ribbons/" + ribbonOptionsArray[i] + ".png";
                    document.getElementById("DA-" + ribbonOptionsArray[i]).style.background = "#1e5578";
                    document.getElementById("DA-" + ribbonOptionsArray[i]).style.display = "block";
                    //console.log(ribbonData);
                }
            }
        }
    }

    pokemonData = pokemonDetails.pokemon;
    pokemonSelection.value = pokemonDetails.pokemon;

    PokemonValidation();
    AbilityOptions();

    abilitySelection.value = pokemonDetails.ability;
    if (pokemonDetails.ability == "(Any Ability)" && tempUserID != pokemonDetails.user_id ||
        pokemonDetails.ability == "(Any Ability)" && detailsLocked) {
        document.querySelector(".DA-AbilityRow").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-AbilityRow").style.visibility = "unset";
    }

    nicknameSelection.value = pokemonDetails.nickname;
    if (pokemonDetails.nickname == "" && tempUserID != pokemonDetails.user_id ||
        pokemonDetails.nickname == "" && detailsLocked) {
        document.querySelector(".DA-Nickname").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-Nickname").style.visibility = "unset";
    }

    natureSelection.value = pokemonDetails.nature;
    if (pokemonDetails.nature == "(Any Nature)" && tempUserID != pokemonDetails.user_id ||
        pokemonDetails.nature == "(Any Nature)" && detailsLocked) {
        document.querySelector(".DA-NatureRow").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-NatureRow").style.visibility = "unset";
    }



    otSelection.value = pokemonDetails.game_ot;
    //Commented Out due to redesign

    /*if (pokemonDetails.game_ot == "" && tempUserID != pokemonDetails.user_id ||
        pokemonDetails.game_ot == "" && detailsLocked) {
        document.querySelector(".DA-OTRow").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-OTRow").style.visibility = "unset";
    }*/

    idSelection.value = pokemonDetails.game_id;
    //Commented Out due to redesign
    /*
    if (pokemonDetails.game_id == "" && tempUserID != pokemonDetails.user_id ||
        pokemonDetails.game_id == "" && detailsLocked) {
        document.querySelector(".DA-IDRow").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-IDRow").style.visibility = "unset";
    }*/

    statusSelection.value = pokemonDetails.status;
    //Commented Out due to redesign
    /*document.querySelector(".DA-StatHolder").style.display = "flex";
    if (pokemonDetails.status == "(Any Status)" && tempUserID != pokemonDetails.user_id ||
        pokemonDetails.status == "(Any Status)" && detailsLocked) {
        document.querySelector(".DA-StatusRow").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-StatusRow").style.visibility = "unset";
    }

    document.querySelector(".DA-EventRow").style.display == "table-row";*/
    eventSelection.value = pokemonDetails.event_info;
    //Commented Out due to redesign
    /*if (pokemonDetails.event_info == "(Any/No Event)" && tempUserID != pokemonDetails.user_id ||
        pokemonDetails.event_info == "(Any/No Event)" && detailsLocked ||
        pokemonDetails.event_info == "(Not Event)" && tempUserID != pokemonDetails.user_id ||
        pokemonDetails.event_info == "(Not Event)" && detailsLocked) {
        document.querySelector(".DA-EventRow").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-EventRow").style.visibility = "unset";
    }

    if (document.querySelector(".DA-DisplayRow").style.visibility == "hidden" && document.querySelector(".DA-EventRow").style.visibility == "hidden") {
        document.querySelector(".DA-DisplayRow").style.display = "none";
        document.querySelector(".DA-EventRow").style.display = "none";
    } else {
        document.querySelector(".DA-DisplayRow").style.display = "table-row";
        document.querySelector(".DA-EventRow").style.display = "table-row";
    }

    document.querySelector(".DA-StatHolder").style.visibility = "unset";*/
    ivHpSelection.value = pokemonDetails.iv_hp;
    ivAttSelection.value = pokemonDetails.iv_att;
    ivDefSelection.value = pokemonDetails.iv_def;
    ivSpaSelection.value = pokemonDetails.iv_spa;
    ivSpdSelection.value = pokemonDetails.iv_spd;
    ivSpeSelection.value = pokemonDetails.iv_spe;

    //Commented Out due to redesign
    /*if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (pokemonDetails.iv_hp == "X" && pokemonDetails.iv_att == "X" && pokemonDetails.iv_def == "X" &&
            pokemonDetails.iv_spa == "X" && pokemonDetails.iv_spd == "X" && pokemonDetails.iv_spe == "X") {

            document.querySelector(".DA-RowIVs").style.display = "none";
        } else {
            document.querySelector(".DA-RowIVs").style.display = "table-row";
        }
    } else {
        document.querySelector(".DA-RowIVs").style.display = "table-row";
    }*/

    evHpSelection.value = pokemonDetails.ev_hp;
    evAttSelection.value = pokemonDetails.ev_att;
    evDefSelection.value = pokemonDetails.ev_def;
    evSpaSelection.value = pokemonDetails.ev_spa;
    evSpdSelection.value = pokemonDetails.ev_spd;
    evSpeSelection.value = pokemonDetails.ev_spe;

    evHpSelection.style.display = "block";
    evAttSelection.style.display = "block";
    evDefSelection.style.display = "block";
    evSpaSelection.style.display = "block";
    evSpdSelection.style.display = "block";
    evSpeSelection.style.display = "block";

    if (tempUserID != pokemonDetails.user_id || detailsLocked || ctsSeaching) {
        if (evHpSelection.value == 0) {
            evHpSelection.style.display = "none";
        }

        if (evAttSelection.value == 0) {
            evAttSelection.style.display = "none";
        }

        if (evDefSelection.value == 0) {
            evDefSelection.style.display = "none";
        }

        if (evSpaSelection.value == 0) {
            evSpaSelection.style.display = "none";
        }

        if (evSpdSelection.value == 0) {
            evSpdSelection.style.display = "none";
        }

        if (evSpeSelection.value == 0) {
            evSpeSelection.style.display = "none";
        }
    }

    //Commented Out due to redesign
    /*
    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (pokemonDetails.ev_hp == "X" && pokemonDetails.ev_att == "X" && pokemonDetails.ev_def == "X" &&
            pokemonDetails.ev_spa == "X" && pokemonDetails.ev_spd == "X" && pokemonDetails.ev_spe == "X") {

            document.querySelector(".DA-RowEVs").style.display = "none";
        } else {

            document.querySelector(".DA-RowEVs").style.display = "table-row";
        }
    } else {
        document.querySelector(".DA-RowEVs").style.display = "table-row";
    }

    if (document.querySelector(".DA-RowEVs").style.display == "none" && document.querySelector(".DA-RowIVs").style.display == "none") {
        document.querySelector(".DA-RowEVs").style.display = "table-row";
        document.querySelector(".DA-RowIVs").style.display = "table-row";
        document.querySelector(".DA-StatHolder").style.display = "none";
    }

    document.querySelector(".DA-MovesHolder").style.display = "block";
    document.querySelector(".DA-Move1").style.display = "block";
    document.querySelector(".DA-Move2").style.display = "block";
    document.querySelector(".DA-Move3").style.display = "block";
    document.querySelector(".DA-Move4").style.display = "block";

    document.querySelector(".DA-LegacyMovesHolder").style.display = "block";
    document.querySelector(".DA-LegacyMove1").style.display = "block";
    document.querySelector(".DA-LegacyMove2").style.display = "block";
    document.querySelector(".DA-LegacyMove3").style.display = "block";
    document.querySelector(".DA-LegacyMove4").style.display = "block";*/

    move1Selection.value = pokemonDetails.move_1;
    move2Selection.value = pokemonDetails.move_2;
    move3Selection.value = pokemonDetails.move_3;
    move4Selection.value = pokemonDetails.move_4;

    move1Null = true;
    move2Null = true;
    move3Null = true;
    move4Null = true;

    if (tempUserID != pokemonDetails.user_id || detailsLocked || ctsSeaching) {
        if (pokemonDetails.move_1 == "(Any Move)" || pokemonDetails.move_1 == "(No Move)") {
            move1Selection.value = "";
        }

        if (pokemonDetails.move_2 == "(Any Move)" || pokemonDetails.move_2 == "(No Move)") {
            move2Selection.value = "";
        }

        if (pokemonDetails.move_3 == "(Any Move)" || pokemonDetails.move_3 == "(No Move)") {
            move3Selection.value = "";
        }

        if (pokemonDetails.move_4 == "(Any Move)" || pokemonDetails.move_4 == "(No Move)") {
            move4Selection.value = "";
        }
    }

    if (pokemonDetails.move_1 == "(Any Move)" || pokemonDetails.move_1 == "(No Move)") {
        move1Null = false;
    }

    if (pokemonDetails.move_2 == "(Any Move)" || pokemonDetails.move_2 == "(No Move)") {
        move2Null = false;
    }

    if (pokemonDetails.move_3 == "(Any Move)" || pokemonDetails.move_3 == "(No Move)") {
        move3Null = false;
    }

    if (pokemonDetails.move_4 == "(Any Move)" || pokemonDetails.move_4 == "(No Move)") {
        move4Null = false;
    }

    $(move1Selection).change();
    $(move2Selection).change();
    $(move3Selection).change();
    $(move4Selection).change();

    //Commented Out due to redesign
    /*
    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (!move1Null && !move2Null && !move3Null && !move1Null) {
            document.querySelector(".DA-MovesHolder").style.display = "none";
        } else if (!move3Null && !move4Null) {
            document.querySelector(".DA-Move3").style.display = "none";
            document.querySelector(".DA-Move4").style.display = "none";
        }
    }*/


    legacyMove1Selection.value = pokemonDetails.legacy_move_1;
    legacyMove2Selection.value = pokemonDetails.legacy_move_2;
    legacyMove3Selection.value = pokemonDetails.legacy_move_3;
    legacyMove4Selection.value = pokemonDetails.legacy_move_4;

    legacyMove1Null = true;
    legacyMove2Null = true;
    legacyMove3Null = true;
    legacyMove4Null = true;

    if (tempUserID != pokemonDetails.user_id || detailsLocked || ctsSeaching) {
        if (pokemonDetails.legacy_move_1 == "(Any Move)" || pokemonDetails.legacy_move_1 == "(No Move)") {
            legacyMove1Selection.value = "";
        }

        if (pokemonDetails.legacy_move_2 == "(Any Move)" || pokemonDetails.legacy_move_2 == "(No Move)") {
            legacyMove2Selection.value = "";
        }

        if (pokemonDetails.legacy_move_3 == "(Any Move)" || pokemonDetails.legacy_move_3 == "(No Move)") {
            legacyMove3Selection.value = "";
        }

        if (pokemonDetails.legacy_move_4 == "(Any Move)" || pokemonDetails.legacy_move_4 == "(No Move)") {
            legacyMove4Selection.value = "";
        }
    }

    if (pokemonDetails.legacy_move_1 == "(Any Move)" || pokemonDetails.legacy_move_1 == "(No Move)") {
        legacyMove1Null = false;
    }

    if (pokemonDetails.legacy_move_2 == "(Any Move)" || pokemonDetails.legacy_move_2 == "(No Move)") {
        legacyMove2Null = false;
    }

    if (pokemonDetails.legacy_move_3 == "(Any Move)" || pokemonDetails.legacy_move_3 == "(No Move)") {
        legacyMove3Null = false;
    }

    if (pokemonDetails.legacy_move_4 == "(Any Move)" || pokemonDetails.legacy_move_4 == "(No Move)") {
        legacyMove4Null = false;
    }

    $(legacyMove1Selection).change();
    $(legacyMove2Selection).change();
    $(legacyMove3Selection).change();
    $(legacyMove4Selection).change();

    //Commented Out due to redesign
    /*
    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (!legacyMove1Null && !legacyMove2Null && !legacyMove3Null && !legacyMove4Null) {
            document.querySelector(".DA-LegacyMovesHolder").style.display = "none";
        } else if (!legacyMove3Null && !legacyMove4Null) {
            document.querySelector(".DA-LegacyMove3").style.display = "none";
            document.querySelector(".DA-LegacyMove4").style.display = "none";
        }
    }*/

    proofSelection.value = pokemonDetails.proof;

    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (pokemonDetails.proof == "") {
            document.querySelector(".DA-Proof").style.display = "none";
        } else {
            document.querySelector(".DA-Proof").style.display = "flex";
        }
        DisplayProof();
    } else {
        document.querySelector(".DA-Proof").style.display = "flex";
        DisplayProof();
    }

    if (detailsLocked || ctsSeaching) {
        document.querySelector(".DA-ProofURL").style.textDecoration = "underline";
    } else {
        document.querySelector(".DA-ProofURL").style.textDecoration = "unset";
    }

    document.querySelector(".DA-Note").style.display = "flex";
    noteSelection.value = pokemonDetails.note;
    noteSelection.style.height = "";
    noteSelection.style.height = noteSelection.scrollHeight + "px";


    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (pokemonDetails.note == "") {
            document.querySelector(".DA-Note").style.display = "none";
        } else {
            document.querySelector(".DA-Note").style.display = "flex";
            noteSelection.value = "Note: " + pokemonDetails.note;
            noteSelection.style.height = "";
            noteSelection.style.height = noteSelection.scrollHeight + "px";
        }
    }

    levelSelection.value = pokemonDetails.level;
    itemDropdown.value = pokemonDetails.item;
    nestInput.value = pokemonDetails.nest;

    /*if (competitiveView) {
        if (levelSelection.value == "" && itemDropdown.value == "(No Item)" && nestInput.value == "") {
            document.querySelector(".DA-CompetitiveView").style.display = "none";
            document.querySelector("#DA-NestHolder").style.display = "none";
        } else {
            document.querySelector(".DA-CompetitiveView").style.display = "block";
            document.querySelector("#DA-NestHolder").style.display = "block";
        }
    } else {
        document.querySelector(".DA-CompetitiveView").style.display = "none";
        document.querySelector("#DA-NestHolder").style.display = "none";
    }

    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (competitiveView) {
            document.querySelector(".DA-DefaultView").style.display = "none";
            document.querySelector(".DA-CompetitiveView").style.display = "none";
        } else {
            //document.querySelector(".DA-CompetitiveViewOptions").style.display = "block";
        }
    }*/

    //08/05/2023 commeneted out, revisit later.
    /*if (competitiveView) {
        if (tempUserID != pokemonDetails.user_id || detailsLocked) {
            if (levelSelection.value != "" && nestInput.value != "") {
                document.querySelector(".DA-DefaultView").style.display = "none";
                document.querySelector(".DA-CompetitiveView").style.display = "block";
                document.querySelector("#DA-NestHolder").style.display = "block";
            } else {
                document.querySelector(".DA-DefaultView").style.display = "block";
                document.querySelector(".DA-CompetitiveView").style.display = "none";
                document.querySelector("#DA-NestHolder").style.display = "none";
            }
        } else {
            document.querySelector(".DA-DefaultView").style.display = "block";
            document.querySelector(".DA-CompetitiveView").style.display = "block";
            document.querySelector("#DA-NestHolder").style.display = "block";
        }
    } else {
        document.querySelector(".DA-DefaultView").style.display = "block";
        document.querySelector(".DA-CompetitiveView").style.display = "none";
        document.querySelector("#DA-NestHolder").style.display = "none";
    }

    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (competitiveView) {
            document.querySelector(".DA-CompetitiveViewOptions").style.display = "none";
        }
    } else {
        if (competitiveView) {
            document.querySelector(".DA-CompetitiveViewOptions").style.display = "block";
        }
    }

    if (competitiveView) {
        //If the view is locked, it will generate the nest will all pokemon inside but if not it leaves the selected pokemon out of it.
        if (tempUserID != pokemonDetails.user_id || detailsLocked && levelSelection.value != "" && nestInput.value != "") {
            $.post(url + "/PHP/generate_nest_selection.php", { userID: pokemonDetails.user_id, creationID: pokemonDetails.creation_id, tradeOption: tradeOption, nest: pokemonDetails.nest }, GenerateNest);
        }
        else {
            $.post(url + "/PHP/generate_nest_selection.php", { userID: pokemonDetails.user_id, creationID: pokemonDetails.creation_id, tradeOption: tradeOption, nest: pokemonDetails.nest, duplicate: "No" }, GenerateNest);
        }

    }*/
    if (pokemonDetails.nest != null) {
        $.post(url + "/PHP/generate_nest_selection.php", { userID: pokemonDetails.user_id, creationID: pokemonDetails.creation_id, tradeOption: tradeOption, nest: pokemonDetails.nest }, GenerateNest);
    }


    UpdateEVs();
    SetStatColour();
    SetIVColours();
}

function ShowAllDropdowns() {
    //Commented Out due to redesign
    /*document.querySelector(".DA-DisplayRow").style.visibility = "unset";
    document.querySelector(".DA-DisplayRow").style.display = "table-row";*/
    document.querySelector(".DA-AbilityRow").style.visibility = "unset";
    nicknameSelection.style.visibility = "unset";
    document.querySelector(".DA-NatureRow").style.visibility = "unset";
    //Commented Out due to redesign
    /*
    document.querySelector(".DA-OTRow").style.visibility = "unset";
    document.querySelector(".DA-IDRow").style.visibility = "unset";
    document.querySelector(".DA-StatusRow").style.visibility = "unset";
    document.querySelector(".DA-EventRow").style.visibility = "unset";
    document.querySelector(".DA-EventRow").style.display = "table-row";
    document.querySelector(".DA-StatHolder").style.visibility = "unset";
    document.querySelector(".DA-StatHolder").style.display = "flex";
    document.querySelector(".DA-RowIVs").style.display = "table-row";
    document.querySelector(".DA-RowEVs").style.display = "table-row";
    document.querySelector(".DA-MovesHolder").style.display = "block";
    document.querySelector(".DA-Move1").style.display = "block";
    document.querySelector(".DA-Move2").style.display = "block";
    document.querySelector(".DA-Move3").style.display = "block";
    document.querySelector(".DA-Move4").style.display = "block";
    document.querySelector(".DA-LegacyMovesHolder").style.display = "block";
    document.querySelector(".DA-LegacyMove1").style.display = "block";
    document.querySelector(".DA-LegacyMove2").style.display = "block";
    document.querySelector(".DA-LegacyMove3").style.display = "block";
    document.querySelector(".DA-LegacyMove4").style.display = "block";*/
    document.querySelector(".DA-Proof").style.display = "flex";
    document.querySelector(".DA-Note").style.display = "flex";
    document.querySelector(".DA-ProofURL").style.textDecoration = "unset";
    document.querySelector(".DA-TemplateSection").style.display = "table";

    bunchSelection.style.appearance = "auto";
    displaySelection.style.appearance = "auto";
    pokemonSelection.style.appearance = "auto";
    abilitySelection.style.appearance = "auto";
    natureSelection.style.appearance = "auto";
    statusSelection.style.appearance = "auto";
    eventSelection.style.appearance = "auto";
    howObtainedSelection.style.appearance = "auto";
    gameObtainedSelection.style.appearance = "auto";
    ivHpSelection.style.appearance = "auto";
    ivAttSelection.style.appearance = "auto";
    ivDefSelection.style.appearance = "auto";
    ivSpaSelection.style.appearance = "auto";
    ivSpdSelection.style.appearance = "auto";
    ivSpeSelection.style.appearance = "auto";
    evHpSelection.style.appearance = "auto";
    evAttSelection.style.appearance = "auto";
    evDefSelection.style.appearance = "auto";
    evSpaSelection.style.appearance = "auto";
    evSpdSelection.style.appearance = "auto";
    evSpeSelection.style.appearance = "auto";
    evHpSelection.style.display = "block";
    evAttSelection.style.display = "block";
    evDefSelection.style.display = "block";
    evSpaSelection.style.display = "block";
    evSpdSelection.style.display = "block";
    evSpeSelection.style.display = "block";
    move1Selection.style.appearance = "auto";
    move2Selection.style.appearance = "auto";
    move3Selection.style.appearance = "auto";
    move4Selection.style.appearance = "auto";
    legacyMove1Selection.style.appearance = "auto";
    legacyMove2Selection.style.appearance = "auto";
    legacyMove3Selection.style.appearance = "auto";
    legacyMove4Selection.style.appearance = "auto";

    /*if (competitiveView) {
        document.querySelector(".DA-CompetitiveView").display = "block";
        document.querySelector("#DA-NestHolder").style.display = "block";
    } else {
        document.querySelector(".DA-CompetitiveView").display = "none";
        document.querySelector("#DA-NestHolder").style.display = "none";
    }*/
}

function GenerateNest(data) {
    $("#DA-NestHolder").remove();
    if (data == null) {
        return;
    }
    nestData = jQuery.parseJSON(data);
    nestHolder = document.createElement("div");
    nestHolder.setAttribute("id", "DA-NestHolder");
    document.getElementById("DetailsArea").appendChild(nestHolder);

    for (let i = 0; i < nestData["Rows"].length; i++) {
        competitiveDetails = nestData["Rows"][i];

        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "GeneratedNest " + (i));
        newDiv.setAttribute("class", "DA-CompetitiveHolder " + (i));

        /*if (!creationInProgress && i == 0 && detailsLocked == true) {
            newDiv.style.borderColor = "#616e7a";
        }*/
        if (!creationInProgress && i == 0) {
            newDiv.style.borderColor = "#616e7a";
        }

        document.querySelector("#DA-NestHolder").appendChild(newDiv);

        otherDiv = document.createElement("div");
        otherDiv.style.paddingRight = "10px";
        otherDiv.style.paddingLeft = "10px";

        newDiv.appendChild(otherDiv);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompPokemonText");
        text.innerHTML = competitiveDetails.pokemon;

        otherDiv.appendChild(text);

        img = document.createElement("img");
        img.setAttribute("class", "DA-CompPokemonImage");

        SetImage(img, competitiveDetails.pokemon, competitiveDetails.gender, competitiveDetails.shiny, competitiveDetails.game_obtained);

        otherDiv.appendChild(img);

        img.onclick = function () {
            if (userData.user_id != competitiveDetails.user_id /*|| detailsLocked*/) {
                selectedPokemon = document.getElementById("GeneratedNest " + (i));
                pokemonDetails = nestData["Rows"][i];
                //AssigningOutline();
                ShowPokemonDetails();
            }
        }

        otherDiv = document.createElement("div");
        otherDiv.style.paddingRight = "10px";

        newDiv.appendChild(otherDiv);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompText");
        text.innerHTML = competitiveDetails.ability;

        otherDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompText");
        text.innerHTML = competitiveDetails.nature;

        otherDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompText");
        text.innerHTML = competitiveDetails.item;

        otherDiv.appendChild(text);

        ivDiv = document.createElement("div");
        ivDiv.setAttribute("class", "DA-CompIVEVHolder");
        otherDiv.appendChild(ivDiv);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.iv_hp;

        ivDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = ".";

        ivDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.iv_att;

        ivDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = ".";

        ivDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.iv_def;

        ivDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = ".";

        ivDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.iv_spa;

        ivDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = ".";

        ivDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.iv_spd;

        ivDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = ".";

        ivDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.iv_spe;

        ivDiv.appendChild(text);

        evDiv = document.createElement("div");
        evDiv.setAttribute("class", "DA-CompIVEVHolder");
        otherDiv.appendChild(evDiv);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.ev_hp;

        evDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = ".";

        evDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.ev_att;

        evDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = ".";

        evDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.ev_def;

        evDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = ".";

        evDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.ev_spa;

        evDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = ".";

        evDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.ev_spd;

        evDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = ".";

        evDiv.appendChild(text);

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompIVText");
        text.innerHTML = competitiveDetails.ev_spe;

        evDiv.appendChild(text);

        otherDiv = document.createElement("div");

        newDiv.appendChild(otherDiv);

        newTable = document.createElement("table");
        newTable.setAttribute("class", "DA-CompIconHolder");
        otherDiv.appendChild(newTable);

        tr = newTable.insertRow();
        newTable.appendChild(tr);

        td = tr.insertCell();

        text = document.createElement("text");
        text.setAttribute("class", "DA-CompLevelText");
        text.innerHTML = competitiveDetails.level;

        td.appendChild(text);

        td = tr.insertCell();

        gender = document.createElement("img");
        gender.setAttribute("class", "DA-CompIcon");
        gender.setAttribute("src", url + "/Resources/Misc/" + competitiveDetails.gender + ".png");

        td.appendChild(gender);

        shiny = document.createElement("img");
        shiny.setAttribute("class", "DA-CompIcon");
        shiny.setAttribute("src", url + "/Resources/Misc/" + competitiveDetails.shiny + ".png");

        td.appendChild(shiny);

        misc = document.createElement("img");
        misc.setAttribute("class", "DA-CompIcon");
        misc.setAttribute("src", url + "/Resources/Misc/" + competitiveDetails.misc + ".png");

        td.appendChild(misc);

        moveDiv = document.createElement("div");
        moveDiv.style.paddingRight = "10px";

        otherDiv.appendChild(moveDiv);

        otherMoveDiv = document.createElement("div");
        otherMoveDiv.setAttribute("class", "DA-CompMove");
        otherMoveDiv.style.display = "flex";

        moveDiv.appendChild(otherMoveDiv);

        img = document.createElement("img");
        img.setAttribute("class", "DA-MoveTypeIcon");
        //img.setAttribute("src", "https://poketrades.org/Resources/Misc/HP Grass.png");

        otherMoveDiv.appendChild(img);

        text = document.createElement("text");
        text.innerHTML = competitiveDetails.move_1;

        for (let j = 0; j < allMovesArray.length; j++) {
            if (text.innerHTML == allMovesArray[j].moves) {
                if (text.innerHTML == "(Any Move)" || text.innerHTML == "(No Move)") {
                    img.style.visibility = "hidden";
                } else if (text.innerHTML == "Hidden Power" && competitiveDetails.misc.includes("Tera ")) {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/" + competitiveDetails.misc + ".png");
                } else if (text.innerHTML == "Tera Blast" && competitiveDetails.misc.includes("Tera ")) {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/HP " + (competitiveDetails.misc.substring(5, competitiveDetails.length)) + ".png");
                } else if (text.innerHTML == "Raging Bull") {
                    if (competitiveDetails.pokemon == "Tauros-Paldea") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Fighting.png");
                    } else if (competitiveDetails.pokemon == "Tauros-PaldeaBlaze") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Fire.png");
                    } else if (competitiveDetails.pokemon == "Tauros-PaldeaAqua") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Water.png");
                    } else {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Normal.png");
                    }
                } else {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/HP " + allMovesArray[j].move_type + ".png");
                }
            }
        }

        otherMoveDiv.appendChild(text);

        otherMoveDiv = document.createElement("div");
        otherMoveDiv.setAttribute("class", "DA-CompMove");
        otherMoveDiv.style.display = "flex";

        moveDiv.appendChild(otherMoveDiv);

        img = document.createElement("img");
        img.setAttribute("class", "DA-MoveTypeIcon");
        img.setAttribute("src", "https://poketrades.org/Resources/Misc/HP Grass.png");

        otherMoveDiv.appendChild(img);

        text = document.createElement("text");
        text.innerHTML = competitiveDetails.move_2;

        for (let j = 0; j < allMovesArray.length; j++) {
            if (text.innerHTML == allMovesArray[j].moves) {
                if (text.innerHTML == "(Any Move)" || text.innerHTML == "(No Move)") {
                    img.style.visibility = "hidden";
                } else if (text.innerHTML == "Hidden Power" && competitiveDetails.misc.includes("Tera ")) {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/" + competitiveDetails.misc + ".png");
                } else if (text.innerHTML == "Tera Blast" && competitiveDetails.misc.includes("Tera ")) {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/HP " + (competitiveDetails.misc.substring(5, competitiveDetails.length)) + ".png");
                } else if (text.innerHTML == "Raging Bull") {
                    if (competitiveDetails.pokemon == "Tauros-Paldea") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Fighting.png");
                    } else if (competitiveDetails.pokemon == "Tauros-PaldeaBlaze") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Fire.png");
                    } else if (competitiveDetails.pokemon == "Tauros-PaldeaAqua") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Water.png");
                    } else {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Normal.png");
                    }
                } else {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/HP " + allMovesArray[j].move_type + ".png");
                }
            }
        }

        otherMoveDiv.appendChild(text);

        otherMoveDiv = document.createElement("div");
        otherMoveDiv.setAttribute("class", "DA-CompMove");
        otherMoveDiv.style.display = "flex";

        moveDiv.appendChild(otherMoveDiv);

        img = document.createElement("img");
        img.setAttribute("class", "DA-MoveTypeIcon");
        img.setAttribute("src", "https://poketrades.org/Resources/Misc/HP Grass.png");

        otherMoveDiv.appendChild(img);

        text = document.createElement("text");
        text.innerHTML = competitiveDetails.move_3;

        for (let j = 0; j < allMovesArray.length; j++) {
            if (text.innerHTML == allMovesArray[j].moves) {
                if (text.innerHTML == "(Any Move)" || text.innerHTML == "(No Move)") {
                    img.style.visibility = "hidden";
                } else if (text.innerHTML == "Hidden Power" && competitiveDetails.misc.includes("Tera ")) {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/" + competitiveDetails.misc + ".png");
                } else if (text.innerHTML == "Tera Blast" && competitiveDetails.misc.includes("Tera ")) {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/HP " + (competitiveDetails.misc.substring(5, competitiveDetails.length)) + ".png");
                } else if (text.innerHTML == "Raging Bull") {
                    if (competitiveDetails.pokemon == "Tauros-Paldea") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Fighting.png");
                    } else if (competitiveDetails.pokemon == "Tauros-PaldeaBlaze") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Fire.png");
                    } else if (competitiveDetails.pokemon == "Tauros-PaldeaAqua") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Water.png");
                    } else {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Normal.png");
                    }
                } else {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/HP " + allMovesArray[j].move_type + ".png");
                }
            }
        }

        otherMoveDiv.appendChild(text);

        otherMoveDiv = document.createElement("div");
        otherMoveDiv.setAttribute("class", "DA-CompMove");
        otherMoveDiv.style.display = "flex";

        moveDiv.appendChild(otherMoveDiv);

        img = document.createElement("img");
        img.setAttribute("class", "DA-MoveTypeIcon");
        img.setAttribute("src", "https://poketrades.org/Resources/Misc/HP Grass.png");

        otherMoveDiv.appendChild(img);

        text = document.createElement("text");
        text.innerHTML = competitiveDetails.move_4;

        for (let j = 0; j < allMovesArray.length; j++) {
            if (text.innerHTML == allMovesArray[j].moves) {
                if (text.innerHTML == "(Any Move)" || text.innerHTML == "(No Move)") {
                    img.style.visibility = "hidden";
                } else if (text.innerHTML == "Hidden Power" && competitiveDetails.misc.includes("Tera ")) {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/" + competitiveDetails.misc + ".png");
                } else if (text.innerHTML == "Tera Blast" && competitiveDetails.misc.includes("Tera ")) {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/HP " + (competitiveDetails.misc.substring(5, competitiveDetails.length)) + ".png");
                } else if (text.innerHTML == "Raging Bull") {
                    if (competitiveDetails.pokemon == "Tauros-Paldea") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Fighting.png");
                    } else if (competitiveDetails.pokemon == "Tauros-PaldeaBlaze") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Fire.png");
                    } else if (competitiveDetails.pokemon == "Tauros-PaldeaAqua") {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Water.png");
                    } else {
                        img.style.visibility = "unset";
                        img.setAttribute("src", url + "/Resources/Misc/HP Normal.png");
                    }
                } else {
                    img.style.visibility = "unset";
                    img.setAttribute("src", url + "/Resources/Misc/HP " + allMovesArray[j].move_type + ".png");
                }
            }
        }

        otherMoveDiv.appendChild(text);
    }
}

function SetImage(image, imageName, gender, shiny, gameObtained) {

    var triedOnce = false;
    if (iconExclusivesArray.includes(imageName) && imageName != "Egg-Manaphy") {
        if (allBallsArray.includes(imageName) || imageName == "Egg") {
            image.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Small Icons/" + imageName + ".png");
        }
        else if (imageName.includes("HP")) {
            image.setAttribute("src", url + "/Resources/Misc/" + imageName + ".png");
        }
        else if (imageName.includes("Tera ")) {
            image.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Small Icons/Tera Icons/" + imageName + ".png");
        }
        else if (imageName.includes(" Ribbon")) {
            image.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Small Icons/Ribbons/" + imageName + ".png");
        }
        else if (imageName.includes(" Mark")) {
            image.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Small Icons/Marks/" + imageName + ".png");
        }
        else {
            if (!shiny.includes("Normal")) {
                image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
            } else {
                image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
            }
        }
    }


    else if (shinyLockedArray.includes(imageName) && !shiny.includes("Normal")) {
        image.setAttribute("src", url + "/Resources/Fennel2.png");
    }

    else if (shinyExceptionArray.includes(imageName) && !shiny.includes("Normal")) {
        if (imageName.includes("Minior")) {
            if (gender.includes("Genderless") || gender.includes("Any Gender")) {
                if (generationalSprites) {
                    image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/Minior.png");
                } else {
                    image.setAttribute("src", url + "/Resources/HomeShiny/Minior.png");
                }
            } else {
                image.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        } else if (imageName.includes("Alcremie-Strawberry")) {
            if (gender.includes("Female") || gender.includes("Any Gender")) {
                image.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Strawberry.png");
            } else {
                image.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (imageName.includes("Alcremie-Berry")) {
            if (gender.includes("Female") || gender.includes("Any Gender")) {
                image.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Berry.png");
            } else {
                image.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (imageName.includes("Alcremie-Love")) {
            if (gender.includes("Female") || gender.includes("Any Gender")) {
                image.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Love.png");
            } else {
                image.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (imageName.includes("Alcremie-Star")) {
            if (gender.includes("Female") || gender.includes("Any Gender")) {
                image.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Star.png");
            } else {
                image.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (imageName.includes("Alcremie-Clover")) {
            if (gender.includes("Female") || gender.includes("Any Gender")) {
                image.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Clover.png");
            } else {
                image.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (imageName.includes("Alcremie-Flower")) {
            if (gender.includes("Female") || gender.includes("Any Gender")) {
                image.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Flower.png");
            } else {
                image.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (imageName.includes("Alcremie-Ribbon")) {
            if (gender.includes("Female") || gender.includes("Any Gender")) {
                image.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Ribbon.png");
            } else {
                image.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
    }

    else if (genderlessPokemonArray.includes(imageName)) {
        if (gender.includes("Genderless") || gender.includes("(Any Gender)")) {
            if (shiny.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + ".png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        if (!triedOnce) {
                            triedOnce = true;
                            image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                        }
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                }

            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9Shiny/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        if (!triedOnce) {
                            triedOnce = true;
                            image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                        }
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                }
            }

        } else {
            image.setAttribute("src", url + "/Resources/Fennel2.png");
        }
    }
    else if (maleOnlyPokemonArray.includes(imageName)) {
        if (gender.includes("Male") || gender.includes("(Any Gender)")) {
            if (shiny.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + ".png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        if (!triedOnce) {
                            triedOnce = true;
                            image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                        }
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                }

            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9Shiny/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        if (!triedOnce) {
                            triedOnce = true;
                            image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                        }
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                }
            }
        } else {
            image.setAttribute("src", url + "/Resources/Fennel2.png");
        }
    }
    else if (femaleOnlyPokemonArray.includes(imageName)) {
        if (gender.includes("Female") || gender.includes("(Any Gender)")) {
            if (shiny.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + ".png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        if (!triedOnce) {
                            triedOnce = true;
                            image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                        }
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                }

            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9Shiny/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        if (!triedOnce) {
                            triedOnce = true;
                            image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                        }
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                }
            }

        } else {
            image.setAttribute("src", url + "/Resources/Fennel2.png");
        }
    }
    else if (genderDifferencesArray.includes(imageName)) {
        if (gender.includes("Male") || gender.includes("(Any Gender)")) {
            if (shiny.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + "-Male.png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        if (imageName == "Oinkologne") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9/" + imageName + "-Male.png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9/" + imageName + ".png");
                        }
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Male.png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Male.png");
                }
                image.onerror = function () {
                    if (!triedOnce) {
                        triedOnce = true;
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Male.png");
                    }
                }
            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + "-Male.png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        if (imageName == "Oinkologne") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9Shiny/" + imageName + "-Male.png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9Shiny/" + imageName + ".png");
                        }
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Male.png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Male.png");
                }
                image.onerror = function () {
                    if (!triedOnce) {
                        triedOnce = true;
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Male.png");
                    }
                }
            }

        }
        else if (gender.includes("Female") || gender.includes("(Any Gender)")) {
            if (shiny.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + "-.png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + "-Female.png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        if (imageName == "Oinkologne") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9/" + imageName + "-Female.png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9/" + imageName + ".png");
                        }
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Female.png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Female.png");
                }
                image.onerror = function () {
                    if (!triedOnce) {
                        triedOnce = true;
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Female.png");
                    }
                }
            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + "-Female.png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        if (imageName == "Oinkologne") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9Shiny/" + imageName + "-Male.png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9Shiny/" + imageName + ".png");
                        }
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Female.png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Female.png");
                }
                image.onerror = function () {
                    if (!triedOnce) {
                        triedOnce = true;
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Female.png");
                    }
                }
            }

        } else {
            image.setAttribute("src", url + "/Resources/Fennel2.png");
        }
    }
    //For Normal pokemon without any gender differences or specific genders
    else if (!genderlessPokemonArray.includes(imageName)) {
        if (!gender.includes("Genderless") || gender.includes("(Any Gender)")) {
            if (shiny.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + ".png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        if (!triedOnce) {
                            triedOnce = true;
                            image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                        }
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                }
            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/G/B/Y" || gameObtained == "Red" || gameObtained == "Green" || gameObtained == "Blue" || gameObtained == "Yellow") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C" || gameObtained == "Gold" || gameObtained == "Silver" || gameObtained == "Crystal") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD" || gameObtained == "Ruby" || gameObtained == "Sapphire" || gameObtained == "Emerald" || gameObtained == "Fire Red" || gameObtained == "Leaf Green" || gameObtained == "Colosseum" || gameObtained == "XD Gale of Darkness") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS" || gameObtained == "Diamond" || gameObtained == "Pearl" || gameObtained == "Platinum" || gameObtained == "Heart Gold" || gameObtained == "Soul Silver") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2" || gameObtained == "Black" || gameObtained == "White" || gameObtained == "Black 2" || gameObtained == "White 2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y" || gameObtained == "X" || gameObtained == "Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS" || gameObtained == "Omega Ruby" || gameObtained == "Alpha Sapphire") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM" || gameObtained == "Sun" || gameObtained == "Moon" || gameObtained == "Ultra Sun" || gameObtained == "Ultra Moon") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE" || gameObtained == "Let's Go Pikachu" || gameObtained == "Let's Go Eevee") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP" || gameObtained == "Brilliant Diamond" || gameObtained == "Shining Pearl") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA" || gameObtained == "Legends Arceus") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "S/V" || gameObtained == "Scarlet" || gameObtained == "Violet") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen9Images/Gen9Shiny/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        if (!triedOnce) {
                            triedOnce = true;
                            image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                        }
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                }
            }

        } else {
            image.setAttribute("src", url + "/Resources/Fennel2.png");
        }
    } else {
        image.setAttribute("src", url + "/Resources/Fennel2.png");
    }

    if (!allIconsArray.includes(imageName)) {
        image.setAttribute("src", url + "/Resources/Fennel2.png");
    }
}

function SortBy(a, b) {
    if (selectionOrderDropdown1.value == "(Position)") {
        /*if (a["position"] === b["position"]) {
            return 1;
        }
        else {
            return (a["position"] < b["position"]) ? -1 : 1;
        }*/
    }
    else if (selectionOrderDropdown1.value == "Creation") {
        if (a["creation_id"] === b["creation_id"]) {
            return 1;
        }
        else {
            return (a["creation_id"] < b["creation_id"]) ? -1 : 1;
        }
    }
    else if (selectionOrderDropdown1.value == "A-Z") {
        if (a["pokemon"] === b["pokemon"]) {
            return 1;
        }
        else {
            return (a["pokemon"] < b["pokemon"]) ? -1 : 1;
        }
    }
    else if (selectionOrderDropdown1.value == "Pokeball") {
        if (a["pokeball"] === b["pokeball"]) {
            return 1;
        }
        else {
            return (a["pokeball"] < b["pokeball"]) ? -1 : 1;
        }
    } else if (selectionOrderDropdown1.value == "Pokedex") {
        let aDex;
        let bDex;
        for (let j = 0; j < pokemonDataArray.length; j++) {
            if (pokemonDataArray[j].pokemon == a["pokemon"]) {
                aDex = pokemonDataArray[j].pokedex;
            }

            if (pokemonDataArray[j].pokemon == b["pokemon"]) {
                bDex = pokemonDataArray[j].pokedex;
            }
        }
        if (aDex === bDex) {
            return 1;
        }
        else {
            return (aDex < bDex) ? -1 : 1;
        }
    }
}

function SortBy2(a, b) {
    if (selectionOrderDropdown2.value == "(Position)") {
        /*if (a["position"] === b["position"]) {
            return 1;
        }
        else {
            return (a["position"] < b["position"]) ? -1 : 1;
        }*/
    }
    else if (selectionOrderDropdown2.value == "Creation") {
        if (a["creation_id"] === b["creation_id"]) {
            return 1;
        }
        else {
            return (a["creation_id"] < b["creation_id"]) ? -1 : 1;
        }
    }
    else if (selectionOrderDropdown2.value == "A-Z") {
        if (a["pokemon"] === b["pokemon"]) {
            return 1;
        }
        else {
            return (a["pokemon"] < b["pokemon"]) ? -1 : 1;
        }
    }
    else if (selectionOrderDropdown2.value == "Pokeball") {
        if (a["pokeball"] === b["pokeball"]) {
            return 1;
        }
        else {
            return (a["pokeball"] < b["pokeball"]) ? -1 : 1;
        }
    } else if (selectionOrderDropdown2.value == "Pokedex") {
        let aDex;
        let bDex;
        for (let j = 0; j < pokemonDataArray.length; j++) {
            if (pokemonDataArray[j].pokemon == a["pokemon"]) {
                aDex = pokemonDataArray[j].pokedex;
            }

            if (pokemonDataArray[j].pokemon == b["pokemon"]) {
                bDex = pokemonDataArray[j].pokedex;
            }
        }
        if (aDex === bDex) {
            return 1;
        }
        else {
            return (aDex < bDex) ? -1 : 1;
        }
    }
}