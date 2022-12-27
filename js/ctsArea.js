//Need ctsSearching so it can change the Selection Area as needed.
let ctsSeaching = false;
let ctsOffset = document.querySelector(".CTS-Offset");
let ctsLimit = document.querySelector(".CTS-Limit");
let ctsLangArray = new Array();
let ctsBallArray = new Array();
let ctsGenderOption = "(Any Gender)";
let ctsShinyOption = "(Any Shiny or Normal)";
let ctsMintOption = "(Any or No Mint)";
let ctsMiscArray = new Array();
let ctsMarkArray = new Array();
let ctsRibbonArray = new Array();
let ctsPokemonDropdown = document.querySelector(".CTS-PokemonDropdown");
let ctsNicknameDropdown = document.querySelector(".CTS-NicknameDropdown");
let ctsAbilityDropdown = document.querySelector(".CTS-AbilityDropdown");
let ctsNatureDropdown = document.querySelector(".CTS-NatureDropdown");
let cstGen6 = "";
let cstGen7 = "";
let cstGen8 = "";
let cstHome = "";
let ctsGameObtainedDropdown = document.querySelector(".CTS-GameObtainedDropdown");
let ctsHowObtainedDropdown = document.querySelector(".CTS-HowObtainedDropdown");
let ctsFormEvos = new Array();
let ctsForms = new Array();
let ctsFormDropdown = document.querySelector(".CTS-FormDropdown");
let ctsEvos = new Array();
let ctsEvoDropdown = document.querySelector(".CTS-EvoDropdown");
let ctsID = document.querySelector(".CTS-ID");
let ctsOT = document.querySelector(".CTS-OT");
let ctsStatusDropdown = document.querySelector(".CTS-StatusDropdown");
let ctsEventDropdown = document.querySelector(".CTS-EventDropdown");
let ctsIvHP = document.querySelector(".CTS-IvHP");
let ctsIvAtt = document.querySelector(".CTS-IvAtt");
let ctsIvDef = document.querySelector(".CTS-IvDef");
let ctsIvSpa = document.querySelector(".CTS-IvSpa");
let ctsIvSpd = document.querySelector(".CTS-IvSpd");
let ctsIvSpe = document.querySelector(".CTS-IvSpe");
let ctsEvHP = document.querySelector(".CTS-EvHP");
let ctsEvAtt = document.querySelector(".CTS-EvAtt");
let ctsEvDef = document.querySelector(".CTS-EvDef");
let ctsEvSpa = document.querySelector(".CTS-EvSpa");
let ctsEvSpd = document.querySelector(".CTS-EvSpd");
let ctsEvSpe = document.querySelector(".CTS-EvSpe");
let ctsMove1Dropdown = document.querySelector(".CTS-Move1");
let ctsMove2Dropdown = document.querySelector(".CTS-Move2");
let ctsMove3Dropdown = document.querySelector(".CTS-Move3");
let ctsMove4Dropdown = document.querySelector(".CTS-Move4");
let ctsProofDropdown = document.querySelector(".CTS-ProofDropdown");
let ctsNoteDropdown = document.querySelector(".CTS-NoteDropdown");

$(".CTS-CloseButton").click(function () {
    ctsSeaching = false;
    CTSResetFilters();
    document.querySelector("#CTSArea").style.display = "none";
    document.querySelector(".SA-Bunch").style.opacity = "0%";
    ResetFilters();
    CloseAll();
    document.querySelector("#MainArea").style.display = "block";
    document.querySelector(".SA-CreateButton").style.display = "initial";
    document.querySelector(".SA-MoveButton").style.display = "initial";
    document.querySelector(".SA-CopyButton").style.display = "initial";
});

