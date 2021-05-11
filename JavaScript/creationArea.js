/*$('.CA-PokemonDropdown').click(function () {
    PokemonDropdown();
    console.log("Testing");
});*/

var Gen6 = "Unavailable";
var Gen7 = "Unavailable";
var Gen8 = "Unavailable";
var Home = "Unavailable";
var pokemonValue = "Abomasnow";
var genderValue = "(Any Gender)";
var shinyValue = "(Any Shiny or Normal)";

$('.CA-Gen6').click(function () {
    if (Gen6 == "Unavailable") {
        Gen6 = "Available";
        document.querySelector(".CA-Gen6").style.backgroundColor = "#36E26E";
    } else {
        Gen6 = "Unavailable";
        document.querySelector(".CA-Gen6").style.backgroundColor = "#C83939";
    }
});

$('.CA-Gen7').click(function () {
    if (Gen6 == "Unavailable") {
        Gen6 = "Available";
        document.querySelector(".CA-Gen7").style.backgroundColor = "#36E26E";
    } else {
        Gen6 = "Unavailable";
        document.querySelector(".CA-Gen7").style.backgroundColor = "#C83939";
    }
});

$('.CA-Gen8').click(function () {
    if (Gen6 == "Unavailable") {
        Gen6 = "Available";
        document.querySelector(".CA-Gen8").style.backgroundColor = "#36E26E";
    } else {
        Gen6 = "Unavailable";
        document.querySelector(".CA-Gen8").style.backgroundColor = "#C83939";
    }
});

$('.CA-Home').click(function () {
    if (Gen6 == "Unavailable") {
        Gen6 = "Available";
        document.querySelector(".CA-Home").style.backgroundColor = "#36E26E";
    } else {
        Gen6 = "Unavailable";
        document.querySelector(".CA-Home").style.backgroundColor = "#C83939";
    }
});

$('.CA-PokemonDropdown').click(function () {
    pokemonValue = document.querySelector(".CA-PokemonDropdown").value;
    ValidateGender();
    ValidateShiny();
});

$('.CA-GenderDropdown').click(function () {
    genderValue = document.querySelector(".CA-GenderDropdown").value;
    ValidateGender();
    ValidateShiny();
});

$('.CA-ShinyDropdown').click(function () {
    shinyValue = document.querySelector(".CA-ShinyDropdown").value;
    ValidateGender();
    ValidateShiny();
});

function ValidateGender() {
    if (genderlessPokemonArray.includes(pokemonValue)) {
        if (genderValue.includes("Genderless") || genderValue.includes("(Any Gender)")) {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + ".png")
        } else {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }
    }
    else if (maleOnlyPokemonArray.includes(pokemonValue)) {
        if (genderValue.includes("Male") || genderValue.includes("(Any Gender)")) {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + ".png")
        } else {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }
    }
    else if (femaleOnlyPokemonArray.includes(pokemonValue)) {
        if (genderValue.includes("Female") || genderValue.includes("(Any Gender)")) {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + ".png")
        } else {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }
    }
    else if (genderDifferencesArray.includes(pokemonValue)) {
        if (genderValue.includes("Male") || genderValue.includes("(Any Gender)")) {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Male.png")
        }
        else if (genderValue.includes("Female") || genderValue.includes("(Any Gender)")) {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Female.png")
        } else {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }
    }
    //For Normal pokemon without any gender differences or specific genders
    else if (!genderlessPokemonArray.includes(pokemonValue)) {
        if (!genderValue.includes("Genderless") || genderValue.includes("(Any Gender)")) {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + ".png")
        } else {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        }
    } else {
        document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
    }
}

