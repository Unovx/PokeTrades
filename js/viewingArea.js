
//SetProgress();
let collectedString = "";
let forProgress = false;
var ballProgress = new Array();
var monsObtained = new Array();
let monsPossible = 0;
var eligableMons = new Array();
var eligableBalls = new Array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
let specificMissing = "";
let allowedMonsObtained = 0;
ballAmounts = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

progressBallAmounts = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

//viewingGameDropdown = document.querySelector(".VA-GameDropdown");
viewingMethodDropdown = document.querySelector(".VA-MethodDropdown");

let vaGameArray = new Array();

$('.VA-Info').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".TrackerInformation").style.display = "block";
});

$(".VA-Close").click(function () {
    document.querySelector("#ViewingArea").style.display = "none";
    document.querySelector("#TA-TopRow").style.marginLeft = "unset";
    document.querySelector("#TrackingSelection").style.marginLeft = "unset";
    document.querySelector("#TA-TopRow").style.marginRight = "unset";
    document.querySelector("#TrackingSelection").style.marginRight = "unset";
    document.querySelector("#MainArea").style.position = "absolute";
});

$(".VA-MissingObtainedPokemon").click(function () {
    if (document.querySelector(".VA-MissingObtained").innerHTML == "Missing Pokemon (Click to Reverse)") {
        ShowObtained();
    } else {
        ShowMissing();
    }
});

$(".VA-SelectGame").click(function () {
    if (document.querySelector(".VA-GameOptions").style.display == "grid") {
        document.querySelector(".VA-GameOptions").style.display = "none";
    } else {
        document.querySelector(".VA-GameOptions").style.display = "grid";
    }
});

$('.VA-MainBall').click(function () {
    if (document.querySelector("#VA-BallHolder").style.display == "none") {
        document.querySelector("#VA-BallHolder").style.display = "block";
    } else {
        document.querySelector("#VA-BallHolder").style.display = "none";
    }
});

function VAGameOptions() {
    for (let i = 2; i < gameObtainedArray.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "VA-" + gameObtainedArray[i]);
        newDiv.classList.add("VA-IconContainer")

        newButton = document.createElement("button");
        newButton.classList.add("VA-IconButton");
        newButton.innerHTML = gameObtainedArray[i];

        newDiv.appendChild(newButton);
        document.querySelector(".VA-GameOptions").appendChild(newDiv);

        newDiv.onclick = function () {
            if (vaGameArray[i] != gameObtainedArray[i]) {
                vaGameArray[i] = gameObtainedArray[i];
                newDiv.style.background = "linear-gradient(#076915, #008179)";

            } else {
                delete (vaGameArray[i]);
                newDiv.style.background = "linear-gradient(#61100a, #cd4f4f)";
            }
        }
    }
}

function SetViewingImage(image, pokemon) {
    let gamesFound = 0;
    let theGame = "";
    for (let i = 0; i < vaGameArray.length; i++) {
        if (vaGameArray[i] != undefined) {
            gamesFound++;
            if (gamesFound == 1) {
                theGame = vaGameArray[i];
            }
        }
    }

    if (gamesFound == 1) {
        SetImage(newImage, pokemon, "(Any Gender)", "Normal", theGame);
    } else {
        SetImage(newImage, pokemon, "(Any Gender)", "Normal", "(Any Game)");
    }
}

$('.VA-CheckProgress').click(function () {
    GetBallProgress();
});

function GetBallProgress() {
    ShowLoading();
    collectedString = "";
    forProgress = true;
    ballProgress = new Array();
    monsObtained = new Array();
    monsPossible = 0;
    eligableMons = new Array();
    eligableBalls = new Array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
    specificMissing = "";
    allowedMonsObtained = 0;
    ballAmounts = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    progressBallAmounts = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    myProgress = new Array(37);
    if (vaGameArray == undefined) {
        console.log("Hope");
    }
    $.post(url + "/PHP/get_user_progress.php", { token: token, gameProgress: vaGameArray, ballProgress: "yes" }, BallProgress);
    $.post(url + "/PHP/get_user_progress.php", { token: token, gameProgress: vaGameArray, monProgress: "yes" }, MonProgress);
    $.post(url + "/PHP/get_balls_in_games.php", BallsInGames);
    $.post(url + "/PHP/get_all_balls_in_games.php", AllBallsInGames);
    $.post(url + "/PHP/get_ball_legality.php", BallLegality);
    $.post(url + "/PHP/progress_data.php", ProgressData);
    document.querySelector(".VA-TotalPokemonText").style.width = "unset";
}

function BallProgress(data) {
    ballProgressInfo = jQuery.parseJSON(data);
    if (ballProgressInfo["Rows"] != null) {
        ballProgress = ballProgressInfo["Rows"];
        ballProgressInfo["Rows"] = ballProgressInfo["Rows"].sort(SortByDex);
    }
    //console.log(ballProgress);
}

function MonProgress(data) {
    monProgressInfo = jQuery.parseJSON(data);
    if (monProgressInfo["Rows"] != null) {
        monProgressInfo["Rows"] = monProgressInfo["Rows"].sort(SortByDex);
        tempArray = monProgressInfo["Rows"];
        for (let i = 0; i < tempArray.length; i++) {
            monsObtained.push(tempArray[i].pokemon);
        }
    }
}


function CreateProgressBalls() {
    for (let i = 0; i < progressBalls.length; i++) {

        ball = document.createElement("IMG");
        ball.setAttribute("id", "VA-" + progressBalls[i].replace(/\s/g, '') + " ");
        ball.setAttribute("width", "13px");
        ball.setAttribute("height", "13px");
        ball.style.padding = "0px 3px 0px 0px";
        ball.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/" + progressBalls[i] + ".png");
        ball.style.filter = "opacity(0.5)";

        ball.style.display = "none";
        document.getElementById("VA-Storage").appendChild(ball);
    }
}

