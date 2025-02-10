var trackerPokemonText = document.querySelector(".TA-Searchbar");
var availableString = "";
var availableStrings = new Array();
var collectionData;
var collectionLength;
var evoChain = false;

var legalityCurrent;

var tempSWSH;
var tempLA;
var tempSV;

var ballsInGames;
var allBallsInGames;
var ballLegality;

var gamesToCheck = new Array("red", "green", "blue", "yellow", "gold", "silver", "crystal", "ruby", "sapphire", "emerald", "fire_red", "leaf_green", "colosseum", "xd_gale_of_darkness", "diamond", "pearl", "platinum", "heart_gold", "soul_silver", "black", "white", "black_2", "white_2", "x", "y", "omega_ruby", "alpha_sapphire", "sun", "moon", "ultra_sun", "ultra_moon", "lets_go_pikachu", "lets_go_eevee", "sword", "shield", "brilliant_diamond", "shining_pearl", "legends_arceus", "scarlet", "violet");

var gamesToLoop = new Array("balls_rgby", "balls_gsc", "balls_rse", "balls_frlg", "balls_coloxd", "balls_dppt", "balls_hgss", "balls_bwbw2", "balls_xyoras", "balls_smusum", "balls_lgpe", "balls_swsh", "balls_bdsp", "balls_la", "balls_sv");

function BallsInGames(data) {
    arrayInfo = jQuery.parseJSON(data);
    ballsInGames = arrayInfo["Rows"];
    //console.log(ballsInGames);
}

function AllBallsInGames(data) {
    arrayInfo = jQuery.parseJSON(data);
    allBallsInGames = arrayInfo["Rows"];
    //console.log(allBallsInGames);
}

function BallLegality(data) {
    arrayInfo = jQuery.parseJSON(data);
    ballLegality = arrayInfo["Rows"];
    //console.log(ballLegality);
}

$(".TA-Searchbar").keyup(function () {
    FilterTracking();
});

function FilterTracking() {
    if (document.getElementById("TrackingContainer") != null) {
        for (let i = 0; i < ballLegality.length; i++) {
            passedFilter = true;
            if (trackerPokemonText.value == "") {

            } else if (ballLegality[i].pokemon.toLowerCase().includes(trackerPokemonText.value.toLowerCase())) {

            } else {
                passedFilter = false;
            }
            if (passedFilter) {
                document.getElementById("TrackingGridDiv" + (i)).style.display = "block";
            } else {
                document.getElementById("TrackingGridDiv" + (i)).style.display = "none";
            }
        }
    }
}


$('.TA-MainMenu').click(function () {
    document.querySelector("#TrackingArea").style.display = "none";
    document.querySelector("#MainArea").style.display = "block";
    //document.querySelector("#PanelArea").style.display = "block";
    RemoveHash();
});

$('.TA-ProgressTracker').click(function () {
    $('.MA-Tracker').click();
});

$('.TA-LegalityChecker').click(function () {
    //$.post(url + "/PHP/progress_data.php", ProgressInfo);
    ShowLoading();
    $.post(url + "/PHP/get_balls_in_games.php", BallsInGames);
    $.post(url + "/PHP/get_all_balls_in_games.php", AllBallsInGames);
    $.post(url + "/PHP/get_ball_legality.php", BallLegality);
    $.post(url + "/PHP/progress_data.php", ProgressData);
    //CheckAvailability();
    //HideLoading();

});

function ForceLoading() {
    //This is only here due to how JS acts with waiting for things to ran sometimes.
    HideLoading();
    if (evoChain) {
        evoChain = false;
        document.querySelector(".TA-EvoToggle").innerHTML = "Turn Evo Chain On";
    } else {
        evoChain = true;
        document.querySelector(".TA-EvoToggle").innerHTML = "Turn Evo Chain Off";
    }

    if (document.getElementById("TrackingContainer") != null) {
        for (let i = 0; i < ballLegality.length; i++) {
            document.querySelector("#TA-ObtainableDropdown" + i).onchange();
        }
    }
}

$('.TA-EvoToggle').click(function () {
    ShowLoading();
    //The below is needed to be done this way or else showloading isn't done first.
    $.post(url + "/PHP/force_loading.php", ForceLoading);

});

$('.TA-UserCollection').click(function () {
    //$.post(url + "/PHP/legality_list.php", GreyScaleData);
    $.post(url + "/PHP/generate_selection.php", { token: token, searchID: userData.user_id, tradeOption: "For Trade", }, UserCollection);
    ShowLoading();
});

$('.TA-InfoButton').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".LegalityInformation").style.display = "block";
});

function SetGamesAvailable(index) {
    for (let i = 0; i < ballLegality.length; i++) {
        availableStrings[i] = "|"
        var dexNum = ballLegality[i].pokedex;
        if (dexNum < 152 && !ballLegality[i].pokemon.includes("Pikachu-") && !ballLegality[i].pokemon.includes("-Alola") && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea")) {
            availableStrings[i] += "Red|Green|Blue|Yellow";
        }

        if (dexNum < 252 && !ballLegality[i].pokemon.includes("Pikachu-") && !ballLegality[i].pokemon.includes("-Question") && !ballLegality[i].pokemon.includes("-Exclamation") && !ballLegality[i].pokemon.includes("-Alola") && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea")) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Gold|Silver|Crystal";
        }

        if (dexNum < 387 && !ballLegality[i].pokemon.includes("Pikachu-") && !ballLegality[i].pokemon.includes("-Alola") && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea")) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Ruby|Sapphire|Emerald|Fire Red|Leaf Green|Colosseum|XD Gale of Darkness";
        }

        if (dexNum < 494 && !ballLegality[i].pokemon.includes("Pikachu-") && !ballLegality[i].pokemon.includes("Rotom-") && !ballLegality[i].pokemon.includes("-Origin") && !ballLegality[i].pokemon.includes("-Sky") && !ballLegality[i].pokemon.includes("Shaymin-") && !ballLegality[i].pokemon.includes("-Alola") && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea")) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Pearl|Diamond";
        }

        if (dexNum < 494 && !ballLegality[i].pokemon.includes("Pikachu-") && !ballLegality[i].pokemon.includes("Palkia-") && !ballLegality[i].pokemon.includes("Dialga-") && !ballLegality[i].pokemon.includes("-Alola") && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea")) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Platinum|Heart Gold|Soul Silver";
        }

        if (dexNum < 650 && !ballLegality[i].pokemon.includes("Pikachu-") && !ballLegality[i].pokemon.includes("Palkia-") && !ballLegality[i].pokemon.includes("Dialga-") && !ballLegality[i].pokemon.includes("-Therian") && !ballLegality[i].pokemon.includes("-Resolute") && !ballLegality[i].pokemon.includes("Basculin-White") && !ballLegality[i].pokemon.includes("-Alola") && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea")) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Black|White";
        }

        if (dexNum < 650 && !ballLegality[i].pokemon.includes("Pikachu-") && !ballLegality[i].pokemon.includes("Palkia-") && !ballLegality[i].pokemon.includes("Dialga-") && !ballLegality[i].pokemon.includes("Basculin-White") && !ballLegality[i].pokemon.includes("-Alola") && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea")) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Black 2|White 2";
        }

        if (dexNum < 722 && !ballLegality[i].pokemon.includes("Pikachu-") && !ballLegality[i].pokemon.includes("Palkia-") && !ballLegality[i].pokemon.includes("Dialga-") && !ballLegality[i].pokemon.includes("Zygarde-10") && !ballLegality[i].pokemon.includes("Basculin-White") && !ballLegality[i].pokemon.includes("-Alola") && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea")) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "X|Y|Omega Ruby|Alpha Sapphire";
        }

        if (dexNum < 808 && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("Palkia-") && !ballLegality[i].pokemon.includes("Dialga-") && !ballLegality[i].pokemon.includes("Basculin-White") && !ballLegality[i].pokemon.includes("Lycanroc-Dusk") && !ballLegality[i].pokemon.includes("Magearna-Original") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea")/* && (ballLegality[i].pokemon + "-Alola" != ballLegality[index + 1].pokemon)*/) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Sun|Moon";
        }

        if (dexNum < 808 && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("Palkia-") && !ballLegality[i].pokemon.includes("Dialga-") && !ballLegality[i].pokemon.includes("Basculin-White") && !ballLegality[i].pokemon.includes("Magearna-Original") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea")/* && (ballLegality[i].pokemon + "-Alola" != ballLegality[index + 1].pokemon)*/) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Ultra Sun|Ultra Moon";
        }

        if (dexNum < 152 && !ballLegality[i].pokemon.includes("Pikachu-") && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea") || ballLegality[i].pokemon == "Meltan" || ballLegality[i].pokemon == "Melmetal") {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Let's Go Pikachu|Let's Go Eevee";
        }

        /*if (dexNum < 899 && !ballLegality[i].pokemon.includes("-Hisui")) {
            var isAvailable = true;
            for (var j = 0; j < tempSWSH.length; j++) {
                if (ballLegality[i].pokedex == tempSWSH[j]) {
                    isAvailable = false;
                }
            }
            if (isAvailable) {
                if (availableStrings[i] != "") {
                    availableStrings[i] += "|";
                }
                availableStrings[i] += "Sword|Shield";
            }
        }*/

        if (dexNum < 899 && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea") && !ballLegality[i].pokemon.includes("Palkia-") && !ballLegality[i].pokemon.includes("Dialga-") && !ballLegality[i].pokemon.includes("Basculin-White") && tempSWSH.indexOf(ballLegality[i].pokedex) == -1) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Sword|Shield";
        }

        if (dexNum < 494 && !ballLegality[i].pokemon.includes("Pikachu-") && !ballLegality[i].pokemon.includes("-Alola") && !ballLegality[i].pokemon.includes("-Galar") && !ballLegality[i].pokemon.includes("-Hisui") && !ballLegality[i].pokemon.includes("-Paldea") && !ballLegality[i].pokemon.includes("Palkia-") && !ballLegality[i].pokemon.includes("Dialga-")) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Brilliant Diamond|Shining Pearl";
        }

        /*if (!ballLegality[i].pokemon.includes("Pikachu-") && !ballLegality[i].pokemon.includes("Raichu-") && !ballLegality[i].pokemon.includes("Geodude-") && !ballLegality[i].pokemon.includes("Graveler-") && !ballLegality[i].pokemon.includes("Golem-") && !ballLegality[i].pokemon.includes("-Galar")) {
            var isInLA = true;
            for (var j = 0; j < tempLA.length; j++) {
                if (ballLegality[i].pokemon.includes("-Hisui") || ballLegality[i].pokemon.includes("-WhiteStripe")) {
                    isInLA = true;
                    break;
                }
                else if (ballLegality[i].pokedex == tempLA[j]) {
                    isInLA = false;
                    break;
                }
            }
            if (isInLA && !ballLegality[i].pokemon + "-Hisui" != ballLegality.flat().includes(ballLegality[i].pokemon + "-Hisui")) {
                if (availableStrings[i] != "") {
                    availableStrings[i] += "|";
                }
                availableStrings[i] += "Legends Arceus";
                console.log(ballLegality[i].pokemon);
            }
        }*/

        if (tempLA.indexOf(ballLegality[i].pokemon) != -1) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Legends Arceus";
        }

        /*if (!ballLegality[i].pokemon.includes("Pikachu-")) {
            var isInSV = true;
            for (var j = 0; j < tempSV.length; j++) {
                if (ballLegality[i].pokedex == tempSV[j]) {
                    isInSV = false;
                }
            }
            if (isInSV) {
                if (availableStrings[i] != "") {
                    availableStrings[i] += "|";
                }
                availableStrings[i] += "Scarlet|Violet";
            }
        }*/
        if (!ballLegality[i].pokemon.includes("Pikachu-") && tempSV.indexOf(ballLegality[i].pokedex) == -1) {
            if (availableStrings[i] != "") {
                availableStrings[i] += "|";
            }
            availableStrings[i] += "Scarlet|Violet";
        }
        availableStrings[i] += "|"
        availableStrings[i] = availableStrings[i].replace(/ |'/g, '');
        availableStrings[i] = availableStrings[i].toLowerCase();
        //console.log(availableStrings[i]);
    }


    //console.log(availableString);
}

