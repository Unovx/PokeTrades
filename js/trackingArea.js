var collectionData;
var collectionLength;
var evoChain = true;

var availabilityRBY;
var availabilityGSC;
var availabilityRSE;
var availabilityFRLG;
var availabilityXDColo;
var availabilityDPPT;
var availabilityHGSS;
var availabilityBwBw2;
var availabilityXY;
var availabilityORAS;
var availabilitySMUSUM;
var availabilityLGPLGE;
var availabilitySWSH;
var legalityCurrent;

var tempSWSH;
var tempLA;
var tempSV;

var lastArray = new Array(1142);


let trackerBalls = new Array();


function CurrentLegality(data) {
    legalityCurrent = jQuery.parseJSON(data);
    //console.log(legalityCurrent);
}

function AvailabilityRBY(data) {
    availabilityRBY = jQuery.parseJSON(data);
}

function AvailabilityGSC(data) {
    availabilityGSC = jQuery.parseJSON(data);
}

function AvailabilityRSE(data) {
    availabilityRSE = jQuery.parseJSON(data);
}


function GetLegalityLists() {
    $.post(url + "/PHP/get_legality_lists.php", { file: "currentLegality" }, CurrentLegality);
    $.post(url + "/PHP/get_legality_lists.php", { file: "availabilityRBY" }, AvailabilityRBY);
    $.post(url + "/PHP/get_legality_lists.php", { file: "availabilityGSC" }, AvailabilityGSC);
    $.post(url + "/PHP/get_legality_lists.php", { file: "availabilityRSE" }, AvailabilityRSE);
}

GetLegalityLists();

$('.TA-MainMenu').click(function () {
    document.querySelector("#TrackingArea").style.display = "none";
    document.querySelector("#MainArea").style.display = "block";
    //document.querySelector("#PanelArea").style.display = "block";
    RemoveHash();
});

$('.TA-LegalityChecker').click(function () {
    //$.post(url + "/PHP/progress_data.php", ProgressInfo);
    ShowLoading();
    $.post(url + "/PHP/progress_data.php", ProgressData);
    //CheckAvailability();
    HideLoading();

});

$('.TA-EvoToggle').click(function () {
    if (evoChain) {
        evoChain = false;
        document.querySelector(".TA-EvoToggle").innerHTML = "Turn Evo Chain On";
    } else {
        evoChain = true;
        document.querySelector(".TA-EvoToggle").innerHTML = "Turn Evo Chain Off";
    }

});

$('.TA-UserCollection').click(function () {
    //$.post(url + "/PHP/legality_list.php", GreyScaleData);
    $.post(url + "/PHP/generate_selection.php", { token: token, searchID: userData.user_id, tradeOption: "For Trade", }, UserCollection);
    ShowLoading();
});

$('.TA-InfoButton').click(function () {
    //document.querySelector("#NotificationArea").style.display = "block";
    //document.querySelector(".TrackingInformation").style.display = "block";
    ShowLoading();
    //ReorderList();
    HideLoading();
    //SetGamesAvailable();
});

function Tempora(data) {
    console.log(data);
}

