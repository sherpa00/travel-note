const emailForm = document.getElementById("emailForm");
const email = document.getElementById("genToken");

const resetPasswordForm = document.getElementById("resetPassword");

emailForm.addEventListener("submit",(e) => {
    e.preventDefault();

    // fetch to show if user email is registered or not
    fetch("http://localhost:3000/account/email/verify",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email.value})
    }).then((res) => {
        return res.json();
    }).then((data) => {
        if (data.success) {
            console.log(data);
            alert("A token is sent to your email! Please keep it securely.")
            resetPasswordForm.style.display = "flex";
            emailForm.style.display = "none";
        } else {
            alert(data.message);
            window.location.reload();
        }
    })
})

// here is reset functionality
const token = document.getElementById("token");
const newPassword = document.getElementById("newPassword");
const newPassword1 = document.getElementById("newPassword1");

resetPasswordForm.addEventListener("submit",(e) => {
    e.preventDefault();

    if (newPassword.value === newPassword1.value) {
        // fetch to reset password
        fetch("http://localhost:3000/account/password/reset",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token.value,
                password: newPassword.value
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.success) {
                console.log(data);
                alert("Your password is reset.Login now");
                window.location = window.location.href.replace("/account/password/reset","/login");
                window.localStorage.clear();
            } else {
                alert(data.message);
                console.log(data);
            }
        })
    } else {
        alert("Password did not match");
    }
})