function SetProgress() {
    $(".VA-SpecificPokemon").remove();
    $("#VA-SpecificData").remove();
    $("#VA-ProgressData").remove();
    dataHolder = document.createElement("div");
    dataHolder.setAttribute("id", "VA-ProgressData");
    dataHolder.setAttribute("class", "VA-InfoGrid");
    document.getElementById("VA-BallHolder").appendChild(dataHolder);

    $("#VA-UnobtainedData").remove();
    dataHolder = document.createElement("div");
    dataHolder.setAttribute("id", "VA-UnobtainedData");
    dataHolder.setAttribute("class", "VA-InfoGrid");
    document.getElementById("VA-PokemonHolder").appendChild(dataHolder);

    for (let i = 0; i < progressBalls.length; i++) {
        newDiv = document.createElement("div");
        newDiv.setAttribute("class", "VA-InfoHolder");
        newDiv.setAttribute("id", "VA-BallHolder-" + i);

        ballImage = document.createElement("img");
        ballImage.setAttribute("width", "45px");
        ballImage.setAttribute("height", "45px");
        ballImage.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/" + progressBalls[i] + ".png");
        ballImage.style.padding = "15px";

        newDiv.appendChild(ballImage);
        ballText = document.createElement("text");
        ballText.setAttribute("id", "VA-Display-" + progressBalls[i].replace(/\s/g, ''));
        ballText.setAttribute("height", "13px");
        //ballText.innerHTML = ballAmounts[i];
        ballText.style.fontWeight = "bold";
        ballText.style.color = "white";
        ballText.style.fontFamily = "'Orbitron', sans-serif";
        ballText.style.fontSize = "12px";
        ballText.style.display = "block";

        newDiv.appendChild(ballText);
        document.getElementById("VA-ProgressData").appendChild(newDiv);

        newDiv.onclick = function () {
            $(".VA-SpecificPokemon").remove();
            specificHeading = document.createElement("div");
            specificHeading.setAttribute("class", "VA-SpecificPokemon VA-Headings");
            specificHeading.style.display = "flex";
            specificHeading.style.alignItems = "center";
            specificHeading.style.justifyContent = "center";

            document.getElementById("VA-SpecificHeadingsHolder").appendChild(specificHeading);

            ballImage = document.createElement("img");
            ballImage.setAttribute("width", "25px");
            ballImage.setAttribute("height", "25px");
            ballImage.style.marginRight = "45px";
            ballImage.style.paddingBottom = "2px";
            ballImage.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/" + progressBalls[i] + ".png");
            ballImage.style.pointer = "cursor";

            ballImage.onclick = function () {
                $(".VA-SpecificPokemon").remove();
                $("#VA-SpecificData").remove();
            }

            specificHeading.appendChild(ballImage);

            specificText = document.createElement("text");
            specificText.setAttribute("class", "VA-HeadingsText");
            specificText.setAttribute("style", "width:unset !important");
            specificHeading.appendChild(specificText);

            ballImage = document.createElement("img");
            ballImage.setAttribute("width", "25px");
            ballImage.setAttribute("height", "25px");
            ballImage.style.marginLeft = "45px";
            ballImage.style.paddingBottom = "2px";
            ballImage.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/" + progressBalls[i] + ".png");
            ballImage.style.pointer = "cursor";

            ballImage.onclick = function () {
                $(".VA-SpecificPokemon").remove();
                $("#VA-SpecificData").remove();
            }

            specificHeading.appendChild(ballImage);


            $("#VA-SpecificData").remove();
            specificHolder = document.createElement("div");
            specificHolder.setAttribute("id", "VA-SpecificData");
            specificHolder.setAttribute("class", "VA-InfoGrid");
            document.getElementById("VA-SpecificHolder").appendChild(specificHolder);

            if (specificMissing != progressBalls[i]) {
                specificMissing = progressBalls[i];
                specificText.innerHTML = "Obtained Pokemon for this Ball" + " (" + progressBallAmounts[i] + ")";
                //The reason for this nest is it needs to check that not only the mon can be in said bal, but that the obtained mon is in that ball at all, since eligableMons doesn't store the pokeball and is not meant to.
                for (let j = 0; j < eligableMons.length; j++) {
                    if (eligableBalls[i].includes("|" + eligableMons[j] + "|")) {
                        let missedOut = true;
                        for (let k = 0; k < ballProgress.length; k++) {
                            if (ballProgress[k].pokemon == eligableMons[j]) {
                                if (ballProgress[k].pokeball == progressBalls[i]) {
                                    missedOut = false;
                                }
                            }
                        }
                        if (!missedOut) {

                            specificDiv = document.createElement("div");
                            specificDiv.setAttribute("class", "VA-InfoHolder");

                            newImage = document.createElement("IMG");
                            newImage.setAttribute("class", "VA-StandardImage");

                            specificDiv.appendChild(newImage);

                            newText = document.createElement("text");
                            newText.setAttribute("class", "VA-InfoText");
                            newText.innerHTML = eligableMons[j];

                            specificDiv.appendChild(newText);

                            SetViewingImage(newImage, eligableMons[j]);

                            document.getElementById("VA-SpecificData").appendChild(specificDiv);
                        }
                    }
                }
            }
            else {
                specificMissing = "";
                specificText.innerHTML = "Missing Pokemon for this Ball" + " (" + (ballAmounts[i] - progressBallAmounts[i]) + ")";
                //The reason for this nest is it needs to check that not only the mon can be in said bal, but that the obtained mon is in that ball at all, since eligableMons doesn't store the pokeball and is not meant to.
                for (let j = 0; j < eligableMons.length; j++) {
                    if (eligableBalls[i].includes("|" + eligableMons[j] + "|")) {
                        let missedOut = true;
                        for (let k = 0; k < ballProgress.length; k++) {
                            if (ballProgress[k].pokemon == eligableMons[j]) {
                                if (ballProgress[k].pokeball == progressBalls[i]) {
                                    missedOut = false;
                                }
                            }
                        }
                        if (missedOut) {

                            specificDiv = document.createElement("div");
                            specificDiv.setAttribute("class", "VA-InfoHolder");

                            newImage = document.createElement("IMG");
                            newImage.setAttribute("class", "VA-StandardImage");

                            specificDiv.appendChild(newImage);

                            newText = document.createElement("text");
                            newText.setAttribute("class", "VA-InfoText");
                            newText.innerHTML = eligableMons[j];

                            specificDiv.appendChild(newText);

                            SetViewingImage(newImage, eligableMons[j]);

                            document.getElementById("VA-SpecificData").appendChild(specificDiv);
                        }
                    }
                }
            }
        }
    }

    //Getting how many eligable obtained mons are in each ball, but not (Any Ball) which is possible if private.
    for (let i = 0; i < ballProgress.length; i++) {
        if (eligableMons.indexOf(ballProgress[i].pokemon) != -1 && ballProgress[i].pokeball != "(Any Ball)") {
            var tempIndex = progressBalls.indexOf(ballProgress[i].pokeball);
            if (eligableBalls[tempIndex].includes("|" + ballProgress[i].pokemon + "|")) {
                progressBallAmounts[tempIndex] = progressBallAmounts[tempIndex] + 1;
            }
        }
    }
    console.log(ballProgress.length);

    for (let i = 0; i < progressBalls.length; i++) {
        document.getElementById("VA-Display-" + progressBalls[i].replace(/\s/g, '')).innerHTML = progressBallAmounts[i] + " / " + ballAmounts[i];
    }

    for (let i = 0; i < progressBalls.length; i++) {
        if (ballAmounts[i] == 0) {
            document.getElementById("VA-BallHolder-" + i).style.display = "none";
        } else {
            //console.log(ballAmounts[i]);
        }
    }


    ShowMissing();

    forProgress = false;
    /*if (document.getElementById("TrackingContainer") != null) {
        for (let i = 0; i < ballLegality.length; i++) {
            document.querySelector("#TA-ObtainableDropdown" + i).onchange();
        }
    }*/
}