function SetGamesAvailable() {
    for (var i = 0; i < progressArray.length; i++) {
        var availableString = "";
        var dexNum = progressArray[i].pokedex.slice(1);
        if (dexNum < 152 && !progressArray[i].pokemon.includes("Pikachu-") && !progressArray[i].pokemon.includes("-Alola") && !progressArray[i].pokemon.includes("-Galar") && !progressArray[i].pokemon.includes("-Hisui")) {
            availableString += "Red|Green|Blue|Yellow";
        }

        if (dexNum < 252 && !progressArray[i].pokemon.includes("Pikachu-") && !progressArray[i].pokemon.includes("-Question") && !progressArray[i].pokemon.includes("-Exclaimation") && !progressArray[i].pokemon.includes("-Alola") && !progressArray[i].pokemon.includes("-Galar") && !progressArray[i].pokemon.includes("-Hisui")) {
            if (availableString != "") {
                availableString += "|";
            }
            availableString += "Gold|Silver|Crystal";
        }

        if (dexNum < 387 && !progressArray[i].pokemon.includes("Pikachu-") && !progressArray[i].pokemon.includes("-Question") && !progressArray[i].pokemon.includes("-Exclaimation") && !progressArray[i].pokemon.includes("-Alola") && !progressArray[i].pokemon.includes("-Galar") && !progressArray[i].pokemon.includes("-Hisui")) {
            if (availableString != "") {
                availableString += "|";
            }
            availableString += "Ruby|Sapphire|Emerald|Fire Red|Leaf Green|Colosseum|XD Gale of Darkness";
        }

        if (dexNum < 494 && !progressArray[i].pokemon.includes("Pikachu-") && !progressArray[i].pokemon.includes("-Alola") && !progressArray[i].pokemon.includes("-Galar") && !progressArray[i].pokemon.includes("-Hisui")) {
            if (availableString != "") {
                availableString += "|";
            }
            availableString += "Pearl|Diamond|Platinum|Heart Gold|Soul Silver";
        }

        if (dexNum < 650 && !progressArray[i].pokemon.includes("Pikachu-") && !progressArray[i].pokemon.includes("-Alola") && !progressArray[i].pokemon.includes("-Galar") && !progressArray[i].pokemon.includes("-Hisui")) {
            if (availableString != "") {
                availableString += "|";
            }
            availableString += "Black|White|Black 2|White 2";
        }

        if (dexNum < 722 && !progressArray[i].pokemon.includes("Pikachu-") && !progressArray[i].pokemon.includes("Zygarde-10") && !progressArray[i].pokemon.includes("-Alola") && !progressArray[i].pokemon.includes("-Galar") && !progressArray[i].pokemon.includes("-Hisui")) {
            if (availableString != "") {
                availableString += "|";
            }
            availableString += "X|Y|Omega Ruby|Alpha Sapphire";
        }

        if (dexNum < 808 && !progressArray[i].pokemon.includes("-Galar") && !progressArray[i].pokemon.includes("-Hisui")) {
            if (availableString != "") {
                availableString += "|";
            }
            availableString += "Sun|Moon|Ultra Sun|Ultra Moon";
        }

        if (dexNum < 152 && !progressArray[i].pokemon.includes("Pikachu-") && !progressArray[i].pokemon.includes("-Galar") && !progressArray[i].pokemon.includes("-Hisui")) {
            if (availableString != "") {
                availableString += "|";
            }
            availableString += "Let's Go Pikachu|Let's Go Eevee";
        }

        if (dexNum < 899 && !progressArray[i].pokemon.includes("-Hisui")) {
            var isAvailable = true;
            for (var j = 0; j < tempSWSH.length; j++) {
                if (progressArray[i].pokedex == tempSWSH[j]) {
                    isAvailable = false;
                }
            }
            if (isAvailable) {
                if (availableString != "") {
                    availableString += "|";
                }
                availableString += "Sword|Shield";
            }
        }

        if (dexNum < 494 && !progressArray[i].pokemon.includes("Pikachu-") && !progressArray[i].pokemon.includes("-Alola") && !progressArray[i].pokemon.includes("-Galar") && !progressArray[i].pokemon.includes("-Hisui")) {
            if (availableString != "") {
                availableString += "|";
            }
            availableString += "Brilliant Diamond|Shining Pearl";
        }

        if (!progressArray[i].pokemon.includes("Pikachu-")) {
            var isInLA = true;
            for (var j = 0; j < tempLA.length; j++) {
                if (progressArray[i].pokemon.includes("-Hisui")) {

                }
                else if (progressArray[i].pokedex == tempLA[j]) {
                    isInLA = false;
                }
            }
            if (isInLA) {
                if (availableString != "") {
                    availableString += "|";
                }
                availableString += "Legends Arceus";
            }
        }

        if (!progressArray[i].pokemon.includes("Pikachu-")) {
            var isInSV = true;
            for (var j = 0; j < tempSV.length; j++) {
                if (progressArray[i].pokedex == tempSV[j]) {
                    isInSV = false;
                }
            }
            if (isInSV) {
                if (availableString != "") {
                    availableString += "|";
                }
                availableString += "Scarlet|Violet";
            }
        }

        console.log(availableString);
    }
}

function CheckAvailability() {
    for (let i = 0; i < progressArray.length; i++) {
        lastArray[i] = progressArray[i].pokemon;

        for (let j = 1; j < progressGames.length; j++) {
            //Setting the Image
            theImage = document.createElement("IMG");
            theImage.setAttribute("id", "GeneratedSelection " + i + " " + progressGames[j]);
            theImage.setAttribute("width", "100");
            theImage.setAttribute("height", "100");
            theImage.style.marginTop = "20px";
            document.getElementById("TrackingArea").appendChild(theImage);
            let teempo = null;
            //console.log(progressGames[j]);
            if (progressGames[j] == "Red" || progressGames[j] == "Green" || progressGames[j] == "Blue" || progressGames[j] == "Yellow") {
                teempo = "R/G/B/Y";
            }

            else if (progressGames[j] == "Gold" || progressGames[j] == "Silver" || progressGames[j] == "Crystal") {
                teempo = "G/S/C";
            }

            else if (progressGames[j] == "Ruby" || progressGames[j] == "Sapphire" || progressGames[j] == "Emerald" || progressGames[j] == "Fire Red" || progressGames[j] == "Leaf Green" || progressGames[j] == "Colosseum" || progressGames[j] == "XD Gale of Darkness") {
                teempo = "R/S/E";
            }

            else if (progressGames[j] == "Diamond" || progressGames[j] == "Pearl" || progressGames[j] == "Platinum" || progressGames[j] == "Heart Gold" || progressGames[j] == "Soul Silver") {
                teempo = "HG/SS";
            }

            else if (progressGames[j] == "Black" || progressGames[j] == "White" || progressGames[j] == "Black 2" || progressGames[j] == "White 2") {
                teempo = "BW/BW2";
            }

            else if (progressGames[j] == "X" || progressGames[j] == "Y" || progressGames[j] == "Omega Ruby" || progressGames[j] == "Alpha Sapphire" || progressGames[j] == "Sun" || progressGames[j] == "Moon" || progressGames[j] == "Ultra Sun" || progressGames[j] == "Ultra Moon") {
                teempo = "X/Y";
            }

            else if (progressGames[j] == "Let's Go Pikachu" || progressGames[j] == "Let's Go Eevee") {
                teempo = "LGP/LGE";
            }

            else if (progressGames[j] == "Sword" || progressGames[j] == "Shield") {
                teempo = "SW/SH";
            }

            else if (progressGames[j] == "Brilliant Diamond" || progressGames[j] == "Shining Pearl") {
                teempo = "BD/SP";
            }

            else if (progressGames[j] == "Legends Arceus") {
                teempo = "LA";
            }
            //console.log(teempo);
            if (teempo === undefined) {
                console.log("Returning");
                return;
            }


            SetImage(document.getElementById("GeneratedSelection " + i + " " + progressGames[j]), progressArray[i].pokemon, "(Any Gender)", "Normal", teempo);

            theImage.onerror = function () {
                lastArray[i] += ("," + progressGames[j]);
                //console.log(lastArray[i]);
            }
        }
        //$(theImage).remove();
    }
}

