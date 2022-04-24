var searchData;
var tradeOption;
var version = 1.25;

////customMessage = document.querySelector(".MA-Message");
//document.querySelector(".MA-Searchbar").value = localStorage.getItem('searchID');
////searchInfoText = (document.querySelector(".MA-Searchbar").value);


$(function UpdateWebsite() {
    setInterval(ForceRefresh, 60000);
});
$(document).ready(function () {
    ForceRefresh();
});

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


$('.MA-SettingsImage').click(function () {
    CloseAllStartingAreas();
    document.querySelector(".PA-SettingsPanel").style.display = "block";
});

$('.MA-SearchTradeShopsImage').click(function () {
    if (document.querySelector(".PA-TradeShopPanel").style.display != "block") {
        CloseAllStartingAreas();
        document.querySelector(".PA-TradeShopPanel").style.display = "block";
        $(".PA-Message").keyup();
        document.querySelector(".PA-Message").style.height = "";
        document.querySelector(".PA-Message").style.height = document.querySelector(".PA-Message").scrollHeight - 20 + "px";
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

$(".MA-UserLoginImage").click(function () {
    CloseAllStartingAreas();
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

$('.MA-OtherImage').click(function () {
    window.open(
        'https://discord.gg/KapqJKGMRy', '_blank'
    );
});

$('.MA-TrackingImage').click(function () {
    CloseAllStartingAreas();
    document.querySelector("#MainArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "none";
    document.querySelector("#TrackingArea").style.display = "grid";
    window.location.hash = "legalitylist";
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