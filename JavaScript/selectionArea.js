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
//The Number of Arrays used in for statements in other scripts for outlining
var numberOfArrays;
//The Array data for Pokemon Generation (Not Bunch) used in  for statements for other scripts for outlining
var arrayData;

var numberOfBunches;

var currentlyRearranging = false;
var oldPosition = "";
var newPosition = "";

var limitWidth = 768;

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


document.querySelector('#ViewingArea').onmouseover = function () {
    if (selectedPokemon == null && hoverInfo == true) {
        $('.VA-CloseButton').click();
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
            document.querySelector('#SelectionArea').style.height = selectionVH - $("#FilterArea").visibleHeight() + "px"
        }
        else if (document.querySelector('#BunchArea').style.display == "block") {
            //document.querySelector('#SelectionArea').style.height = "100%"
            document.querySelector('#SelectionArea').style.height = selectionVH - $("#BunchArea").visibleHeight() + "px"
        }
        else if (document.querySelector('#CreationArea').style.display == "block") {
            //document.querySelector('#SelectionArea').style.height = "100%"
            document.querySelector('#SelectionArea').style.height = selectionVH - $("#CreationArea").visibleHeight() + "px"
        }
        else if (document.querySelector('#ViewingArea').style.display == "block") {
            //document.querySelector('#SelectionArea').style.height = "100%"
            document.querySelector('#SelectionArea').style.height = selectionVH - $("#ViewingArea").visibleHeight() + "px"
        }
        else if (document.querySelector('#PanelArea').style.display == "block") {
            //document.querySelector('#SelectionArea').style.height = "100%"
            document.querySelector('#SelectionArea').style.height = selectionVH - $("#PanelArea").visibleHeight() + "px";
        } else {
            document.querySelector('#SelectionArea').style.height = "100%"
            //document.querySelector('#SelectionArea').style.height = $(selection).visibleHeight() - 1 + "px";
            //alert($(selection).visibleHeight())
        }
    }
}

$(".SA-Searchbar").keyup(function () {
    ShowLoading();
    PostGenerateSelection();
});

$('.SA-MainMenu').click(function () {
    bunchname = "";
    //making the Selection Area bunch name invisible (can't turn it off or the space for it goes)
    document.querySelector(".SA-Bunch").style.opacity = "0%";
    selectedPokemon = null;
    viewingDetails = null;
    creationDetails = null;
    //AssigningOutline();
    //Removing the GridContainer so a new one can be created later
    $("#GridContainer").remove();
    document.querySelector("#ViewingArea").style.display = "none";
    document.querySelector("#SelectionArea").style.height = "100%";
    document.querySelector("#SelectionArea").style.display = "none";
    //document.querySelector(".SA-ExitBunch").style.pointerEvents = "none";
    //document.querySelector(".SA-ExitBunch").style.backgroundColor = "grey";
    ResetFilters();
    document.querySelector("#MainArea").style.display = "block";
    document.querySelector("#CreationArea").style.display = "none";
    document.querySelector("#BunchArea").style.display = "none";
    document.querySelector("#FilterArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "block";
    CreationReset();
    BunchReset();
});

$('.SA-CreateButton').click(function () {
    //document.querySelector("#SelectionArea").style.width = "100%"
    document.querySelector("#ViewingArea").style.display = "none";
    document.querySelector("#FilterArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#CreationArea").style.display = "block";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "none";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "grey";
    document.querySelector(".SA-MoveButton").style.pointerEvents = "none";
    document.querySelector(".SA-MoveButton").style.backgroundColor = "grey";

    //So it doesn't add to an already existing row
    creationID = "";
    CreationReset();
});

$('.SA-MoveButton').click(function () {
    if (currentlyRearranging == false) {
        currentlyRearranging = true;
        document.querySelector(".SA-MoveButton").innerHTML = "Cancel";
        //OpacityHalf();
        MoveStarted();
    } else {
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
        document.querySelector(".SA-MoveButton").innerHTML = "Move/Copy";
        //OpacityFull();
        //AssigningOutline();
        RemoveBunchOutline();
        MoveFinished();
    }

});

$('.SA-FiltersButton').click(function () {
    $.post("https://poketrades.org/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
    //document.querySelector("#SelectionArea").style.width = "100%";
    document.querySelector("#FilterArea").style.display = "block";
    document.querySelector("#ViewingArea").style.display = "none";
    document.querySelector("#CreationArea").style.display = "none";
    document.querySelector("#BunchArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
});

$('.SA-SelectionHelp').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".SelectionHelp").style.display = "block";
});

function MoveStarted() {
    //document.querySelector(".SA-ExitBunch").style.pointerEvents = "none";
    //document.querySelector(".SA-ExitBunch").style.backgroundColor = "grey";
    document.querySelector(".SA-MainMenu").style.pointerEvents = "none";
    document.querySelector(".SA-MainMenu").style.backgroundColor = "grey";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "none";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "grey";
    document.querySelector(".SA-FiltersButton").style.pointerEvents = "none";
    document.querySelector(".SA-FiltersButton").style.backgroundColor = "grey";
    document.querySelector(".SA-Searchbar").disabled = true;
    document.querySelector(".VA-ModifyButton").style.pointerEvents = "none";
    document.querySelector(".VA-ModifyButton").style.backgroundColor = "grey";
    document.querySelector(".VA-DeleteButton").style.pointerEvents = "none";
    document.querySelector(".VA-DeleteButton").style.backgroundColor = "grey";
    document.querySelector(".PA-Searchbar").disabled = true;
    document.querySelector("#PanelArea").style.pointerEvents = "none";
}