function ReorderList() {
    for (let i = 0; i < lastArray.length; i++) {
        var availArray = lastArray[i].split(",");
        //console.log(availArray);
        finalString = availArray[0];
        for (let j = 1; j < progressGames.length; j++) {
            let noAvail = false;
            for (let k = 0; k < availArray.length; k++) {
                if (progressGames[j] == availArray[k]) {
                    noAvail = true;
                    //break;
                    //console.log(progressGames[j])
                }
            }

            if (!noAvail) {
                finalString += ("," + progressGames[j]);
            }
        }
        lastArray[i] = finalString;
        console.log(finalString);
    }
    console.log(lastArray);
}

function ProgressData() {
    //arrayData = jQuery.parseJSON(data);

    //trackerTest = document.getElementById("TrackingContainer");

    $("#TrackingContainer").remove();
    trackerTest = document.createElement("div");
    trackerTest.setAttribute("id", "TrackingContainer");
    document.getElementById("TrackingData").appendChild(trackerTest);

    //var numberOfArrays = arrayData.length;
    for (let i = 0; i < progressArray.length; i++) {
        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "GenerationGridDiv" + (i));
        newDiv.setAttribute("class", "Lozad");
        newDiv.classList.add("TA-PokemonDiv");
        //newDiv.className += "Lozad";
        document.getElementById("TrackingContainer").appendChild(newDiv);
        newDiv.setAttribute("width", "100");

        //Storing each pokemon in a array.
        loopArray = [];
        loopArray = progressArray[i];

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

        theUpdate = document.createElement("BUTTON");
        theUpdate.setAttribute("class", "TA-ButtonDesign");
        theUpdate.innerHTML = "Save";
        newDiv.appendChild(theUpdate);

        theUpdate.onclick = function () {
            $.post(url + "/PHP/update_legality.php", { pokemon: progressArray[i].pokemon, arrayRow: progressArray[i] }, Tempora);
        };


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

            console.log(forImage);
            SetImage(document.getElementById("GeneratedSelection " + (i)), progressArray[i].pokemon, "(Any Gender)", "Normal", forImage);
            ChangeTrackingDisplay(i, document.querySelector("#TA-GameDropdown" + i).value, document.querySelector("#TA-ObtainableDropdown" + i).value);
        };

        document.querySelector("#TA-ObtainableDropdown" + i).onchange = function () {
            ChangeTrackingDisplay(i, document.querySelector("#TA-GameDropdown" + i).value, document.querySelector("#TA-ObtainableDropdown" + i).value);
        };

        newTable = document.createElement("div");
        newTable.style.position = "absolute";
        newTable.style.zIndex = "1";

        newTable.style.top = "unset";
        newTable.style.gridTemplateColumns = "repeat( auto-fill, minmax(200px, 1fr) )"
        trackerTest.style.gridTemplateColumns = "repeat( auto-fill, minmax(200px, 1fr) )"
        newDiv.style.width = "100%";
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

            ball.onclick = function () {
                ChangeBallFilter(i, ballName, progressBalls[j], document.querySelector("#TA-GameDropdown" + i).value, document.querySelector("#TA-ObtainableDropdown" + i).value);
                //$.post(url + "/PHP/update_legality.php", { pokemon: progressArray[i].pokemon, arrayRow: progressArray[i] }, Tempora);

                if (evoChain == true) {
                    for (let k = 0; k < evoDataArray.length; k++) {
                        var arrayTempEvo = evoDataArray[k].evo_lines.split("|");
                        for (let l = 0; l < arrayTempEvo.length; l++) {
                            if (progressArray[i].pokemon == arrayTempEvo[l]) {
                                var stage = l;
                                for (var m = 0; m < arrayTempEvo.length; m++) {
                                    for (var n = 0; n < progressArray.length; n++) {
                                        if (progressArray[n].pokemon == arrayTempEvo[m] && m > stage) {
                                            //alert(progressArray[n].pokemon);
                                            var arrayTempGames = progressArray[n].games_available.split("|");
                                            var isInGame = false;
                                            for (var o = 0; o < arrayTempGames.length; o++) {
                                                if (document.querySelector("#TA-GameDropdown" + i).value == arrayTempGames[o]) {
                                                    isInGame = true;
                                                }
                                            }
                                            if (isInGame) {
                                                var evoBall = "TA-" + progressBalls[j].replace(/\s/g, '') + " " + n;
                                                ChangeBallFilter(n, evoBall, progressBalls[j], document.querySelector("#TA-GameDropdown" + i).value, document.querySelector("#TA-ObtainableDropdown" + i).value);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            /*if (loopArray.red_poke_ball == "N") {
                ball.style.display = "none";
                console.log("BRO");
            } else {
                console.log("red_" + allBallsArray[26].toLowerCase());
                console.log(loopArray.red_poke_ball);
            }*/
            trackerBalls.push(ballName);
        }

        newDiv.appendChild(newTable);

        /*if (genderDifferencesArray.includes(loopArray.pokemon)) {
            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Male.png");
        } else {
            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + ".png");
        }*/
        SetImage(theImage, progressArray[i].pokemon, "(Any Gender)", "Normal", "(Any Game)");
    }
    HideLoading();
    CurrentList();
    //CheckAvailability();
}

function CurrentList() {
    for (let i = 0; i < progressArray.length; i++) {
        for (let j = 0; j < progressBalls.length; j++) {
            for (let k = 0; k < progressGames.length; k++) {
                let tempBall = "";
                if (progressBalls[j].includes("(LA)")) {
                    tempBall = progressBalls[j].substring(0, progressBalls[j].length - 9);
                } else {
                    tempBall = progressBalls[j].substring(0, progressBalls[j].length - 5);
                }
                let tempCombo = progressGames[k].toLowerCase() + " " + tempBall.toLowerCase();
                if (progressArray[i][tempCombo] != null) {
                    document.getElementById("TA-" + progressBalls[j].replace(/\s/g, '') + " " + i).style.filter = "unset";
                }
            }
        }
    }
}

function ChangeTrackingDisplay(index, game, method) {
    for (let i = 0; i < progressBalls.length; i++) {
        let tempBall = "";
        if (progressBalls[i].includes("(LA)")) {
            tempBall = progressBalls[i].substring(0, progressBalls[i].length - 9) + "(LA)";
        } else {
            tempBall = progressBalls[i].substring(0, progressBalls[i].length - 5);
        }
        let tempCombo = game.toLowerCase() + " " + tempBall.toLowerCase();
        //console.log(tempCombo = game.toLowerCase() + " " + tempBall.toLowerCase());

        if (game != "(All Games)") {
            for (let j = 0; j < progressGames.length; j++) {
                if (progressArray[index][tempCombo] === undefined) {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.display = "none";
                    break;
                } else {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.display = "initial";
                }
            }
        } else {
            document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.display = "initial";
        }

        if (method == "(All Options)" && game == "(All Games)") {
            for (let j = 0; j < progressGames.length; j++) {
                if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()] != null) {
                    //alert(progressGames[j].toLowerCase() + " " + tempBall.toLowerCase());
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                    break;
                } else {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                }
            }
        }

        else if (method == "(All Options)") {
            if (progressArray[index][tempCombo] != null) {
                document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
            } else {
                document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
            }
        }

        else if (method == "In-Game") {
            if (game == "(All Games)") {
                for (let j = 0; j < progressGames.length; j++) {
                    if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()] != null) {
                        if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()].includes("A")) {
                            document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                            break;
                        }
                    } else {
                        document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                    }
                }
            }
            else if (progressArray[index][tempCombo] != null) {
                if (progressArray[index][tempCombo].includes("A")) {
                    console.log(progressArray[index][tempCombo]);
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                } else {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                }
            } else {
                document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
            }
        }

        else if (method == "Ball Breed/Trade") {
            if (game == "(All Games)") {
                for (let j = 0; j < progressGames.length; j++) {
                    if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()] != null) {
                        if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()].includes("B")) {
                            console.log(progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()]);
                            document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                            break;
                        }
                    } else {
                        document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                    }
                }
            }
            else if (progressArray[index][tempCombo] != null) {
                if (progressArray[index][tempCombo].includes("B")) {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                } else {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                }
            } else {
                document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
            }
        }

        else if (method == "Event") {
            if (game == "(All Games)") {
                for (let j = 0; j < progressGames.length; j++) {
                    if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()] != null) {
                        if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()].includes("E")) {
                            console.log(progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()]);
                            document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                            break;
                        }
                    } else {
                        document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                    }
                }
            }
            else if (progressArray[index][tempCombo] != null) {
                if (progressArray[index][tempCombo].includes("E")) {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                } else {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                }
            } else {
                document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
            }
        }

        else if (method == "Other Software") {
            if (game == "(All Games)") {
                for (let j = 0; j < progressGames.length; j++) {
                    if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()] != null) {
                        if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()].includes("O")) {
                            console.log(progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()]);
                            document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                            break;
                        }
                    } else {
                        document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                    }
                }
            }
            if (progressArray[index][tempCombo] != null) {
                if (progressArray[index][tempCombo].includes("O")) {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                } else {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                }
            } else {
                document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
            }
        }

        else if (method == "Trade/Transfer") {
            if (game == "(All Games)") {
                for (let j = 0; j < progressGames.length; j++) {
                    if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()] != null) {
                        if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()].includes("T")) {
                            console.log(progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()]);
                            document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                            break;
                        }
                    } else {
                        document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                    }
                }
            } /*else {
                for (let j = 0; j < progressGames.length; j++) {
                    var gen = 0;
                    for (let k = 0; k < progressGens.length; k++) {
                        if (game == progressGames[k]) {
                            gen = progressGens[k];
                            break;
                        }
                    }
                    for (let j = 0; j < progressGames.length; j++) {
                        if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()] != null) {
                            if (game != progressGames[j] && gen >= progressGens[j] || game != progressGames[j] && gen == 1 && progressGens[j] == 2) {
                                //console.log(progressGens[j] + " " + gen);
                                if (progressArray[index][progressGames[j].toLowerCase() + " " + tempBall.toLowerCase()] != null) {
                                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                                    break;
                                } else {
                                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                                }
                            } else {
                                //console.log(progressGens[j] + " " + gen);
                            }
                        } else {
                            document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                        }
                    }
                }
            }*/
            if (progressArray[index][tempCombo] != null) {
                if (progressArray[index][tempCombo].includes("T")) {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "unset";
                } else {
                    document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
                }
            } else {
                document.getElementById("TA-" + progressBalls[i].replace(/\s/g, '') + " " + index).style.filter = "opacity(0.5)";
            }
        }
    }
}