function ProgressData() {
    SetGamesAvailable();

    if (!forProgress) {
        //arrayData = jQuery.parseJSON(data);

        //trackerTest = document.getElementById("TrackingContainer");

        $("#TrackingContainer").remove();
        trackerTest = document.createElement("div");
        trackerTest.setAttribute("id", "TrackingContainer");
        document.getElementById("TrackingData").appendChild(trackerTest);

        //var numberOfArrays = arrayData.length;
        for (let i = 0; i < ballLegality.length; i++) {
            newDiv = document.createElement("div");
            newDiv.setAttribute("id", "TrackingGridDiv" + (i));
            newDiv.setAttribute("class", "Lozad");
            newDiv.classList.add("TA-PokemonDiv");
            //newDiv.className += "Lozad";
            document.getElementById("TrackingContainer").appendChild(newDiv);
            newDiv.setAttribute("width", "240");

            //Storing each pokemon in a array.
            loopArray = [];
            loopArray = ballLegality[i];
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

            newDiv.classList.add("SA-" + pokemonDataArray[index].type_1 + "Holder");

            theGames = document.createElement("SELECT");
            theGames.setAttribute("class", "TA-ButtonDesign");
            theGames.setAttribute("id", "TA-GameDropdown" + i);
            theGames.style.width = "158px";

            for (let j = 0; j < progressGames.length; j++) {
                const trackerOption = document.createElement("option");
                trackerOption.value = progressGames[j];
                trackerOption.textContent = progressGames[j];
                trackerOption.setAttribute("class", "TA-DropdownOptions")
                theGames.appendChild(trackerOption);
            }

            newDiv.appendChild(theGames);

            theOptions = document.createElement("SELECT");
            theOptions.setAttribute("class", "TA-ButtonDesign");
            theOptions.setAttribute("id", "TA-ObtainableDropdown" + i);
            theOptions.style.width = "158px";
            theOptions.style.display = "flex";

            for (let j = 0; j < progressObtainableOptions.length; j++) {
                const trackerOption = document.createElement("option");
                trackerOption.value = progressObtainableOptions[j];
                trackerOption.textContent = progressObtainableOptions[j];
                trackerOption.setAttribute("class", "TA-DropdownOptions")
                theOptions.appendChild(trackerOption);
            }

            newDiv.appendChild(theOptions);

            //Setting the Image
            theImage = document.createElement("IMG");
            theImage.setAttribute("id", "GeneratedSelection " + (i));
            theImage.setAttribute("width", "100");
            theImage.setAttribute("height", "100");
            theImage.style.marginTop = "20px";
            newDiv.appendChild(theImage);


            document.querySelector("#TA-GameDropdown" + i).onchange = function () {
                let forImage;
                if (document.querySelector("#TA-GameDropdown" + i).value == "Red" || document.querySelector("#TA-GameDropdown" + i).value == "Green" || document.querySelector("#TA-GameDropdown" + i).value == "Blue" || document.querySelector("#TA-GameDropdown" + i).value == "Yellow") {
                    forImage = "R/G/B/Y";
                }

                else if (document.querySelector("#TA-GameDropdown" + i).value == "Gold" || document.querySelector("#TA-GameDropdown" + i).value == "Silver" || document.querySelector("#TA-GameDropdown" + i).value == "Crystal") {
                    forImage = "G/S/C";
                }

                else if (document.querySelector("#TA-GameDropdown" + i).value == "Ruby" || document.querySelector("#TA-GameDropdown" + i).value == "Sapphire" || document.querySelector("#TA-GameDropdown" + i).value == "Emerald" || document.querySelector("#TA-GameDropdown" + i).value == "Fire Red" || document.querySelector("#TA-GameDropdown" + i).value == "Leaf Green" || document.querySelector("#TA-GameDropdown" + i).value == "Colosseum" || document.querySelector("#TA-GameDropdown" + i).value == "XD Gale of Darkness") {
                    forImage = "R/S/E";
                }

                else if (document.querySelector("#TA-GameDropdown" + i).value == "Diamond" || document.querySelector("#TA-GameDropdown" + i).value == "Pearl" || document.querySelector("#TA-GameDropdown" + i).value == "Platinum" || document.querySelector("#TA-GameDropdown" + i).value == "Heart Gold" || document.querySelector("#TA-GameDropdown" + i).value == "Soul Silver") {
                    forImage = "HG/SS";
                }

                else if (document.querySelector("#TA-GameDropdown" + i).value == "Black" || document.querySelector("#TA-GameDropdown" + i).value == "White" || document.querySelector("#TA-GameDropdown" + i).value == "Black 2" || document.querySelector("#TA-GameDropdown" + i).value == "White 2") {
                    forImage = "BW/BW2";
                }

                else if (document.querySelector("#TA-GameDropdown" + i).value == "X" || document.querySelector("#TA-GameDropdown" + i).value == "Y" || document.querySelector("#TA-GameDropdown" + i).value == "Omega Ruby" || document.querySelector("#TA-GameDropdown" + i).value == "Alpha Sapphire" || document.querySelector("#TA-GameDropdown" + i).value == "Sun" || document.querySelector("#TA-GameDropdown" + i).value == "Moon" || document.querySelector("#TA-GameDropdown" + i).value == "Ultra Sun" || document.querySelector("#TA-GameDropdown" + i).value == "Ultra Moon") {
                    forImage = "X/Y";
                }

                else if (document.querySelector("#TA-GameDropdown" + i).value == "Let's Go Pikachu" || document.querySelector("#TA-GameDropdown" + i).value == "Let's Go Eevee") {
                    forImage = "LGP/LGE";
                }

                else if (document.querySelector("#TA-GameDropdown" + i).value == "Brilliant Diamond" || document.querySelector("#TA-GameDropdown" + i).value == "Shining Pearl") {
                    forImage = "BD/SP";
                }

                else if (document.querySelector("#TA-GameDropdown" + i).value == "Legends Arceus") {
                    forImage = "LA";
                }

                else if (document.querySelector("#TA-GameDropdown" + i).value == "Scarlet" || document.querySelector("#TA-GameDropdown" + i).value == "Violet") {
                    forImage = "S/V";
                }

                //console.log(forImage);
                SetImage(document.getElementById("GeneratedSelection " + (i)), ballLegality[i].pokemon, "(Any Gender)", "Normal", forImage);
                DisplayBallAvailability(i, document.querySelector("#TA-GameDropdown" + i).value, document.querySelector("#TA-ObtainableDropdown" + i).value);
                //ChangeTrackingDisplay(i, document.querySelector("#TA-GameDropdown" + i).value, document.querySelector("#TA-ObtainableDropdown" + i).value);
            };

            document.querySelector("#TA-ObtainableDropdown" + i).onchange = function () {
                DisplayBallAvailability(i, document.querySelector("#TA-GameDropdown" + i).value, document.querySelector("#TA-ObtainableDropdown" + i).value);
                //ChangeTrackingDisplay(i, document.querySelector("#TA-GameDropdown" + i).value, document.querySelector("#TA-ObtainableDropdown" + i).value);
            };

            newTable = document.createElement("div");
            newTable.style.position = "absolute";
            newTable.style.zIndex = "1";

            newTable.style.top = "unset";
            newTable.style.gridTemplateColumns = "repeat( auto-fill, minmax(210px, 1fr) )"
            trackerTest.style.gridTemplateColumns = "repeat( auto-fill, minmax(230px, 1fr) )"
            newDiv.style.width = "240px";
            newTable.style.left = "50%";
            newTable.style.top = "65px";
            //var tr = newTable.insertRow();
            //tr.style.marginBottom = "10px";
            //tr.style.display = "flex";

            for (let j = 0; j < progressBalls.length; j++) {

                ball = document.createElement("IMG");
                ball.setAttribute("id", "TA-" + progressBalls[j].replace(/\s/g, '') + " " + i);
                let ballName = ball.id;
                ball.setAttribute("width", "13px");
                ball.setAttribute("height", "13px");
                ball.style.padding = "0px 3px 0px 0px";
                ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/" + progressBalls[j] + ".png");
                ball.style.filter = "opacity(0.5)";
                newTable.appendChild(ball);
            }

            newDiv.appendChild(newTable);

            SetImage(theImage, ballLegality[i].pokemon, "(Any Gender)", "Normal", "(Any Game)");
            //document.querySelector("#TA-ObtainableDropdown" + i).onchange();
        }

        for (let i = 0; i < ballLegality.length; i++) {
            document.querySelector("#TA-ObtainableDropdown" + i).onchange();
        }
    }

    HideLoading();
    if (forProgress) {
        for (let i = 0; i < ballLegality.length; i++) {
            DisplayBallAvailability(i, null, null);
        }
        console.log(ballAmounts);
        SetProgress();
        allowedMonsObtained = 0;
        //Commented out part allows for only accepting mons in displayed balls but this can clash with overall completion. For example charizard in a beast ball in SV won't count towards event mons which are in cherish and poke.
        /*for (let i = 0; i < monsObtained.length; i++) {
            var acceptableBall = false;
            if (eligableMons.indexOf(monsObtained[i]) != -1) {
                for (let j = 0; j < ballProgress.length; j++) {
                    if (ballProgress[j].pokemon.includes(monsObtained[i])) {
                        var tempIndex = progressBalls.indexOf(ballProgress[j].pokeball);
                        if (eligableBalls[tempIndex].includes(monsObtained[i])) {
                            acceptableBall = true;
                        }
                    }
                }

            }
            if (acceptableBall) {
                allowedMonsObtained++;
            }
        }*/
        document.querySelector(".VA-MainBall1").style.display = "block";
        document.querySelector(".VA-MainBall2").style.display = "block";
        for (let i = 0; i < monsObtained.length; i++) {
            if (eligableMons.indexOf(monsObtained[i]) != -1) {
                allowedMonsObtained++;
            }
        }
        //Mons like Gimmighoul-Roaming are the reason why there is this if statement.
        if (vaGameArray.length == 0 && viewingMethodDropdown.value == "(All Options)") {
            collectedString = allowedMonsObtained / allPokemonArray.length * 100;
            console.log(Math.floor(collectedString * 100) / 100);
            console.log(allPokemonArray.length);
            console.log(monsObtained.length);
            document.querySelector(".VA-TotalPokemonText").innerHTML = (Math.floor(collectedString * 100) / 100) + "% Complete" + " (" + allowedMonsObtained + " / " + allPokemonArray.length + ")";
        } else {
            collectedString = allowedMonsObtained / eligableMons.length * 100;
            console.log(Math.floor(collectedString * 100) / 100);
            console.log(monsPossible);
            console.log(monsObtained.length);
            document.querySelector(".VA-TotalPokemonText").innerHTML = (Math.floor(collectedString * 100) / 100) + "% Complete" + " (" + allowedMonsObtained + " / " + eligableMons.length + ")";
        }
    }
    //CurrentList();
    //CheckAvailability();
}

/*function CurrentList() {
    for (let i = 0; i < ballLegality.length; i++) {
        for (let j = 0; j < progressBalls.length; j++) {
            for (let k = 0; k < progressGames.length; k++) {
                let tempBall = "";
                if (progressBalls[j].includes("(LA)")) {
                    tempBall = progressBalls[j].substring(0, progressBalls[j].length - 9);
                } else {
                    tempBall = progressBalls[j].substring(0, progressBalls[j].length - 5);
                }
                let tempCombo = progressGames[k].toLowerCase() + " " + tempBall.toLowerCase();
                if (ballLegality[i][tempCombo] != null) {
                    document.getElementById("TA-" + progressBalls[j].replace(/\s/g, '') + " " + i).style.filter = "unset";
                }
            }
        }
    }
}*/