$(".CTS-SearchButton").click(function () {
    ShowLoading();
    $.post(url + "/PHP/cts_search.php", { offset: selectionOffset.value, limit: selectionLimit.value, pokemon: ctsPokemonDropdown.value, lang: ctsLangArray, ball: ctsBallArray, gender: ctsGenderOption, shiny: ctsShinyOption, mint: ctsMintOption, misc: ctsMiscArray, mark: ctsMarkArray, ribbons: ctsRibbonArray, nickname: ctsNicknameDropdown.value, ability: ctsAbilityDropdown.value, nature: ctsNatureDropdown.value, gen6: cstGen6, gen7: cstGen7, gen8: cstGen8, home: cstHome, gameObtained: ctsGameObtainedDropdown.value, howObtained: ctsHowObtainedDropdown.value, formEvos: ctsFormEvos, forms: ctsForms, formOption: ctsFormDropdown.value, evos: ctsEvos, evoOption: ctsEvoDropdown.value, OT: ctsOT.value, ID: ctsID.value, status: ctsStatusDropdown.value, event: ctsEventDropdown.value, ivhp: ctsIvHP.value, ivatt: ctsIvAtt.value, ivdef: ctsIvDef.value, ivspa: ctsIvSpa.value, ivspd: ctsIvSpd.value, ivspe: ctsIvSpe.value, evhp: ctsEvHP.value, evatt: ctsEvAtt.value, evdef: ctsEvDef.value, evspa: ctsEvSpa.value, evspd: ctsEvSpd.value, evspe: ctsEvSpe.value, move1: ctsMove1Dropdown.value, move2: ctsMove2Dropdown.value, move3: ctsMove3Dropdown.value, move4: ctsMove4Dropdown.value, proof: ctsProofDropdown.value, note: ctsNoteDropdown.value }, GenerateSelection);
    //$.post(ur, move1: ctsMove1Dropdown.valuel + "/PHP/cts_search.php", { ball: ctsBallArray }, GenerateSelection);
});

$(".CTS-ResetButton").click(function () {
    CTSResetFilters();
});

$('.CTS-HelpButton').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".CTSInfo").style.display = "block";
});

$(".CTS-SelectedLang").click(function () {
    if (document.querySelector(".CTS-LangOptions").style.display == "grid") {
        document.querySelector(".CTS-LangOptions").style.display = "none";
    } else {
        document.querySelector(".CTS-LangOptions").style.display = "grid";
    }
});

$(".CTS-SelectedBall").click(function () {
    if (document.querySelector(".CTS-BallOptions").style.display == "grid") {
        document.querySelector(".CTS-BallOptions").style.display = "none";
    } else {
        document.querySelector(".CTS-BallOptions").style.display = "grid";
    }
});

$(".CTS-SelectedGender").click(function () {
    if (document.querySelector(".CTS-GenderOptions").style.display == "grid") {
        document.querySelector(".CTS-GenderOptions").style.display = "none";
    } else {
        document.querySelector(".CTS-GenderOptions").style.display = "grid";
    }
});

$(".CTS-SelectedShiny").click(function () {
    if (document.querySelector(".CTS-ShinyOptions").style.display == "grid") {
        document.querySelector(".CTS-ShinyOptions").style.display = "none";
    } else {
        document.querySelector(".CTS-ShinyOptions").style.display = "grid";
    }
});

$(".CTS-SelectedMint").click(function () {
    if (document.querySelector(".CTS-MintOptions").style.display == "grid") {
        document.querySelector(".CTS-MintOptions").style.display = "none";
    } else {
        document.querySelector(".CTS-MintOptions").style.display = "grid";
    }
});

$(".CTS-SelectedMisc").click(function () {
    if (document.querySelector(".CTS-MiscOptions").style.display == "grid") {
        document.querySelector(".CTS-MiscOptions").style.display = "none";
    } else {
        document.querySelector(".CTS-MiscOptions").style.display = "grid";
    }
});

$(".CTS-SelectedMark").click(function () {
    if (document.querySelector(".CTS-MarkOptions").style.display == "grid") {
        document.querySelector(".CTS-MarkOptions").style.display = "none";
    } else {
        document.querySelector(".CTS-MarkOptions").style.display = "grid";
    }
});

$(".CTS-SelectedRibbon").click(function () {
    if (document.querySelector(".CTS-RibbonOptions").style.display == "grid") {
        document.querySelector(".CTS-RibbonOptions").style.display = "none";
    } else {
        document.querySelector(".CTS-RibbonOptions").style.display = "grid";
    }
});

