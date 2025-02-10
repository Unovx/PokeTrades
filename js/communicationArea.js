//$.post(url + "/PHP/get_messages.php", UpdateMessages);
var otherParty = "";
scrollToBottom = true;

$('.NA-BlockMessageOption').click(function () {
    let isBlocked = false;
    var arrayBlockedList = new Array();
    if (userData.blocked_list == "" || userData.blocked_list == null) {

    } else {
        arrayBlockedList = userData.blocked_list.split(",");
        for (let i = 0; i < arrayBlockedList.length; i++) {
            if (arrayBlockedList[i] == otherParty) {
                isBlocked = true;
                blockIndex = i;
            }
        }
    }

    if (userData.blocked_list == "" || userData.blocked_list == null) {
        arrayBlockedList.push(otherParty);
    } else {
        if (!isBlocked) {
            arrayBlockedList.push(otherParty);
            console.log(arrayBlockedList);
        }
    }
    console.log(arrayBlockedList[0]);
    var newList = arrayBlockedList[0] + ",";
    for (let i = 1; i < arrayBlockedList.length; i++) {
        newList += arrayBlockedList[i] + ",";
    }
    console.log(newList);
    userData.blocked_list = newList.substring(0, newList.length - 1);
    $.post(url + "/PHP/update_blocked_list.php", { token: token, blockedList: userData.blocked_list });
    $('.NA-MessageOptionsClose').click();
    UpdatedBlockList();

});

$('.NA-UnblockMessageOption').click(function () {
    let isBlocked = false;
    let blockIndex = 0;
    var arrayBlockedList = userData.blocked_list.split(",");
    for (let i = 0; i < arrayBlockedList.length; i++) {
        if (arrayBlockedList[i] == otherParty) {
            isBlocked = true;
            blockIndex = i;
        }
    }

    if (isBlocked) {
        arrayBlockedList.splice(blockIndex, 1);
        console.log(arrayBlockedList);
    }

    var newList = '';
    for (let i = 0; i < arrayBlockedList.length; i++) {
        newList = arrayBlockedList[i] + ",";
    }
    userData.blocked_list = newList.substring(0, newList.length - 1);
    $.post(url + "/PHP/update_blocked_list.php", { token: token, blockedList: userData.blocked_list });
    $('.NA-MessageOptionsClose').click();
    UpdatedBlockList();
    document.querySelector(".CA-MessageInput").value = "";

});



if (typeof (EventSource) !== "undefined") {
    var source = new EventSource("https://poketrades.org/PHP/sse_event.php");
    source.onmessage = function () {
        if (otherParty != "" && document.getElementById("Inbox").style.display == "block") {
            $.post(url + "/PHP/get_messages.php", { token: token, otherParty: otherParty }, UpdateMessages);
        }
    };
}

source.onerror = () => {
    $.post(url + "/PHP/get_messages.php", { token: token, otherParty: otherParty }, UpdateMessages);
};

$(function CloseTheSource() {
    setInterval(CloseSource, 1000);
});
function CloseSource() {
    if (otherParty != "" && document.getElementById("Inbox").style.display == "block" && document.getElementById("CommunicationArea").style.display == "block") {

    } else {
        if (otherParty == "" || otherParty != "" && document.getElementById("ContactsList").style.display == "block" || document.getElementById("CommunicationArea").style.display == "none") {
            source.close();
        }
    }
}

$(function CheckForNewMesages() {
    setInterval(CheckingMessages, 5000);
});
function CheckingMessages() {
    $.post(url + "/PHP/check_for_new_messages.php", { token: token }, UpdateAlert);
}


/*$(function GetNewMessages() {
    setInterval(GetMessages, 1000);
});
function GetMessages() {
    //alert("Test");
    if (otherParty != "" && document.getElementById("Inbox").style.display == "block") {
        //$.post(url + "/PHP/get_messages.php", { token: token, otherParty: otherParty }, UpdateMessages);
        $.post(url + "/PHP/check_for_new_messages.php", { token: token, otherParty: otherParty }, MessageCheckConversation);
    }
}*/