function ShowMissing() {
    $("#VA-UnobtainedData").remove();
    dataHolder = document.createElement("div");
    dataHolder.setAttribute("id", "VA-UnobtainedData");
    dataHolder.setAttribute("class", "VA-InfoGrid");
    document.getElementById("VA-PokemonHolder").appendChild(dataHolder);
    document.querySelector(".VA-MissingObtained").innerHTML = "Missing Pokemon (Click to Reverse)";
    for (let i = 0; i < informationPokemonArray.length; i++) {
        if (monsObtained.indexOf(informationPokemonArray[i]) == -1 && eligableMons.indexOf(informationPokemonArray[i]) != -1) {
            //console.log(allPokemonArray[i]);

            newDiv = document.createElement("div");
            newDiv.setAttribute("class", "VA-InfoHolder");

            newImage = document.createElement("IMG");
            newImage.setAttribute("class", "VA-StandardImage");

            newDiv.appendChild(newImage);

            newText = document.createElement("text");
            newText.setAttribute("class", "VA-InfoText");
            newText.innerHTML = informationPokemonArray[i];

            newDiv.appendChild(newText);

            SetViewingImage(newImage, informationPokemonArray[i]);

            document.getElementById("VA-UnobtainedData").appendChild(newDiv);
        }
    }
}

function ShowObtained() {
    $("#VA-UnobtainedData").remove();
    dataHolder = document.createElement("div");
    dataHolder.setAttribute("id", "VA-UnobtainedData");
    dataHolder.setAttribute("class", "VA-InfoGrid");
    document.getElementById("VA-PokemonHolder").appendChild(dataHolder);
    document.querySelector(".VA-MissingObtained").innerHTML = "Obtained Pokemon (Click to Reverse)";
    for (let i = 0; i < monsObtained.length; i++) {

        if (eligableMons.indexOf(monsObtained[i]) != -1 && informationPokemonArray.indexOf(monsObtained[i]) != -1) {
            //console.log(allPokemonArray[i]);

            newDiv = document.createElement("div");
            newDiv.setAttribute("class", "VA-InfoHolder");

            newImage = document.createElement("IMG");
            newImage.setAttribute("class", "VA-StandardImage");

            newDiv.appendChild(newImage);

            newText = document.createElement("text");
            newText.setAttribute("class", "VA-InfoText");
            newText.innerHTML = monsObtained[i];

            newDiv.appendChild(newText);

            SetViewingImage(newImage, monsObtained[i]);

            document.getElementById("VA-UnobtainedData").appendChild(newDiv);
        }
    }
}

