bunchIconDropdown = document.querySelector(".BA-IconDropdown");
bunchGenderDropdown = document.querySelector(".BA-GenderDropdown");
bunchShinyDropdown = document.querySelector(".BA-ShinyDropdown");
bunchGameDropdown = document.querySelector(".BA-GameDropdown");
bunchInput = document.querySelector(".BA-BunchInput");
bunchNewName = document.querySelector(".BA-BunchNewName");
bunchToRenameDropdown = document.querySelector(".BA-BunchRename");

$('.BA-CloseButton').click(function () {
    /*CloseAll();
    document.querySelector("#MainArea").style.display = "block";
    document.querySelector("#PanelArea").style.display = "block";*/
    document.querySelector("#MainArea").style.position = "absolute";
    document.querySelector("#BunchArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "block";
    document.querySelector(".PA-TradeShopPanel").style.display = "block";
    BunchReset();
});

$('.BA-IconDropdown').change(function () {
    ValidateIcon();
});

$('.BA-GenderDropdown').change(function () {
    ValidateIcon();
});

$('.BA-ShinyDropdown').change(function () {
    ValidateIcon();
});

$('.BA-GameDropdown').change(function () {
    ValidateIcon();
});

$('.BA-AddBunch').click(function () {
    if (bunchInput.value != "All Pokemon" && bunchInput.value != "(No Bunch)" && bunchInput.value != "") {
        var tempCreationID = "";
        for (let i = 0; i < userBunchArray.length; i++) {
            if (bunchInput.value == userBunchArray[i].name) {
                tempCreationID = userBunchArray[i].creation_id;
                break;
            }
        }
        $.post(url + "/PHP/create_or_update_bunch.php", { token: token, creationID: tempCreationID, name: bunchInput.value, icon: bunchIconDropdown.value, gender: bunchGenderDropdown.value, shiny: bunchShinyDropdown.value, game: bunchGameDropdown.value, tradeOption: tradeOption }, BunchChanges);
    } else {
        document.querySelector("#NotificationArea").style.display = "block";
        document.querySelector(".BunchIconError").style.display = "block";
    }
});

$('.BA-RemoveBunch').click(function () {
    if (bunchInput.value != "All Pokemon" && bunchInput.value != "(No Bunch)" && bunchInput.value != "") {
        var tempCreationID = "";
        for (let i = 0; i < userBunchArray.length; i++) {
            if (bunchInput.value == userBunchArray[i].name) {
                tempCreationID = userBunchArray[i].creation_id;
                break;
            }
        } if (tempCreationID == "") {
            document.querySelector("#NotificationArea").style.display = "block";
            document.querySelector(".BunchIconError").style.display = "block";
        } else {
            $.post(url + "/PHP/delete_bunch.php", { token: token, creationID: tempCreationID, tradeOption: tradeOption }, BunchRemoved);
            PostGenerateSelectionData();
        }
    } else {
        document.querySelector("#NotificationArea").style.display = "block";
        document.querySelector(".BunchIconError").style.display = "block";
    }
});

$('.BA-RenameBunch').click(function () {
    if (bunchNewName.value != "All Pokemon" && bunchNewName.value != "(No Bunch)" && bunchNewName.value != "" && bunchToRenameDropdown.value != "(No Bunch)") {
        var existingName = false;

        for (let i = 0; i < userBunchArray.length; i++) {
            if (bunchNewName.value == userBunchArray[i].name) {
                existingName = true;
                document.querySelector("#NotificationArea").style.display = "block";
                document.querySelector(".BunchIconError").style.display = "block";
                break;
            }
        }
        if (existingName == false) {
            console.log("Yay?");
            var tempCreationID = "";
            for (let i = 0; i < userBunchArray.length; i++) {
                if (bunchToRenameDropdown.value == userBunchArray[i].name) {
                    tempCreationID = userBunchArray[i].creation_id;
                    break;
                }
            }
            $.post(url + "/PHP/rename_bunch_selection.php", { token: token, creationID: tempCreationID, newName: bunchNewName.value, oldName: bunchToRenameDropdown.value, tradeOption: tradeOption }, BunchRenamed);
            PostGenerateSelectionData();
            if (bunchname == bunchToRenameDropdown.value) {
                bunchname = tempBunchName;
                document.querySelector(".SA-Bunch").innerHTML = tempBunchName;
            }
        }
    } else {
        document.querySelector("#NotificationArea").style.display = "block";
        document.querySelector(".BunchIconError").style.display = "block";
    }
});

function BunchReset() {
    document.querySelector(".BA-GenderDropdown").value = "(Any Gender)";
    document.querySelector(".BA-ShinyDropdown").value = "(Any Shiny or Normal)";
    document.querySelector(".BA-GameDropdown").value = "(Any Game)";
    document.querySelector(".BA-IconDropdown").value = "Abomasnow";
    document.querySelector(".BA-BunchInput").value = "";
    document.querySelector(".BA-BunchRename").value = "(No Bunch)";
    document.querySelector(".BA-BunchNewName").value = "";

    ValidateIcon();
}

function BunchChanges() {
    $.post(url + "/PHP/generate_all_bunches.php", { token: token, tradeOption: tradeOption }, UserBunches);
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".BunchPokemonAdded").style.display = "block";
    //PostGenerateSelectionData(); is now in the button click.

}

function BunchRemoved() {
    if (bunchname == document.querySelector(".BA-BunchInput").value) {
        bunchname = "(No Bunch)";
    }
    $.post(url + "/PHP/generate_all_bunches.php", { token: token, tradeOption: tradeOption }, UserBunches);
    //The Below is now in the button click.
    /*PostGenerateSelection();
    PostGenerateSelectionData();
    //document.querySelector(".DA-Close").click();*/
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".BunchPokemonRemoved").style.display = "block";
}

function BunchRenamed(data) {
    console.log(data);
    $.post(url + "/PHP/generate_all_bunches.php", { token: token, tradeOption: tradeOption }, UserBunches);
    ShowLoading();
    PostGenerateSelection();
    PostGenerateSelectionData();
    //document.querySelector("#NotificationArea").style.display = "block";
    //document.querySelector(".BunchPokemonAdded").style.display = "block";
}

function ValidateIcon() {

    SetImage(document.querySelector(".BA-IconImage"), bunchIconDropdown.value, bunchGenderDropdown.value, bunchShinyDropdown.value, bunchGameDropdown.value);
}