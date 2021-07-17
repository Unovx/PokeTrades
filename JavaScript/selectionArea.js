console.log(40 + 8 + 23 - 10);

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
    AssigningOutline();
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
        OpacityHalf();
        MoveStarted();
    } else {
        currentlyRearranging = false;
        movingPokemon = null;
        oldPosition = "";
        newPosition = "";
        document.querySelector(".SA-MoveButton").innerHTML = "Move/Copy";
        OpacityFull();
        AssigningOutline();
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
    document.querySelector("#PA-ForTradeBunches").style.pointerEvents = "initial";
    document.querySelector("#PA-LookingForBunches").style.pointerEvents = "intial";
    document.querySelector(".PA-Searchbar").disabled = false;
    OpacityFull();
}

//Setting Opacity to half to show that moving is in progress.
function OpacityHalf() {
    for (let i = 0; i < numberOfArrays; i++) {
        document.querySelector(".GenerationGridDiv" + (i)).style.opacity = "50%";
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
        document.querySelector(".GenerationGridDiv" + (i)).style.opacity = "100%";
    }

    for (let i = 0; i < ftBunches; i++) {
        document.querySelector(".ForTradeGridDiv" + (i)).style.opacity = "100%";
    }

    for (let i = 0; i < lfBunches; i++) {
        document.querySelector(".LookingForGridDiv" + (i)).style.opacity = "100%";
    }
}