function SortByDex(a, b) {
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

function ProgressDisplayAvailability(index) {
    let gamesFound = 0;
    for (let i = 0; i < vaGameArray.length; i++) {
        if (vaGameArray[i] != undefined) {
            gamesFound++;
            if (gamesFound == 1) {
                theGame = vaGameArray[i];
            }
        }
    }

    if (gamesFound == 0) {
        if (viewingMethodDropdown.value == "(All Options)") {
            SetBreedingTransferBalls(index, "(All Games)", "_wild", null, null, null, "Via Breeding");
            SetLGPEBreedingTransferBalls(index, "_wild", "special", null, "Via Breeding");
        }
        else if (viewingMethodDropdown.value == ("In-Game")) {
            for (let j = 0; j < gamesToCheck.length; j++) {
                SetWildBalls(index, j, "_wild", gamesToCheck[j]);
                SetSpecificEventBalls(index, j, "_specific");
            }
        }
        else if (viewingMethodDropdown.value == "Via Breeding") {
            SetBreedingTransferBalls(index, "(All Games)", "_wild", "special", null, null, viewingMethodDropdown.value);
            SetLGPEBreedingTransferBalls(index, "_wild", "special", null, viewingMethodDropdown.value);
        }
        else if (viewingMethodDropdown.value == ("Event")) {
            for (let j = 0; j < gamesToCheck.length; j++) {
                SetSpecificEventBalls(index, j, "_event");
            }
        }
        else if (viewingMethodDropdown.value == ("Raid/Outbreak Event")) {
            for (let j = 0; j < gamesToCheck.length; j++) {
                SetSpecificEventBalls(index, j, "_raidOutbreak");
            }
        }
    }
    for (let z = 0; z < vaGameArray.length; z++) {
        if (vaGameArray[z] == "R/G/B/Y") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rgby != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_rgby.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "red" || gamesToCheck[j] == "green" || gamesToCheck[j] == "blue" || gamesToCheck[j] == "yellow") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "red" || gamesToCheck[j] == "green" || gamesToCheck[j] == "blue" || gamesToCheck[j] == "yellow") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "red" || gamesToCheck[j] == "green" || gamesToCheck[j] == "blue" || gamesToCheck[j] == "yellow") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("In-Game + Events")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "red" || gamesToCheck[j] == "green" || gamesToCheck[j] == "blue" || gamesToCheck[j] == "yellow") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Red") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rgby != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_rgby.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "red") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "red") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "red") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("In-Game + Events")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "red") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Green") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rgby != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_rgby.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "green") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "green") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "green") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("In-Game + Events")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "green") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Blue") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rgby != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_rgby.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "blue") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "blue") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "blue") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("In-Game + Events")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "blue") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Yellow") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rgby != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_rgby.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "yellow") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "yellow") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "yellow") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("In-Game + Events")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "yellow") {
                        SetWildBalls(index, j, "_wild", "balls_rgby");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
        }
        if (vaGameArray[z] == "G/S/C") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_gsc != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_gsc.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "gold" || gamesToCheck[j] == "silver" || gamesToCheck[j] == "crystal") {
                        SetWildBalls(index, j, "_wild", "balls_gsc");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
                SetBreedingTransferBalls(index, "Gold", "_wild", null, null, "ruby", "Via Breeding");
                SetBreedingTransferBalls(index, "Silver", "_wild", null, null, "ruby", "Via Breeding");
                SetBreedingTransferBalls(index, "Crystal", "_wild", null, null, "ruby", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "gold" || gamesToCheck[j] == "silver" || gamesToCheck[j] == "crystal") {
                        SetWildBalls(index, j, "_wild", "balls_gsc");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Gold", "_wild", null, null, "ruby", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Silver", "_wild", null, null, "ruby", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Crystal", "_wild", null, null, "ruby", viewingMethodDropdown.value);
            }
        }
        if (vaGameArray[z] == "Gold") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_gsc != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_gsc.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "gold") {
                        SetWildBalls(index, j, "_wild", "balls_gsc");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
                SetBreedingTransferBalls(index, "Gold", "_wild", null, null, "ruby", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "gold") {
                        SetWildBalls(index, j, "_wild", "balls_gsc");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Gold", "_wild", null, null, "ruby", viewingMethodDropdown.value);
            }
        }
        if (vaGameArray[z] == "Silver") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_gsc != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_gsc.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "silver") {
                        SetWildBalls(index, j, "_wild", "balls_gsc");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
                SetBreedingTransferBalls(index, "Silver", "_wild", null, null, "ruby", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "silver") {
                        SetWildBalls(index, j, "_wild", "balls_gsc");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Silver", "_wild", null, null, "ruby", viewingMethodDropdown.value);
            }
        }
        if (vaGameArray[z] == "Crystal") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_gsc != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_gsc.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "crystal") {
                        SetWildBalls(index, j, "_wild", "balls_gsc");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
                SetBreedingTransferBalls(index, "Crystal", "_wild", null, null, "ruby", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "crystal") {
                        SetWildBalls(index, j, "_wild", "balls_gsc");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Crystal", "_wild", null, null, "ruby", viewingMethodDropdown.value);
            }
        }
        if (vaGameArray[z] == "R/S/E") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rse != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_rse.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ruby" || gamesToCheck[j] == "sapphire" || gamesToCheck[j] == "emerald") {
                        SetWildBalls(index, j, "_wild", "balls_rse");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Ruby", "_wild", "special", "avoid", "diamond", "Via Breeding");
                SetBreedingTransferBalls(index, "Sapphire", "_wild", "special", "avoid", "diamond", "Via Breeding");
                SetBreedingTransferBalls(index, "Emerald", "_wild", "special", "avoid", "diamond", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ruby" || gamesToCheck[j] == "sapphire" || gamesToCheck[j] == "emerald") {
                        SetWildBalls(index, j, "_wild", "balls_rse");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Ruby", "_wild", "special", "avoid", "diamond", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Sapphire", "_wild", "special", "avoid", "diamond", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Emerald", "_wild", "special", "avoid", "diamond", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ruby" || gamesToCheck[j] == "sapphire" || gamesToCheck[j] == "emerald") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ruby" || gamesToCheck[j] == "sapphire" || gamesToCheck[j] == "emerald") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Ruby") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rse != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_rse.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ruby") {
                        SetWildBalls(index, j, "_wild", "balls_rse");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Ruby", "_wild", "special", "avoid", "diamond", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ruby") {
                        SetWildBalls(index, j, "_wild", "balls_rse");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Ruby", "_wild", "special", "avoid", "diamond", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ruby") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ruby") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Sapphire") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rse != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_rse.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sapphire") {
                        SetWildBalls(index, j, "_wild", "balls_rse");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Sapphire", "_wild", "special", "avoid", "diamond", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sapphire") {
                        SetWildBalls(index, j, "_wild", "balls_rse");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Sapphire", "_wild", "special", "avoid", "diamond", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sapphire") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sapphire") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Emerald") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_rse != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_rse.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "emerald") {
                        SetWildBalls(index, j, "_wild", "balls_rse");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Emerald", "_wild", "special", "avoid", "diamond", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "emerald") {
                        SetWildBalls(index, j, "_wild", "balls_rse");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Emerald", "_wild", "special", "avoid", "diamond", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "emerald") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "emerald") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "FR/LG") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_frlg != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_frlg.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "fire_red" || gamesToCheck[j] == "leaf_green") {
                        SetWildBalls(index, j, "_wild", "balls_frlg");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Fire Red", "_wild", "special", "avoid", "diamond", "Via Breeding");
                SetBreedingTransferBalls(index, "Leaf Green", "_wild", "special", "avoid", "diamond", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "fire_red" || gamesToCheck[j] == "leaf_green") {
                        SetWildBalls(index, j, "_wild", "balls_frlg");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Fire Red", "_wild", "special", "avoid", "diamond", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Leaf Green", "_wild", "special", "avoid", "diamond", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "fire_red" || gamesToCheck[j] == "leaf_green") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "fire_red" || gamesToCheck[j] == "leaf_green") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Fire Red") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_frlg != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_frlg.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "fire_red") {
                        SetWildBalls(index, j, "_wild", "balls_frlg");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Fire Red", "_wild", "special", "avoid", "diamond", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "fire_red") {
                        SetWildBalls(index, j, "_wild", "balls_frlg");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Fire Red", "_wild", "special", "avoid", "diamond", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "fire_red") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "fire_red") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Leaf Green") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_frlg != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_frlg.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "leaf_green") {
                        SetWildBalls(index, j, "_wild", "balls_frlg");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Leaf Green", "_wild", "special", "avoid", "diamond", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "leaf_green") {
                        SetWildBalls(index, j, "_wild", "balls_frlg");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Leaf Green", "_wild", "special", "avoid", "diamond", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "leaf_green") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "leaf_green") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Colo/XD") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_coloxd != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_coloxd.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "colosseum" || gamesToCheck[j] == "xd_gale_of_darkness") {
                        SetWildBalls(index, j, "_wild", "balls_coloxd");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Colosseum", "_wild", "special", "avoid", "diamond", "Via Breeding");
                SetBreedingTransferBalls(index, "XD Gale of Darkness", "_wild", "special", "avoid", "diamond", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "colosseum" || gamesToCheck[j] == "xd_gale_of_darkness") {
                        SetWildBalls(index, j, "_wild", "balls_coloxd");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "colosseum" || gamesToCheck[j] == "xd_game_of_darkness") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "colosseum" || gamesToCheck[j] == "xd_game_of_darkness") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Colosseum") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_coloxd != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_coloxd.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "colosseum") {
                        SetWildBalls(index, j, "_wild", "balls_coloxd");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Colosseum", "_wild", "special", "avoid", "diamond", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "colosseum") {
                        SetWildBalls(index, j, "_wild", "balls_coloxd");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "colosseum") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "colosseum") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "XD Gale of Darkness") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_coloxd != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_coloxd.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "xd_gale_of_darkness") {
                        SetWildBalls(index, j, "_wild", "balls_coloxd");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "XD Gale of Darkness", "_wild", "special", "avoid", "diamond", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "xd_gale_of_darkness") {
                        SetWildBalls(index, j, "_wild", "balls_coloxd");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "xd_gale_of_darkness") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "xd_gale_of_darkness") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "D/P/PT") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_dppt != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_dppt.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "diamond" || gamesToCheck[j] == "pearl" || gamesToCheck[j] == "platinum") {
                        SetWildBalls(index, j, "_wild", "balls_dppt");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Diamond", "_wild", "special", "avoid", "black", "Via Breeding");
                SetBreedingTransferBalls(index, "Pearl", "_wild", "special", "avoid", "black", "Via Breeding");
                SetBreedingTransferBalls(index, "Platinum", "_wild", "special", "avoid", "black", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "diamond" || gamesToCheck[j] == "pearl" || gamesToCheck[j] == "platinum") {
                        SetWildBalls(index, j, "_wild", "balls_dppt");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Diamond", "_wild", "special", "avoid", "black", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Pearl", "_wild", "special", "avoid", "black", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Platinum", "_wild", "special", "avoid", "black", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "diamond" || gamesToCheck[j] == "pearl" || gamesToCheck[j] == "platinum") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "diamond" || gamesToCheck[j] == "pearl" || gamesToCheck[j] == "platinum") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Diamond") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_dppt != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_dppt.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "diamond") {
                        SetWildBalls(index, j, "_wild", "balls_dppt");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Diamond", "_wild", "special", "avoid", "black", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "diamond") {
                        SetWildBalls(index, j, "_wild", "balls_dppt");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Diamond", "_wild", "special", "avoid", "black", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "diamond") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "diamond") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Pearl") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_dppt != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_dppt.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "pearl") {
                        SetWildBalls(index, j, "_wild", "balls_dppt");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Pearl", "_wild", "special", "avoid", "black", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "pearl") {
                        SetWildBalls(index, j, "_wild", "balls_dppt");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Pearl", "_wild", "special", "avoid", "black", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "pearl") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "pearl") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Platinum") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_dppt != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_dppt.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "platinum") {
                        SetWildBalls(index, j, "_wild", "balls_dppt");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Platinum", "_wild", "special", "avoid", "black", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "platinum") {
                        SetWildBalls(index, j, "_wild", "balls_dppt");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Platinum", "_wild", "special", "avoid", "black", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "platinum") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "platinum") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "HG/SS") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_hgss != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_hgss.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "heart_gold" || gamesToCheck[j] == "soul_silver") {
                        SetWildBalls(index, j, "_wild", "balls_hgss");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Heart Gold", "_wild", "special", "avoid", "black", "Via Breeding");
                SetBreedingTransferBalls(index, "Soul Silver", "_wild", "special", "avoid", "black", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "heart_gold" || gamesToCheck[j] == "soul_silver") {
                        SetWildBalls(index, j, "_wild", "balls_hgss");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Heart Gold", "_wild", "special", "avoid", "black", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Soul Silver", "_wild", "special", "avoid", "black", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "heart_gold" || gamesToCheck[j] == "soul_silver") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "heart_gold" || gamesToCheck[j] == "soul_silver") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Heart Gold") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_hgss != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_hgss.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "heart_gold") {
                        SetWildBalls(index, j, "_wild", "balls_hgss");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Heart Gold", "_wild", "special", "avoid", "black", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "heart_gold") {
                        SetWildBalls(index, j, "_wild", "balls_hgss");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Heart Gold", "_wild", "special", "avoid", "black", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "heart_gold") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "heart_gold") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Soul Silver") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_hgss != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_hgss.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "soul_silver") {
                        SetWildBalls(index, j, "_wild", "balls_hgss");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Soul Silver", "_wild", "special", "avoid", "black", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "soul_silver") {
                        SetWildBalls(index, j, "_wild", "balls_hgss");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Soul Silver", "_wild", "special", "avoid", "black", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "soul_silver") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "soul_silver") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "BW/BW2") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bwbw2 != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_bwbw2.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black" || gamesToCheck[j] == "white" || gamesToCheck[j] == "black_2" || gamesToCheck[j] == "white_2") {
                        SetWildBalls(index, j, "_wild", "balls_bwbw2");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }

                SetBreedingTransferBalls(index, "Black", "_wild", "special", "avoid", "x", "Via Breeding");
                SetBreedingTransferBalls(index, "White", "_wild", "special", "avoid", "x", "Via Breeding");
                SetBreedingTransferBalls(index, "Black 2", "_wild", "special", "avoid", "x", "Via Breeding");
                SetBreedingTransferBalls(index, "White 2", "_wild", "special", "avoid", "x", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black" || gamesToCheck[j] == "white" || gamesToCheck[j] == "black_2" || gamesToCheck[j] == "white_2") {
                        SetWildBalls(index, j, "_wild", "balls_bwbw2");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Black", "_wild", "special", "avoid", "x", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "White", "_wild", "special", "avoid", "x", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Black 2", "_wild", "special", "avoid", "x", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "White 2", "_wild", "special", "avoid", "x", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black" || gamesToCheck[j] == "white" || gamesToCheck[j] == "black_2" || gamesToCheck[j] == "white_2") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black" || gamesToCheck[j] == "white" || gamesToCheck[j] == "black_2" || gamesToCheck[j] == "white_2") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Black") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bwbw2 != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_bwbw2.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black") {
                        SetWildBalls(index, j, "_wild", "balls_bwbw2");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Black", "_wild", "special", "avoid", "x", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black") {
                        SetWildBalls(index, j, "_wild", "balls_bwbw2");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Black", "_wild", "special", "avoid", "x", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "White") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bwbw2 != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_bwbw2.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "white") {
                        SetWildBalls(index, j, "_wild", "balls_bwbw2");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "White", "_wild", "special", "avoid", "x", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "white") {
                        SetWildBalls(index, j, "_wild", "balls_bwbw2");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "White", "_wild", "special", "avoid", "x", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "white") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "white") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Black 2") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bwbw2 != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_bwbw2.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black_2") {
                        SetWildBalls(index, j, "_wild", "balls_bwbw2");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Black 2", "_wild", "special", "avoid", "x", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black_2") {
                        SetWildBalls(index, j, "_wild", "balls_bwbw2");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Black 2", "_wild", "special", "avoid", "x", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black_2") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "black_2") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "White 2") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bwbw2 != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_bwbw2.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "white_2") {
                        SetWildBalls(index, j, "_wild", "balls_bwbw2");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "White 2", "_wild", "special", "avoid", "x", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "white_2") {
                        SetWildBalls(index, j, "_wild", "balls_bwbw2");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "White 2", "_wild", "special", "avoid", "x", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "white_2") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "white_2") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "X/Y") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_xyoras != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_xyoras.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "x" || gamesToCheck[j] == "y") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "X", "_wild", "special", null, "sun", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Y", "_wild", "special", null, "sun", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "x" || gamesToCheck[j] == "y") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "X", "_wild", "special", null, "sun", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Y", "_wild", "special", null, "sun", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "x" || gamesToCheck[j] == "y") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "x" || gamesToCheck[j] == "y") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "X") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_xyoras != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_xyoras.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "x") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "X", "_wild", "special", null, "sun", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "x") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "X", "_wild", "special", null, "sun", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "x") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "x") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Y") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_xyoras != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_xyoras.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "y") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Y", "_wild", "special", null, "sun", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "y") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Y", "_wild", "special", null, "sun", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "y") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "y") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "OR/AS") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_xyoras != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_xyoras.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "omega_ruby" || gamesToCheck[j] == "alpha_sapphire") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Omega Ruby", "_wild", "special", null, "sun", "Via Breeding");
                SetBreedingTransferBalls(index, "Alpha Sapphire", "_wild", "special", null, "sun", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "omega_ruby" || gamesToCheck[j] == "alpha_sapphire") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Omega Ruby", "_wild", "special", null, "sun", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Alpha Sapphire", "_wild", "special", null, "sun", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "omega_ruby" || gamesToCheck[j] == "alpha_sapphire") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "omega_ruby" || gamesToCheck[j] == "alpha_sapphire") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Omega Ruby") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_xyoras != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_xyoras.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "omega_ruby") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Omega Ruby", "_wild", "special", null, "sun", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "omega_ruby") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Omega Ruby", "_wild", "special", null, "sun", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "omega_ruby") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "omega_ruby") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Alpha Sapphire") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_xyoras != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_xyoras.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "alpha_sapphire") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Alpha Sapphire", "_wild", "special", null, "sun", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "alpha_sapphire") {
                        SetWildBalls(index, j, "_wild", "balls_xyoras");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Alpha Sapphire", "_wild", "special", null, "sun", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "alpha_sapphire") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "alpha_sapphire") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "SM/USUM") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_smusum != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_smusum.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sun" || gamesToCheck[j] == "moon" || gamesToCheck[j] == "ultra_sun" || gamesToCheck[j] == "ultra_moon") {
                        SetWildBalls(index, j, "_wild", "balls_smusum");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Sun", "_wild", "special", null, "lets_go_pikachu", "Via Breeding");
                SetBreedingTransferBalls(index, "Moon", "_wild", "special", null, "lets_go_pikachu", "Via Breeding");
                SetBreedingTransferBalls(index, "Ultra Sun", "_wild", "special", null, "lets_go_pikachu", "Via Breeding");
                SetBreedingTransferBalls(index, "Ultra Moon", "_wild", "special", null, "lets_go_pikachu", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sun" || gamesToCheck[j] == "moon" || gamesToCheck[j] == "ultra_sun" || gamesToCheck[j] == "ultra_moon") {
                        SetWildBalls(index, j, "_wild", "balls_smusum");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Sun", "_wild", "special", null, "lets_go_pikachu", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Moon", "_wild", "special", null, "lets_go_pikachu", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Ultra Sun", "_wild", "special", null, "lets_go_pikachu", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Ultra Moon", "_wild", "special", null, "lets_go_pikachu", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sun" || gamesToCheck[j] == "moon" || gamesToCheck[j] == "ultra_sun" || gamesToCheck[j] == "ultra_moon") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sun" || gamesToCheck[j] == "moon" || gamesToCheck[j] == "ultra_sun" || gamesToCheck[j] == "ultra_moon") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Sun") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_smusum != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_smusum.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sun") {
                        SetWildBalls(index, j, "_wild", "balls_smusum");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Sun", "_wild", "special", null, "lets_go_pikachu", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sun") {
                        SetWildBalls(index, j, "_wild", "balls_smusum");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Sun", "_wild", "special", null, "lets_go_pikachu", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sun") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sun") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Moon") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_smusum != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_smusum.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "moon") {
                        SetWildBalls(index, j, "_wild", "balls_smusum");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Moon", "_wild", "special", null, "lets_go_pikachu", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "moon") {
                        SetWildBalls(index, j, "_wild", "balls_smusum");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Moon", "_wild", "special", null, "lets_go_pikachu", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "moon") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "moon") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Ultra Sun") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_smusum != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_smusum.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ultra_sun") {
                        SetWildBalls(index, j, "_wild", "balls_smusum");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Ultra Sun", "_wild", "special", null, "lets_go_pikachu", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ultra_sun") {
                        SetWildBalls(index, j, "_wild", "balls_smusum");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Ultra Sun", "_wild", "special", null, "lets_go_pikachu", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ultra_sun") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ultra_sun") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Ultra Moon") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_smusum != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_smusum.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ultra_moon") {
                        SetWildBalls(index, j, "_wild", "balls_smusum");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Ultra Moon", "_wild", "special", null, "lets_go_pikachu", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ultra_moon") {
                        SetWildBalls(index, j, "_wild", "balls_smusum");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Ultra Moon", "_wild", "special", null, "lets_go_pikachu", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ultra_moon") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "ultra_moon") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "LGP/LGE") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_lgpe != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_lgpe.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                SetLGPEBreedingTransferBalls(index, "_wild", null, null, null);
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "lets_go_pikachu" || gamesToCheck[j] == "lets_go_eevee") {
                        SetWildBalls(index, j, "_wild", "balls_lgpe");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "lets_go_pikachu" || gamesToCheck[j] == "lets_go_eevee") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "lets_go_pikachu" || gamesToCheck[j] == "lets_go_eevee") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Let's Go Pikachu") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_lgpe != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_lgpe.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                SetLGPEBreedingTransferBalls(index, "_wild", null, null, null);
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "lets_go_pikachu") {
                        SetWildBalls(index, j, "_wild", "balls_lgpe");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "lets_go_pikachu") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "lets_go_pikachu") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Let's Go Eevee") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_lgpe != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_lgpe.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                SetLGPEBreedingTransferBalls(index, "_wild", null, null, null);
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "lets_go_eevee") {
                        SetWildBalls(index, j, "_wild", "balls_lgpe");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "lets_go_eevee") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "lets_go_eevee") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "SW/SH") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_swsh != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_swsh.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sword" || gamesToCheck[j] == "shield") {
                        SetWildBalls(index, j, "_wild", "balls_swsh");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Sword", "_wild", "special", null, null, "Via Breeding");
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|sword|", "Via Breeding");
                SetBreedingTransferBalls(index, "Shield", "_wild", "special", null, null, "Via Breeding");
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|shield|", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sword" || gamesToCheck[j] == "shield") {
                        SetWildBalls(index, j, "_wild", "balls_swsh");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Sword", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|sword|", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Shield", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|shield|", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sword" || gamesToCheck[j] == "shield") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Raid/Outbreak Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sword" || gamesToCheck[j] == "shield") {
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sword" || gamesToCheck[j] == "shield") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Sword") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_swsh != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_swsh.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sword") {
                        SetWildBalls(index, j, "_wild", "balls_swsh");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|sword|", "Via Breeding");
                SetBreedingTransferBalls(index, "Sword", "_wild", "special", null, null, "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sword") {
                        SetWildBalls(index, j, "_wild", "balls_swsh");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Sword", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|sword|", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sword") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Raid/Outbreak Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sword") {
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "sword") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Shield") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_swsh != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_swsh.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "shield") {
                        SetWildBalls(index, j, "_wild", "balls_swsh");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|shield|", "Via Breeding");
                SetBreedingTransferBalls(index, "Shield", "_wild", "special", null, null, "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "shield") {
                        SetWildBalls(index, j, "_wild", "balls_swsh");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Shield", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|shield|", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "shield") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Raid/Outbreak Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "shield") {
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "shield") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "BD/SP") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bdsp != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_bdsp.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "brilliant_diamond" || gamesToCheck[j] == "shining_pearl") {
                        SetWildBalls(index, j, "_wild", "balls_bdsp");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Brilliant Diamond", "_wild", "special", null, null, "Via Breeding");
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|brilliantdiamond|", "Via Breeding");
                SetBreedingTransferBalls(index, "Shining Pearl", "_wild", "special", null, null, "Via Breeding");
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|shiningpearl|", "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "brilliant_diamond" || gamesToCheck[j] == "shining_pearl") {
                        SetWildBalls(index, j, "_wild", "balls_bdsp");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Brilliant Diamond", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|brilliantdiamond|", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Shining Pearl", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|shiningpearl|", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "brilliant_diamond" || gamesToCheck[j] == "shining_pearl") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "brilliant_diamond" || gamesToCheck[j] == "shining_pearl") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Brilliant Diamond") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bdsp != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_bdsp.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "brilliant_diamond") {
                        SetWildBalls(index, j, "_wild", "balls_bdsp");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|brilliantdiamond|", "Via Breeding");
                SetBreedingTransferBalls(index, "Brilliant Diamond", "_wild", "special", null, null, "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "brilliant_diamond") {
                        SetWildBalls(index, j, "_wild", "balls_bdsp");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Brilliant Diamond", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|brilliantdiamond|", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "brilliant_diamond") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "brilliant_diamond") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Shining Pearl") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_bdsp != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_bdsp.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "shining_pearl") {
                        SetWildBalls(index, j, "_wild", "balls_bdsp");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|shiningpearl|", "Via Breeding");
                SetBreedingTransferBalls(index, "Shining Pearl", "_wild", "special", null, null, "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "shining_pearl") {
                        SetWildBalls(index, j, "_wild", "balls_bdsp");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Shining Pearl", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|shiningpearl|", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "shining_pearl") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "shining_pearl") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "LA") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_la != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_la.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "legends_arceus") {
                        SetWildBalls(index, j, "_wild", "balls_la");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|legendsarceus|", "Via Breeding");
                SetBreedingTransferBalls(index, "Legends Arceus", "_wild", "special", null, null, "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "legends_arceus") {
                        SetWildBalls(index, j, "_wild", "balls_la");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "legends_arceus") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "legends_arceus") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Legends Arceus") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_la != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_la.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "legends_arceus") {
                        SetWildBalls(index, j, "_wild", "balls_la");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|legendsarceus|", "Via Breeding");
                SetBreedingTransferBalls(index, "Legends Arceus", "_wild", "special", null, null, "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "legends_arceus") {
                        SetWildBalls(index, j, "_wild", "balls_la");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "legends_arceus") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "legends_arceus") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "S/V") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_sv != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_sv.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "scarlet" || gamesToCheck[j] == "violet") {
                        SetWildBalls(index, j, "_wild", "balls_sv");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetBreedingTransferBalls(index, "Scarlet", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|scarlet|", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Violet", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|violet|", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "scarlet" || gamesToCheck[j] == "violet") {
                        SetWildBalls(index, j, "_wild", "balls_sv");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Scarlet", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|scarlet|", viewingMethodDropdown.value);
                SetBreedingTransferBalls(index, "Violet", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|violet|", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "scarlet" || gamesToCheck[j] == "violet") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Raid/Outbreak Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "scarlet" || gamesToCheck[j] == "violet") {
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "scarlet" || gamesToCheck[j] == "violet") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Scarlet") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_sv != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_sv.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "scarlet") {
                        SetWildBalls(index, j, "_wild", "balls_sv");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|scarlet|", "Via Breeding");
                SetBreedingTransferBalls(index, "Scarlet", "_wild", "special", null, null, "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "scarlet") {
                        SetWildBalls(index, j, "_wild", "balls_sv");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Scarlet", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|scarlet|", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "scarlet") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Raid/Outbreak Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "scarlet") {
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "scarlet") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
        if (vaGameArray[z] == "Violet") {
            for (let j = 0; j < allBallsInGames.length; j++) {
                if (allBallsInGames[j].balls_sv != null) {
                    document.getElementById("VA-" + allBallsInGames[j].balls_sv.replace(/\s/g, '') + " ").style.display = "initial";
                }
            }
            if (viewingMethodDropdown.value == "(All Options)") {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "violet") {
                        SetWildBalls(index, j, "_wild", "balls_sv");
                        SetSpecificEventBalls(index, j, "_specific");
                        SetSpecificEventBalls(index, j, "_event");
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|violet|", "Via Breeding");
                SetBreedingTransferBalls(index, "Violet", "_wild", "special", null, null, "Via Breeding");
            }
            else if (viewingMethodDropdown.value == ("In-Game")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "violet") {
                        SetWildBalls(index, j, "_wild", "balls_sv");
                        SetSpecificEventBalls(index, j, "_specific");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Via Breeding")) {
                SetBreedingTransferBalls(index, "Violet", "_wild", "special", null, null, viewingMethodDropdown.value);
                SetLGPEBreedingTransferBalls(index, "_wild", "special", "|violet|", viewingMethodDropdown.value);
            }
            else if (viewingMethodDropdown.value == ("Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "violet") {
                        SetSpecificEventBalls(index, j, "_event");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Raid/Outbreak Event")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "violet") {
                        SetSpecificEventBalls(index, j, "_raidOutbreak");
                    }
                }
            }
            else if (viewingMethodDropdown.value == ("Other Software")) {
                for (let j = 0; j < gamesToCheck.length; j++) {
                    if (gamesToCheck[j] == "violet") {
                        SetSpecificEventBalls(index, j, "_other");
                    }
                }
            }
        }
    }
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

}