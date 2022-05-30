bunchIcon = "Abomasnow";
bunchShiny = "(Any Shiny or Normal)";
bunchGender = "(Any Gender)";

bunchIconDropdown = document.querySelector(".BA-IconDropdown");
bunchGenderDropdown = document.querySelector(".BA-GenderDropdown");
bunchShinyDropdown = document.querySelector(".BA-ShinyDropdown");
bunchInput = document.querySelector(".BA-BunchInput");
bunchNewName = document.querySelector(".BA-BunchNewName");
bunchToRenameDropdown = document.querySelector(".BA-BunchRename");

$('.BA-CloseButton').click(function () {
    document.querySelector("#BunchArea").style.display = "none";
    document.querySelector("#PanelArea").style.display = "block";
    BunchReset();
});

$('.BA-IconDropdown').change(function () {
    bunchIcon = bunchIconDropdown.value;
    ValidateIcon();
});

$('.BA-GenderDropdown').change(function () {
    bunchGender = bunchGenderDropdown.value;
    ValidateIcon();
});

$('.BA-ShinyDropdown').change(function () {
    bunchShiny = bunchShinyDropdown.value;
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
        $.post(url + "/PHP/create_or_update_bunch.php", { token: token, creationID: tempCreationID, name: bunchInput.value, icon: bunchIcon, gender: bunchGender, shiny: bunchShiny, tradeOption: tradeOption }, BunchChanges);
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
    bunchIcon = "Abomasnow";
    bunchShiny = "(Any Shiny or Normal)";
    bunchGender = "(Any Gender)";

    document.querySelector(".BA-GenderDropdown").value = "(Any Gender)";
    document.querySelector(".BA-ShinyDropdown").value = "(Any Shiny or Normal)";
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

    SetImage(document.querySelector(".BA-IconImage"), bunchIcon, bunchGender, bunchShiny)

    /*if (iconExclusivesArray.includes(bunchIcon)) {
        if (allBallsArray.includes(bunchIcon) || bunchIcon == "Egg") {
            document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Small Icons/" + bunchIcon + ".png");
        }
        else if (bunchIcon.includes("HP")) {
            document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Misc/" + bunchIcon + ".png");
        }
        else if (bunchIcon.includes("Ribbon")) {
            document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Images/Dreamworld Artwork/Small Icons/Ribbons/" + bunchIcon + ".png");
        }
        else {
            if (!bunchShiny.includes("Normal")) {
                document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/" + bunchIcon + ".png");
            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Home/" + bunchIcon + ".png");
            }
        }
    }
    else {
        if (shinyExceptionArray.includes(bunchIcon) && !bunchShiny.includes("Normal")) {
            if (bunchIcon.includes("Minior")) {
                if (bunchGender.includes("Genderless") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/Minior.png");
                }
            } else if (bunchIcon.includes("Alcremie-Strawberry")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Strawberry.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Berry")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Berry.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Love")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Love.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Star")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Star.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Clover")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Clover.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Flower")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Flower.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Ribbon")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Ribbon.png");
                }
            }
        }

        else if (shinyLockedArray.includes(bunchIcon) && !bunchShiny.includes("Normal")) {
            document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Fennel2.png");
        }

        else if (genderlessPokemonArray.includes(bunchIcon)) {
            if (bunchGender.includes("Genderless") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Home/" + bunchIcon + ".png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/" + bunchIcon + ".png")
                }

            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (maleOnlyPokemonArray.includes(bunchIcon)) {
            if (bunchGender.includes("Male") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Home/" + bunchIcon + ".png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/" + bunchIcon + ".png")
                }

            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (femaleOnlyPokemonArray.includes(bunchIcon)) {
            if (bunchGender.includes("Female") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Home/" + bunchIcon + ".png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/" + bunchIcon + ".png")
                }

            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        else if (genderDifferencesArray.includes(bunchIcon)) {
            if (bunchGender.includes("Male") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Home/" + bunchIcon + "-Male.png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/" + bunchIcon + "-Male.png")
                }

            }
            else if (bunchGender.includes("Female") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Home/" + bunchIcon + "-Female.png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/" + bunchIcon + "-Female.png")
                }

            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Fennel2.png");
            }
        }
        //For Normal pokemon without any gender differences or specific genders
        else if (!genderlessPokemonArray.includes(bunchIcon)) {
            if (!bunchGender.includes("Genderless") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Home/" + bunchIcon + ".png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/HomeShiny/" + bunchIcon + ".png")
                }

            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Fennel2.png");
            }
        } else {
            document.querySelector(".BA-IconImage").setAttribute("src", url + "/Resources/Fennel2.png");
        }
    }*/
}