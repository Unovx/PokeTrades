var searchData;
var tradeOption;
var giveawayDetails;
let showingGiveaway = false;
var version = 1.63;
var link = document.querySelector("link[rel~='icon']");
let clean = "<b>hello there</b>";


////customMessage = document.querySelector(".MA-Message");
//document.querySelector(".MA-Searchbar").value = localStorage.getItem('searchID');
////searchInfoText = (document.querySelector(".MA-Searchbar").value);


$(function UpdateWebsite() {
    setInterval(ForceRefresh, 60000);
});
$(document).ready(function () {
    ForceRefresh();
});

window.onload = function () {
    //document.querySelector(".MA-CTS").style.pointerEvents = "initial";
    //document.querySelector(".MA-PokemonData").style.pointerEvents = "initial";
}


function ForceRefresh() {
    $.post(url + "/PHP/version_check.php", { version: version }, CheckVersion);
}

function CheckVersion(data) {
    if (userData != null && userData.user_id == 1) {
        document.querySelector("#RefreshPage").style.display = "none";
        document.querySelector(".RefreshPrompt").style.display = "none";
    }
    else if (version != data) {

        document.querySelector("#RefreshPage").style.display = "block";
        document.querySelector(".RefreshPrompt").style.display = "block";

        /*tokken = null;
        userData = null;
        $.post(url + "/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
        if (pokemonDetails != null) {
            $.post(url + "/PHP/modify_check_viewing.php", { token: token, searchID: pokemonDetails.user_id }, ModifyCheckViewing);
        }*/
    }
}

const promptOff = setTimeout(PromptOff, 5000);

function PromptOn() {
    document.querySelector(".MA-MessageBlock").style.display = "inline-block";
    document.querySelector(".MA-MessageArrow").style.display = "inline-block";
    document.querySelector(".MA-Assistant").src = "https://poketrades.org/Resources/Designs/Assistant_Happy.png";
}

function PromptOff() {
    document.querySelector(".MA-MessageBlock").style.display = "none";
    document.querySelector(".MA-MessageArrow").style.display = "none";
    document.querySelector(".MA-Assistant").src = "https://poketrades.org/Resources/Designs/Assistant_Normal.png";
}

$('.MA-Assistant').click(function () {
    CloseAllMainBlocks();
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".NA-MainOptions").style.display = "block";
});

