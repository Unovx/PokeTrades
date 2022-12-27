var IAPokemonDropdown = document.querySelector(".IA-PokemonDropdown");
var evolutionsHolder = document.getElementById("IA-EvolutionsHolder");
var gendersHolder = document.getElementById("IA-GendersHolder");
var formsHolder = document.getElementById("IA-FormsHolder");
let extraFormData = 1;

//These Pokemon have differences depending on gender for stats and/or abilities and so need to be handled differently
let pokemonExceptions = new Array(4);
pokemonExceptions[0] = "Meowstic";
pokemonExceptions[1] = "Indeedee";
pokemonExceptions[2] = "Basculegion";
pokemonExceptions[3] = "Oinkologne";
let shinyStatus = "";

//Storing the elements and images allow me to change them between shiny/non shiny and also prevents having to re-write code.
let informationImages = new Array();
let informationPokemon = new Array();

$('.IA-Close').click(function () {
    document.querySelector("#MainArea").style.position = "absolute";
    document.querySelector("#InformationArea").style.display = "none";
    if (creationInProgress || selectedPokemon) {
        document.querySelector("#DetailsArea").style.display = "block";
    } else {
        document.querySelector("#PanelArea").style.display = "block";
    }

    if (document.querySelector("#MainArea").style.display == "block") {
        document.querySelector("#PanelArea").style.display = "none";
    }
});

$('.IA-ShinyButton').click(function () {
    if (shinyStatus == "-Shiny") {
        shinyStatus = "";
        document.querySelector(".IA-ShinySprite").setAttribute("src", url + "/Resources/Designs/Not Shiny Icon.png");
    } else {
        shinyStatus = "-Shiny";
        document.querySelector(".IA-ShinySprite").setAttribute("src", url + "/Resources/Designs/Shiny Icon.png");
    }
    //$('.IA-PokemonDropdown').change();
    UpdateInformationImages();
});

$('.IA-InfoButton').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".InformationAreaHelp").style.display = "block";
});