function ChangeBallFilter(index, element, name, game, method) {
    if (game == "(All Games)" || method == "(All Options)") {
        return;
    }


    let tempBall = "";
    //console.log(document.getElementById(element));
    if (name.includes("(LA)")) {
        tempBall = name.substring(0, name.length - 9) + "(LA)";
    } else {
        tempBall = name.substring(0, name.length - 5);
    }
    let tempCombo = game.toLowerCase() + " " + tempBall.toLowerCase();

    if (progressArray[index][tempCombo] === undefined) {
        return;
    }



    let tempInGame;
    let tempBallBreedTrade;
    let tempEvent;
    let tempOtherSoftware;
    let tempTrading;

    if (progressArray[index][tempCombo] != null) {
        if (progressArray[index][tempCombo].indexOf("A") != -1) {
            tempInGame = "A";
        }

        if (progressArray[index][tempCombo].indexOf("B") != -1) {
            tempBallBreedTrade = "B";
        }

        if (progressArray[index][tempCombo].indexOf("E") != -1) {
            tempEvent = "E";
        }

        if (progressArray[index][tempCombo].indexOf("O") != -1) {
            tempOtherSoftware = "O";
        }

        if (progressArray[index][tempCombo].indexOf("T") != -1) {
            tempTrading = "T";
        }
    }


    if (method == "In-Game") {
        if (tempInGame != "A") {
            tempInGame = "A";
            document.getElementById(element).style.filter = "unset";
        } else {
            tempInGame = null;
            document.getElementById(element).style.filter = "opacity(0.5)";
        }

    }

    if (method == "Ball Breed/Trade") {
        if (tempBallBreedTrade != "B") {
            tempBallBreedTrade = "B";
            document.getElementById(element).style.filter = "unset";
        } else {
            tempBallBreedTrade = null;
            document.getElementById(element).style.filter = "opacity(0.5)";
        }

    }

    if (method == "Event") {
        if (tempEvent != "E") {
            tempEvent = "E";
            document.getElementById(element).style.filter = "unset";
        } else {
            tempEvent = null;
            document.getElementById(element).style.filter = "opacity(0.5)";
        }

    }

    if (method == "Other Software") {
        if (tempOtherSoftware != "O") {
            tempOtherSoftware = "O";
            document.getElementById(element).style.filter = "unset";
        } else {
            tempOtherSoftware = null;
            document.getElementById(element).style.filter = "opacity(0.5)";
        }

    }

    if (method == "Trade/Transfer") {
        if (tempTrading != "T") {
            tempTrading = "T";
            document.getElementById(element).style.filter = "unset";
        } else {
            tempTrading = null;
            document.getElementById(element).style.filter = "opacity(0.5)";
        }

    }
    /*tempArray.sort();
    for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i] != null) {
            tempString += tempArray[i];
        }
    }
    console.log(tempArray);*/
    progressArray[index][tempCombo] = '';
    if (tempInGame != null) {
        progressArray[index][tempCombo] += tempInGame;
    }
    if (tempBallBreedTrade != null) {
        progressArray[index][tempCombo] += tempBallBreedTrade;
    }
    if (tempEvent != null) {
        progressArray[index][tempCombo] += tempEvent;
    }
    if (tempOtherSoftware != null) {
        progressArray[index][tempCombo] += tempOtherSoftware;
    }
    if (tempTrading != null) {
        progressArray[index][tempCombo] += tempTrading;
    }
    if (progressArray[index][tempCombo] == '') {
        progressArray[index][tempCombo] = null;
    }
}

