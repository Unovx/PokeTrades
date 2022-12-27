var detailsLocked = false;
var creationInProgress = false;
var placingPokemon = false;
var pokemonDetails = [];
var tempPosition = 0;
AdditionalViewing1 = [];
AdditionalViewing2 = [];
AdditionalViewing3 = [];
AdditionalViewing4 = [];
AdditionalViewing5 = [];
AdditionalViewing6 = [];

var toggleOn = false;

var gameObtainedValue = "(Any Game)";
var langData = "ENG";
var ballData = "(Any Ball)";
var genderData = "(Any Gender)";
var shinyData = "(Any Shiny or Normal)";
var mintData = "(Any or No Mint)";
var miscData = "(No Misc)";
var markData = "(Any or No Mark)";
var ribbonData = new Array(103);
var ribbonString = "";
var gen6Data = "Not Available";
var gen7Data = "Not Available";
var gen8Data = "Not Available";
var homeData = "Not Available";
var pokemonData = "Abomasnow";

var creationID = "";
var userBunchArray;
var bunchSelection = document.querySelector(".DA-BunchDropdown");
var templateName = document.querySelector(".DA-TemplateName");
var templateSelection = document.querySelector(".DA-TemplateDropdown");
var pokemonSprite = document.querySelector(".DA-PokemonImage");
var pokemonSelection = document.querySelector(".DA-PokemonDropdown");
var nicknameSelection = document.querySelector(".DA-Nickname");
var natureSelection = document.querySelector(".DA-NatureDropdown");
var abilitySelection = document.querySelector(".DA-AbilityDropdown");
var otSelection = document.querySelector(".DA-OT");
var idSelection = document.querySelector(".DA-ID");
var statusSelection = document.querySelector(".DA-StatusDropdown");
var eventSelection = document.querySelector(".DA-EventDropdown");
//var ivHpSelection = document.querySelector(".DA-IvHP");
//var ivAttSelection = document.querySelector(".DA-IvAtt");
//var ivDefSelection = document.querySelector(".DA-IvDef");
//var ivSpaSelection = document.querySelector(".DA-IvSpa");
//var ivSpdSelection = document.querySelector(".DA-IvSpd");
//var ivSpeSelection = document.querySelector(".DA-IvSpe");
var ivHpSelection = document.querySelector(".DA-StatIVHP");
var ivAttSelection = document.querySelector(".DA-StatIVAtt");
var ivDefSelection = document.querySelector(".DA-StatIVDef");
var ivSpaSelection = document.querySelector(".DA-StatIVSpa");
var ivSpdSelection = document.querySelector(".DA-StatIVSpd");
var ivSpeSelection = document.querySelector(".DA-StatIVSpe");
//var evHpSelection = document.querySelector(".DA-EvHP");
//var evAttSelection = document.querySelector(".DA-EvAtt");
//var evDefSelection = document.querySelector(".DA-EvDef");
//var evSpaSelection = document.querySelector(".DA-EvSpa");
//var evSpdSelection = document.querySelector(".DA-EvSpd");
//var evSpeSelection = document.querySelector(".DA-EvSpe");
var evHpSelection = document.querySelector(".DA-StatEVHP");
var evAttSelection = document.querySelector(".DA-StatEVAtt");
var evDefSelection = document.querySelector(".DA-StatEVDef");
var evSpaSelection = document.querySelector(".DA-StatEVSpa");
var evSpdSelection = document.querySelector(".DA-StatEVSpd");
var evSpeSelection = document.querySelector(".DA-StatEVSpe");
var move1Selection = document.querySelector(".DA-Move1");
var move2Selection = document.querySelector(".DA-Move2");
var move3Selection = document.querySelector(".DA-Move3");
var move4Selection = document.querySelector(".DA-Move4");
var legacyMove1Selection = document.querySelector(".DA-LegacyMove1");
var legacyMove2Selection = document.querySelector(".DA-LegacyMove2");
var legacyMove3Selection = document.querySelector(".DA-LegacyMove3");
var legacyMove4Selection = document.querySelector(".DA-LegacyMove4");
var howObtainedSelection = document.querySelector(".DA-HowObtained");
var gameObtainedSelection = document.querySelector(".DA-GameObtained");
var displaySelection = document.querySelector(".DA-DisplayDropdown");
var proofSelection = document.querySelector(".DA-ProofURL");
var noteSelection = document.querySelector(".DA-Note");


let types = ['Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark']

calcHP = ivHpSelection.value;
calcAtt = ivAttSelection.value;
calcDef = ivDefSelection.value;
calcSpa = ivSpaSelection.value;
calcSpd = ivSpdSelection.value;
calcSpe = ivSpeSelection.value;

function calculateTypeHP(calcHP, calcAtt, calcDef, calcSpa, calcSpd, calcSpe) {
    let numerator = (calcHP & 1) + 2 * (calcAtt & 1) + 4 * (calcDef & 1) + 8 * (calcSpe & 1) + 16 * (calcSpa & 1) + 32 * (calcSpd & 1);
    numerator *= 15;
    return Math.floor(numerator / 63);
}

$(ivHpSelection).change(function () {
    SetHiddenPower();
    SetIVColours();
});

$(ivAttSelection).change(function () {
    SetHiddenPower();
    SetIVColours();
});

$(ivDefSelection).change(function () {
    SetHiddenPower();
    SetIVColours();
});

$(ivSpaSelection).change(function () {
    SetHiddenPower();
    SetIVColours();
});

$(ivSpdSelection).change(function () {
    SetHiddenPower();
    SetIVColours();
});

$(ivSpeSelection).change(function () {
    SetHiddenPower();
    SetIVColours();
});

$(natureSelection).change(function () {
    SetStatColour();
});


function SetHiddenPower() {
    if (!ivHpSelection.value.includes("X") && !ivHpSelection.value.includes("HT") && !ivAttSelection.value.includes("X") && !ivAttSelection.value.includes("HT") && !ivDefSelection.value.includes("X") && !ivDefSelection.value.includes("HT") && !ivSpaSelection.value.includes("X") && !ivSpaSelection.value.includes("HT") && !ivSpdSelection.value.includes("X") && !ivSpdSelection.value.includes("HT") && !ivSpeSelection.value.includes("X") && !ivSpeSelection.value.includes("HT") && miscData != "Gigantamax") {
        calcHP = ivHpSelection.value;
        calcAtt = ivAttSelection.value;
        calcDef = ivDefSelection.value;
        calcSpa = ivSpaSelection.value;
        calcSpd = ivSpdSelection.value;
        calcSpe = ivSpeSelection.value;
        console.log(types[calculateTypeHP(calcHP, calcAtt, calcDef, calcSpa, calcSpd, calcSpe)]);
        miscData = "HP " + types[calculateTypeHP(calcHP, calcAtt, calcDef, calcSpa, calcSpd, calcSpe)];
        document.querySelector(".DA-MiscIcon").src = url + "/Resources/Misc/" + miscData + ".png";
    }
}


$('.DA-Close').click(function () {
    pokemonDetails = null;
    if (selectedPokemon != null) {
        selectedPokemon.style.boxShadow = "rgb(0 0 0) 5px 5px 0px 1px";
        selectedPokemon.style.backgroundColor = "#343f5f";
    }
    selectedPokemon = null;
    //Looking for the element showing the additional details and turning them off and changing the height to normal.
    var cols = document.getElementsByClassName("insideDetails" + (storedValue));
    for (j = 0; j < cols.length; j++) {
        cols[j].style.display = "none";
    }
    if (storedValue != null) {
        document.getElementById("GenerationGridDiv" + (storedValue)).style.height = "100px";
    }
    storedValue = null;
    document.querySelector("#SelectionArea").style.width = "100%";
    document.querySelector("#DetailsArea").style.display = "none";
    if (ctsSeaching) {
        document.querySelector("#CTSArea").style.display = "block";
    }
    if (showingGiveaway) {
        showingGiveaway = false;
        document.querySelector("#DetailsArea").style.display = "none";
    }
    else if (document.querySelector("#InformationArea").style.display != "block") {
        document.querySelector("#PanelArea").style.display = "block";
    }
    //$.post(url + "/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
    creationInProgress = false;
    document.querySelector(".DA-TemplateName").value = "";
    CloseDetailOptions();
    ribbonData = new Array(103)
    ribbonString = "";
});

$('.DA-Place').click(function () {
    if (document.querySelector(".DA-Place").innerHTML == "Place") {
        document.querySelector(".DA-AdditionalViewings").style.pointerEvents = "none";
        document.querySelector(".DA-DetailsData").style.pointerEvents = "none";
        document.querySelector(".DA-Place").innerHTML = "Cancel";
        document.querySelector(".DA-PlaceInfo").style.display = "block";
        placingPokemon = true;
    } else {
        document.querySelector(".DA-AdditionalViewings").style.pointerEvents = "initial";
        document.querySelector(".DA-DetailsData").style.pointerEvents = "initial";
        document.querySelector(".DA-Place").innerHTML = "Place";
        document.querySelector(".DA-PlaceInfo").style.display = "none";
        placingPokemon = false;
    }

});

$('.DA-Save').click(function () {
    CreatePokemon();
    document.querySelector("#PanelArea").style.display = "block";
    document.querySelector(".DA-AdditionalViewings").style.pointerEvents = "initial";
    document.querySelector(".DA-Place").innerHTML = "Place";
});

$('.DA-Delete').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".ViewingConfirmDelete").style.display = "block";
});

$('.DA-Reset').click(function () {
    if (creationID != "") {
        ShowPokemonDetails();
    } else {
        if (templateSelection.value != "(No Template)") {
            LoadTemplate();
        } else {
            CreationReset();
        }
    }
});

$('.DA-Add').click(function () {
    $.post(url + "/PHP/add_selection.php", { token: token, creationID: pokemonDetails.creation_id });
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".ViewingPokemonAdded").style.display = "block";
    $.post(url + "/PHP/format_import.php", { token: token });
});

