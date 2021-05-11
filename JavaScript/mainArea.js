var searchData;
var tradeOption;
var searchInfoText;

$(".MA-Searchbar").click(function () {
    CloseLoginArea();
})

$(".MA-Searchbar").keyup(function () {
    CloseLoginArea();
    searchInfoText = (document.querySelector(".MA-Searchbar").value);
    $.post("https://poketrades.org/PHP/search_id.php", { searchID: searchInfoText }, DoStuff);
})

$(".MA-LoginButton").click(function () {
    if (document.querySelector("#LoginArea").style.display == "block") {
        CloseLoginArea();
    } else {
        //So it resets everything such as the inputfields and closes all the areas is why this method is called first.
        CloseLoginArea();
        if (signedIn) {
            document.querySelector("#LoginArea").style.display = "block";
            document.querySelector(".LA-LoggedInArea").style.display = "block";
        } else {
            document.querySelector("#LoginArea").style.display = "block";
            document.querySelector(".LA-LoginArea").style.display = "block";
        }
    }
});

$('.MA-ForTradeImage').click(function () {
    CloseLoginArea();
    tradeOption = "For Trade";
    document.querySelector("#MainArea").style.display = "none";
    document.querySelector("#SelectionArea").style.height = "100%";
    document.querySelector("#SelectionArea").style.display = "block";
    if (searchInfoText != "") {
        $.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, GenerateBunch);

        $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, tradeOption: "Looking For" }, MatchMaking);
    }
});

$('.MA-LookingForImage').click(function () {
    CloseLoginArea();
    tradeOption = "Looking For";
    document.querySelector("#MainArea").style.display = "none";
    document.querySelector("#SelectionArea").style.height = "100%";
    document.querySelector("#SelectionArea").style.display = "block";
    if (searchInfoText != "") {
        $.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, GenerateBunch);

        $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, tradeOption: "Looking For" }, MatchMaking);
    }
});

function DoStuff(data) {
    if (data != "") {
        searchData = jQuery.parseJSON(data);
        console.log(searchData);
        document.querySelector(".MA-TradeSheetInfo").innerHTML = searchData.username + "'s " + "TradeSheet";
        document.querySelector(".MA-Message").innerHTML = searchData.personal_text;
    } else if (searchInfoText == "") {
        document.querySelector(".MA-TradeSheetInfo").innerHTML = " Search TradeSheets";
        document.querySelector(".MA-Message").innerHTML = "This is a current work in progress, so please excuse any slight issues. Click on either of the Icons to see a selection of the Pokemon people have for trade or are looking for after typing in their User ID. Users who sign in, can edit this text which will show when their User ID is typed in.";
    } else {
        document.querySelector(".MA-TradeSheetInfo").innerHTML = " Search TradeSheets";
        document.querySelector(".MA-Message").innerHTML = "";
    }
}