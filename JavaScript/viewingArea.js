viewingDetails = [];

AdditionalViewing1 = [];
AdditionalViewing2 = [];
AdditionalViewing3 = [];
AdditionalViewing4 = [];
AdditionalViewing5 = [];
AdditionalViewing6 = [];

var viewing1Image;
var viewing2Image;
var viewing3Image;
var viewing4Image;
var viewing5Image;
var viewing6Image;

viewing1Username = "";
viewing2Username = "";
viewing3Username = "";
viewing4Username = "";
viewing5Username = "";
viewing6Username = "";

var toggleOn = false;

$('.VA-CloseButton').click(function () {
    viewingDetails = null;
    if (selectedPokemon != null) {
        selectedPokemon.style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
        selectedPokemon.style.backgroundColor = "#084f65";
    }
    selectedPokemon = null;
    //AssigningOutline();
    document.querySelector("#SelectionArea").style.width = "100%";
    document.querySelector("#ViewingArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "block";
});

$('.VA-ModifyButton').click(function () {
    document.querySelector(".SA-CreateButton").style.pointerEvents = "none";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "grey";
    document.querySelector(".SA-MoveButton").style.pointerEvents = "none";
    document.querySelector(".SA-MoveButton").style.backgroundColor = "grey";
    document.querySelector("#ViewingArea").style.display = "none";
    OpenCreationArea();
    ValidatePokemon();
    AbilitySpecific();
    for (let i = 0; i < abilityDropdown.length; i++) {
        if (viewingDetails.ability == abilityDropdown[i].value && creationDetails.creation_id == viewingDetails.creation_id) {
            abilityDropdown.value = viewingDetails.ability;
        }
    }
});

$('.VA-DeleteButton').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".ViewingConfirmDelete").style.display = "block";
});

$('.VA-AddButton').click(function () {
    $.post("https://poketrades.org/PHP/add_selection.php", { token: token, creationID: viewingDetails.creation_id });
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".ViewingPokemonAdded").style.display = "block";
    $.post("https://poketrades.org/PHP/format_import.php", { token: token });
});

$('.VA-ToggleProof').click(function () {
    if (document.querySelector(".VA-ToggleProof").innerHTML == "Show Proof") {
        toggleOn = true
        if (viewingDetails.proof.includes(".mp4") || viewingDetails.proof.includes(".MP4")) {
            document.querySelector(".VA-ProofVideo").style.display = "block";
            document.querySelector(".VA-ProofImage").style.display = "none";
            document.querySelector(".VA-ToggleProof").innerHTML = "Hide Proof";
            document.querySelector(".VA-LinkRedirector").style.display = "flex";
        } else {
            document.querySelector(".VA-ProofImage").style.display = "block";
            document.querySelector(".VA-ProofVideo").style.display = "none";
            document.querySelector(".VA-ToggleProof").innerHTML = "Hide Proof";
            document.querySelector(".VA-LinkRedirector").style.display = "flex";
        }
    } else {
        toggleOn = false;
        document.querySelector(".VA-ProofImage").style.display = "none";
        document.querySelector(".VA-ProofVideo").style.display = "none";
        document.querySelector(".VA-ToggleProof").innerHTML = "Show Proof";
        document.querySelector(".VA-LinkRedirector").style.display = "none";
    }
});

function AssigningOutline() {
    //Makes sure arrayData isn't null so an error doesn't get brought up in specific cases like on the bunch area
    if (arrayData != null) {
        for (let i = 0; i < numberOfArrays; i++) {
            //document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 5px #0096c3";
            if (currentlyRearranging == true && movingPokemon == document.getElementById("GenerationGridDiv" + (i))) {

            }
            //if no pokemon is selected, then no pokemon need an outline
            else if (selectedPokemon == null) {
                document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#084f65";
            }
            //If it finds a generated row that has the same creation id as the current viewing id, it gives that div a outline
            else if (arrayData["Rows"][i].creation_id == viewingDetails.creation_id) {
                selectedPokemon = document.getElementById("GenerationGridDiv" + (i));
                document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#2E2D2D";
            } else {
                document.getElementById("GenerationGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
                document.getElementById("GenerationGridDiv" + (i)).style.backgroundColor = "#084f65";
            }
        }
    }
}

$('.VA-ViewingHelp').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".ViewingAdditionalHelp").style.display = "block";
});