function DisplayBallAvailability(index, game, method) {
    for (let i = 0; i < progressBalls.length; i++) {
        let tempBall = "";
        if (progressBalls[i].includes("(LA)")) {
            tempBall = progressBalls[i].substring(0, progressBalls[i].length - 9) + "(LA)";
        } else {
            tempBall = progressBalls[i].substring(0, progressBalls[i].length - 5);
        }

        if (!forProgress) {
            if (game == "(All Games)") {
                document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.display = "initial";
            } else {
                document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.display = "none";
            }
            document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
        } else {
            if (vaGameArray.length == 0) {
                document.getElementById("VA-" + progressBalls[i].replace(/\s/g, '') + " ").style.display = "initial";
            } else {
                document.getElementById("VA-" + progressBalls[i].replace(/\s/g, '') + " ").style.display = "none";
            }
            document.getElementById("VA-" + progressBalls[i].replace(/\s/g, '') + " ").style.filter = "opacity(0.5)";
        }


    }

    if (forProgress) {
        ProgressDisplayAvailability(index);
    }
    else {
        if (game == "(All Games)") {
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                SetLGPEBreedingTransferBalls(index, "_wild", null, null, method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        SetWildBalls(index, j, "_wild", gamesToCheck[j]);
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }

                if (method == "Raid/Outbreak Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                    }
                }


                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", "special", null, method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", null, null, method);
                }
            }
        }

        if (game == "Red") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rgby != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_rgby.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);
            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "red") {
                            SetWildBalls(index, j, "_wild", "balls_rgby");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "red") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "red") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);
                }
            }
        }

        if (game == "Green") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rgby != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_rgby.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "green") {
                            SetWildBalls(index, j, "_wild", "balls_rgby");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "green") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "green") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);
                }
            }
        }

        if (game == "Blue") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rgby != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_rgby.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "blue") {
                            SetWildBalls(index, j, "_wild", "balls_rgby");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "blue") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "blue") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);
                }
            }
        }


        if (game == "Yellow") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rgby != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_rgby.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "yellow") {
                            SetWildBalls(index, j, "_wild", "balls_rgby");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "yellow") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "yellow") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);
                }
            }
        }

        if (game == "Gold") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_gsc != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_gsc.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "gold") {
                            SetWildBalls(index, j, "_wild", "balls_gsc");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "gold") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "gold") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);
                }
            }
        }

        if (game == "Silver") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_gsc != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_gsc.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "silver") {
                            SetWildBalls(index, j, "_wild", "balls_gsc");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "silver") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "silver") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);
                }
            }
        }

        if (game == "Crystal") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_gsc != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_gsc.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "crystal") {
                            SetWildBalls(index, j, "_wild", "balls_gsc");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "crystal") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "crystal") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "ruby", method);
                }
            }
        }

        if (game == "Ruby") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rse != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_rse.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "ruby") {
                            SetWildBalls(index, j, "_wild", "balls_rse");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "ruby") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "ruby") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "diamond", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);
                }
            }
        }

        if (game == "Sapphire") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rse != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_rse.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "sapphire") {
                            SetWildBalls(index, j, "_wild", "balls_rse");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "sapphire") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "sapphire") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "diamond", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);
                }
            }
        }

        if (game == "Emerald") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rse != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_rse.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "emerald") {
                            SetWildBalls(index, j, "_wild", "balls_rse");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "emerald") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "emerald") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "diamond", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);
                }
            }
        }

        if (game == "Fire Red") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_frlg != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_frlg.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "fire_red") {
                            SetWildBalls(index, j, "_wild", "balls_frlg");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "fire_red") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "fire_red") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "diamond", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);
                }
            }
        }

        if (game == "Leaf Green") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_frlg != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_frlg.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "leaf_green") {
                            SetWildBalls(index, j, "_wild", "balls_frlg");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "leaf_green") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "leaf_green") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "diamond", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);
                }
            }
        }

        if (game == "Colosseum") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_coloxd != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_coloxd.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "colosseum") {
                            SetWildBalls(index, j, "_wild", "balls_coloxd");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "colosseum") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "colosseum") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);
                }
            }
        }

        if (game == "XD Gale of Darkness") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_coloxd != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_coloxd.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "xd_gale_of_darkness") {
                            SetWildBalls(index, j, "_wild", "balls_coloxd");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "xd_gale_of_darkness") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "xd_gale_of_darkness") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "diamond", method);
                }
            }
        }

        if (game == "Diamond") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_dppt != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_dppt.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "black", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "diamond") {
                            SetWildBalls(index, j, "_wild", "balls_dppt");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "diamond") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "diamond") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "black", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "black", method);
                }
            }
        }

        if (game == "Pearl") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_dppt != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_dppt.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "black", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "pearl") {
                            SetWildBalls(index, j, "_wild", "balls_dppt");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "pearl") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "pearl") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "black", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "black", method);
                }
            }
        }

        if (game == "Platinum") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_dppt != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_dppt.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "black", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "platinum") {
                            SetWildBalls(index, j, "_wild", "balls_dppt");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "platinum") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "platinum") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "black", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "black", method);
                }
            }
        }

        if (game == "Heart Gold") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_hgss != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_hgss.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "black", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "heart_gold") {
                            SetWildBalls(index, j, "_wild", "balls_hgss");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "heart_gold") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "heart_gold") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "black", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "black", method);
                }
            }
        }

        if (game == "Soul Silver") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_hgss != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_hgss.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "black", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "soul_silver") {
                            SetWildBalls(index, j, "_wild", "balls_hgss");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "soul_silver") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "soul_silver") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "black", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "black", method);
                }
            }
        }

        if (game == "Black") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bwbw2 != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_bwbw2.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "x", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "black") {
                            SetWildBalls(index, j, "_wild", "balls_bwbw2");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "black") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "black") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "x", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "x", method);
                }
            }
        }

        if (game == "White") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bwbw2 != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_bwbw2.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "x", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "white") {
                            SetWildBalls(index, j, "_wild", "balls_bwbw2");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "white") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "white") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "x", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "x", method);
                }
            }
        }

        if (game == "Black 2") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bwbw2 != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_bwbw2.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "x", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "black_2") {
                            SetWildBalls(index, j, "_wild", "balls_bwbw2");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "black_2") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "black_2") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "x", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "x", method);
                }
            }
        }

        if (game == "White 2") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bwbw2 != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_bwbw2.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "x", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "white_2") {
                            SetWildBalls(index, j, "_wild", "balls_bwbw2");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "white_2") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "white_2") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", "avoid", "x", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "x", method);
                }
            }
        }

        if (game == "X") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_xyoras != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_xyoras.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "sun", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "x") {
                            SetWildBalls(index, j, "_wild", "balls_xyoras");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "x") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "x") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, "sun", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "sun", method);
                }
            }
        }

        if (game == "Y") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_xyoras != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_xyoras.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "sun", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "y") {
                            SetWildBalls(index, j, "_wild", "balls_xyoras");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "y") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "y") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, "sun", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "sun", method);
                }
            }
        }

        if (game == "Omega Ruby") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_xyoras != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_xyoras.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "sun", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "omega_ruby") {
                            SetWildBalls(index, j, "_wild", "balls_xyoras");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "omega_ruby") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "omega_ruby") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, "sun", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "sun", method);
                }
            }
        }

        if (game == "Alpha Sapphire") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_xyoras != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_xyoras.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "sun", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "alpha_sapphire") {
                            SetWildBalls(index, j, "_wild", "balls_xyoras");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "alpha_sapphire") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "alpha_sapphire") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, "sun", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "sun", method);
                }
            }
        }

        if (game == "Sun") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_smusum != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_smusum.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "lets_go_pikachu", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "sun") {
                            SetWildBalls(index, j, "_wild", "balls_smusum");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "sun") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "sun") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, "lets_go_pikachu", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "lets_go_pikachu", method);
                }
            }
        }

        if (game == "Moon") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_smusum != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_smusum.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "lets_go_pikachu", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "moon") {
                            SetWildBalls(index, j, "_wild", "balls_smusum");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "moon") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "moon") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, "lets_go_pikachu", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "lets_go_pikachu", method);
                }
            }
        }

        if (game == "Ultra Sun") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_smusum != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_smusum.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "lets_go_pikachu", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "ultra_sun") {
                            SetWildBalls(index, j, "_wild", "balls_smusum");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "ultra_sun") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "ultra_sun") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, "lets_go_pikachu", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "lets_go_pikachu", method);
                }
            }
        }

        if (game == "Ultra Moon") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_smusum != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_smusum.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, "lets_go_pikachu", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "ultra_moon") {
                            SetWildBalls(index, j, "_wild", "balls_smusum");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "ultra_moon") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "ultra_moon") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, "lets_go_pikachu", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, "lets_go_pikachu", method);
                }
            }
        }

        if (game == "Let's Go Pikachu") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_lgpe != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_lgpe.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetLGPEBreedingTransferBalls(index, "_wild", null, null, method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "lets_go_pikachu") {
                            SetWildBalls(index, j, "_wild", "balls_lgpe");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "lets_go_pikachu") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "lets_go_pikachu") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Trade/Transfer") {
                    SetLGPEBreedingTransferBalls(index, "_wild", null, null, method);
                }
            }
        }

        if (game == "Let's Go Eevee") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_lgpe != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_lgpe.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetLGPEBreedingTransferBalls(index, "_wild", null, null, method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "lets_go_eevee") {
                            SetWildBalls(index, j, "_wild", "balls_lgpe");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "lets_go_eevee") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "lets_go_eevee") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Trade/Transfer") {
                    SetLGPEBreedingTransferBalls(index, "_wild", null, null, method);
                }
            }
        }

        if (game == "Sword") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_swsh != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_swsh.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                SetLGPEBreedingTransferBalls(index, "_wild", null, "|sword|", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "sword") {
                            SetWildBalls(index, j, "_wild", "balls_swsh");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "sword") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Raid/Outbreak Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "sword") {
                            SetSpecificEventBalls(index, j, "_raidOutbreak");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "sword") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", "special", "|sword|", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", null, "|sword|", method);
                }
            }
        }

        if (game == "Shield") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_swsh != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_swsh.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                SetLGPEBreedingTransferBalls(index, "_wild", null, "|shield|", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "shield") {
                            SetWildBalls(index, j, "_wild", "balls_swsh");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "shield") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Raid/Outbreak Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "shield") {
                            SetSpecificEventBalls(index, j, "_raidOutbreak");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "shield") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", "special", "|shield|", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", null, "|shield|", method);
                }
            }
        }

        if (game == "Brilliant Diamond") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bdsp != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_bdsp.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                SetLGPEBreedingTransferBalls(index, "_wild", null, "|brilliantdiamond|", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "brilliant_diamond") {
                            SetWildBalls(index, j, "_wild", "balls_bdsp");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "brilliant_diamond") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "brilliant_diamond") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", "special", "|brilliantdiamond|", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", null, "|brilliantdiamond|", method);
                }
            }
        }

        if (game == "Shining Pearl") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bdsp != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_bdsp.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                SetLGPEBreedingTransferBalls(index, "_wild", null, "|shiningpearl|", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "shining_pearl") {
                            SetWildBalls(index, j, "_wild", "balls_bdsp");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "shining_pearl") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "shining_pearl") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", "special", "|shiningpearl|", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", null, "|shiningpearl|", method);
                }
            }
        }

        if (game == "Legends Arceus") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_la != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_la.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                SetLGPEBreedingTransferBalls(index, "_wild", null, "|legendsarceus|", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "legends_arceus") {
                            SetWildBalls(index, j, "_wild", "balls_la");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "legends_arceus") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "legends_arceus") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", null, "|legendsarceus|", method);
                }
            }
        }

        if (game == "Scarlet") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_sv != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_sv.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                SetLGPEBreedingTransferBalls(index, "_wild", null, "|scarlet|", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "scarlet") {
                            SetWildBalls(index, j, "_wild", "balls_sv");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "scarlet") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Raid/Outbreak Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "scarlet") {
                            SetSpecificEventBalls(index, j, "_raidOutbreak");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "scarlet") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", "special", "|scarlet|", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", null, "|scarlet|", method);
                }
            }
        }

        if (game == "Violet") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_sv != null) {
                    document.getElementById("TA-" + allBallsInGames[j].balls_sv.replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
            if (method == "(All Options)") {
                SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                SetLGPEBreedingTransferBalls(index, "_wild", null, "|violet|", method);

            } else {
                if (method == "In-Game") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "violet") {
                            SetWildBalls(index, j, "_wild", "balls_sv");
                            SetSpecificEventBalls(index, j, "_specific");
                            break;
                        }
                    }
                }

                if (method == "Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "violet") {
                            SetSpecificEventBalls(index, j, "_event");
                            break;
                        }
                    }
                }

                if (method == "Raid/Outbreak Event") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "violet") {
                            SetSpecificEventBalls(index, j, "_raidOutbreak");
                            break;
                        }
                    }
                }

                if (method == "Other Software") {
                    for (let j = 0; j < gamesToCheck.length; j++) {
                        if (gamesToCheck[j] == "violet") {
                            SetSpecificEventBalls(index, j, "_other");
                            break;
                        }
                    }
                }

                if (method == "Via Breeding") {
                    SetBreedingTransferBalls(index, game, "_wild", "special", null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", "special", "|violet|", method);
                }

                if (method == "Trade/Transfer") {
                    SetBreedingTransferBalls(index, game, "_wild", null, null, null, method);
                    SetLGPEBreedingTransferBalls(index, "_wild", null, "|violet|", method);
                }
            }
        }
    }


    /*if (forProgress) {
        var tempProgress = false;
        for (let i = 0; i < progressBalls.length; i++) {
            if (document.getElementById("VA-" + progressBalls[i].replace(/\s/g, '') + " ").style.filter == "unset" && document.getElementById("VA-" + progressBalls[i].replace(/\s/g, '') + " ").style.display != "none") {
                if (eligableMons.includes(ballLegality[index].pokemon)) {
                    ballAmounts[i] = ballAmounts[i] + 1;
                    document.getElementById("VA-" + progressBalls[i].replace(/\s/g, '') + " ").style.filter = "opacity(0.5)";
                    tempProgress = true;
                    eligableBalls[i] += "|" + ballLegality[index].pokemon + "|";
                }
            }
        }
        if (tempProgress) {
            monsPossible++;
        }
    }*/
}

