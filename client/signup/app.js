

const registerForm = document.getElementById("register");

// input
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password1 = document.getElementById("password1");

// onSubmit register form
registerForm.addEventListener("submit",(e) => {
    e.preventDefault();

    if (password.value !== password1.value) {
        alert("Password does not match at Retype Password.");
        window.location.reload();
    }

    let resObj = {
        username: username.value,
        email: email.value,
        password: password.value
    }
    
    // fetch api to register new user;
    fetch("http://localhost:3000/signup",{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resObj)
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        if (data.success) {
            console.log(data);
            window.location = window.location.href.replace("/signup","/login");
            username.value = "";
            email.value = "";
            password.value = "";
            password1.value = "";
        } else {
            console.log("Error while registering");
            console.log(data);
        }
    })
    .catch((err) => {
        console.log(err);
    })
    
});