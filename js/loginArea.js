var userData = null;
var token = localStorage.getItem('token');
var registerUUID;

document.querySelector(".PA-Searchbar").value = localStorage.getItem('searchID');
searchInfoText = (document.querySelector(".PA-Searchbar").value);
$(document).ready(function () {
    if (token != null && token != "null") {
        $.post(url + "/PHP/token_check.php", { token: token }, LastSession);
    } else {
        token = null;
    }
});



function LastSession(data) {
    if (data != null) {
        userData = jQuery.parseJSON(data);
        document.querySelector(".LA-Username").innerHTML = userData.username;
        document.querySelector(".PA-UserID").style.opacity = "100%";
        document.querySelector(".PA-UserID").innerHTML = "Your ID is: " + userData.user_id;
        document.querySelector(".TA-UserCollection").style.pointerEvents = "initial";
        document.querySelector(".TA-UserCollection").style.backgroundColor = "#efefef";
    }
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}



$('.LA-LoginClose').click(function () {
    CloseLoginArea();

});

$('.LA-LoginButton').click(function () {
    var loginUsername = (document.querySelector(".LA-LoginUsername").value);
    var loginPassword = (document.querySelector(".LA-LoginPassword").value);
    if (loginUsername != "" && loginPassword != "") {
        $.post(url + "/PHP/user_login.php", { username: loginUsername, password: loginPassword }, UserLogin);
    } else {
        document.querySelector(".LA-LoginFailed").style.display = "block";
        document.querySelector(".LA-LoginFailed").innerHTML = "Please fill in all the fields.";
    }
});

document.querySelector(".LA-LoginUsername").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".LA-LoginButton").click();
    }
});

document.querySelector(".LA-LoginPassword").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".LA-LoginButton").click();
    }
});

$('.LA-LoginRegisterButton').click(function () {
    document.querySelector(".LA-LoginUsername").value = "";
    document.querySelector(".LA-LoginPassword").value = "";
    document.querySelector(".LA-LoginArea").style.display = "none";
    document.querySelector(".LA-LoginFailed").style.display = "none";
    document.querySelector(".LA-RegisterArea").style.display = "block";
    document.querySelector(".LA-RegisterFailed").style.display = "none";
});

$('.LA-PreviewSettings').click(function () {
    document.querySelector(".LA-LoginUsername").value = "";
    document.querySelector(".LA-LoginPassword").value = "";
    document.querySelector(".LA-LoginArea").style.display = "none";
    document.querySelector(".LA-LoginFailed").style.display = "none";
    document.querySelector(".LA-LoggedInArea").style.display = "none";
    document.querySelector(".LA-PreviewArea").style.display = "block";
});

$('.LA-LogOut').click(function () {
    document.querySelector(".LA-LoggedInArea").style.display = "none";
    document.querySelector(".LA-LoginArea").style.display = "block";
    document.querySelector(".PA-UserID").style.opacity = "0%";
    document.querySelector(".PA-UserID").innerHTML = "Your ID is: ";
    document.querySelector(".SA-CreateButton").style.pointerEvents = "none";
    document.querySelector(".SA-CreateButton").style.backgroundColor = "grey";
    document.querySelector(".TA-UserCollection").style.pointerEvents = "none";
    document.querySelector(".TA-UserCollection").style.backgroundColor = "grey";
    userData = null;
    token = null;
    localStorage.setItem('token', null);
    $.post(url + "/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
});

$('.LA-ChangeDetails').click(function () {
    document.querySelector(".LA-LoggedInArea").style.display = "none";
    document.querySelector(".LA-LoggedInArea").style.display = "none";
    document.querySelector(".LA-UpdateArea").style.display = "block";
    document.querySelector(".LA-UpdateFailed").style.display = "none";
});

$('.LA-Import').click(function () {
    document.querySelector(".LA-ImportInput").click();
});

async function ImportData(file) {
    let text = await (new Response(file)).text();
    //console.log(text);
    $.post(url + "/PHP/import_data.php", { token: token, fileData: text }, StartFormat);
    document.querySelector(".LA-ImportInput").value = null;
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".TradeShopImported").style.display = "block";
}

function StartFormat() {
    $.post(url + "/PHP/format_import.php", { token: token });
    console.log("Importing Finished");
}

$('.LA-Export').click(function () {
    $.post(url + "/PHP/export_data.php", { token: token }, ExportData);
});

function ExportData(mydata) {
    var csvData = mydata;
    var csvFileName = "poketrades_export.csv";

    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += csvData;

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", csvFileName);
    document.body.appendChild(link);
    link.click();
    $(link).remove();
}

$('.LA-DeleteAllData').click(function () {
    document.querySelector("#NotificationArea").style.display = "block";
    document.querySelector(".DeleteAllConfirm").style.display = "block";

});