$(ctsPokemonDropdown).change(function () {
    SetImage(document.querySelector(".CTS-PokemonImage"), ctsPokemonDropdown.value, ctsGenderOption, ctsShinyOption, ctsGameObtainedDropdown.value);
    CTSAbilityOptions();
    ctsForms = new Array();
    ctsEvos = new Array();
    ctsFormEvos = new Array();

    //ctsFormEvos is a array that will hold both the Forms and Evos of a Pokemon because one array will be needed for php if the user wants to search for both.


    for (let i = 0; i < pokemonDataArray.length; i++) {
        if (ctsPokemonDropdown.value == pokemonDataArray[i].pokemon) {
            if (pokemonDataArray[i].forms != null) {
                ctsForms = pokemonDataArray[i].forms.split("|");
                ctsFormEvos = pokemonDataArray[i].forms.split("|");
            }
        }
    }

    for (let i = 0; i < evoDataArray.length; i++) {
        var arrayTempEvo = evoDataArray[i].evo_lines.split("|");
        for (let j = 0; j < arrayTempEvo.length; j++) {
            if (ctsPokemonDropdown.value == arrayTempEvo[j]) {
                ctsEvos = arrayTempEvo;
                //Burmy Line Exception due to the Mothim evo line being annoying (different)
                if (ctsPokemonDropdown.value.includes("Burmy") || ctsPokemonDropdown.value.includes("Wormadam") || ctsPokemonDropdown.value.includes("Mothim")) {
                    for (let k = 0; k < evoDataArray.length; k++) {
                        if (evoDataArray[k].pokemon == ctsPokemonDropdown.value) {
                            arrayTempEvo = evoDataArray[k].evo_lines.split("|");
                            ctsEvos = arrayTempEvo;
                        }
                    }
                }
            }
        }
    }

    if (!ctsEvos.includes(ctsPokemonDropdown.value)) {
        ctsEvos = new Array();
    } else {
        for (let i = 0; i < ctsEvos.length; i++) {
            if (!ctsFormEvos.includes(ctsEvos[i])) {
                ctsFormEvos.push(ctsEvos[i])
            }
        }
    }
    //console.log(ctsFormEvos);
});

$('.CTS-Gen6').click(function () {
    if (cstGen6 == "") {
        cstGen6 = "Available";
        document.querySelector(".CTS-Gen6").style.color = "#74db96";
    } else {
        cstGen6 = "";
        document.querySelector(".CTS-Gen6").style.color = "white";
    }
});

$('.CTS-Gen7').click(function () {
    if (cstGen7 == "") {
        cstGen7 = "Available";
        document.querySelector(".CTS-Gen7").style.color = "#74db96";
    } else {
        cstGen7 = "";
        document.querySelector(".CTS-Gen7").style.color = "white";
    }
});

$('.CTS-Gen8').click(function () {
    if (cstGen8 == "") {
        cstGen8 = "Available";
        document.querySelector(".CTS-Gen8").style.color = "#74db96";
    } else {
        cstGen8 = "";
        document.querySelector(".CTS-Gen8").style.color = "white";
    }
});

$('.CTS-Home').click(function () {
    if (cstHome == "") {
        cstHome = "Available";
        document.querySelector(".CTS-Home").style.color = "#74db96";
    } else {
        cstHome = "";
        document.querySelector(".CTS-Home").style.color = "white";
    }
});

$(ctsGameObtainedDropdown).change(function () {
    SetImage(document.querySelector(".CTS-PokemonImage"), ctsPokemonDropdown.value, ctsGenderOption, ctsShinyOption, ctsGameObtainedDropdown.value);
});

function TestCTS(data) {
    arrayInfo = jQuery.parseJSON(data);
    testArray = arrayInfo["Rows"];
    console.log(testArray);
    //console.log(data);
}

function CTSLangOptions() {
    for (let i = 1; i < languageOptionsArray.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "CTS-" + languageOptionsArray[i]);
        newDiv.classList.add("CTS-IconContainer")

        newButton = document.createElement("button");
        newButton.classList.add("CTS-IconButton");
        newButton.innerHTML = languageOptionsArray[i];

        newDiv.appendChild(newButton);
        document.querySelector(".CTS-LangOptions").appendChild(newDiv);

        newDiv.onclick = function () {
            if (ctsLangArray[i] != languageOptionsArray[i]) {
                ctsLangArray[i] = languageOptionsArray[i];
                newDiv.style.backgroundColor = "#407c74";

            } else {
                delete (ctsLangArray[i]);
                newDiv.style.backgroundColor = "#9f5e5e";
            }
        }
    }
}

