$('.NA-ViewingAdditionalClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".ViewingAdditionalHelp").style.display = "none";
});

$('.NA-CloseConfirmButton').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".ViewingConfirmDelete").style.display = "none";
});

$('.NA-ConfirmDeleteButton').click(function () {
    $.post("https://poketrades.org/PHP/delete_selection.php", { token: token, creationID: viewingDetails.creation_id, tradeOption: tradeOption });
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".ViewingConfirmDelete").style.display = "none";
    document.querySelector(".VA-CloseButton").click();
    ShowLoading();
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

$('.NA-BunchIconClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".BunchIconError").style.display = "none";
});

$('.NA-BunchAddedClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".BunchPokemonAdded").style.display = "none";
});

$('.NA-BunchRemovedClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".BunchPokemonRemoved").style.display = "none";
});

$('.NA-ImportedSuccessClose').click(function () {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".TradeSheetImported").style.display = "none";
});

$('.NA-ConfirmDeleteAll').click(function () {
    document.querySelector(".DeleteAllConfirm").style.display = "none";
    $.post("https://poketrades.org/PHP/delete_all_data.php", { token: token });
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

function ShowLoading() {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".LoadingData").style.display = "block";
}

function HideLoading() {
    document.querySelector("#NotificationArea").style.display = "none";
    document.querySelector(".LoadingData").style.display = "none";
}