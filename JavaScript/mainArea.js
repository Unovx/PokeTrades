var searchData;
var tradeOption;
searchInfoText = (document.querySelector(".MA-Searchbar").value);
searchInfoText.value = "";
searchInfoText.innerHTML = "";

$(".MA-Searchbar").click(function () {
    CloseLoginArea();
})

$(".MA-Searchbar").keyup(function () {
    CloseLoginArea();
    searchInfoText = (document.querySelector(".MA-Searchbar").value);
    $.post("https://poketrades.org/PHP/search_id.php", { searchID: searchInfoText }, TradeSheetInfo);
    $.post("https://poketrades.org/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
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
    //If there is a value in the InputField
    if (searchInfoText != "") {
        CloseLoginArea();
        tradeOption = "For Trade";
        document.querySelector("#MainArea").style.display = "none";
        document.querySelector("#SelectionArea").style.height = "100%";
        document.querySelector("#SelectionArea").style.display = "block";
        $.post("https://poketrades.org/PHP/generate_all_bunches.php", { token: token, tradeOption: tradeOption }, UserBunches);
        if (searchInfoText != "") {
            PostGenerateSelection();
            //$.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, GenerateBunch);

            $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, tradeOption: "Looking For" }, MatchMaking);
        }
    }
});

$('.MA-LookingForImage').click(function () {
    //If there is a value in the InputField
    if (searchInfoText != "") {
        CloseLoginArea();
        tradeOption = "Looking For";
        document.querySelector("#MainArea").style.display = "none";
        document.querySelector("#SelectionArea").style.height = "100%";
        document.querySelector("#SelectionArea").style.display = "block";
        $.post("https://poketrades.org/PHP/generate_all_bunches.php", { token: token, tradeOption: tradeOption }, UserBunches);
        if (searchInfoText != "") {
            PostGenerateSelection();
            //$.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, GenerateBunch);

            $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, tradeOption: "Looking For" }, MatchMaking);
        }
    }
});

function TradeSheetInfo(data) {
    if (data != "") {
        searchData = jQuery.parseJSON(data);
        console.log(searchData);
        document.querySelector(".MA-TradeSheetInfo").innerHTML = searchData.username + "'s " + "TradeSheet";
        document.querySelector(".MA-Message").innerHTML = searchData.personal_text;
        document.querySelector(".VA-Username").innerHTML = searchData.username + "#" + searchData.user_id;
    } else if (searchInfoText == "") {
        document.querySelector(".MA-TradeSheetInfo").innerHTML = " Search TradeSheets";
        document.querySelector(".MA-Message").innerHTML = "This is a current work in progress, so please excuse any slight issues. Click on either of the Icons to see a selection of the Pokemon people have for trade or are looking for after typing in their User ID. Users who sign in, can edit this text which will show when their User ID is typed in.";
    } else {
        document.querySelector(".MA-TradeSheetInfo").innerHTML = " Search TradeSheets";
        document.querySelector(".MA-Message").innerHTML = "";
    }
}

//Checking if the user is allowed to create and move data in the selection area.
function ModifyCheck(data) {
    if (data != "") {
        document.querySelector(".SA-MoveButton").style.pointerEvents = "initial";
        document.querySelector(".SA-MoveButton").style.backgroundColor = "#efefef";
        document.querySelector(".SA-CreateButton").style.pointerEvents = "initial";
        document.querySelector(".SA-CreateButton").style.backgroundColor = "#efefef";
        filterDisplay.disabled = false;
    } else {
        document.querySelector(".SA-MoveButton").style.pointerEvents = "none";
        document.querySelector(".SA-MoveButton").style.backgroundColor = "grey";
        document.querySelector(".SA-CreateButton").style.pointerEvents = "none";
        document.querySelector(".SA-CreateButton").style.backgroundColor = "grey";
        filterDisplay.disabled = true;
    }
}

//Checking if the user is allowed to modify and delete data in the viewing area.
function ModifyCheckViewing(data) {
    if (data != "") {
        document.querySelector(".VA-ModifyButton").style.pointerEvents = "initial";
        document.querySelector(".VA-ModifyButton").style.backgroundColor = "#efefef";
        document.querySelector(".VA-DeleteButton").style.pointerEvents = "initial";
        document.querySelector(".VA-DeleteButton").style.backgroundColor = "#efefef";
    } else {
        document.querySelector(".VA-ModifyButton").style.pointerEvents = "none";
        document.querySelector(".VA-ModifyButton").style.backgroundColor = "grey";
        document.querySelector(".VA-DeleteButton").style.pointerEvents = "none";
        document.querySelector(".VA-DeleteButton").style.backgroundColor = "grey";
    }
}