function MoveFinished() {
    //document.querySelector(".SA-ExitBunch").style.pointerEvents = "initial";
    //document.querySelector(".SA-ExitBunch").style.backgroundColor = "#efefef";
    document.querySelector(".SA-MainMenu").style.pointerEvents = "initial";
    document.querySelector(".SA-MainMenu").style.backgroundColor = "#efefef";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "initial";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "#efefef";
    document.querySelector(".SA-FiltersButton").style.pointerEvents = "initial";
    if (filtersApplied) {
        document.querySelector(".SA-FiltersButton").style.backgroundColor = "orchid";
    } else {
        document.querySelector(".SA-FiltersButton").style.backgroundColor = "#efefef";
    }
    document.querySelector(".SA-Searchbar").disabled = false;
    document.querySelector(".VA-ModifyButton").style.pointerEvents = "initial";
    document.querySelector(".VA-ModifyButton").style.backgroundColor = "#efefef";
    document.querySelector(".VA-DeleteButton").style.pointerEvents = "initial";
    document.querySelector(".VA-DeleteButton").style.backgroundColor = "#efefef";
    document.querySelector("#GeneratedSelection").style.pointerEvents = "initial";
    document.querySelector(".PA-Searchbar").disabled = false;
    document.querySelector("#PanelArea").style.pointerEvents = "initial";
    //OpacityFull();
}