$('.CA-Close').click(function () {
    if (ctsSeaching && selectedPokemon == null) {
        document.querySelector("#CTSArea").style.display = "block";
    }
    else if (selectedPokemon != null) {
        document.querySelector("#DetailsArea").style.display = "block";
    }
    else if (document.querySelector("#SelectionArea").style.display == "grid" && !currentlyImporting) {
        document.querySelector("#PanelArea").style.display = "block";
        $.post(url + "/PHP/search_id.php", { searchID: searchInfoText }, TradeShopInfo);
        document.querySelector(".PA-TradeShopPanel").style.display = "block";
    }
    else if (currentlyImporting) {
        document.querySelector("#ImportArea").style.display = "block";
    }
    document.querySelector("#CommunicationArea").style.display = "none";
    document.querySelector("#MainArea").style.position = "absolute";
    //CloseAll();
    //document.querySelector("#MainArea").style.display = "block";

});

$(".CA-Contacts").click(function () {
    source.close();
    document.querySelector("#BlockedList").style.display = "none";
    document.querySelector("#Inbox").style.display = "none";
    document.querySelector("#ContactsList").style.display = "block";
    $.post(url + "/PHP/get_contacts.php", { token: token }, ShowContacts);
});

$(".CA-Blocked").click(function () {
    source.close();
    document.querySelector("#ContactsList").style.display = "none";
    document.querySelector("#Inbox").style.display = "none";
    document.querySelector("#BlockedList").style.display = "block";
    $.post(url + "/PHP/get_blocked_list.php", { token: token }, ShowBlocked);
});

$('.CA-MessageInput').on('keypress', function (e) {
    if (e.which == 13 && document.querySelector(".CA-MessageInput").value != "") {
        /*newDiv = document.createElement("div");
        newDiv.setAttribute("id", "Message" + (i));
        //newDiv.style.background = "white";
        //newDiv.style.height = "100px";
        newDiv.style.width = "350px";
        document.getElementById("MessagesContainer").appendChild(newDiv);

        newImage = document.createElement("img");
        newImage.setAttribute("class", "CA-AvatarImage");
        newImage.src = src = "https://poketrades.org/Resources/Designs/Assistant_Normal.png";
        newDiv.appendChild(newImage);

        textDiv = document.createElement("div");
        textDiv.setAttribute("class", "CA-SentMessage");
        newDiv.appendChild(textDiv);

        text = document.createElement("Text");
        text.setAttribute("class", "CA-Text");
        text.innerHTML = document.querySelector(".CA-MessageInput").value;
        //text.innerHTML = "This is a test message to test padding and readability, so please excuse this";
        textDiv.appendChild(text);

        newDiv.style.right = "21px";
        newDiv.style.position = "relative";*/
        $.post(url + "/PHP/send_message.php", { token: token, otherParty: otherParty, messageText: document.querySelector(".CA-MessageInput").value });
    }
});

$('.CA-MessageInput').on('keyup', function (e) {
    if (e.which == 13) {
        var text = $('.CA-MessageInput').val();
        text = text.replace(text, "");
        $(this).val(text);
        document.querySelector(".CA-MessageInput").style.height = document.querySelector(".CA-MessageInput").style.minHeight;
        //I COULD uncomment the below text, what that would mean is that, typing in a new message would scroll you down to the bottom like discord.
        //document.querySelector("#GeneratedMessages").scrollTo(0, document.querySelector("#GeneratedMessages").scrollHeight);
    }
});