function GreyScaleData(data) {
    //arrayData = jQuery.parseJSON(data);


    $("#TrackingContainer").remove();
    trackerTest = document.createElement("div");
    trackerTest.setAttribute("id", "TrackingContainer");
    document.getElementById("TrackingData").appendChild(trackerTest);

    //numberOfArrays = arrayData["Rows"].length;
    for (let i = 0; i < legalityCurrent.length; i++) {
        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "TrackingGridDiv" + (i));
        newDiv.setAttribute("class", "Lozad");

        document.getElementById("TrackingContainer").appendChild(newDiv);
        newDiv.setAttribute("width", "100");
        newDiv.setAttribute("height", "100");

        document.getElementById("TrackingGridDiv" + (i)).style.display = "flex";
        document.getElementById("TrackingGridDiv" + (i)).style.position = "relative";

        document.getElementById("TrackingGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
        document.getElementById("TrackingGridDiv" + (i)).style.backgroundColor = "#084f65";
        document.getElementById("TrackingGridDiv" + (i)).style.borderTopLeftRadius = "15px";
        document.getElementById("TrackingGridDiv" + (i)).style.borderTopRightRadius = "15px";
        document.getElementById("TrackingGridDiv" + (i)).style.borderBottomLeftRadius = "15px";
        document.getElementById("TrackingGridDiv" + (i)).style.borderBottomRightRadius = "15px";

        //Storing each pokemon in a array.
        loopArray = [];
        loopArray = legalityCurrent[i];

        //Setting the Image
        theImage = document.createElement("IMG");
        theImage.setAttribute("id", "GeneratedSelection " + (i));
        theImage.setAttribute("width", "100");
        theImage.setAttribute("height", "100");
        newDiv.appendChild(theImage);

        newTable = document.createElement("div");
        newTable.style.position = "absolute";
        newTable.style.zIndex = "1";

        newTable.style.top = "unset";
        newTable.style.gridTemplateColumns = "repeat( auto-fill, minmax(200px, 1fr) )"
        trackerTest.style.gridTemplateColumns = "repeat( auto-fill, minmax(200px, 1fr) )"
        newDiv.style.width = "100%";
        newTable.style.left = "50%";
        newTable.style.top = "5px";

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.poke_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Poke Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Poke Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Poke Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.great_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Great Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Great Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Great Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Great Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.ultra_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Ultra Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Ultra Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Ultra Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Ultra Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.master_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Master Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Master Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Master Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Master Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.premier_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Premier Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Premier Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Premier Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Premier Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.repeat_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Repeat Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Repeat Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Repeat Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Repeat Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.timer_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Timer Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Timer Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Timer Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Timer Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.nest_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Nest Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Nest Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Nest Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Nest Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.dive_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Dive Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Dive Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Dive Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Dive Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.net_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Net Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Net Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Net Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Net Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.luxury_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Luxury Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Luxury Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Luxury Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Luxury Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.safari_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Safari Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Safari Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Safari Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Safari Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.heal_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Heal Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Heal Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Heal Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Heal Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.quick_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Quick Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Quick Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Quick Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Quick Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.dusk_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Dusk Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Dusk Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Dusk Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Dusk Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.cherish_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Cherish Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Cherish Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Cherish Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Cherish Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.fast_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Fast Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Fast Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Fast Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Fast Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.friend_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Friend Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Friend Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Friend Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Friend Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.heavy_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Heavy Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Heavy Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Heavy Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Heavy Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.level_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Level Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Level Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Level Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Level Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.love_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Love Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Love Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Love Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Love Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.lure_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Lure Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Lure Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Lure Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Lure Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.moon_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Moon Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Moon Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Moon Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Moon Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.sport_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Sport Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Sport Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Sport Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Sport Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.dream_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Dream Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Dream Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Dream Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Dream Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.beast_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Beast Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Beast Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Beast Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Beast Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);


        newDiv.appendChild(newTable);

        if (genderDifferencesArray.includes(loopArray.pokemon)) {
            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Male.png");
        } else {
            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + ".png");
        }
    }
    HideLoading();
}

