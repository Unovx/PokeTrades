filterCheck = new Array("false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false");
filtersApplied = false;

filterDisplay = document.querySelector(".FA-FilterDisplay");
filterBall = document.querySelector(".FA-FilterBall");
filterGender = document.querySelector(".FA-FilterGender");
filterShiny = document.querySelector(".FA-FilterShiny");
filterMint = document.querySelector(".FA-FilterMint");
filterMisc = document.querySelector(".FA-FilterMisc");
filterMark = document.querySelector(".FA-FilterMark");
filterType = document.querySelector(".FA-FilterType");
filterRibbon = document.querySelector(".FA-FilterRibbon");
filterLanguage = document.querySelector(".FA-FilterLanguage");
filterNature = document.querySelector(".FA-FilterNature");
filterAbility = document.querySelector(".FA-FilterAbility");
filterStatus = document.querySelector(".FA-FilterStatus");
filterEvent = document.querySelector(".FA-FilterEvent");
filterMove = document.querySelector(".FA-FilterMove");
filterHowObtained = document.querySelector(".FA-FilterHowObtained");
filterGameObtained = document.querySelector(".FA-FilterGameObtained");
filterNote = document.querySelector(".FA-FilterNote");
filterProof = document.querySelector(".FA-FilterProof");
filterOT = document.querySelector(".FA-FilterOT");
filterID = document.querySelector(".FA-FilterID");
filterIvHP = document.querySelector(".FA-IvHP");
filterIvAtt = document.querySelector(".FA-IvAtt");
filterIvDef = document.querySelector(".FA-IvDef");
filterIvSpa = document.querySelector(".FA-IvSpa");
filterIvSpd = document.querySelector(".FA-IvSpd");
filterIvSpe = document.querySelector(".FA-IvSpe");
filterEvHP = document.querySelector(".FA-EvHP");
filterEvAtt = document.querySelector(".FA-EvAtt");
filterEvDef = document.querySelector(".FA-EvDef");
filterEvSpa = document.querySelector(".FA-EvSpa");
filterEvSpd = document.querySelector(".FA-EvSpd");
filterEvSpe = document.querySelector(".FA-EvSpe");

filterGen6 = "";
filterGen7 = "";
filterGen8 = "";
filterHome = "";

$('.FA-CloseButton').click(function () {
    document.querySelector("#FilterArea").style.display = "none";

    if (selectedPokemon == null) {
        //document.querySelector("#SelectionArea").style.width = "100%";
        document.querySelector("#PanelArea").style.display = "block";
    } if (ctsSeaching && selectedPokemon == null) {
        document.querySelector("#CTSArea").style.display = "block";
    } else {
        document.querySelector("#DetailsArea").style.display = "block";
    }
});

$('.FA-ResetButton').click(function () {
    ResetFilters();
    FilterResults();
});