$('.DA-Lock').click(function () {
    if (detailsLocked == false) {
        detailsLocked = true;
        document.querySelector(".DA-Lock").innerHTML = "Open";
        ShowPokemonDetails();
        CloseDetailOptions();

    } else {
        detailsLocked = false;
        document.querySelector(".DA-Lock").innerHTML = "Lock";
        ShowPokemonDetails();
    }
});

$('.DA-ViewingHelp').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".ViewingAdditionalHelp").style.display = "block";
});

$('.DA-Username').click(function () {
    if (ctsSeaching) {
        document.querySelector(".PA-Searchbar").value = pokemonDetails.user_id;
        searchInfoText = pokemonDetails.user_id;
        localStorage.setItem('searchID', searchInfoText);
        CloseAll();
        document.querySelector("#MainArea").style.display = "block";
        document.querySelector("#PanelArea").style.display = "block";
        document.querySelector(".PA-TradeShopPanel").style.display = "block";
        document.querySelector("#MainArea").style.position = "fixed";
        $(".PA-Searchbar").keyup();
    }
});

$(".DA-PokemonImage").click(function () {
    IAPokemonDropdown.value = pokemonSelection.value;
    if (shinyData.includes("Normal")) {
        shinyStatus = "";
        document.querySelector(".IA-ShinySprite").setAttribute("src", url + "/Resources/Misc/X IV Icon.png");
    } else {
        shinyStatus = "-Shiny";
        document.querySelector(".IA-ShinySprite").setAttribute("src", url + "/Resources/Misc/Star Shiny.png");
    }
    $('.IA-PokemonDropdown').change();
    document.querySelector("#InformationArea").style.display = "block";
    document.querySelector("#DetailsArea").style.display = "none";
});

$('.DA-AddAV1').click(function () {
    SetAV1();
});

$('.DA-AddAV2').click(function () {
    SetAV2();
});

$('.DA-AddAV3').click(function () {
    SetAV3();
});

$('.DA-AddAV4').click(function () {
    SetAV4();
});

$('.DA-AddAV5').click(function () {
    SetAV5();
});

$('.DA-AddAV6').click(function () {
    SetAV6();
});