function TrackingData() {
    //arrayData = jQuery.parseJSON(data);

    //trackerTest = document.getElementById("TrackingContainer");

    $("#TrackingContainer").remove();
    trackerTest = document.createElement("div");
    trackerTest.setAttribute("id", "TrackingContainer");
    document.getElementById("TrackingData").appendChild(trackerTest);

    //var numberOfArrays = arrayData.length;
    for (let i = 0; i < legalityCurrent.length; i++) {
        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "TrackingGridDiv" + (i));
        newDiv.setAttribute("class", "Lozad");
        //newDiv.className += "Lozad";
        document.getElementById("TrackingContainer").appendChild(newDiv);
        newDiv.setAttribute("width", "100");
        newDiv.setAttribute("height", "100");

        document.getElementById("TrackingGridDiv" + (i)).style.display = "flex";
        document.getElementById("TrackingGridDiv" + (i)).style.position = "relative";
        /*document.getElementById("TrackingGridDiv" + (i)).style.backgroundImage = "url('https://poketrades.org/Resources/Designs/Unselected Holder.png')";
        document.getElementById("TrackingGridDiv" + (i)).style.backgroundSize = "contain";*/
        document.getElementById("TrackingGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
        document.getElementById("TrackingGridDiv" + (i)).style.backgroundColor = "#084f65";
        document.getElementById("TrackingGridDiv" + (i)).style.borderTopLeftRadius = "15px";
        document.getElementById("TrackingGridDiv" + (i)).style.borderTopRightRadius = "15px";
        document.getElementById("TrackingGridDiv" + (i)).style.borderBottomLeftRadius = "15px";
        document.getElementById("TrackingGridDiv" + (i)).style.borderBottomRightRadius = "15px";

        //Storing each pokemon in a array.
        loopArray = [];
        loopArray = legalityCurrent[i];

        //Setting the Image
        theImage = document.createElement("IMG");
        theImage.setAttribute("id", "GeneratedSelection " + (i));
        theImage.setAttribute("width", "100");
        theImage.setAttribute("height", "100");
        newDiv.appendChild(theImage);

        newTable = document.createElement("div");
        newTable.style.position = "absolute";
        newTable.style.zIndex = "1";

        newTable.style.top = "unset";
        newTable.style.gridTemplateColumns = "repeat( auto-fill, minmax(200px, 1fr) )"
        trackerTest.style.gridTemplateColumns = "repeat( auto-fill, minmax(200px, 1fr) )"
        newDiv.style.width = "100%";
        newTable.style.left = "50%";
        newTable.style.top = "5px";
        //var tr = newTable.insertRow();
        //tr.style.marginBottom = "10px";
        //tr.style.display = "flex";

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.poke_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Poke Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.great_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Great Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Great Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.ultra_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Ultra Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Ultra Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.master_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Master Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Master Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.premier_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Premier Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Premier Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.repeat_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Repeat Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Repeat Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.timer_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Timer Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Timer Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.nest_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Nest Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Nest Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.dive_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Dive Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Dive Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.net_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Net Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Net Ball.png");
        }

        newTable.appendChild(ball);

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.luxury_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Luxury Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Luxury Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.safari_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Safari Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Safari Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.heal_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Heal Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Heal Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.quick_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Quick Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Quick Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.dusk_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Dusk Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Dusk Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.cherish_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Cherish Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Cherish Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.fast_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Fast Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Fast Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.friend_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Friend Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Friend Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.heavy_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Heavy Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Heavy Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.level_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Level Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Level Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.love_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Love Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Love Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.lure_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Lure Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Lure Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.moon_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Moon Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Moon Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.sport_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Sport Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Sport Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.dream_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Dream Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Dream Ball.png");
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.beast_ball == "Yes") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Beast Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Beast Ball.png");
        }

        newTable.appendChild(ball);

        newDiv.appendChild(newTable);

        if (genderDifferencesArray.includes(loopArray.pokemon)) {
            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Male.png");
        } else {
            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + ".png");
        }

        /*newDiv.onclick = function () {
  
            document.querySelector(".TA-RBY-Balls").innerHTML = "";
            document.querySelector(".TA-GSC-Balls").innerHTML = "";
            for (let j = 0; j < availabilityRBY.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRBY[j].pokemon) {
                    if (availabilityRBY[j].poke_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png");
                        document.querySelector(".TA-RBY-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityGSC.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityGSC[j].pokemon) {
                    if (availabilityGSC[j].poke_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png");
                        document.querySelector(".TA-GSC-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].poke_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].great_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Great Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].ultra_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Ultra Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].master_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Master Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].premier_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Premier Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].repeat_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Repeat Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].timer_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Timer Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].nest_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Nest Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].dive_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Dive Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].net_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Net Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].luxury_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Luxury Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
            for (let j = 0; j < availabilityRSE.length; j++) {
                if (legalityCurrent[i].pokemon == availabilityRSE[j].pokemon) {
                    if (availabilityRSE[j].safari_ball == "Yes") {
                        ball = document.createElement("IMG");
                        ball.setAttribute("width", "13px");
                        ball.setAttribute("height", "13px");
                        ball.style.padding = "0px 3px 0px 0px";
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Safari Ball.png");
                        document.querySelector(".TA-RSE-Balls").appendChild(ball);
                    }
                }
            }
        }*/
    }
    HideLoading();
}