//Setting Opacity to half to show that moving is in progress.
function OpacityHalf() {
    for (let i = 0; i < numberOfArrays; i++) {
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
    for (let i = 0; i < numberOfArrays; i++) {
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

    numberOfArrays = arrayData["Rows"].length;
    console.log(numberOfArrays);
    numberOfArrays = numberOfArrays;

    //Removing the grid container so I can create a new one and making it a child of GeneratedSelection.
    $("#GridContainer").remove();
    gridTest = document.createElement("div");
    gridTest.setAttribute("id", "GridContainer");
    document.getElementById("GeneratedSelection").appendChild(gridTest);

    for (let i = 0; i < numberOfArrays; i++) {

        //Creating newDivs for each pokemon and making them children of the GridContainer
        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "GenerationGridDiv" + (i));
        newDiv.setAttribute("class", "Lozad");
        //newDiv.className += "Lozad";
        document.getElementById("GridContainer").appendChild(newDiv);
        newDiv.setAttribute("width", "100");
        newDiv.setAttribute("height", "100");

        document.getElementById("GenerationGridDiv" + (i)).style.display = "flex";
        document.getElementById("GenerationGridDiv" + (i)).style.position = "relative";
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


        if (previewBall || previewGender || previewShiny || previewMint || previewMisc || previewMark || previewIVs || advancedPreview) {
            newTable = document.createElement("table");
            newTable.style.position = "absolute";
            newTable.style.zIndex = "1";

            if (advancedPreview) {
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
                            type1.setAttribute("src", "https://poketrades.org/Resources/Misc/HP " + pokemonDataArray[j].type_1 + ".png");
                        } else {
                            type1.setAttribute("src", "https://poketrades.org/Resources/Misc/HP " + dataPokemon.type_1 + ".png");
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
                            type2.setAttribute("src", "https://poketrades.org/Resources/Misc/HP " + pokemonDataArray[j].type_2 + ".png");

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
                                type2.setAttribute("src", "https://poketrades.org/Resources/Misc/HP " + dataPokemon.type_2 + ".png");
                                td.appendChild(type2);
                            }
                            //Need break to ironically prevent things breaking; creates a ton of break icons if datatype not null
                            break;
                        }
                    }
                }

                /*for (let j = 0; j < pokemonDataArray.length; j++) {
                    if (loopArray.pokemon == pokemonDataArray[j].pokemon) {
                        var td = tr.insertCell();
                        dexNum = document.createElement("Text");
                        dexNum.setAttribute("height", "13px");
                        dexNum.innerHTML = pokemonDataArray[j].pokedex;
                        dexNum.style.fontWeight = "bold";
                        dexNum.style.color = "white";
                        dexNum.style.fontFamily = "Arial, Helvetica, sans-serif";
                        dexNum.style.fontSize = "60%";
                        dexNum.style.display = "inline-flex";

                        td.appendChild(dexNum);
                    }
                }*/

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

                newDiv.appendChild(newTable);

            }

            if (previewBall || previewGender || previewShiny || previewMint || previewMisc || previewMark) {
                var tr = newTable.insertRow();
                newTable.bottom = "unset";
                tr.style.display = "flex";
                if (previewIVs) {
                    newTable.style.top = "65px";
                } else {
                    newTable.style.top = "79px";
                }

                if (previewBall) {
                    var td = tr.insertCell();
                    ball = document.createElement("IMG");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    ball.setAttribute("width", "13px");
                    ball.setAttribute("height", "13px");
                    ball.setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/" + loopArray.pokeball + ".png");

                    td.appendChild(ball);
                }

                if (previewGender) {
                    var td = tr.insertCell();
                    gender = document.createElement("IMG");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    gender.setAttribute("width", "13px");
                    gender.setAttribute("height", "13px");
                    gender.setAttribute("src", "https://poketrades.org/Resources/Misc/" + loopArray.gender + ".png");

                    td.appendChild(gender);
                }

                if (previewShiny) {
                    var td = tr.insertCell();
                    shiny = document.createElement("IMG");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    shiny.setAttribute("width", "13px");
                    shiny.setAttribute("height", "13px");
                    shiny.setAttribute("src", "https://poketrades.org/Resources/Misc/" + loopArray.shiny + ".png");

                    td.appendChild(shiny);
                }

                if (previewMint) {
                    var td = tr.insertCell();
                    mint = document.createElement("IMG");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    mint.setAttribute("width", "13px");
                    mint.setAttribute("height", "13px");
                    mint.setAttribute("src", "https://poketrades.org/Resources/Misc/" + loopArray.mint + ".png");

                    td.appendChild(mint);
                }

                if (previewMisc) {
                    var td = tr.insertCell();
                    misc = document.createElement("IMG");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    misc.setAttribute("width", "13px");
                    misc.setAttribute("height", "13px");
                    misc.setAttribute("src", "https://poketrades.org/Resources/Misc/" + loopArray.misc + ".png");

                    td.appendChild(misc);
                }

                if (previewMark) {
                    var td = tr.insertCell();
                    mark = document.createElement("IMG");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    mark.setAttribute("width", "13px");
                    mark.setAttribute("height", "13px");
                    mark.setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Marks/" + loopArray.mark + ".png");

                    td.appendChild(mark);
                }
                newDiv.appendChild(newTable);
            }

            if (previewIVs == true) {
                if (exactIVs) {
                    var tr = newTable.insertRow();
                    tr.style.display = "flex";
                    var td = tr.insertCell();
                    textIVs = document.createElement("Text");
                    td.setAttribute("height", "13px");
                    textIVs.setAttribute("height", "13px");
                    textIVs.innerHTML = loopArray.iv_hp + "/" + loopArray.iv_att + "/" + loopArray.iv_def + "/" + loopArray.iv_spa + "/" + loopArray.iv_spd + "/" + loopArray.iv_spe;
                    textIVs.style.fontWeight = "bold";
                    textIVs.style.color = "white";
                    textIVs.style.fontFamily = "Arial, Helvetica, sans-serif";
                    textIVs.style.fontSize = "60%";

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
                        ivHP.setAttribute("src", "https://poketrades.org/Resources/Misc/Max IV Icon.png");
                    }
                    else if (loopArray.iv_hp == "30") {
                        ivHP.setAttribute("src", "https://poketrades.org/Resources/Misc/30 IV Icon.png");
                    }
                    else if (loopArray.iv_hp == "0") {
                        ivHP.setAttribute("src", "https://poketrades.org/Resources/Misc/0 IV Icon.png");
                    }
                    else if (loopArray.iv_hp == "1") {
                        ivHP.setAttribute("src", "https://poketrades.org/Resources/Misc/1 IV Icon.png");
                    }
                    else if (loopArray.iv_hp == "HT") {
                        ivHP.setAttribute("src", "https://poketrades.org/Resources/Misc/HT IV Icon.png");
                    } else {
                        ivHP.setAttribute("src", "https://poketrades.org/Resources/Misc/X IV Icon.png");
                    }
                    td.appendChild(ivHP);


                    var td = tr.insertCell();
                    ivAtt = document.createElement("IMG");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    ivAtt.setAttribute("width", "13px");
                    ivAtt.setAttribute("height", "13px");
                    if (loopArray.iv_att == "31") {
                        ivAtt.setAttribute("src", "https://poketrades.org/Resources/Misc/Max IV Icon.png");
                    }
                    else if (loopArray.iv_att == "30") {
                        ivAtt.setAttribute("src", "https://poketrades.org/Resources/Misc/30 IV Icon.png");
                    }
                    else if (loopArray.iv_att == "0") {
                        ivAtt.setAttribute("src", "https://poketrades.org/Resources/Misc/0 IV Icon.png");
                    }
                    else if (loopArray.iv_att == "1") {
                        ivAtt.setAttribute("src", "https://poketrades.org/Resources/Misc/1 IV Icon.png");
                    }
                    else if (loopArray.iv_att == "HT") {
                        ivAtt.setAttribute("src", "https://poketrades.org/Resources/Misc/HT IV Icon.png");
                    } else {
                        ivAtt.setAttribute("src", "https://poketrades.org/Resources/Misc/X IV Icon.png");
                    }
                    td.appendChild(ivAtt);

                    var td = tr.insertCell();
                    ivDef = document.createElement("IMG");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    ivDef.setAttribute("width", "13px");
                    ivDef.setAttribute("height", "13px");
                    if (loopArray.iv_def == "31") {
                        ivDef.setAttribute("src", "https://poketrades.org/Resources/Misc/Max IV Icon.png");
                    }
                    else if (loopArray.iv_def == "30") {
                        ivDef.setAttribute("src", "https://poketrades.org/Resources/Misc/30 IV Icon.png");
                    }
                    else if (loopArray.iv_def == "0") {
                        ivDef.setAttribute("src", "https://poketrades.org/Resources/Misc/0 IV Icon.png");
                    }
                    else if (loopArray.iv_def == "1") {
                        ivDef.setAttribute("src", "https://poketrades.org/Resources/Misc/1 IV Icon.png");
                    }
                    else if (loopArray.iv_def == "HT") {
                        ivDef.setAttribute("src", "https://poketrades.org/Resources/Misc/HT IV Icon.png");
                    } else {
                        ivDef.setAttribute("src", "https://poketrades.org/Resources/Misc/X IV Icon.png");
                    }
                    td.appendChild(ivDef);

                    var td = tr.insertCell();
                    ivSpa = document.createElement("IMG");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    ivSpa.setAttribute("width", "13px");
                    ivSpa.setAttribute("height", "13px");
                    if (loopArray.iv_spa == "31") {
                        ivSpa.setAttribute("src", "https://poketrades.org/Resources/Misc/Max IV Icon.png");
                    }
                    else if (loopArray.iv_spa == "30") {
                        ivSpa.setAttribute("src", "https://poketrades.org/Resources/Misc/30 IV Icon.png");
                    }
                    else if (loopArray.iv_spa == "0") {
                        ivSpa.setAttribute("src", "https://poketrades.org/Resources/Misc/0 IV Icon.png");
                    }
                    else if (loopArray.iv_spa == "1") {
                        ivSpa.setAttribute("src", "https://poketrades.org/Resources/Misc/1 IV Icon.png");
                    }
                    else if (loopArray.iv_spa == "HT") {
                        ivSpa.setAttribute("src", "https://poketrades.org/Resources/Misc/HT IV Icon.png");
                    } else {
                        ivSpa.setAttribute("src", "https://poketrades.org/Resources/Misc/X IV Icon.png");
                    }
                    td.appendChild(ivSpa);

                    var td = tr.insertCell();
                    ivSpd = document.createElement("IMG");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    ivSpd.setAttribute("width", "13px");
                    ivSpd.setAttribute("height", "13px");
                    if (loopArray.iv_spd == "31") {
                        ivSpd.setAttribute("src", "https://poketrades.org/Resources/Misc/Max IV Icon.png");
                    }
                    else if (loopArray.iv_spd == "30") {
                        ivSpd.setAttribute("src", "https://poketrades.org/Resources/Misc/30 IV Icon.png");
                    }
                    else if (loopArray.iv_spd == "0") {
                        ivSpd.setAttribute("src", "https://poketrades.org/Resources/Misc/0 IV Icon.png");
                    }
                    else if (loopArray.iv_spd == "1") {
                        ivSpd.setAttribute("src", "https://poketrades.org/Resources/Misc/1 IV Icon.png");
                    }
                    else if (loopArray.iv_spd == "HT") {
                        ivSpd.setAttribute("src", "https://poketrades.org/Resources/Misc/HT IV Icon.png");
                    } else {
                        ivSpd.setAttribute("src", "https://poketrades.org/Resources/Misc/X IV Icon.png");
                    }
                    td.appendChild(ivSpd);

                    var td = tr.insertCell();
                    ivSpe = document.createElement("IMG");
                    td.setAttribute("width", "13px");
                    td.setAttribute("height", "13px");
                    ivSpe.setAttribute("width", "13px");
                    ivSpe.setAttribute("height", "13px");
                    if (loopArray.iv_spe == "31") {
                        ivSpe.setAttribute("src", "https://poketrades.org/Resources/Misc/Max IV Icon.png");
                    }
                    else if (loopArray.iv_spe == "30") {
                        ivSpe.setAttribute("src", "https://poketrades.org/Resources/Misc/30 IV Icon.png");
                    }
                    else if (loopArray.iv_spe == "0") {
                        ivSpe.setAttribute("src", "https://poketrades.org/Resources/Misc/0 IV Icon.png");
                    }
                    else if (loopArray.iv_spe == "1") {
                        ivSpe.setAttribute("src", "https://poketrades.org/Resources/Misc/1 IV Icon.png");
                    }
                    else if (loopArray.iv_spe == "HT") {
                        ivSpe.setAttribute("src", "https://poketrades.org/Resources/Misc/HT IV Icon.png");
                    } else {
                        ivSpe.setAttribute("src", "https://poketrades.org/Resources/Misc/X IV Icon.png");
                    }
                    td.appendChild(ivSpe);

                    newDiv.appendChild(newTable);
                }
            }


            if (advancedPreview) {
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

                newDiv.appendChild(newTable);
            }
        }




        //Setting up the preview IVs


        if (shinyLockedArray.includes(loopArray.pokemon) && !loopArray.shiny.includes("Normal")) {
            theImage.setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }

        else if (genderDifferencesArray.includes(loopArray.pokemon)) {
            if (loopArray.gender == "Male" || loopArray.gender == "(Any Gender)") {
                //console.log("WOOOORK")
                if (loopArray.shiny.includes("Normal")) {
                    if (oldSprites) {
                        if (loopArray.game_obtained == "R/B/Y") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen1Sprites/Gen1/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "G/S/C") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen2Sprites/Gen2/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen3Sprites/Gen3/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen4Sprites/Gen4/" + loopArray.pokemon + "-.png");
                            } else {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen4Sprites/Gen4/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BW/BW2") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen5Sprites/Gen5/" + loopArray.pokemon + "-Male.png");
                        }
                        else {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Male.png");
                        }
                    } else {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Male.png");
                    }
                    document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).setAttribute("src", "https://poketrades.org/Resources/Home/" + arrayData["Rows"][i].pokemon + "-Male.png")
                    };
                }
                else if (!loopArray.shiny.includes("Normal")) {
                    if (oldSprites) {
                        if (loopArray.game_obtained == "R/B/Y") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "G/S/C") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen3Sprites/Gen3Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen4Sprites/Gen4Shiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen4Sprites/Gen4Shiny/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BW/BW2") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen5Sprites/Gen5Shiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen5Sprites/Gen5Shiny/" + loopArray.pokemon + "-Male.png");
                            }
                        }
                        else {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Male-Shiny.png");
                        }
                    } else {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Male-Shiny.png");
                    }
                    document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).setAttribute("src", "https://poketrades.org/Resources/Home/" + arrayData["Rows"][i].pokemon + "-Male-Shiny.png")
                    };
                }
            }
            else if (loopArray.gender == "Female") {
                if (loopArray.shiny.includes("Normal")) {
                    if (oldSprites) {
                        if (loopArray.game_obtained == "R/B/Y") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen1Sprites/Gen1/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "G/S/C") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen2Sprites/Gen2/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen3Sprites/Gen3/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen4Sprites/Gen4/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen4Sprites/Gen4/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BW/BW2") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen5Sprites/Gen5/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen5Sprites/Gen5/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Female.png");
                        }
                    } else {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Female.png");
                    }
                    document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).setAttribute("src", "https://poketrades.org/Resources/Home/" + arrayData["Rows"][i].pokemon + "-Female.png")
                    };
                }
                else if (!loopArray.shiny.includes("Normal")) {
                    if (oldSprites) {
                        if (loopArray.game_obtained == "R/B/Y") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "G/S/C") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen3Sprites/Gen3Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                            if (loopArray.pokemon == "Eevee") {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen4Sprites/Gen4Shiny/" + loopArray.pokemon + ".png");
                            } else {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen4Sprites/Gen4Shiny/" + loopArray.pokemon + "-Female.png");
                            }
                        }
                        else if (loopArray.game_obtained == "BW/BW2") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen5Sprites/Gen5Shiny/" + loopArray.pokemon + "-Female.png");
                        }
                        else {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Female-Shiny.png");
                        }
                    } else {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Female-Shiny.png");
                    }
                    document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).setAttribute("src", "https://poketrades.org/Resources/Home/" + arrayData["Rows"][i].pokemon + "-Female-Shiny.png")
                    };
                }
            }
        } else {
            if (loopArray.shiny.includes("Normal")) {
                if (oldSprites) {
                    if (loopArray.game_obtained == "R/B/Y") {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen1Sprites/Gen1/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "G/S/C") {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen2Sprites/Gen2/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen3Sprites/Gen3/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen4Sprites/Gen4/" + loopArray.pokemon + ".png");
                    }
                    else if (loopArray.game_obtained == "BW/BW2") {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen5Sprites/Gen5/" + loopArray.pokemon + ".png");
                    }
                    else {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + ".png")
                    }
                } else {
                    theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + ".png")
                }
            }
            else {
                if (shinyExceptionArray.includes(loopArray.pokemon)) {
                    if (loopArray.pokemon.includes("Minior")) {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Minior-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Strawberry")) {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Strawberry-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Berry")) {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Berry-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Love")) {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Love-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Star")) {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Star-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Clover")) {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Clover-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Flower")) {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Flower-Shiny.png");
                    }
                    else if (loopArray.pokemon.includes("Alcremie-Ribbon")) {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Ribbon-Shiny.png");
                    }
                }
                else {
                    if (oldSprites) {
                        if (loopArray.game_obtained == "R/B/Y") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "G/S/C") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen2Sprites/Gen2Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "R/S/E" || loopArray.game_obtained == "FR/LG" || loopArray.game_obtained == "Colo/XD") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen3Sprites/Gen3Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "D/P/PT" || loopArray.game_obtained == "HG/SS") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen4Sprites/Gen4Shiny/" + loopArray.pokemon + ".png");
                        }
                        else if (loopArray.game_obtained == "BW/BW2") {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/OldGens/Gen5Sprites/Gen5Shiny/" + loopArray.pokemon + ".png");
                        }
                        else {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Shiny.png")
                        }
                    } else {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Shiny.png")
                    }

                    //loopArray does not work properly for some reason, so having to use arrayData.
                    document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).setAttribute("src", "https://poketrades.org/Resources/Home/" + arrayData["Rows"][i].pokemon + "-Shiny.png");
                    }

                }
            }
        }

        /*document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).onerror = function () {
            document.querySelector(`#${CSS.escape("GeneratedSelection " + (i))}`).setAttribute("src", "https://poketrades.org/Resources/PlaceHolderImage.png");
        }*/


        //Setting up the onclick to open the viewing area and to set the information required for it.
        newDiv.onclick = function () {
            console.log("Clicked");
            if (!currentlyRearranging) {
                if (selectedPokemon != null && viewingDetails.creation_id == arrayData["Rows"][i].creation_id) {
                    $('.VA-CloseButton').click();
                    return;
                } else {
                    viewingDetails = arrayData["Rows"][i];
                    console.log(viewingDetails);
                    pokemonImage = document.getElementById("GeneratedSelection " + (i)).getAttribute("src");
                    console.log(pokemonImage);
                    if (selectedPokemon != null) {
                        selectedPokemon.style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                        selectedPokemon.style.backgroundColor = "#084f65";
                    }
                    selectedPokemon = document.getElementById("GenerationGridDiv" + (i));
                    console.log(selectedPokemon);
                    selectedPokemon.style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                    selectedPokemon.style.backgroundColor = "#2E2D2D";
                    document.querySelector(".VA-Username").innerHTML = searchData.username + "#" + viewingDetails.user_id;
                    $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: viewingDetails.user_id, tradeOption: "Looking For" }, MatchMaking);

                    //AssigningOutline();
                    UpdateViewingDetails();

                    /*if (window.innerWidth < limitWidth) {
                        //Making it so when you click on a mon and Viewing Area hides it, that mon is scrolled to the new bottom.
                        var imageView = $(".GenerationGridDiv" + (i)).offset();
                        var imageViewTop = Math.abs(imageView.top);
                        console.log(imageViewTop)
                        console.log(document.querySelector('#SelectionArea').clientHeight)
                        //if (imageViewTop - 10 > document.querySelector('#SelectionArea').clientHeight \ 2) {
                        if (imageViewTop > document.querySelector('#SelectionArea').clientHeight) {
                            //console.log(imageViewTop)
                            document.getElementById("GenerationGridDiv" + (i)).scrollIntoView(false);
                        } else {
                            console.log("Else " + imageViewTop)
                        }
                        //console.log($(".GenerationGridDiv" + (i)).offset());
                    }*/
                }

                $.post("https://poketrades.org/PHP/modify_check.php", { token: token, searchID: viewingDetails.user_id }, ModifyCheckViewing);
            } else {
                if (oldPosition == "") {
                    movingPokemon = document.getElementById("GenerationGridDiv" + (i));
                    oldPosition = arrayData["Rows"][i].position;
                    tempCreationID = arrayData["Rows"][i].creation_id;
                    if (viewingDetails != null && selectedPokemon != null) {
                        if (arrayData["Rows"][i].creation_id == viewingDetails.creation_id && selectedPokemon != null) {
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
                    //document.querySelector("#PA-ForTradeBunches").style.pointerEvents = "none";
                    //document.querySelector("#PA-LookingForBunches").style.pointerEvents = "none";
                } else {
                    movingPokemon = null;
                    selectedPokemon = null;
                    newPosition = arrayData["Rows"][i].position;
                    if (oldPosition != newPosition) {
                        $.post("https://poketrades.org/PHP/move_selection.php", { token: token, creationID: tempCreationID, firstSelection: oldPosition, secondSelection: newPosition, tradeOption: tradeOption }, MoveCopyPokemon);
                    } else {
                        $.post("https://poketrades.org/PHP/copy_selection.php", { token: token, creationID: tempCreationID, originalPosition: oldPosition, tradeOption: tradeOption }, MoveCopyPokemon);
                    }
                }
            }
        }

        newDiv.onmouseover = function () {
            if (selectedPokemon == null && hoverInfo == true && window.innerWidth > limitWidth) {
                viewingDetails = arrayData["Rows"][i];
                pokemonImage = document.getElementById("GeneratedSelection " + (i)).getAttribute("src");
                document.querySelector(".VA-Username").innerHTML = searchData.username + "#" + viewingDetails.user_id;
                $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: viewingDetails.user_id, tradeOption: "Looking For" }, MatchMaking);

                //AssigningOutline();
                UpdateViewingDetails();

                if (window.innerWidth < limitWidth) {
                    //Making it so when you click on a mon and Viewing Area hides it, that mon is scrolled to the new bottom.
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
            }
        }
        if (viewingDetails != null && selectedPokemon != null) {
            if (arrayData["Rows"][i].creation_id == viewingDetails.creation_id) {
                selectedPokemon = document.getElementById("GenerationGridDiv" + (i));
                document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#2E2D2D";
            }
        }

        /*newDiv.onmouseout = function () {
            if (selectedPokemon == null) {
                $('.VA-CloseButton').click();
            }
        }*/
    }
    //Assigning the outline in case a pokemon generated is the one still in the viewing area so the user knows which one it is.
    //AssigningOutline();
    HideLoading();
}