function UpdateMessages(data) {
    $.post(url + "/PHP/check_for_new_messages.php", { token: token }, UpdateAlert);
    messageData = jQuery.parseJSON(data);
    //console.log(messageData);

    if (document.querySelector("#GeneratedMessages").scrollHeight - document.querySelector("#GeneratedMessages").scrollTop == (document.getElementById("GeneratedMessages").clientHeight)) {
        scrollToBottom = true;
    } else {
        scrollToBottom = false;
        //console.log(document.querySelector("#GeneratedMessages").scrollHeight);
        //console.log(document.querySelector("#GeneratedMessages").scrollTop);
        //console.log(document.getElementById("GeneratedMessages").clientHeight);

    }

    $("#MessagesContainer").remove();
    messageTest = document.createElement("div");
    messageTest.setAttribute("id", "MessagesContainer");
    document.getElementById("GeneratedMessages").appendChild(messageTest);

    if (messageData["Rows"] == null) {
        return;
    }

    for (let i = 0; i < messageData["Rows"].length; i++) {
        messagingArray = [];
        messagingArray = messageData["Rows"][i];

        if (messagingArray.message_text == null) {
            if (messagingArray.infraction == "UserInfracted") {
                document.querySelector(".CA-MessageInput").disabled = true;
                document.querySelector(".CA-MessageInput").value = "You are not able to talk to any users until your time out is over.";
                document.querySelector(".CA-UserAvatar").src = url + "/Resources/Avatars/" + userData.avatar + "_Pained.png";
            } else if (messagingArray.infraction == "OtherInfracted") {
                document.querySelector(".CA-MessageInput").disabled = true;
                document.querySelector(".CA-MessageInput").value = "They are currently timed out and are not able talk to any users.";
            }

            else if (messagingArray.blocked == "blocked") {
                document.querySelector(".CA-MessageInput").disabled = true;
                document.querySelector(".CA-MessageInput").value = "You are not able to talk to this user.";
            }
            continue;
        }

        if (document.querySelector(".CA-MessageInput").disabled == true && messagingArray.blocked != "blocked" && messagingArray.infraction == null) {
            document.querySelector(".CA-MessageInput").disabled = false;
            document.querySelector(".CA-MessageInput").value = "";
        }
        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "Message" + (i));
        //newDiv.style.background = "white";
        //newDiv.style.height = "100px";
        newDiv.style.width = "350px";
        document.getElementById("MessagesContainer").appendChild(newDiv);

        newImage = document.createElement("img");
        newImage.setAttribute("class", "CA-AvatarImage");
        newImage.classList.add("Lozad");

        if (messagingArray.recipient_id == userData.user_id && messagingArray.online_status == "Online") {
            //newImage.style.borderColor = "#28bf6e";
            //newImage.style.boxShadow = "0px 0px 8px #28bf6e";
            newImage.style.borderColor = "#00c4ff";
            newImage.style.boxShadow = "0px 0px 8px #00d4ff";
        }

        textDiv = document.createElement("div");


        text = document.createElement("Text");
        text.setAttribute("class", "CA-Text");
        text.innerHTML = messagingArray.message_text;
        //text.innerHTML = "This is a test message to test padding and readability, so please excuse this";
        textDiv.appendChild(text);

        if (messagingArray.infraction == null) {
            if (messagingArray.sender_id != userData.user_id) {
                newImage.src = url + "/Resources/Avatars/" + messagingArray.avatar + "_Normal.png";
            } else {
                newImage.src = url + "/Resources/Avatars/" + userData.avatar + "_Normal.png";
            }
        } else {
            if (messagingArray.sender_id != userData.user_id) {
                newImage.src = url + "/Resources/Avatars/" + messagingArray.avatar + "_Pained.png";
            } else {
                newImage.src = url + "/Resources/Avatars/" + userData.avatar + "_Pained.png";
            }
        }

        if (messagingArray.sender_id != userData.user_id) {
            newDiv.appendChild(textDiv);
            newDiv.appendChild(newImage);
            newDiv.style.left = "21px";
            newDiv.style.position = "relative";
            textDiv.setAttribute("class", "CA-RecievedMessage");

            if (messagingArray.sender_id == 0) {
                newImage.style.cursor = "initial";
                newImage.src = "https://poketrades.org/Resources/Designs/Assistant_Normal.png";
            }
        } else {
            newDiv.appendChild(newImage);
            newDiv.appendChild(textDiv);
            newDiv.style.right = "21px";
            newDiv.style.position = "relative";
            textDiv.setAttribute("class", "CA-SentMessage");
            newImage.style.cursor = "initial";
        }

        newImage.onclick = function () {
            if (messageData["Rows"][i].sender_id != userData.user_id && messageData["Rows"][i].sender_id != 0) {
                document.querySelector("#NotificationArea").style.display = "block";
                document.querySelector(".MessageOptionsPrompt").style.display = "block";
            }
        }
    }

    //document.querySelector(".CA-MessageInput").style.height = document.querySelector(".CA-MessageInput").style.minHeight;
    //document.querySelector("#GeneratedMessages").scrollTo(0, document.querySelector("#GeneratedMessages").scrollHeight);
    if (scrollToBottom) {
        document.querySelector("#GeneratedMessages").scrollTo(0, document.querySelector("#GeneratedMessages").scrollHeight);
    }
    //console.log(document.querySelector("#GeneratedMessages").scrollTop);
    //console.log(document.querySelector("#GeneratedMessages").scrollHeight);
}