function GreyScaleData(data) {
    //arrayData = jQuery.parseJSON(data);


    $("#TrackingContainer").remove();
    trackerTest = document.createElement("div");
    trackerTest.setAttribute("id", "TrackingContainer");
    document.getElementById("TrackingData").appendChild(trackerTest);

    //numberOfArrays = arrayData["Rows"].length;
    for (let i = 0; i < legalityCurrent.length; i++) {
        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "TrackingGridDiv" + (i));
        newDiv.setAttribute("class", "Lozad");

        document.getElementById("TrackingContainer").appendChild(newDiv);
        newDiv.setAttribute("width", "100");
        newDiv.setAttribute("height", "100");

        document.getElementById("TrackingGridDiv" + (i)).style.display = "flex";
        document.getElementById("TrackingGridDiv" + (i)).style.position = "relative";

        document.getElementById("TrackingGridDiv" + (i)).style.boxShadow = "inset 0px 0px 0px 3.5px #0096c3";
        document.getElementById("TrackingGridDiv" + (i)).style.backgroundColor = "#084f65";
        document.getElementById("TrackingGridDiv" + (i)).style.borderTopLeftRadius = "15px";
        document.getElementById("TrackingGridDiv" + (i)).style.borderTopRightRadius = "15px";
        document.getElementById("TrackingGridDiv" + (i)).style.borderBottomLeftRadius = "15px";
        document.getElementById("TrackingGridDiv" + (i)).style.borderBottomRightRadius = "15px";

        //Storing each pokemon in a array.
        loopArray = [];
        loopArray = legalityCurrent[i];

        //Setting the Image
        theImage = document.createElement("IMG");
        theImage.setAttribute("id", "GeneratedSelection " + (i));
        theImage.setAttribute("width", "100");
        theImage.setAttribute("height", "100");
        newDiv.appendChild(theImage);

        newTable = document.createElement("div");
        newTable.style.position = "absolute";
        newTable.style.zIndex = "1";

        newTable.style.top = "unset";
        newTable.style.gridTemplateColumns = "repeat( auto-fill, minmax(200px, 1fr) )"
        trackerTest.style.gridTemplateColumns = "repeat( auto-fill, minmax(200px, 1fr) )"
        newDiv.style.width = "100%";
        newTable.style.left = "50%";
        newTable.style.top = "5px";

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.poke_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Poke Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Poke Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Poke Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.great_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Great Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Great Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Great Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Great Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.ultra_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Ultra Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Ultra Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Ultra Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Ultra Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.master_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Master Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Master Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Master Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Master Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.premier_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Premier Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Premier Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Premier Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Premier Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.repeat_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Repeat Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Repeat Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Repeat Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Repeat Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.timer_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Timer Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Timer Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Timer Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Timer Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.nest_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Nest Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Nest Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Nest Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Nest Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.dive_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Dive Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Dive Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Dive Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Dive Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.net_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Net Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Net Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Net Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Net Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.luxury_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Luxury Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Luxury Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Luxury Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Luxury Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.safari_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Safari Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Safari Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Safari Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Safari Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.heal_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Heal Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Heal Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Heal Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Heal Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.quick_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Quick Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Quick Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Quick Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Quick Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.dusk_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Dusk Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Dusk Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Dusk Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Dusk Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.cherish_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Cherish Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Cherish Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Cherish Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Cherish Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.fast_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Fast Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Fast Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Fast Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Fast Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.friend_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Friend Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Friend Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Friend Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Friend Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.heavy_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Heavy Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Heavy Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Heavy Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Heavy Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.level_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Level Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Level Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Level Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Level Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.love_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Love Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Love Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Love Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Love Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.lure_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Lure Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Lure Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Lure Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Lure Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.moon_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Moon Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Moon Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Moon Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Moon Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.sport_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Sport Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Sport Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Sport Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Sport Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.dream_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Dream Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Dream Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Dream Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Dream Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);

        ball = document.createElement("IMG");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        if (loopArray.beast_ball == "Unavailable") {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Darkened Balls/Beast Ball.png");
        } else {
            ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Greyscale Balls/Beast Ball.png");
            for (let i = 0; i < collectionLength; i++) {
                collectionArray = collectionData["Rows"][i];
                if (loopArray.pokemon == collectionArray.pokemon) {
                    if (collectionArray.pokeball == "Beast Ball") {
                        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/Beast Ball.png");
                    }
                }
            }
        }

        newTable.appendChild(ball);


        newDiv.appendChild(newTable);

        if (genderDifferencesArray.includes(loopArray.pokemon)) {
            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + "-Male.png");
        } else {
            theImage.setAttribute("src", url + "/Resources/Home/" + loopArray.pokemon + ".png");
        }
    }
    HideLoading();
}


function UserCollection(data) {
    collectionData = jQuery.parseJSON(data);
    collectionLength = collectionData["Rows"].length;
    //$.post(url + "/PHP/legality_list.php", GreyScaleData);
    GreyScaleData();
}