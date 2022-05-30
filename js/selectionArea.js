console.log(40 + 8 + 23 - 10);

const observer = lozad();
observer.observe();

document.querySelector(".SA-Searchbar").value = "";
var searchPokemonText = document.querySelector(".SA-Searchbar");
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

document.querySelector('#DetailsArea').onmouseover = function () {
    if (!creationInProgress) {
        if (selectedPokemon == null && hoverInfo == true) {
            $('.DA-Close').click();
        }
    }
}

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
    document.querySelector("#DetailsArea").style.display = "none";
    document.querySelector("#SelectionArea").style.height = "100%";
    document.querySelector("#SelectionArea").style.display = "none";
    document.querySelector("#CTSArea").style.display = "none";
    ResetFilters();
    document.querySelector("#MainArea").style.display = "block";
    document.querySelector("#BunchArea").style.display = "none";
    document.querySelector("#FilterArea").style.display = "none";
    document.querySelector("#InformationArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "block";
    if (document.querySelector(".PA-TradeShopPanel").style.display == "none") {
        document.querySelector(".PA-WhatsNewPanel").style.display = "block";
    }
    document.querySelector(".DA-Place").style.pointerEvents = "initial";
    document.querySelector(".DA-Place").innerHTML = "Place";
    CreationReset();
    BunchReset();
    creationInProgress = false;
    placingPokemon = false;
    searchPokemonText.value = "";
    ctsSeaching = false;
});

$('.SA-CreateButton').click(function () {
    //document.querySelector("#SelectionArea").style.width = "100%"
    document.querySelector("#FilterArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#InformationArea").style.display = "none";
    document.querySelector("#DetailsArea").style.display = "block";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "none";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "#313131";
    document.querySelector(".SA-MoveButton").style.pointerEvents = "none";
    document.querySelector(".SA-MoveButton").style.backgroundColor = "#313131";
    document.querySelector(".SA-CopyButton").style.pointerEvents = "none";
    document.querySelector(".SA-CopyButton").style.backgroundColor = "#313131";
    document.querySelector(".DA-Place").style.pointerEvents = "initial";
    document.querySelector(".DA-Place").style.background = "linear-gradient(0deg, rgb(149 149 149 / 30%), rgb(255 255 255 / 20%))";
    document.querySelector(".DA-Delete").style.pointerEvents = "none";
    document.querySelector(".DA-Delete").style.background = "#313131";
    document.querySelector(".DA-Lock").style.pointerEvents = "none";
    document.querySelector(".DA-Lock").style.background = "#313131";
    detailsLocked = false;
    document.querySelector(".DA-Lock").innerHTML = "Lock";
    document.querySelector(".DA-DetailsData").style.pointerEvents = "initial";

    ShowAllDropdowns();

    //So it doesn't add to an already existing row
    creationID = "";
    creationInProgress = true;
    CreationReset();
    selectedPokemon = null;
    pokemonDetails = null;
    AssigningOutline();
    var cols = document.getElementsByClassName("insideDetails" + (storedValue));
    for (j = 0; j < cols.length; j++) {
        cols[j].style.display = "none";
    }
    templateSelection.value = "(No Template)";

    if (document.querySelector(".SA-Bunch").innerHTML != "All Pokemon") {
        bunchSelection.value = document.querySelector(".SA-Bunch").innerHTML;
    }
});

$('.SA-MoveButton').click(function () {
    if (currentlyRearranging == false) {
        moving = true;
        currentlyRearranging = true;
        document.querySelector(".SA-MoveButton").innerHTML = "Cancel";
        //OpacityHalf();
        MoveStarted();
    } else {
        moving = false;
        currentlyRearranging = false;
        if (movingPokemon == selectedPokemon && movingPokemon != null) {
            movingPokemon.style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
            movingPokemon.style.backgroundColor = "#2E2D2D";
        } else if (movingPokemon != null) {
            movingPokemon.style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
            movingPokemon.style.backgroundColor = "#084f65";
        }
        movingPokemon = null;
        oldPosition = "";
        newPosition = "";
        document.querySelector(".SA-MoveButton").innerHTML = "Move";
        //OpacityFull();
        //AssigningOutline();
        RemoveBunchOutline();
        MoveFinished();
    }

});

$('.SA-CopyButton').click(function () {
    if (currentlyRearranging == false) {
        currentlyRearranging = true;
        copying = true;
        document.querySelector(".SA-CopyButton").innerHTML = "Cancel";
        //OpacityHalf();
        CopyStarted();
    } else {
        copying = false;
        currentlyRearranging = false;
        if (movingPokemon == selectedPokemon && movingPokemon != null) {
            movingPokemon.style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
            movingPokemon.style.backgroundColor = "#2E2D2D";
        } else if (movingPokemon != null) {
            movingPokemon.style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
            movingPokemon.style.backgroundColor = "#084f65";
        }
        movingPokemon = null;
        oldPosition = "";
        newPosition = "";
        document.querySelector(".SA-CopyButton").innerHTML = "Copy";
        //OpacityFull();
        //AssigningOutline();
        RemoveBunchOutline();
        CopyFinished();
    }

});

$('.SA-FiltersButton').click(function () {
    $.post(url + "/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
    //document.querySelector("#SelectionArea").style.width = "100%";
    document.querySelector("#FilterArea").style.display = "block";
    document.querySelector("#DetailsArea").style.display = "none";
    document.querySelector("#BunchArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
});

$('.SA-SelectionHelp').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".SelectionHelp").style.display = "block";
});

function AssigningOutline() {
    //Makes sure arrayData isn't null so an error doesn't get brought up in specific cases like on the bunch area
    if (arrayData != null) {
        for (let i = 0; i < arrayData["Rows"].length; i++) {
            //document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 5px #0096c3";
            if (currentlyRearranging == true && movingPokemon == document.getElementById("GenerationGridDiv" + (i))) {

            }
            //if no pokemon is selected, then no pokemon need an outline
            else if (selectedPokemon == null) {
                document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#084f65";
                var cols = document.getElementsByClassName("insideDetails" + (i));
                document.getElementById("GenerationGridDiv" + (i)).style.height = "100px";
            }
            //If it finds a generated row that has the same creation id as the current viewing id, it gives that div a outline
            else if (arrayData["Rows"][i].creation_id == pokemonDetails.creation_id) {
                selectedPokemon = document.getElementById("GenerationGridDiv" + (i));
                document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#2E2D2D";
                var cols = document.getElementsByClassName("insideDetails" + (i));
                for (j = 0; j < cols.length; j++) {
                    cols[j].style.display = "flex";
                }
                document.getElementById("GenerationGridDiv" + (i)).style.height = "200px";
            } else {
                document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#084f65";
                document.getElementById("GenerationGridDiv" + (i)).style.height = "100px";
            }
        }
    }
}

function MoveStarted() {
    moving = true;
    document.querySelector(".SA-MainMenu").style.pointerEvents = "none";
    document.querySelector(".SA-MainMenu").style.backgroundColor = "#313131";
    document.querySelector(".SA-CopyButton").style.pointerEvents = "none";
    document.querySelector(".SA-CopyButton").style.backgroundColor = "#313131";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "none";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "#313131";
    document.querySelector(".SA-FiltersButton").style.pointerEvents = "none";
    document.querySelector(".SA-FiltersButton").style.backgroundColor = "#313131";
    document.querySelector(".SA-Searchbar").disabled = true;
    document.querySelector(".PA-Searchbar").disabled = true;
    document.querySelector("#PanelArea").style.pointerEvents = "none";
}

