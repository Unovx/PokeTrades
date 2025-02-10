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

    if (ctsSeaching && selectedPokemon == null) {
        document.querySelector("#CTSArea").style.display = "block";
    }
    else if (selectedPokemon == null) {
        document.querySelector("#PanelArea").style.display = "block";
        $.post(url + "/PHP/search_id.php", { searchID: searchInfoText }, TradeShopInfo);
    } else if (selectedPokemon != null) {
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
        filterDisplay.style.borderColor = "#575a87";
    } else {
        filterCheck[0] = "true";
        FilterCheck();
        filterDisplay.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterBall).change(function () {
    if (filterBall.value == "(Any Ball)") {
        filterCheck[1] = "false";
        FilterCheck();
        filterBall.style.borderColor = "#575a87";
    } else {
        filterCheck[1] = "true";
        FilterCheck();
        filterBall.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterGender).change(function () {
    if (filterGender.value == "(Any Gender)") {
        filterCheck[2] = "false";
        FilterCheck();
        filterGender.style.borderColor = "#575a87";
    } else {
        filterCheck[2] = "true";
        FilterCheck();
        filterGender.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterShiny).change(function () {
    if (filterShiny.value == "(Any Shiny or Normal)") {
        filterCheck[3] = "false";
        FilterCheck();
        filterShiny.style.borderColor = "#575a87";
    } else {
        filterCheck[3] = "true";
        FilterCheck();
        filterShiny.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterMint).change(function () {
    if (filterMint.value == "(Any or No Mint") {
        filterCheck[4] = "false";
        FilterCheck();
        filterMint.style.borderColor = "#575a87";
    } else {
        filterCheck[4] = "true";
        FilterCheck();
        filterMint.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterMisc).change(function () {
    if (filterMisc.value == "(No Misc)") {
        filterCheck[5] = "false";
        FilterCheck();
        filterMisc.style.borderColor = "#575a87";
    } else {
        filterCheck[5] = "true";
        FilterCheck();
        filterMisc.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterMark).change(function () {
    if (filterMark.value == "(Any or No Mark)") {
        filterCheck[6] = "false";
        FilterCheck();
        filterMark.style.borderColor = "#575a87";
    } else {
        filterCheck[6] = "true";
        FilterCheck();
        filterMark.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterType).change(function () {
    if (filterType.value == "(Any Type)") {
        filterCheck[7] = "false";
        FilterCheck();
        filterType.style.borderColor = "#575a87";
    } else {
        filterCheck[7] = "true";
        FilterCheck();
        filterType.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterRibbon).change(function () {
    if (filterRibbon.value == "(Any or No Ribbon)") {
        filterCheck[8] = "false";
        FilterCheck();
        filterRibbon.style.borderColor = "#575a87";
    } else {
        filterCheck[8] = "true";
        FilterCheck();
        filterRibbon.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterLanguage).change(function () {
    if (filterLanguage.value == "ANY") {
        filterCheck[9] = "false";
        FilterCheck();
        filterLanguage.style.borderColor = "#575a87";
    } else {
        filterCheck[9] = "true";
        FilterCheck();
        filterLanguage.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterNature).change(function () {
    if (filterNature.value == "(Any Nature)") {
        filterCheck[10] = "false";
        FilterCheck();
        filterNature.style.borderColor = "#575a87";
    } else {
        filterCheck[10] = "true";
        FilterCheck();
        filterNature.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterAbility).change(function () {
    if (filterAbility.value == "(Any Ability") {
        filterCheck[11] = "false";
        FilterCheck();
        filterAbility.style.borderColor = "#575a87";
    } else {
        filterCheck[11] = "true";
        FilterCheck();
        filterAbility.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterStatus).change(function () {
    if (filterStatus.value == "(Any Status)") {
        filterCheck[12] = "false";
        FilterCheck();
        filterStatus.style.borderColor = "#575a87";
    } else {
        filterCheck[12] = "true";
        FilterCheck();
        filterStatus.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvent).change(function () {
    if (filterEvent.value == "(Any or No Mark)") {
        filterCheck[13] = "false";
        FilterCheck();
        filterEvent.style.borderColor = "#575a87";
    } else {
        filterCheck[13] = "true";
        FilterCheck();
        filterEvent.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterMove).change(function () {
    if (filterMove.value == "(Any Move)") {
        filterCheck[14] = "false";
        FilterCheck();
        filterMove.style.borderColor = "#575a87";
    } else {
        filterCheck[14] = "true";
        FilterCheck();
        filterMove.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterHowObtained).change(function () {
    if (filterHowObtained.value == "(Any Method)") {
        filterCheck[15] = "false";
        FilterCheck();
        filterHowObtained.style.borderColor = "#575a87";
    } else {
        filterCheck[15] = "true";
        FilterCheck();
        filterHowObtained.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterGameObtained).change(function () {
    if (filterGameObtained.value == "(Any Game)") {
        filterCheck[16] = "false";
        FilterCheck();
        filterGameObtained.style.borderColor = "#575a87";
    } else {
        filterCheck[16] = "true";
        FilterCheck();
        filterGameObtained.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterNote).change(function () {
    if (filterNote.value == "(Any/No Note)") {
        filterCheck[17] = "false";
        FilterCheck();
        filterNote.style.borderColor = "#575a87";
    } else {
        filterCheck[17] = "true";
        FilterCheck();
        filterNote.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterProof).change(function () {
    if (filterProof.value == "(Any/No Proof)") {
        filterCheck[18] = "false";
        FilterCheck();
        filterProof.style.borderColor = "#575a87";
    } else {
        filterCheck[18] = "true";
        FilterCheck();
        filterProof.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterOT).keyup(function () {
    if (filterOT.value == "") {
        filterCheck[19] = "false";
        FilterCheck();
        filterOT.style.borderColor = "#575a87";
    } else {
        filterCheck[19] = "true";
        FilterCheck();
        filterOT.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterID).keyup(function () {
    if (filterID.value == "") {
        filterCheck[20] = "false";
        FilterCheck();
        filterID.style.borderColor = "#575a87";
    } else {
        filterCheck[20] = "true";
        FilterCheck();
        filterID.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvHP).change(function () {
    if (filterIvHP.value == "X") {
        filterCheck[21] = "false";
        FilterCheck();
        filterIvHP.style.borderColor = "#575a87";
    } else {
        filterCheck[21] = "true";
        FilterCheck();
        filterIvHP.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvAtt).change(function () {
    if (filterIvAtt.value == "X") {
        filterCheck[22] = "false";
        FilterCheck();
        filterIvAtt.style.borderColor = "#575a87";
    } else {
        filterCheck[22] = "true";
        FilterCheck();
        filterIvAtt.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvDef).change(function () {
    if (filterIvDef.value == "X") {
        filterCheck[23] = "false";
        FilterCheck();
        filterIvDef.style.borderColor = "#575a87";
    } else {
        filterCheck[23] = "true";
        FilterCheck();
        filterIvDef.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvSpa).change(function () {
    if (filterIvSpa.value == "X") {
        filterCheck[24] = "false";
        FilterCheck();
        filterIvSpa.style.borderColor = "#575a87";
    } else {
        filterCheck[24] = "true";
        FilterCheck();
        filterIvSpa.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvSpd).change(function () {
    if (filterIvSpd.value == "X") {
        filterCheck[25] = "false";
        FilterCheck();
        filterIvSpd.style.borderColor = "#575a87";
    } else {
        filterCheck[25] = "true";
        FilterCheck();
        filterIvSpd.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvSpe).change(function () {
    if (filterIvSpe.value == "X") {
        filterCheck[26] = "false";
        FilterCheck();
        filterIvSpe.style.borderColor = "#575a87";
    } else {
        filterCheck[26] = "true";
        FilterCheck();
        filterIvSpe.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvHP).change(function () {
    if (filterEvHP.value == "X") {
        filterCheck[27] = "false";
        FilterCheck();
        filterEvHP.style.borderColor = "#575a87";
    } else {
        filterCheck[27] = "true";
        FilterCheck();
        filterEvHP.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvAtt).change(function () {
    if (filterEvAtt.value == "X") {
        filterCheck[28] = "false";
        FilterCheck();
        filterEvAtt.style.borderColor = "#575a87";
    } else {
        filterCheck[28] = "true";
        FilterCheck();
        filterEvAtt.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvDef).change(function () {
    if (filterEvDef.value == "X") {
        filterCheck[29] = "false";
        FilterCheck();
        filterEvDef.style.borderColor = "#575a87";
    } else {
        filterCheck[29] = "true";
        FilterCheck();
        filterEvDef.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvSpa).change(function () {
    if (filterEvSpa.value == "X") {
        filterCheck[30] = "false";
        FilterCheck();
        filterEvSpa.style.borderColor = "#575a87";
    } else {
        filterCheck[30] = "true";
        FilterCheck();
        filterEvSpa.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvSpd).change(function () {
    if (filterEvSpd.value == "X") {
        filterCheck[31] = "false";
        FilterCheck();
        filterEvSpd.style.borderColor = "#575a87";
    } else {
        filterCheck[31] = "true";
        FilterCheck();
        filterEvSpd.style.borderColor = "#017f90";
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvSpe).change(function () {
    if (filterEvSpe.value == "X") {
        filterCheck[32] = "false";
        FilterCheck();
        filterEvSpe.style.borderColor = "#575a87";
    } else {
        filterCheck[32] = "true";
        FilterCheck();
        filterEvSpe.style.borderColor = "#017f90";
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
        document.querySelector(".FA-Gen6").style.borderColor = "#575a87";
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
        document.querySelector(".FA-Gen7").style.borderColor = "#575a87";
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
        document.querySelector(".FA-Gen8").style.borderColor = "#575a87";
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
        document.querySelector(".FA-Home").style.borderColor = "#575a87";
    }
    //ShowLoading();
    FilterResults();
});


function FilterCheck() {
    document.querySelector(".SA-FiltersButton").style.backgroundColor = "#1e1e1e";
    filtersApplied = false;
    for (let i = 0; i < filterCheck.length; i++) {
        if (filterCheck[i] != "false") {
            filtersApplied = true;
            document.querySelector(".SA-FiltersButton").style.backgroundColor = "#00381b";
        }
    }
}

function PostGenerateSelection() {
    if (bunchname != "" || filtersApplied == true || searchPokemonText.value != "") {
        $.post(url + "/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, offset: selectionOffset.value, limit: selectionLimit.value, searchbar: searchPokemonText.value, tradeOption: tradeOption, bunchname: bunchname }, GenerateSelection);
        console.log(bunchname);
    } else {
        HideLoading();
    }
}

function ResetFilters() {
    filterDisplay.value = "(Public or Private)";
    filterDisplay.style.borderColor = "#575a87";
    filterBall.value = "(Any Ball)";
    filterBall.style.borderColor = "#575a87";
    filterGender.value = "(Any Gender)";
    filterGender.style.borderColor = "#575a87";
    filterShiny.value = "(Any Shiny or Normal)";
    filterShiny.style.borderColor = "#575a87";
    filterMint.value = "(Any or No Mint)";
    filterMint.style.borderColor = "#575a87";
    filterMisc.value = "(No Misc)";
    filterMisc.style.borderColor = "#575a87";
    filterMark.value = "(Any or No Mark)";
    filterMark.style.borderColor = "#575a87";
    filterType.value = "(Any Type)";
    filterType.style.borderColor = "#575a87";
    filterRibbon.value = "(Any or No Ribbon)";
    filterRibbon.style.borderColor = "#575a87";
    filterLanguage.value = "ANY";
    filterLanguage.style.borderColor = "#575a87";
    filterNature.value = "(Any Nature)";
    filterNature.style.borderColor = "#575a87";
    filterAbility.value = "(Any Ability)";
    filterAbility.style.borderColor = "#575a87";
    filterStatus.value = "(Any Status)";
    filterStatus.style.borderColor = "#575a87";
    filterEvent.value = "(Any/No Event)";
    filterEvent.style.borderColor = "#575a87";
    filterMove.value = "(Any Move)";
    filterMove.style.borderColor = "#575a87";
    filterHowObtained.value = "(Any Method)";
    filterHowObtained.style.borderColor = "#575a87";
    filterGameObtained.value = "(Any Game)";
    filterGameObtained.style.borderColor = "#575a87";
    filterNote.value = "(Any/No Note)";
    filterNote.style.borderColor = "#575a87";
    filterProof.value = "(Any/No Proof)";
    filterProof.style.borderColor = "#575a87";
    filterOT.value = "";
    filterOT.style.borderColor = "#575a87";
    filterID.value = "";
    filterID.style.borderColor = "#575a87";
    filterIvHP.value = "X";
    filterIvHP.style.borderColor = "#575a87";
    filterIvAtt.value = "X";
    filterIvAtt.style.borderColor = "#575a87";
    filterIvDef.value = "X";
    filterIvDef.style.borderColor = "#575a87";
    filterIvSpa.value = "X";
    filterIvSpa.style.borderColor = "#575a87";
    filterIvSpd.value = "X";
    filterIvSpd.style.borderColor = "#575a87";
    filterIvSpe.value = "X";
    filterIvSpe.style.borderColor = "#575a87";
    filterEvHP.value = "X";
    filterEvHP.style.borderColor = "#575a87";
    filterEvAtt.value = "X";
    filterEvAtt.style.borderColor = "#575a87";
    filterEvDef.value = "X";
    filterEvDef.style.borderColor = "#575a87";
    filterEvSpa.value = "X";
    filterEvSpa.style.borderColor = "#575a87";
    filterEvSpd.value = "X";
    filterEvSpd.style.borderColor = "#575a87";
    filterEvSpe.value = "X";
    filterEvSpe.style.borderColor = "#575a87";

    filterGen6 = "";
    document.querySelector(".FA-Gen6").style.borderColor = "#575a87";
    filterGen7 = "";
    document.querySelector(".FA-Gen7").style.borderColor = "#575a87";
    filterGen8 = "";
    document.querySelector(".FA-Gen8").style.borderColor = "#575a87";
    filterHome = "";
    document.querySelector(".FA-Home").style.borderColor = "#575a87";

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

        }/* else if (arrayData["Rows"][i].game_obtained == filterGameObtained.value) {

        } else {
            passedFilter = false;
        }*/
        else {
            if (filterGameObtained.value == "R/G/B/Y") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Red" || arrayData["Rows"][i].game_obtained == "Green" || arrayData["Rows"][i].game_obtained == "Blue" || arrayData["Rows"][i].game_obtained == "Yellow") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "G/S/C") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Gold" || arrayData["Rows"][i].game_obtained == "Silver" || arrayData["Rows"][i].game_obtained == "Crystal") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "R/S/E") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Ruby" || arrayData["Rows"][i].game_obtained == "Sapphire" || arrayData["Rows"][i].game_obtained == "Emerald") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "FR/LG") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Fire Red" || arrayData["Rows"][i].game_obtained == "Leaf Green") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "Colo/XD") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Colosseum" || arrayData["Rows"][i].game_obtained == "XD Gale of Darkness") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "D/P/PT") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Diamond" || arrayData["Rows"][i].game_obtained == "Pearl" || arrayData["Rows"][i].game_obtained == "Platinum") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "HG/SS") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Heart Gold" || arrayData["Rows"][i].game_obtained == "Soul Silver") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "BW/BW2") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Black" || arrayData["Rows"][i].game_obtained == "White" || arrayData["Rows"][i].game_obtained == "Black 2" || arrayData["Rows"][i].game_obtained == "White 2") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "X/Y") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "X" || arrayData["Rows"][i].game_obtained == "Y") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "OR/AS") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Omega Ruby" || arrayData["Rows"][i].game_obtained == "Alpha Sapphire") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "SM/USUM") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Sun" || arrayData["Rows"][i].game_obtained == "Moon" || arrayData["Rows"][i].game_obtained == "Ultra Sun" || arrayData["Rows"][i].game_obtained == "Ultra Moon") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "LGP/LGE") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Let's Go Pikachu" || arrayData["Rows"][i].game_obtained == "Let's Go Eevee") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "SW/SH") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Sword" || arrayData["Rows"][i].game_obtained == "Shield") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "BD/SP") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Brilliant Diamond" || arrayData["Rows"][i].game_obtained == "Shining Pearl") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "LA") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Legends Arceus") {

                } else {
                    passedFilter = false;
                }
            }
            else if (filterGameObtained.value == "S/V") {
                if (arrayData["Rows"][i].game_obtained == filterGameObtained.value || arrayData["Rows"][i].game_obtained == "Scarlet" || arrayData["Rows"][i].game_obtained == "Violet") {

                } else {
                    passedFilter = false;
                }
            }
            else if (arrayData["Rows"][i].game_obtained != filterGameObtained.value) {
                passedFilter = false;
            }
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