function MoveCopyPokemon() {
    MoveFinished();
    //$("#GridContainer").remove();
    document.querySelector(".SA-MoveButton").innerHTML = "Move/Copy";
    currentlyRearranging = false;
    oldPosition = "";
    newPosition = "";
    ShowLoading();
    PostGenerateSelection();
    //$.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption, bunchname: bunchname, searchbar: searchPokemonText }, GenerateSelection);
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
        $.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: "For Trade", showEmpty: showEmpty }, ForTradeData);
    } else if (tradeOption == "Looking For") {
        $.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption, showEmpty: showEmpty }, LookingForData);
    }
    //$.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, GenerateBunch);
}

function UpdateViewingDetails() {

    document.querySelector(".VA-Bunch").innerHTML = viewingDetails.bunch;
    document.querySelector(".VA-Lang").innerHTML = "[" + viewingDetails.language + "]";
    document.querySelector(".VA-ObtainedInfo").innerHTML = viewingDetails.how_obtained + " " + viewingDetails.game_obtained;
    //document.querySelector(".VA-HowObtained").innerHTML = viewingDetails.how_obtained;
    //document.querySelector(".VA-GameObtained").innerHTML = viewingDetails.game_obtained;

    if (viewingDetails.gen6_availability == "Not Available") {
        Gen6 = "Not Available";
        document.querySelector(".VA-Gen6").style.color = "#C83939";
    } else {
        Gen6 = "Available";
        document.querySelector(".VA-Gen6").style.color = "#36E26E";
    }

    if (viewingDetails.gen7_availability == "Not Available") {
        Gen7 = "Not Available";
        document.querySelector(".VA-Gen7").style.color = "#C83939";
    } else {
        Gen7 = "Available";
        document.querySelector(".VA-Gen7").style.color = "#36E26E";
    }

    if (viewingDetails.gen8_availability == "Not Available") {
        Gen8 = "Not Available";
        document.querySelector(".VA-Gen8").style.color = "#C83939";
    } else {
        Gen8 = "Available";
        document.querySelector(".VA-Gen8").style.color = "#36E26E";
    }

    if (viewingDetails.home_availability == "Not Available") {
        Home = "Not Available";
        document.querySelector(".VA-Home").style.color = "#C83939";
    } else {
        Home = "Available";
        document.querySelector(".VA-Home").style.color = "#36E26E";
    }

    document.querySelector(".VA-PokemonImage").setAttribute("src", pokemonImage);
    document.querySelector(".VA-PokemonName").innerHTML = viewingDetails.pokemon;
    if (viewingDetails.nickname != "(No Nickname)") {
        document.querySelector(".VA-Nickname").style.display = "inline";
        document.querySelector(".VA-Nickname").innerHTML = viewingDetails.nickname;
    } else {
        document.querySelector(".VA-Nickname").style.display = "none";
    }

    if (viewingDetails.iv_hp == "X" && viewingDetails.iv_att == "X" && viewingDetails.iv_def == "X" &&
        viewingDetails.iv_spa == "X" && viewingDetails.iv_spd == "X" && viewingDetails.iv_spe == "X") {

        document.querySelector(".VA-IVs").style.display = "none";
    } else {
        document.querySelector(".VA-IVs").innerHTML = "IVS: " + viewingDetails.iv_hp + "/" + viewingDetails.iv_att + "/" +
            viewingDetails.iv_def + "/" + viewingDetails.iv_spa + "/" + viewingDetails.iv_spd + "/" + viewingDetails.iv_spe;
        document.querySelector(".VA-IVs").style.display = "inline";
    }

    if (viewingDetails.ev_hp == "X" && viewingDetails.ev_att == "X" && viewingDetails.ev_def == "X" &&
        viewingDetails.ev_spa == "X" && viewingDetails.ev_spd == "X" && viewingDetails.ev_spe == "X") {

        document.querySelector(".VA-EVs").style.display = "none";
    } else {
        document.querySelector(".VA-EVs").innerHTML = "EVS: " + viewingDetails.ev_hp + "/" + viewingDetails.ev_att + "/" +
            viewingDetails.ev_def + "/" + viewingDetails.ev_spa + "/" + viewingDetails.ev_spd + "/" + viewingDetails.ev_spe;
        document.querySelector(".VA-EVs").style.display = "inline";
    }

    document.querySelector(".VA-Pokeball").setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/" + viewingDetails.pokeball + ".png");

    document.querySelector(".VA-Gender").setAttribute("src", "https://poketrades.org/Resources/Misc/" + viewingDetails.gender + ".png");
    document.querySelector(".VA-Shiny").setAttribute("src", "https://poketrades.org/Resources/Misc/" + viewingDetails.shiny + ".png");
    document.querySelector(".VA-Mint").setAttribute("src", "https://poketrades.org/Resources/Misc/" + viewingDetails.mint + ".png");
    document.querySelector(".VA-Misc").setAttribute("src", "https://poketrades.org/Resources/Misc/" + viewingDetails.misc + ".png");
    document.querySelector(".VA-Mark").setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Marks/" + viewingDetails.mark + ".png");
    document.querySelector(".VA-Nature").innerHTML = "Nature: " + viewingDetails.nature;
    document.querySelector(".VA-Ability").innerHTML = "Ability: " + viewingDetails.ability;
    document.querySelector(".VA-OT").innerHTML = "OT: " + viewingDetails.game_ot;
    document.querySelector(".VA-ID").innerHTML = "ID: " + viewingDetails.game_id;
    document.querySelector(".VA-Status").innerHTML = "Status: " + viewingDetails.status;
    if (viewingDetails.event_info == "(Not Event)") {
        document.querySelector(".VA-Event").style.display = "none";
    } else {
        document.querySelector(".VA-Event").innerHTML = "Event: " + viewingDetails.event_info;
        document.querySelector(".VA-Event").style.display = "flex";
    }
    document.querySelector(".ViewingProof").innerHTML = viewingDetails.proof;

    //document.querySelector(".VA-ToggleProof").style.display = "inline-table";
    if (viewingDetails.proof == "(No Proof)") {
        document.querySelector(".ViewingProof").style.display = "none";
        document.querySelector(".VA-LinkRedirector").style.display = "none";
        document.querySelector(".VA-ToggleProof").style.display = "none";
    } else {
        var imageError = false;
        var videoError = false;
        if (!viewingDetails.proof.includes("imgur")) {

            if (viewingDetails.proof.includes(".mp4") || viewingDetails.proof.includes(".MP4")) {
                if (document.querySelector(".VA-ProofVideo").getAttribute("src") != viewingDetails.proof || document.querySelector(".VA-ProofVideo").innerHTML != viewingDetails.proof) {
                    document.querySelector(".VA-ProofVideo").setAttribute("src", viewingDetails.proof);
                    document.querySelector(".VA-ToggleProof").style.display = "block";
                    document.querySelector(".VA-ProofImage").style.display = "none";
                    document.querySelector(".VA-ProofVideo").style.display = "block";
                    document.querySelector(".VA-LinkRedirector").setAttribute("href", viewingDetails.proof);
                    document.querySelector(".VA-ProofVideo").onerror = function () {
                        document.querySelector(".VA-LinkRedirector").style.display = "none";
                        document.querySelector(".VA-ToggleProof").style.display = "none";
                        document.querySelector(".ViewingProof").setAttribute("href", viewingDetails.proof);
                        document.querySelector(".ViewingProof").style.color = "#4343FF";
                        document.querySelector(".ViewingProof").style.display = "flex";
                        document.querySelector(".VA-LinkRedirector").setAttribute("href", null);
                    }
                    document.querySelector(".ViewingProof").style.display = "none";
                    if (toggleOn) {
                        document.querySelector(".VA-LinkRedirector").style.display = "flex";
                    }
                }



            } else {
                if (document.querySelector(".VA-ProofImage").getAttribute("src") != viewingDetails.proof || document.querySelector(".VA-ProofImage").innerHTML != viewingDetails.proof) {
                    document.querySelector(".VA-ProofImage").setAttribute("src", viewingDetails.proof);
                    document.querySelector(".VA-LinkRedirector").style.display = "none";
                    document.querySelector(".VA-ProofVideo").style.display = "none";
                    document.querySelector(".VA-ProofImage").style.display = "block";
                    document.querySelector(".VA-ToggleProof").style.display = "block";
                    document.querySelector(".VA-LinkRedirector").setAttribute("href", viewingDetails.proof);
                    document.querySelector(".VA-ProofImage").onerror = function () {
                        document.querySelector(".VA-LinkRedirector").style.display = "none";
                        document.querySelector(".VA-ToggleProof").style.display = "none";
                        document.querySelector(".ViewingProof").setAttribute("href", viewingDetails.proof);
                        document.querySelector(".ViewingProof").style.color = "#4343FF";
                        document.querySelector(".ViewingProof").style.display = "flex";
                        document.querySelector(".VA-LinkRedirector").setAttribute("href", null);
                    }
                    document.querySelector(".ViewingProof").style.display = "none";
                    if (toggleOn) {
                        document.querySelector(".VA-LinkRedirector").style.display = "flex";
                    }
                }
            }

        } else {
            document.querySelector(".VA-LinkRedirector").style.display = "none";
            document.querySelector(".VA-ToggleProof").style.display = "none";
            document.querySelector(".ViewingProof").setAttribute("href", viewingDetails.proof);
            document.querySelector(".ViewingProof").style.color = "#4343FF";
            document.querySelector(".ViewingProof").style.display = "flex";
        }



    }

    document.querySelector(".VA-Move1").innerHTML = viewingDetails.move_1;
    document.querySelector(".VA-Move2").innerHTML = viewingDetails.move_2;
    document.querySelector(".VA-Move3").innerHTML = viewingDetails.move_3;
    document.querySelector(".VA-Move4").innerHTML = viewingDetails.move_4;

    document.querySelector(".VA-LegacyMove1").innerHTML = viewingDetails.legacy_move_1;
    document.querySelector(".VA-LegacyMove2").innerHTML = viewingDetails.legacy_move_2;
    document.querySelector(".VA-LegacyMove3").innerHTML = viewingDetails.legacy_move_3;
    document.querySelector(".VA-LegacyMove4").innerHTML = viewingDetails.legacy_move_4;

    if (viewingDetails.legacy_move_1 == "(No Move)" && viewingDetails.legacy_move_2 == "(No Move)" &&
        viewingDetails.legacy_move_3 == "(No Move)" && viewingDetails.legacy_move_4 == "(No Move)") {
        document.querySelector(".VA-TransferMoves").style.display = "none";
        document.querySelector(".VA-LegacyMoves").style.display = "none";
    } else {
        document.querySelector(".VA-TransferMoves").style.display = "flex";
        document.querySelector(".VA-LegacyMoves").style.display = "grid";
    }

    if (viewingDetails.note == "(No Note)") {
        document.querySelector(".VA-Note").style.display = "none";
    } else {
        document.querySelector(".VA-Note").innerHTML = "Note: " + viewingDetails.note;
        document.querySelector(".VA-Note").style.display = "table";
    }
    if (document.querySelector("#ViewingArea").style.display != "block" && document.querySelector("#FilterArea").style.display != "block") {
        document.querySelector("#ViewingArea").style.display = "block";
        document.querySelector("#PanelArea").style.display = "none";
        //document.querySelector('#SelectionArea').style.width = "100%"
        /*if (document.querySelector('#SelectionArea').offsetWidth > limitWidth) {
            //var newWidth = document.querySelector('#SelectionArea').offsetWidth -= document.querySelector('#ViewingArea').offsetWidth;
            var newWidth = document.querySelector('#SelectionArea').offsetWidth - 420
            document.querySelector('#SelectionArea').style.width = newWidth + "px";
        } else {
            document.querySelector('#SelectionArea').style.height = "50%"
        }*/
    }

}