function CTSBallOptions() {
    for (let i = 1; i < allBallsArray.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "CTS-" + allBallsArray[i]);
        newDiv.classList.add("CTS-IconContainer")

        newImage = document.createElement("img");
        //newImage.setAttribute("class", "CTS-" + allBallsArray[i]);
        newImage.classList.add("CTS-Icon");
        newImage.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/" + allBallsArray[i] + ".png");
        newImage.setAttribute("title", allBallsArray[i]);

        newDiv.appendChild(newImage);
        document.querySelector(".CTS-BallOptions").appendChild(newDiv);

        newDiv.onclick = function () {
            if (i != 0) {
                if (ctsBallArray[i] != allBallsArray[i]) {
                    ctsBallArray[i] = allBallsArray[i];
                    newDiv.style.backgroundColor = "#407c74";
                } else {
                    delete (ctsBallArray[i]);
                    newDiv.style.backgroundColor = "#9f5e5e";
                }
            }
        }
    }
}

function CTSGenderOptions() {
    for (let i = 1; i < genderOptionsArray.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "CTS-" + genderOptionsArray[i]);
        newDiv.classList.add("CTS-IconContainer")

        newImage = document.createElement("img");
        newImage.classList.add("CTS-Icon");
        newImage.setAttribute("src", url + "/Resources/Misc/" + genderOptionsArray[i] + ".png");
        newImage.setAttribute("title", genderOptionsArray[i]);

        newDiv.appendChild(newImage);
        document.querySelector(".CTS-GenderOptions").appendChild(newDiv);

        newDiv.onclick = function () {
            if (ctsGenderOption == genderOptionsArray[i]) {
                ctsGenderOption = "(Any Gender)";
                newDiv.style.backgroundColor = "#9f5e5e";

            } else {
                ctsGenderOption = genderOptionsArray[i];
                newDiv.style.backgroundColor = "#407c74";
            }

            for (let j = 1; j < genderOptionsArray.length; j++) {
                if (ctsGenderOption != genderOptionsArray[j]) {
                    document.getElementById("CTS-" + genderOptionsArray[j]).style.backgroundColor = "#9f5e5e";
                }
            }
            SetImage(document.querySelector(".CTS-PokemonImage"), ctsPokemonDropdown.value, ctsGenderOption, ctsShinyOption, ctsGameObtainedDropdown.value);
        }
    }
}

function CTSShinyOptions() {
    for (let i = 1; i < shinyOptionsArray.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "CTS-" + shinyOptionsArray[i]);
        newDiv.classList.add("CTS-IconContainer")

        newImage = document.createElement("img");
        newImage.classList.add("CTS-Icon");
        newImage.setAttribute("src", url + "/Resources/Misc/" + shinyOptionsArray[i] + ".png");
        newImage.setAttribute("title", shinyOptionsArray[i]);

        newDiv.appendChild(newImage);
        document.querySelector(".CTS-ShinyOptions").appendChild(newDiv);

        newDiv.onclick = function () {
            if (ctsShinyOption == shinyOptionsArray[i]) {
                ctsShinyOption = "(Any Shiny or Normal)";
                newDiv.style.backgroundColor = "#9f5e5e";

            } else {
                ctsShinyOption = shinyOptionsArray[i];
                newDiv.style.backgroundColor = "#407c74";
            }

            for (let j = 1; j < shinyOptionsArray.length; j++) {
                if (ctsShinyOption != shinyOptionsArray[j]) {
                    document.getElementById("CTS-" + shinyOptionsArray[j]).style.backgroundColor = "#9f5e5e";
                }
            }
            SetImage(document.querySelector(".CTS-PokemonImage"), ctsPokemonDropdown.value, ctsGenderOption, ctsShinyOption, ctsGameObtainedDropdown.value);
        }
    }
}

function CTSMintOptions() {
    for (let i = 1; i < mintOptionsArray.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "CTS-" + mintOptionsArray[i]);
        newDiv.classList.add("CTS-IconContainer")

        newImage = document.createElement("img");
        newImage.classList.add("CTS-Icon");
        newImage.setAttribute("src", url + "/Resources/Misc/" + mintOptionsArray[i] + ".png");
        newImage.setAttribute("title", mintOptionsArray[i]);

        newDiv.appendChild(newImage);
        document.querySelector(".CTS-MintOptions").appendChild(newDiv);

        newDiv.onclick = function () {
            if (ctsMintOption == mintOptionsArray[i]) {
                ctsMintOption = "(Any or No Mint)";
                newDiv.style.backgroundColor = "#9f5e5e";

            } else {
                ctsMintOption = mintOptionsArray[i];
                newDiv.style.backgroundColor = "#407c74";
            }

            for (let j = 1; j < mintOptionsArray.length; j++) {
                if (ctsMintOption != mintOptionsArray[j]) {
                    document.getElementById("CTS-" + mintOptionsArray[j]).style.backgroundColor = "#9f5e5e";
                }
            }
        }
    }
}