function ShowContacts(data) {
    document.querySelector(".CA-UserAvatar").src = url + "/Resources/Avatars/" + userData.avatar + "_Normal.png";
    contactsData = jQuery.parseJSON(data);
    $("#MessagesContainer").remove();
    messageTest = document.createElement("div");
    messageTest.setAttribute("id", "MessagesContainer");
    document.getElementById("GeneratedMessages").appendChild(messageTest);

    $("#ContactsContainer").remove();
    contactsTest = document.createElement("div");
    contactsTest.setAttribute("id", "ContactsContainer");
    document.getElementById("GeneratedContacts").appendChild(contactsTest);

    if (contactsData["Rows"] == null) {
        return;
    }

    for (let i = 0; i < contactsData["Rows"].length; i++) {
        newDiv = document.createElement("div");

        messagingArray = [];
        messagingArray = contactsData["Rows"][i];

        var continueLoop = true;

        if (messagingArray.sender_id == userData.user_id) {
            for (let j = 0; j < contactsData["Rows"].length; j++) {
                if (messagingArray.sender_id == contactsData["Rows"][j].recipient_id && messagingArray.recipient_id == contactsData["Rows"][j].sender_id) {
                    continueLoop = false;
                    console.log(contactsData["Rows"][j].recipient_id);
                }
            }
        }

        if (!continueLoop) {
            continue;
        }

        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "Contact" + (i));
        newDiv.style.width = "350px";
        document.getElementById("ContactsContainer").appendChild(newDiv);
        newDiv.setAttribute("class", "CA-ContactBlock");

        if (messagingArray.recipient_id == userData.user_id && messagingArray.read_status == "Unread") {
            newDiv.style.borderColor = "#00c4ff";
            newDiv.style.boxShadow = "0px 0px 8px #00d4ff";
        }

        newImage = document.createElement("img");
        newImage.setAttribute("class", "CA-AvatarImage");
        newImage.classList.add("Lozad");
        if (messagingArray.infraction == null) {
            newImage.src = url + "/Resources/Avatars/" + messagingArray.avatar + "_Normal.png";
        } else {
            newImage.src = url + "/Resources/Avatars/" + messagingArray.avatar + "_Pained.png";
        }


        if (messagingArray.sender_id == 0) {
            newImage.src = "https://poketrades.org/Resources/Designs/Assistant_Normal.png";
        }

        if (messagingArray.recipient_id == userData.user_id && messagingArray.online_status == "Online") {
            newImage.style.borderColor = "#00c4ff";
            newImage.style.boxShadow = "0px 0px 8px #00d4ff";
        }

        textDiv = document.createElement("div");


        text = document.createElement("Text");
        text.setAttribute("class", "CA-ContactText");
        if (messagingArray.sender_id != userData.user_id) {
            text.innerHTML = messagingArray.username + " #" + messagingArray.sender_id;
        } else {
            text.innerHTML = messagingArray.username + " #" + messagingArray.recipient_id;
        }

        if (messagingArray.sender_id == 0) {
            text.innerHTML = "PokeTrades";
        }
        textDiv.appendChild(text);
        newDiv.appendChild(newImage);
        newDiv.appendChild(textDiv);
        newDiv.style.right = "21px";
        newDiv.style.position = "relative";
        //textDiv.setAttribute("class", "CA-SentMessage");

        newDiv.onclick = function () {
            document.getElementById("ContactsList").style.display = "none";
            document.getElementById("Inbox").style.display = "block";
            document.querySelector(".CA-MessageInput").value = "";
            $('.CA-MessageInput').on('keyup');
            document.querySelector(".CA-MessageInput").style.height = document.querySelector(".CA-MessageInput").style.minHeight;
            if (contactsData["Rows"][i].sender_id != userData.user_id) {
                document.querySelector(".CA-UsersInvolved").innerHTML = userData.username + "#" + userData.user_id + " to " + contactsData["Rows"][i].username + "#" + contactsData["Rows"][i].sender_id;
            } else {
                document.querySelector(".CA-UsersInvolved").innerHTML = userData.username + "#" + userData.user_id + " to " + contactsData["Rows"][i].username + "#" + contactsData["Rows"][i].recipient_id;
            }

            if (contactsData["Rows"][i].sender_id == "0") {
                document.querySelector(".CA-UsersInvolved").innerHTML = userData.username + "#" + userData.user_id + " to PokeTrades";
                document.querySelector(".CA-MessageInput").disabled = true;
                document.querySelector(".CA-MessageInput").value = "You are not able to respond to this user.";
                otherParty = null;
            } else {
                document.querySelector(".CA-MessageInput").disabled = false;
            }

            if (contactsData["Rows"][i].sender_id != userData.user_id) {
                otherParty = contactsData["Rows"][i].sender_id;
                source = new EventSource("https://poketrades.org/PHP/sse_event.php");
                source.onmessage = function () {
                    $.post(url + "/PHP/get_messages.php", { token: token, otherParty: contactsData["Rows"][i].sender_id }, UpdateMessages);
                };
            } else {
                otherParty = contactsData["Rows"][i].recipient_id;
                source = new EventSource("https://poketrades.org/PHP/sse_event.php");
                source.onmessage = function () {
                    $.post(url + "/PHP/get_messages.php", { token: token, otherParty: contactsData["Rows"][i].recipient_id }, UpdateMessages);
                };
            }
        }

    }

}