function MoveFinished() {
    moving = false;
    document.querySelector(".SA-MainMenu").style.pointerEvents = "initial";
    document.querySelector(".SA-MainMenu").style.backgroundColor = "#6e6e6e";
    document.querySelector(".SA-CopyButton").style.pointerEvents = "initial";
    document.querySelector(".SA-CopyButton").style.backgroundColor = "#6e6e6e";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "initial";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "#6e6e6e";
    document.querySelector(".SA-FiltersButton").style.pointerEvents = "initial";
    if (filtersApplied) {
        document.querySelector(".SA-FiltersButton").style.backgroundColor = "#9c6f9b";
    } else {
        document.querySelector(".SA-FiltersButton").style.backgroundColor = "#6e6e6e";
    }
    document.querySelector(".SA-Searchbar").disabled = false;
    document.querySelector("#GeneratedSelection").style.pointerEvents = "initial";
    document.querySelector(".PA-Searchbar").disabled = false;
    document.querySelector("#PanelArea").style.pointerEvents = "initial";
    //OpacityFull();
}

function CopyStarted() {
    copying = true;
    document.querySelector(".SA-MainMenu").style.pointerEvents = "none";
    document.querySelector(".SA-MainMenu").style.backgroundColor = "#313131";
    document.querySelector(".SA-MoveButton").style.pointerEvents = "none";
    document.querySelector(".SA-MoveButton").style.backgroundColor = "#313131";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "none";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "#313131";
    document.querySelector(".SA-FiltersButton").style.pointerEvents = "none";
    document.querySelector(".SA-FiltersButton").style.backgroundColor = "#313131";
    document.querySelector(".SA-Searchbar").disabled = true;
    document.querySelector(".PA-Searchbar").disabled = true;
    document.querySelector("#PanelArea").style.pointerEvents = "none";
}