function ValidateShiny() {
    if (!shinyValue.includes("Normal")) {
        if (shinyLockedArray.includes(pokemonValue)) {
            document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
        } else {
            if (shinyExceptionArray.includes(pokemonValue)) {
                if (pokemonValue.includes("Minior")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Minior-Shiny.png");
                } else if (pokemonValue.includes("Alcremie-Strawberry")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Strawberry-Shiny.png");
                }
                else if (pokemonValue.includes("Alcremie-Berry")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Berry-Shiny.png");
                }
                else if (pokemonValue.includes("Alcremie-Love")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Love-Shiny.png");
                }
                else if (pokemonValue.includes("Alcremie-Star")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Star-Shiny.png");
                }
                else if (pokemonValue.includes("Alcremie-Clover")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Clover-Shiny.png");
                }
                else if (pokemonValue.includes("Alcremie-Flower")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Flower-Shiny.png");
                }
                else if (pokemonValue.includes("Alcremie-Ribbon")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/Alcremie-Ribbon-Shiny.png");
                }
            }
            else if (genderlessPokemonArray.includes(pokemonValue)) {
                if (genderValue.includes("Genderless") || genderValue.includes("(Any Gender)")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Shiny.png")
                } else {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
                }
            }
            else if (maleOnlyPokemonArray.includes(pokemonValue)) {
                if (genderValue.includes("Male") || genderValue.includes("(Any Gender)")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Shiny.png")
                } else {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
                }
            }
            else if (femaleOnlyPokemonArray.includes(pokemonValue)) {
                if (genderValue.includes("Female") || genderValue.includes("(Any Gender)")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Shiny.png")
                } else {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
                }
            }
            else if (genderDifferencesArray.includes(pokemonValue)) {
                if (genderValue.includes("Male") || genderValue.includes("(Any Gender)")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Male-Shiny.png")
                }
                else if (genderValue.includes("Female") || genderValue.includes("(Any Gender)")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Female-Shiny.png")
                } else {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
                }
            }
            //For Shiny pokemon without any gender differences or specific genders
            else if (!genderlessPokemonArray.includes(pokemonValue)) {
                if (!genderValue.includes("Genderless") || genderValue.includes("(Any Gender)")) {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Home/" + pokemonValue + "-Shiny.png")
                } else {
                    document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
                }
            } else {
                document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png");
            }
        }
    }
}

function CreationDropdowns() {
    PokemonDropdown();
    BallDropdown();
    GenderDropdown();
    ShinyDropdown();
    MintDropdown();
    MiscDropdown();
    MarkDropdown();
    NatureDropdown();
    AbilityDropdown();
    StatusDropdown();
    EventDropdown();
    IvHpDropdown();
    IvAttDropdown();
    IvDefDropdown();
    IvSpaDropdown();
    IvSpdDropdown();
    IvSpeDropdown();
    EvHpDropdown();
    EvAttDropdown();
    EvDefDropdown();
    EvSpaDropdown();
    EvSpdDropdown();
    EvSpeDropdown();
    Move1Dropdown();
    Move2Dropdown();
    Move3Dropdown();
    Move4Dropdown();
    LegacyMove2Dropdown();
    LegacyMove2Dropdown();
    LegacyMove2Dropdown();
    LegacyMove2Dropdown();
    HowObtainedDropdown();
    GameObtainedDropdown();
    LanguageDropdown();
}

function CreatePokemon() {
    if (document.querySelector(".CA-PokemonImage").setAttribute("src", "https://poketrades.org/Resources/Fennel2.png")) {
        if (tradeOption = "For Trade") {

        }
    }
}

function PokemonDropdown() {
    for (let i = 0; i < allPokemonArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-PokemonDropdown").appendChild(newOption);
        newOption.setAttribute("class", "PokemonDropdown" + (i));
        document.querySelector(".PokemonDropdown" + (i)).value = allPokemonArray[i];
        document.querySelector(".PokemonDropdown" + (i)).innerHTML = allPokemonArray[i];
    }
}

function BallDropdown() {
    for (let i = 0; i < allBallsArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-BallDropdown").appendChild(newOption);
        newOption.setAttribute("class", "BallDropdown" + (i));
        document.querySelector(".BallDropdown" + (i)).value = allBallsArray[i];
        document.querySelector(".BallDropdown" + (i)).innerHTML = allBallsArray[i];
    }
}

function GenderDropdown() {
    for (let i = 0; i < genderOptionsArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-GenderDropdown").appendChild(newOption);
        newOption.setAttribute("class", "GenderDropdown" + (i));
        document.querySelector(".GenderDropdown" + (i)).value = genderOptionsArray[i];
        document.querySelector(".GenderDropdown" + (i)).innerHTML = genderOptionsArray[i];
    }
}