$('.IA-PokemonDropdown').change(function () {
    DeleteFormData();
    InformationAreaImages(document.querySelector(".IA-PokemonImage_1"), IAPokemonDropdown.value);
    let pokemonAbilities = new Array(4);
    let pokemonTypes = new Array(2);
    //Setting looping through the data array so I can get the right data for each pokemon. 
    for (let i = 0; i < pokemonDataArray.length; i++) {
        if (pokemonDataArray[i].pokemon == IAPokemonDropdown.value || pokemonDataArray[i].pokemon == "Meowstic-Male" && IAPokemonDropdown.value == "Meowstic" || pokemonDataArray[i].pokemon == "Indeedee-Male" && IAPokemonDropdown.value == "Indeedee" || pokemonDataArray[i].pokemon == "Basculegion-Male" && IAPokemonDropdown.value == "Basculegion" || pokemonDataArray[i].pokemon == "Oinkologne-Male" && IAPokemonDropdown.value == "Oinkologne") {
            document.querySelector(".IA-Pokemon1_Type1").setAttribute("src", url + "/Resources/Misc/HP " + pokemonDataArray[i].type_1 + ".png");
            //Setting the abilities array as this will be needed later to deciding whenever to display forms.
            pokemonAbilities[0] = pokemonDataArray[i].ability_1;
            pokemonAbilities[1] = pokemonDataArray[i].ability_2;
            pokemonAbilities[2] = pokemonDataArray[i].hidden_ability_1;
            pokemonAbilities[3] = pokemonDataArray[i].hidden_ability_2;
            pokemonTypes[0] = pokemonDataArray[i].type_1;
            pokemonTypes[1] = pokemonDataArray[i].type_2;
            if (pokemonDataArray[i].type_2 != null) {
                document.querySelector(".IA-Pokemon1_Type2").setAttribute("src", url + "/Resources/Misc/HP " + pokemonDataArray[i].type_2 + ".png");
                document.querySelector(".IA-Pokemon1_Type2").style.display = "unset";
            } else {
                document.querySelector(".IA-Pokemon1_Type2").style.display = "none";
            }

            document.querySelector(".IA-Pokemon1_Dex").innerHTML = pokemonDataArray[i].pokedex;

            if (pokemonDataArray[i].gender_ratio_m != null) {
                document.querySelector(".IA-Pokemon1_MaleGender").style.display = "initial";
                document.querySelector(".IA-Pokemon1_MaleGender").innerHTML = "Male " + pokemonDataArray[i].gender_ratio_m + " ";
                document.querySelector(".IA-Pokemon1_FemaleGender").style.display = "initial";
                document.querySelector(".IA-Pokemon1_FemaleGender").innerHTML = "Female " + pokemonDataArray[i].gender_ratio_f;
                document.querySelector(".IA-Pokemon1_Genderless").style.display = "none";
            } else if (femaleOnlyPokemonArray.includes(pokemonDataArray[i].pokemon)) {
                document.querySelector(".IA-Pokemon1_FemaleGender").style.display = "initial";
                document.querySelector(".IA-Pokemon1_FemaleGender").innerHTML = "Female 100%";
                document.querySelector(".IA-Pokemon1_MaleGender").style.display = "none";
                document.querySelector(".IA-Pokemon1_Genderless").style.display = "none";
            } else if (maleOnlyPokemonArray.includes(pokemonDataArray[i].pokemon)) {
                document.querySelector(".IA-Pokemon1_MaleGender").style.display = "initial";
                document.querySelector(".IA-Pokemon1_MaleGender").innerHTML = "Male 100%";
                document.querySelector(".IA-Pokemon1_FemaleGender").style.display = "none";
                document.querySelector(".IA-Pokemon1_Genderless").style.display = "none";
            } else if (genderlessPokemonArray.includes(pokemonDataArray[i].pokemon)) {
                document.querySelector(".IA-Pokemon1_Genderless").style.display = "initial";
                document.querySelector(".IA-Pokemon1_FemaleGender").style.display = "none";
                document.querySelector(".IA-Pokemon1_MaleGender").style.display = "none";
            } else {
                document.querySelector(".IA-Pokemon1_MaleGender").style.display = "initial";
                document.querySelector(".IA-Pokemon1_MaleGender").innerHTML = "Male 50% ";
                document.querySelector(".IA-Pokemon1_FemaleGender").style.display = "initial";
                document.querySelector(".IA-Pokemon1_FemaleGender").innerHTML = "Female 50%";
                document.querySelector(".IA-Pokemon1_Genderless").style.display = "none";
            }


            if (pokemonDataArray[i].forms != null) {
                var arrayTempForms = pokemonDataArray[i].forms.split("|");
                var dropdownStats = pokemonDataArray[i].stat_hp + "/" + pokemonDataArray[i].stat_att + "/" + pokemonDataArray[i].stat_def + "/" + pokemonDataArray[i].stat_spa + "/" + pokemonDataArray[i].stat_spd + "/" + pokemonDataArray[i].stat_spe;
            }

            document.querySelector(".IA-Pokemon1_Ability_1").innerHTML = pokemonDataArray[i].ability_1;
            if (pokemonDataArray[i].ability_2 == null) {
                document.querySelector(".IA-Pokemon1_Ability_2").style.display = "none";
                document.querySelector(".IA-Pokemon1_A2_Row").style.display = "none";
            } else {
                document.querySelector(".IA-Pokemon1_Ability_2").style.display = "block";
                document.querySelector(".IA-Pokemon1_A2_Row").style.display = "table-row";
                document.querySelector(".IA-Pokemon1_Ability_2").innerHTML = pokemonDataArray[i].ability_2;
            }
            if (pokemonDataArray[i].hidden_ability_1 == null) {
                document.querySelector(".IA-Pokemon1_Ability_Hidden_1").style.display = "none";
            } else {
                document.querySelector(".IA-Pokemon1_Ability_Hidden_1").style.display = "block";
                document.querySelector(".IA-Pokemon1_Ability_Hidden_1").innerHTML = pokemonDataArray[i].hidden_ability_1 + " (H)";
            }
            if (pokemonDataArray[i].hidden_ability_2 == null) {
                document.querySelector(".IA-Pokemon1_Ability_Hidden_2").style.display = "none";
            } else {
                document.querySelector(".IA-Pokemon1_Ability_Hidden_2").style.display = "block";
                document.querySelector(".IA-Pokemon1_Ability_Hidden_2").innerHTML = pokemonDataArray[i].hidden_ability_2 + " (H)";
            }

            document.querySelector(".IA-Pokemon1_Stat_HP").textContent = pokemonDataArray[i].stat_hp;
            document.querySelector(".IA-Pokemon1_Stat_Att").textContent = pokemonDataArray[i].stat_att;
            document.querySelector(".IA-Pokemon1_Stat_Def").textContent = pokemonDataArray[i].stat_def;
            document.querySelector(".IA-Pokemon1_Stat_Spa").textContent = pokemonDataArray[i].stat_spa;
            document.querySelector(".IA-Pokemon1_Stat_Spd").textContent = pokemonDataArray[i].stat_spd;
            document.querySelector(".IA-Pokemon1_Stat_Spe").textContent = pokemonDataArray[i].stat_spe;
        }
    }
    //Getting the evolution data and the methods
    for (let i = 0; i < evoDataArray.length; i++) {
        var arrayTempEvo = evoDataArray[i].evo_lines.split("|");
        for (let j = 0; j < arrayTempEvo.length; j++) {
            if (IAPokemonDropdown.value == arrayTempEvo[j]) {
                var arrayTempEvoMethods = evoDataArray[i].evo_methods.split("|");

                //Burmy Line Exception due to the Mothim evo line being annoying (different)
                if (IAPokemonDropdown.value.includes("Burmy") || IAPokemonDropdown.value.includes("Wormadam") || IAPokemonDropdown.value.includes("Mothim")) {
                    for (let k = 0; k < evoDataArray.length; k++) {
                        if (evoDataArray[k].pokemon == IAPokemonDropdown.value) {
                            arrayTempEvo = evoDataArray[k].evo_lines.split("|");
                            arrayTempEvoMethods = evoDataArray[k].evo_methods.split("|");
                        }
                    }
                }


                //Clearing out any previous data.
                while (evolutionsHolder.lastElementChild) {
                    evolutionsHolder.removeChild(evolutionsHolder.lastElementChild);
                }
                while (gendersHolder.lastElementChild) {
                    gendersHolder.removeChild(gendersHolder.lastElementChild);
                }
                while (formsHolder.lastElementChild) {
                    formsHolder.removeChild(formsHolder.lastElementChild);
                }
                for (let k = 0; k < arrayTempEvo.length; k++) {
                    newDiv = document.createElement("div");
                    if (arrayTempEvo[k] == IAPokemonDropdown.value) {
                        newDiv.setAttribute("class", "IA-InfoHolder");
                    } else {
                        newDiv.setAttribute("class", "IA-InteractableHolder");
                    }

                    //Setting up the new evolution data
                    newImage = document.createElement("IMG");
                    newImage.setAttribute("class", "IA-StandardImage");
                    for (let l = 0; l < pokemonDataArray.length; l++) {
                        if (pokemonExceptions.includes(arrayTempEvo[k])) {
                            if (IAPokemonDropdown.value == "Meowstic" && pokemonDataArray[l].pokemon == "Meowstic-Male" || IAPokemonDropdown.value == "Indeedee" && pokemonDataArray[l].pokemon == "Indeedee-Male" || IAPokemonDropdown.value == "Basculegion" && pokemonDataArray[l].pokemon == "Basculegion-Male" || IAPokemonDropdown.value == "Oinkologne" && pokemonDataArray[l].pokemon == "Oinkologne-Male") {
                                var arrayTempForms = pokemonDataArray[l].forms.split("|");
                            }
                            let tempString = "";
                            tempString += arrayTempEvo[k];
                            InformationAreaImages(newImage, arrayTempEvo[k] + "-Male");
                            newDiv.onclick = function () {
                                if (IAPokemonDropdown.value != tempString) {
                                    IAPokemonDropdown.value = tempString;
                                    $('.IA-PokemonDropdown').change();
                                }
                            }
                        }
                        if (arrayTempEvo[k] == pokemonDataArray[l].pokemon) {
                            InformationAreaImages(newImage, arrayTempEvo[k]);
                            newDiv.onclick = function () {
                                if (IAPokemonDropdown.value != pokemonDataArray[l].pokemon) {
                                    IAPokemonDropdown.value = pokemonDataArray[l].pokemon;
                                    $('.IA-PokemonDropdown').change();
                                }
                            }
                        }
                    }
                    newDiv.appendChild(newImage);

                    newText = document.createElement("text");
                    newText.setAttribute("class", "IA-InfoText");
                    newText.innerHTML = arrayTempEvoMethods[k];

                    newDiv.appendChild(newText);

                    document.getElementById("IA-EvolutionsHolder").appendChild(newDiv);
                }

                //Setting up the gender differences displays if a pokemon has gender differences
                document.querySelector(".IA-GendersDiv").style.display = "none";
                if (genderDifferencesArray.includes(IAPokemonDropdown.value)) {
                    newDiv = document.createElement("div");
                    newDiv.setAttribute("class", "IA-InfoHolder");

                    newImage = document.createElement("IMG");
                    newImage.setAttribute("class", "IA-StandardImage");

                    InformationAreaImages(newImage, IAPokemonDropdown.value + "-Male");

                    newText = document.createElement("text");
                    newText.setAttribute("class", "IA-InfoText");
                    newText.innerHTML = "Male";

                    newDiv.appendChild(newImage);
                    newDiv.appendChild(newText);
                    document.getElementById("IA-GendersHolder").appendChild(newDiv);

                    newDiv = document.createElement("div");
                    newDiv.setAttribute("class", "IA-InfoHolder");

                    newImage = document.createElement("IMG");
                    newImage.setAttribute("class", "IA-StandardImage");
                    InformationAreaImages(newImage, IAPokemonDropdown.value + "-Female");

                    newText = document.createElement("text");
                    newText.setAttribute("class", "IA-InfoText");
                    newText.innerHTML = "Female";

                    newDiv.appendChild(newImage);
                    newDiv.appendChild(newText);
                    document.getElementById("IA-GendersHolder").appendChild(newDiv);

                    document.querySelector(".IA-GendersDiv").style.display = "block";
                }

                document.querySelector(".IA-FormsDiv").style.display = "none";

                //Setting form data. formsDisplayed is set to 1 because the base form is always first in the list but also already displayed because of the dropdown selection, and so the creation and modification of data need to be for the forms after in the array.
                let formDisplayed = 1;
                if (arrayTempForms != null) {
                    for (let k = 0; k < arrayTempForms.length; k++) {
                        let noticeableChange = false;
                        for (let l = 0; l < pokemonDataArray.length; l++) {
                            if (arrayTempForms[k] == pokemonDataArray[l].pokemon) {
                                var formStats = pokemonDataArray[l].stat_hp + "/" + pokemonDataArray[l].stat_att + "/" + pokemonDataArray[l].stat_def + "/" + pokemonDataArray[l].stat_spa + "/" + pokemonDataArray[l].stat_spd + "/" + pokemonDataArray[l].stat_spe;
                                let formAbilities = new Array(4);
                                formAbilities[0] = pokemonDataArray[l].ability_1;
                                formAbilities[1] = pokemonDataArray[l].ability_2;
                                formAbilities[2] = pokemonDataArray[l].hidden_ability_1;
                                formAbilities[3] = pokemonDataArray[l].hidden_ability_2;

                                let formTypes = new Array(2);
                                formTypes[0] = pokemonDataArray[l].type_1;
                                formTypes[1] = pokemonDataArray[l].type_2;

                                //This part of the code will check to see if a pokemon form has different abilities or types, because some forms have those differences even if the same stats, and we want to show this form data.
                                let differentAbilities = false;

                                for (let m = 0; m < formAbilities.length; m++) {
                                    if (!pokemonAbilities.includes(formAbilities[m])) {
                                        differentAbilities = true;
                                    }
                                }

                                let differentTypes = false;

                                for (let m = 0; m < formTypes.length; m++) {
                                    if (!pokemonTypes.includes(formTypes[m])) {
                                        differentTypes = true;
                                    }
                                }

                                //Checking to see if the form stats, abilities or types are different to the base pokemon.
                                if (formStats != dropdownStats || differentAbilities || differentTypes) {
                                    formDisplayed++;
                                    extraFormData++;
                                    noticeableChange = true;

                                    parentDiv = document.createElement("div");
                                    parentDiv.setAttribute("class", "IA-Pokemon" + formDisplayed);
                                    $(parentDiv).insertBefore(".IA-EvolutionsDiv");
                                    //document.getElementById("InformationArea").appendChild(parentDiv);

                                    newDiv = document.createElement("div");
                                    newDiv.setAttribute("class", "IA-PokemonDetails");

                                    //creating and setting the types of the form.
                                    typesDiv = document.createElement("div");
                                    typesDiv.style.position = "absolute";

                                    newImage = document.createElement("IMG");
                                    newImage.setAttribute("class", "IA-TypeIcon");
                                    newImage.classList.add("IA-Pokemon" + formDisplayed + "_Type1");
                                    newImage.setAttribute("src", url + "/Resources/Misc/HP " + pokemonDataArray[l].type_1 + ".png");

                                    typesDiv.appendChild(newImage);

                                    newImage = document.createElement("IMG");
                                    newImage.setAttribute("class", "IA-TypeIcon");
                                    newImage.classList.add("IA-Pokemon" + formDisplayed + "_Type2");

                                    if (pokemonDataArray[l].type_2 != null) {
                                        newImage.setAttribute("src", url + "/Resources/Misc/HP " + pokemonDataArray[l].type_2 + ".png");
                                        newImage.style.display = "unset";
                                    } else {
                                        newImage.style.display = "none";
                                    }

                                    typesDiv.appendChild(newImage);

                                    dex = document.createElement("Text");
                                    dex.setAttribute("class", "IA-DexText");
                                    dex.innerHTML = document.querySelector(".IA-Pokemon1_Dex").innerHTML;

                                    typesDiv.appendChild(dex);

                                    newDiv.appendChild(typesDiv);

                                    //Creating the Main image of the new form.
                                    newImage = document.createElement("IMG");
                                    newImage.setAttribute("class", "IA-PokemonImage");
                                    newImage.classList.add("IA-PokemonImage_" + formDisplayed);

                                    InformationAreaImages(newImage, arrayTempForms[k]);

                                    newDiv.appendChild(newImage);
                                    parentDiv.appendChild(newDiv);



                                    otherDiv = document.createElement("div");
                                    otherDiv.setAttribute("class", "IA-InfoTable");
                                    newDiv.appendChild(otherDiv);

                                    //Setting the Name
                                    newText = document.createElement("text");
                                    newText.setAttribute("class", "IA-PokemonName");
                                    newText.classList.add("IA-PokemonName_" + formDisplayed);
                                    newText.innerHTML = pokemonDataArray[l].pokemon;
                                    otherDiv.appendChild(newText);


                                    //Setting Gender and Abilities
                                    tableDiv = document.createElement("table");
                                    tableDiv.setAttribute("class", "IA-Tables");
                                    otherDiv.appendChild(tableDiv);

                                    var tr = tableDiv.insertRow();

                                    var td = tr.insertCell();
                                    td.style.textAlign = "center";
                                    gender = document.createElement("Text");
                                    gender.setAttribute("class", "IA-MaleGenderText");
                                    gender.classList.add("IA-Pokemon" + formDisplayed + "_MaleGender");

                                    td.appendChild(gender);

                                    gender = document.createElement("Text");
                                    gender.setAttribute("class", "IA-FemaleGenderText");
                                    gender.classList.add("IA-Pokemon" + formDisplayed + "_FemaleGender");

                                    //This is done because they need to be in the same td.
                                    $(gender).insertAfter(".IA-Pokemon" + formDisplayed + "_MaleGender");

                                    gender = document.createElement("Text");
                                    gender.setAttribute("class", "IA-GenderlessText");
                                    gender.classList.add("IA-Pokemon" + formDisplayed + "_Genderless");

                                    td.appendChild(gender);

                                    //This is purely for creating a gap.
                                    ability = document.createElement("Text");
                                    ability.setAttribute("class", "IA-AbilityText");

                                    td.appendChild(ability);

                                    //Now the reason the dropdown is mentioned is because I do not store information in the gender columns for pokemon forms like the primals, so it simply does not know what gender they are. So for pokemon like that, it checks the dropdown to see the gender status of the base mon and so it uses that instead. This is not a sure fire method and while it does cover every case currently between what form data I do store and dropdown checking, its possible for an exeception in future to appear.
                                    if (pokemonDataArray[l].gender_ratio_m != null) {
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_MaleGender").style.display = "initial";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_MaleGender").innerHTML = "Male " + pokemonDataArray[l].gender_ratio_m + " ";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_FemaleGender").style.display = "initial";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_FemaleGender").innerHTML = "Female " + pokemonDataArray[l].gender_ratio_f;
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_Genderless").style.display = "none";
                                    } else if (femaleOnlyPokemonArray.includes(pokemonDataArray[l].pokemon) || femaleOnlyPokemonArray.includes(IAPokemonDropdown.value)) {
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_FemaleGender").style.display = "initial";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_FemaleGender").innerHTML = "Female 100%";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_MaleGender").style.display = "none";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_Genderless").style.display = "none";
                                    } else if (maleOnlyPokemonArray.includes(pokemonDataArray[l].pokemon) || maleOnlyPokemonArray.includes(IAPokemonDropdown.value)) {
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_MaleGender").style.display = "initial";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_MaleGender").innerHTML = "Male 100%";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_FemaleGender").style.display = "none";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_Genderless").style.display = "none";
                                    } else if (genderlessPokemonArray.includes(pokemonDataArray[l].pokemon) || genderlessPokemonArray.includes(IAPokemonDropdown.value)) {
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_Genderless").style.display = "initial";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_Genderless").innerHTML = "Genderless";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_FemaleGender").style.display = "none";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_MaleGender").style.display = "none";
                                    } else {
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_MaleGender").style.display = "initial";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_MaleGender").innerHTML = "Male 50% ";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_FemaleGender").style.display = "initial";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_FemaleGender").innerHTML = "Female 50%";
                                        document.querySelector(".IA-Pokemon" + formDisplayed + "_Genderless").style.display = "none";
                                    }

                                    //Setting the ability of the forms.
                                    var tr = tableDiv.insertRow();

                                    var td = tr.insertCell();
                                    ability = document.createElement("Text");
                                    ability.setAttribute("class", "IA-AbilityText");
                                    ability.classList.add("IA-Pokemon" + formDisplayed + "_Ability_1");
                                    ability.innerHTML = pokemonDataArray[l].ability_1;

                                    td.appendChild(ability);

                                    var tr = tableDiv.insertRow();

                                    var td = tr.insertCell();
                                    ability = document.createElement("Text");
                                    ability.setAttribute("class", "IA-AbilityText");
                                    ability.classList.add("IA-Pokemon" + formDisplayed + "_Ability_2");
                                    if (pokemonDataArray[l].ability_2 == null) {
                                        ability.style.display = "none";
                                    } else {
                                        ability.innerHTML = pokemonDataArray[l].ability_2;
                                    }

                                    td.appendChild(ability);

                                    var tr = tableDiv.insertRow();

                                    var td = tr.insertCell();
                                    ability = document.createElement("Text");
                                    ability.setAttribute("class", "IA-AbilityText");
                                    ability.classList.add("IA-Pokemon" + formDisplayed + "_Ability_Hidden_1");
                                    if (pokemonDataArray[l].hidden_ability_1 == null) {
                                        ability.style.display = "none";
                                    } else {
                                        ability.innerHTML = pokemonDataArray[l].hidden_ability_1 + " (H)";
                                    }

                                    td.appendChild(ability);

                                    var tr = tableDiv.insertRow();

                                    var td = tr.insertCell();
                                    ability = document.createElement("Text");
                                    ability.setAttribute("class", "IA-AbilityText");
                                    ability.classList.add("IA-Pokemon" + formDisplayed + "_Ability_Hidden_2");
                                    if (pokemonDataArray[l].hidden_ability_2 == null) {
                                        ability.style.display = "none";
                                    } else {
                                        ability.innerHTML = pokemonDataArray[l].hidden_ability_2 + " (H)";
                                    }

                                    td.appendChild(ability);

                                    newDiv = document.createElement("div");
                                    newDiv.setAttribute("id", "IA-InfoSection");
                                    newDiv.setAttribute("class", "IA-Pokemon" + formDisplayed);

                                    $(newDiv).insertBefore(".IA-EvolutionsDiv");

                                    //Setting the stats of the forms.

                                    tableDiv = document.createElement("table");
                                    tableDiv.setAttribute("class", "IA-Stats");
                                    newDiv.appendChild(tableDiv);

                                    var tr = tableDiv.insertRow();

                                    var td = tr.insertCell();
                                    stat = document.createElement("Text");
                                    stat.setAttribute("class", "IA-StatText");

                                    var td = tr.insertCell();
                                    stat = document.createElement("Text");
                                    stat.setAttribute("class", "IA-StatText");
                                    stat.innerHTML = "HP";
                                    td.appendChild(stat);

                                    var td = tr.insertCell();
                                    stat = document.createElement("Text");
                                    stat.setAttribute("class", "IA-StatText");
                                    stat.innerHTML = "Att";
                                    td.appendChild(stat);

                                    var td = tr.insertCell();
                                    stat = document.createElement("Text");
                                    stat.setAttribute("class", "IA-StatText");
                                    stat.innerHTML = "Def";
                                    td.appendChild(stat);

                                    var td = tr.insertCell();
                                    stat = document.createElement("Text");
                                    stat.setAttribute("class", "IA-StatText");
                                    stat.innerHTML = "Spa";
                                    td.appendChild(stat);

                                    var td = tr.insertCell();
                                    stat = document.createElement("Text");
                                    stat.setAttribute("class", "IA-StatText");
                                    stat.innerHTML = "Spd";
                                    td.appendChild(stat);

                                    var td = tr.insertCell();
                                    stat = document.createElement("Text");
                                    stat.setAttribute("class", "IA-StatText");
                                    stat.innerHTML = "Spe";
                                    td.appendChild(stat);


                                    //Setting up Stats
                                    var tr = tableDiv.insertRow();

                                    var td = tr.insertCell();
                                    stat = document.createElement("Text");
                                    stat.setAttribute("class", "IA-StatText");
                                    stat.innerHTML = "Stats";
                                    td.appendChild(stat);

                                    var td = tr.insertCell();
                                    stat = document.createElement("Select");
                                    option = document.createElement("Option");
                                    stat.setAttribute("class", "IA-StatDesign");
                                    option.textContent = pokemonDataArray[l].stat_hp;
                                    stat.appendChild(option);
                                    td.appendChild(stat);

                                    var td = tr.insertCell();
                                    stat = document.createElement("Select");
                                    option = document.createElement("Option");
                                    stat.setAttribute("class", "IA-StatDesign");
                                    option.textContent = pokemonDataArray[l].stat_att;
                                    stat.appendChild(option);
                                    td.appendChild(stat);

                                    var td = tr.insertCell();
                                    stat = document.createElement("Select");
                                    option = document.createElement("Option");
                                    stat.setAttribute("class", "IA-StatDesign");
                                    option.textContent = pokemonDataArray[l].stat_def;
                                    stat.appendChild(option);
                                    td.appendChild(stat);

                                    var td = tr.insertCell();
                                    stat = document.createElement("Select");
                                    option = document.createElement("Option");
                                    stat.setAttribute("class", "IA-StatDesign");
                                    option.textContent = pokemonDataArray[l].stat_spa;
                                    stat.appendChild(option);
                                    td.appendChild(stat);

                                    var td = tr.insertCell();
                                    stat = document.createElement("Select");
                                    option = document.createElement("Option");
                                    stat.setAttribute("class", "IA-StatDesign");
                                    option.textContent = pokemonDataArray[l].stat_spd;
                                    stat.appendChild(option);
                                    td.appendChild(stat);

                                    var td = tr.insertCell();
                                    stat = document.createElement("Select");
                                    option = document.createElement("Option");
                                    stat.setAttribute("class", "IA-StatDesign");
                                    option.textContent = pokemonDataArray[l].stat_spe;
                                    stat.appendChild(option);
                                    td.appendChild(stat);

                                    //Creating a holder for the form in the form section.
                                    specialForm = document.createElement("div");
                                    specialForm.setAttribute("class", "IA-InteractableHolder");

                                    newImage = document.createElement("IMG");
                                    newImage.setAttribute("class", "IA-StandardImage");

                                    InformationAreaImages(newImage, arrayTempForms[k]);
                                    specialForm.appendChild(newImage);

                                    newText = document.createElement("text");
                                    newText.setAttribute("class", "IA-InfoText");
                                    newText.innerHTML = arrayTempForms[k];

                                    specialForm.appendChild(newText);

                                    document.getElementById("IA-FormsHolder").appendChild(specialForm);
                                    document.querySelector(".IA-FormsDiv").style.display = "block";

                                    //Form index is needed because otherwise using formDisplayed below will use the last int, not the current one in the loop.
                                    let formIndex = formDisplayed;

                                    //Making it so if you click on a interactable form holder, it will either display or hide that form data.
                                    specialForm.onclick = function () {
                                        if (document.querySelector(".IA-Pokemon" + formIndex).style.display == "none") {
                                            var cols = document.getElementsByClassName("IA-Pokemon" + formIndex);
                                            for (m = 0; m < cols.length; m++) {
                                                cols[m].style.display = "block";
                                            }
                                        } else {
                                            var cols = document.getElementsByClassName("IA-Pokemon" + formIndex);
                                            for (m = 0; m < cols.length; m++) {
                                                cols[m].style.display = "none";
                                            }
                                        }
                                    }

                                    //Hiding the extra form data such as stats by default.
                                    if (!pokemonExceptions.includes(IAPokemonDropdown.value)) {
                                        var cols = document.getElementsByClassName("IA-Pokemon" + formIndex);
                                        for (m = 0; m < cols.length; m++) {
                                            cols[m].style.display = "none";
                                        }
                                    }
                                }
                            }
                            //If the change to form isn't noticable like gmax, then the non-interactable form holder is made to hold it.
                        } if (noticeableChange == false) {
                            newDiv = document.createElement("div");
                            newDiv.setAttribute("class", "IA-InfoHolder");

                            newImage = document.createElement("IMG");
                            newImage.setAttribute("class", "IA-StandardImage");


                            InformationAreaImages(newImage, arrayTempForms[k]);

                            newDiv.appendChild(newImage);

                            newText = document.createElement("text");
                            newText.setAttribute("class", "IA-InfoText");
                            newText.innerHTML = arrayTempForms[k];

                            newDiv.appendChild(newText);

                            document.getElementById("IA-FormsHolder").appendChild(newDiv);

                            document.querySelector(".IA-FormsDiv").style.display = "block";


                        }
                        //If the array holds one of the exceptions, then what happens is the form div is hidden by default since the gender isn't another form but its stored that way in the database to be created and displayed like a form. So hiding it just prevents user confusion.
                        if (arrayTempForms[0].includes("Meowstic-Female") || arrayTempForms[0].includes("Indeedee-Female") || arrayTempForms[0].includes("Basculegion-Female") || arrayTempForms[0].includes("Oinkologne-Female")) {
                            document.querySelector(".IA-FormsDiv").style.display = "none";
                        }
                    }
                }
            }
        }
    }
});