/*function GenerateBunch(data) {
    numberOfArrays = null;
    //Using Jquery to parse the data and getting the length.
    bunchData = jQuery.parseJSON(data);
    if (bunchData["Rows"] != null) {
        numberOfBunches = bunchData["Rows"].length;
        console.log(numberOfBunches);
        console.log(bunchData);

        //Removing the grid container so I can create a new one and making it a child of GeneratedSelection.
        $("#GridContainer").remove();
        gridTest = document.createElement("div");
        gridTest.setAttribute("id", "GridContainer");
        document.getElementById("GeneratedSelection").appendChild(gridTest);

        //The Below is hard coding the "All Pokemon" bunch.
        newDiv = document.createElement("div");
        newDiv.setAttribute("class", "GenerationGridDiv");
        document.getElementById("GridContainer").appendChild(newDiv);
        newDiv.setAttribute("width", "100");
        newDiv.setAttribute("height", "100");

        theImage = document.createElement("IMG");
        theImage.setAttribute("id", "GeneratedSelection All");
        theImage.setAttribute("src", "https://poketrades.org/Resources/Fennel3.png");
        theImage.setAttribute("min-width", "100");
        theImage.setAttribute("height", "100");
        newDiv.appendChild(theImage);

        theText = document.createElement("P")
        theText.setAttribute("class", "theText");
        theText.innerHTML = "All Pokemon";
        newDiv.appendChild(theText);

        newDiv.onclick = function () {
            if (currentlyRearranging == false) {
                document.querySelector(".SA-Bunch").innerHTML = "All Pokemon";
                bunchname = "All Pokemon";
                ShowLoading();
                PostGenerateSelection();
                //$.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption, bunchname: bunchname }, GenerateSelection);
            }
        }

        for (let i = 0; i < numberOfBunches; i++) {

            //Creating newDivs for each bunch and making them children of the GridContainer
            newDiv = document.createElement("div");
            newDiv.setAttribute("class", "GenerationGridDiv" + (i));
            document.getElementById("GridContainer").appendChild(newDiv);
            newDiv.setAttribute("width", "100");
            newDiv.setAttribute("height", "100");

            //Storing each bunch in a array.
            bunchArray = [];
            bunchArray = bunchData["Rows"][i];
            theImage = document.createElement("IMG");
            theImage.setAttribute("id", "GeneratedSelection " + (i));

            //Setting the Icon
            if (iconExclusivesArray.includes(bunchArray.icon)) {
                if (allBallsArray.includes(bunchArray.icon) || bunchArray.icon == "Egg") {
                    theImage.setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Small Icons/" + bunchArray.icon + ".png");
                }
                else if (bunchArray.icon.includes("HP")) {
                    theImage.setAttribute("src", "https://poketrades.org/Resources/Misc/" + bunchArray.icon + ".png");
                } else {
                    if (bunchArray.shiny == "Shiny") {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchArray.icon + "-Shiny" + ".png");
                    } else {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchArray.icon + ".png");
                    }
                }
            } else {
                if (genderDifferencesArray.includes(bunchArray.icon)) {
                    if (bunchArray.gender == "Male" || bunchArray.gender == "(Any Gender)") {
                        console.log("WOOOORK")
                        if (bunchArray.shiny.includes("Normal")) {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchArray.icon + "-Male.png");
                        }
                        else if (!bunchArray.shiny.includes("Normal")) {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchArray.icon + "-Male-Shiny.png");
                        }
                    }
                    else if (bunchArray.gender == "Female") {
                        if (bunchArray.shiny.includes("Normal")) {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchArray.icon + "-Female.png");
                        }
                        else if (!bunchArray.shiny.includes("Normal")) {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchArray.icon + "-Female-Shiny.png");
                        }
                    }
                } else {
                    if (bunchArray.shiny.includes("Normal")) {
                        theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchArray.icon + ".png")
                    }
                    else {
                        if (shinyExceptionArray.includes(bunchArray.icon)) {
                            if (bunchArray.icon.includes("Minior")) {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Minior-Shiny.png");
                            }
                            else if (bunchArray.icon.includes("Alcremie-Strawberry")) {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Strawberry-Shiny.png");
                            }
                            else if (bunchArray.icon.includes("Alcremie-Berry")) {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Berry-Shiny.png");
                            }
                            else if (bunchArray.icon.includes("Alcremie-Love")) {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Love-Shiny.png");
                            }
                            else if (bunchArray.icon.includes("Alcremie-Star")) {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Star-Shiny.png");
                            }
                            else if (bunchArray.icon.includes("Alcremie-Clover")) {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Clover-Shiny.png");
                            }
                            else if (bunchArray.icon.includes("Alcremie-Flower")) {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Flower-Shiny.png");
                            }
                            else if (bunchArray.icon.includes("Alcremie-Ribbon")) {
                                theImage.setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Ribbon-Shiny.png");
                            }
                        }
                        else {
                            theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchArray.icon + "-Shiny.png")
                        }
                    }
                }
            }

            //Setting Image and Text Attributes
            theImage.setAttribute("width", "100");
            theImage.setAttribute("height", "100");
            newDiv.appendChild(theImage);

            theText = document.createElement("P")

            theText.setAttribute("class", "theText");
            theText.innerHTML = bunchArray.name;
            newDiv.appendChild(theText);


            //Creating an Onclick for the Div to open the relevant bunch
            newDiv.onclick = function () {
                if (currentlyRearranging != true) {
                    bunchDetails = bunchData["Rows"][i];
                    console.log(bunchDetails);
                    let bunch = bunchDetails.name;
                    console.log(bunch);
                    bunchname = bunch;
                    document.querySelector(".SA-Bunch").innerHTML = bunch;
                    ShowLoading();
                    PostGenerateSelection();
                    //$.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption, bunchname: bunch }, GenerateSelection);
                } else {
                    if (oldPosition == "") {
                        oldPosition = bunchData["Rows"][i].position;
                        tempCreationID = bunchData["Rows"][i].creation_id;
                        console.log(oldPosition);
                        document.querySelector(".GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 5px #3735a9";
                        document.querySelector(".GenerationGridDiv" + (i)).style.opacity = "100%";
                    } else {
                        newPosition = bunchData["Rows"][i].position;
                        console.log(newPosition);
                        if (oldPosition != newPosition) {
                            $.post("https://poketrades.org/PHP/move_bunch.php", { token: token, creationID: tempCreationID, firstSelection: oldPosition, secondSelection: newPosition, tradeOption: tradeOption }, MoveBunch);
                        } else {
                            document.querySelector(".SA-MoveButton").innerHTML = "Move";
                            currentlyRearranging = false;
                            oldPosition = "";
                            newPosition = "";
                            RemoveBunchOutline();
                        }
                    }
                }

            }
        }
    }
    HideLoading();
}*/