$(filterDisplay).change(function () {
    if (filterDisplay.value == "(Public or Private)") {
        filterCheck[0] = "false";
        FilterCheck();
        filterDisplay.style.background = "#171d2c";
    } else {
        filterCheck[0] = "true";
        FilterCheck();
        filterDisplay.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterBall).change(function () {
    if (filterBall.value == "(Any Ball)") {
        filterCheck[1] = "false";
        FilterCheck();
        filterBall.style.background = "#171d2c";
    } else {
        filterCheck[1] = "true";
        FilterCheck();
        filterBall.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterGender).change(function () {
    if (filterGender.value == "(Any Gender)") {
        filterCheck[2] = "false";
        FilterCheck();
        filterGender.style.background = "#171d2c";
    } else {
        filterCheck[2] = "true";
        FilterCheck();
        filterGender.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterShiny).change(function () {
    if (filterShiny.value == "(Any Shiny or Normal)") {
        filterCheck[3] = "false";
        FilterCheck();
        filterShiny.style.background = "#171d2c";
    } else {
        filterCheck[3] = "true";
        FilterCheck();
        filterShiny.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterMint).change(function () {
    if (filterMint.value == "(Any or No Mint") {
        filterCheck[4] = "false";
        FilterCheck();
        filterMint.style.background = "#171d2c";
    } else {
        filterCheck[4] = "true";
        FilterCheck();
        filterMint.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterMisc).change(function () {
    if (filterMisc.value == "(No Misc)") {
        filterCheck[5] = "false";
        FilterCheck();
        filterMisc.style.background = "#171d2c";
    } else {
        filterCheck[5] = "true";
        FilterCheck();
        filterMisc.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterMark).change(function () {
    if (filterMark.value == "(Any or No Mark)") {
        filterCheck[6] = "false";
        FilterCheck();
        filterMark.style.background = "#171d2c";
    } else {
        filterCheck[6] = "true";
        FilterCheck();
        filterMark.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterType).change(function () {
    if (filterType.value == "(Any Type)") {
        filterCheck[7] = "false";
        FilterCheck();
        filterType.style.background = "#171d2c";
    } else {
        filterCheck[7] = "true";
        FilterCheck();
        filterType.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterRibbon).change(function () {
    if (filterRibbon.value == "(Any or No Ribbon)") {
        filterCheck[8] = "false";
        FilterCheck();
        filterRibbon.style.background = "#171d2c";
    } else {
        filterCheck[8] = "true";
        FilterCheck();
        filterRibbon.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterLanguage).change(function () {
    if (filterLanguage.value == "ANY") {
        filterCheck[9] = "false";
        FilterCheck();
        filterLanguage.style.background = "#171d2c";
    } else {
        filterCheck[9] = "true";
        FilterCheck();
        filterLanguage.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterNature).change(function () {
    if (filterNature.value == "(Any Nature)") {
        filterCheck[10] = "false";
        FilterCheck();
        filterNature.style.background = "#171d2c";
    } else {
        filterCheck[10] = "true";
        FilterCheck();
        filterNature.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterAbility).change(function () {
    if (filterAbility.value == "(Any Ability") {
        filterCheck[11] = "false";
        FilterCheck();
        filterAbility.style.background = "#171d2c";
    } else {
        filterCheck[11] = "true";
        FilterCheck();
        filterAbility.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterStatus).change(function () {
    if (filterStatus.value == "(Any Status)") {
        filterCheck[12] = "false";
        FilterCheck();
        filterStatus.style.background = "#171d2c";
    } else {
        filterCheck[12] = "true";
        FilterCheck();
        filterStatus.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvent).change(function () {
    if (filterEvent.value == "(Any or No Mark)") {
        filterCheck[13] = "false";
        FilterCheck();
        filterEvent.style.background = "#171d2c";
    } else {
        filterCheck[13] = "true";
        FilterCheck();
        filterEvent.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterMove).change(function () {
    if (filterMove.value == "(Any Move)") {
        filterCheck[14] = "false";
        FilterCheck();
        filterMove.style.background = "#171d2c";
    } else {
        filterCheck[14] = "true";
        FilterCheck();
        filterMove.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterHowObtained).change(function () {
    if (filterHowObtained.value == "(Any Method)") {
        filterCheck[15] = "false";
        FilterCheck();
        filterHowObtained.style.background = "#171d2c";
    } else {
        filterCheck[15] = "true";
        FilterCheck();
        filterHowObtained.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterGameObtained).change(function () {
    if (filterGameObtained.value == "(Any Game)") {
        filterCheck[16] = "false";
        FilterCheck();
        filterGameObtained.style.background = "#171d2c";
    } else {
        filterCheck[16] = "true";
        FilterCheck();
        filterGameObtained.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterNote).change(function () {
    if (filterNote.value == "(Any/No Note)") {
        filterCheck[17] = "false";
        FilterCheck();
        filterNote.style.background = "#171d2c";
    } else {
        filterCheck[17] = "true";
        FilterCheck();
        filterNote.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterProof).change(function () {
    if (filterProof.value == "(Any/No Proof)") {
        filterCheck[18] = "false";
        FilterCheck();
        filterProof.style.background = "#171d2c";
    } else {
        filterCheck[18] = "true";
        FilterCheck();
        filterProof.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterOT).keyup(function () {
    if (filterOT.value == "") {
        filterCheck[19] = "false";
        FilterCheck();
        filterOT.style.background = "#171d2c";
    } else {
        filterCheck[19] = "true";
        FilterCheck();
        filterOT.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterID).keyup(function () {
    if (filterID.value == "") {
        filterCheck[20] = "false";
        FilterCheck();
        filterID.style.background = "#171d2c";
    } else {
        filterCheck[20] = "true";
        FilterCheck();
        filterID.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvHP).change(function () {
    if (filterIvHP.value == "X") {
        filterCheck[21] = "false";
        FilterCheck();
        filterIvHP.style.background = "#171d2c";
    } else {
        filterCheck[21] = "true";
        FilterCheck();
        filterIvHP.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvAtt).change(function () {
    if (filterIvAtt.value == "X") {
        filterCheck[22] = "false";
        FilterCheck();
        filterIvAtt.style.background = "#171d2c";
    } else {
        filterCheck[22] = "true";
        FilterCheck();
        filterIvAtt.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvDef).change(function () {
    if (filterIvDef.value == "X") {
        filterCheck[23] = "false";
        FilterCheck();
        filterIvDef.style.background = "#171d2c";
    } else {
        filterCheck[23] = "true";
        FilterCheck();
        filterIvDef.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvSpa).change(function () {
    if (filterIvSpa.value == "X") {
        filterCheck[24] = "false";
        FilterCheck();
        filterIvSpa.style.background = "#171d2c";
    } else {
        filterCheck[24] = "true";
        FilterCheck();
        filterIvSpa.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvSpd).change(function () {
    if (filterIvSpd.value == "X") {
        filterCheck[25] = "false";
        FilterCheck();
        filterIvSpd.style.background = "#171d2c";
    } else {
        filterCheck[25] = "true";
        FilterCheck();
        filterIvSpd.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvSpe).change(function () {
    if (filterIvSpe.value == "X") {
        filterCheck[26] = "false";
        FilterCheck();
        filterIvSpe.style.background = "#171d2c";
    } else {
        filterCheck[26] = "true";
        FilterCheck();
        filterIvSpe.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvHP).change(function () {
    if (filterEvHP.value == "X") {
        filterCheck[27] = "false";
        FilterCheck();
        filterEvHP.style.background = "#171d2c";
    } else {
        filterCheck[27] = "true";
        FilterCheck();
        filterEvHP.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvAtt).change(function () {
    if (filterEvAtt.value == "X") {
        filterCheck[28] = "false";
        FilterCheck();
        filterEvAtt.style.background = "#171d2c";
    } else {
        filterCheck[28] = "true";
        FilterCheck();
        filterEvAtt.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvDef).change(function () {
    if (filterEvDef.value == "X") {
        filterCheck[29] = "false";
        FilterCheck();
        filterEvDef.style.background = "#171d2c";
    } else {
        filterCheck[29] = "true";
        FilterCheck();
        filterEvDef.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvSpa).change(function () {
    if (filterEvSpa.value == "X") {
        filterCheck[30] = "false";
        FilterCheck();
        filterEvSpa.style.background = "#171d2c";
    } else {
        filterCheck[30] = "true";
        FilterCheck();
        filterEvSpa.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvSpd).change(function () {
    if (filterEvSpd.value == "X") {
        filterCheck[31] = "false";
        FilterCheck();
        filterEvSpd.style.background = "#171d2c";
    } else {
        filterCheck[31] = "true";
        FilterCheck();
        filterEvSpd.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvSpe).change(function () {
    if (filterEvSpe.value == "X") {
        filterCheck[32] = "false";
        FilterCheck();
        filterEvSpe.style.background = "#171d2c";
    } else {
        filterCheck[32] = "true";
        FilterCheck();
        filterEvSpe.style.background = "#434f66";
    }
    //ShowLoading();
    FilterResults();
});

$('.FA-Gen6').click(function () {
    if (filterGen6 == "") {
        filterGen6 = "Available";
        filterCheck[33] = "true";
        FilterCheck();
        document.querySelector(".FA-Gen6").style.backgroundColor = "#185c2e";
    } else {
        filterGen6 = "";
        filterCheck[33] = "false";
        FilterCheck();
        document.querySelector(".FA-Gen6").style.background = "#171d2c";
    }
    //ShowLoading();
    FilterResults();
});

$('.FA-Gen7').click(function () {
    if (filterGen7 == "") {
        filterGen7 = "Available";
        filterCheck[34] = "true";
        FilterCheck();
        document.querySelector(".FA-Gen7").style.backgroundColor = "#185c2e";
    } else {
        filterGen7 = "";
        filterCheck[34] = "false";
        FilterCheck();
        document.querySelector(".FA-Gen7").style.background = "#171d2c";
    }
    //ShowLoading();
    FilterResults();
});

$('.FA-Gen8').click(function () {
    if (filterGen8 == "") {
        filterGen8 = "Available";
        filterCheck[35] = "true";
        FilterCheck();
        document.querySelector(".FA-Gen8").style.backgroundColor = "#185c2e";
    } else {
        filterGen8 = "";
        filterCheck[35] = "false";
        FilterCheck();
        document.querySelector(".FA-Gen8").style.background = "#171d2c";
    }
    //ShowLoading();
    FilterResults();
});

$('.FA-Home').click(function () {
    if (filterHome == "") {
        filterHome = "Available";
        filterCheck[36] = "true";
        FilterCheck();
        document.querySelector(".FA-Home").style.backgroundColor = "#185c2e";
    } else {
        filterHome = "";
        filterCheck[36] = "false";
        FilterCheck();
        document.querySelector(".FA-Home").style.background = "#171d2c";
    }
    //ShowLoading();
    FilterResults();
});


function FilterCheck() {
    document.querySelector(".SA-FiltersButton").style.backgroundColor = "#171d2c";
    filtersApplied = false;
    for (let i = 0; i < filterCheck.length; i++) {
        if (filterCheck[i] != "false") {
            filtersApplied = true;
            document.querySelector(".SA-FiltersButton").style.backgroundColor = "#341a39";
        }
    }
}

function PostGenerateSelection() {
    if (bunchname != "" || filtersApplied == true || searchPokemonText.value != "") {
        $.post(url + "/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, offset: selectionOffset.value, limit: selectionLimit.value, searchbar: searchPokemonText.value, tradeOption: tradeOption, bunchname: bunchname, ball: filterBall.value, gender: filterGender.value, shiny: filterShiny.value, mint: filterMint.value, misc: filterMisc.value, mark: filterMark.value, lang: filterLanguage.value, OT: filterOT.value, ID: filterID.value, gen6: filterGen6, gen7: filterGen7, gen8: filterGen8, home: filterHome, nature: filterNature.value, ability: filterAbility.value, status: filterStatus.value, event: filterEvent.value, move: filterMove.value, howObtained: filterHowObtained.value, gameObtained: filterGameObtained.value, display: filterDisplay.value, note: filterNote.value, proof: filterProof.value, ivhp: filterIvHP.value, ivatt: filterIvAtt.value, ivdef: filterIvDef.value, ivspa: filterIvSpa.value, ivspd: filterIvSpd.value, ivspe: filterIvSpe.value, evhp: filterEvHP.value, evatt: filterEvAtt.value, evdef: filterEvDef.value, evspa: filterEvSpa.value, evspd: filterEvSpd.value, evspe: filterEvSpe.value }, GenerateSelection);
        console.log(bunchname);
    } else {
        HideLoading();
    }
}

function ResetFilters() {
    filterDisplay.value = "(Public or Private)";
    filterDisplay.style.background = "#171d2c";
    filterBall.value = "(Any Ball)";
    filterBall.style.background = "#171d2c";
    filterGender.value = "(Any Gender)";
    filterGender.style.background = "#171d2c";
    filterShiny.value = "(Any Shiny or Normal)";
    filterShiny.style.background = "#171d2c";
    filterMint.value = "(Any or No Mint)";
    filterMint.style.background = "#171d2c";
    filterMisc.value = "(No Misc)";
    filterMisc.style.background = "#171d2c";
    filterMark.value = "(Any or No Mark)";
    filterMark.style.background = "#171d2c";
    filterType.value = "(Any Type)";
    filterType.style.background = "#171d2c";
    filterRibbon.value = "(Any or No Ribbon)";
    filterRibbon.style.background = "#171d2c";
    filterLanguage.value = "ANY";
    filterLanguage.style.background = "#171d2c";
    filterNature.value = "(Any Nature)";
    filterNature.style.background = "#171d2c";
    filterAbility.value = "(Any Ability)";
    filterAbility.style.background = "#171d2c";
    filterStatus.value = "(Any Status)";
    filterStatus.style.background = "#171d2c";
    filterEvent.value = "(Any/No Event)";
    filterEvent.style.background = "#171d2c";
    filterMove.value = "(Any Move)";
    filterMove.style.background = "#171d2c";
    filterHowObtained.value = "(Any Method)";
    filterHowObtained.style.background = "#171d2c";
    filterGameObtained.value = "(Any Game)";
    filterGameObtained.style.background = "#171d2c";
    filterNote.value = "(Any/No Note)";
    filterNote.style.background = "#171d2c";
    filterProof.value = "(Any/No Proof)";
    filterProof.style.background = "#171d2c";
    filterOT.value = "";
    filterOT.style.background = "#171d2c";
    filterID.value = "";
    filterID.style.background = "#171d2c";
    filterIvHP.value = "X";
    filterIvHP.style.background = "#171d2c";
    filterIvAtt.value = "X";
    filterIvAtt.style.background = "#171d2c";
    filterIvDef.value = "X";
    filterIvDef.style.background = "#171d2c";
    filterIvSpa.value = "X";
    filterIvSpa.style.background = "#171d2c";
    filterIvSpd.value = "X";
    filterIvSpd.style.background = "#171d2c";
    filterIvSpe.value = "X";
    filterIvSpe.style.background = "#171d2c";
    filterEvHP.value = "X";
    filterEvHP.style.background = "#171d2c";
    filterEvAtt.value = "X";
    filterEvAtt.style.background = "#171d2c";
    filterEvDef.value = "X";
    filterEvDef.style.background = "#171d2c";
    filterEvSpa.value = "X";
    filterEvSpa.style.background = "#171d2c";
    filterEvSpd.value = "X";
    filterEvSpd.style.background = "#171d2c";
    filterEvSpe.value = "X";
    filterEvSpe.style.background = "#171d2c";

    filterGen6 = "";
    document.querySelector(".FA-Gen6").style.background = "#171d2c";
    filterGen7 = "";
    document.querySelector(".FA-Gen7").style.background = "#171d2c";
    filterGen8 = "";
    document.querySelector(".FA-Gen8").style.background = "#171d2c";
    filterHome = "";
    document.querySelector(".FA-Home").style.background = "#171d2c";

    for (let i = 0; i < filterCheck.length; i++) {
        filterCheck[i] = "false";
    }

    FilterCheck();
}

function FilterResults() {
    for (let i = 0; i < arrayData["Rows"].length; i++) {
        passedFilter = true;
        if (searchPokemonText.value == "") {

        } else if (arrayData["Rows"][i].pokemon.toLowerCase().includes(searchPokemonText.value.toLowerCase())) {

        } else {
            passedFilter = false;
        }

        if (filterDisplay.value == "(Public or Private)") {

        } else if (arrayData["Rows"][i].display == filterDisplay.value) {

        } else {
            passedFilter = false;
        }

        if (filterBall.value == "(Any Ball)") {

        } else if (arrayData["Rows"][i].pokeball == filterBall.value) {

        } else {
            passedFilter = false;
        }

        if (filterGender.value == "(Any Gender)") {

        } else if (arrayData["Rows"][i].gender == filterGender.value) {

        } else {
            passedFilter = false;
        }

        if (filterShiny.value == "(Any Shiny or Normal)") {

        } else if (arrayData["Rows"][i].shiny == filterShiny.value) {

        } else if (filterShiny.value == "Any Shiny") {
            if (arrayData["Rows"][i].shiny != "Any Shiny" && arrayData["Rows"][i].shiny != "Star Shiny" && arrayData["Rows"][i].shiny != "Square Shiny") {
                passedFilter = false;
            }

        } else {
            passedFilter = false;
        }

        if (filterMint.value == "(Any or No Mint)") {

        } else if (arrayData["Rows"][i].mint == filterMint.value) {

        } else {
            passedFilter = false;
        }

        if (filterMisc.value == "(No Misc)") {

        } else if (arrayData["Rows"][i].misc == filterMisc.value) {

        } else {
            passedFilter = false;
        }

        if (filterMark.value == "(Any or No Mark)") {

        } else if (arrayData["Rows"][i].mark == filterMark.value) {

        } else {
            passedFilter = false;
        }

        if (filterType.value == "(Any Type)") {

        } else if (filterType.value != "(Any Type)") {
            for (let j = 0; j < pokemonDataArray.length; j++) {
                if (arrayData["Rows"][i].pokemon == "Meowstic" || arrayData["Rows"][i].pokemon == "Indeedee") {
                    if (arrayData["Rows"][i].pokemon + "-" + arrayData["Rows"][i].gender == pokemonDataArray[j].pokemon) {
                        if (pokemonDataArray[j].type_1 == filterType.value || pokemonDataArray[j].type_2 == filterType.value) {
                            break;
                        } else {
                            passedFilter = false;
                        }
                    }

                }
                else if (arrayData["Rows"][i].pokemon == pokemonDataArray[j].pokemon) {
                    if (pokemonDataArray[j].type_1 == filterType.value || pokemonDataArray[j].type_2 == filterType.value) {
                        break;
                    } else {
                        passedFilter = false;
                    }
                }
            }
        } else {
            passedFilter = false;
        }

        if (filterRibbon.value == "(Any or No Ribbon)") {

        } else if (arrayData["Rows"][i].ribbons.includes(filterRibbon.value)) {

        } else {
            passedFilter = false;
        }

        if (filterLanguage.value == "ANY") {

        } else if (arrayData["Rows"][i].language == filterLanguage.value) {

        } else {
            passedFilter = false;
        }

        if (filterNature.value == "(Any Nature)") {

        } else if (arrayData["Rows"][i].nature == filterNature.value) {

        } else {
            passedFilter = false;
        }

        if (filterAbility.value == "(Any Ability)") {

        } else if (arrayData["Rows"][i].ability == filterAbility.value) {

        } else {
            passedFilter = false;
        }

        if (filterStatus.value == "(Any Status)") {

        } else if (arrayData["Rows"][i].status == filterStatus.value) {

        } else {
            passedFilter = false;
        }

        if (filterEvent.value == "(Any/No Event)") {

        } else if (arrayData["Rows"][i].event_info == filterEvent.value) {

        } else {
            passedFilter = false;
        }

        if (filterMove.value == "(Any Move)") {

        } else if (arrayData["Rows"][i].move_1 == filterMove.value || arrayData["Rows"][i].move_2 == filterMove.value || arrayData["Rows"][i].move_3 == filterMove.value || arrayData["Rows"][i].move_4 == filterMove.value || arrayData["Rows"][i].legacy_move_1 == filterMove.value || arrayData["Rows"][i].legacy_move_2 == filterMove.value || arrayData["Rows"][i].legacy_move_3 == filterMove.value || arrayData["Rows"][i].legacy_move_4 == filterMove.value) {

        } else {
            passedFilter = false;
        }

        if (filterHowObtained.value == "(Any Method)") {

        } else if (arrayData["Rows"][i].how_obtained == filterHowObtained.value) {

        } else {
            passedFilter = false;
        }

        if (filterGameObtained.value == "(Any Game)") {

        } else if (arrayData["Rows"][i].game_obtained == filterGameObtained.value) {

        } else {
            passedFilter = false;
        }

        if (filterNote.value == "(Any/No Note)") {

        } else if (arrayData["Rows"][i].note == "" && filterNote.value == "(No Note)") {

        } else if (arrayData["Rows"][i].note != "" && filterNote.value == "Has Note") {

        } else {
            passedFilter = false;
        }

        if (filterProof.value == "(Any/No Proof)") {

        } else if (arrayData["Rows"][i].proof == "" && filterProof.value == "(No Proof)") {

        } else if (arrayData["Rows"][i].proof != "" && filterProof.value == "Proof") {

        } else {
            passedFilter = false;
        }

        if (filterID.value == "") {

        } else if (arrayData["Rows"][i].game_id == filterID.value) {

        } else {
            passedFilter = false;
        }

        if (filterOT.value == "") {

        } else if (arrayData["Rows"][i].game_ot == filterOT.value) {

        } else {
            passedFilter = false;
        }

        if (filterIvHP.value == "X") {

        } else if (arrayData["Rows"][i].iv_hp == filterIvHP.value) {

        } else {
            passedFilter = false;
        }

        if (filterIvAtt.value == "X") {

        } else if (arrayData["Rows"][i].iv_att == filterIvAtt.value) {

        } else {
            passedFilter = false;
        }

        if (filterIvDef.value == "X") {

        } else if (arrayData["Rows"][i].iv_def == filterIvDef.value) {

        } else {
            passedFilter = false;
        }

        if (filterIvSpa.value == "X") {

        } else if (arrayData["Rows"][i].iv_spa == filterIvSpa.value) {

        } else {
            passedFilter = false;
        }

        if (filterIvSpd.value == "X") {

        } else if (arrayData["Rows"][i].iv_spd == filterIvSpd.value) {

        } else {
            passedFilter = false;
        }

        if (filterIvSpe.value == "X") {

        } else if (arrayData["Rows"][i].iv_spe == filterIvSpe.value) {

        } else {
            passedFilter = false;
        }

        if (filterEvHP.value == "X") {

        } else if (arrayData["Rows"][i].ev_hp == filterEvHP.value) {

        } else {
            passedFilter = false;
        }

        if (filterEvAtt.value == "X") {

        } else if (arrayData["Rows"][i].ev_att == filterEvAtt.value) {

        } else {
            passedFilter = false;
        }

        if (filterEvDef.value == "X") {

        } else if (arrayData["Rows"][i].ev_def == filterEvDef.value) {

        } else {
            passedFilter = false;
        }

        if (filterEvSpa.value == "X") {

        } else if (arrayData["Rows"][i].ev_spa == filterEvSpa.value) {

        } else {
            passedFilter = false;
        }

        if (filterEvSpd.value == "X") {

        } else if (arrayData["Rows"][i].ev_spd == filterEvSpd.value) {

        } else {
            passedFilter = false;
        }

        if (filterEvSpe.value == "X") {

        } else if (arrayData["Rows"][i].ev_spe == filterEvSpe.value) {

        } else {
            passedFilter = false;
        }

        if (filterGen6 == "") {

        } else if (arrayData["Rows"][i].gen6_availability == filterGen6) {

        } else {
            passedFilter = false;
        }

        if (filterGen7 == "") {

        } else if (arrayData["Rows"][i].gen7_availability == filterGen7) {

        } else {
            passedFilter = false;
        }

        if (filterGen8 == "") {

        } else if (arrayData["Rows"][i].gen8_availability == filterGen8) {

        } else {
            passedFilter = false;
        }

        if (filterHome == "") {

        } else if (arrayData["Rows"][i].home_availability == filterHome) {

        } else {
            passedFilter = false;
        }

        if (passedFilter) {
            document.getElementById("GenerationGridDiv" + (i)).style.display = "flex";
        } else {
            document.getElementById("GenerationGridDiv" + (i)).style.display = "none";
        }
    }
}