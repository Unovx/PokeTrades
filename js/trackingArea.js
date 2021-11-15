var collectionData;
var collectionLength;

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
    document.querySelector("#PanelArea").style.display = "block";
    document.querySelector(".PA-WhatsNewPanel").style.display = "block";
    RemoveHash();
});

$('.TA-LegalityChecker').click(function () {
    $.post(url + "/PHP/legality_list.php", TrackingData);
    ShowLoading();
});

$('.TA-UserCollection').click(function () {
    //$.post(url + "/PHP/legality_list.php", GreyScaleData);
    $.post(url + "/PHP/generate_selection.php", { token: token, searchID: userData.user_id, tradeOption: "For Trade", }, UserCollection);
    ShowLoading();
});

$('.TA-InfoButton').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".TrackingInformation").style.display = "block";
});

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