function SetWildBalls(legalityIndex, gameChecker, catergory, gameBalls, avoidUnbreedable) {
    var breedIndex = gamesToCheck[gameChecker].toLowerCase();
    breedIndex = breedIndex.replace(/'/g, '');
    breedIndex = breedIndex.replace(/ /g, '_');

    if (gameChecker == "(All Games)") {
        //Getting the last game in the array to make sure there are no issues.
        breedIndex = gamesToCheck[gamesToCheck.length - 1];
    } else {
        var gameName = gamesToCheck[gameChecker].replace(/ |'|_/g, '');
        gameName = gameName.toLowerCase();
        if (!availableStrings[legalityIndex].includes("|" + gameName + "|")) {
            //console.log(availableStrings[legalityIndex]);
            return;
        }
    }

    if (!evoChain && !forProgress) {
        if (ballLegality[legalityIndex][gamesToCheck[gameChecker] + catergory] == "Available") {
            for (let i = 0; i < ballsInGames.length; i++) {
                if (ballsInGames[i][gameBalls] != null) {
                    if (forProgress) {
                        document.getElementById("VA-" + ballsInGames[i][gameBalls].replace(/\s/g, '') + " ").style.filter = "unset"
                    } else {
                        document.getElementById("TA-" + ballsInGames[i][gameBalls].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                    }
                }
            }
        }
    }

    if (evoChain || forProgress) {
        var getEvos = new Array();
        var getBranches = new Array();

        var getMeOut = false;
        for (let i = 0; i < evoDataArray.length; i++) {
            if (getMeOut) {
                break;
            }
            //This is needed because Mothim can evolve from any Burmy, so it has a special Evo Line.
            if (ballLegality[legalityIndex].pokemon == "Mothim") {
                if (ballLegality[legalityIndex].pokemon == evoDataArray[i].pokemon) {
                    getEvos = evoDataArray[i].evo_lines.split("|");
                    if (evoDataArray[i].evo_branches != null) {
                        getBranches = evoDataArray[i].evo_branches.split("|");
                    }
                    getMeOut = true;
                    break;
                }
            } else {
                var arrayTempEvo = evoDataArray[i].evo_lines.split("|");
                for (let j = 0; j < arrayTempEvo.length; j++) {
                    if (ballLegality[legalityIndex].pokemon == arrayTempEvo[j]) {
                        getEvos = evoDataArray[i].evo_lines.split("|");
                        if (evoDataArray[i].evo_branches != null) {
                            getBranches = evoDataArray[i].evo_branches.split("|");
                        }
                        getMeOut = true;
                        break;
                    }
                }
            }
        }

        //console.log(getEvos);

        var getindexes = new Array();
        for (let i = 0; i < ballLegality.length; i++) {
            for (let j = 0; j < getEvos.length; j++) {
                if (getEvos[j] == ballLegality[i].pokemon) {
                    //Due to Solgaleo and Lunala Evos being tied by Game, this exception is needed.
                    if (ballLegality[legalityIndex].pokemon == "Solgaleo" && (gameName == "moon" || gameName == "ultramoon" || gameName == "shield") || ballLegality[legalityIndex].pokemon == "Lunala" && (gameName == "sun" || gameName == "ultrasun" || gameName == "sword")) {

                    } else {
                        tempPush = i;
                        getindexes.push(tempPush);
                    }
                }
            }
        }

        for (let z = 0; z < getindexes.length; z++) {
            tempIndex = getindexes[z];

            if (ballLegality[tempIndex].pokemon == "Shedinja" && ballLegality[tempIndex].pokemon != ballLegality[legalityIndex].pokemon || ballLegality[legalityIndex].pokemon == "Vivillon-Fancy" && ballLegality[tempIndex].pokemon != ballLegality[legalityIndex].pokemon && gamesToCheck.indexOf(breedIndex) < 37 || (ballLegality[legalityIndex].pokemon.includes("Vivillon") && !ballLegality[legalityIndex].pokemon.includes("-Fancy")) && ballLegality[tempIndex].pokemon != ballLegality[legalityIndex].pokemon && (gamesToCheck.indexOf(breedIndex) > 37 && gameChecker != "(All Games)") || ballLegality[legalityIndex].pokemon == "Raichu-Alola" && ballLegality[tempIndex].pokemon != ballLegality[legalityIndex].pokemon && (gameName != "sun" && gameName != "moon" && gameName != "ultrasun" && gameName != "ultramoon" && gameChecker != "(All Games)")) {
                continue;
            }

            if (ballLegality[getindexes[z]][gamesToCheck[gameChecker] + catergory] == "Available") {
                for (let i = 0; i < ballsInGames.length; i++) {
                    if (ballsInGames[i][gameBalls] != null) {
                        if (ballsInGames[i][gameBalls] == "Cherish Ball" || ballsInGames[i][gameBalls] == "Master Ball" || ballsInGames[i][gameBalls] == "Strange Ball") {
                            if (avoidUnbreedable != null) {

                            }
                            else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1) {

                            } else {
                                //Due to Lyanroc-Dusk in USUM being available in every normal ball but Master, this is needed.
                                if ((gameName == "ultrasun" || gameName == "ultramoon") && ballLegality[legalityIndex].pokemon == "Lycanroc-Dusk" && ballsInGames[i][gameBalls] == "Master Ball") {

                                } else {
                                    if (forProgress) {
                                        if (eligableMons.indexOf(ballLegality[legalityIndex].pokemon) == -1) {
                                            eligableMons.push(ballLegality[legalityIndex].pokemon);
                                        }
                                        document.getElementById("VA-" + ballsInGames[i][gameBalls].replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + ballsInGames[i][gameBalls].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        } else {
                            if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" && getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1) {

                            } else {
                                if (forProgress) {
                                    if (eligableMons.indexOf(ballLegality[legalityIndex].pokemon) == -1) {
                                        eligableMons.push(ballLegality[legalityIndex].pokemon);
                                    }
                                    document.getElementById("VA-" + ballsInGames[i][gameBalls].replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + ballsInGames[i][gameBalls].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }
                        /*var startingIndex = z;
                        for (let j = startingIndex; j < getindexes.length; j++) {
                            document.getElementById("TA-" + ballsInGames[i][gameBalls].replace(/\s/g, '') + " " + getindexes[j]).style.filter = "unset";
                        }*/
                    }
                }
            }
        }
    }


}

function SetSpecificEventBalls(legalityIndex, gameChecker, catergory, avoidUnbreedable) {
    var breedIndex = gamesToCheck[gameChecker].toLowerCase();
    breedIndex = breedIndex.replace(/'/g, '');
    breedIndex = breedIndex.replace(/ /g, '_');

    if (gameChecker == "(All Games)") {
        //Getting the last game in the array to make sure there are no issues.
        breedIndex = gamesToCheck[gamesToCheck.length - 1];
    } else {
        var gameName = gamesToCheck[gameChecker].replace(/ |'|_/g, '');
        gameName = gameName.toLowerCase();
        if (!availableStrings[legalityIndex].includes("|" + gameName + "|")) {
            //console.log(availableStrings[legalityIndex]);
            return;
        }
    }

    if (!evoChain && !forProgress) {
        if (ballLegality[legalityIndex][gamesToCheck[gameChecker] + catergory] != null) {
            var specificBalls;
            specificBalls = ballLegality[legalityIndex][gamesToCheck[gameChecker] + catergory].split(", ");
            for (let i = 0; i < specificBalls.length; i++) {
                tempBall = "";
                if (specificBalls[i].includes("(LA)")) {
                    tempBall = specificBalls[i];
                    //tempBall = specificBalls[i].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                } else {
                    tempBall = specificBalls[i] + " Ball";
                }
                if ((avoidUnbreedable != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball")) {

                } else {
                    document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                }
            }
        }
    }

    if (evoChain || forProgress) {
        var getEvos = new Array();
        var getBranches = new Array();

        var getMeOut = false;
        for (let i = 0; i < evoDataArray.length; i++) {
            if (getMeOut) {
                break;
            }
            //This is needed because Mothim can evolve from any Burmy, so it has a special Evo Line.
            if (ballLegality[legalityIndex].pokemon == "Mothim") {
                if (ballLegality[legalityIndex].pokemon == evoDataArray[i].pokemon) {
                    getEvos = evoDataArray[i].evo_lines.split("|");
                    if (evoDataArray[i].evo_branches != null) {
                        getBranches = evoDataArray[i].evo_branches.split("|");
                    }
                    getMeOut = true;
                    break;
                }
            } else {
                var arrayTempEvo = evoDataArray[i].evo_lines.split("|");
                for (let j = 0; j < arrayTempEvo.length; j++) {
                    if (ballLegality[legalityIndex].pokemon == arrayTempEvo[j]) {
                        getEvos = evoDataArray[i].evo_lines.split("|");
                        if (evoDataArray[i].evo_branches != null) {
                            getBranches = evoDataArray[i].evo_branches.split("|");
                        }
                        getMeOut = true;
                        break;
                    }
                }
            }
        }

        //console.log(getEvos);

        var getindexes = new Array();
        for (let i = 0; i < ballLegality.length; i++) {
            for (let j = 0; j < getEvos.length; j++) {
                if (getEvos[j] == ballLegality[i].pokemon) {
                    //Due to Solgaleo and Lunala Evos being tied by Game, this exception is needed.
                    if (ballLegality[legalityIndex].pokemon == "Solgaleo" && (gameName == "moon" || gameName == "ultramoon" || gameName == "shield") || ballLegality[legalityIndex].pokemon == "Lunala" && (gameName == "sun" || gameName == "ultrasun" || gameName == "sword")) {

                    } else {
                        tempPush = i;
                        getindexes.push(tempPush);
                    }
                }
            }
        }

        for (let z = 0; z < getindexes.length; z++) {
            tempIndex = getindexes[z];

            if (ballLegality[tempIndex].pokemon == "Shedinja" && ballLegality[tempIndex].pokemon != ballLegality[legalityIndex].pokemon || ballLegality[legalityIndex].pokemon == "Vivillon-Fancy" && ballLegality[tempIndex].pokemon != ballLegality[legalityIndex].pokemon && gamesToCheck.indexOf(breedIndex) < 37 || (ballLegality[legalityIndex].pokemon.includes("Vivillon") && !ballLegality[legalityIndex].pokemon.includes("-Fancy")) && ballLegality[tempIndex].pokemon != ballLegality[legalityIndex].pokemon && (gamesToCheck.indexOf(breedIndex) > 37 && gameChecker != "(All Games)") || ballLegality[legalityIndex].pokemon == "Raichu-Alola" && ballLegality[tempIndex].pokemon != ballLegality[legalityIndex].pokemon && (gameName != "sun" && gameName != "moon" && gameName != "ultrasun" && gameName != "ultramoon" && gameChecker != "(All Games)")) {
                continue;
            }

            if (ballLegality[getindexes[z]][gamesToCheck[gameChecker] + catergory] != null) {
                var specificBalls;
                specificBalls = ballLegality[getindexes[z]][gamesToCheck[gameChecker] + catergory].split(", ");
                for (let i = 0; i < specificBalls.length; i++) {
                    tempBall = "";
                    if (specificBalls[i].includes("(LA)")) {
                        tempBall = specificBalls[i];
                        //tempBall = specificBalls[i].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                    } else {
                        tempBall = specificBalls[i] + " Ball";
                    }
                    /*if ((avoidUnbreedable != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball")) {

                    }*/
                    if (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") {
                        if (avoidUnbreedable != null /*|| cannotBreedArray.includes(ballLegality[tempIndex].pokemon)*/) {

                        }
                        else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1) {

                        } else {
                            if (forProgress) {
                                if (eligableMons.indexOf(ballLegality[legalityIndex].pokemon) == -1) {
                                    eligableMons.push(ballLegality[legalityIndex].pokemon);
                                }
                                document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }
                    } else {
                        /*var startingIndex = z;
                        for (let j = startingIndex; j < getindexes.length; j++) {
                            document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + getindexes[j]).style.filter = "unset";
                        }*/

                        if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" && getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1) {

                        } else {
                            if (forProgress) {
                                if (eligableMons.indexOf(ballLegality[legalityIndex].pokemon) == -1) {
                                    eligableMons.push(ballLegality[legalityIndex].pokemon);
                                }
                                document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }

                    }
                }
            }
        }
    }
}

function SetBreedingTransferBalls(legalityIndex, gameChecker, catergory, avoidSpecial, avoidUnbreedable, gameBreaker, method) {

    if (gameChecker != "(All Games)") {
        var gameName = gameChecker.replace(/ |'/g, '');
        gameName = gameName.toLowerCase();
        if (!availableStrings[legalityIndex].includes("|" + gameName + "|")) {
            if (!forProgress) {
                console.log(availableStrings[legalityIndex]);
            }
            return;
        }
    }

    if (cannotBreedArray.indexOf(ballLegality[legalityIndex].pokemon) != -1 && method == "Via Breeding") {
        return;
    }

    var breedIndex = gameChecker.toLowerCase();
    breedIndex = breedIndex.replace(/'/g, '');
    breedIndex = breedIndex.replace(/ /g, '_');

    if (gameChecker == "(All Games)") {
        //Getting the last game in the array to make sure there are no issues.
        breedIndex = gamesToCheck[gamesToCheck.length - 1];
    }

    if ((ballLegality[legalityIndex].pokemon == "Vivillon-Pokeball" || ballLegality[legalityIndex].pokemon == "Vivillon-Fancy" && gamesToCheck.indexOf(breedIndex) < 37) && method == "Via Breeding") {
        return;
    }

    //Notice how the brackets from Viv are different, thats because viv is either pokeball which can never breed or fancy which can, but the case
    //Below is either alolan form and then you have the && cases outside of the backet. Viv probably doesn't need the extra brackets but im leaving them.
    if ((ballLegality[legalityIndex].pokemon == "Raichu-Alola" || ballLegality[legalityIndex].pokemon == "Exeggutor-Alola") && gamesToCheck.indexOf(breedIndex) > 31 && method == "Via Breeding" && gameChecker != "(All Games)") {
        return;
    }

    if (forProgress) {
        if (eligableMons.indexOf(ballLegality[legalityIndex].pokemon) == -1) {
            eligableMons.push(ballLegality[legalityIndex].pokemon);
        }
    }

    var getEvos = new Array();
    var getBranches = new Array();

    var getMeOut = false;
    for (let i = 0; i < evoDataArray.length; i++) {
        if (getMeOut) {
            break;
        }
        //This is needed because Mothim can evolve from any Burmy, so it has a special Evo Line.
        if (ballLegality[legalityIndex].pokemon == "Mothim") {
            if (ballLegality[legalityIndex].pokemon == evoDataArray[i].pokemon) {
                getEvos = evoDataArray[i].evo_lines.split("|");
                if (evoDataArray[i].evo_branches != null) {
                    getBranches = evoDataArray[i].evo_branches.split("|");
                }
                getMeOut = true;
                break;
            }
        } else {
            var arrayTempEvo = evoDataArray[i].evo_lines.split("|");
            for (let j = 0; j < arrayTempEvo.length; j++) {
                if (ballLegality[legalityIndex].pokemon == arrayTempEvo[j]) {
                    getEvos = evoDataArray[i].evo_lines.split("|");
                    if (evoDataArray[i].evo_branches != null) {
                        getBranches = evoDataArray[i].evo_branches.split("|");
                    }
                    getMeOut = true;
                    break;
                }
            }
        }
    }

    var monsToCheck = new Array();
    var formArray = new Array();
    var indexForms = new Array();
    for (let i = 0; i < getEvos.length; i++) {
        monsToCheck.push(getEvos[i]);
        var getMeOut = false;
        for (let j = 0; j < pokemonDataArray.length; j++) {
            if (getMeOut) {
                break;
            }
            if (pokemonDataArray[j].forms != null) {
                formArray = pokemonDataArray[j].forms.split("|");
                if (formArray.indexOf(getEvos[i]) != -1) {
                    for (let k = 0; k < formArray.length; k++) {
                        //The indexOf check at the end is to ensure a duplicate index is never obtained by only adding the index if it can't find it in the array which is why its looking for -1 which means not found.
                        if (((formArray[k] == getEvos[i].replace(/-Alola/, "") || formArray[k] == getEvos[i] + "-Alola") || (formArray[k] == getEvos[i].replace(/-Galar/, "") || formArray[k] == getEvos[i] + "-Galar") || (formArray[k] == getEvos[i].replace(/-Hisui/, "") || formArray[k] == getEvos[i] + "-Hisui") || (formArray[k] - "-Paldea" == getEvos[i].replace(/-Paldea/, "") || formArray[k] == getEvos[i] + "-Paldea") || formArray[k].includes("-East") || formArray[k].includes("-West") || formArray[k].includes("Basculin-") || formArray[k].includes("Deerling-") || formArray[k].includes("Sawsbuck-")) && !formArray[k].includes("-AlolaCap") && !genderlessPokemonArray.includes(formArray[k]) && monsToCheck.indexOf(formArray[k]) == -1) {
                            monsToCheck.push(formArray[k]);
                        }
                    }
                    getMeOut = true;
                    break;
                }
            }

        }
    }

    for (let j = 0; j < pokemonDataArray.length; j++) {
        if (pokemonDataArray[j].forms != null && pokemonDataArray[j].forms.includes(ballLegality[legalityIndex].pokemon)) {
            formArray = pokemonDataArray[j].forms.split("|");
            for (let k = 0; k < formArray.length; k++) {
                if (formArray[k] != ballLegality[legalityIndex].pokemon) {
                    if (formArray[k].includes("-Alola") && !formArray[k].includes("-AlolaCap") || formArray[k].includes("-Galar") || formArray[k].includes("-Hisui") || formArray[k].includes("-Paldea")) {
                        indexForms.push(formArray[k]);
                    }
                    //indexForms.push(formArray[k]);
                }
            }
            break;
        }
    }

    //For loops are done in this specific order to make sure its done by evo line, not by index, because it was causing an issue for introduced pre-evos like Pichu when it came to pre-gen6 inheritance.
    var getindexes = new Array();
    for (let i = 0; i < monsToCheck.length; i++) {
        for (let j = 0; j < ballLegality.length; j++) {
            if (monsToCheck[i] == ballLegality[j].pokemon) {
                var gameName = gameChecker.replace(/ |'/g, '');
                gameName = gameName.toLowerCase();
                /*if (gameChecker == "(All Games)" || gameChecker != "(All Games)" && availableStrings[j].includes("|" + gameName + "|")) {
                    tempPush = j;
                    getindexes.push(tempPush);
                }*/
                tempPush = j;
                getindexes.push(tempPush);
                break;
            }
        }
    }

    if (monsToCheck.length == 0) {
        monsToCheck.push(ballLegality[legalityIndex].pokemon);
    }
    //console.log(getindexes);

    if (gameChecker != "(All Games)") {
        //console.log(getindexes);
    }

    for (let i = 0; i < getindexes.length; i++) {
        tempIndex = getindexes[i];

        for (let j = 0; j < gamesToCheck.length; j++) {
            if (gamesToCheck[j] == gameBreaker) {
                break;
            }

            if (ballLegality[legalityIndex].pokemon == "Shedinja" && ballLegality[tempIndex].pokemon != ballLegality[legalityIndex].pokemon || ballLegality[legalityIndex].pokemon == "Vivillon-Fancy" && ballLegality[tempIndex].pokemon != ballLegality[legalityIndex].pokemon && gamesToCheck.indexOf(breedIndex) < 37 || (ballLegality[legalityIndex].pokemon.includes("Vivillon") && !ballLegality[legalityIndex].pokemon.includes("-Fancy")) && ballLegality[tempIndex].pokemon != ballLegality[legalityIndex].pokemon && (gamesToCheck.indexOf(breedIndex) > 37 && gameChecker != "(All Games)") && method == "Via Breeding") {
                break;
            }
            //Lets Go is avoided due to Let's Go Pokemon only being able in Let's Go Games, so those games are missed.
            if (ballLegality[tempIndex][gamesToCheck[j] + catergory] == "Available" && !gamesToCheck[j].includes("lets_go")) {
                //If it is the selected pokemon meeting the requirements, then shorter checks are needed as they cannot be any issues with ball inheritance since it is the mon in question.
                if (ballLegality[tempIndex].pokemon == ballLegality[legalityIndex].pokemon) {
                    for (let k = 0; k < ballsInGames.length; k++) {
                        //If the ball is a ball that cannot be bred down and avoidSpecial is used (for Via Breeding option), then it is replaced with a Poke Ball.
                        if ((avoidSpecial != null) && (ballsInGames[k][gamesToCheck[j]] == "Cherish Ball" || ballsInGames[k][gamesToCheck[j]] == "Master Ball" || ballsInGames[k][gamesToCheck[j]] == "Strange Ball") || ballsInGames[k][gamesToCheck[j]] != null && ballsInGames[k][gamesToCheck[j]].includes("LA") && method == "Via Breeding") {
                            if (forProgress) {
                                document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }

                        }

                        //If the Balls can breed down in the game, get them, otherwise just set Poke Ball.
                        else if (avoidUnbreedable == null && ballsInGames[k][gamesToCheck[j]] != null/* && document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                            if (forProgress) {
                                document.getElementById("VA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }

                        }

                        if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                            if (ballsInGames[k][gamesToCheck[j]] != null/* && document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }

                        //The Below is purely for Strange Ball Only.
                        if (avoidSpecial == null && (ballsInGames[k][gamesToCheck[j]] != null && ballsInGames[k][gamesToCheck[j]].includes("LA") && (gameChecker != "legends_arceus" || gameChecker == ("(All Games)")) && availableStrings[legalityIndex].includes("|legendsarceus|"))) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                            if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }
                        else if (avoidSpecial == null && (ballsInGames[k][gamesToCheck[j]] != null && !ballsInGames[k][gamesToCheck[j]].includes("LA") && (gameChecker == "legends_arceus" || gameChecker == ("(All Games)")) && availableStrings[legalityIndex].includes("|legendsarceus|"))) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }
                    }
                }
                //This is checking if a Pokemon from its evolution line is from a game where breeding down balls is impossible.
                else if (availableStrings[tempIndex].includes("|" + gamesToCheck[j].replace(/_|'/g, '') + "|") && (gamesToCheck[j] == "ruby" || gamesToCheck[j] == "sapphire" || gamesToCheck[j] == "emerald" || gamesToCheck[j] == "fire_red" || gamesToCheck[j] == "leaf_green" || gamesToCheck[j] == "colosseum" || gamesToCheck[j] == "xd_gale_of_darkness" || gamesToCheck[j] == "diamond" || gamesToCheck[j] == "pearl" || gamesToCheck[j] == "platinum" || gamesToCheck[j] == "heart_gold" || gamesToCheck[j] == "soul_silver" || gamesToCheck[j] == "black" || gamesToCheck[j] == "white" || gamesToCheck[j] == "black_2" || gamesToCheck[j] == "white_2")) {
                    //If the Pokemon from the evolution line is lower than the selected Pokemon. If this is the case, then it means that the selected Pokemon can get those balls by being evolved from the lower stage. The or part is because there was an issue getting Specific Balls for regional forms due to them being a higher index. breedIndex is so the balls are passed if it is in a game where can be passed down. This should cover regional forms as well, but I'll leave that part in for clarity.
                    if (getindexes.indexOf(tempIndex) < getindexes.indexOf(legalityIndex) || (ballLegality[legalityIndex].pokemon.includes(ballLegality[tempIndex].pokemon) || gamesToCheck.indexOf(breedIndex) > 22)) {
                        //Not sure if I need the below, it does check if its an evo but that shouldn't matter as pre gen5 there is not really an issue with forms and even past that, breeding is possible.
                        /*var confirmedEvo = false;
                        for (let k = 0; k < getEvos.length; k++) {
                            if (getEvos[k] == ballLegality[tempIndex].pokemon) {
                                confirmedEvo = true;
                            }
                        }
                        if (confirmedEvo) {
                            for (let k = 0; k < ballsInGames.length; k++) {
                                if (ballsInGames[k][gamesToCheck[j]] != null && document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.display == "initial") {
                                    document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }*/


                        /*for (let k = 0; k < ballsInGames.length; k++) {
                            if (ballsInGames[k][gamesToCheck[j]] != null && document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.display == "initial") {
                                document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }*/

                        for (let k = 0; k < ballsInGames.length; k++) {
                            //If the Balls can't breed down, then only set Poke Ball.
                            if (avoidUnbreedable != null && ballsInGames[k][gamesToCheck[j]] != null/* && document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            } else {
                                //If special balls aren't allowed such as for breeding in any game, then set Poke Ball instead of that ball.
                                /*if ((avoidSpecial != null) && (ballsInGames[k][gamesToCheck[j]] == "Cherish Ball" || ballsInGames[k][gamesToCheck[j]] == "Master Ball" || ballsInGames[k][gamesToCheck[j]] == "Strange Ball") || ballsInGames[k][gamesToCheck[j]] != null && ballsInGames[k][gamesToCheck[j]].includes("LA") && method == "Via Breeding") {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }*/

                                if (ballsInGames[k][gamesToCheck[j]] != null && (ballsInGames[k][gamesToCheck[j]] == "Cherish Ball" || ballsInGames[k][gamesToCheck[j]] == "Master Ball" || ballsInGames[k][gamesToCheck[j]] == "Strange Ball" || ballsInGames[k][gamesToCheck[j]].includes("LA"))) {
                                    if (avoidSpecial != null && method == "Via Breeding") {
                                        if (forProgress) {
                                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                    else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1 || formArray.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                        if (forProgress) {
                                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    } else {
                                        if (forProgress) {
                                            document.getElementById("VA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                }

                                else if (ballsInGames[k][gamesToCheck[j]] != null/* && document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }

                        }

                    }
                    //If the evolution line is higher, then it can be breeded down to get Poke Ball.
                    else {
                        if (forProgress) {
                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                        } else {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }
                    }
                    //Since breeding down will always be a Poke Ball, if the option is allowed, it will pass it down, which is useful for Safari Ball only Pokemon
                    if (avoidUnbreedable != null) {
                        if (forProgress) {
                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                        } else {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }
                    }

                }
                else {
                    for (let k = 0; k < ballsInGames.length; k++) {

                        /*if ((avoidSpecial != null) && (ballsInGames[k][gamesToCheck[j]] == "Cherish Ball" || ballsInGames[k][gamesToCheck[j]] == "Master Ball" || ballsInGames[k][gamesToCheck[j]] == "Strange Ball") || ballsInGames[k][gamesToCheck[j]] != null && ballsInGames[k][gamesToCheck[j]].includes("LA") && method == "Via Breeding") {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }*/

                        //Alright so since these balls are special, what happens is it checks if they can breed down and if not, then what it does is it checks how they can be passed on, taking into account branch evolutions. For example, Slowpoke, Slowbro and Slowking are the same line but Slowbro being in Cherish does not mean Slowking is. so the getBranches checks for this. It also makes sure that its an higher evo to have it.
                        if (ballsInGames[k][gamesToCheck[j]] != null && (ballsInGames[k][gamesToCheck[j]] == "Cherish Ball" || ballsInGames[k][gamesToCheck[j]] == "Master Ball" || ballsInGames[k][gamesToCheck[j]] == "Strange Ball" || ballsInGames[k][gamesToCheck[j]].includes("LA"))) {
                            if (avoidSpecial != null && method == "Via Breeding") {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                            else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1 || formArray.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            } else {
                                //Due to Lyanroc-Dusk in USUM being available in every normal ball but Master, this is needed.
                                if ((gameName == "ultrasun" || gameName == "ultramoon") && ballLegality[legalityIndex].pokemon == "Lycanroc-Dusk" && ballsInGames[k][gamesToCheck[j]] == "Master Ball") {

                                } else {
                                    if (forProgress) {
                                        document.getElementById("VA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                        else if (ballsInGames[k][gamesToCheck[j]] != null/* && document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {

                            //If the Ball is from LA, then it needs to check that the Selected Pokemon can even be caught in LA, and that specifically LA or All Games is being viewed
                            if (ballsInGames[k][gamesToCheck[j]] != null && ballsInGames[k][gamesToCheck[j]].includes("LA")) {
                                if ((gameChecker == "legends_arceus" || gameChecker == "(All Games)") && availableStrings[legalityIndex].includes("|legendsarceus|")) {
                                    //If the Pokemon from the evolution line is lower than the selected Pokemon. If this is the case, then it means that the selected Pokemon can get those balls by being evolved from the lower stage.
                                    if (getEvos.indexOf(ballLegality[tempIndex].pokemon) < getEvos.indexOf(ballLegality[legalityIndex].pokemon) && getEvos.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                        if (forProgress) {
                                            document.getElementById("VA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                }

                            } if (ballsInGames[k][gamesToCheck[j]] != null && !ballsInGames[k][gamesToCheck[j]].includes("LA")) {
                                if (gameChecker != "legends_arceus" || gameChecker == ("(All Games)")) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + ballsInGames[k][gamesToCheck[j]].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                        //Setting Strange Balls for mons that aren't native to LA is weird, I need to check that the ball is an LA one and that the game being checked is not LA as LA balls don't show up as strange in LA. I then need to check that the Pokemon is even in Legends Arceus to being with. I exclude Raichu-Alola because Raichu-Alola is an extreme edge case as Pikachu cannot evolve into this outside of Gen7.
                        if (avoidSpecial == null && ballsInGames[k][gamesToCheck[j]] != null && ballsInGames[k][gamesToCheck[j]].includes("LA") && (gameChecker != "legends_arceus" || gameChecker == "(All Games)") && availableStrings[tempIndex].includes("|legendsarceus|") && !ballLegality[tempIndex].pokemon.includes("Raichu-Alola")) {
                            if (getEvos.indexOf(ballLegality[tempIndex].pokemon) < getEvos.indexOf(ballLegality[legalityIndex].pokemon) && getEvos.indexOf(ballLegality[tempIndex].pokemon) != -1 && !ballLegality[legalityIndex].pokemon.includes("Raichu-Alola")) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                                if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                    }
                }
            }
            //Lets Go is avoided due to Let's Go Pokemon only being able in Let's Go Games, so those games are missed.
            if (ballLegality[tempIndex][gamesToCheck[j] + "_specific"] != null && !gamesToCheck[j].includes("lets_go")) {
                //If it is the selected pokemon meeting the requirements, then shorter checks are needed as they cannot be any issues with ball inheritance since it is the mon in question.
                if (ballLegality[tempIndex].pokemon == ballLegality[legalityIndex].pokemon) {
                    var specificBalls;
                    specificBalls = ballLegality[tempIndex][gamesToCheck[j] + "_specific"].split(", ");
                    for (let k = 0; k < specificBalls.length; k++) {
                        tempBall = "";
                        if (specificBalls[k].includes("(LA)")) {
                            tempBall = specificBalls[k];
                            //tempBall = specificBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                        } else {
                            tempBall = specificBalls[k] + " Ball";
                        }
                        //If the ball is a ball that cannot be bred down and avoidSpecial is used (for Via Breeding option), then it is replaced with a Poke Ball.
                        if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                            if (forProgress) {
                                document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }

                        //If the Balls can breed down in the game, get them, otherwise just set Poke Ball.
                        else if (avoidUnbreedable == null && tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                            if (forProgress) {
                                document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }

                        if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                            if (tempBall != null/* && document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }

                        //The Below is purely for Strange Ball Only.
                        if (avoidSpecial == null && (tempBall != null && tempBall.includes("LA") && (gameChecker != "legends_arceus" || gameChecker == ("(All Games)")) && availableStrings[legalityIndex].includes("|legendsarceus|"))) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                            if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }
                        else if (avoidSpecial == null && (tempBall != null && !tempBall.includes("LA") && (gameChecker == "legends_arceus" || gameChecker == ("(All Games)")) && availableStrings[legalityIndex].includes("|legendsarceus|"))) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }
                    }
                }
                //This is checking if a Pokemon from its evolution line is from a game where breeding down balls is impossible.
                else if (availableStrings[tempIndex].includes("|" + gamesToCheck[j].replace(/_|'/g, '') + "|") && (gamesToCheck[j] == "ruby" || gamesToCheck[j] == "sapphire" || gamesToCheck[j] == "emerald" || gamesToCheck[j] == "fire_red" || gamesToCheck[j] == "leaf_green" || gamesToCheck[j] == "colosseum" || gamesToCheck[j] == "xd_gale_of_darkness" || gamesToCheck[j] == "diamond" || gamesToCheck[j] == "pearl" || gamesToCheck[j] == "platinum" || gamesToCheck[j] == "heart_gold" || gamesToCheck[j] == "soul_silver" || gamesToCheck[j] == "black" || gamesToCheck[j] == "white" || gamesToCheck[j] == "black_2" || gamesToCheck[j] == "white_2")) {
                    //If the Pokemon from the evolution line is lower than the selected Pokemon. If this is the case, then it means that the selected Pokemon can get those balls by being evolved from the lower stage. The or part is because there was an issue getting Specific Balls for regional forms due to them being a higher index. breedIndex is so the balls are passed if it is in a game where can be passed down. This should cover regional forms as well, but I'll leave that part in for clarity.
                    if (getindexes.indexOf(tempIndex) < getindexes.indexOf(legalityIndex) || (ballLegality[legalityIndex].pokemon.includes(ballLegality[tempIndex].pokemon) || gamesToCheck.indexOf(breedIndex) > 22)) {
                        var specificBalls;
                        specificBalls = ballLegality[tempIndex][gamesToCheck[j] + "_specific"].split(", ");
                        for (let k = 0; k < specificBalls.length; k++) {
                            tempBall = "";
                            if (specificBalls[k].includes("(LA)")) {
                                tempBall = specificBalls[k];
                                //tempBall = specificBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                            } else {
                                tempBall = specificBalls[k] + " Ball";
                            }

                            //If the Balls can't breed down, then only set Poke Ball.
                            if (avoidUnbreedable != null && tempBall != null/* && document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            } else {
                                //If special balls aren't allowed such as for breeding in any game, then set Poke Ball instead of that ball.
                                /*if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }*/

                                if (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball" || tempBall.includes("LA")) {
                                    if (avoidSpecial != null && method == "Via Breeding") {
                                        if (forProgress) {
                                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                    else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1 || formArray.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                        if (forProgress) {
                                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    } else {
                                        if (forProgress) {
                                            document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                }

                                else if (tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                    }
                    //If the evolution line is higher, then it can be breeded down to get Poke Ball.
                    else {
                        if (forProgress) {
                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                        } else {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }
                    }
                    //Since breeding down will always be a Poke Ball, if the option is allowed, it will pass it down, which is useful for Safari Ball only Pokemon
                    if (avoidUnbreedable != null) {
                        if (forProgress) {
                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                        } else {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }
                    }

                }
                else {
                    var specificBalls;
                    specificBalls = ballLegality[tempIndex][gamesToCheck[j] + "_specific"].split(", ");
                    for (let k = 0; k < specificBalls.length; k++) {
                        tempBall = "";
                        if (specificBalls[k].includes("(LA)")) {
                            tempBall = specificBalls[k];
                            //tempBall = specificBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                        } else {
                            tempBall = specificBalls[k] + " Ball";
                        }
                        /*if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }*/

                        //Alright so since these balls are special, what happens is it checks if they can breed down and if not, then what it does is it checks how they can be passed on, taking into account branch evolutions. For example, Slowpoke, Slowbro and Slowking are the same line but Slowbro being in Cherish does not mean Slowking is. so the getBranches checks for this. It also makes sure that its an higher evo to have it.
                        if (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball" || tempBall.includes("LA")) {
                            if (avoidSpecial != null && method == "Via Breeding") {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                            else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1 || formArray.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            } else {
                                if (forProgress) {
                                    document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }

                        else if (tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {

                            //If the Ball is from LA, then it needs to check that the Selected Pokemon can even be caught in LA, and that specifically LA or All Games is being viewed
                            if (tempBall != null && tempBall.includes("LA")) {
                                if ((gameChecker == "legends_arceus" || gameChecker == "(All Games)") && availableStrings[legalityIndex].includes("|legendsarceus|")) {
                                    //If the Pokemon from the evolution line is lower than the selected Pokemon. If this is the case, then it means that the selected Pokemon can get those balls by being evolved from the lower stage.
                                    if (getEvos.indexOf(ballLegality[tempIndex].pokemon) < getEvos.indexOf(ballLegality[legalityIndex].pokemon) && getEvos.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                        if (forProgress) {
                                            document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                }

                            } else if (tempBall != null && !tempBall.includes("LA")) {
                                if (gameChecker != "legends_arceus" || gameChecker == ("(All Games)")) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                        //Setting Strange Balls for mons that aren't native to LA is weird, I need to check that the ball is an LA one and that the game being checked is not LA as LA balls don't show up as strange in LA. I then need to check that the Pokemon is even in Legends Arceus to being with. I exclude Raichu-Alola because Raichu-Alola is an extreme edge case as Pikachu cannot evolve into this outside of Gen7.
                        if (avoidSpecial == null && tempBall != null && tempBall.includes("LA") && (gameChecker != "legends_arceus" || gameChecker == "(All Games)") && availableStrings[tempIndex].includes("|legendsarceus|") && !ballLegality[tempIndex].pokemon.includes("Raichu-Alola")) {
                            if (getEvos.indexOf(ballLegality[tempIndex].pokemon) < getEvos.indexOf(ballLegality[legalityIndex].pokemon) && getEvos.indexOf(ballLegality[tempIndex].pokemon) != -1 && !ballLegality[legalityIndex].pokemon.includes("Raichu-Alola")) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                                if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                    }
                }
            }
            //Lets Go is avoided due to Let's Go Pokemon only being able in Let's Go Games, so those games are missed.
            if (ballLegality[tempIndex][gamesToCheck[j] + "_event"] != null && !gamesToCheck[j].includes("lets_go")) {
                //If it is the selected pokemon meeting the requirements, then shorter checks are needed as they cannot be any issues with ball inheritance since it is the mon in question.
                if (ballLegality[tempIndex].pokemon == ballLegality[legalityIndex].pokemon) {
                    var eventBalls;
                    eventBalls = ballLegality[tempIndex][gamesToCheck[j] + "_event"].split(", ");
                    for (let k = 0; k < eventBalls.length; k++) {
                        tempBall = "";
                        if (eventBalls[k].includes("(LA)")) {
                            tempBall = eventBalls[k];
                            //tempBall = eventBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                        } else {
                            tempBall = eventBalls[k] + " Ball";
                        }
                        //If the ball is a ball that cannot be bred down and avoidSpecial is used (for Via Breeding option), then it is replaced with a Poke Ball.
                        if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                            if (forProgress) {
                                document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }

                        //If the Balls can breed down in the game, get them, otherwise just set Poke Ball.
                        else if (avoidUnbreedable == null && tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                            if (forProgress) {
                                document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }

                        if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                            if (tempBall != null/* && document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }

                        //The Below is purely for Strange Ball Only.
                        if (avoidSpecial == null && (tempBall != null && tempBall.includes("LA") && (gameChecker != "legends_arceus" || gameChecker == ("(All Games)")) && availableStrings[legalityIndex].includes("|legendsarceus|"))) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                            if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }
                        else if (avoidSpecial == null && (tempBall != null && !tempBall.includes("LA") && (gameChecker == "legends_arceus" || gameChecker == ("(All Games)")) && availableStrings[legalityIndex].includes("|legendsarceus|"))) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }
                    }
                }
                //This is checking if a Pokemon from its evolution line is from a game where breeding down balls is impossible.
                else if (availableStrings[tempIndex].includes("|" + gamesToCheck[j].replace(/_|'/g, '') + "|") && (gamesToCheck[j] == "ruby" || gamesToCheck[j] == "sapphire" || gamesToCheck[j] == "emerald" || gamesToCheck[j] == "fire_red" || gamesToCheck[j] == "leaf_green" || gamesToCheck[j] == "colosseum" || gamesToCheck[j] == "xd_gale_of_darkness" || gamesToCheck[j] == "diamond" || gamesToCheck[j] == "pearl" || gamesToCheck[j] == "platinum" || gamesToCheck[j] == "heart_gold" || gamesToCheck[j] == "soul_silver" || gamesToCheck[j] == "black" || gamesToCheck[j] == "white" || gamesToCheck[j] == "black_2" || gamesToCheck[j] == "white_2")) {
                    //If the Pokemon from the evolution line is lower than the selected Pokemon. If this is the case, then it means that the selected Pokemon can get those balls by being evolved from the lower stage. The or part is because there was an issue getting event Balls for regional forms due to them being a higher index. breedIndex is so the balls are passed if it is in a game where can be passed down. This should cover regional forms as well, but I'll leave that part in for clarity.
                    if (getindexes.indexOf(tempIndex) < getindexes.indexOf(legalityIndex) || (ballLegality[legalityIndex].pokemon.includes(ballLegality[tempIndex].pokemon) || gamesToCheck.indexOf(breedIndex) > 22)) {
                        var eventBalls;
                        eventBalls = ballLegality[tempIndex][gamesToCheck[j] + "_event"].split(", ");
                        for (let k = 0; k < eventBalls.length; k++) {
                            tempBall = "";
                            if (eventBalls[k].includes("(LA)")) {
                                tempBall = eventBalls[k];
                                //tempBall = eventBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                            } else {
                                tempBall = eventBalls[k] + " Ball";
                            }

                            //If the Balls can't breed down, then only set Poke Ball.
                            if (avoidUnbreedable != null && tempBall != null/* && document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            } else {
                                //If special balls aren't allowed such as for breeding in any game, then set Poke Ball instead of that ball.
                                /*if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }*/

                                if (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball" || tempBall.includes("LA")) {
                                    if (avoidSpecial != null && method == "Via Breeding") {
                                        if (forProgress) {
                                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                    else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1 || formArray.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                        if (forProgress) {
                                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    } else {
                                        if (forProgress) {
                                            document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                }

                                else if (tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                    }
                    //If the evolution line is higher, then it can be breeded down to get Poke Ball.
                    else {
                        if (forProgress) {
                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                        } else {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }
                    }
                    //Since breeding down will always be a Poke Ball, if the option is allowed, it will pass it down, which is useful for Safari Ball only Pokemon
                    if (avoidUnbreedable != null) {
                        if (forProgress) {
                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                        } else {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }
                    }

                }
                else {
                    var eventBalls;
                    eventBalls = ballLegality[tempIndex][gamesToCheck[j] + "_event"].split(", ");
                    for (let k = 0; k < eventBalls.length; k++) {
                        tempBall = "";
                        if (eventBalls[k].includes("(LA)")) {
                            tempBall = eventBalls[k];
                            //tempBall = eventBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                        } else {
                            tempBall = eventBalls[k] + " Ball";
                        }
                        /*if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }*/

                        //Alright so since these balls are special, what happens is it checks if they can breed down and if not, then what it does is it checks how they can be passed on, taking into account branch evolutions. For example, Slowpoke, Slowbro and Slowking are the same line but Slowbro being in Cherish does not mean Slowking is. so the getBranches checks for this. It also makes sure that its an higher evo to have it.
                        if (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball" || tempBall.includes("LA")) {
                            if (avoidSpecial != null && method == "Via Breeding") {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                            else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1 || formArray.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            } else {
                                if (forProgress) {
                                    document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }

                        else if (tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {

                            //If the Ball is from LA, then it needs to check that the Selected Pokemon can even be caught in LA, and that eventally LA or All Games is being viewed
                            if (tempBall != null && tempBall.includes("LA")) {
                                if ((gameChecker == "legends_arceus" || gameChecker == "(All Games)") && availableStrings[legalityIndex].includes("|legendsarceus|")) {
                                    //If the Pokemon from the evolution line is lower than the selected Pokemon. If this is the case, then it means that the selected Pokemon can get those balls by being evolved from the lower stage.
                                    if (getEvos.indexOf(ballLegality[tempIndex].pokemon) < getEvos.indexOf(ballLegality[legalityIndex].pokemon) && getEvos.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                        if (forProgress) {
                                            document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                }

                            } else if (tempBall != null && !tempBall.includes("LA")) {
                                if (gameChecker != "legends_arceus" || gameChecker == ("(All Games)")) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                        //Setting Strange Balls for mons that aren't native to LA is weird, I need to check that the ball is an LA one and that the game being checked is not LA as LA balls don't show up as strange in LA. I then need to check that the Pokemon is even in Legends Arceus to being with. I exclude Raichu-Alola because Raichu-Alola is an extreme edge case as Pikachu cannot evolve into this outside of Gen7.
                        if (avoidSpecial == null && tempBall != null && tempBall.includes("LA") && (gameChecker != "legends_arceus" || gameChecker == "(All Games)") && availableStrings[tempIndex].includes("|legendsarceus|") && !ballLegality[tempIndex].pokemon.includes("Raichu-Alola")) {
                            if (getEvos.indexOf(ballLegality[tempIndex].pokemon) < getEvos.indexOf(ballLegality[legalityIndex].pokemon) && getEvos.indexOf(ballLegality[tempIndex].pokemon) != -1 && !ballLegality[legalityIndex].pokemon.includes("Raichu-Alola")) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                                if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                    }
                }
            }
            //Lets Go is avoided due to Let's Go Pokemon only being able in Let's Go Games, so those games are missed.
            if (ballLegality[tempIndex][gamesToCheck[j] + "_other"] != null && !gamesToCheck[j].includes("lets_go")) {
                //If it is the selected pokemon meeting the requirements, then shorter checks are needed as they cannot be any issues with ball inheritance since it is the mon in question.
                if (ballLegality[tempIndex].pokemon == ballLegality[legalityIndex].pokemon) {
                    var otherBalls;
                    otherBalls = ballLegality[tempIndex][gamesToCheck[j] + "_other"].split(", ");
                    for (let k = 0; k < otherBalls.length; k++) {
                        tempBall = "";
                        if (otherBalls[k].includes("(LA)")) {
                            tempBall = otherBalls[k];
                            //tempBall = otherBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                        } else {
                            tempBall = otherBalls[k] + " Ball";
                        }
                        //If the ball is a ball that cannot be bred down and avoidSpecial is used (for Via Breeding option), then it is replaced with a Poke Ball.
                        if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                            if (forProgress) {
                                document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }

                        //If the Balls can breed down in the game, get them, otherwise just set Poke Ball.
                        else if (avoidUnbreedable == null && tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                            if (forProgress) {
                                document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }

                        if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                            if (tempBall != null/* && document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }

                        //The Below is purely for Strange Ball Only.
                        if (avoidSpecial == null && (tempBall != null && tempBall.includes("LA") && (gameChecker != "legends_arceus" || gameChecker == ("(All Games)")) && availableStrings[legalityIndex].includes("|legendsarceus|"))) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                            if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }
                        else if (avoidSpecial == null && (tempBall != null && !tempBall.includes("LA") && (gameChecker == "legends_arceus" || gameChecker == ("(All Games)")) && availableStrings[legalityIndex].includes("|legendsarceus|"))) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }
                    }
                }
                //This is checking if a Pokemon from its evolution line is from a game where breeding down balls is impossible.
                else if (availableStrings[tempIndex].includes("|" + gamesToCheck[j].replace(/_|'/g, '') + "|") && (gamesToCheck[j] == "ruby" || gamesToCheck[j] == "sapphire" || gamesToCheck[j] == "emerald" || gamesToCheck[j] == "fire_red" || gamesToCheck[j] == "leaf_green" || gamesToCheck[j] == "colosseum" || gamesToCheck[j] == "xd_gale_of_darkness" || gamesToCheck[j] == "diamond" || gamesToCheck[j] == "pearl" || gamesToCheck[j] == "platinum" || gamesToCheck[j] == "heart_gold" || gamesToCheck[j] == "soul_silver" || gamesToCheck[j] == "black" || gamesToCheck[j] == "white" || gamesToCheck[j] == "black_2" || gamesToCheck[j] == "white_2")) {
                    //If the Pokemon from the evolution line is lower than the selected Pokemon. If this is the case, then it means that the selected Pokemon can get those balls by being evolved from the lower stage. The or part is because there was an issue getting other Balls for regional forms due to them being a higher index. breedIndex is so the balls are passed if it is in a game where can be passed down. This should cover regional forms as well, but I'll leave that part in for clarity.
                    if (getindexes.indexOf(tempIndex) < getindexes.indexOf(legalityIndex) || (ballLegality[legalityIndex].pokemon.includes(ballLegality[tempIndex].pokemon) || gamesToCheck.indexOf(breedIndex) > 22)) {
                        var otherBalls;
                        otherBalls = ballLegality[tempIndex][gamesToCheck[j] + "_other"].split(", ");
                        for (let k = 0; k < otherBalls.length; k++) {
                            tempBall = "";
                            if (otherBalls[k].includes("(LA)")) {
                                tempBall = otherBalls[k];
                                //tempBall = otherBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                            } else {
                                tempBall = otherBalls[k] + " Ball";
                            }

                            //If the Balls can't breed down, then only set Poke Ball.
                            if (avoidUnbreedable != null && tempBall != null/* && document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            } else {
                                //If special balls aren't allowed such as for breeding in any game, then set Poke Ball instead of that ball.
                                /*if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }*/

                                if (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball" || tempBall.includes("LA")) {
                                    if (avoidSpecial != null && method == "Via Breeding") {
                                        if (forProgress) {
                                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                    else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1 || formArray.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                        if (forProgress) {
                                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    } else {
                                        if (forProgress) {
                                            document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                }

                                else if (tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                    }
                    //If the evolution line is higher, then it can be breeded down to get Poke Ball.
                    else {
                        if (forProgress) {
                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                        } else {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }
                    }
                    //Since breeding down will always be a Poke Ball, if the option is allowed, it will pass it down, which is useful for Safari Ball only Pokemon
                    if (avoidUnbreedable != null) {
                        if (forProgress) {
                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                        } else {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }
                    }

                }
                else {
                    var otherBalls;
                    otherBalls = ballLegality[tempIndex][gamesToCheck[j] + "_other"].split(", ");
                    for (let k = 0; k < otherBalls.length; k++) {
                        tempBall = "";
                        if (otherBalls[k].includes("(LA)")) {
                            tempBall = otherBalls[k];
                            //tempBall = otherBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                        } else {
                            tempBall = otherBalls[k] + " Ball";
                        }
                        /*if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }*/

                        //Alright so since these balls are special, what happens is it checks if they can breed down and if not, then what it does is it checks how they can be passed on, taking into account branch evolutions. For example, Slowpoke, Slowbro and Slowking are the same line but Slowbro being in Cherish does not mean Slowking is. so the getBranches checks for this. It also makes sure that its an higher evo to have it.
                        if (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball" || tempBall.includes("LA")) {
                            if (avoidSpecial != null && method == "Via Breeding") {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                            else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1 || formArray.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            } else {
                                if (forProgress) {
                                    document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }

                        else if (tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {

                            //If the Ball is from LA, then it needs to check that the Selected Pokemon can even be caught in LA, and that otherally LA or All Games is being viewed
                            if (tempBall != null && tempBall.includes("LA")) {
                                if ((gameChecker == "legends_arceus" || gameChecker == "(All Games)") && availableStrings[legalityIndex].includes("|legendsarceus|")) {
                                    //If the Pokemon from the evolution line is lower than the selected Pokemon. If this is the case, then it means that the selected Pokemon can get those balls by being evolved from the lower stage.
                                    if (getEvos.indexOf(ballLegality[tempIndex].pokemon) < getEvos.indexOf(ballLegality[legalityIndex].pokemon) && getEvos.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                        if (forProgress) {
                                            document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                }

                            } else if (tempBall != null && !tempBall.includes("LA")) {
                                if (gameChecker != "legends_arceus" || gameChecker == ("(All Games)")) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                        //Setting Strange Balls for mons that aren't native to LA is weird, I need to check that the ball is an LA one and that the game being checked is not LA as LA balls don't show up as strange in LA. I then need to check that the Pokemon is even in Legends Arceus to being with. I exclude Raichu-Alola because Raichu-Alola is an extreme edge case as Pikachu cannot evolve into this outside of Gen7.
                        if (avoidSpecial == null && tempBall != null && tempBall.includes("LA") && (gameChecker != "legends_arceus" || gameChecker == "(All Games)") && availableStrings[tempIndex].includes("|legendsarceus|") && !ballLegality[tempIndex].pokemon.includes("Raichu-Alola")) {
                            if (getEvos.indexOf(ballLegality[tempIndex].pokemon) < getEvos.indexOf(ballLegality[legalityIndex].pokemon) && getEvos.indexOf(ballLegality[tempIndex].pokemon) != -1 && !ballLegality[legalityIndex].pokemon.includes("Raichu-Alola")) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                                if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                    }
                }
            }
            //Lets Go is avoided due to Let's Go Pokemon only being able in Let's Go Games, so those games are missed.
            if (ballLegality[tempIndex][gamesToCheck[j] + "_raidOutbreak"] != null && !gamesToCheck[j].includes("lets_go")) {
                //If it is the selected pokemon meeting the requirements, then shorter checks are needed as they cannot be any issues with ball inheritance since it is the mon in question.
                if (ballLegality[tempIndex].pokemon == ballLegality[legalityIndex].pokemon) {
                    var raidBalls;
                    raidBalls = ballLegality[tempIndex][gamesToCheck[j] + "_raidOutbreak"].split(", ");
                    for (let k = 0; k < raidBalls.length; k++) {
                        tempBall = "";
                        if (raidBalls[k].includes("(LA)")) {
                            tempBall = raidBalls[k];
                            //tempBall = raidBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                        } else {
                            tempBall = raidBalls[k] + " Ball";
                        }
                        //If the ball is a ball that cannot be bred down and avoidSpecial is used (for Via Breeding option), then it is replaced with a Poke Ball.
                        if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                            if (forProgress) {
                                document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }

                        //If the Balls can breed down in the game, get them, otherwise just set Poke Ball.
                        else if (avoidUnbreedable == null && tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                            if (forProgress) {
                                document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }

                        if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                            if (tempBall != null/* && document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }

                        //The Below is purely for Strange Ball Only.
                        if (avoidSpecial == null && (tempBall != null && tempBall.includes("LA") && (gameChecker != "legends_arceus" || gameChecker == ("(All Games)")) && availableStrings[legalityIndex].includes("|legendsarceus|"))) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                            if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }
                        else if (avoidSpecial == null && (tempBall != null && !tempBall.includes("LA") && (gameChecker == "legends_arceus" || gameChecker == ("(All Games)")) && availableStrings[legalityIndex].includes("|legendsarceus|"))) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }
                    }
                }
                //This is checking if a Pokemon from its evolution line is from a game where breeding down balls is impossible.
                else if (availableStrings[tempIndex].includes("|" + gamesToCheck[j].replace(/_|'/g, '') + "|") && (gamesToCheck[j] == "ruby" || gamesToCheck[j] == "sapphire" || gamesToCheck[j] == "emerald" || gamesToCheck[j] == "fire_red" || gamesToCheck[j] == "leaf_green" || gamesToCheck[j] == "colosseum" || gamesToCheck[j] == "xd_gale_of_darkness" || gamesToCheck[j] == "diamond" || gamesToCheck[j] == "pearl" || gamesToCheck[j] == "platinum" || gamesToCheck[j] == "heart_gold" || gamesToCheck[j] == "soul_silver" || gamesToCheck[j] == "black" || gamesToCheck[j] == "white" || gamesToCheck[j] == "black_2" || gamesToCheck[j] == "white_2")) {
                    //If the Pokemon from the evolution line is lower than the selected Pokemon. If this is the case, then it means that the selected Pokemon can get those balls by being evolved from the lower stage. The or part is because there was an issue getting raid Balls for regional forms due to them being a higher index. breedIndex is so the balls are passed if it is in a game where can be passed down. This should cover regional forms as well, but I'll leave that part in for clarity.
                    if (getindexes.indexOf(tempIndex) < getindexes.indexOf(legalityIndex) || (ballLegality[legalityIndex].pokemon.includes(ballLegality[tempIndex].pokemon) || gamesToCheck.indexOf(breedIndex) > 22)) {
                        var raidBalls;
                        raidBalls = ballLegality[tempIndex][gamesToCheck[j] + "_raidOutbreak"].split(", ");
                        for (let k = 0; k < raidBalls.length; k++) {
                            tempBall = "";
                            if (raidBalls[k].includes("(LA)")) {
                                tempBall = raidBalls[k];
                                //tempBall = raidBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                            } else {
                                tempBall = raidBalls[k] + " Ball";
                            }

                            //If the Balls can't breed down, then only set Poke Ball.
                            if (avoidUnbreedable != null && tempBall != null/* && document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            } else {
                                //If special balls aren't allowed such as for breeding in any game, then set Poke Ball instead of that ball.
                                /*if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }*/

                                if (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball" || tempBall.includes("LA")) {
                                    if (avoidSpecial != null && method == "Via Breeding") {
                                        if (forProgress) {
                                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                    else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1 || formArray.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                        if (forProgress) {
                                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    } else {
                                        if (forProgress) {
                                            document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                }

                                else if (tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                    }
                    //If the evolution line is higher, then it can be breeded down to get Poke Ball.
                    else {
                        if (forProgress) {
                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                        } else {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }
                    }
                    //Since breeding down will always be a Poke Ball, if the option is allowed, it will pass it down, which is useful for Safari Ball only Pokemon
                    if (avoidUnbreedable != null) {
                        if (forProgress) {
                            document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                        } else {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }
                    }

                }
                else {
                    var raidBalls;
                    raidBalls = ballLegality[tempIndex][gamesToCheck[j] + "_raidOutbreak"].split(", ");
                    for (let k = 0; k < raidBalls.length; k++) {
                        tempBall = "";
                        if (raidBalls[k].includes("(LA)")) {
                            tempBall = raidBalls[k];
                            //tempBall = raidBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                        } else {
                            tempBall = raidBalls[k] + " Ball";
                        }
                        /*if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball") || tempBall != null && tempBall.includes("LA") && method == "Via Breeding") {
                            document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                        }*/

                        //Alright so since these balls are special, what happens is it checks if they can breed down and if not, then what it does is it checks how they can be passed on, taking into account branch evolutions. For example, Slowpoke, Slowbro and Slowking are the same line but Slowbro being in Cherish does not mean Slowking is. so the getBranches checks for this. It also makes sure that its an higher evo to have it.
                        if (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball" || tempBall.includes("LA")) {
                            if (avoidSpecial != null && method == "Via Breeding") {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                            else if (getBranches[getEvos.indexOf(ballLegality[legalityIndex].pokemon)] != getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] && getBranches[getEvos.indexOf(ballLegality[tempIndex].pokemon)] != "Initial" || getEvos.indexOf(ballLegality[legalityIndex].pokemon) < getEvos.indexOf(ballLegality[tempIndex].pokemon) || getEvos.indexOf(ballLegality[tempIndex].pokemon) == -1 || formArray.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            } else {
                                if (forProgress) {
                                    document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                            }
                        }

                        else if (tempBall != null/* && document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {

                            //If the Ball is from LA, then it needs to check that the Selected Pokemon can even be caught in LA, and that raidally LA or All Games is being viewed
                            if (tempBall != null && tempBall.includes("LA")) {
                                if ((gameChecker == "legends_arceus" || gameChecker == "(All Games)") && availableStrings[legalityIndex].includes("|legendsarceus|")) {
                                    //If the Pokemon from the evolution line is lower than the selected Pokemon. If this is the case, then it means that the selected Pokemon can get those balls by being evolved from the lower stage.
                                    if (getEvos.indexOf(ballLegality[tempIndex].pokemon) < getEvos.indexOf(ballLegality[legalityIndex].pokemon) && getEvos.indexOf(ballLegality[tempIndex].pokemon) != -1) {
                                        if (forProgress) {
                                            document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                        } else {
                                            document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                        }
                                    }
                                }

                            } else if (tempBall != null && !tempBall.includes("LA")) {
                                if (gameChecker != "legends_arceus" || gameChecker == ("(All Games)")) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                        //Setting Strange Balls for mons that aren't native to LA is weird, I need to check that the ball is an LA one and that the game being checked is not LA as LA balls don't show up as strange in LA. I then need to check that the Pokemon is even in Legends Arceus to being with. I exclude Raichu-Alola because Raichu-Alola is an extreme edge case as Pikachu cannot evolve into this outside of Gen7.
                        if (avoidSpecial == null && tempBall != null && tempBall.includes("LA") && (gameChecker != "legends_arceus" || gameChecker == "(All Games)") && availableStrings[tempIndex].includes("|legendsarceus|") && !ballLegality[tempIndex].pokemon.includes("Raichu-Alola")) {
                            if (getEvos.indexOf(ballLegality[tempIndex].pokemon) < getEvos.indexOf(ballLegality[legalityIndex].pokemon) && getEvos.indexOf(ballLegality[tempIndex].pokemon) != -1 && !ballLegality[legalityIndex].pokemon.includes("Raichu-Alola")) {
                                if (forProgress) {
                                    document.getElementById("VA-" + "Strange Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                } else {
                                    document.getElementById("TA-" + "Strange Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                }
                                if (!cannotBreedArray.includes(ballLegality[tempIndex].pokemon)) {
                                    if (forProgress) {
                                        document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                                    } else {
                                        document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                                    }
                                }
                            }
                        }

                    }
                }
            }
        }
    }

}

function SetLGPEBreedingTransferBalls(legalityIndex, catergory, avoidSpecial, game, method) {

    if (!availableStrings[legalityIndex].includes("|letsgopikachu|") && !availableStrings[legalityIndex].includes("|letsgoeevee|")) {
        return;
    }

    if (game != null && !availableStrings[legalityIndex].includes(game)) {
        return;
    }

    if (cannotBreedArray.indexOf(ballLegality[legalityIndex].pokemon) != -1 && method == "Via Breeding") {
        return;
    }

    //This below is JUST to check the following below since Raichu-Alola and Eggy just HAVE to be difficult
    if ((ballLegality[legalityIndex].pokemon == "Raichu-Alola" || ballLegality[legalityIndex].pokemon == "Exeggutor-Alola") && method == "Via Breeding" && gameChecker != "(All Games)") {
        return;
    }

    if (forProgress) {
        if (eligableMons.indexOf(ballLegality[legalityIndex].pokemon) == -1) {
            eligableMons.push(ballLegality[legalityIndex].pokemon);
        }
    }

    var getEvos = new Array();



    var getMeOut = false;
    for (let i = 0; i < evoDataArray.length; i++) {
        if (getMeOut) {
            break;
        }
        var arrayTempEvo = evoDataArray[i].evo_lines.split("|");
        for (let j = 0; j < arrayTempEvo.length; j++) {
            if (ballLegality[legalityIndex].pokemon == arrayTempEvo[j]) {
                getEvos = evoDataArray[i].evo_lines.split("|");
                getMeOut = true;
                break;
            }
        }
    }

    //console.log(getEvos);

    var getindexes = new Array();
    for (let i = 0; i < ballLegality.length; i++) {
        for (let j = 0; j < getEvos.length; j++) {
            if (getEvos[j] == ballLegality[i].pokemon) {
                if (!ballLegality[i].pokemon.includes("-Alola") && !ballLegality[legalityIndex].pokemon.includes("-Alola")) {
                    tempPush = i;
                    getindexes.push(tempPush);
                }
                else if (ballLegality[i].pokemon.includes("-Alola") && ballLegality[legalityIndex].pokemon.includes("-Alola")) {
                    tempPush = i;
                    getindexes.push(tempPush);
                }
            }
        }
    }

    //console.log(getindexes);


    for (let z = 0; z < getindexes.length; z++) {
        tempIndex = getindexes[z];

        for (let i = 0; i < gamesToCheck.length; i++) {
            if (gamesToCheck[i] == "lets_go_pikachu" || gamesToCheck[i] == "lets_go_eevee") {
                if (ballLegality[tempIndex][gamesToCheck[i] + catergory] == "Available") {
                    for (let j = 0; j < ballsInGames.length; j++) {
                        if ((avoidSpecial != null) && (ballsInGames[j][gamesToCheck[i]] == "Cherish Ball" || ballsInGames[j][gamesToCheck[i]] == "Master Ball")) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }
                        else if (ballsInGames[j][gamesToCheck[i]] != null/* && document.getElementById("TA-" + ballsInGames[j][gamesToCheck[i]].replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                            if (forProgress) {
                                document.getElementById("VA-" + ballsInGames[j][gamesToCheck[i]].replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + ballsInGames[j][gamesToCheck[i]].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }
                    }
                }

                if (ballLegality[tempIndex][gamesToCheck[i] + "_specific"] != null) {
                    var specificBalls;
                    specificBalls = ballLegality[tempIndex][gamesToCheck[i] + "_specific"].split(", ");
                    for (let j = 0; j < specificBalls.length; j++) {
                        tempBall = "";
                        if (specificBalls[j].includes("(LA)")) {
                            tempBall = specificBalls[j];
                            //tempBall = specificBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                        } else {
                            tempBall = specificBalls[j] + " Ball";
                        }
                        if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || ballsInGames[j][gamesToCheck[i]] == "Master Ball")) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        } else {
                            if (forProgress) {
                                document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }
                    }
                }

                if (ballLegality[tempIndex][gamesToCheck[i] + "_event"] != null) {
                    var specificBalls;
                    specificBalls = ballLegality[tempIndex][gamesToCheck[i] + "_event"].split(", ");
                    for (let j = 0; j < specificBalls.length; j++) {
                        tempBall = "";
                        if (specificBalls[j].includes("(LA)")) {
                            tempBall = specificBalls[j];
                            //tempBall = specificBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                        } else {
                            tempBall = specificBalls[j] + " Ball";
                        }
                        if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || ballsInGames[j][gamesToCheck[i]] == "Master Ball")) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        } else {
                            if (forProgress) {
                                document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }
                    }
                }

                if (ballLegality[tempIndex][gamesToCheck[i] + "_other"] != null) {
                    var specificBalls;
                    specificBalls = ballLegality[tempIndex][gamesToCheck[i] + "_other"].split(", ");
                    for (let j = 0; j < specificBalls.length; j++) {
                        tempBall = "";
                        if (specificBalls[j].includes("(LA)")) {
                            tempBall = specificBalls[j];
                            //tempBall = specificBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                        } else {
                            tempBall = specificBalls[j] + " Ball";
                        }
                        if ((avoidSpecial != null) && (tempBall == "Cherish Ball" || ballsInGames[j][gamesToCheck[i]] == "Master Ball")) {
                            if (forProgress) {
                                document.getElementById("VA-" + "Poke Ball".replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        } else {
                            if (forProgress) {
                                document.getElementById("VA-" + tempBall.replace(/\s/g, '') + " ").style.filter = "unset"
                            } else {
                                document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                            }
                        }
                    }
                }
            }
        }
    }
}

function SetRBYTransferBalls(legalityIndex, gameChecker, catergory, ballBreaker, avoidUnbreedable, gameBreaker) {
    for (let i = 0; i < gamesToCheck.length; i++) {
        if (gamesToCheck[i] == gameBreaker) {
            break;
        }
        //console.log(ballLegality[specialIndex].pokemon);
        if (ballLegality[legalityIndex][gamesToCheck[i] + catergory] == "Available") {
            for (let j = 0; j < ballsInGames.length; j++) {
                for (let k = 0; k < gamesToLoop.length; k++) {
                    if (gamesToLoop[k] == ballBreaker) {
                        //console.log(gamesToLoop[k]);
                        break;
                    }

                    if ((avoidUnbreedable != null) && (ballsInGames[j][gamesToLoop[k]] == "Cherish Ball" || ballsInGames[j][gamesToLoop[k]] == "Master Ball" || ballsInGames[j][gamesToLoop[k]] == "Strange Ball")) {

                    }

                    else if (avoidUnbreedable == null && ballsInGames[j][gamesToLoop[k]] != null/* && document.getElementById("TA-" + ballsInGames[j][gamesToLoop[k]].replace(/\s/g, '') + " " + legalityIndex).style.display == "initial"*/) {
                        document.getElementById("TA-" + ballsInGames[j][gamesToLoop[k]].replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                    }
                }
            }
        }

        if (ballLegality[legalityIndex][gamesToCheck[i] + "_specific"] != null) {
            var specificBalls;
            specificBalls = ballLegality[legalityIndex][gamesToCheck[i] + "_specific"].split(", ");
            for (let j = 0; j < specificBalls.length; j++) {
                tempBall = "";
                if (specificBalls[j].includes("(LA)")) {
                    tempBall = specificBalls[j];
                    //tempBall = specificBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                } else {
                    tempBall = specificBalls[j] + " Ball";
                }
                if ((avoidUnbreedable != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball")) {
                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                } else {
                    document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                }
            }
        }
        if (ballLegality[legalityIndex][gamesToCheck[i] + "_event"] != null) {
            var specificBalls;
            specificBalls = ballLegality[legalityIndex][gamesToCheck[i] + "_event"].split(", ");
            for (let j = 0; j < specificBalls.length; j++) {
                tempBall = "";
                if (specificBalls[j].includes("(LA)")) {
                    tempBall = specificBalls[j];
                    //tempBall = specificBalls[j].substring(0, progressBalls[index].length - 5) + "Ball(LA)";
                } else {
                    tempBall = specificBalls[j] + " Ball";
                }
                if ((avoidUnbreedable != null) && (tempBall == "Cherish Ball" || tempBall == "Master Ball" || tempBall == "Strange Ball")) {
                    document.getElementById("TA-" + "Poke Ball".replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                } else {
                    document.getElementById("TA-" + tempBall.replace(/\s/g, '') + " " + legalityIndex).style.filter = "unset";
                }
            }
        }
    }
}