function ShinyDropdown() {
    for (let i = 0; i < shinyOptionsArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-ShinyDropdown").appendChild(newOption);
        newOption.setAttribute("class", "ShinyDropdown" + (i));
        document.querySelector(".ShinyDropdown" + (i)).value = shinyOptionsArray[i];
        document.querySelector(".ShinyDropdown" + (i)).innerHTML = shinyOptionsArray[i];
    }
}

function MintDropdown() {
    for (let i = 0; i < mintOptionsArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-MintDropdown").appendChild(newOption);
        newOption.setAttribute("class", "MintDropdown" + (i));
        document.querySelector(".MintDropdown" + (i)).value = mintOptionsArray[i];
        document.querySelector(".MintDropdown" + (i)).innerHTML = mintOptionsArray[i];
    }
}

function MiscDropdown() {
    for (let i = 0; i < miscOptionsArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-MiscDropdown").appendChild(newOption);
        newOption.setAttribute("class", "MiscDropdown" + (i));
        document.querySelector(".MiscDropdown" + (i)).value = miscOptionsArray[i];
        document.querySelector(".MiscDropdown" + (i)).innerHTML = miscOptionsArray[i];
    }
}

function MarkDropdown() {
    for (let i = 0; i < allMarksArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-MarkDropdown").appendChild(newOption);
        newOption.setAttribute("class", "MarkDropdown" + (i));
        document.querySelector(".MarkDropdown" + (i)).value = allMarksArray[i];
        document.querySelector(".MarkDropdown" + (i)).innerHTML = allMarksArray[i];
    }
}

function NatureDropdown() {
    for (let i = 0; i < allNaturesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-NatureDropdown").appendChild(newOption);
        newOption.setAttribute("class", "NatureDropdown" + (i));
        document.querySelector(".NatureDropdown" + (i)).value = allNaturesArray[i];
        document.querySelector(".NatureDropdown" + (i)).innerHTML = allNaturesArray[i];
    }
}

function AbilityDropdown() {
    for (let i = 0; i < allAbilitiesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-AbilityDropdown").appendChild(newOption);
        newOption.setAttribute("class", "AbilityDropdown" + (i));
        document.querySelector(".AbilityDropdown" + (i)).value = allAbilitiesArray[i];
        document.querySelector(".AbilityDropdown" + (i)).innerHTML = allAbilitiesArray[i];
    }
}

function StatusDropdown() {
    for (let i = 0; i < statusOptionsArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-StatusDropdown").appendChild(newOption);
        newOption.setAttribute("class", "StatusDropdown" + (i));
        document.querySelector(".StatusDropdown" + (i)).value = statusOptionsArray[i];
        document.querySelector(".StatusDropdown" + (i)).innerHTML = statusOptionsArray[i];
    }
}

function EventDropdown() {
    for (let i = 0; i < eventOptionsArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-EventDropdown").appendChild(newOption);
        newOption.setAttribute("class", "EventDropdown" + (i));
        document.querySelector(".EventDropdown" + (i)).value = eventOptionsArray[i];
        document.querySelector(".EventDropdown" + (i)).innerHTML = eventOptionsArray[i];
    }
}

function IvHpDropdown() {
    for (let i = 0; i < ivValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-IvHP").appendChild(newOption);
        newOption.setAttribute("class", "IvHPDropdown" + (i));
        document.querySelector(".IvHPDropdown" + (i)).value = ivValuesArray[i];
        document.querySelector(".IvHPDropdown" + (i)).innerHTML = ivValuesArray[i];
    }
}

function IvAttDropdown() {
    for (let i = 0; i < ivValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-IvAtt").appendChild(newOption);
        newOption.setAttribute("class", "IvAttDropdown" + (i));
        document.querySelector(".IvAttDropdown" + (i)).value = ivValuesArray[i];
        document.querySelector(".IvAttDropdown" + (i)).innerHTML = ivValuesArray[i];
    }
}

