$('.NA-MainBlockClose').click(function () {
    CloseAllMainBlocks();
});

$('.NA-MainOption1').click(function () {
    document.querySelector(".NA-MainOptions").style.display = "none";
    document.querySelector(".NA-TradeShopOptions").style.display = "block";
});

$('.NA-MainOption2').click(function () {
    document.querySelector(".NA-MainOptions").style.display = "none";
    document.querySelector(".NA-AccountOptions").style.display = "block";
});

$('.NA-MainOption3').click(function () {
    document.querySelector(".NA-MainOptions").style.display = "none";
    document.querySelector(".NA-OtherOptions").style.display = "block";
});

$('.NA-TradeOption1').click(function () {
    document.querySelector(".NA-TradeShopOptions").style.display = "none";
    document.querySelector(".NA-BunchOverview").style.display = "block";
});

$('.NA-TradeOption2').click(function () {
    document.querySelector(".NA-TradeShopOptions").style.display = "none";
    document.querySelector(".NA-PokemonCreation").style.display = "block";
});

$('.NA-TradeOption3').click(function () {
    document.querySelector(".NA-TradeShopOptions").style.display = "none";
    document.querySelector(".NA-MoveCopy").style.display = "block";
});

$('.NA-TradeOption4').click(function () {
    document.querySelector(".NA-TradeShopOptions").style.display = "none";
    document.querySelector(".NA-AddHelp").style.display = "block";
});

$('.NA-TradeOption5').click(function () {
    document.querySelector(".NA-TradeShopOptions").style.display = "none";
    document.querySelector(".NA-TemplateOverview").style.display = "block";
});

$('.NA-AccountOption1').click(function () {
    document.querySelector(".NA-AccountOptions").style.display = "none";
    document.querySelector(".NA-Account").style.display = "block";
});

$('.NA-AccountOption2').click(function () {
    document.querySelector(".NA-AccountOptions").style.display = "none";
    document.querySelector(".NA-DeleteAll").style.display = "block";
});

$('.NA-AccountOption3').click(function () {
    document.querySelector(".NA-AccountOptions").style.display = "none";
    document.querySelector(".NA-Exporting").style.display = "block";
});

$('.NA-OtherOption1').click(function () {
    document.querySelector(".NA-OtherOptions").style.display = "none";
    document.querySelector(".NA-Importing").style.display = "block";
});

$('.NA-OtherOption2').click(function () {
    document.querySelector(".NA-OtherOptions").style.display = "none";
    document.querySelector(".NA-PokemonData").style.display = "block";
});

$('.NA-OtherOption3').click(function () {
    document.querySelector(".NA-OtherOptions").style.display = "none";
    document.querySelector(".NA-GenerationalSprites").style.display = "block";
});

$('.NA-ViewingAdditionalClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".ViewingAdditionalHelp").style.display = "none";
});

$('.NA-CloseConfirmButton').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".ViewingConfirmDelete").style.display = "none";
});

$('.NA-ConfirmDeleteButton').click(function () {
    $.post(url + "/PHP/delete_selection.php", { token: token, creationID: pokemonDetails.creation_id, tradeOption: tradeOption });
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".ViewingConfirmDelete").style.display = "none";
    document.querySelector(".DA-Close").click();
    ShowLoading();
    PostGenerateSelectionData();
    PostGenerateSelection();
});

$('.NA-PokemonAddedClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".ViewingPokemonAdded").style.display = "none";
});

$('.NA-CreationPokemonClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".CreationPokemonError").style.display = "none";
});

$('.NA-TemplateAddedClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".TemplateAdded").style.display = "none";
});

$('.NA-TemplateRemovedClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".TemplateRemoved").style.display = "none";
});

$('.NA-TemplateAddedErrorClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".TemplateAddedError").style.display = "none";
});

$('.NA-TemplateRemovedErrorClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".TemplateRemovedError").style.display = "none";
});

$('.NA-BunchIconClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".BunchIconError").style.display = "none";
});

$('.NA-BunchAddedClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".BunchPokemonAdded").style.display = "none";
    PostGenerateSelectionData();
});

$('.NA-BunchRemovedClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".BunchPokemonRemoved").style.display = "none";

    ShowLoading();
    PostGenerateSelection();
    PostGenerateSelectionData();
    //document.querySelector(".DA-Close").click();
});

$('.NA-ImportedSuccessClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".TradeShopImported").style.display = "none";
});

$('.NA-ConfirmDeleteAll').click(function () {
    document.querySelector(".DeleteAllConfirm").style.display = "none";
    $.post(url + "/PHP/delete_all_data.php", { token: token });
    document.querySelector(".DeleteAllSuccess").style.display = "block";

});

$('.NA-CloseDeleteAll').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".DeleteAllConfirm").style.display = "none";
});

$('.NA-SuccessDeleteAllClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".DeleteAllSuccess").style.display = "none";
});

$('.NA-InformationAreaClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".InformationAreaHelp").style.display = "none";
});

$('.NA-TrackingHelpClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".TrackingInformation").style.display = "none";
});

$('.NA-CTSInfoClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".CTSInfo").style.display = "none";
});

function ShowLoading() {
    document.querySelector("#LoadingArea").style.display = "block";
    document.querySelector(".LoadingData").style.display = "block";
}

function HideLoading() {
    document.querySelector("#LoadingArea").style.display = "none";
    document.querySelector(".LoadingData").style.display = "none";
}

function CloseAllMainBlocks() {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".NA-MainOptions").style.display = "none";
    document.querySelector(".NA-TradeShopOptions").style.display = "none";
    document.querySelector(".NA-AccountOptions").style.display = "none";
    document.querySelector(".NA-OtherOptions").style.display = "none";
    document.querySelector(".NA-BunchOverview").style.display = "none";
    document.querySelector(".NA-PokemonCreation").style.display = "none";
    document.querySelector(".NA-MoveCopy").style.display = "none";
    document.querySelector(".NA-AddHelp").style.display = "none";
    document.querySelector(".NA-TemplateOverview").style.display = "none";
    document.querySelector(".NA-Account").style.display = "none";
    document.querySelector(".NA-DeleteAll").style.display = "none";
    document.querySelector(".NA-Exporting").style.display = "none";
    document.querySelector(".NA-Importing").style.display = "none";
    document.querySelector(".NA-PokemonData").style.display = "none";
    document.querySelector(".NA-GenerationalSprites").style.display = "none";
}