$('.MA-Inbox').click(function () {
    if (userData == null) {
        LoginRequired();
        return;
    }
    else if (creationInProgress || placingPokemon) {
        CreationInProgress();
        return;
    }
    //CloseAll();
    //ctsSeaching = false;
    //currentlyImporting = false;
    //document.querySelector("#MainArea").style.display = "block";
    //document.querySelector("#MainArea").style.position = "fixed";
    //document.querySelector("#LoginArea").style.display = "block";

    document.querySelector("#MainArea").style.position = "fixed";
    document.querySelector("#BunchArea").style.display = "none";
    document.querySelector("#CTSArea").style.display = "none";
    document.querySelector("#DetailsArea").style.display = "none";
    document.querySelector("#FilterArea").style.display = "none";
    document.querySelector("#InformationArea").style.display = "none";
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector("#ImportArea").style.display = "none";
    document.querySelector("#LoginArea").style.display = "none";
    document.querySelector("#ViewingArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";

    document.querySelector(".PA-TradeShopPanel").style.display = "none";
    document.querySelector(".PA-SettingsPanel").style.display = "none";
    document.querySelector("#CommunicationArea").style.display = "block";
    document.querySelector("#ContactsList").style.display = "block";
    document.querySelector("#Inbox").style.display = "none";

    source.close();
    $.post(url + "/PHP/get_contacts.php", { token: token }, ShowContacts);
});


$('.MA-Settings').click(function () {
    if (creationInProgress || placingPokemon) {
        CreationInProgress();
        return;
    }
    //$('.SA-MainMenu').click();
    //CloseAll();
    //document.querySelector("#MainArea").style.display = "block";
    //document.querySelector("#MainArea").style.position = "fixed";
    document.querySelector("#BunchArea").style.display = "none";
    document.querySelector("#CTSArea").style.display = "none";
    document.querySelector("#DetailsArea").style.display = "none";
    document.querySelector("#FilterArea").style.display = "none";
    document.querySelector("#InformationArea").style.display = "none";
    document.querySelector("#LoginArea").style.display = "none";
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector("#ImportArea").style.display = "none";
    document.querySelector("#CommunicationArea").style.display = "none";
    document.querySelector("#ViewingArea").style.display = "none";
    document.querySelector("#MainArea").style.position = "fixed";

    document.querySelector(".PA-TradeShopPanel").style.display = "none";
    document.querySelector("#PanelArea").style.display = "block";
    document.querySelector(".PA-SettingsPanel").style.display = "block";
    //ctsSeaching = false;
    //currentlyImporting = false;
});

$('.MA-SearchTradeShops').click(function () {
    CloseAll();
    document.querySelector("#MainArea").style.display = "block";
    document.querySelector("#PanelArea").style.display = "block";
    document.querySelector("#MainArea").style.position = "fixed";
    if (document.querySelector(".PA-TradeShopPanel").style.display != "block") {
        CloseAllStartingAreas();
        document.querySelector(".PA-TradeShopPanel").style.display = "block";
        //$(".PA-Message").keyup();
        //document.querySelector(".PA-Message").style.height = "";
        //document.querySelector(".PA-Message").style.height = document.querySelector(".PA-Message").scrollHeight - 20 + "px";
        //$(".PA-FTAvailableBunchesText").remove();
        //$(".PA-LFAvailableBunchesText").remove();
        $.post(url + "/PHP/search_id.php", { searchID: searchInfoText }, TradeShopInfo);
        //$.post(url + "/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
        if (document.querySelector(".PA-Searchbar").value != "") {
            window.location.hash = "users/" + searchData.uuid;
            document.querySelector(".PA-Message").style.height = document.querySelector(".PA-Message").scrollHeight - 25 + "px";
        } else {
            RemoveHash();
        }
    }

    if (userData != null && searchInfoText == userData.user_id) {
        document.querySelector(".PA-Message").disabled = false;
        document.querySelector(".PA-ContactIcon").style.display = "none";
    }

    if (userData == null || userData != null && searchInfoText != userData.user_id) {
        document.querySelector(".PA-ContactIcon").style.display = "unset";
    }
});

$(".MA-UserLogin").click(function () {
    if (creationInProgress || placingPokemon) {
        CreationInProgress();
        return;
    }
    //CloseAll();
    //ctsSeaching = false;
    //currentlyImporting = false;
    //document.querySelector("#MainArea").style.display = "block";
    //document.querySelector("#MainArea").style.position = "fixed";
    //document.querySelector("#LoginArea").style.display = "block";

    document.querySelector("#BunchArea").style.display = "none";
    document.querySelector("#CTSArea").style.display = "none";
    document.querySelector("#DetailsArea").style.display = "none";
    document.querySelector("#FilterArea").style.display = "none";
    document.querySelector("#InformationArea").style.display = "none";
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector("#ImportArea").style.display = "none";
    document.querySelector("#CommunicationArea").style.display = "none";
    document.querySelector("#ViewingArea").style.display = "none";
    document.querySelector("#MainArea").style.position = "fixed";

    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector(".PA-TradeShopPanel").style.display = "none";
    document.querySelector(".PA-SettingsPanel").style.display = "none";
    document.querySelector("#LoginArea").style.display = "block";

    if (token != null) {
        document.querySelector(".LA-LoggedInArea").style.display = "block";
        document.querySelector(".LA-AvatarOptions").style.display = "none";
    } else {
        document.querySelector(".LA-LoginArea").style.display = "block";
    }
});

$('.MA-PokemonData').click(function () {
    CloseAll();
    if (document.querySelector("#SelectionArea").style.display != "fixed") {
        document.querySelector("#MainArea").style.display = "block";
        document.querySelector("#MainArea").style.position = "fixed";
    }
    IAPokemonDropdown.value = "Bulbasaur";
    shinyStatus = "";
    document.querySelector(".IA-ShinySprite").setAttribute("src", url + "/Resources/Designs/Not Shiny Icon.png");
    $('.IA-PokemonDropdown').change();
    document.querySelector("#InformationArea").style.display = "block";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#CTSArea").style.display = "none";
});

$('.MA-CTS').click(function () {
    CTSResetFilters();
    document.querySelector(".PA-Searchbar").value = "";
    searchInfoText = document.querySelector(".PA-Searchbar").value;
    localStorage.setItem('searchID', searchInfoText);
    $(".PA-Searchbar").keyup();
    $(".PA-Message").keyup();
    document.querySelector(".PA-Message").style.height = "";
    document.querySelector(".PA-Message").style.height = document.querySelector(".PA-Message").scrollHeight - 20 + "px";
    CloseAll();
    ctsSeaching = true;
    //ctsPokemonDropdown.value = "Abomasnow";
    $('.CTS-PokemonDropdown').change();
    document.querySelector("#MainArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#InformationArea").style.display = "none";
    document.querySelector("#CTSArea").style.display = "block";
    document.querySelector("#SelectionArea").style.display = "grid";
    $("#GridContainer").remove();
    gridTest = document.createElement("div");
    gridTest.setAttribute("id", "GridContainer");
    document.getElementById("GeneratedSelection").appendChild(gridTest);
    document.querySelector(".SA-Bunch").innerHTML = "Community Trade Station";
    document.querySelector(".SA-Bunch").style.opacity = "100%";
    document.querySelector(".SA-CreateButton").style.display = "none";
    document.querySelector(".SA-MoveButton").style.display = "none";
    document.querySelector(".SA-CopyButton").style.display = "none";
    $.post(url + "/PHP/modify_check.php", { token: token, searchID: 0 }, ModifyCheck);
});

$('.MA-ImportTradeSheet').click(function () {
    if (userData == null) {
        LoginRequired();
        return;
    }
    CloseAll();
    currentlyImporting = true;
    /*document.querySelector(".PA-Searchbar").value = userData.user_id;
    searchInfoText = document.querySelector(".PA-Searchbar").value;
    localStorage.setItem('searchID', searchInfoText);
    $(".PA-Searchbar").keyup();
    $(".PA-Message").keyup();
    document.querySelector(".PA-Message").style.height = "";
    document.querySelector(".PA-Message").style.height = document.querySelector(".PA-Message").scrollHeight - 20 + "px";*/

    document.querySelector("#ImportArea").style.display = "block";
    document.querySelector("#SelectionArea").style.display = "grid";
    $("#GridContainer").remove();
    gridTest = document.createElement("div");
    gridTest.setAttribute("id", "GridContainer");
    document.getElementById("GeneratedSelection").appendChild(gridTest);
    document.querySelector(".SA-Bunch").innerHTML = "Importing TradeSheet";
    document.querySelector(".SA-Bunch").style.opacity = "100%";
    document.querySelector(".SA-Bunch").style.opacity = "100%";
    document.querySelector(".SA-CreateButton").style.display = "none";
    document.querySelector(".SA-MoveButton").style.display = "none";
    document.querySelector(".SA-CopyButton").style.display = "none";
    $.post(url + "/PHP/modify_check.php", { token: token, searchID: 0 }, ModifyCheck);
});

$('.MA-Discord').click(function () {
    window.open(
        'https://discord.gg/KapqJKGMRy', '_blank'
    );
});

$('.MA-Giveaway').click(function () {
    document.querySelector(".PA-Searchbar").value = "";
    searchInfoText = document.querySelector(".PA-Searchbar").value;
    localStorage.setItem('searchID', searchInfoText);
    $(".PA-Searchbar").keyup();
    $(".PA-Message").keyup();
    document.querySelector(".PA-Message").style.height = "";
    document.querySelector(".PA-Message").style.height = document.querySelector(".PA-Message").scrollHeight - 20 + "px";
    CloseAll();
    document.querySelector("#MainArea").style.display = "block";
    document.querySelector("#MainArea").style.position = "fixed";
    document.querySelector("#DetailsArea").style.display = "block";
    showingGiveaway = true;
    pokemonDetails = giveawayDetails;
    ShowPokemonDetails();
    $.post(url + "/PHP/modify_check_viewing.php", { token: token, searchID: 0 }, ModifyCheckViewing);
});

$('.MA-BallLegality').click(function () {
    CloseAllStartingAreas();
    document.querySelector("#MainArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#TrackingArea").style.display = "grid";
    if (document.querySelector("#ViewingArea").style.display == "block") {
        if (panelsPositions == "right") {
            document.querySelector("#TA-TopRow").style.marginRight = "420px";
            document.querySelector("#TrackingSelection").style.marginRight = "420px";
            document.querySelector("#TA-TopRow").style.marginLeft = "unset";
            document.querySelector("#TrackingSelection").style.marginLeft = "unset";
        }
        else if (panelsPositions == "left") {
            document.querySelector("#TA-TopRow").style.marginLeft = "420px";
            document.querySelector("#TrackingSelection").style.marginLeft = "420px";
            document.querySelector("#TA-TopRow").style.marginRight = "unset";
            document.querySelector("#TrackingSelection").style.marginRight = "unset";
        }
    }
    //window.location.hash = "legalitylist";
});

$('.MA-Tracker').click(function () {
    if (userData == null) {
        LoginRequired();
        return;
    }
    CloseAllStartingAreas();
    if (document.querySelector("#TrackingArea").style.display != "grid") {
        document.querySelector("#MainArea").style.display = "block";
        document.querySelector("#MainArea").style.position = "fixed";
    }
    if (document.querySelector("#TrackingArea").style.display == "grid") {
        if (panelsPositions == "right") {
            document.querySelector("#TA-TopRow").style.marginRight = "420px";
            document.querySelector("#TrackingSelection").style.marginRight = "420px";
            document.querySelector("#TA-TopRow").style.marginLeft = "unset";
            document.querySelector("#TrackingSelection").style.marginLeft = "unset";
        }
        else if (panelsPositions == "left") {
            document.querySelector("#TA-TopRow").style.marginLeft = "420px";
            document.querySelector("#TrackingSelection").style.marginLeft = "420px";
            document.querySelector("#TA-TopRow").style.marginRight = "unset";
            document.querySelector("#TrackingSelection").style.marginRight = "unset";
        }
    }
    document.querySelector("#ViewingArea").style.display = "block";
    document.querySelector("#InformationArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#LoginArea").style.display = "none";
    document.querySelector("#CommunicationArea").style.display = "none";
});

function CloseAllStartingAreas() {
    document.querySelector(".PA-SettingsPanel").style.display = "none";
    document.querySelector(".PA-TradeShopPanel").style.display = "none";
    document.querySelector("#LoginArea").style.display = "none";
    RemoveHash();
}

function CloseAll() {
    showingGiveaway = false;
    creationInProgress = false;
    placingPokemon = false;
    ctsSeaching = false;
    currentlyImporting = false;
    document.querySelector("#BunchArea").style.display = "none";
    document.querySelector("#CTSArea").style.display = "none";
    document.querySelector("#DetailsArea").style.display = "none";
    document.querySelector("#FilterArea").style.display = "none";
    document.querySelector("#InformationArea").style.display = "none";
    document.querySelector("#LoginArea").style.display = "none";
    document.querySelector("#MainArea").style.display = "none";
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#SelectionArea").style.display = "none";
    document.querySelector("#ImportArea").style.display = "none";
    document.querySelector("#CommunicationArea").style.display = "none";
    document.querySelector("#TrackingArea").style.display = "none";
    document.querySelector("#ViewingArea").style.display = "none";

    document.querySelector(".PA-SettingsPanel").style.display = "none";
    document.querySelector(".PA-TradeShopPanel").style.display = "none";
    document.querySelector("#LoginArea").style.display = "none";
    document.querySelector("#MainArea").style.position = "absolute";
}