function CopyFinished() {
    copying = false;
    document.querySelector(".SA-MainMenu").style.pointerEvents = "initial";
    document.querySelector(".SA-MainMenu").style.backgroundColor = "#6e6e6e";
    document.querySelector(".SA-MoveButton").style.pointerEvents = "initial";
    document.querySelector(".SA-MoveButton").style.backgroundColor = "#6e6e6e";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "initial";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "#6e6e6e";
    document.querySelector(".SA-FiltersButton").style.pointerEvents = "initial";
    if (filtersApplied) {
        document.querySelector(".SA-FiltersButton").style.backgroundColor = "#9c6f9b";
    } else {
        document.querySelector(".SA-FiltersButton").style.backgroundColor = "#6e6e6e";
    }
    document.querySelector(".SA-Searchbar").disabled = false;
    document.querySelector("#GeneratedSelection").style.pointerEvents = "initial";
    document.querySelector(".PA-Searchbar").disabled = false;
    document.querySelector("#PanelArea").style.pointerEvents = "initial";
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
    if (bunchname != "") {
        //Showing the bunch name and setting up the ability to exit out the bunch.
        document.querySelector(".SA-Bunch").style.opacity = "100%";
    }

    //Using Jquery to parse the data and getting the length.
    arrayData = jQuery.parseJSON(data);

    //Removing the grid container so I can create a new one and making it a child of GeneratedSelection.
    $("#GridContainer").remove();
    gridTest = document.createElement("div");
    gridTest.setAttribute("id", "GridContainer");
    document.getElementById("GeneratedSelection").appendChild(gridTest);
    if (ctsSeaching) {
        console.log(arrayData["Rows"].length + " Pokemon in CTS Search");
    } else {
        console.log(arrayData["Rows"].length + " Pokemon in " + bunchname);
    }

    for (let i = 0; i < arrayData["Rows"].length; i++) {

        //Creating newDivs for each pokemon and making them children of the GridContainer
        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "GenerationGridDiv" + (i));
        newDiv.setAttribute("class", "Lozad");
        //newDiv.className += "Lozad";
        document.getElementById("GridContainer").appendChild(newDiv);
        newDiv.setAttribute("width", "100");
        //newDiv.setAttribute("height", "100");

        if (insideDetails) {
            //document.getElementById("GenerationGridDiv" + (i)).style.height = "200px";
        }

        document.getElementById("GenerationGridDiv" + (i)).style.overflow = "hidden";
        document.getElementById("GenerationGridDiv" + (i)).style.display = "flex";
        document.getElementById("GenerationGridDiv" + (i)).style.position = "relative";
        document.getElementById("GenerationGridDiv" + (i)).style.cursor = "pointer";
        /*document.getElementById("GenerationGridDiv" + (i)).style.backgroundImage = "url('https://poketrades.org/Resources/Designs/Unselected Holder.png')";
        document.getElementById("GenerationGridDiv" + (i)).style.backgroundSize = "contain";*/
        document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
        document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#084f65";
        document.getElementById("GenerationGridDiv" + (i)).style.borderTopLeftRadius = "15px";
        document.getElementById("GenerationGridDiv" + (i)).style.borderTopRightRadius = "15px";
        document.getElementById("GenerationGridDiv" + (i)).style.borderBottomLeftRadius = "15px";
        document.getElementById("GenerationGridDiv" + (i)).style.borderBottomRightRadius = "15px";

        //Storing each pokemon in a array.
        loopArray = [];
        loopArray = arrayData["Rows"][i];


        //Setting the Image
        theImage = document.createElement("IMG");
        theImage.setAttribute("id", "GeneratedSelection " + (i));
        theImage.setAttribute("width", "100");
        theImage.setAttribute("height", "100");
        newDiv.appendChild(theImage);

        if (dexNumber) {
            newTable = document.createElement("table");
            newTable.style.position = "absolute";
            newTable.style.zIndex = "1";

            newDiv.style.width = "100%";
            newTable.style.left = "5px";
            var tr = newTable.insertRow();
            tr.style.marginBottom = "10px";
            tr.style.display = "flex";

            var td = tr.insertCell();
            dex = document.createElement("Text");
            td.setAttribute("height", "auto");
            td.setAttribute("id", "Dex" + (i));
            dex.style.height = "13px";

            for (let j = 0; j < pokemonDataArray.length; j++) {
                if (loopArray.pokemon == "Meowstic") {
                    for (let k = 0; k < pokemonDataArray.length; k++) {
                        if (loopArray.pokemon + "-" + loopArray.gender == pokemonDataArray[k].pokemon) {
                            dex.innerHTML = pokemonDataArray[k].pokedex;
                        }
                    }
                }

                if (loopArray.pokemon == "Indeedee") {
                    for (let k = 0; k < pokemonDataArray.length; k++) {
                        if (loopArray.pokemon + "-" + loopArray.gender == pokemonDataArray[k].pokemon) {
                            dex.innerHTML = pokemonDataArray[k].pokedex;
                        }
                    }
                }

                if (loopArray.pokemon == pokemonDataArray[j].pokemon) {
                    dex.innerHTML = pokemonDataArray[j].pokedex;
                }
            }

            dex.style.fontWeight = "bold";
            dex.style.color = "white";
            dex.style.fontFamily = "Arial, Helvetica, sans-serif";
            dex.style.fontSize = "60%";
            //dex.style.display = "inline-flex";

            td.appendChild(dex);

            newDiv.appendChild(newTable);

        }


        newTable = document.createElement("table");
        newTable.style.position = "absolute";
        newTable.style.zIndex = "1";

        //newTable.style.bottom = "8px";
        newTable.style.top = "unset";
        gridTest.style.gridTemplateColumns = "repeat( auto-fill, minmax(200px, 1fr) )"
        newDiv.style.width = "100%";
        newTable.style.left = "50%";
        var tr = newTable.insertRow();
        tr.style.marginBottom = "10px";
        tr.style.display = "flex";
        var dataPokemon = null;

        for (let j = 0; j < pokemonDataArray.length; j++) {
            if (loopArray.pokemon == "Meowstic") {
                for (let k = 0; k < pokemonDataArray.length; k++) {
                    if (loopArray.pokemon + "-" + loopArray.gender == pokemonDataArray[k].pokemon) {
                        dataPokemon = pokemonDataArray[k];
                        //console.log(dataPokemon);
                    }
                }
            }

            if (loopArray.pokemon == "Indeedee") {
                for (let k = 0; k < pokemonDataArray.length; k++) {
                    if (loopArray.pokemon + "-" + loopArray.gender == pokemonDataArray[k].pokemon) {
                        dataPokemon = pokemonDataArray[k];
                        //console.log(dataPokemon);
                    }
                }
            }

            if (loopArray.pokemon == pokemonDataArray[j].pokemon || dataPokemon != null) {
                var td = tr.insertCell();
                type1 = document.createElement("IMG");
                type1.setAttribute("class", "TypeDisplay");
                td.setAttribute("width", "13px");
                td.setAttribute("height", "13px");
                type1.style.verticalAlign = "middle";
                type1.setAttribute("width", "13px");
                type1.setAttribute("height", "13px");
                if (dataPokemon == null) {
                    type1.setAttribute("src", url + "/Resources/Misc/HP " + pokemonDataArray[j].type_1 + ".png");
                } else {
                    type1.setAttribute("src", url + "/Resources/Misc/HP " + dataPokemon.type_1 + ".png");
                }


                td.appendChild(type1);
                //Need break to ironically prevent things breaking; creates a ton of break icons if datatype not null
                break;
            }
        }

        for (let j = 0; j < pokemonDataArray.length; j++) {
            if (loopArray.pokemon == pokemonDataArray[j].pokemon) {
                if (pokemonDataArray[j].type_2 != null) {
                    var td = tr.insertCell();
                    type2 = document.createElement("IMG");
                    type2.setAttribute("class", "TypeDisplay");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    type2.style.verticalAlign = "middle";
                    type2.setAttribute("width", "13px");
                    type2.setAttribute("height", "13px");
                    type2.setAttribute("src", url + "/Resources/Misc/HP " + pokemonDataArray[j].type_2 + ".png");

                    td.appendChild(type2);
                    //Need break to ironically prevent things breaking; creates a ton of break icons if datatype not null
                    break;
                }

                if (dataPokemon != null) {
                    if (dataPokemon.type_2 != null) {
                        var td = tr.insertCell();
                        type2 = document.createElement("IMG");
                        type2.setAttribute("class", "TypeDisplay");
                        td.setAttribute("width", "13px");
                        td.setAttribute("height", "13px");
                        type2.style.verticalAlign = "middle";
                        type2.setAttribute("width", "13px");
                        type2.setAttribute("height", "13px");
                        type2.setAttribute("src", url + "/Resources/Misc/HP " + dataPokemon.type_2 + ".png");
                        td.appendChild(type2);
                    }
                    //Need break to ironically prevent things breaking; creates a ton of break icons if datatype not null
                    break;
                }
            }
        }

        var td = tr.insertCell();
        pokemon = document.createElement("Text");


        td.setAttribute("height", "auto");
        td.setAttribute("id", "Pokemon" + (i));
        pokemon.style.height = "13px";

        pokemon.innerHTML = loopArray.pokemon;

        pokemon.style.fontWeight = "bold";
        pokemon.style.color = "white";
        pokemon.style.fontFamily = "Arial, Helvetica, sans-serif";
        pokemon.style.fontSize = "60%";
        pokemon.style.display = "inline-flex";

        td.appendChild(pokemon);

        if (insideDetails && loopArray.nickname != "") {
            var tr = newTable.insertRow();
            tr.setAttribute("class", "insideDetails" + (i));
            tr.style.display = "none";
            var td = tr.insertCell();
            nickname = document.createElement("Text");
            td.setAttribute("height", "13px");
            nickname.setAttribute("height", "13px");
            nickname.innerHTML = loopArray.nickname;
            nickname.style.fontWeight = "bold";
            nickname.style.color = "white";
            nickname.style.fontFamily = "Arial, Helvetica, sans-serif";
            nickname.style.fontSize = "60%";

            td.appendChild(nickname);
        }

        newDiv.appendChild(newTable);



        var tr = newTable.insertRow();
        newTable.bottom = "unset";
        tr.style.display = "flex";
        if (previewIVs) {
            newTable.style.top = "65px";
        } else {
            newTable.style.top = "79px";
        }

        var td = tr.insertCell();
        ball = document.createElement("IMG");
        td.setAttribute("width", "13px");
        td.setAttribute("height", "13px");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/" + loopArray.pokeball + ".png");
        if (!previewBall) {
            td.setAttribute("class", "insideDetails" + (i));
            td.style.display = "none";
        }

        td.appendChild(ball);

        var td = tr.insertCell();
        gender = document.createElement("IMG");
        td.setAttribute("width", "13px");
        td.setAttribute("height", "13px");
        gender.setAttribute("width", "13px");
        gender.setAttribute("height", "13px");
        gender.setAttribute("src", url + "/Resources/Misc/" + loopArray.gender + ".png");
        if (!previewGender) {
            td.setAttribute("class", "insideDetails" + (i));
            td.style.display = "none";
        }

        td.appendChild(gender);

        var td = tr.insertCell();
        shiny = document.createElement("IMG");
        td.setAttribute("width", "13px");
        td.setAttribute("height", "13px");
        shiny.setAttribute("width", "13px");
        shiny.setAttribute("height", "13px");
        shiny.setAttribute("src", url + "/Resources/Misc/" + loopArray.shiny + ".png");
        if (!previewShiny) {
            td.setAttribute("class", "insideDetails" + (i));
            td.style.display = "none";
        }

        td.appendChild(shiny);

        var td = tr.insertCell();
        mint = document.createElement("IMG");
        td.setAttribute("width", "13px");
        td.setAttribute("height", "13px");
        mint.setAttribute("width", "13px");
        mint.setAttribute("height", "13px");
        mint.setAttribute("src", url + "/Resources/Misc/" + loopArray.mint + ".png");
        if (!previewMint) {
            td.setAttribute("class", "insideDetails" + (i));
            td.style.display = "none";
        }

        td.appendChild(mint);

        var td = tr.insertCell();
        misc = document.createElement("IMG");
        td.setAttribute("width", "13px");
        td.setAttribute("height", "13px");
        misc.setAttribute("width", "13px");
        misc.setAttribute("height", "13px");
        misc.setAttribute("src", url + "/Resources/Misc/" + loopArray.misc + ".png");
        if (!previewMisc) {
            td.setAttribute("class", "insideDetails" + (i));
            td.style.display = "none";
        }

        td.appendChild(misc);

        var td = tr.insertCell();
        mark = document.createElement("IMG");
        td.setAttribute("width", "13px");
        td.setAttribute("height", "13px");
        mark.setAttribute("width", "13px");
        mark.setAttribute("height", "13px");
        mark.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Marks/" + loopArray.mark + ".png");
        if (!previewMark) {
            td.setAttribute("class", "insideDetails" + (i));
            td.style.display = "none";
        }

        td.appendChild(mark);

        newDiv.appendChild(newTable);

        if (previewIVs == true) {
            if (exactIVs) {
                var tr = newTable.insertRow();
                tr.style.display = "flex";
                var td = tr.insertCell();
                textIVs = document.createElement("Text");
                td.setAttribute("height", "13px");
                textIVs.setAttribute("height", "13px");
                textIVs.innerHTML = "IVS: " + loopArray.iv_hp + "/" + loopArray.iv_att + "/" + loopArray.iv_def + "/" + loopArray.iv_spa + "/" + loopArray.iv_spd + "/" + loopArray.iv_spe;
                textIVs.style.fontWeight = "bold";
                textIVs.style.color = "white";
                textIVs.style.fontFamily = "Arial, Helvetica, sans-serif";
                textIVs.style.fontSize = "60%";
                textIVs.style.whiteSpace = "nowrap";

                td.appendChild(textIVs);

                newDiv.appendChild(newTable);
            } else {
                //newTable.setAttribute("width", "100");
                //newTable.setAttribute("height", "100");
                var tr = newTable.insertRow();
                tr.style.display = "flex";
                var td = tr.insertCell();
                ivHP = document.createElement("IMG");
                td.setAttribute("width", "13px");
                td.setAttribute("height", "13px");
                ivHP.setAttribute("width", "13px");
                ivHP.setAttribute("height", "13px");
                if (loopArray.iv_hp == "31") {
                    ivHP.setAttribute("src", url + "/Resources/Misc/Max IV Icon.png");
                }
                else if (loopArray.iv_hp == "30") {
                    ivHP.setAttribute("src", url + "/Resources/Misc/30 IV Icon.png");
                }
                else if (loopArray.iv_hp == "0") {
                    ivHP.setAttribute("src", url + "/Resources/Misc/0 IV Icon.png");
                }
                else if (loopArray.iv_hp == "1") {
                    ivHP.setAttribute("src", url + "/Resources/Misc/1 IV Icon.png");
                }
                else if (loopArray.iv_hp == "HT") {
                    ivHP.setAttribute("src", url + "/Resources/Misc/HT IV Icon.png");
                } else {
                    ivHP.setAttribute("src", url + "/Resources/Misc/X IV Icon.png");
                }
                td.appendChild(ivHP);


                var td = tr.insertCell();
                ivAtt = document.createElement("IMG");
                td.setAttribute("width", "13px");
                td.setAttribute("height", "13px");
                ivAtt.setAttribute("width", "13px");
                ivAtt.setAttribute("height", "13px");
                if (loopArray.iv_att == "31") {
                    ivAtt.setAttribute("src", url + "/Resources/Misc/Max IV Icon.png");
                }
                else if (loopArray.iv_att == "30") {
                    ivAtt.setAttribute("src", url + "/Resources/Misc/30 IV Icon.png");
                }
                else if (loopArray.iv_att == "0") {
                    ivAtt.setAttribute("src", url + "/Resources/Misc/0 IV Icon.png");
                }
                else if (loopArray.iv_att == "1") {
                    ivAtt.setAttribute("src", url + "/Resources/Misc/1 IV Icon.png");
                }
                else if (loopArray.iv_att == "HT") {
                    ivAtt.setAttribute("src", url + "/Resources/Misc/HT IV Icon.png");
                } else {
                    ivAtt.setAttribute("src", url + "/Resources/Misc/X IV Icon.png");
                }
                td.appendChild(ivAtt);

                var td = tr.insertCell();
                ivDef = document.createElement("IMG");
                td.setAttribute("width", "13px");
                td.setAttribute("height", "13px");
                ivDef.setAttribute("width", "13px");
                ivDef.setAttribute("height", "13px");
                if (loopArray.iv_def == "31") {
                    ivDef.setAttribute("src", url + "/Resources/Misc/Max IV Icon.png");
                }
                else if (loopArray.iv_def == "30") {
                    ivDef.setAttribute("src", url + "/Resources/Misc/30 IV Icon.png");
                }
                else if (loopArray.iv_def == "0") {
                    ivDef.setAttribute("src", url + "/Resources/Misc/0 IV Icon.png");
                }
                else if (loopArray.iv_def == "1") {
                    ivDef.setAttribute("src", url + "/Resources/Misc/1 IV Icon.png");
                }
                else if (loopArray.iv_def == "HT") {
                    ivDef.setAttribute("src", url + "/Resources/Misc/HT IV Icon.png");
                } else {
                    ivDef.setAttribute("src", url + "/Resources/Misc/X IV Icon.png");
                }
                td.appendChild(ivDef);

                var td = tr.insertCell();
                ivSpa = document.createElement("IMG");
                td.setAttribute("width", "13px");
                td.setAttribute("height", "13px");
                ivSpa.setAttribute("width", "13px");
                ivSpa.setAttribute("height", "13px");
                if (loopArray.iv_spa == "31") {
                    ivSpa.setAttribute("src", url + "/Resources/Misc/Max IV Icon.png");
                }
                else if (loopArray.iv_spa == "30") {
                    ivSpa.setAttribute("src", url + "/Resources/Misc/30 IV Icon.png");
                }
                else if (loopArray.iv_spa == "0") {
                    ivSpa.setAttribute("src", url + "/Resources/Misc/0 IV Icon.png");
                }
                else if (loopArray.iv_spa == "1") {
                    ivSpa.setAttribute("src", url + "/Resources/Misc/1 IV Icon.png");
                }
                else if (loopArray.iv_spa == "HT") {
                    ivSpa.setAttribute("src", url + "/Resources/Misc/HT IV Icon.png");
                } else {
                    ivSpa.setAttribute("src", url + "/Resources/Misc/X IV Icon.png");
                }
                td.appendChild(ivSpa);

                var td = tr.insertCell();
                ivSpd = document.createElement("IMG");
                td.setAttribute("width", "13px");
                td.setAttribute("height", "13px");
                ivSpd.setAttribute("width", "13px");
                ivSpd.setAttribute("height", "13px");
                if (loopArray.iv_spd == "31") {
                    ivSpd.setAttribute("src", url + "/Resources/Misc/Max IV Icon.png");
                }
                else if (loopArray.iv_spd == "30") {
                    ivSpd.setAttribute("src", url + "/Resources/Misc/30 IV Icon.png");
                }
                else if (loopArray.iv_spd == "0") {
                    ivSpd.setAttribute("src", url + "/Resources/Misc/0 IV Icon.png");
                }
                else if (loopArray.iv_spd == "1") {
                    ivSpd.setAttribute("src", url + "/Resources/Misc/1 IV Icon.png");
                }
                else if (loopArray.iv_spd == "HT") {
                    ivSpd.setAttribute("src", url + "/Resources/Misc/HT IV Icon.png");
                } else {
                    ivSpd.setAttribute("src", url + "/Resources/Misc/X IV Icon.png");
                }
                td.appendChild(ivSpd);

                var td = tr.insertCell();
                ivSpe = document.createElement("IMG");
                td.setAttribute("width", "13px");
                td.setAttribute("height", "13px");
                ivSpe.setAttribute("width", "13px");
                ivSpe.setAttribute("height", "13px");
                if (loopArray.iv_spe == "31") {
                    ivSpe.setAttribute("src", url + "/Resources/Misc/Max IV Icon.png");
                }
                else if (loopArray.iv_spe == "30") {
                    ivSpe.setAttribute("src", url + "/Resources/Misc/30 IV Icon.png");
                }
                else if (loopArray.iv_spe == "0") {
                    ivSpe.setAttribute("src", url + "/Resources/Misc/0 IV Icon.png");
                }
                else if (loopArray.iv_spe == "1") {
                    ivSpe.setAttribute("src", url + "/Resources/Misc/1 IV Icon.png");
                }
                else if (loopArray.iv_spe == "HT") {
                    ivSpe.setAttribute("src", url + "/Resources/Misc/HT IV Icon.png");
                } else {
                    ivSpe.setAttribute("src", url + "/Resources/Misc/X IV Icon.png");
                }
                td.appendChild(ivSpe);

                newDiv.appendChild(newTable);
            }

            if (insideDetails) {
                var tr = newTable.insertRow();
                tr.setAttribute("class", "insideDetails" + (i));
                tr.style.display = "none";
                var td = tr.insertCell();
                evsText = document.createElement("Text");
                td.setAttribute("height", "13px");
                evsText.setAttribute("height", "13px");
                evsText.innerHTML = loopArray.ev_hp + "/" + loopArray.ev_att + "/" + loopArray.ev_def + "/" + loopArray.ev_spa + "/" + loopArray.ev_spd + "/" + loopArray.ev_spe;
                evsText.style.fontWeight = "bold";
                evsText.style.color = "white";
                evsText.style.fontFamily = "Arial, Helvetica, sans-serif";
                evsText.style.fontSize = "60%";

                td.appendChild(evsText);
            }
        }


        //newTable.style.bottom = "8px";
        newTable.style.top = "unset";
        gridTest.style.gridTemplateColumns = "repeat( auto-fill, minmax(200px, 1fr) )"
        newDiv.style.width = "100%";
        newTable.style.left = "50%";


        for (let j = 0; j < pokemonDataArray.length; j++) {
            if (loopArray.pokemon == pokemonDataArray[j].pokemon || dataPokemon != null) {
                var tr = newTable.insertRow();
                tr.style.display = "flex";
                var td = tr.insertCell();
                ability = document.createElement("Text");
                td.setAttribute("height", "13px");
                ability.setAttribute("height", "13px");
                ability.style.fontWeight = "bold";
                ability.style.color = "white";
                ability.style.fontFamily = "Arial, Helvetica, sans-serif";
                ability.style.fontSize = "60%";
                if (dataPokemon == null) {
                    if (loopArray.ability == pokemonDataArray[j].ability_1 || loopArray.ability == pokemonDataArray[j].ability_2 || loopArray.ability == pokemonDataArray[j].hidden_ability_1 || loopArray.ability == pokemonDataArray[j].hidden_ability_2) {
                        if (loopArray.ability == pokemonDataArray[j].hidden_ability_1 || loopArray.ability == pokemonDataArray[j].hidden_ability_2) {
                            ability.innerHTML = loopArray.ability + " (H)";
                            td.appendChild(ability);
                        } else {
                            ability.innerHTML = loopArray.ability;
                            td.appendChild(ability);
                        }

                    }
                    //Need break to ironically prevent things breaking; creates a ton of break icons if datatype not null
                    break;
                } else {
                    if (loopArray.ability == dataPokemon.ability_1 || loopArray.ability == dataPokemon.ability_2 || loopArray.ability == dataPokemon.hidden_ability_1 || loopArray.ability == dataPokemon.hidden_ability_2) {
                        if (loopArray.ability == dataPokemon.hidden_ability_1 || loopArray.ability == dataPokemon.hidden_ability_2) {
                            ability.innerHTML = loopArray.ability + " (H)";
                            td.appendChild(ability);
                        } else {
                            ability.innerHTML = loopArray.ability;
                            td.appendChild(ability);
                        }

                    }
                    //Need break to ironically prevent things breaking; creates a ton of break icons if datatype not null
                    break;
                }

            }
        }




        var tr = newTable.insertRow();
        tr.style.display = "flex";
        var td = tr.insertCell();
        nature = document.createElement("Text");
        td.setAttribute("height", "13px");
        nature.setAttribute("height", "13px");
        nature.innerHTML = loopArray.nature;
        nature.style.fontWeight = "bold";
        nature.style.color = "white";
        nature.style.fontFamily = "Arial, Helvetica, sans-serif";
        nature.style.fontSize = "60%";

        td.appendChild(nature);

        if (insideDetails) {
            if (loopArray.game_ot != "") {
                var tr = newTable.insertRow();
                tr.setAttribute("class", "insideDetails" + (i));
                tr.style.display = "none";
                var td = tr.insertCell();
                gameOT = document.createElement("Text");
                td.setAttribute("height", "13px");
                gameOT.setAttribute("height", "13px");
                gameOT.innerHTML = "OT: " + loopArray.game_ot;
                gameOT.style.fontWeight = "bold";
                gameOT.style.color = "white";
                gameOT.style.fontFamily = "Arial, Helvetica, sans-serif";
                gameOT.style.fontSize = "60%";

                td.appendChild(gameOT);
            }

            if (loopArray.game_id != "") {
                var tr = newTable.insertRow();
                tr.setAttribute("class", "insideDetails" + (i));
                tr.style.display = "none";
                var td = tr.insertCell();
                gameID = document.createElement("Text");
                td.setAttribute("height", "13px");
                gameID.setAttribute("height", "13px");
                gameID.innerHTML = "ID: " + loopArray.game_id;
                gameID.style.fontWeight = "bold";
                gameID.style.color = "white";
                gameID.style.fontFamily = "Arial, Helvetica, sans-serif";
                gameID.style.fontSize = "60%";

                td.appendChild(gameID);
            }

            var tr = newTable.insertRow();
            tr.setAttribute("class", "insideDetails" + (i));
            tr.style.display = "none";
            var td = tr.insertCell();
            statusInfo = document.createElement("Text");
            td.setAttribute("height", "13px");
            statusInfo.setAttribute("height", "13px");
            statusInfo.innerHTML = loopArray.status;
            statusInfo.style.fontWeight = "bold";
            statusInfo.style.color = "white";
            statusInfo.style.fontFamily = "Arial, Helvetica, sans-serif";
            statusInfo.style.fontSize = "60%";

            td.appendChild(statusInfo);

            if (loopArray.event_info != "(Not Event)" && loopArray.event_info != "(Any/No Event)") {
                var tr = newTable.insertRow();
                tr.setAttribute("class", "insideDetails" + (i));
                tr.style.display = "none";
                var td = tr.insertCell();
                eventInfo = document.createElement("Text");
                td.setAttribute("height", "13px");
                eventInfo.setAttribute("height", "13px");
                eventInfo.innerHTML = loopArray.event_info;
                eventInfo.style.fontWeight = "bold";
                eventInfo.style.color = "white";
                eventInfo.style.fontFamily = "Arial, Helvetica, sans-serif";
                eventInfo.style.fontSize = "60%";

                td.appendChild(eventInfo);
            }
        }

        newDiv.appendChild(newTable);



        if (insideDetails) {
            newTable = document.createElement("table");
            newTable.style.position = "absolute";
            newTable.style.zIndex = "1";
            newTable.style.top = "50%";
            newTable.style.left = "10px";

            /*var tr = newTable.insertRow();
            tr.setAttribute("class", "insideDetails" + (i));
            tr.style.display = "flex";
            var td = tr.insertCell();
            movesTitle = document.createElement("Text");
            td.setAttribute("height", "13px");
            movesTitle.setAttribute("height", "13px");
            movesTitle.innerHTML = "Pokemon Moves";
            movesTitle.style.fontWeight = "bold";
            movesTitle.style.color = "white";
            movesTitle.style.fontFamily = "Arial, Helvetica, sans-serif";
            movesTitle.style.fontSize = "60%";

            td.appendChild(movesTitle);*/

            if (loopArray.move_1 != "(No Move)" && loopArray.move_1 != "(Any Move)") {
                var tr = newTable.insertRow();
                tr.setAttribute("class", "insideDetails" + (i));
                tr.style.display = "none";
                var td = tr.insertCell();
                move = document.createElement("Text");
                td.setAttribute("height", "13px");
                move.setAttribute("height", "13px");
                move.innerHTML = loopArray.move_1;
                move.style.fontWeight = "bold";
                move.style.color = "white";
                move.style.fontFamily = "Arial, Helvetica, sans-serif";
                move.style.fontSize = "60%";

                td.appendChild(move);
            }

            if (loopArray.move_2 != "(No Move)" && loopArray.move_2 != "(Any Move)") {
                var tr = newTable.insertRow();
                tr.setAttribute("class", "insideDetails" + (i));
                tr.style.display = "none";
                var td = tr.insertCell();
                move = document.createElement("Text");
                td.setAttribute("height", "13px");
                move.setAttribute("height", "13px");
                move.innerHTML = loopArray.move_2;
                move.style.fontWeight = "bold";
                move.style.color = "white";
                move.style.fontFamily = "Arial, Helvetica, sans-serif";
                move.style.fontSize = "60%";

                td.appendChild(move);
            }

            if (loopArray.move_3 != "(No Move)" && loopArray.move_3 != "(Any Move)") {
                var tr = newTable.insertRow();
                tr.setAttribute("class", "insideDetails" + (i));
                tr.style.display = "none";
                var td = tr.insertCell();
                move = document.createElement("Text");
                td.setAttribute("height", "13px");
                move.setAttribute("height", "13px");
                move.innerHTML = loopArray.move_3;
                move.style.fontWeight = "bold";
                move.style.color = "white";
                move.style.fontFamily = "Arial, Helvetica, sans-serif";
                move.style.fontSize = "60%";

                td.appendChild(move);
            }

            if (loopArray.move_4 != "(No Move)" && loopArray.move_4 != "(Any Move)") {
                var tr = newTable.insertRow();
                tr.setAttribute("class", "insideDetails" + (i));
                tr.style.display = "none";
                var td = tr.insertCell();
                move = document.createElement("Text");
                td.setAttribute("height", "13px");
                move.setAttribute("height", "13px");
                move.innerHTML = loopArray.move_4;
                move.style.fontWeight = "bold";
                move.style.color = "white";
                move.style.fontFamily = "Arial, Helvetica, sans-serif";
                move.style.fontSize = "60%";

                td.appendChild(move);
            }

            var tr = newTable.insertRow();
            tr.setAttribute("class", "insideDetails" + (i));
            tr.style.display = "none";
            var td = tr.insertCell();
            td.setAttribute("height", "13px");

            newDiv.appendChild(newTable);


        }

        if (insideDetails) {
            newTable = document.createElement("table");
            newTable.style.position = "absolute";
            newTable.style.zIndex = "1";
            newTable.style.bottom = "4%";
            newTable.style.left = "10px";

            if (loopArray.proof != "") {
                var tr = newTable.insertRow();
                tr.setAttribute("class", "insideDetails" + (i));
                tr.style.display = "none";
                var td = tr.insertCell();
                td.setAttribute("width", "180px");
                td.style.overflowX = "clip";
                td.style.overflow = "-moz-hidden-unscrollable";
                td.style.whiteSpace = "no-wrap";
                proof = document.createElement("a");
                proof.setAttribute("href", loopArray.proof);
                proof.setAttribute("target", "_blank");
                td.setAttribute("height", "16px");
                proof.setAttribute("height", "13px");
                proof.innerHTML = loopArray.proof;
                proof.style.fontWeight = "bold";
                proof.style.color = "white";
                proof.style.fontFamily = "Arial, Helvetica, sans-serif";
                proof.style.fontSize = "60%";

                td.appendChild(proof);
            }

            newDiv.appendChild(newTable);

        }



        SetImage(theImage, loopArray.pokemon, loopArray.gender, loopArray.shiny, loopArray.game_obtained);

        /*if (shinyLockedArray.includes(loopArray.pokemon) && !loopArray.shiny.includes("Normal")) {
            theImage.setAttribute("src", url + "/Resources/Fennel2.png");
        }

        else if (genderDifferencesArray.includes(loopArray.pokemon)) {
            if (loopArray.gender == "Male" || loopArray.gender == "(Any Gender)") {
                //console.log("WOOOORK")
                if (loopArray.shiny.includes("Normal")) {
                    if (generationalSprites) {
                        if (loopArray.game_obtained == "R/B/Y") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "G/S/C") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BW/BW2") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "X/Y") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "OR/AS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "SM/USUM") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "LGP/LGE") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BD/SP") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSP/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "LA") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + loopArray.pokemon + "-Male.png");
                        }
                        else {
                            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Male.png");
                        }
                    } else {
                        theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Male.png");
                    }
                    document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).setAttribute("src", url + "/Resources/Home/" + arrayData["Rows"][i].pokemon + "-Male.png")
                    };
                }
                else if (!loopArray.shiny.includes("Normal")) {
                    if (generationalSprites) {
                        if (loopArray.game_obtained == "R/B/Y") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "G/S/C") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BW/BW2") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "X/Y") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "OR/AS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "SM/USUM") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "LGP/LGE") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BD/SP") {
                            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Shiny.png");
                        }
                        else if (loopArray.game_obtained == "LA") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + loopArray.pokemon + "-Male.png");
                        }
                        else {
                            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Male-Shiny.png");
                        }
                    } else {
                        theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Male-Shiny.png");
                    }
                    document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).setAttribute("src", url + "/Resources/Home/" + arrayData["Rows"][i].pokemon + "-Male-Shiny.png")
                    };
                }
            }
            else if (loopArray.gender == "Female") {
                if (loopArray.shiny.includes("Normal")) {
                    if (generationalSprites) {
                        if (loopArray.game_obtained == "R/B/Y") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "G/S/C") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BW/BW2") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "X/Y") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "OR/AS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "SM/USUM") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "LGP/LGE") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BD/SP") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSP/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "LA") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + loopArray.pokemon + "-Female.png");
                        }
                        else {
                            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Female.png");
                        }
                    } else {
                        theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Female.png");
                    }
                    document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).setAttribute("src", url + "/Resources/Home/" + arrayData["Rows"][i].pokemon + "-Female.png")
                    };
                }
                else if (!loopArray.shiny.includes("Normal")) {
                    if (generationalSprites) {
                        if (loopArray.game_obtained == "R/B/Y") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "G/S/C") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BW/BW2") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "X/Y") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "OR/AS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "SM/USUM") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "LGP/LGE") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BD/SP") {
                            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Female-Shiny.png");
                        }
                        else if (loopArray.game_obtained == "LA") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + loopArray.pokemon + "-Female.png");
                        }
                        else {
                            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Female-Shiny.png");
                        }
                    } else {
                        theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Female-Shiny.png");
                    }
                    document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).setAttribute("src", url + "/Resources/Home/" + arrayData["Rows"][i].pokemon + "-Female-Shiny.png")
                    };
                }
            }
        } else {
            if (loopArray.shiny.includes("Normal")) {
                if (generationalSprites) {
                    if (loopArray.game_obtained == "R/B/Y") {
                        theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "G/S/C") {
                        theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                        theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                        theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "BW/BW2") {
                        theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "X/Y") {
                        theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "OR/AS") {
                        theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "SM/USUM") {
                        theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "LGP/LGE") {
                        theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "BD/SP") {
                        theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSP/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "LA") {
                        theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + loopArray.pokemon + ".png");
                    }
                    else {
                        theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + ".png")
                    }
                } else {
                    theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + ".png")
                }
            }
            else {
                if (shinyExceptionArray.includes(loopArray.pokemon)) {
                    if (loopArray.pokemon.includes("Minior")) {
                        if (generationalSprites) {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/Minior.png");
                        }
                        else {
                            theImage.setAttribute("src", url + "/Resources/Home/Minior-Shiny.png");
                        }
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Strawberry")) {
                        theImage.setAttribute("src", url + "/Resources/Home/Alcremie-Strawberry-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Berry")) {
                        theImage.setAttribute("src", url + "/Resources/Home/Alcremie-Berry-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Love")) {
                        theImage.setAttribute("src", url + "/Resources/Home/Alcremie-Love-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Star")) {
                        theImage.setAttribute("src", url + "/Resources/Home/Alcremie-Star-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Clover")) {
                        theImage.setAttribute("src", url + "/Resources/Home/Alcremie-Clover-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Flower")) {
                        theImage.setAttribute("src", url + "/Resources/Home/Alcremie-Flower-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Ribbon")) {
                        theImage.setAttribute("src", url + "/Resources/Home/Alcremie-Ribbon-Shiny.png");
                    }
                }
                else {
                    if (generationalSprites) {
                        if (loopArray.game_obtained == "R/B/Y") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "G/S/C") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "BW/BW2") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "X/Y") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "OR/AS") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "SM/USUM") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "LGP/LGE") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "BD/SP") {
                            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Shiny.png");
                        }
                        else if (loopArray.game_obtained == "LA") {
                            theImage.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + loopArray.pokemon + ".png");
                        }
                        else {
                            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Shiny.png")
                        }
                    } else {
                        theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Shiny.png")
                    }

                    //loopArray does not work properly for some reason, so having to use arrayData.
                    document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).setAttribute("src", url + "/Resources/Home/" + arrayData["Rows"][i].pokemon + "-Shiny.png");
                    }

                }
            }
        }*/


        //Setting up the onclick to open the details area and to set the information required for it.
        newDiv.onclick = function () {
            if (!creationInProgress) {
                console.log("Clicked");
                if (!currentlyRearranging) {
                    if (selectedPokemon != null && pokemonDetails.creation_id == arrayData["Rows"][i].creation_id) {
                        $('.DA-Close').click();
                        CloseDetailOptions();
                        return;
                    } else {
                        CloseDetailOptions();
                        pokemonDetails = arrayData["Rows"][i];
                        if (selectedPokemon != null) {
                            //alert("HERE");
                            selectedPokemon.style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                            selectedPokemon.style.backgroundColor = "#084f65";

                            var cols = document.getElementsByClassName("insideDetails" + (storedValue));
                            for (j = 0; j < cols.length; j++) {
                                cols[j].style.display = "none";
                            }
                            document.getElementById("GenerationGridDiv" + (storedValue)).style.height = "100px";
                        }
                        selectedPokemon = document.getElementById("GenerationGridDiv" + (i));
                        storedValue = i;
                        console.log(selectedPokemon);
                        selectedPokemon.style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                        selectedPokemon.style.backgroundColor = "#2E2D2D";
                        var cols = document.getElementsByClassName("insideDetails" + (i));
                        for (j = 0; j < cols.length; j++) {
                            cols[j].style.display = "flex";
                        }
                        document.getElementById("GenerationGridDiv" + (i)).style.height = "200px";
                        //$.post(url + "/PHP/generate_selection.php", { token: token, searchID: pokemonDetails.user_id, tradeOption: "Looking For" }, MatchMaking);
                        ShowPokemonDetails();
                    }

                    $.post(url + "/PHP/modify_check.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
                } else {
                    if (oldPosition == "") {
                        movingPokemon = document.getElementById("GenerationGridDiv" + (i));
                        oldPosition = arrayData["Rows"][i].position;
                        tempCreationID = arrayData["Rows"][i].creation_id;
                        if (pokemonDetails != null && selectedPokemon != null) {
                            if (arrayData["Rows"][i].creation_id == pokemonDetails.creation_id && selectedPokemon != null) {
                                document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #989898ff";
                                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#2E2D2D";
                                console.log(arrayData["Rows"][i].creation_id);
                            } else {
                                document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #989898ff";
                                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#084f65";
                                console.log(arrayData["Rows"][i].creation_id);
                            }
                        } else {
                            document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #989898ff";
                            document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#084f65";
                            console.log(arrayData["Rows"][i].creation_id);
                        }
                        document.getElementById("GenerationGridDiv" + (i)).style.opacity = "100%";
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

        newDiv.onmouseenter = function () {
            if (!creationInProgress) {
                if (selectedPokemon == null && hoverInfo == true && window.innerWidth > limitWidth) {
                    pokemonDetails = arrayData["Rows"][i];
                    //$.post(url + "/PHP/generate_selection.php", { token: token, searchID: pokemonDetails.user_id, tradeOption: "Looking For" }, MatchMaking);

                    ShowPokemonDetails();

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
                    $.post(url + "/PHP/modify_check.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
                }
            }
        }
        if (!creationInProgress) {
            if (pokemonDetails != null && selectedPokemon != null) {
                if (arrayData["Rows"][i].creation_id == pokemonDetails.creation_id) {
                    selectedPokemon = document.getElementById("GenerationGridDiv" + (i));
                    storedValue = i;
                    selectedPokemon.style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                    selectedPokemon.style.backgroundColor = "#2E2D2D";
                    var cols = document.getElementsByClassName("insideDetails" + (i));
                    for (j = 0; j < cols.length; j++) {
                        cols[j].style.display = "none";
                    }
                    document.getElementById("GenerationGridDiv" + (i)).style.height = "100px";
                }
            }
        }
    }
    FilterResults();
    HideLoading();
}

function MovePokemon() {
    MoveFinished();
    document.querySelector(".SA-MoveButton").innerHTML = "Move";
    currentlyRearranging = false;
    oldPosition = "";
    newPosition = "";
    ShowLoading();
    PostGenerateSelection();
}

function CopyPokemon() {
    CopyFinished();
    document.querySelector(".SA-CopyButton").innerHTML = "Copy";
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
    document.querySelector(".DA-Place").style.pointerEvents = "none";
    document.querySelector(".DA-Place").style.background = "#313131";
    tempUserID = "";
    if (userData != null) {
        tempUserID = userData.user_id;
    }
    creationID = pokemonDetails.creation_id;
    if (document.querySelector("#DetailsArea").style.display != "block" && document.querySelector("#FilterArea").style.display != "block" && document.querySelector("#InformationArea").style.display != "block") {
        document.querySelector("#DetailsArea").style.display = "block";
        document.querySelector("#PanelArea").style.display = "none";
    }

    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        document.querySelector(".DA-DetailsData").style.pointerEvents = "none";

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
        document.querySelector(".DA-DetailsData").style.pointerEvents = "initial";

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
    $.post(url + "/PHP/generate_bunch_selection.php", { token: token, searchID: pokemonDetails.user_id, tradeOption: pokemonDetails.trade_option, showEmpty: "Yes" }, GettingFTBunches);

    $.post(url + "/PHP/generate_bunch_selection.php", { token: token, searchID: pokemonDetails.user_id, tradeOption: pokemonDetails.trade_option, showEmpty: "Yes" }, GettingLFBunches);

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

    document.querySelector(".DA-DisplayRow").style.display == "table-row";
    displaySelection.value = pokemonDetails.display;
    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        document.querySelector(".DA-DisplayRow").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-DisplayRow").style.visibility = "unset";
    }

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
    markData = pokemonDetails.mark;
    document.querySelector(".DA-MarkIcon").setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Marks/" + pokemonDetails.mark + ".png");

    var cols = document.getElementsByClassName("Ribbons");
    document.querySelector(".DA-RibbonIcon").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Ribbons/(No Ribbon).png";
    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        for (i = 0; i < cols.length; i++) {
            cols[i].style.background = "#404040";
            cols[i].style.display = "none";
        }
    } else {
        for (i = 0; i < cols.length; i++) {
            cols[i].style.background = "#404040";
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
    if (pokemonDetails.game_ot == "" && tempUserID != pokemonDetails.user_id ||
        pokemonDetails.game_ot == "" && detailsLocked) {
        document.querySelector(".DA-OTRow").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-OTRow").style.visibility = "unset";
    }

    idSelection.value = pokemonDetails.game_id;
    if (pokemonDetails.game_id == "" && tempUserID != pokemonDetails.user_id ||
        pokemonDetails.game_id == "" && detailsLocked) {
        document.querySelector(".DA-IDRow").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-IDRow").style.visibility = "unset";
    }

    statusSelection.value = pokemonDetails.status;
    document.querySelector(".DA-StatHolder").style.display = "flex";
    if (pokemonDetails.status == "(Any Status)" && tempUserID != pokemonDetails.user_id ||
        pokemonDetails.status == "(Any Status)" && detailsLocked) {
        document.querySelector(".DA-StatusRow").style.visibility = "hidden";
    } else {
        document.querySelector(".DA-StatusRow").style.visibility = "unset";
    }

    document.querySelector(".DA-EventRow").style.display == "table-row";
    eventSelection.value = pokemonDetails.event_info;
    if (pokemonDetails.event_info == "(Any/No Event)" && tempUserID != pokemonDetails.user_id ||
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

    document.querySelector(".DA-StatHolder").style.visibility = "unset";
    ivHpSelection.value = pokemonDetails.iv_hp;
    ivAttSelection.value = pokemonDetails.iv_att;
    ivDefSelection.value = pokemonDetails.iv_def;
    ivSpaSelection.value = pokemonDetails.iv_spa;
    ivSpdSelection.value = pokemonDetails.iv_spd;
    ivSpeSelection.value = pokemonDetails.iv_spe;

    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (pokemonDetails.iv_hp == "X" && pokemonDetails.iv_att == "X" && pokemonDetails.iv_def == "X" &&
            pokemonDetails.iv_spa == "X" && pokemonDetails.iv_spd == "X" && pokemonDetails.iv_spe == "X") {

            document.querySelector(".DA-RowIVs").style.display = "none";
        } else {
            document.querySelector(".DA-RowIVs").style.display = "table-row";
        }
    } else {
        document.querySelector(".DA-RowIVs").style.display = "table-row";
    }

    evHpSelection.value = pokemonDetails.ev_hp;
    evAttSelection.value = pokemonDetails.ev_att;
    evDefSelection.value = pokemonDetails.ev_def;
    evSpaSelection.value = pokemonDetails.ev_spa;
    evSpdSelection.value = pokemonDetails.ev_spd;
    evSpeSelection.value = pokemonDetails.ev_spe;

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
    document.querySelector(".DA-LegacyMove4").style.display = "block";

    move1Selection.value = pokemonDetails.move_1;
    move2Selection.value = pokemonDetails.move_2;
    move3Selection.value = pokemonDetails.move_3;
    move4Selection.value = pokemonDetails.move_4;

    move1Null = true;
    move2Null = true;
    move3Null = true;
    move4Null = true;

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

    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (!move1Null && !move2Null && !move3Null && !move1Null) {
            document.querySelector(".DA-MovesHolder").style.display = "none";
        } else if (!move3Null && !move4Null) {
            document.querySelector(".DA-Move3").style.display = "none";
            document.querySelector(".DA-Move4").style.display = "none";
        }
    }


    legacyMove1Selection.value = pokemonDetails.legacy_move_1;
    legacyMove2Selection.value = pokemonDetails.legacy_move_2;
    legacyMove3Selection.value = pokemonDetails.legacy_move_3;
    legacyMove4Selection.value = pokemonDetails.legacy_move_4;

    legacyMove1Null = true;
    legacyMove2Null = true;
    legacyMove3Null = true;
    legacyMove4Null = true;

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

    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (!legacyMove1Null && !legacyMove2Null && !legacyMove3Null && !legacyMove4Null) {
            document.querySelector(".DA-LegacyMovesHolder").style.display = "none";
        } else if (!legacyMove3Null && !legacyMove4Null) {
            document.querySelector(".DA-LegacyMove3").style.display = "none";
            document.querySelector(".DA-LegacyMove4").style.display = "none";
        }
    }

    proofSelection.value = pokemonDetails.proof;
    document.querySelector(".DA-ProofURL").setAttribute("src", pokemonDetails.proof);
    document.querySelector(".DA-ProofVideo").setAttribute("src", pokemonDetails.proof);
    document.querySelector(".DA-ProofImage").setAttribute("src", pokemonDetails.proof);
    //document.querySelector(".DA-ProofImage").setAttribute("src", "");
    //document.querySelector(".DA-ProofVideo").setAttribute("src", "");

    if (tempUserID != pokemonDetails.user_id || detailsLocked) {
        if (pokemonDetails.proof == "") {
            document.querySelector(".DA-Proof").style.display = "none";
        } else {
            document.querySelector(".DA-Proof").style.display = "block";
            if (toggleOn) {
                DisplayProof();
            }
        }
    } else {
        document.querySelector(".DA-Proof").style.display = "block";
        if (toggleOn) {
            DisplayProof();
            $('.DA-ProofURL').keyup();
        }
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
}

function ShowAllDropdowns() {
    displaySelection.style.visibility = "unset";
    document.querySelector(".DA-DisplayRow").style.display == "table-row";
    document.querySelector(".DA-AbilityRow").style.visibility = "unset";
    nicknameSelection.style.visibility = "unset";
    document.querySelector(".DA-NatureRow").style.visibility = "unset";
    document.querySelector(".DA-OTRow").style.visibility = "unset";
    document.querySelector(".DA-IDRow").style.visibility = "unset";
    document.querySelector(".DA-StatusRow").style.visibility = "unset";
    document.querySelector(".DA-EventRow").style.visibility = "unset";
    document.querySelector(".DA-EventRow").style.display == "table-row";
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
    document.querySelector(".DA-LegacyMove4").style.display = "block";
    document.querySelector(".DA-Proof").style.display = "block";
    document.querySelector(".DA-Note").style.display = "flex";

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

function SetImage(image, imageName, gender, shiny, gameObtained) {

    if (iconExclusivesArray.includes(imageName)) {
        if (allBallsArray.includes(imageName) || imageName == "Egg") {
            image.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Small Icons/" + imageName + ".png");
        }
        else if (bunchIcon.includes("HP")) {
            image.setAttribute("src", url + "/Resources/Misc/" + imageName + ".png");
        }
        else if (imageName.includes("Ribbon")) {
            image.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Small Icons/Ribbons/" + imageName + ".png");
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
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                }

            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
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
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                }

            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
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
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                }

            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
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
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "BW/BW2") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "X/Y") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "OR/AS") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "SM/USUM") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "LGP/LGE") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + "-Male.png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Male.png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Male.png");
                }
                image.onerror = function () {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Male.png")
                };
            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "BW/BW2") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "X/Y") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "OR/AS") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "SM/USUM") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "LGP/LGE") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + "-Male.png");
                        }
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + "-Male.png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Male.png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Male.png");
                }
                image.onerror = function () {
                    image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Male.png")
                };
            }

        }
        else if (gender.includes("Female") || gender.includes("(Any Gender)")) {
            if (shiny.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + "-.png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "BW/BW2") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "X/Y") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "OR/AS") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "SM/USUM") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "LGP/LGE") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + "-Female.png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Female.png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Female.png");
                }
                image.onerror = function () {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + "-Female.png")
                };
            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "BW/BW2") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "X/Y") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "OR/AS") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "SM/USUM") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "LGP/LGE") {
                        if (imageName == "Eevee") {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                        } else {
                            image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + "-Female.png");
                        }
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + "-Female.png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Female.png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Female.png");
                }
                image.onerror = function () {
                    image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + "-Female.png")
                };
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
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSP/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                    }
                } else {
                    image.setAttribute("src", url + "/Resources/Home/" + imageName + ".png");
                }
            } else {
                if (generationalSprites) {
                    if (gameObtained == "R/B/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "G/S/C") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "R/S/E" || gameObtained == "FR/LG" || gameObtained == "Colo/XD") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "D/P/PT" || gameObtained == "HG/SS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BW/BW2") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "X/Y") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "OR/AS") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "SM/USUM") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LGP/LGE") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "BD/SP") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSPImages/BDSPShiny/" + imageName + ".png");
                    }
                    else if (gameObtained == "LA") {
                        image.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + imageName + ".png");
                    }
                    else {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
                    }
                    image.onerror = function () {
                        image.setAttribute("src", url + "/Resources/HomeShiny/" + imageName + ".png");
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