$('.LA-RegisterButton').click(function () {
    var registerUsername = (document.querySelector(".LA-RegisterUsername").value);
    var registerPassword = (document.querySelector(".LA-RegisterPassword").value);
    var registerConfirmPassword = (document.querySelector(".LA-RegisterConfirmPassword").value);
    if (registerUsername != "" && registerPassword != "" && registerConfirmPassword != "") {
        if (registerPassword == registerConfirmPassword) {
            var registerUUID = uuidv4();
            $.post(url + "/PHP/register_account.php", { username: registerUsername, password: registerPassword, uuid: registerUUID }, RegisterAccount);
        } else {
            document.querySelector(".LA-RegisterFailed").style.display = "block";
            document.querySelector(".LA-RegisterFailed").innerHTML = "Passwords do not match.";
        }

    } else {
        document.querySelector(".LA-RegisterFailed").style.display = "block";
        document.querySelector(".LA-RegisterFailed").innerHTML = "Please fill in all the fields.";
    }
});

document.querySelector(".LA-RegisterUsername").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".LA-RegisterButton").click();
    }
});

document.querySelector(".LA-RegisterPassword").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".LA-RegisterButton").click();
    }
});

document.querySelector(".LA-RegisterConfirmPassword").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".LA-RegisterButton").click();
    }
});

$('.LA-RegisterBackButton').click(function () {
    document.querySelector(".LA-RegisterUsername").value = "";
    document.querySelector(".LA-RegisterPassword").value = "";
    document.querySelector(".LA-RegisterConfirmPassword").value = "";
    document.querySelector(".LA-RegisterArea").style.display = "none";
    document.querySelector(".LA-LoginArea").style.display = "block";
    document.querySelector(".LA-RegisterFailed").style.display = "none";
});

$('.LA-ConfirmUpdate').click(function () {
    var updateUsername = (document.querySelector(".LA-UpdateUsername").value);
    var oldPassword = (document.querySelector(".LA-OldPassword").value);
    var newPassword = (document.querySelector(".LA-NewPassword").value);
    var confirmNewPassword = (document.querySelector(".LA-ConfirmNewPassword").value);

    if (updateUsername == "" && oldPassword == "" && newPassword == "" && confirmNewPassword == "") {
        document.querySelector(".LA-UpdateFailed").style.display = "block";
        document.querySelector(".LA-UpdateFailed").innerHTML = "Please fill in the username or password fields.";
    }

    else if (updateUsername != "") {
        if (oldPassword != "" || newPassword != "" || confirmNewPassword != "") {
            document.querySelector(".LA-UpdateFailed").style.display = "block";
            document.querySelector(".LA-UpdateFailed").innerHTML = "Cannot change username and password at the same time.";
        } else {
            $.post(url + "/PHP/update_username_or_password.php", { token: token, newUsername: updateUsername }, UpdateDetails);
        }
    } else if (oldPassword != "" && newPassword == "" || oldPassword != "" && confirmNewPassword == ""
        || oldPassword == "" && newPassword != "" && confirmNewPassword != "") {
        document.querySelector(".LA-UpdateFailed").style.display = "block";
        document.querySelector(".LA-UpdateFailed").innerHTML = "Please fill in all the password fields.";
    }


    else {
        if (oldPassword != "" || newPassword != "" || confirmNewPassword != "") {
            if (newPassword == confirmNewPassword) {
                $.post(url + "/PHP/update_username_or_password.php", { token: token, password: oldPassword, newPassword: newPassword }, UpdateDetails);
            } else {
                document.querySelector(".LA-UpdateFailed").style.display = "block";
                document.querySelector(".LA-UpdateFailed").innerHTML = "New passwords do not match.";
            }
        }
    }
});

document.querySelector(".LA-UpdateUsername").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".LA-ConfirmUpdate").click();
    }
});

document.querySelector(".LA-OldPassword").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".LA-ConfirmUpdate").click();
    }
});

document.querySelector(".LA-NewPassword").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".LA-ConfirmUpdate").click();
    }
});

document.querySelector(".LA-ConfirmNewPassword").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".LA-ConfirmUpdate").click();
    }
});

$('.LA-UpdateBackButton').click(function () {
    document.querySelector(".LA-UpdateArea").style.display = "none";
    document.querySelector(".LA-UpdateUsername").value = "";
    document.querySelector(".LA-OldPassword").value = "";
    document.querySelector(".LA-NewPassword").value = "";
    document.querySelector(".LA-ConfirmNewPassword").value = "";
    document.querySelector(".LA-UpdateFailed").style.display = "none";

    document.querySelector(".LA-LoggedInArea").style.display = "block";
    document.querySelector(".LA-LoggedInNotify").style.display = "none";

});