function IvDefDropdown() {
    for (let i = 0; i < ivValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-IvDef").appendChild(newOption);
        newOption.setAttribute("class", "IvDefDropdown" + (i));
        document.querySelector(".IvDefDropdown" + (i)).value = ivValuesArray[i];
        document.querySelector(".IvDefDropdown" + (i)).innerHTML = ivValuesArray[i];
    }
}

function IvSpaDropdown() {
    for (let i = 0; i < ivValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-IvSpa").appendChild(newOption);
        newOption.setAttribute("class", "IvSpaDropdown" + (i));
        document.querySelector(".IvSpaDropdown" + (i)).value = ivValuesArray[i];
        document.querySelector(".IvSpaDropdown" + (i)).innerHTML = ivValuesArray[i];
    }
}

function IvSpdDropdown() {
    for (let i = 0; i < ivValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-IvSpd").appendChild(newOption);
        newOption.setAttribute("class", "IvSpdDropdown" + (i));
        document.querySelector(".IvSpdDropdown" + (i)).value = ivValuesArray[i];
        document.querySelector(".IvSpdDropdown" + (i)).innerHTML = ivValuesArray[i];
    }
}

function IvSpeDropdown() {
    for (let i = 0; i < ivValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-IvSpe").appendChild(newOption);
        newOption.setAttribute("class", "IvSpeDropdown" + (i));
        document.querySelector(".IvSpeDropdown" + (i)).value = ivValuesArray[i];
        document.querySelector(".IvSpeDropdown" + (i)).innerHTML = ivValuesArray[i];
    }
}

function EvHpDropdown() {
    for (let i = 0; i < evValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-EvHP").appendChild(newOption);
        newOption.setAttribute("class", "EvHPDropdown" + (i));
        document.querySelector(".EvHPDropdown" + (i)).value = evValuesArray[i];
        document.querySelector(".EvHPDropdown" + (i)).innerHTML = evValuesArray[i];
    }
}

function EvAttDropdown() {
    for (let i = 0; i < evValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-EvAtt").appendChild(newOption);
        newOption.setAttribute("class", "EvAttDropdown" + (i));
        document.querySelector(".EvAttDropdown" + (i)).value = evValuesArray[i];
        document.querySelector(".EvAttDropdown" + (i)).innerHTML = evValuesArray[i];
    }
}

function EvDefDropdown() {
    for (let i = 0; i < evValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-EvDef").appendChild(newOption);
        newOption.setAttribute("class", "EvDefDropdown" + (i));
        document.querySelector(".EvDefDropdown" + (i)).value = evValuesArray[i];
        document.querySelector(".EvDefDropdown" + (i)).innerHTML = evValuesArray[i];
    }
}

function EvSpaDropdown() {
    for (let i = 0; i < evValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-EvSpa").appendChild(newOption);
        newOption.setAttribute("class", "EvSpaDropdown" + (i));
        document.querySelector(".EvSpaDropdown" + (i)).value = evValuesArray[i];
        document.querySelector(".EvSpaDropdown" + (i)).innerHTML = evValuesArray[i];
    }
}

function EvSpdDropdown() {
    for (let i = 0; i < evValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-EvSpd").appendChild(newOption);
        newOption.setAttribute("class", "EvSpdDropdown" + (i));
        document.querySelector(".EvSpdDropdown" + (i)).value = evValuesArray[i];
        document.querySelector(".EvSpdDropdown" + (i)).innerHTML = evValuesArray[i];
    }
}

function EvSpeDropdown() {
    for (let i = 0; i < evValuesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-EvSpe").appendChild(newOption);
        newOption.setAttribute("class", "EvSpeDropdown" + (i));
        document.querySelector(".EvSpeDropdown" + (i)).value = evValuesArray[i];
        document.querySelector(".EvSpeDropdown" + (i)).innerHTML = evValuesArray[i];
    }
}

function Move1Dropdown() {
    for (let i = 0; i < allMovesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-Move1").appendChild(newOption);
        newOption.setAttribute("class", "Move1Dropdown" + (i));
        document.querySelector(".Move1Dropdown" + (i)).value = allMovesArray[i];
        document.querySelector(".Move1Dropdown" + (i)).innerHTML = allMovesArray[i];
    }
}