$('.VA-AddAV1').click(function () {
    SetAV1();
});

$('.VA-AddAV2').click(function () {
    SetAV2();
});

$('.VA-AddAV3').click(function () {
    SetAV3();
});

$('.VA-AddAV4').click(function () {
    SetAV4();
});

$('.VA-AddAV5').click(function () {
    SetAV5();
});

$('.VA-AddAV6').click(function () {
    SetAV6();
});

$('.VA-AV1').click(function () {
    if (document.querySelector(".VA-AV1").getAttribute("src") == "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV1();
        AssigningOutline();
        $.post("https://poketrades.org/PHP/modify_check_viewing.php", { token: token, searchID: viewingDetails.user_id }, ModifyCheckViewing);
    }
});

$('.VA-AV2').click(function () {
    if (document.querySelector(".VA-AV2").getAttribute("src") == "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV2();
        AssigningOutline();
        $.post("https://poketrades.org/PHP/modify_check_viewing.php", { token: token, searchID: viewingDetails.user_id }, ModifyCheckViewing);
    }
});

$('.VA-AV3').click(function () {
    if (document.querySelector(".VA-AV3").getAttribute("src") == "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV3();
        AssigningOutline();
        $.post("https://poketrades.org/PHP/modify_check_viewing.php", { token: token, searchID: viewingDetails.user_id }, ModifyCheckViewing);
    }
});

$('.VA-AV4').click(function () {
    if (document.querySelector(".VA-AV4").getAttribute("src") == "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV4();
        AssigningOutline();
        $.post("https://poketrades.org/PHP/modify_check_viewing.php", { token: token, searchID: viewingDetails.user_id }, ModifyCheckViewing);
    }
});

$('.VA-AV5').click(function () {
    if (document.querySelector(".VA-AV5").getAttribute("src") == "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV5();
        AssigningOutline();
        $.post("https://poketrades.org/PHP/modify_check_viewing.php", { token: token, searchID: viewingDetails.user_id }, ModifyCheckViewing);
    }
});

$('.VA-AV6').click(function () {
    if (document.querySelector(".VA-AV6").getAttribute("src") == "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV6();
        AssigningOutline();
        $.post("https://poketrades.org/PHP/modify_check_viewing.php", { token: token, searchID: viewingDetails.user_id }, ModifyCheckViewing);
    }
});