function CloseLoginArea() {
    document.querySelector("#LoginArea").style.display = "none";
    document.querySelector(".LA-LoginUsername").value = "";
    document.querySelector(".LA-LoginPassword").value = "";
    document.querySelector(".LA-LoginArea").style.display = "none";
    document.querySelector(".LA-LoginFailed").style.display = "none";
    document.querySelector(".LA-LoggedInArea").style.display = "none";
    document.querySelector(".LA-LoggedInNotify").style.display = "none";
    document.querySelector(".LA-RegisterArea").style.display = "none";
    document.querySelector(".LA-RegisterUsername").value = "";
    document.querySelector(".LA-RegisterPassword").value = "";
    document.querySelector(".LA-RegisterConfirmPassword").value = "";
    document.querySelector(".LA-RegisterFailed").style.display = "none";
    document.querySelector(".LA-UpdateArea").style.display = "none";
    document.querySelector(".LA-UpdateUsername").value = "";
    document.querySelector(".LA-OldPassword").value = "";
    document.querySelector(".LA-NewPassword").value = "";
    document.querySelector(".LA-ConfirmNewPassword").value = "";
    document.querySelector(".LA-UpdateFailed").style.display = "none";
    document.querySelector(".LA-PreviewArea").style.display = "none";
}

function UserLogin(data) {
    if (data != "" && data != "Wrong Username or Password.") {
        userData = jQuery.parseJSON(data);
        token = userData.token;
        localStorage.setItem('token', token);
        document.querySelector(".LA-LoginArea").style.display = "none";
        document.querySelector(".LA-LoginFailed").style.display = "none";
        document.querySelector(".LA-LoggedInArea").style.display = "block";
        document.querySelector(".LA-Username").innerHTML = userData.username;
        document.querySelector(".PA-UserID").style.opacity = "100%";
        document.querySelector(".PA-UserID").innerHTML = "Your ID is: " + userData.user_id;
        document.querySelector(".LA-LoginUsername").value = "";
        document.querySelector(".LA-LoginPassword").value = "";
        document.querySelector(".TA-UserCollection").style.pointerEvents = "initial";
        document.querySelector(".TA-UserCollection").style.backgroundColor = "#efefef";

        $.post(url + "/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
    } else {
        document.querySelector(".LA-LoginFailed").style.display = "block";
        document.querySelector(".LA-LoginFailed").innerHTML = "Wrong Username or Password.";
    }
}

function RegisterAccount(data) {
    if (data != "" && data != "Username already taken.") {
        userData = jQuery.parseJSON(data);
        token = userData.token;
        localStorage.setItem('token', token);
        document.querySelector(".LA-RegisterArea").style.display = "none";
        document.querySelector(".LA-RegisterFailed").style.display = "none";
        document.querySelector(".LA-LoggedInArea").style.display = "block";
        document.querySelector(".LA-LoggedInNotify").style.display = "block";
        document.querySelector(".LA-LoggedInNotify").innerHTML = "Account Created.";
        document.querySelector(".LA-Username").innerHTML = userData.username;
        document.querySelector(".PA-UserID").style.opacity = "100%";
        document.querySelector(".PA-UserID").innerHTML = "Your ID is: " + userData.user_id;
        document.querySelector(".LA-RegisterUsername").value = "";
        document.querySelector(".LA-RegisterPassword").value = "";
        document.querySelector(".LA-RegisterConfirmPassword").value = "";
        document.querySelector(".LA-RegisterFailed").style.display = "none";
        document.querySelector(".TA-UserCollection").style.pointerEvents = "initial";
        document.querySelector(".TA-UserCollection").style.backgroundColor = "#efefef";

        $.post(url + "/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
    } else {
        document.querySelector(".LA-RegisterFailed").style.display = "block";
        document.querySelector(".LA-RegisterFailed").innerHTML = "Username already taken.";
    }

}

function UpdateDetails(data) {
    if (data != "" && data != "Username already taken." && data != "Current password incorrect.") {
        userData = jQuery.parseJSON(data);
        token = userData.token;
        document.querySelector(".LA-UpdateArea").style.display = "none";
        document.querySelector(".LA-UpdateUsername").value = "";
        document.querySelector(".LA-OldPassword").value = "";
        document.querySelector(".LA-NewPassword").value = "";
        document.querySelector(".LA-ConfirmNewPassword").value = "";
        document.querySelector(".LA-UpdateFailed").style.display = "none";

        document.querySelector(".LA-LoggedInArea").style.display = "block";
        document.querySelector(".LA-LoggedInNotify").style.display = "block";
        document.querySelector(".LA-LoggedInNotify").innerHTML = "Account Updated.";
        document.querySelector(".LA-Username").innerHTML = userData.username;
    }
    else if (data == "Username already taken.") {
        document.querySelector(".LA-UpdateFailed").style.display = "block";
        document.querySelector(".LA-UpdateFailed").innerHTML = "Username already taken.";
    }
    else if (data == "Current password incorrect.") {
        document.querySelector(".LA-UpdateFailed").style.display = "block";
        document.querySelector(".LA-UpdateFailed").innerHTML = "Current password incorrect.";
    } else {
        console.log(data);
    }
}