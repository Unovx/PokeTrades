$('.NA-SelectionClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".SelectionHelp").style.display = "none";
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

$('.NA-TemplateHelpClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".TemplateHelpInfo").style.display = "none";
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

$('.NA-BunchMoveHelpClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".BunchesMoveHelp").style.display = "none";
});

$('.NA-InformationAreaClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".InformationAreaHelp").style.display = "none";
});

$('.NA-TrackingHelpClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".TrackingInformation").style.display = "none";
});

function ShowLoading() {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".LoadingData").style.display = "block";
}

function HideLoading() {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".LoadingData").style.display = "none";
}