function OpenCreationArea() {

    //document.querySelector("#SelectionArea").style.width = "100%";
    document.querySelector("#CreationArea").style.display = "block";
    //$.post("https://poketrades.org/PHP/generate_all_bunches.php", { token: token, tradeOption: tradeOption }, UserBunches);
    CreationReset();
    creationDetails = viewingDetails;
    creationID = creationDetails.creation_id;

    bunchDropdown.value = creationDetails.bunch;
    pokemonDropdown.value = creationDetails.pokemon;
    nicknameInput.value = creationDetails.nickname;
    ballDropdown.value = creationDetails.pokeball;
    genderDropdown.value = creationDetails.gender;
    shinyDropdown.value = creationDetails.shiny;
    mintDropdown.value = creationDetails.mint;
    miscDropdown.value = creationDetails.misc;
    markDropdown.value = creationDetails.mark;
    natureDropdown.value = creationDetails.nature;
    abilityDropdown.value = creationDetails.ability;
    otInput.value = creationDetails.game_ot;
    idInput.value = creationDetails.game_id;
    statusDropdown.value = creationDetails.status;
    eventDropdown.value = creationDetails.event_info;
    ivHpDropdown.value = creationDetails.iv_hp;
    ivAttDropdown.value = creationDetails.iv_att;
    ivDefDropdown.value = creationDetails.iv_def;
    ivSpaDropdown.value = creationDetails.iv_spa;
    ivSpdDropdown.value = creationDetails.iv_spd;
    ivSpeDropdown.value = creationDetails.iv_spe;
    evHpDropdown.value = creationDetails.ev_hp;
    evAttDropdown.value = creationDetails.ev_att;
    evDefDropdown.value = creationDetails.ev_def;
    evSpaDropdown.value = creationDetails.ev_spa;
    evSpdDropdown.value = creationDetails.ev_spd;
    evSpeDropdown.value = creationDetails.ev_spe;
    move1Dropdown.value = creationDetails.move_1;
    move2Dropdown.value = creationDetails.move_2;
    move3Dropdown.value = creationDetails.move_3;
    move4Dropdown.value = creationDetails.move_4;
    legacyMove1Dropdown.value = creationDetails.legacy_move_1;
    legacyMove2Dropdown.value = creationDetails.legacy_move_2;
    legacyMove3Dropdown.value = creationDetails.legacy_move_3;
    legacyMove4Dropdown.value = creationDetails.legacy_move_4;
    howObtainedDropdown.value = creationDetails.how_obtained;
    gameObtainedDropdown.value = creationDetails.game_obtained;
    languageDropdown.value = creationDetails.language;
    displayDropdown.value = creationDetails.display;
    proofInput.value = creationDetails.proof;
    noteFieldInput.value = creationDetails.note;
    noteFieldInput.style.height = "";
    noteFieldInput.style.height = noteFieldInput.scrollHeight + "px";

    if (creationDetails.gen6_availability == "Available") {
        Gen6 = "Available";
        document.querySelector(".CA-Gen6").style.backgroundColor = "#36E26E";
    } else {
        Gen6 = "Not Available";
        document.querySelector(".CA-Gen6").style.backgroundColor = "#C83939";
    }

    if (creationDetails.gen7_availability == "Available") {
        Gen7 = "Available";
        document.querySelector(".CA-Gen7").style.backgroundColor = "#36E26E";
    } else {
        Gen7 = "Not Available";
        document.querySelector(".CA-Gen7").style.backgroundColor = "#C83939";
    }

    if (creationDetails.gen8_availability == "Available") {
        Gen8 = "Available";
        document.querySelector(".CA-Gen8").style.backgroundColor = "#36E26E";
    } else {
        Gen8 = "Not Available";
        document.querySelector(".CA-Gen8").style.backgroundColor = "#C83939";
    }

    if (creationDetails.home_availability == "Available") {
        Home = "Available";
        document.querySelector(".CA-Home").style.backgroundColor = "#36E26E";
    } else {
        Home = "Not Available";
        document.querySelector(".CA-Home").style.backgroundColor = "#C83939";
    }

    pokemonValue = creationDetails.pokemon;
    genderValue = creationDetails.gender;
    shinyValue = creationDetails.shiny;

    ValidatePokemon();
}

function SetAV1() {
    AdditionalViewing1 = viewingDetails;
    viewing1Image = pokemonImage;
    viewing1Username = searchData.username;
    document.querySelector(".VA-AV1").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function SetAV2() {
    AdditionalViewing2 = viewingDetails;
    viewing2Image = pokemonImage;
    viewing2Username = searchData.username;
    document.querySelector(".VA-AV2").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function SetAV3() {
    AdditionalViewing3 = viewingDetails;
    viewing3Image = pokemonImage;
    viewing3Username = searchData.username;
    document.querySelector(".VA-AV3").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function SetAV4() {
    AdditionalViewing4 = viewingDetails;
    viewing4Image = pokemonImage;
    viewing4Username = searchData.username;
    document.querySelector(".VA-AV4").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function SetAV5() {
    AdditionalViewing5 = viewingDetails;
    viewing5Image = pokemonImage;
    viewing5Username = searchData.username;
    document.querySelector(".VA-AV5").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function SetAV6() {
    AdditionalViewing6 = viewingDetails;
    viewing6Image = pokemonImage;
    viewing6Username = searchData.username;
    document.querySelector(".VA-AV6").src = "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function ShowAV1() {
    pokemonImage = viewing1Image;
    viewingDetails = AdditionalViewing1;
    document.querySelector(".VA-Username").innerHTML = viewing1Username + "#" + viewingDetails.user_id;
    $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: viewingDetails.user_id, tradeOption: "Looking For" }, MatchMaking);
    UpdateViewingDetails();
}

function ShowAV2() {
    pokemonImage = viewing2Image;
    viewingDetails = AdditionalViewing2;
    document.querySelector(".VA-Username").innerHTML = viewing2Username + "#" + viewingDetails.user_id;
    $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: viewingDetails.user_id, tradeOption: "Looking For" }, MatchMaking);
    UpdateViewingDetails();
}

function ShowAV3() {
    pokemonImage = viewing3Image;
    viewingDetails = AdditionalViewing3;
    document.querySelector(".VA-Username").innerHTML = viewing3Username + "#" + viewingDetails.user_id;
    $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: viewingDetails.user_id, tradeOption: "Looking For" }, MatchMaking);
    UpdateViewingDetails();
}