function ShowBlocked(data) {
    document.querySelector(".CA-UserAvatar").src = url + "/Resources/Avatars/" + userData.avatar + "_Normal.png";
    blockedData = jQuery.parseJSON(data);
    $("#MessagesContainer").remove();
    messageTest = document.createElement("div");
    messageTest.setAttribute("id", "MessagesContainer");
    document.getElementById("GeneratedMessages").appendChild(messageTest);

    $("#BlockedContainer").remove();
    blockedTest = document.createElement("div");
    blockedTest.setAttribute("id", "BlockedContainer");
    document.getElementById("GeneratedBlocked").appendChild(blockedTest);

    if (blockedData["Rows"] == null) {
        return;
    }

    for (let i = 0; i < blockedData["Rows"].length; i++) {
        newDiv = document.createElement("div");

        messagingArray = [];
        messagingArray = blockedData["Rows"][i];

        var continueLoop = true;

        if (messagingArray.sender_id == userData.user_id) {
            for (let j = 0; j < blockedData["Rows"].length; j++) {
                if (messagingArray.sender_id == blockedData["Rows"][j].recipient_id && messagingArray.recipient_id == blockedData["Rows"][j].sender_id) {
                    continueLoop = false;
                }
            }
        }

        if (!continueLoop) {
            continue;
        }

        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "Contact" + (i));
        newDiv.style.width = "350px";
        document.getElementById("BlockedContainer").appendChild(newDiv);
        newDiv.setAttribute("class", "CA-ContactBlock");

        if (messagingArray.recipient_id == userData.user_id && messagingArray.read_status == "Unread") {
            newDiv.style.borderColor = "#00c4ff";
            newDiv.style.boxShadow = "0px 0px 8px #00d4ff";
        }

        newImage = document.createElement("img");
        newImage.setAttribute("class", "CA-AvatarImage");
        newImage.classList.add("Lozad");
        if (messagingArray.infraction == null) {
            newImage.src = url + "/Resources/Avatars/" + messagingArray.avatar + "_Normal.png";
        } else {
            newImage.src = url + "/Resources/Avatars/" + messagingArray.avatar + "_Pained.png";
        }

        if (messagingArray.recipient_id == userData.user_id && messagingArray.online_status == "Online") {
            newImage.style.borderColor = "#00c4ff";
            newImage.style.boxShadow = "0px 0px 8px #00d4ff";
        }

        textDiv = document.createElement("div");


        text = document.createElement("Text");
        text.setAttribute("class", "CA-ContactText");
        if (messagingArray.sender_id != userData.user_id) {
            text.innerHTML = messagingArray.username + " #" + messagingArray.sender_id;
        } else {
            text.innerHTML = messagingArray.username + " #" + messagingArray.recipient_id;
        }

        if (messagingArray.sender_id == 0) {
            text.innerHTML = "PokeTrades";
        }
        textDiv.appendChild(text);
        newDiv.appendChild(newImage);
        newDiv.appendChild(textDiv);
        newDiv.style.right = "21px";
        newDiv.style.position = "relative";
        //textDiv.setAttribute("class", "CA-SentMessage");

        newDiv.onclick = function () {
            document.getElementById("BlockedList").style.display = "none";
            document.getElementById("Inbox").style.display = "block";
            document.querySelector(".CA-MessageInput").value = "";
            $('.CA-MessageInput').on('keyup');
            document.querySelector(".CA-MessageInput").style.height = document.querySelector(".CA-MessageInput").style.minHeight;
            if (blockedData["Rows"][i].sender_id != userData.user_id) {
                document.querySelector(".CA-UsersInvolved").innerHTML = userData.username + "#" + userData.user_id + " to " + blockedData["Rows"][i].username + "#" + blockedData["Rows"][i].sender_id;
            } else {
                document.querySelector(".CA-UsersInvolved").innerHTML = userData.username + "#" + userData.user_id + " to " + blockedData["Rows"][i].username + "#" + blockedData["Rows"][i].recipient_id;
            }

            if (blockedData["Rows"][i].sender_id == "0") {
                document.querySelector(".CA-UsersInvolved").innerHTML = userData.username + "#" + userData.user_id + " to PokeTrades";
                document.querySelector(".CA-MessageInput").disabled = true;
                document.querySelector(".CA-MessageInput").value = "You are not able to respond to this user.";
            } else {
                document.querySelector(".CA-MessageInput").disabled = false;
            }

            if (blockedData["Rows"][i].sender_id != userData.user_id) {
                otherParty = blockedData["Rows"][i].sender_id;
                source = new EventSource("https://poketrades.org/PHP/sse_event.php");
                source.onmessage = function () {
                    $.post(url + "/PHP/get_messages.php", { token: token, otherParty: blockedData["Rows"][i].sender_id }, UpdateMessages);
                };
            } else {
                otherParty = blockedData["Rows"][i].recipient_id;
                source = new EventSource("https://poketrades.org/PHP/sse_event.php");
                source.onmessage = function () {
                    $.post(url + "/PHP/get_messages.php", { token: token, otherParty: blockedData["Rows"][i].recipient_id }, UpdateMessages);
                };
            }
        }

    }

}

function UpdateAlert(data) {
    updateData = jQuery.parseJSON(data);
    if (updateData["Rows"] == null) {
        document.querySelector(".MA-AlertIcon").style.display = "none";
        link.href = "https://poketrades.org/PokeTrades Icon Final.png";
        return;
    }

    let displayAlert = false;
    for (let i = 0; i < updateData["Rows"].length; i++) {
        if (updateData["Rows"][i].read_status == "Unread") {
            displayAlert = true;
        }
    }
    if (displayAlert) {
        document.querySelector(".MA-AlertIcon").style.display = "block";
        link.href = "https://poketrades.org/PokeTrades Icon Notification.png";
    }
}

function MessageCheckConversation(data) {
    arrayData = jQuery.parseJSON(data);

    for (let i = 0; i < arrayData["Rows"].length; i++) {
        if (arrayData["Rows"][i].read_status == "Unread") {
            $.post(url + "/PHP/get_messages.php", { token: token, otherParty: otherParty }, UpdateMessages);
        }
    }
}
