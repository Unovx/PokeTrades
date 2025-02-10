let currentlyImporting = false;
let confirmText = "";

$('.Import-CloseButton').click(function () {
    currentlyImporting = false;
    document.querySelector(".SA-Bunch").style.opacity = "0%";
    ResetFilters();
    CloseAll();
    document.querySelector("#MainArea").style.display = "block";
});

$('.Import-PreviewButton').click(function () {
    confirmText = "";
    document.querySelector(".Import-ImportInput").click();
});

$('.Import-ImportButton').click(function () {
    confirmText = "confirming";
    if (arrayData == null) {
        PreviewRequired();
    } else {
        for (let i = 0; i < arrayData["Rows"].length; i++) {
            $.post(url + "/PHP/transfer_data.php", { token: token, confirm: confirmText, importArray: arrayData["Rows"][i] }, TestingTempo);
        }
        document.querySelector(".Import-ConfirmInput").value = null;
        document.querySelector(".PA-Searchbar").value = userData.user_id;
        searchInfoText = document.querySelector(".PA-Searchbar").value;
        localStorage.setItem('searchID', searchInfoText);
        $(".PA-Searchbar").keyup();
        CloseAll();
        //document.querySelector("#NotificationArea").style.display = "block";
        //document.querySelector(".TradeShopImported").style.display = "block";
        document.querySelector("#MainArea").style.display = "block";
        document.querySelector("#PanelArea").style.display = "block";
        document.querySelector("#MainArea").style.position = "fixed";
        document.querySelector(".PA-TradeShopPanel").style.display = "block";
    }
});

async function ImportData(file) {
    let text = await (new Response(file)).text();
    $.post(url + "/PHP/transfer_data.php", { token: token, fileData: text, confirm: confirmText }, GenerateSelection);
    document.querySelector(".Import-ImportInput").value = null;
    //detailsLocked = true;
    //console.log(text);
    /*$.post(url + "/PHP/import_data.php", { token: token, fileData: text }, StartFormat);
    document.querySelector(".LA-ImportInput").value = null;
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".TradeShopImported").style.display = "block";*/
}

async function ConfirmData(file) {
    let text = await (new Response(file)).text();
    $.post(url + "/PHP/transfer_data.php", { token: token, fileData: text, confirm: confirmText, importArray: arrayData }, TestingTempo);
    document.querySelector(".Import-ConfirmInput").value = null;
    document.querySelector(".PA-Searchbar").value = userData.user_id;
    searchInfoText = document.querySelector(".PA-Searchbar").value;
    localStorage.setItem('searchID', searchInfoText);
    $(".PA-Searchbar").keyup();
    CloseAll();
    //document.querySelector("#NotificationArea").style.display = "block";
    //document.querySelector(".TradeShopImported").style.display = "block";
    document.querySelector("#MainArea").style.display = "block";
    document.querySelector("#PanelArea").style.display = "block";
    document.querySelector("#MainArea").style.position = "fixed";
    document.querySelector(".PA-TradeShopPanel").style.display = "block";
    //detailsLocked = true;
    //console.log(text);
    /*$.post(url + "/PHP/import_data.php", { token: token, fileData: text }, StartFormat);
    document.querySelector(".LA-ImportInput").value = null;
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".TradeShopImported").style.display = "block";*/
}

function TestingTempo(data) {
    //arrayData = jQuery.parseJSON(data);
    //console.log(data);
}