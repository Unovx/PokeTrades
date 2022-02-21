filterCheck = new Array("false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false", "false");
filtersApplied = false;

filterDisplay = document.querySelector(".FA-FilterDisplay");
filterBall = document.querySelector(".FA-FilterBall");
filterGender = document.querySelector(".FA-FilterGender");
filterShiny = document.querySelector(".FA-FilterShiny");
filterMint = document.querySelector(".FA-FilterMint");
filterMisc = document.querySelector(".FA-FilterMisc");
filterMark = document.querySelector(".FA-FilterMark");
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
    } else {
        filterCheck[0] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterBall).change(function () {
    if (filterBall.value == "(Any Ball)") {
        filterCheck[1] = "false";
        FilterCheck();
    } else {
        filterCheck[1] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterGender).change(function () {
    if (filterGender.value == "(Any Gender)") {
        filterCheck[2] = "false";
        FilterCheck();
    } else {
        filterCheck[2] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterShiny).change(function () {
    if (filterShiny.value == "(Any Shiny or Normal)") {
        filterCheck[3] = "false";
        FilterCheck();
    } else {
        filterCheck[3] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterMint).change(function () {
    if (filterMint.value == "(Any or No Mint") {
        filterCheck[4] = "false";
        FilterCheck();
    } else {
        filterCheck[4] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterMisc).change(function () {
    if (filterMisc.value == "(No Misc)") {
        filterCheck[5] = "false";
        FilterCheck();
    } else {
        filterCheck[5] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterMark).change(function () {
    if (filterMark.value == "(Any or No Mark)") {
        filterCheck[6] = "false";
        FilterCheck();
    } else {
        filterCheck[6] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterLanguage).change(function () {
    if (filterLanguage.value == "ANY") {
        filterCheck[7] = "false";
        FilterCheck();
    } else {
        filterCheck[7] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterNature).change(function () {
    if (filterNature.value == "(Any Nature)") {
        filterCheck[8] = "false";
        FilterCheck();
    } else {
        filterCheck[8] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterAbility).change(function () {
    if (filterAbility.value == "(Any Ability") {
        filterCheck[9] = "false";
        FilterCheck();
    } else {
        filterCheck[9] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterStatus).change(function () {
    if (filterStatus.value == "(Any Status)") {
        filterCheck[10] = "false";
        FilterCheck();
    } else {
        filterCheck[10] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvent).change(function () {
    if (filterEvent.value == "(Any or No Mark)") {
        filterCheck[11] = "false";
        FilterCheck();
    } else {
        filterCheck[11] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterMove).change(function () {
    if (filterMove.value == "(Any Move)") {
        filterCheck[12] = "false";
        FilterCheck();
    } else {
        filterCheck[12] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterHowObtained).change(function () {
    if (filterHowObtained.value == "(Any Method)") {
        filterCheck[13] = "false";
        FilterCheck();
    } else {
        filterCheck[13] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterGameObtained).change(function () {
    if (filterGameObtained.value == "(Any Game)") {
        filterCheck[14] = "false";
        FilterCheck();
    } else {
        filterCheck[14] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterNote).change(function () {
    if (filterNote.value == "(Any/No Note)") {
        filterCheck[15] = "false";
        FilterCheck();
    } else {
        filterCheck[15] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterProof).change(function () {
    if (filterProof.value == "(Any/No Proof)") {
        filterCheck[16] = "false";
        FilterCheck();
    } else {
        filterCheck[16] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterOT).keyup(function () {
    if (filterOT.value == "") {
        filterCheck[17] = "false";
        FilterCheck();
    } else {
        filterCheck[17] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterID).keyup(function () {
    if (filterID.value == "") {
        filterCheck[18] = "false";
        FilterCheck();
    } else {
        filterCheck[18] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvHP).change(function () {
    if (filterIvHP.value == "X") {
        filterCheck[19] = "false";
        FilterCheck();
    } else {
        filterCheck[19] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvAtt).change(function () {
    if (filterIvAtt.value == "X") {
        filterCheck[20] = "false";
        FilterCheck();
    } else {
        filterCheck[20] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvDef).change(function () {
    if (filterIvDef.value == "X") {
        filterCheck[21] = "false";
        FilterCheck();
    } else {
        filterCheck[21] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvSpa).change(function () {
    if (filterIvSpa.value == "X") {
        filterCheck[22] = "false";
        FilterCheck();
    } else {
        filterCheck[22] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvSpd).change(function () {
    if (filterIvSpd.value == "X") {
        filterCheck[23] = "false";
        FilterCheck();
    } else {
        filterCheck[23] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterIvSpe).change(function () {
    if (filterIvSpe.value == "X") {
        filterCheck[24] = "false";
        FilterCheck();
    } else {
        filterCheck[24] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvHP).change(function () {
    if (filterEvHP.value == "X") {
        filterCheck[25] = "false";
        FilterCheck();
    } else {
        filterCheck[25] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvAtt).change(function () {
    if (filterEvAtt.value == "X") {
        filterCheck[26] = "false";
        FilterCheck();
    } else {
        filterCheck[26] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvDef).change(function () {
    if (filterEvDef.value == "X") {
        filterCheck[27] = "false";
        FilterCheck();
    } else {
        filterCheck[27] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvSpa).change(function () {
    if (filterEvSpa.value == "X") {
        filterCheck[28] = "false";
        FilterCheck();
    } else {
        filterCheck[28] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvSpd).change(function () {
    if (filterEvSpd.value == "X") {
        filterCheck[29] = "false";
        FilterCheck();
    } else {
        filterCheck[29] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$(filterEvSpe).change(function () {
    if (filterEvSpe.value == "X") {
        filterCheck[30] = "false";
        FilterCheck();
    } else {
        filterCheck[30] = "true";
        FilterCheck();
    }
    //ShowLoading();
    FilterResults();
});

$('.FA-Gen6').click(function () {
    if (filterGen6 == "") {
        filterGen6 = "Available";
        filterCheck[31] = "true";
        FilterCheck();
        document.querySelector(".FA-Gen6").style.backgroundColor = "#36E26E";
    } else {
        filterGen6 = "";
        filterCheck[31] = "false";
        FilterCheck();
        document.querySelector(".FA-Gen6").style.backgroundColor = "#EFEFEF";
    }
    //ShowLoading();
    FilterResults();
});

$('.FA-Gen7').click(function () {
    if (filterGen7 == "") {
        filterGen7 = "Available";
        filterCheck[32] = "true";
        FilterCheck();
        document.querySelector(".FA-Gen7").style.backgroundColor = "#36E26E";
    } else {
        filterGen7 = "";
        filterCheck[32] = "false";
        FilterCheck();
        document.querySelector(".FA-Gen7").style.backgroundColor = "#EFEFEF";
    }
    //ShowLoading();
    FilterResults();
});

$('.FA-Gen8').click(function () {
    if (filterGen8 == "") {
        filterGen8 = "Available";
        filterCheck[33] = "true";
        FilterCheck();
        document.querySelector(".FA-Gen8").style.backgroundColor = "#36E26E";
    } else {
        filterGen8 = "";
        filterCheck[33] = "false";
        FilterCheck();
        document.querySelector(".FA-Gen8").style.backgroundColor = "#EFEFEF";
    }
    //ShowLoading();
    FilterResults();
});

$('.FA-Home').click(function () {
    if (filterHome == "") {
        filterHome = "Available";
        filterCheck[34] = "true";
        FilterCheck();
        document.querySelector(".FA-Home").style.backgroundColor = "#36E26E";
    } else {
        filterHome = "";
        filterCheck[34] = "false";
        FilterCheck();
        document.querySelector(".FA-Home").style.backgroundColor = "#EFEFEF";
    }
    //ShowLoading();
    FilterResults();
});


function FilterCheck() {
    document.querySelector(".SA-FiltersButton").style.backgroundColor = "#EFEFEF";
    filtersApplied = false;
    for (let i = 0; i < filterCheck.length; i++) {
        if (filterCheck[i] != "false") {
            filtersApplied = true;
            document.querySelector(".SA-FiltersButton").style.backgroundColor = "orchid";
        }
    }
}

function PostGenerateSelection() {
    if (bunchname != "" || filtersApplied == true || searchPokemonText.value != "") {
        $.post(url + "/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, searchbar: searchPokemonText.value, tradeOption: tradeOption, bunchname: bunchname, ball: filterBall.value, gender: filterGender.value, shiny: filterShiny.value, mint: filterMint.value, misc: filterMisc.value, mark: filterMark.value, lang: filterLanguage.value, OT: filterOT.value, ID: filterID.value, gen6: filterGen6, gen7: filterGen7, gen8: filterGen8, home: filterHome, nature: filterNature.value, ability: filterAbility.value, status: filterStatus.value, event: filterEvent.value, move: filterMove.value, howObtained: filterHowObtained.value, gameObtained: filterGameObtained.value, display: filterDisplay.value, note: filterNote.value, proof: filterProof.value, ivhp: filterIvHP.value, ivatt: filterIvAtt.value, ivdef: filterIvDef.value, ivspa: filterIvSpa.value, ivspd: filterIvSpd.value, ivspe: filterIvSpe.value, evhp: filterEvHP.value, evatt: filterEvAtt.value, evdef: filterEvDef.value, evspa: filterEvSpa.value, evspd: filterEvSpd.value, evspe: filterEvSpe.value }, GenerateSelection);
        console.log(bunchname);
    } else {
        HideLoading();
    }
}

function ResetFilters() {
    filterDisplay.value = "(Public or Private)";
    filterBall.value = "(Any Ball)";
    filterGender.value = "(Any Gender)";
    filterShiny.value = "(Any Shiny or Normal)";
    filterMint.value = "(Any or No Mint)";
    filterMisc.value = "(No Misc)";
    filterMark.value = "(Any or No Mark)";
    filterLanguage.value = "ANY";
    filterNature.value = "(Any Nature)";
    filterAbility.value = "(Any Ability)";
    filterStatus.value = "(Any Status)";
    filterEvent.value = "(Any/No Event)";
    filterMove.value = "(Any Move)";
    filterHowObtained.value = "(Any Method)";
    filterGameObtained.value = "(Any Game)";
    filterNote.value = "(Any/No Note)";
    filterProof.value = "(Any/No Proof)";
    filterOT.value = "";
    filterID.value = "";
    filterIvHP.value = "X";
    filterIvAtt.value = "X";
    filterIvDef.value = "X";
    filterIvSpa.value = "X";
    filterIvSpd.value = "X";
    filterIvSpe.value = "X";
    filterEvHP.value = "X";
    filterEvAtt.value = "X";
    filterEvDef.value = "X";
    filterEvSpa.value = "X";
    filterEvSpd.value = "X";
    filterEvSpe.value = "X";

    filterGen6 = "";
    filterGen7 = "";
    filterGen8 = "";
    filterHome = "";

    for (let i = 0; i < filterCheck.length; i++) {
        filterCheck[i] = "false";
    }

    FilterCheck();
}

function FilterResults() {
    for (let i = 0; i < arrayData["Rows"].length; i++) {
        passedFilter = true;
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