//This is just resetting the display, removing all created elements and setting variables back to their default.
function DeleteFormData() {
    if (extraFormData > 1) {
        for (i = 2; i < extraFormData + 1; i++) {
            $(".IA-Pokemon" + i).remove();
        }
    }
    extraFormData = 1;
    informationImages = Array();
    informationPokemon = Array();
}

//This is used for assigning the correct information to all pokemon, evolutions and forms.
function InformationAreaImages(element, pokemon) {
    //All of the image elements and pokemon names get stored in arrays for use in the method below for updating the image later.
    informationImages.push(element);
    informationPokemon.push(pokemon);

    if (shinyStatus == "-Shiny") {
        if (pokemon.includes("Minior")) {
            element.setAttribute("src", url + "/Resources/HomeShiny/Minior.png");
        }
        else if (pokemon.includes("Alcremie-Strawberry")) {
            element.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Strawberry.png");
        }
        else if (pokemon.includes("Alcremie-Berry")) {
            element.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Berry.png");
        }
        else if (pokemon.includes("Alcremie-Love")) {
            element.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Love.png");
        }
        else if (pokemon.includes("Alcremie-Star")) {
            element.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Star.png");
        }
        else if (pokemon.includes("Alcremie-Clover")) {
            element.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Clover.png");
        }
        else if (pokemon.includes("Alcremie-Flower")) {
            element.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Flower.png");
        }
        else if (pokemon.includes("Alcremie-Ribbon")) {
            element.setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Ribbon.png");
        } else {
            if (genderDifferencesArray.includes(pokemon)) {
                element.setAttribute("src", url + "/Resources/HomeShiny/" + pokemon + "-Male" + ".png")
            } else {
                element.setAttribute("src", url + "/Resources/HomeShiny/" + pokemon + ".png");
            }
        }
    } else {
        if (genderDifferencesArray.includes(pokemon)) {
            element.setAttribute("src", url + "/Resources/Home/" + pokemon + "-Male" + ".png")
        } else {
            element.setAttribute("src", url + "/Resources/Home/" + pokemon + ".png");
        }
    }
}