function GenerateSelection(data) {
    numberOfBunches = null;
    if (bunchname != "") {
        //Showing the bunch name and setting up the ability to exit out the bunch.
        document.querySelector(".SA-Bunch").style.opacity = "100%";
    }
    //document.querySelector(".SA-ExitBunch").style.pointerEvents = "initial";
    //document.querySelector(".SA-ExitBunch").style.backgroundColor = "#efefef";

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
        newDiv.setAttribute("class", "GenerationGridDiv" + (i));
        document.getElementById("GridContainer").appendChild(newDiv);
        newDiv.setAttribute("width", "100");
        newDiv.setAttribute("height", "100");
        document.querySelector(".GenerationGridDiv" + (i)).style.display = "flex";
        document.querySelector(".GenerationGridDiv" + (i)).style.position = "relative";
        document.querySelector(".GenerationGridDiv" + (i)).style.backgroundImage = "url('https://poketrades.org/Resources/Designs/Unselected Holder.png')";
        document.querySelector(".GenerationGridDiv" + (i)).style.backgroundSize = "contain";
        //Storing each pokemon in a array.
        loopArray = [];
        loopArray = arrayData["Rows"][i];


        //Setting the Image
        theImage = document.createElement("IMG");
        theImage.setAttribute("id", "GeneratedSelection " + (i));
        theImage.setAttribute("width", "100");
        theImage.setAttribute("height", "100");
        newDiv.appendChild(theImage);

        if (previewBall || previewGender || previewShiny || previewMint || previewMisc || previewMark) {
            newTable = document.createElement("table");
            newTable.style.position = "absolute";
            newTable.style.zIndex = "1";
            var tr = newTable.insertRow();
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


        //Setting up the preview IVs
        if (previewIVs == true) {
            newTable = document.createElement("table");
            newTable.style.position = "absolute";
            newTable.style.zIndex = "1";
            newTable.style.top = "79px";
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

        else if (shinyLockedArray.includes(loopArray.pokemon) && !loopArray.shiny.includes("Normal")) {
            theImage.setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }

        if (genderDifferencesArray.includes(loopArray.pokemon)) {
            if (loopArray.gender == "Male" || loopArray.gender == "(Any Gender)") {
                console.log("WOOOORK")
                if (loopArray.shiny.includes("Normal")) {
                    theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Male.png");
                }
                else if (!loopArray.shiny.includes("Normal")) {
                    theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Male-Shiny.png");
                }
            }
            else if (loopArray.gender == "Female") {
                if (loopArray.shiny.includes("Normal")) {
                    theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Female.png");
                }
                else if (!loopArray.shiny.includes("Normal")) {
                    theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Female-Shiny.png");
                }
            }
        } else {
            if (loopArray.shiny.includes("Normal")) {
                theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + ".png")
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
                    theImage.setAttribute("src", "https://poketrades.org/Resources/Home/" + loopArray.pokemon + "-Shiny.png")
                }


            }
        }


        //Setting Image Attributes
        if (selectedPokemon != null) {
            if (loopArray.creation_id == selectedPokemon.creation_id) {
                document.querySelector(".GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 5px #8135a9";
            }
        }

        //Setting up the onclick to open the viewing area and to set the information required for it.
        newDiv.onclick = function () {

            if (!currentlyRearranging) {
                viewingDetails = arrayData["Rows"][i];
                console.log(viewingDetails);
                pokemonImage = document.getElementById("GeneratedSelection " + (i)).getAttribute("src");
                console.log(pokemonImage);
                selectedPokemon = document.querySelector(".GenerationGridDiv" + (i));
                document.querySelector(".VA-Username").innerHTML = searchData.username + "#" + viewingDetails.user_id;
                $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: viewingDetails.user_id, tradeOption: "Looking For" }, MatchMaking);

                AssigningOutline();
                UpdateViewingDetails();

                if (window.innerWidth < limitWidth) {
                    //Making it so when you click on a mon and Viewing Area hides it, that mon is scrolled to the new bottom.
                    var imageView = $(".GenerationGridDiv" + (i)).offset();
                    var imageViewTop = Math.abs(imageView.top);
                    console.log(imageViewTop)
                    console.log(document.querySelector('#SelectionArea').clientHeight)
                    //if (imageViewTop - 10 > document.querySelector('#SelectionArea').clientHeight \ 2) {
                    if (imageViewTop > document.querySelector('#SelectionArea').clientHeight) {
                        //console.log(imageViewTop)
                        document.querySelector(".GenerationGridDiv" + (i)).scrollIntoView(false);
                    } else {
                        console.log("Else " + imageViewTop)
                    }
                    //console.log($(".GenerationGridDiv" + (i)).offset());
                }


                $.post("https://poketrades.org/PHP/modify_check.php", { token: token, searchID: viewingDetails.user_id }, ModifyCheckViewing);
            } else {
                if (oldPosition == "") {
                    movingPokemon = document.querySelector(".GenerationGridDiv" + (i));
                    oldPosition = arrayData["Rows"][i].position;
                    tempCreationID = arrayData["Rows"][i].creation_id;
                    if (arrayData["Rows"][i].creation_id == viewingDetails.creation_id) {
                        document.querySelector(".GenerationGridDiv" + (i)).style.backgroundImage = "url('https://poketrades.org/Resources/Designs/MovingSelected Holder.png')";
                    } else {
                        document.querySelector(".GenerationGridDiv" + (i)).style.backgroundImage = "url('https://poketrades.org/Resources/Designs/MovingUnselected Holder.png')";
                    }
                    document.querySelector(".GenerationGridDiv" + (i)).style.opacity = "100%";
                    document.querySelector("#PA-ForTradeBunches").style.pointerEvents = "none";
                    document.querySelector("#PA-LookingForBunches").style.pointerEvents = "none";
                } else {
                    movingPokemon = null;
                    newPosition = arrayData["Rows"][i].position;
                    if (oldPosition != newPosition) {
                        $.post("https://poketrades.org/PHP/move_selection.php", { token: token, creationID: tempCreationID, firstSelection: oldPosition, secondSelection: newPosition, tradeOption: tradeOption }, MoveCopyPokemon);
                    } else {
                        $.post("https://poketrades.org/PHP/copy_selection.php", { token: token, creationID: tempCreationID, originalPosition: oldPosition, tradeOption: tradeOption }, MoveCopyPokemon);
                    }
                }
            }
        }
    }
    //Assigning the outline in case a pokemon generated is the one still in the viewing area so the user knows which one it is.
    AssigningOutline();
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
    MoveFinished();
    //$("#GridContainer").remove();
    document.querySelector(".SA-MoveButton").innerHTML = "Move/Copy";
    currentlyRearranging = false;
    oldPosition = "";
    newPosition = "";
    ShowLoading();
    if (tradeOption == "For Trade") {
        $.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, ForTradeData);
    } else if (tradeOption == "Looking For") {
        $.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, LookingForData);
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
        document.querySelector(".VA-Nickname").innerHTML = viewingDetails.nickname;
    } else {
        document.querySelector(".VA-Nickname").style.display = "none";
    }

    if (viewingDetails.iv_hp == "X" && viewingDetails.iv_att == "X" && viewingDetails.iv_def == "X" &&
        viewingDetails.iv_spa == "X" && viewingDetails.iv_spd == "X" && viewingDetails.iv_spe == "X") {

        document.querySelector(".VA-IVs").style.display = "none";
    } else {
        document.querySelector(".VA-IVs").innerHTML = viewingDetails.iv_hp + "/" + viewingDetails.iv_att + "/" +
            viewingDetails.iv_def + "/" + viewingDetails.iv_spa + "/" + viewingDetails.iv_spd + "/" + viewingDetails.iv_spe;
        document.querySelector(".VA-IVs").style.display = "inline";
    }

    if (viewingDetails.ev_hp == "X" && viewingDetails.ev_att == "X" && viewingDetails.ev_def == "X" &&
        viewingDetails.ev_spa == "X" && viewingDetails.ev_spd == "X" && viewingDetails.ev_spe == "X") {

        document.querySelector(".VA-EVs").style.display = "none";
    } else {
        document.querySelector(".VA-EVs").innerHTML = viewingDetails.ev_hp + "/" + viewingDetails.ev_att + "/" +
            viewingDetails.ev_def + "/" + viewingDetails.ev_spa + "/" + viewingDetails.ev_spd + "/" + viewingDetails.ev_spe;
        document.querySelector(".VA-EVs").style.display = "inline";
    }

    document.querySelector(".VA-Pokeball").setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/" + viewingDetails.pokeball + ".png");

    document.querySelector(".VA-Gender").setAttribute("src", "https://poketrades.org/Resources/Misc/" + viewingDetails.gender + ".png");
    document.querySelector(".VA-Shiny").setAttribute("src", "https://poketrades.org/Resources/Misc/" + viewingDetails.shiny + ".png");
    document.querySelector(".VA-Mint").setAttribute("src", "https://poketrades.org/Resources/Misc/" + viewingDetails.mint + ".png");
    document.querySelector(".VA-Misc").setAttribute("src", "https://poketrades.org/Resources/Misc/" + viewingDetails.misc + ".png");
    document.querySelector(".VA-Mark").setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Marks/" + viewingDetails.mark + ".png");
    document.querySelector(".VA-Nature").innerHTML = viewingDetails.nature;
    document.querySelector(".VA-Ability").innerHTML = viewingDetails.ability;
    document.querySelector(".VA-OT").innerHTML = viewingDetails.game_ot;
    document.querySelector(".VA-ID").innerHTML = viewingDetails.game_id;
    document.querySelector(".VA-Status").innerHTML = viewingDetails.status;
    if (viewingDetails.event_info == "(Not Event)") {
        document.querySelector(".VA-Event").style.display = "none";
    } else {
        document.querySelector(".VA-Event").innerHTML = viewingDetails.event_info;
        document.querySelector(".VA-Event").style.display = "inline";
    }
    document.querySelector(".ViewingProof").innerHTML = viewingDetails.proof;
    if (viewingDetails.proof == "(No Proof)") {
        document.querySelector(".ViewingProof").style.display = "none";
        document.querySelector(".VA-LinkRedirector").style.display = "none";
        document.querySelector(".VA-ToggleProof").style.display = "none";
    } else {
        if (!viewingDetails.proof.includes("imgur")) {
            document.querySelector(".ViewingProof").style.display = "none";
            document.querySelector(".VA-LinkRedirector").style.display = "block";
            document.querySelector(".VA-ToggleProof").style.display = "inline-table";
            document.querySelector(".VA-ProofImage").setAttribute("src", viewingDetails.proof);
            document.querySelector(".VA-LinkRedirector").setAttribute("href", viewingDetails.proof);
        } else {
            document.querySelector(".VA-LinkRedirector").style.display = "none";
            document.querySelector(".VA-ToggleProof").style.display = "none";
            document.querySelector(".ViewingProof").setAttribute("href", viewingDetails.proof);
            document.querySelector(".ViewingProof").style.color = "#4343FF";
            document.querySelector(".ViewingProof").style.display = "flex";
        }
        document.querySelector(".VA-ProofImage").onerror = function () {
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