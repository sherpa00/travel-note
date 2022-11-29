const loginForm = document.getElementById("login");

const email = document.getElementById("email");
const password = document.getElementById("password");

loginForm.addEventListener("submit",(e) => {
    e.preventDefault();

    let resObj = {
        email: email.value,
        password: password.value
    }

    // fetch to login
    fetch("http://localhost:3000/login",{
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
            window.localStorage.setItem("token",data.token);
            email.value = "";
            password.value = "";
            console.log(window.localStorage.getItem("token"));
            window.location = window.location.href.replace("/login","/home");
        } else {
            alert(data.message);
            window.location.reload();
        }
    });
});