$('.DA-AV1').click(function () {
    if (document.querySelector(".DA-AV1").getAttribute("src") == url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV1();
        var cols = document.getElementsByClassName("insideDetails" + (storedValue));
        for (j = 0; j < cols.length; j++) {
            cols[j].style.display = "none";
        }
        AssigningOutline();
        $.post(url + "/PHP/modify_check_viewing.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
    }
});

$('.DA-AV2').click(function () {
    if (document.querySelector(".DA-AV2").getAttribute("src") == url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV2();
        var cols = document.getElementsByClassName("insideDetails" + (storedValue));
        for (j = 0; j < cols.length; j++) {
            cols[j].style.display = "none";
        }
        AssigningOutline();
        $.post(url + "/PHP/modify_check_viewing.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
    }
});

$('.DA-AV3').click(function () {
    if (document.querySelector(".DA-AV3").getAttribute("src") == url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV3();
        var cols = document.getElementsByClassName("insideDetails" + (storedValue));
        for (j = 0; j < cols.length; j++) {
            cols[j].style.display = "none";
        }
        AssigningOutline();
        $.post(url + "/PHP/modify_check_viewing.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
    }
});

$('.DA-AV4').click(function () {
    if (document.querySelector(".DA-AV4").getAttribute("src") == url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV4();
        var cols = document.getElementsByClassName("insideDetails" + (storedValue));
        for (j = 0; j < cols.length; j++) {
            cols[j].style.display = "none";
        }
        AssigningOutline();
        $.post(url + "/PHP/modify_check_viewing.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
    }
});

$('.DA-AV5').click(function () {
    if (document.querySelector(".DA-AV5").getAttribute("src") == url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV5();
        var cols = document.getElementsByClassName("insideDetails" + (storedValue));
        for (j = 0; j < cols.length; j++) {
            cols[j].style.display = "none";
        }
        AssigningOutline();
        $.post(url + "/PHP/modify_check_viewing.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
    }
});

$('.DA-AV6').click(function () {
    if (document.querySelector(".DA-AV6").getAttribute("src") == url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png") {
        ShowAV6();
        var cols = document.getElementsByClassName("insideDetails" + (storedValue));
        for (j = 0; j < cols.length; j++) {
            cols[j].style.display = "none";
        }
        AssigningOutline();
        $.post(url + "/PHP/modify_check_viewing.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
    }
});

$('.DA-TemplateHelp').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".TemplateHelpInfo").style.display = "block";
});

$('.DA-AddTemplate').click(function () {
    if (templateName.value != "" && templateName.value != "(No Template)") {
        var tempCreationID = "";
        for (let i = 0; i < templateOptionsArray.length; i++) {
            if (templateName.value == templateOptionsArray[i].name) {
                tempCreationID = templateOptionsArray[i].creation_id;
                break;
            }
        }
        $.post(url + "/PHP/create_or_update_template.php", { token: token, creationID: tempCreationID, name: templateName.value, lang: langData, gameOT: otSelection.value, gameID: idSelection.value, gen6: gen6Data, gen7: gen7Data, gen8: gen8Data, home: homeData, nature: natureSelection.value, status: statusSelection.value, event: eventSelection.value, howObtained: howObtainedSelection.value, gameObtained: gameObtainedSelection.value, display: displaySelection.value, ivhp: ivHpSelection.value, ivatt: ivAttSelection.value, ivdef: ivDefSelection.value, ivspa: ivSpaSelection.value, ivspd: ivSpdSelection.value, ivspe: ivSpeSelection.value, evhp: evHpSelection.value, evatt: evAttSelection.value, evdef: evDefSelection.value, evspa: evSpaSelection.value, evspd: evSpdSelection.value, evspe: evSpeSelection.value }, RefreshTemplateOptions);
        document.querySelector("#NotificationArea").style.display = "block";
        document.querySelector(".TemplateAdded").style.display = "block";
    } else {
        document.querySelector("#NotificationArea").style.display = "block";
        document.querySelector(".TemplateAddedError").style.display = "block";
    }
});

$('.DA-RemoveTemplate').click(function () {
    if (templateName.value != "" && templateName.value != "(No Template)") {
        var tempCreationID = "";
        for (let i = 0; i < templateOptionsArray.length; i++) {
            if (templateName.value == templateOptionsArray[i].name) {
                tempCreationID = templateOptionsArray[i].creation_id;
                $.post(url + "/PHP/delete_template.php", { token: token, creationID: tempCreationID }, RefreshTemplateOptions);
                document.querySelector("#NotificationArea").style.display = "block";
                document.querySelector(".TemplateRemoved").style.display = "block";
                break;
            }
        }
    } else {
        document.querySelector("#NotificationArea").style.display = "block";
        document.querySelector(".TemplateRemovedError").style.display = "block";
    }
});

$('.DA-TemplateDropdown').change(function () {
    if (templateSelection.value == "(No Template)") {
        if (creationID == "") {
            CreationReset();
        } else {
            ShowPokemonDetails();
        }
    } else {
        LoadTemplate();
    }
});

function LoadTemplate() {
    for (let i = 0; i < templateOptionsArray.length; i++) {
        if (templateSelection.value == templateOptionsArray[i].name) {
            howObtainedSelection.value = templateOptionsArray[i].how_obtained;
            gameObtainedSelection.value = templateOptionsArray[i].game_obtained;
            gameObtainedValue = templateOptionsArray[i].game_obtained;
            displaySelection.value = templateOptionsArray[i].display;
            gen6Data = templateOptionsArray[i].gen6_availability;
            gen7Data = templateOptionsArray[i].gen7_availability;
            gen8Data = templateOptionsArray[i].gen8_availability;
            homeData = templateOptionsArray[i].home_availability;
            if (gen6Data == "Available") {
                document.querySelector(".DA-Gen6").style.color = "#74db96";
            } else {
                document.querySelector(".DA-Gen6").style.color = "#dc7878";
            }
            if (gen7Data == "Available") {
                document.querySelector(".DA-Gen7").style.color = "#74db96";
            } else {
                document.querySelector(".DA-Gen7").style.color = "#dc7878";
            }
            if (gen8Data == "Available") {
                document.querySelector(".DA-Gen8").style.color = "#74db96";
            } else {
                document.querySelector(".DA-Gen8").style.color = "#dc7878";
            }
            if (homeData == "Available") {
                document.querySelector(".DA-Home").style.color = "#74db96";
            } else {
                document.querySelector(".DA-Home").style.color = "#dc7878";
            }
            natureSelection.value = templateOptionsArray[i].nature;
            if (templateOptionsArray[i].game_ot != "") {
                otSelection.value = templateOptionsArray[i].game_ot;
            }
            if (templateOptionsArray[i].game_id != "") {
                idSelection.value = templateOptionsArray[i].game_id;
            }
            statusSelection.value = templateOptionsArray[i].status;
            eventSelection.value = templateOptionsArray[i].event_info;
            ivHpSelection.value = templateOptionsArray[i].iv_hp;
            ivAttSelection.value = templateOptionsArray[i].iv_att;
            ivDefSelection.value = templateOptionsArray[i].iv_def;
            ivSpaSelection.value = templateOptionsArray[i].iv_spa;
            ivSpdSelection.value = templateOptionsArray[i].iv_spd;
            ivSpeSelection.value = templateOptionsArray[i].iv_spe;
            evHpSelection.value = templateOptionsArray[i].ev_hp;
            evAttSelection.value = templateOptionsArray[i].ev_att;
            evDefSelection.value = templateOptionsArray[i].ev_def;
            evSpaSelection.value = templateOptionsArray[i].ev_spa;
            evSpdSelection.value = templateOptionsArray[i].ev_spd;
            evSpeSelection.value = templateOptionsArray[i].ev_spe;
            PokemonValidation();
            SetHiddenPower();
            break;
        }
    }
}

function RefreshTemplateOptions() {
    //console.log(data);
    $.post(url + "/PHP/generate_templates.php", { token: token }, GetTemplateOptions);
}

$('.DA-GameObtained').change(function () {
    gameObtainedValue = document.querySelector(".DA-GameObtained").value;
    PokemonValidation();
});

$('.DA-Gen6').click(function () {
    if (gen6Data == "Not Available") {
        gen6Data = "Available";
        document.querySelector(".DA-Gen6").style.color = "#74db96";
    } else {
        gen6Data = "Not Available";
        document.querySelector(".DA-Gen6").style.color = "#dc7878";
    }
});

$('.DA-Gen7').click(function () {
    if (gen7Data == "Not Available") {
        gen7Data = "Available";
        document.querySelector(".DA-Gen7").style.color = "#74db96";
    } else {
        gen7Data = "Not Available";
        document.querySelector(".DA-Gen7").style.color = "#dc7878";
    }
});

$('.DA-Gen8').click(function () {
    if (gen8Data == "Not Available") {
        gen8Data = "Available";
        document.querySelector(".DA-Gen8").style.color = "#74db96";
    } else {
        gen8Data = "Not Available";
        document.querySelector(".DA-Gen8").style.color = "#dc7878";
    }
});

$('.DA-Home').click(function () {
    if (homeData == "Not Available") {
        homeData = "Available";
        document.querySelector(".DA-Home").style.color = "#74db96";
    } else {
        homeData = "Not Available";
        document.querySelector(".DA-Home").style.color = "#dc7878";
    }
});

$(".DA-SelectedLang").click(function () {
    if (document.querySelector(".DA-LangOptions").style.display == "grid") {
        CloseDetailOptions();
    } else {
        CloseDetailOptions();
        document.querySelector(".DA-LangOptions").style.display = "grid";
    }
});

$(".DA-SelectedBall").click(function () {
    if (document.querySelector(".DA-BallOptions").style.display == "grid") {
        CloseDetailOptions();
    } else {
        CloseDetailOptions();
        document.querySelector(".DA-BallOptions").style.display = "grid";
    }
});

$(".DA-SelectedGender").click(function () {
    if (document.querySelector(".DA-GenderOptions").style.display == "grid") {
        CloseDetailOptions();
    } else {
        CloseDetailOptions();
        document.querySelector(".DA-GenderOptions").style.display = "grid";
    }
});

$(".DA-SelectedShiny").click(function () {
    if (document.querySelector(".DA-ShinyOptions").style.display == "grid") {
        CloseDetailOptions();
    } else {
        CloseDetailOptions();
        document.querySelector(".DA-ShinyOptions").style.display = "grid";
    }
});

$(".DA-SelectedMint").click(function () {
    if (document.querySelector(".DA-MintOptions").style.display == "grid") {
        CloseDetailOptions();
    } else {
        CloseDetailOptions();
        document.querySelector(".DA-MintOptions").style.display = "grid";
    }
});

$(".DA-SelectedMisc").click(function () {
    if (document.querySelector(".DA-MiscOptions").style.display == "grid") {
        CloseDetailOptions();
    } else {
        CloseDetailOptions();
        document.querySelector(".DA-MiscOptions").style.display = "grid";
    }
});

$(".DA-SelectedMark").click(function () {
    if (document.querySelector(".DA-MarkOptions").style.display == "grid") {
        CloseDetailOptions();
    } else {
        CloseDetailOptions();
        document.querySelector(".DA-MarkOptions").style.display = "grid";
    }
});

$(".DA-SelectedRibbon").click(function () {
    if (document.querySelector(".DA-RibbonOptions").style.display == "grid") {
        CloseDetailOptions();
    } else {
        CloseDetailOptions();
        document.querySelector(".DA-RibbonOptions").style.display = "grid";
    }
});

$('.DA-PokemonDropdown').change(function () {
    pokemonData = document.querySelector(".DA-PokemonDropdown").value;
    PokemonValidation();
    AbilityOptions();
});

$('.DA-ToggleProof').click(function () {
    if (document.querySelector(".DA-ToggleProof").innerHTML == "Show Proof") {
        toggleOn = true

        document.querySelector(".DA-ToggleProof").innerHTML = "Hide Proof";
        DisplayProof();

    } else {
        toggleOn = false;
        document.querySelector(".DA-ToggleProof").innerHTML = "Show Proof";
        document.querySelector(".DA-LinkRedirector").style.display = "none";
    }
});

$('.DA-ProofURL').on('keypress', function (e) {
    if (e.which == 13) {
        if (toggleOn) {
            DisplayProof();
        }
    }
});

$('.DA-ProofURL').blur(function () {
    if (toggleOn) {
        DisplayProof();
    }
});

function DisplayProof() {
    //if (!proofSelection.value.includes("imgur")) {

    if (proofSelection.value.includes(".mp4") || proofSelection.value.includes(".MP4")) {
        document.querySelector(".DA-ProofVideo").setAttribute("src", proofSelection.value);
        document.querySelector(".DA-ProofImage").style.display = "none";
        document.querySelector(".DA-ProofVideo").style.display = "block";
        document.querySelector(".DA-LinkRedirector").setAttribute("href", proofSelection.value);
        if (toggleOn) {
            document.querySelector(".DA-LinkRedirector").style.display = "flex";
        }
        document.querySelector(".DA-ProofVideo").onerror = function () {
            document.querySelector(".DA-LinkRedirector").style.display = "none";
            //document.querySelector(".DA-ToggleProof").style.display = "none";
            document.querySelector(".DA-LinkRedirector").setAttribute("href", null);
        }



    } else {
        document.querySelector(".DA-ProofImage").setAttribute("src", proofSelection.value);
        document.querySelector(".DA-ProofVideo").style.display = "none";
        document.querySelector(".DA-ProofImage").style.display = "block";
        document.querySelector(".DA-LinkRedirector").setAttribute("href", proofSelection.value);
        if (toggleOn) {
            document.querySelector(".DA-LinkRedirector").style.display = "flex";
        }
        document.querySelector(".DA-ProofImage").onerror = function () {
            document.querySelector(".DA-LinkRedirector").style.display = "none";
            document.querySelector(".DA-LinkRedirector").setAttribute("href", null);
        }
    }

    /*} else {
        document.querySelector(".DA-LinkRedirector").style.display = "none";
    }*/
}

function SetAV1() {
    AdditionalViewing1 = pokemonDetails;
    document.querySelector(".DA-AV1").src = url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function SetAV2() {
    AdditionalViewing2 = pokemonDetails;
    document.querySelector(".DA-AV2").src = url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function SetAV3() {
    AdditionalViewing3 = pokemonDetails;
    document.querySelector(".DA-AV3").src = url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function SetAV4() {
    AdditionalViewing4 = pokemonDetails;
    document.querySelector(".DA-AV4").src = url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function SetAV5() {
    AdditionalViewing5 = pokemonDetails;
    document.querySelector(".DA-AV5").src = url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function SetAV6() {
    AdditionalViewing6 = pokemonDetails;
    document.querySelector(".DA-AV6").src = url + "/Resources/Images/Dreamworld Artwork/Items/Poke Ball.png";
}

function ShowAV1() {
    pokemonDetails = AdditionalViewing1;
    ShowPokemonDetails();
    ModifyCheckViewing();
}

function ShowAV2() {
    pokemonDetails = AdditionalViewing2;
    ShowPokemonDetails();
    ModifyCheckViewing();
}

function ShowAV3() {
    pokemonDetails = AdditionalViewing3;
    ShowPokemonDetails();
    ModifyCheckViewing();
}

function ShowAV4() {
    pokemonDetails = AdditionalViewing4;
    ShowPokemonDetails();
    ModifyCheckViewing();
}

function ShowAV5() {
    pokemonDetails = AdditionalViewing5;
    ShowPokemonDetails();
    ModifyCheckViewing();
}

function ShowAV6() {
    pokemonDetails = AdditionalViewing6;
    ShowPokemonDetails();
    ModifyCheckViewing();
};

function CloseDetailOptions() {
    document.querySelector(".DA-LangOptions").style.display = "none";
    document.querySelector(".DA-BallOptions").style.display = "none";
    document.querySelector(".DA-GenderOptions").style.display = "none";
    document.querySelector(".DA-ShinyOptions").style.display = "none";
    document.querySelector(".DA-MintOptions").style.display = "none";
    document.querySelector(".DA-MiscOptions").style.display = "none";
    document.querySelector(".DA-MarkOptions").style.display = "none";
    document.querySelector(".DA-RibbonOptions").style.display = "none";
}

function CreateLangOptions() {
    for (let i = 0; i < languageOptionsArray.length; i++) {
        newDiv = document.createElement("div");
        newDiv.setAttribute("class", "DA-" + languageOptionsArray[i].replace(/\s/g, ''));
        newDiv.classList.add("DA-IconSelects");
        /*newDiv.style.background = "#243048";
        newDiv.style.borderWidth = "2px";
        newDiv.style.borderStyle = "solid";
        newDiv.style.borderColor = "#949494";
        newDiv.style.textAlign = "center";
        newDiv.style.paddingTop = "3px";
        newDiv.style.borderBottom = "solid";
        newDiv.style.borderRight = "solid";
        newDiv.style.cursor = "pointer";*/
        document.querySelector(".DA-LangOptions").appendChild(newDiv);

        theText = document.createElement("button");
        theText.setAttribute("class", "DA-IconButton");
        theText.innerHTML = languageOptionsArray[i];
        newDiv.appendChild(theText);

        newDiv.onclick = function () {
            langData = languageOptionsArray[i];
            document.querySelector(".DA-LangIcon").innerHTML = "[" + languageOptionsArray[i] + "]";
            CloseDetailOptions();
        };
    }
}

function CreateBallOptions() {
    for (let i = 0; i < allBallsArray.length; i++) {
        newDiv = document.createElement("div");
        if (allBallsArray[i] == "(Any Ball)") {
            newDiv.setAttribute("class", "DA-AnyBall");
        } else {
            newDiv.setAttribute("class", "DA-" + allBallsArray[i].replace(/\s/g, ''));
        }
        newDiv.classList.add("DA-IconSelects");
        /*newDiv.style.background = "#243048";
        newDiv.style.borderWidth = "2px";
        newDiv.style.borderStyle = "solid";
        newDiv.style.borderColor = "#949494";
        newDiv.style.textAlign = "center";
        newDiv.style.paddingTop = "3px";
        newDiv.style.borderBottom = "solid";
        newDiv.style.borderRight = "solid";
        newDiv.style.cursor = "pointer";*/
        document.querySelector(".DA-BallOptions").appendChild(newDiv);

        theImage = document.createElement("IMG");
        theImage.setAttribute("class", "DA-IconImage");
        theImage.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Items/" + allBallsArray[i] + ".png")
        newDiv.appendChild(theImage);

        theText = document.createElement("text");
        theText.setAttribute("class", "DA-IconText");
        if (allBallsArray[i] == "(Any Ball)") {
            theText.innerHTML = "(Any)";
            newDiv.appendChild(theText);
        } else if (allBallsArray[i].includes("(LA)")) {
            theText.innerHTML = allBallsArray[i].substring(0, allBallsArray[i].length - 9);
            theText.innerHTML = theText.innerHTML + " (LA)";
            newDiv.appendChild(theText);
        } else {
            theText.innerHTML = allBallsArray[i].substring(0, allBallsArray[i].length - 5);
            newDiv.appendChild(theText);
        }

        newDiv.onclick = function () {
            ballData = allBallsArray[i];
            document.querySelector(".DA-BallIcon").src = url + "/Resources/Images/Dreamworld Artwork/Items/" + allBallsArray[i] + ".png";
            CloseDetailOptions();
        };
    }
}

function CreateGenderOptions() {
    for (let i = 0; i < genderOptionsArray.length; i++) {
        newDiv = document.createElement("div");
        if (genderOptionsArray[i] == "(Any Gender)") {
            newDiv.setAttribute("class", "DA-AnyGender");
        } else {
            newDiv.setAttribute("class", "DA-" + genderOptionsArray[i].replace(/\s/g, ''));
        }
        newDiv.classList.add("DA-IconSelects");
        /*newDiv.style.background = "#243048";
        newDiv.style.borderWidth = "2px";
        newDiv.style.borderStyle = "solid";
        newDiv.style.borderColor = "#949494";
        newDiv.style.textAlign = "center";
        newDiv.style.paddingTop = "3px";
        newDiv.style.borderBottom = "solid";
        newDiv.style.borderRight = "solid";
        newDiv.style.cursor = "pointer";*/
        document.querySelector(".DA-GenderOptions").appendChild(newDiv);

        theImage = document.createElement("IMG");
        theImage.setAttribute("class", "DA-IconImage");
        theImage.setAttribute("src", url + "/Resources/Misc/" + genderOptionsArray[i] + ".png")
        newDiv.appendChild(theImage);

        theText = document.createElement("text");
        theText.setAttribute("class", "DA-IconText");
        theText.innerHTML = genderOptionsArray[i];
        newDiv.appendChild(theText);

        newDiv.onclick = function () {
            genderData = genderOptionsArray[i];
            document.querySelector(".DA-GenderIcon").src = url + "/Resources/Misc/" + genderOptionsArray[i] + ".png";
            CloseDetailOptions();
            PokemonValidation();
        };
    }
}

function CreateShinyOptions() {
    for (let i = 0; i < shinyOptionsArray.length; i++) {
        newDiv = document.createElement("div");
        if (shinyOptionsArray[i] == "(Any Shiny or Normal)") {
            newDiv.setAttribute("class", "DA-AnyShinyOrNormal");
        } else {
            newDiv.setAttribute("class", "DA-" + shinyOptionsArray[i].replace(/\s/g, ''));
        }
        newDiv.classList.add("DA-IconSelects");
        /*newDiv.style.background = "#243048";
        newDiv.style.borderWidth = "2px";
        newDiv.style.borderStyle = "solid";
        newDiv.style.borderColor = "#949494";
        newDiv.style.textAlign = "center";
        newDiv.style.paddingTop = "3px";
        newDiv.style.borderBottom = "solid";
        newDiv.style.borderRight = "solid";
        newDiv.style.cursor = "pointer";*/
        document.querySelector(".DA-ShinyOptions").appendChild(newDiv);

        theImage = document.createElement("IMG");
        theImage.setAttribute("class", "DA-IconImage");
        theImage.setAttribute("src", url + "/Resources/Misc/" + shinyOptionsArray[i] + ".png")
        newDiv.appendChild(theImage);

        theText = document.createElement("text");
        theText.setAttribute("class", "DA-IconText");
        theText.innerHTML = shinyOptionsArray[i];
        newDiv.appendChild(theText);

        newDiv.onclick = function () {
            shinyData = shinyOptionsArray[i];
            document.querySelector(".DA-ShinyIcon").src = url + "/Resources/Misc/" + shinyOptionsArray[i] + ".png";
            CloseDetailOptions();
            PokemonValidation();
        };
    }
}

function CreateMintOptions() {
    for (let i = 0; i < mintOptionsArray.length; i++) {
        newDiv = document.createElement("div");
        if (mintOptionsArray[i] == "(Any or No Mint)") {
            newDiv.setAttribute("class", "DA-AnyOrNoMint");
        } else {
            newDiv.setAttribute("class", "DA-" + mintOptionsArray[i].replace(/\s/g, ''));
        }
        newDiv.classList.add("DA-IconSelects");
        /*newDiv.style.background = "#243048";
        newDiv.style.borderWidth = "2px";
        newDiv.style.borderStyle = "solid";
        newDiv.style.borderColor = "#949494";
        newDiv.style.textAlign = "center";
        newDiv.style.paddingTop = "3px";
        newDiv.style.borderBottom = "solid";
        newDiv.style.borderRight = "solid";
        newDiv.style.cursor = "pointer";*/
        document.querySelector(".DA-MintOptions").appendChild(newDiv);

        theImage = document.createElement("IMG");
        theImage.setAttribute("class", "DA-IconImage");
        theImage.setAttribute("src", url + "/Resources/Misc/" + mintOptionsArray[i] + ".png")
        newDiv.appendChild(theImage);

        theText = document.createElement("text");
        theText.setAttribute("class", "DA-IconText");
        theText.innerHTML = mintOptionsArray[i];
        newDiv.appendChild(theText);

        newDiv.onclick = function () {
            mintData = mintOptionsArray[i];
            document.querySelector(".DA-MintIcon").src = url + "/Resources/Misc/" + mintOptionsArray[i] + ".png";
            CloseDetailOptions();
        };
    }
}

function CreateMiscOptions() {
    for (let i = 0; i < miscOptionsArray.length; i++) {
        newDiv = document.createElement("div");
        if (miscOptionsArray[i] == "(No Misc)") {
            newDiv.setAttribute("class", "DA-NoMisc");
        } else {
            newDiv.setAttribute("class", "DA-" + miscOptionsArray[i].replace(/\s/g, ''));
        }
        newDiv.classList.add("DA-IconSelects");
        /*newDiv.style.background = "#243048";
        newDiv.style.borderWidth = "2px";
        newDiv.style.borderStyle = "solid";
        newDiv.style.borderColor = "#949494";
        newDiv.style.textAlign = "center";
        newDiv.style.paddingTop = "3px";
        newDiv.style.borderBottom = "solid";
        newDiv.style.borderRight = "solid";
        newDiv.style.cursor = "pointer";*/
        document.querySelector(".DA-MiscOptions").appendChild(newDiv);

        theImage = document.createElement("IMG");
        theImage.setAttribute("class", "DA-IconImage");
        theImage.setAttribute("src", url + "/Resources/Misc/" + miscOptionsArray[i] + ".png")
        newDiv.appendChild(theImage);

        theText = document.createElement("text");
        theText.setAttribute("class", "DA-IconText");
        theText.innerHTML = miscOptionsArray[i];
        newDiv.appendChild(theText);

        newDiv.onclick = function () {
            miscData = miscOptionsArray[i];
            document.querySelector(".DA-MiscIcon").src = url + "/Resources/Misc/" + miscOptionsArray[i] + ".png";
            CloseDetailOptions();
        };
    }
}

function CreateMarkOptions() {
    for (let i = 0; i < allMarksArray.length; i++) {
        newDiv = document.createElement("div");
        if (allMarksArray[i] == "(Any or No Mark)") {
            newDiv.setAttribute("class", "DA-AnyOrNoMark");
        } else if (allMarksArray[i] == "(No Mark)") {
            newDiv.setAttribute("class", "DA-NoMark");
        } else {
            newDiv.setAttribute("class", "DA-" + allMarksArray[i].replace(/\s/g, ''));
        }
        newDiv.classList.add("DA-IconSelects");
        /*newDiv.style.background = "#243048";
        newDiv.style.borderWidth = "2px";
        newDiv.style.borderStyle = "solid";
        newDiv.style.borderColor = "#949494";
        newDiv.style.textAlign = "center";
        newDiv.style.paddingTop = "3px";
        newDiv.style.borderBottom = "solid";
        newDiv.style.borderRight = "solid";
        newDiv.style.cursor = "pointer";*/
        document.querySelector(".DA-MarkOptions").appendChild(newDiv);

        theImage = document.createElement("IMG");
        theImage.setAttribute("class", "DA-IconImage");
        theImage.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Marks/" + allMarksArray[i] + ".png")
        newDiv.appendChild(theImage);

        theText = document.createElement("text");
        theText.setAttribute("class", "DA-IconText");
        if (allMarksArray[i] == "(Any or No Mark)" || allMarksArray[i] == "(No Mark)") {
            theText.innerHTML = allMarksArray[i];
            newDiv.appendChild(theText);
        } else {
            theText.innerHTML = allMarksArray[i].substring(0, allMarksArray[i].length - 5);;
            newDiv.appendChild(theText);
        }

        newDiv.onclick = function () {
            markData = allMarksArray[i];
            document.querySelector(".DA-MarkIcon").src = url + "/Resources/Images/Dreamworld Artwork/Marks/" + allMarksArray[i] + ".png";
            CloseDetailOptions();
        };
    }
}

function CreateRibbonOptions() {
    for (let i = 0; i < ribbonOptionsArray.length; i++) {
        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "DA-" + ribbonOptionsArray[i]);
        newDiv.setAttribute("class", "Ribbons");
        newDiv.classList.add("DA-IconSelects");
        /*newDiv.style.background = "#243048";
        newDiv.style.borderWidth = "2px";
        newDiv.style.borderStyle = "solid";
        newDiv.style.borderColor = "#949494";
        newDiv.style.textAlign = "center";
        newDiv.style.paddingTop = "3px";
        newDiv.style.borderBottom = "solid";
        newDiv.style.borderRight = "solid";
        newDiv.style.cursor = "pointer";*/
        document.querySelector(".DA-RibbonOptions").appendChild(newDiv);

        theImage = document.createElement("IMG");
        theImage.setAttribute("class", "DA-IconImage");
        theImage.setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Ribbons/" + ribbonOptionsArray[i] + ".png")
        newDiv.appendChild(theImage);

        theText = document.createElement("text");
        theText.setAttribute("class", "DA-IconText");
        if (ribbonOptionsArray[i].includes("No Ribbon")) {
            theText.innerHTML = ribbonOptionsArray[i];
            newDiv.appendChild(theText);
        } else {
            theText.innerHTML = ribbonOptionsArray[i].replace("Ribbon", '');
            newDiv.appendChild(theText);
        }


        newDiv.onclick = function () {
            if (ribbonData[i] != ribbonOptionsArray[i]) {
                ribbonData[i] = ribbonOptionsArray[i];
                //document.querySelector(".DA-RibbonIcon").src = url + "/Resources/Images/Dreamworld Artwork/Ribbons/" + ribbonOptionsArray[i] + ".png";
                ribbonString = "";
                if (ribbonData[i] == "(No Ribbon)") {
                    ribbonData = new Array(103);
                    ribbonData[1] = "(No Ribbon)";
                    ribbonString = "(No Ribbon)";
                    document.querySelector(".DA-RibbonIcon").src = url + "/Resources/Images/Dreamworld Artwork/Ribbons/(No Ribbon).png";
                    document.getElementById("DA-" + ribbonOptionsArray[i]).style.background = "#1e5578";
                    for (let j = 0; j < ribbonData.length; j++) {
                        if (ribbonData[j] != "(No Ribbon)") {
                            document.getElementById("DA-" + ribbonOptionsArray[j]).style.background = "#243048";
                        }
                    }
                    //console.log(ribbonString);
                }
                else if (ribbonData[i] == "(Any or No Ribbon)") {
                    ribbonData = new Array(103);
                    ribbonData[0] = "(Any or No Ribbon)";
                    ribbonString = "(Any or No Ribbon)";
                    document.querySelector(".DA-RibbonIcon").src = url + "/Resources/Images/Dreamworld Artwork/Ribbons/(Any or No Ribbon).png";
                    document.getElementById("DA-" + ribbonOptionsArray[i]).style.background = "#1e5578";
                    for (let j = 0; j < ribbonData.length; j++) {
                        if (ribbonData[j] != "(Any or No Ribbon)") {
                            document.getElementById("DA-" + ribbonOptionsArray[j]).style.background = "#243048";
                        }
                    }
                    //console.log(ribbonString);
                } else {
                    ribbonData[0] = null;
                    ribbonData[1] = null;
                    document.getElementById("DA-" + ribbonOptionsArray[0]).style.background = "#243048";
                    document.getElementById("DA-" + ribbonOptionsArray[1]).style.background = "#243048";
                    for (let j = 0; j < ribbonData.length; j++) {
                        if (ribbonData[j] != null) {
                            document.querySelector(".DA-RibbonIcon").src = url + "/Resources/Images/Dreamworld Artwork/Ribbons/" + ribbonOptionsArray[j] + ".png";
                            if (ribbonString == "") {
                                ribbonString += ribbonData[j];
                            } else {
                                ribbonString += "," + ribbonData[j];
                            }
                            console.log(ribbonString);
                        }
                    }
                    document.getElementById("DA-" + ribbonOptionsArray[i]).style.background = "#1e5578";
                }
            } else {
                ribbonData[i] = null;
                document.querySelector(".DA-RibbonIcon").src = url + "/Resources/Images/Dreamworld Artwork/Ribbons/(No Ribbon).png";
                ribbonString = "";
                for (let j = 0; j < ribbonData.length; j++) {
                    if (ribbonData[j] != null) {
                        document.querySelector(".DA-RibbonIcon").src = url + "/Resources/Images/Dreamworld Artwork/Ribbons/" + ribbonOptionsArray[j] + ".png";
                        if (ribbonString == "") {
                            ribbonString += ribbonData[j];
                        } else {
                            ribbonString += "," + ribbonData[j];
                        }
                        console.log(ribbonString);
                    }
                }
                document.getElementById("DA-" + ribbonOptionsArray[i]).style.background = "#243048";
            }
            if (ribbonString == "") {
                ribbonString = "(No Ribbon)";
                ribbonData[1] = ("(No Ribbon)");
                document.getElementById("DA-" + ribbonOptionsArray[1]).style.background = "#1e5578";
            }
            //CloseDetailOptions();
        };
    }
}

function PokemonValidation() {

    SetImage(pokemonSprite, pokemonData, genderData, shinyData, gameObtainedValue);

    /*if (shinyExceptionArray.includes(pokemonData) && !shinyData.includes("Normal")) {
        if (pokemonData.includes("Minior")) {
            if (genderData.includes("Genderless") || genderData.includes("Any Gender")) {
                if (generationalSprites) {
                    pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/Minior.png");
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/Minior.png");
                }
            } else {
                pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        } else if (pokemonData.includes("Alcremie-Strawberry")) {
            if (genderData.includes("Female") || genderData.includes("Any Gender")) {
                pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Strawberry.png");
            } else {
                pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (pokemonData.includes("Alcremie-Berry")) {
            if (genderData.includes("Female") || genderData.includes("Any Gender")) {
                pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Berry.png");
            } else {
                pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (pokemonData.includes("Alcremie-Love")) {
            if (genderData.includes("Female") || genderData.includes("Any Gender")) {
                pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Love.png");
            } else {
                pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (pokemonData.includes("Alcremie-Star")) {
            if (genderData.includes("Female") || genderData.includes("Any Gender")) {
                pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Star.png");
            } else {
                pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (pokemonData.includes("Alcremie-Clover")) {
            if (genderData.includes("Female") || genderData.includes("Any Gender")) {
                pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Clover.png");
            } else {
                pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (pokemonData.includes("Alcremie-Flower")) {
            if (genderData.includes("Female") || genderData.includes("Any Gender")) {
                pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Flower.png");
            } else {
                pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (pokemonData.includes("Alcremie-Ribbon")) {
            if (genderData.includes("Female") || genderData.includes("Any Gender")) {
                pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Ribbon.png");
            } else {
                pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
    }

    else if (shinyLockedArray.includes(pokemonData) && !shinyData.includes("Normal")) {
        pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
    }

    else if (genderlessPokemonArray.includes(pokemonData)) {
        if (genderData.includes("Genderless") || genderData.includes("(Any Gender)")) {
            if (shinyData.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "X/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BD/SP") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSP/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + pokemonData + ".png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                    }
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                        document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                }

            } else {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "X/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + pokemonData + ".png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                    }
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                        document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                }
            }

        } else {
            pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
        }
    }
    else if (maleOnlyPokemonArray.includes(pokemonData)) {
        if (genderData.includes("Male") || genderData.includes("(Any Gender)")) {
            if (shinyData.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "X/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BD/SP") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSP/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + pokemonData + ".png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                    }
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                        document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                }

            } else {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "X/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + pokemonData + ".png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                    }
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                        document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                }
            }
        } else {
            pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
        }
    }
    else if (femaleOnlyPokemonArray.includes(pokemonData)) {
        if (genderData.includes("Female") || genderData.includes("(Any Gender)")) {
            if (shinyData.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "X/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BD/SP") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSP/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + pokemonData + ".png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                    }
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                        document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                }

            } else {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "X/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + pokemonData + ".png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                    }
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                        document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                }
            }

        } else {
            pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
        }
    }
    else if (genderDifferencesArray.includes(pokemonData)) {
        if (genderData.includes("Male") || genderData.includes("(Any Gender)")) {
            if (shinyData.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "X/Y") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "BD/SP") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSP/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + pokemonData + "-Male.png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + "-Male.png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + "-Male.png");
                }
                document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/Home/" + pokemonData + "-Male.png")
                };
            } else {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "X/Y") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + pokemonData + "-Male.png");
                        }
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + pokemonData + "-Male.png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + "-Male.png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + "-Male.png");
                }
                document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + "-Male.png")
                };
            }

        }
        else if (genderData.includes("Female") || genderData.includes("(Any Gender)")) {
            if (shinyData.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + pokemonData + "-.png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "X/Y") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "BD/SP") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSP/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + pokemonData + "-Female.png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + "-Female.png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + "-Female.png");
                }
                document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/Home/" + pokemonData + "-Female.png")
                };
            } else {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "X/Y") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        if (pokemonData == "Eevee") {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + pokemonData + ".png");
                        } else {
                            pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + pokemonData + "-Female.png");
                        }
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + pokemonData + "-Female.png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + "-Female.png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + "-Female.png");
                }
                document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + "-Female.png")
                };
            }

        } else {
            pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
        }
    }
    //For Normal pokemon without any gender differences or specific genders
    else if (!genderlessPokemonArray.includes(pokemonData)) {
        if (!genderData.includes("Genderless") || genderData.includes("(Any Gender)")) {
            if (shinyData.includes("Normal")) {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen1Sprites/Gen1/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "X/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3ds/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPE/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BD/SP") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/BDSP/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LA/" + pokemonData + ".png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                    }
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                        document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/Home/" + pokemonData + ".png");
                }
            } else {
                if (generationalSprites) {
                    if (gameObtainedValue == "R/G/B/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "G/S/C") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen2Sprites/Gen2Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "R/S/E" || gameObtainedValue == "FR/LG" || gameObtainedValue == "Colo/XD") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen3Sprites/Gen3Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "D/P/PT" || gameObtainedValue == "HG/SS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen4Sprites/Gen4Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "BW/BW2") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/Gen5Sprites/Gen5Shiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "X/Y") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "OR/AS") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "SM/USUM") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/3dsModels/3dsShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LGP/LGE") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LGPEModels/LGPEShiny/" + pokemonData + ".png");
                    }
                    else if (gameObtainedValue == "LA") {
                        pokemonSprite.setAttribute("src", url + "/Resources/GenerationalDesigns/LAModels/LAShiny/" + pokemonData + ".png");
                    }
                    else {
                        pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                    }
                    document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).onerror = function () {
                        document.querySelector(`.${CSS.escape("DA-PokemonImage")}`).setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                    }
                } else {
                    pokemonSprite.setAttribute("src", url + "/Resources/HomeShiny/" + pokemonData + ".png");
                }
            }

        } else {
            pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
        }
    } else {
        pokemonSprite.setAttribute("src", url + "/Resources/Fennel2.png");
    }
    */
}

function AbilityOptions() {
    while (abilitySelection.lastElementChild) {
        abilitySelection.removeChild(abilitySelection.lastElementChild);
    }

    for (let i = 0; i < pokemonDataArray.length; i++) {
        var dataPokemon = null;
        if (pokemonData == "Meowstic") {
            dataPokemon = pokemonData + "-" + genderData
            //console.log(dataPokemon);
        }

        if (pokemonData == "Indeedee") {
            dataPokemon = pokemonData + "-" + genderData
        }

        if (pokemonData == "Oinkologne") {
            dataPokemon = pokemonData + "-" + genderData
        }

        if (pokemonData == pokemonDataArray[i].pokemon || dataPokemon == pokemonDataArray[i].pokemon) {
            const detailsOption = document.createElement("option");
            detailsOption.value = pokemonDataArray[i].ability_1;
            detailsOption.textContent = pokemonDataArray[i].ability_1;
            detailsOption.setAttribute("class", "DA-DropdownOptions");
            abilitySelection.appendChild(detailsOption);

            if (pokemonDataArray[i].ability_2 != null || dataPokemon != null && dataPokemon.ability_2 != null) {
                const detailsOption = document.createElement("option");
                detailsOption.value = pokemonDataArray[i].ability_2;
                detailsOption.textContent = pokemonDataArray[i].ability_2;
                detailsOption.setAttribute("class", "DA-DropdownOptions");
                abilitySelection.appendChild(detailsOption);
            }

            if (pokemonDataArray[i].hidden_ability_1 != null || dataPokemon != null && dataPokemon.hidden_ability_1 != null) {
                const detailsOption = document.createElement("option");
                detailsOption.value = pokemonDataArray[i].hidden_ability_1;
                detailsOption.textContent = pokemonDataArray[i].hidden_ability_1 + (" (H)");
                detailsOption.setAttribute("class", "DA-DropdownOptions");
                abilitySelection.appendChild(detailsOption);
            }

            if (pokemonDataArray[i].hidden_ability_2 != null || dataPokemon != null && dataPokemon.hidden_ability_2 != null) {
                const detailsOption = document.createElement("option");
                detailsOption.value = pokemonDataArray[i].hidden_ability_2;
                detailsOption.textContent = pokemonDataArray[i].hidden_ability_2 + (" (H)");
                detailsOption.setAttribute("class", "DA-DropdownOptions");
                abilitySelection.appendChild(detailsOption);
            }

        }
    }
}

function CreationReset() {
    pokemonData = "Abomasnow";
    pokemonSelection.value = "Abomasnow";
    if (tradeOption == "For Trade") {
        genderData = "Male";
    } else {
        genderData = "(Any Gender)";
    }
    document.querySelector(".DA-GenderIcon").src = url + "/Resources/Misc/" + genderData + ".png";
    if (tradeOption == "For Trade") {
        shinyData = "Normal";
    } else {
        shinyData = "(Any Shiny or Normal)";
    }
    document.querySelector(".DA-ShinyIcon").src = url + "/Resources/Misc/" + shinyData + ".png";
    nicknameSelection.value = "";
    otSelection.value = "";
    idSelection.value = "";
    proofSelection.value = "";
    noteSelection.value = "";
    gen6Data = "Available";
    document.querySelector(".DA-Gen6").click();
    gen7Data = "Available";
    document.querySelector(".DA-Gen7").click();
    gen8Data = "Available";
    document.querySelector(".DA-Gen8").click();
    homeData = "Available";
    document.querySelector(".DA-Home").click();

    displaySelection.value = "Public";
    bunchSelection.value = "(No Bunch)";

    if (tradeOption == "For Trade") {
        langData = "ENG";
    } else {
        langData = "ANY";
    }
    document.querySelector(".DA-LangIcon").innerHTML = "[" + langData + "]";
    if (tradeOption == "For Trade") {
        ballData = "Poke Ball";
    } else {
        ballData = "(Any Ball)";
    }
    document.querySelector(".DA-BallIcon").src = url + "/Resources/Images/Dreamworld Artwork/Items/" + ballData + ".png";
    if (tradeOption == "For Trade") {
        mintData = "Not Minted";
    } else {
        mintData = "(Any or No Mint)";
    }
    document.querySelector(".DA-MintIcon").src = url + "/Resources/Misc/" + mintData + ".png";
    miscData = "(No Misc)";
    if (tradeOption == "For Trade") {
        markData = "(No Mark)";
    } else {
        markData = "(Any or No Mark)";
    }
    document.querySelector(".DA-MiscIcon").src = url + "/Resources/Misc/" + miscData + ".png";
    document.querySelector(".DA-MarkIcon").src = url + "/Resources/Images/Dreamworld Artwork/Marks/" + markData + ".png";
    var cols = document.getElementsByClassName("Ribbons");
    document.querySelector(".DA-RibbonIcon").src = url + "/Resources/Images/Dreamworld Artwork/Ribbons/(No Ribbon).png";
    for (i = 0; i < cols.length; i++) {
        cols[i].style.background = "#243048";
        cols[i].style.display = "block";
    }
    document.getElementById("DA-" + ribbonOptionsArray[1]).style.background = "#1e5578";
    natureSelection.value = "(Any Nature)";
    abilitySelection.value = "(Any Ability)";
    if (tradeOption == "For Trade") {
        statusSelection.value = "Touched";
    } else {
        statusSelection.value = "(Any Status)";
    }
    if (tradeOption == "For Trade") {
        eventSelection.value = "(Not Event)";
    } else {
        eventSelection.value = "(Any/No Event)";
    }

    if (tradeOption == "For Trade") {
        ivHpSelection.value = "0";
        ivAttSelection.value = "0";
        ivDefSelection.value = "0";
        ivSpaSelection.value = "0";
        ivSpdSelection.value = "0";
        ivSpeSelection.value = "0";
        evHpSelection.value = "0";
        evAttSelection.value = "0";
        evDefSelection.value = "0";
        evSpaSelection.value = "0";
        evSpdSelection.value = "0";
        evSpeSelection.value = "0";
    } else {
        ivHpSelection.value = "X";
        ivAttSelection.value = "X";
        ivDefSelection.value = "X";
        ivSpaSelection.value = "X";
        ivSpdSelection.value = "X";
        ivSpeSelection.value = "X";
        evHpSelection.value = "X";
        evAttSelection.value = "X";
        evDefSelection.value = "X";
        evSpaSelection.value = "X";
        evSpdSelection.value = "X";
        evSpeSelection.value = "X";
    }

    if (tradeOption == "For Trade") {
        move1Selection.value = "(No Move)";
        move2Selection.value = "(No Move)";
        move3Selection.value = "(No Move)";
        move4Selection.value = "(No Move)";
        legacyMove1Selection.value = "(No Move)";
        legacyMove2Selection.value = "(No Move)";
        legacyMove3Selection.value = "(No Move)";
        legacyMove4Selection.value = "(No Move)";
    } else {
        move1Selection.value = "(Any Move)";
        move2Selection.value = "(Any Move)";
        move3Selection.value = "(Any Move)";
        move4Selection.value = "(Any Move)";
        legacyMove1Selection.value = "(Any Move)";
        legacyMove2Selection.value = "(Any Move)";
        legacyMove3Selection.value = "(Any Move)";
        legacyMove4Selection.value = "(Any Move)";
    }

    if (tradeOption == "For Trade") {
        howObtainedSelection.value = "Self-Obtained(Retail)";
    } else {
        howObtainedSelection.value = "(Any Method)";
    }

    if (tradeOption == "For Trade") {
        gameObtainedSelection.value = "(Other)";
        gameObtainedValue = "(Other)";
    } else {
        gameObtainedSelection.value = "(Any Game)";
        gameObtainedValue = "(Any Game)";
    }
    displaySelection.value = "Public";

    PokemonValidation();
    AbilityOptions();
}

function CreatePokemon() {
    //This is just so if someone imported something wrong, then it would be removed after the mon is saved.
    ribbonString = "";
    for (let i = 0; i < ribbonData.length; i++) {
        if (ribbonData[i] != null) {
            if (ribbonString == "") {
                ribbonString += ribbonData[i];
            } else {
                ribbonString += "," + ribbonData[i];
            }
        }
    }
    if (ribbonString == "") {
        ribbonString = "(No Ribbon)";
    }
    //Making sure that if its For Trade, none of the "Any" options are allowed.
    if (document.querySelector(".DA-PokemonImage").getAttribute("src") != url + "/Resources/Fennel2.png") {
        console.log("NO FENNEL");
        if (displaySelection.value == "Private") {
            $.post(url + "/PHP/create_or_update_selection.php", { token: token, creationID: creationID, position: tempPosition, bunchname: bunchSelection.value, tradeOption: tradeOption, pokemon: pokemonSelection.value, nickname: nicknameSelection.value, ball: ballData, gender: genderData, shiny: shinyData, mint: mintData, misc: miscData, mark: markData, ribbons: ribbonString, lang: langData, gen6: gen6Data, gen7: gen7Data, gen8: gen8Data, home: homeData, nature: natureSelection.value, ability: abilitySelection.value, gameOT: otSelection.value, gameID: idSelection.value, status: statusSelection.value, event: eventSelection.value, move1: move1Selection.value, move2: move2Selection.value, move3: move3Selection.value, move4: move4Selection.value, legacymove1: legacyMove1Selection.value, legacymove2: legacyMove2Selection.value, legacymove3: legacyMove3Selection.value, legacymove4: legacyMove4Selection.value, howObtained: howObtainedSelection.value, gameObtained: gameObtainedSelection.value, display: displaySelection.value, proof: proofSelection.value, note: noteSelection.value, ivhp: ivHpSelection.value, ivatt: ivAttSelection.value, ivdef: ivDefSelection.value, ivspa: ivSpaSelection.value, ivspd: ivSpdSelection.value, ivspe: ivSpeSelection.value, evhp: evHpSelection.value, evatt: evAttSelection.value, evdef: evDefSelection.value, evspa: evSpaSelection.value, evspd: evSpdSelection.value, evspe: evSpeSelection.value }, CreatedPokemon);
            ShowLoading();
        }
        else if (tradeOption == "For Trade") {
            if (howObtainedSelection.value.includes("(Any Method)") || gameObtainedSelection.value.includes("(Any Game)") || langData.includes("ANY") || ballData.includes("(Any Ball)") || genderData.includes("(Any Gender)") || shinyData.includes("(Any Shiny or Normal)") || mintData.includes("(Any or No Mint)") || markData.includes("Any or No Mark") || natureSelection.value.includes("(Any Nature") || abilitySelection.value.includes("(Any Ability)") || otSelection.value == "" || idSelection.value.length < 4 || idSelection.value.length > 6 || statusSelection.value.includes("(Any Status)") || eventSelection.value.includes("(Any Event)") || move1Selection.value.includes("(No Move)") || move1Selection.value.includes("(Any Move)") || move2Selection.value.includes("(Any Move)") || move3Selection.value.includes("(Any Move)") || move4Selection.value.includes("(Any Move)") || legacyMove1Selection.value.includes("(Any Move)") || legacyMove2Selection.value.includes("(Any Move)") || legacyMove3Selection.value.includes("(Any Move)") || legacyMove4Selection.value.includes("(Any Move)") || ribbonString.includes("(Any or No Ribbon)")) {
                document.querySelector("#NotificationArea").style.display = "block";
                document.querySelector(".CreationPokemonError").style.display = "block";
            } else {
                /*if (nicknameSelection.value == "") {
                    nicknameSelection.value = "(No Nickname)";
                }
                if (proofSelection.value == "") {
                    proofSelection.value = "(No Proof)";
                }
                if (noteSelection.value == "") {
                    noteSelection.value = "(No Note)";
                }*/
                $.post(url + "/PHP/create_or_update_selection.php", { token: token, creationID: creationID, position: tempPosition, bunchname: bunchSelection.value, tradeOption: tradeOption, pokemon: pokemonSelection.value, nickname: nicknameSelection.value, ball: ballData, gender: genderData, shiny: shinyData, mint: mintData, misc: miscData, mark: markData, ribbons: ribbonString, lang: langData, gen6: gen6Data, gen7: gen7Data, gen8: gen8Data, home: homeData, nature: natureSelection.value, ability: abilitySelection.value, gameOT: otSelection.value, gameID: idSelection.value, status: statusSelection.value, event: eventSelection.value, move1: move1Selection.value, move2: move2Selection.value, move3: move3Selection.value, move4: move4Selection.value, legacymove1: legacyMove1Selection.value, legacymove2: legacyMove2Selection.value, legacymove3: legacyMove3Selection.value, legacymove4: legacyMove4Selection.value, howObtained: howObtainedSelection.value, gameObtained: gameObtainedSelection.value, display: displaySelection.value, proof: proofSelection.value, note: noteSelection.value, ivhp: ivHpSelection.value, ivatt: ivAttSelection.value, ivdef: ivDefSelection.value, ivspa: ivSpaSelection.value, ivspd: ivSpdSelection.value, ivspe: ivSpeSelection.value, evhp: evHpSelection.value, evatt: evAttSelection.value, evdef: evDefSelection.value, evspa: evSpaSelection.value, evspd: evSpdSelection.value, evspe: evSpeSelection.value }, CreatedPokemon);
                ShowLoading();
            }
        } else if (tradeOption == "Looking For") {
            /*if (nicknameSelection.value == "") {
                nicknameSelection.value = "(No Nickname)";
            }
            if (proofSelection.value == "") {
                proofSelection.value = "(No Proof)";
            }
            if (noteSelection.value == "") {
                noteSelection.value = "(No Note)";
            }*/
            $.post(url + "/PHP/create_or_update_selection.php", { token: token, creationID: creationID, position: tempPosition, bunchname: bunchSelection.value, tradeOption: tradeOption, pokemon: pokemonSelection.value, nickname: nicknameSelection.value, ball: ballData, gender: genderData, shiny: shinyData, mint: mintData, misc: miscData, mark: markData, ribbons: ribbonString, lang: langData, gen6: gen6Data, gen7: gen7Data, gen8: gen8Data, home: homeData, nature: natureSelection.value, ability: abilitySelection.value, gameOT: otSelection.value, gameID: idSelection.value, status: statusSelection.value, event: eventSelection.value, move1: move1Selection.value, move2: move2Selection.value, move3: move3Selection.value, move4: move4Selection.value, legacymove1: legacyMove1Selection.value, legacymove2: legacyMove2Selection.value, legacymove3: legacyMove3Selection.value, legacymove4: legacyMove4Selection.value, howObtained: howObtainedSelection.value, gameObtained: gameObtainedSelection.value, display: displaySelection.value, proof: proofSelection.value, note: noteSelection.value, ivhp: ivHpSelection.value, ivatt: ivAttSelection.value, ivdef: ivDefSelection.value, ivspa: ivSpaSelection.value, ivspd: ivSpdSelection.value, ivspe: ivSpeSelection.value, evhp: evHpSelection.value, evatt: evAttSelection.value, evdef: evDefSelection.value, evspa: evSpaSelection.value, evspd: evSpdSelection.value, evspe: evSpeSelection.value }, CreatedPokemon);
            ShowLoading();
        }
    } else {
        document.querySelector("#NotificationArea").style.display = "block";
        document.querySelector(".CreationPokemonError").style.display = "block";
    }
}

function CreatedPokemon() {
    document.querySelector("#DetailsArea").style.display = "none";
    $.post(url + "/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);

    creationID = "";
    selectedPokemon = null;
    var cols = document.getElementsByClassName("insideDetails" + (storedValue));
    for (j = 0; j < cols.length; j++) {
        cols[j].style.display = "none";
    }
    if (storedValue != null) {
        document.getElementById("GenerationGridDiv" + (storedValue)).style.height = "100px";
    }
    pokemonDetails = null;
    creationInProgress = null;
    ribbonData = new Array(103)
    ribbonString = "";
    CloseDetailOptions();
    AssigningOutline();
    ShowLoading();
    //UserBunches();
    PostGenerateSelectionData();
    PostGenerateSelection();
}

function PlacePokemon() {
    //This is just so if someone imported something wrong, then it would be removed after the mon is saved.
    ribbonString = "";
    for (let i = 0; i < ribbonData.length; i++) {
        if (ribbonData[i] != null) {
            if (ribbonString == "") {
                ribbonString += ribbonData[i];
            } else {
                ribbonString += "," + ribbonData[i];
            }
        }
    }
    if (ribbonString == "") {
        ribbonString = "(No Ribbon)";
    }
    //Making sure that if its For Trade, none of the "Any" options are allowed.
    if (document.querySelector(".DA-PokemonImage").getAttribute("src") != url + "/Resources/Fennel2.png") {
        console.log("NO FENNEL");
        if (displaySelection.value == "Private") {
            ShowLoading();
            $.post(url + "/PHP/place_selection.php", { token: token, creationID: creationID, position: tempPosition, bunchname: bunchSelection.value, tradeOption: tradeOption, pokemon: pokemonSelection.value, nickname: nicknameSelection.value, ball: ballData, gender: genderData, shiny: shinyData, mint: mintData, misc: miscData, mark: markData, ribbons: ribbonString, lang: langData, gen6: gen6Data, gen7: gen7Data, gen8: gen8Data, home: homeData, nature: natureSelection.value, ability: abilitySelection.value, gameOT: otSelection.value, gameID: idSelection.value, status: statusSelection.value, event: eventSelection.value, move1: move1Selection.value, move2: move2Selection.value, move3: move3Selection.value, move4: move4Selection.value, legacymove1: legacyMove1Selection.value, legacymove2: legacyMove2Selection.value, legacymove3: legacyMove3Selection.value, legacymove4: legacyMove4Selection.value, howObtained: howObtainedSelection.value, gameObtained: gameObtainedSelection.value, display: displaySelection.value, proof: proofSelection.value, note: noteSelection.value, ivhp: ivHpSelection.value, ivatt: ivAttSelection.value, ivdef: ivDefSelection.value, ivspa: ivSpaSelection.value, ivspd: ivSpdSelection.value, ivspe: ivSpeSelection.value, evhp: evHpSelection.value, evatt: evAttSelection.value, evdef: evDefSelection.value, evspa: evSpaSelection.value, evspd: evSpdSelection.value, evspe: evSpeSelection.value }, PlacedPokemon);
        }
        else if (tradeOption == "For Trade") {
            if (howObtainedSelection.value.includes("(Any Obtained") || gameObtainedSelection.value.includes("(Any Game)") || langData.includes("ANY") || ballData.includes("(Any Ball)") || genderData.includes("(Any Gender)") || shinyData.includes("(Any Shiny or Normal)") || mintData.includes("(Any or No Mint)") || markData.includes("Any or No Mark") || natureSelection.value.includes("(Any Nature") || abilitySelection.value.includes("(Any Ability)") || otSelection.value == "" || idSelection.value.length < 4 || idSelection.value.length > 6 || statusSelection.value.includes("(Any Status)") || eventSelection.value.includes("(Any Event)") || move1Selection.value.includes("(No Move)") || move1Selection.value.includes("(Any Move)") || move2Selection.value.includes("(Any Move)") || move3Selection.value.includes("(Any Move)") || move4Selection.value.includes("(Any Move)") || legacyMove1Selection.value.includes("(Any Move)") || legacyMove2Selection.value.includes("(Any Move)") || legacyMove3Selection.value.includes("(Any Move)") || legacyMove4Selection.value.includes("(Any Move)") || ribbonString.includes("(Any or No Ribbon)")) {
                document.querySelector("#NotificationArea").style.display = "block";
                document.querySelector(".CreationPokemonError").style.display = "block";
                $('.DA-Place').click();
            } else {
                ShowLoading();
                $.post(url + "/PHP/place_selection.php", { token: token, creationID: creationID, position: tempPosition, bunchname: bunchSelection.value, tradeOption: tradeOption, pokemon: pokemonSelection.value, nickname: nicknameSelection.value, ball: ballData, gender: genderData, shiny: shinyData, mint: mintData, misc: miscData, mark: markData, ribbons: ribbonString, lang: langData, gen6: gen6Data, gen7: gen7Data, gen8: gen8Data, home: homeData, nature: natureSelection.value, ability: abilitySelection.value, gameOT: otSelection.value, gameID: idSelection.value, status: statusSelection.value, event: eventSelection.value, move1: move1Selection.value, move2: move2Selection.value, move3: move3Selection.value, move4: move4Selection.value, legacymove1: legacyMove1Selection.value, legacymove2: legacyMove2Selection.value, legacymove3: legacyMove3Selection.value, legacymove4: legacyMove4Selection.value, howObtained: howObtainedSelection.value, gameObtained: gameObtainedSelection.value, display: displaySelection.value, proof: proofSelection.value, note: noteSelection.value, ivhp: ivHpSelection.value, ivatt: ivAttSelection.value, ivdef: ivDefSelection.value, ivspa: ivSpaSelection.value, ivspd: ivSpdSelection.value, ivspe: ivSpeSelection.value, evhp: evHpSelection.value, evatt: evAttSelection.value, evdef: evDefSelection.value, evspa: evSpaSelection.value, evspd: evSpdSelection.value, evspe: evSpeSelection.value }, PlacedPokemon);
            }
        } else if (tradeOption == "Looking For") {
            ShowLoading();
            $.post(url + "/PHP/place_selection.php", { token: token, creationID: creationID, position: tempPosition, bunchname: bunchSelection.value, tradeOption: tradeOption, pokemon: pokemonSelection.value, nickname: nicknameSelection.value, ball: ballData, gender: genderData, shiny: shinyData, mint: mintData, misc: miscData, mark: markData, ribbons: ribbonString, lang: langData, gen6: gen6Data, gen7: gen7Data, gen8: gen8Data, home: homeData, nature: natureSelection.value, ability: abilitySelection.value, gameOT: otSelection.value, gameID: idSelection.value, status: statusSelection.value, event: eventSelection.value, move1: move1Selection.value, move2: move2Selection.value, move3: move3Selection.value, move4: move4Selection.value, legacymove1: legacyMove1Selection.value, legacymove2: legacyMove2Selection.value, legacymove3: legacyMove3Selection.value, legacymove4: legacyMove4Selection.value, howObtained: howObtainedSelection.value, gameObtained: gameObtainedSelection.value, display: displaySelection.value, proof: proofSelection.value, note: noteSelection.value, ivhp: ivHpSelection.value, ivatt: ivAttSelection.value, ivdef: ivDefSelection.value, ivspa: ivSpaSelection.value, ivspd: ivSpdSelection.value, ivspe: ivSpeSelection.value, evhp: evHpSelection.value, evatt: evAttSelection.value, evdef: evDefSelection.value, evspa: evSpaSelection.value, evspd: evSpdSelection.value, evspe: evSpeSelection.value }, PlacedPokemon);
        }
    } else {
        document.querySelector("#NotificationArea").style.display = "block";
        document.querySelector(".CreationPokemonError").style.display = "block";
        //placingPokemon = false;
        $('.DA-Place').click();
    }
}

function PlacedPokemon() {
    creationID = "";
    selectedPokemon = null;
    pokemonDetails = null;
    creationInProgress = null;
    ribbonData = new Array(103)
    ribbonString = "";
    CloseDetailOptions();
    //ShowLoading();
    PostGenerateSelection();
    $.post(url + "/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
    document.querySelector(".DA-Place").innerHTML = "Place";
    placingPokemon = false;
}

function SetStatColour() {
    SetStatGold();
    if (natureSelection.value.includes("-Att")) {
        document.querySelector(".DA-StatAttName").style.color = "#5c99e7ff";
    }

    if (natureSelection.value.includes("-Def")) {
        document.querySelector(".DA-StatDefName").style.color = "#5c99e7ff";
    }

    if (natureSelection.value.includes("-Spa")) {
        document.querySelector(".DA-StatSpaName").style.color = "#5c99e7ff";
    }

    if (natureSelection.value.includes("-Spd")) {
        document.querySelector(".DA-StatSpdName").style.color = "#5c99e7ff";
    }

    if (natureSelection.value.includes("-Spe")) {
        document.querySelector(".DA-StatSpeName").style.color = "#5c99e7ff";
    }

    if (natureSelection.value.includes("+Att")) {
        document.querySelector(".DA-StatAttName").style.color = "#ea7171";
    }

    if (natureSelection.value.includes("+Def")) {
        document.querySelector(".DA-StatDefName").style.color = "#ea7171";
    }

    if (natureSelection.value.includes("+Spa")) {
        document.querySelector(".DA-StatSpaName").style.color = "#ea7171";
    }

    if (natureSelection.value.includes("+Spd")) {
        document.querySelector(".DA-StatSpdName").style.color = "#ea7171";
    }

    if (natureSelection.value.includes("+Spe")) {
        document.querySelector(".DA-StatSpeName").style.color = "#ea7171";
    }
}

function SetStatGold() {
    document.querySelector(".DA-StatAttName").style.color = "#dfcb2aff";
    document.querySelector(".DA-StatDefName").style.color = "#dfcb2aff";
    document.querySelector(".DA-StatSpaName").style.color = "#dfcb2aff";
    document.querySelector(".DA-StatSpdName").style.color = "#dfcb2aff";
    document.querySelector(".DA-StatSpeName").style.color = "#dfcb2aff";
}

function SetIVsWhite() {
    ivHpSelection.style.color = "white";
    ivAttSelection.style.color = "white";
    ivDefSelection.style.color = "white";
    ivSpaSelection.style.color = "white";
    ivSpdSelection.style.color = "white";
    ivSpeSelection.style.color = "white";
}

function SetIVColours() {
    SetIVsWhite();

    if (ivHpSelection.value == "31") {
        ivHpSelection.style.color = "#3bc96a";
    }
    else if (ivHpSelection.value == "0") {
        ivHpSelection.style.color = "#db70bd";
    }

    if (ivAttSelection.value == "31") {
        ivAttSelection.style.color = "#3bc96a";
    }
    else if (ivAttSelection.value == "0") {
        ivAttSelection.style.color = "#db70bd";
    }

    if (ivDefSelection.value == "31") {
        ivDefSelection.style.color = "#3bc96a";
    }
    else if (ivDefSelection.value == "0") {
        ivDefSelection.style.color = "#db70bd";
    }

    if (ivSpaSelection.value == "31") {
        ivSpaSelection.style.color = "#3bc96a";
    }
    else if (ivSpaSelection.value == "0") {
        ivSpaSelection.style.color = "#db70bd";
    }

    if (ivSpdSelection.value == "31") {
        ivSpdSelection.style.color = "#3bc96a";
    }
    else if (ivSpdSelection.value == "0") {
        ivSpdSelection.style.color = "#db70bd";
    }

    if (ivSpeSelection.value == "31") {
        ivSpeSelection.style.color = "#3bc96a";
    }
    else if (ivSpeSelection.value == "0") {
        ivSpeSelection.style.color = "#db70bd";
    }
}



let inputs = document.getElementsByClassName("EVTest");
let svg = document.getElementById("EVs");
//console.log(svg);
for (i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", function (e) {
        //console.log(e.target.value);
        UpdateEVs();
    })
}
UpdateEVs();

function UpdateEVs() {
    let paths = document.getElementById("EVs").children[0].children.EVss.children;
    //console.log(paths);
    let inputs = document.getElementsByClassName("EVTest");
    for (i = 0; i < inputs.length; i++) {
        let v = inputs[i].value;
        let path = paths[i];
        let p1 = [1, 1];
        let a1 = Math.PI / inputs.length * (i - 2) * 2;
        let a2 = Math.PI / inputs.length * (i - 1) * 2;
        let p2 = [p1[0] + Math.cos(a1) * v / 255, p1[1] + Math.sin(a1) * v / 255];
        let p3 = [p1[0] + Math.cos(a2) * v / 255, p1[1] + Math.sin(a2) * v / 255];
        path.setAttribute("d", `M${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]} L${p3[0]} ${p3[1]} L${p1[0]} ${p1[1]}`)
        //console.log(document.getElementById("EVs").children[1]);
    }
}