function CTSMiscOptions() {
    for (let i = 1; i < miscOptionsArray.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "CTS-" + miscOptionsArray[i]);
        newDiv.classList.add("CTS-IconContainer")

        newImage = document.createElement("img");
        newImage.classList.add("CTS-Icon");
        newImage.setAttribute("src", url + "/Resources/Misc/" + miscOptionsArray[i] + ".png");
        newImage.setAttribute("title", miscOptionsArray[i]);

        newDiv.appendChild(newImage);
        document.querySelector(".CTS-MiscOptions").appendChild(newDiv);

        newDiv.onclick = function () {
            if (ctsMiscArray[i] != miscOptionsArray[i]) {
                ctsMiscArray[i] = miscOptionsArray[i];
                newDiv.style.backgroundColor = "#407c74";

            } else {
                delete (ctsMiscArray[i]);
                newDiv.style.backgroundColor = "#9f5e5e";
            }
        }
    }
}

function CTSMarkOptions() {
    for (let i = 1; i < allMarksArray.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "CTS-" + allMarksArray[i]);
        newDiv.classList.add("CTS-IconContainer")

        newImage = document.createElement("img");
        newImage.classList.add("CTS-Icon");
        newImage.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Marks/" + allMarksArray[i] + ".png");
        newImage.setAttribute("title", allMarksArray[i]);

        newDiv.appendChild(newImage);
        document.querySelector(".CTS-MarkOptions").appendChild(newDiv);

        newDiv.onclick = function () {
            if (ctsMarkArray[i] != allMarksArray[i]) {
                ctsMarkArray[i] = allMarksArray[i];
                newDiv.style.backgroundColor = "#407c74";

            } else {
                delete (ctsMarkArray[i]);
                newDiv.style.backgroundColor = "#9f5e5e";
            }
        }
    }
}

function CTSRibbonOptions() {
    for (let i = 1; i < ribbonOptionsArray.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "CTS-" + ribbonOptionsArray[i]);
        newDiv.classList.add("CTS-IconContainer")

        newImage = document.createElement("img");
        newImage.classList.add("CTS-Icon");
        newImage.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Ribbons/" + ribbonOptionsArray[i] + ".png");
        newImage.setAttribute("title", ribbonOptionsArray[i]);

        newDiv.appendChild(newImage);
        document.querySelector(".CTS-RibbonOptions").appendChild(newDiv);

        newDiv.onclick = function () {
            if (ctsRibbonArray[i] != ribbonOptionsArray[i]) {
                ctsRibbonArray[i] = ribbonOptionsArray[i];
                newDiv.style.backgroundColor = "#407c74";

            } else {
                delete (ctsRibbonArray[i]);
                newDiv.style.backgroundColor = "#9f5e5e";
            }
        }
    }
}

