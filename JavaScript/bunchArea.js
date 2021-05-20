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
        $.post("https://poketrades.org/PHP/create_or_update_bunch.php", { token: token, creationID: tempCreationID, name: bunchInput.value, icon: bunchIcon, gender: bunchGender, shiny: bunchShiny, tradeOption: tradeOption }, BunchChanges);
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
        }
        $.post("https://poketrades.org/PHP/delete_bunch.php", { token: token, creationID: tempCreationID, tradeOption: tradeOption }, BunchRemoved);
    }
});

$('.BA-RenameBunch').click(function () {
    if (bunchNewName.value != "All Pokemon" && bunchNewName.value != "(No Bunch)" && bunchNewName.value != "") {
        var existingName = false;

        for (let i = 0; i < userBunchArray.length; i++) {
            if (bunchNewName.value == userBunchArray[i].name) {
                existingName = true;
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
            $.post("https://poketrades.org/PHP/rename_bunch_selection.php", { token: token, creationID: tempCreationID, newName: bunchNewName.value, oldName: bunchToRenameDropdown.value, tradeOption: tradeOption }, BunchRenamed);
            if (bunchname == bunchToRenameDropdown.value) {
                bunchname = tempBunchName;
                document.querySelector(".SA-Bunch").innerHTML = tempBunchName;
            }
        }
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
    if (bunchname == "") {
        PostGenerateSelection();
        // $.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, GenerateBunch);
    }
    $.post("https://poketrades.org/PHP/generate_all_bunches.php", { token: token, tradeOption: tradeOption }, UserBunches);
}

function BunchRemoved() {
    if (bunchname == document.querySelector(".BA-BunchInput").value) {
        bunchname = "(No Bunch)";
    }
    $.post("https://poketrades.org/PHP/generate_all_bunches.php", { token: token, tradeOption: tradeOption }, UserBunches);
    PostGenerateSelection();
    /*if (bunchname == "") {
        $.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, GenerateBunch);
    } else {
        $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption, bunchname: bunchname }, GenerateSelection);
    }*/
    document.querySelector(".VA-CloseButton").click();
}

function BunchRenamed(data) {
    console.log(data);
    $.post("https://poketrades.org/PHP/generate_all_bunches.php", { token: token, tradeOption: tradeOption }, UserBunches);
    PostGenerateSelection();
    /*if (bunchname == "") {
        $.post("https://poketrades.org/PHP/generate_bunch_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption }, GenerateBunch);
    } else {
        $.post("https://poketrades.org/PHP/generate_selection.php", { token: token, searchID: searchData.user_id, tradeOption: tradeOption, bunchname: bunchname }, GenerateSelection);
    }*/
    document.querySelector(".VA-CloseButton").click();
}

function ValidateIcon() {

    if (iconExclusivesArray.includes(bunchIcon)) {
        if (allBallsArray.includes(bunchIcon) || bunchIcon.value == "Egg") {
            document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Images/Dreamworld Artwork/Small Icons/" + bunchIcon + ".png");
        }
        else if (bunchIcon.includes("HP")) {
            document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Misc/" + bunchIcon + ".png");
        }
        else {
            if (!bunchShiny.includes("Normal")) {
                document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + "-Shiny.png");
            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + ".png");
            }
        }
    }
    else {
        if (shinyExceptionArray.includes(bunchIcon) && !bunchShiny.includes("Normal")) {
            if (bunchIcon.includes("Minior")) {
                if (bunchGender.includes("Genderless") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/Minior-Shiny.png");
                }
            } else if (bunchIcon.includes("Alcremie-Strawberry")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Strawberry-Shiny.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Berry")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Berry-Shiny.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Love")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Love-Shiny.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Star")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Star-Shiny.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Clover")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Clover-Shiny.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Flower")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Flower-Shiny.png");
                }
            }
            else if (bunchIcon.includes("Alcremie-Ribbon")) {
                if (bunchGender.includes("Female") || bunchGender.includes("Any Gender")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Ribbon-Shiny.png");
                }
            }
        }

        else if (genderlessPokemonArray.includes(bunchIcon)) {
            if (bunchGender.includes("Genderless") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + ".png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + "-Shiny.png")
                }

            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
            }
        }
        else if (maleOnlyPokemonArray.includes(bunchIcon)) {
            if (bunchGender.includes("Male") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + ".png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + "-Shiny.png")
                }

            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
            }
        }
        else if (femaleOnlyPokemonArray.includes(bunchIcon)) {
            if (bunchGender.includes("Female") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + ".png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + "-Shiny.png")
                }

            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
            }
        }
        else if (genderDifferencesArray.includes(bunchIcon)) {
            if (bunchGender.includes("Male") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + "-Male.png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + "-Male-Shiny.png")
                }

            }
            else if (bunchGender.includes("Female") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + "-Female.png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + "-Female-Shiny.png")
                }

            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
            }
        }
        //For Normal pokemon without any gender differences or specific genders
        else if (!genderlessPokemonArray.includes(bunchIcon)) {
            if (!bunchGender.includes("Genderless") || bunchGender.includes("(Any Gender)")) {
                if (bunchShiny.includes("Normal")) {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + ".png")
                } else {
                    document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + bunchIcon + "-Shiny.png")
                }

            } else {
                document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
            }
        } else {
            document.querySelector(".BA-IconImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }
    }
}