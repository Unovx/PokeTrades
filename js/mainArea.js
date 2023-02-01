var searchData;
var tradeOption;
var giveawayDetails;
let showingGiveaway = false;
var version = 1.4;

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
    document.querySelector(".MA-CTS").style.pointerEvents = "initial";
    document.querySelector(".MA-PokemonData").style.pointerEvents = "initial";
}

function ForceRefresh() {
    $.post(url + "/PHP/version_check.php", { version: version }, CheckVersion);
}

function CheckVersion(data) {
    if (version != data) {
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


$('.MA-Settings').click(function () {
    $('.SA-MainMenu').click();
    CloseAll();
    document.querySelector("#MainArea").style.display = "block";
    document.querySelector("#MainArea").style.position = "fixed";
    document.querySelector("#PanelArea").style.display = "block";
    document.querySelector(".PA-SettingsPanel").style.display = "block";
    ctsSeaching = false;
    currentlyImporting = false;
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
        $.post(url + "/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
        if (document.querySelector(".PA-Searchbar").value != "") {
            window.location.hash = "users/" + searchData.uuid;
        } else {
            RemoveHash();
        }
    }
});

$(".MA-UserLogin").click(function () {
    CloseAll();
    ctsSeaching = false;
    currentlyImporting = false;
    document.querySelector("#MainArea").style.display = "block";
    document.querySelector("#MainArea").style.position = "fixed";
    document.querySelector("#LoginArea").style.display = "block";
    if (token != null) {
        document.querySelector(".LA-LoggedInArea").style.display = "block";
    } else {
        document.querySelector(".LA-LoginArea").style.display = "block";
    }
});

$('.MA-FAQImage').click(function () {
    CloseAllStartingAreas();
    document.querySelector(".PA-FAQPanel").style.display = "block";
});

$('.MA-ImportingTradeShopImage').click(function () {
    CloseAllStartingAreas();
    document.querySelector(".PA-ImportingPanel").style.display = "block";
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
});

$('.MA-ImportTradeSheet').click(function () {
    currentlyImporting = true;
    /*document.querySelector(".PA-Searchbar").value = userData.user_id;
    searchInfoText = document.querySelector(".PA-Searchbar").value;
    localStorage.setItem('searchID', searchInfoText);
    $(".PA-Searchbar").keyup();
    $(".PA-Message").keyup();
    document.querySelector(".PA-Message").style.height = "";
    document.querySelector(".PA-Message").style.height = document.querySelector(".PA-Message").scrollHeight - 20 + "px";*/
    CloseAll();
    document.querySelector("#ImportArea").style.display = "block";
    document.querySelector("#SelectionArea").style.display = "grid";
    $("#GridContainer").remove();
    gridTest = document.createElement("div");
    gridTest.setAttribute("id", "GridContainer");
    document.getElementById("GeneratedSelection").appendChild(gridTest);
    document.querySelector(".SA-Bunch").innerHTML = "Importing TradeSheet";
    document.querySelector(".SA-Bunch").style.opacity = "100%";
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

$('.MA-Tracker').click(function () {
    CloseAllStartingAreas();
    document.querySelector("#MainArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#TrackingArea").style.display = "grid";
    //window.location.hash = "legalitylist";
});

function CloseAllStartingAreas() {
    document.querySelector(".PA-WhatsNewPanel").style.display = "none";
    document.querySelector(".PA-SettingsPanel").style.display = "none";
    document.querySelector(".PA-TradeShopPanel").style.display = "none";
    document.querySelector("#LoginArea").style.display = "none";
    document.querySelector(".PA-FAQPanel").style.display = "none";
    document.querySelector(".PA-ImportingPanel").style.display = "none";
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
    document.querySelector("#TrackingArea").style.display = "none";

    document.querySelector(".PA-WhatsNewPanel").style.display = "none";
    document.querySelector(".PA-SettingsPanel").style.display = "none";
    document.querySelector(".PA-TradeShopPanel").style.display = "none";
    document.querySelector("#LoginArea").style.display = "none";
    document.querySelector(".PA-FAQPanel").style.display = "none";
    document.querySelector(".PA-ImportingPanel").style.display = "none";
    document.querySelector("#MainArea").style.position = "absolute";
}
