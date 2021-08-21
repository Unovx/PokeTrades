const loginArea = {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        submit(){
            if (this.username != "" && this.password != "") {
                $.post("https://poketrades.org/PHP/user_login.php", 
                    {username: this.username, password: this.password}, UserLogin);
            } else {
                document.querySelector(".LA-LoginFailed").style.display = "block";
                document.querySelector(".LA-LoginFailed").innerHTML = "Please fill in all the fields.";
            }
        },
        register(){
            document.querySelector(".LA-LoginArea").style.display = "none";
            document.querySelector(".LA-LoginFailed").style.display = "none";
            document.querySelector(".LA-RegisterArea").style.display = "block";
            document.querySelector(".LA-RegisterFailed").style.display = "none";
        }
    }
}
Vue.createApp(loginArea).mount('#LA-LoginArea')

function UserLogin(data) {
    if (data != "" && data != "Wrong Username or Password.") {
        let userData = jQuery.parseJSON(data);
        let token = userData.token;
        localStorage.setItem('token', token);
        document.querySelector(".LA-LoginArea").style.display = "none";
        document.querySelector(".LA-LoginFailed").style.display = "none";
        document.querySelector(".LA-LoggedInArea").style.display = "block";
        document.querySelector(".LA-Username").innerHTML = userData.username;
        document.querySelector(".PA-UserID").style.opacity = "100%";
        document.querySelector(".PA-UserID").innerHTML = "Your ID is: " + userData.user_id;

        $.post("https://poketrades.org/PHP/modify_check.php", { token: token, searchID: searchInfoText }, ModifyCheck);
    } else {
        document.querySelector(".LA-LoginFailed").style.display = "block";
        document.querySelector(".LA-LoginFailed").innerHTML = "Wrong Username or Password.";
    }
}