function Move2Dropdown() {
    for (let i = 0; i < allMovesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-Move2").appendChild(newOption);
        newOption.setAttribute("class", "Move2Dropdown" + (i));
        document.querySelector(".Move2Dropdown" + (i)).value = allMovesArray[i];
        document.querySelector(".Move2Dropdown" + (i)).innerHTML = allMovesArray[i];
    }
}

function Move3Dropdown() {
    for (let i = 0; i < allMovesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-Move3").appendChild(newOption);
        newOption.setAttribute("class", "Move3Dropdown" + (i));
        document.querySelector(".Move3Dropdown" + (i)).value = allMovesArray[i];
        document.querySelector(".Move3Dropdown" + (i)).innerHTML = allMovesArray[i];
    }
}

function Move4Dropdown() {
    for (let i = 0; i < allMovesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-Move4").appendChild(newOption);
        newOption.setAttribute("class", "Move4Dropdown" + (i));
        document.querySelector(".Move4Dropdown" + (i)).value = allMovesArray[i];
        document.querySelector(".Move4Dropdown" + (i)).innerHTML = allMovesArray[i];
    }
}

function LegacyMove1Dropdown() {
    for (let i = 0; i < allMovesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-LegacyMove1").appendChild(newOption);
        newOption.setAttribute("class", "LegacyMove1Dropdown" + (i));
        document.querySelector(".LegacyMove1Dropdown" + (i)).value = allMovesArray[i];
        document.querySelector(".LegacyMove1Dropdown" + (i)).innerHTML = allMovesArray[i];
    }
}

function LegacyMove2Dropdown() {
    for (let i = 0; i < allMovesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-LegacyMove2").appendChild(newOption);
        newOption.setAttribute("class", "LegacyMove2Dropdown" + (i));
        document.querySelector(".LegacyMove2Dropdown" + (i)).value = allMovesArray[i];
        document.querySelector(".LegacyMove2Dropdown" + (i)).innerHTML = allMovesArray[i];
    }
}

function LegacyMove3Dropdown() {
    for (let i = 0; i < allMovesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-LegacyMove3").appendChild(newOption);
        newOption.setAttribute("class", "LegacyMove3Dropdown" + (i));
        document.querySelector(".LegacyMove3Dropdown" + (i)).value = allMovesArray[i];
        document.querySelector(".LegacyMove3Dropdown" + (i)).innerHTML = allMovesArray[i];
    }
}

function LegacyMove4Dropdown() {
    for (let i = 0; i < allMovesArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-LegacyMove4").appendChild(newOption);
        newOption.setAttribute("class", "LegacyMove4Dropdown" + (i));
        document.querySelector(".LegacyMove4Dropdown" + (i)).value = allMovesArray[i];
        document.querySelector(".LegacyMove4Dropdown" + (i)).innerHTML = allMovesArray[i];
    }
}

function HowObtainedDropdown() {
    for (let i = 0; i < howObtainedArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-HowObtained").appendChild(newOption);
        newOption.setAttribute("class", "HowObtainedDropdown" + (i));
        document.querySelector(".HowObtainedDropdown" + (i)).value = howObtainedArray[i];
        document.querySelector(".HowObtainedDropdown" + (i)).innerHTML = howObtainedArray[i];
    }
}

function GameObtainedDropdown() {
    for (let i = 0; i < gameObtainedArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-GameObtained").appendChild(newOption);
        newOption.setAttribute("class", "GameObtainedDropdown" + (i));
        document.querySelector(".GameObtainedDropdown" + (i)).value = gameObtainedArray[i];
        document.querySelector(".GameObtainedDropdown" + (i)).innerHTML = gameObtainedArray[i];
    }
}

function LanguageDropdown() {
    for (let i = 0; i < languageOptionsArray.length; i++) {
        newOption = document.createElement("option");
        document.querySelector(".CA-Lang").appendChild(newOption);
        newOption.setAttribute("class", "LanguageDropdown" + (i));
        document.querySelector(".LanguageDropdown" + (i)).value = languageOptionsArray[i];
        document.querySelector(".LanguageDropdown" + (i)).innerHTML = languageOptionsArray[i];
    }
}

