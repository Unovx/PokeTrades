var signedIn = false;
var userData;
var token;

var previewBall = true;
var previewGender = false;
var previewShiny = false;
var previewMint = false;
var previewMisc = false;
var previewMark = false;
var previewIVs = true;

$('.LA-LoginClose').click(function () {
    CloseLoginArea();

});

$('.LA-LoginButton').click(function () {
    var loginUsername = (document.querySelector(".LA-LoginUsername").value);
    var loginPassword = (document.querySelector(".LA-LoginPassword").value);
    if (loginUsername != "" && loginPassword != "") {
        $.post("https://poketrades.org/PHP/user_login.php", { username: loginUsername, password: loginPassword }, UserLogin);
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
    document.querySelector(".MA-UserID").style.display = "none";
    document.querySelector(".MA-UserID").innerHTML = "Your ID is: ";
    userData = null;
    token = null;
    signedIn = false;
});

$('.LA-ChangeDetails').click(function () {
    document.querySelector(".LA-LoggedInArea").style.display = "none";
    document.querySelector(".LA-LoggedInArea").style.display = "none";
    document.querySelector(".LA-UpdateArea").style.display = "block";
    document.querySelector(".LA-UpdateFailed").style.display = "none";
});

$('.LA-RegisterButton').click(function () {
    var registerUsername = (document.querySelector(".LA-RegisterUsername").value);
    var registerPassword = (document.querySelector(".LA-RegisterPassword").value);
    var registerConfirmPassword = (document.querySelector(".LA-RegisterConfirmPassword").value);
    if (registerUsername != "" && registerPassword != "" && registerConfirmPassword != "") {
        if (registerPassword == registerConfirmPassword) {
            $.post("https://poketrades.org/PHP/register_account.php", { username: registerUsername, password: registerPassword }, RegisterAccount);
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
        document.querySelector(".LA-UpdateFailed").innerHTML = "Please fill in either the username or password fields.";
    }

    else if (updateUsername != "") {
        if (oldPassword != "" || newPassword != "" || confirmNewPassword != "") {
            document.querySelector(".LA-UpdateFailed").style.display = "block";
            document.querySelector(".LA-UpdateFailed").innerHTML = "Cannot change username and password at the same time.";
        } else {
            $.post("https://poketrades.org/PHP/update_username_or_password.php", { token: token, newUsername: updateUsername }, UpdateDetails);
        }
    } else if (oldPassword != "" && newPassword == "" || oldPassword != "" && confirmNewPassword == ""
        || oldPassword == "" && newPassword != "" && confirmNewPassword != "") {
        document.querySelector(".LA-UpdateFailed").style.display = "block";
        document.querySelector(".LA-UpdateFailed").innerHTML = "Please fill in all the password fields.";
    }


    else {
        if (oldPassword != "" || newPassword != "" || confirmNewPassword != "") {
            if (newPassword == confirmNewPassword) {
                $.post("https://poketrades.org/PHP/update_username_or_password.php", { token: token, password: oldPassword, newPassword: newPassword }, UpdateDetails);
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

$('.LA-BallButton').click(function () {
    if (previewBall == false) {
        previewBall = true;
        document.querySelector(".LA-BallButton").innerHTML = "On";
    } else {
        previewBall = false;
        document.querySelector(".LA-BallButton").innerHTML = "Off";
    }
});

$('.LA-GenderButton').click(function () {
    if (previewGender == false) {
        previewGender = true;
        document.querySelector(".LA-GenderButton").innerHTML = "On";
    } else {
        previewGender = false;
        document.querySelector(".LA-GenderButton").innerHTML = "Off";
    }
});

$('.LA-ShinyButton').click(function () {
    if (previewShiny == false) {
        previewShiny = true;
        document.querySelector(".LA-ShinyButton").innerHTML = "On";
    } else {
        previewShiny = false;
        document.querySelector(".LA-ShinyButton").innerHTML = "Off";
    }
});

$('.LA-MintButton').click(function () {
    if (previewMint == false) {
        previewMint = true;
        document.querySelector(".LA-MintButton").innerHTML = "On";
    } else {
        previewMint = false;
        document.querySelector(".LA-MintButton").innerHTML = "Off";
    }
});

$('.LA-MiscButton').click(function () {
    if (previewMisc == false) {
        previewMisc = true;
        document.querySelector(".LA-MiscButton").innerHTML = "On";
    } else {
        previewMisc = false;
        document.querySelector(".LA-MiscButton").innerHTML = "Off";
    }
});

$('.LA-MarkButton').click(function () {
    if (previewMark == false) {
        previewMark = true;
        document.querySelector(".LA-MarkButton").innerHTML = "On";
    } else {
        previewMark = false;
        document.querySelector(".LA-MarkButton").innerHTML = "Off";
    }
});

$('.LA-IVsButton').click(function () {
    if (previewIVs == false) {
        previewIVs = true;
        document.querySelector(".LA-IVsButton").innerHTML = "On";
    } else {
        previewGender = false;
        document.querySelector(".LA-IVsButton").innerHTML = "Off";
    }

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
        document.querySelector(".LA-LoginArea").style.display = "none";
        document.querySelector(".LA-LoginFailed").style.display = "none";
        document.querySelector(".LA-LoggedInArea").style.display = "block";
        document.querySelector(".LA-Username").innerHTML = userData.username;
        document.querySelector(".MA-UserID").style.display = "block";
        document.querySelector(".MA-UserID").innerHTML = "Your ID is: " + userData.user_id;
        signedIn = true;
        document.querySelector(".LA-LoginUsername").value = "";
        document.querySelector(".LA-LoginPassword").value = "";
    } else {
        document.querySelector(".LA-LoginFailed").style.display = "block";
        document.querySelector(".LA-LoginFailed").innerHTML = "Wrong Username or Password.";
    }
}

function RegisterAccount(data) {
    if (data != "" && data != "Username already taken.") {
        userData = jQuery.parseJSON(data);
        token = userData.token;
        document.querySelector(".LA-RegisterArea").style.display = "none";
        document.querySelector(".LA-RegisterFailed").style.display = "none";
        document.querySelector(".LA-LoggedInArea").style.display = "block";
        document.querySelector(".LA-LoggedInNotify").style.display = "block";
        document.querySelector(".LA-LoggedInNotify").innerHTML = "Account Created.";
        document.querySelector(".LA-Username").innerHTML = userData.username;
        document.querySelector(".MA-UserID").style.display = "block";
        document.querySelector(".MA-UserID").innerHTML = "Your ID is: " + userData.user_id;
        signedIn = true;
        document.querySelector(".LA-RegisterUsername").value = "";
        document.querySelector(".LA-RegisterPassword").value = "";
        document.querySelector(".LA-RegisterConfirmPassword").value = "";
        document.querySelector(".LA-RegisterFailed").style.display = "none";
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