function ShowAV4() {
    pokemonImage = viewing4Image;
    viewingDetails = AdditionalViewing4;
    document.querySelector(".VA-Username").innerHTML = viewing4Username + "#" + viewingDetails.user_id;
    $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: viewingDetails.user_id, tradeOption: "Looking For" }, MatchMaking);
    UpdateViewingDetails();
}

function ShowAV5() {
    pokemonImage = viewing5Image;
    viewingDetails = AdditionalViewing5;
    document.querySelector(".VA-Username").innerHTML = viewing5Username + "#" + viewingDetails.user_id;
    $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: viewingDetails.user_id, tradeOption: "Looking For" }, MatchMaking);
    UpdateViewingDetails();
}

function ShowAV6() {
    pokemonImage = viewing6Image;
    viewingDetails = AdditionalViewing6;
    document.querySelector(".VA-Username").innerHTML = viewing6Username + "#" + viewingDetails.user_id;
    $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: viewingDetails.user_id, tradeOption: "Looking For" }, MatchMaking);
    UpdateViewingDetails();
};

function MatchMaking(data) {
    //console.log("Running Match");
    matchData = jQuery.parseJSON(data);

    var amount = matchData["Rows"].length;
    //console.log(amount);

    //Removing the grid container so I can create a new one and making it a child of GeneratedSelection.
    $("#MatchContainer").remove();
    gridTest = document.createElement("div");
    gridTest.setAttribute("id", "MatchContainer");
    document.getElementById("MatchMaking").appendChild(gridTest);

    for (let i = 0; i < amount; i++) {

        //Creating newDivs for each pokemon and making them children of the GridContainer
        newDiv = document.createElement("div");
        newDiv.setAttribute("class", "MatchMakingDiv" + (i));
        document.getElementById("MatchContainer").appendChild(newDiv);
        newDiv.style.position = "relative";
        newDiv.setAttribute("width", "60");
        newDiv.setAttribute("height", "60");

        //Storing each pokemon in a array.
        loopArray = [];
        loopArray = matchData["Rows"][i];

        //Setting the Image
        theImage = document.createElement("IMG");
        theImage.setAttribute("id", "MatchMaking " + (i));
        theImage.setAttribute("width", "60");
        theImage.setAttribute("height", "60");
        newDiv.appendChild(theImage);

        if (previewBall || previewGender || previewShiny || previewMint || previewMisc || previewMark) {
            newTable = document.createElement("table");
            newTable.style.position = "absolute";
            var tr = newTable.insertRow();
            tr.style.display = "flex";
            if (previewIVs) {
                newTable.style.bottom = "15%";
            } else {
                newTable.style.bottom = "0%";
            }

            if (previewBall) {
                var td = tr.insertCell();
                ball = document.createElement("IMG");
                td.setAttribute("width", "9px");
                td.setAttribute("height", "9px");
                ball.setAttribute("width", "9px");
                ball.setAttribute("height", "9px");
                ball.setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Items/" + loopArray.pokeball + ".png");

                td.appendChild(ball);
            }

            if (previewGender) {
                var td = tr.insertCell();
                gender = document.createElement("IMG");
                td.setAttribute("width", "9px");
                td.setAttribute("height", "9px");
                gender.setAttribute("width", "9px");
                gender.setAttribute("height", "9px");
                gender.setAttribute("src", "https://poketrades.org/Resources/Misc/" + loopArray.gender + ".png");

                td.appendChild(gender);
            }

            if (previewShiny) {
                var td = tr.insertCell();
                shiny = document.createElement("IMG");
                td.setAttribute("width", "9px");
                td.setAttribute("height", "9px");
                shiny.setAttribute("width", "9px");
                shiny.setAttribute("height", "9px");
                shiny.setAttribute("src", "https://poketrades.org/Resources/Misc/" + loopArray.shiny + ".png");

                td.appendChild(shiny);
            }

            if (previewMint) {
                var td = tr.insertCell();
                mint = document.createElement("IMG");
                td.setAttribute("width", "9px");
                td.setAttribute("height", "9px");
                mint.setAttribute("width", "9px");
                mint.setAttribute("height", "9px");
                mint.setAttribute("src", "https://poketrades.org/Resources/Misc/" + loopArray.mint + ".png");

                td.appendChild(mint);
            }

            if (previewMisc) {
                var td = tr.insertCell();
                misc = document.createElement("IMG");
                td.setAttribute("width", "9px");
                td.setAttribute("height", "9px");
                misc.setAttribute("width", "9px");
                misc.setAttribute("height", "9px");
                misc.setAttribute("src", "https://poketrades.org/Resources/Misc/" + loopArray.misc + ".png");

                td.appendChild(misc);
            }

            if (previewMark) {
                var td = tr.insertCell();
                mark = document.createElement("IMG");
                td.setAttribute("width", "9px");
                td.setAttribute("height", "9px");
                mark.setAttribute("width", "9px");
                mark.setAttribute("height", "9px");
                mark.setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Marks/" + loopArray.mark + ".png");

                td.appendChild(mark);
            }
            newDiv.appendChild(newTable);
        }


        //Setting up the preview IVs
        if (previewIVs == true) {
            newTable = document.createElement("table");
            newTable.style.position = "absolute";
            newTable.style.bottom = "0%";
            //newTable.setAttribute("width", "100");
            //newTable.setAttribute("height", "100");
            var tr = newTable.insertRow();
            tr.style.display = "flex";
            var td = tr.insertCell();
            ivHP = document.createElement("IMG");
            td.setAttribute("width", "9px");
            td.setAttribute("height", "9px");
            ivHP.setAttribute("width", "9px");
            ivHP.setAttribute("height", "9px");
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
            td.setAttribute("width", "9px");
            td.setAttribute("height", "9px");
            ivAtt.setAttribute("width", "9px");
            ivAtt.setAttribute("height", "9px");
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
            td.setAttribute("width", "9px");
            td.setAttribute("height", "9px");
            ivDef.setAttribute("width", "9px");
            ivDef.setAttribute("height", "9px");
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
            td.setAttribute("width", "9px");
            td.setAttribute("height", "9px");
            ivSpa.setAttribute("width", "9px");
            ivSpa.setAttribute("height", "9px");
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
            td.setAttribute("width", "9px");
            td.setAttribute("height", "9px");
            ivSpd.setAttribute("width", "9px");
            ivSpd.setAttribute("height", "9px");
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
            td.setAttribute("width", "9px");
            td.setAttribute("height", "9px");
            ivSpe.setAttribute("width", "9px");
            ivSpe.setAttribute("height", "9px");
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
                    document.querySelector(`#${CSS.escape("MatchMaking " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("MatchMaking " + (i))}`).setAttribute("src", "https://poketrades.org/Resources/Home/" + matchData["Rows"][i].pokemon + "-Male.png")
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
                    document.querySelector(`#${CSS.escape("MatchMaking " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("MatchMaking " + (i))}`).setAttribute("src", "https://poketrades.org/Resources/Home/" + matchData["Rows"][i].pokemon + "-Male-Shiny.png")
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
                    document.querySelector(`#${CSS.escape("MatchMaking " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("MatchMaking " + (i))}`).setAttribute("src", "https://poketrades.org/Resources/Home/" + matchData["Rows"][i].pokemon + "-Female.png")
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
                    document.querySelector(`#${CSS.escape("MatchMaking " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("MatchMaking " + (i))}`).setAttribute("src", "https://poketrades.org/Resources/Home/" + matchData["Rows"][i].pokemon + "-Female-Shiny.png")
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

                    document.querySelector(`#${CSS.escape("MatchMaking " + (i))}`).onerror = function () {
                        document.querySelector(`#${CSS.escape("MatchMaking " + (i))}`).setAttribute("src", "https://poketrades.org/Resources/Home/" + matchData["Rows"][i].pokemon + "-Shiny.png");
                    }

                }
            }
        }


        //Setting Image Attributes
        /*if (selectedPokemon != null) {
            if (loopArray.creation_id == selectedPokemon.creation_id) {
                document.querySelector(".MatchMakingDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 5px #8135a9";
            }
        }*/

        //Setting up the onclick to open the viewing area and to set the information required for it.
        theImage.onclick = function () {
            viewingDetails = matchData["Rows"][i]
            console.log(viewingDetails);
            pokemonImage = this.src;
            console.log(pokemonImage);
            selectedPokemon = document.querySelector(".MatchMakingDiv" + (i));
            AssigningOutline();
            UpdateViewingDetails();
        }
    }
    //Assigning the outline in case a pokemon generated is the one still in the viewing area so the user knows which one it is.
    //AssigningOutline();
}