//This is a copy of the method above but slightly different as it will use two arrays to update the shiny status of all pokemon images.
function UpdateInformationImages() {
    for (let i = 0; i < informationImages.length; i++) {
        if (shinyStatus == "-Shiny") {
            if (informationPokemon[i].includes("Minior")) {
                informationImages[i].setAttribute("src", url + "/Resources/HomeShiny/Minior.png");
            }
            else if (informationPokemon[i].includes("Alcremie-Strawberry")) {
                informationImages[i].setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Strawberry.png");
            }
            else if (informationPokemon[i].includes("Alcremie-Berry")) {
                informationImages[i].setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Berry.png");
            }
            else if (informationPokemon[i].includes("Alcremie-Love")) {
                informationImages[i].setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Love.png");
            }
            else if (informationPokemon[i].includes("Alcremie-Star")) {
                informationImages[i].setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Star.png");
            }
            else if (informationPokemon[i].includes("Alcremie-Clover")) {
                informationImages[i].setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Clover.png");
            }
            else if (informationPokemon[i].includes("Alcremie-Flower")) {
                informationImages[i].setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Flower.png");
            }
            else if (informationPokemon[i].includes("Alcremie-Ribbon")) {
                informationImages[i].setAttribute("src", url + "/Resources/HomeShiny/Alcremie-Ribbon.png");
            } else {
                if (genderDifferencesArray.includes(informationPokemon[i])) {
                    informationImages[i].setAttribute("src", url + "/Resources/HomeShiny/" + informationPokemon[i] + "-Male" + ".png")
                } else {
                    informationImages[i].setAttribute("src", url + "/Resources/HomeShiny/" + informationPokemon[i] + ".png");
                }
            }
        } else {
            if (genderDifferencesArray.includes(informationPokemon[i])) {
                informationImages[i].setAttribute("src", url + "/Resources/Home/" + informationPokemon[i] + "-Male" + ".png")
            } else {
                informationImages[i].setAttribute("src", url + "/Resources/Home/" + informationPokemon[i] + ".png");
            }
        }
    }
}