function CTSAbilityOptions() {
    while (ctsAbilityDropdown.lastElementChild) {
        ctsAbilityDropdown.removeChild(ctsAbilityDropdown.lastElementChild);
    }

    for (let i = 0; i < pokemonDataArray.length; i++) {
        var dataPokemon = null;
        if (ctsPokemonDropdown.value == "Meowstic") {
            dataPokemon = ctsPokemonDropdown.value + "-" + genderData
            //console.log(dataPokemon);
        }

        if (ctsPokemonDropdown.value == "Indeedee") {
            dataPokemon = ctsPokemonDropdown.value + "-" + genderData
        }

        if (pokemonData == "Oinkologne") {
            dataPokemon = pokemonData + "-" + genderData
        }

        if (ctsPokemonDropdown.value == pokemonDataArray[i].pokemon || dataPokemon == pokemonDataArray[i].pokemon) {

            //Creating an (Any Ability) in case they don't care.
            const firstOption = document.createElement("option");
            firstOption.value = "(Any Ability)";
            firstOption.textContent = "(Any Ability)";
            firstOption.setAttribute("class", "CTS-DropdownOptions");
            ctsAbilityDropdown.appendChild(firstOption);

            const ctsOption = document.createElement("option");
            ctsOption.value = pokemonDataArray[i].ability_1;
            ctsOption.textContent = pokemonDataArray[i].ability_1;
            ctsOption.setAttribute("class", "CTS-DropdownOptions");
            ctsAbilityDropdown.appendChild(ctsOption);

            if (pokemonDataArray[i].ability_2 != null || dataPokemon != null && dataPokemon.ability_2 != null) {
                const ctsOption = document.createElement("option");
                ctsOption.value = pokemonDataArray[i].ability_2;
                ctsOption.textContent = pokemonDataArray[i].ability_2;
                ctsOption.setAttribute("class", "CTS-DropdownOptions");
                ctsAbilityDropdown.appendChild(ctsOption);
            }

            if (pokemonDataArray[i].hidden_ability_1 != null || dataPokemon != null && dataPokemon.hidden_ability_1 != null) {
                const ctsOption = document.createElement("option");
                ctsOption.value = pokemonDataArray[i].hidden_ability_1;
                ctsOption.textContent = pokemonDataArray[i].hidden_ability_1 + (" (H)");
                ctsOption.setAttribute("class", "CTS-DropdownOptions");
                ctsAbilityDropdown.appendChild(ctsOption);
            }

            if (pokemonDataArray[i].hidden_ability_2 != null || dataPokemon != null && dataPokemon.hidden_ability_2 != null) {
                const ctsOption = document.createElement("option");
                ctsOption.value = pokemonDataArray[i].hidden_ability_2;
                ctsOption.textContent = pokemonDataArray[i].hidden_ability_2 + (" (H)");
                ctsOption.setAttribute("class", "CTS-DropdownOptions");
                ctsAbilityDropdown.appendChild(ctsOption);
            }

        }
    }
}

function CTSResetFilters() {
    var cols = document.getElementsByClassName("CTS-IconContainer");
    for (i = 0; i < cols.length; i++) {
        cols[i].style.background = "#9f5e5e";
    }
    ctsLangArray = new Array(languageOptionsArray.length - 1);
    ctsBallArray = new Array(allBallsArray.length - 1);
    ctsGenderOption = "(Any Gender)";
    ctsShinyOption = "(Any Shiny or Normal)";
    ctsMintOption = "(Any or No Mint)";
    ctsMiscArray = new Array(miscOptionsArray.length - 1);
    ctsMarkArray = new Array(allMarksArray.length - 1);
    ctsRibbonArray = new Array(ribbonOptionsArray.length - 1);
    ctsPokemonDropdown.value = "Abomasnow";
    ctsNicknameDropdown.value = "(Any/No Nickname)";
    ctsAbilityDropdown.value = "(Any Ability)";
    ctsNatureDropdown.value = "(Any Nature)";
    cstGen6 = "";
    document.querySelector(".CTS-Gen6").style.color = "white";
    cstGen7 = "";
    document.querySelector(".CTS-Gen7").style.color = "white";
    cstGen8 = "";
    document.querySelector(".CTS-Gen8").style.color = "white";
    cstHome = "";
    document.querySelector(".CTS-Home").style.color = "white";
    ctsForms = new Array();
    ctsFormDropdown.value = "(This Form)";
    ctsEvos = new Array();
    ctsEvoDropdown.value = "(This Pokemon)";
    ctsGameObtainedDropdown.value = "(Any Game)";
    ctsHowObtainedDropdown.value = "(Any Method)";
    ctsOT.value = "";
    ctsID.value = "";
    ctsStatusDropdown.value = "(Any Status)";
    ctsEventDropdown.value = "(Any/No Event)";
    ctsIvHP.value = "X";
    ctsIvAtt.value = "X";
    ctsIvDef.value = "X";
    ctsIvSpa.value = "X";
    ctsIvSpd.value = "X";
    ctsIvSpe.value = "X";
    ctsEvHP.value = "X";
    ctsEvAtt.value = "X";
    ctsEvDef.value = "X";
    ctsEvSpa.value = "X";
    ctsEvSpd.value = "X";
    ctsEvSpe.value = "X";
    ctsMove1Dropdown.value = "(Any Move)";
    ctsMove2Dropdown.value = "(Any Move)";
    ctsMove3Dropdown.value = "(Any Move)";
    ctsMove4Dropdown.value = "(Any Move)";
    ctsProofDropdown.value = "(Any/No Proof)";
    ctsNoteDropdown.value = "(Any/No Note)";
    $(ctsPokemonDropdown).change();
}