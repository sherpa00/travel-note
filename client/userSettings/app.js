// authenticate user
window.onload = () => {
    if (window.localStorage.getItem("token")) {
         // fetch user if token is available
         fetch("http://localhost:3000/user",{
            method: "get",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('token')
            }
         }).then((res) => {
            return res.json();
         }).then((userData) => {
            if (userData.success) {
                // if user is fetched and authenticated
                console.log(userData);

                // get the username,email and password form
                const usernameForm = document.getElementById("usernameForm");
                const emailForm = document.getElementById("emailForm");
                const passwordForm = document.getElementById("passwordForm");

                // get the username,email and password input
                const username = document.getElementById("username");
                const email = document.getElementById("email");
                const password = document.getElementById("password");

                // change username
                usernameForm.addEventListener("submit",(e) => {
                    e.preventDefault();

                    console.log("Username");
                    // fetch to modify username
                    fetch(`http://localhost:3000/user/settings/username/${userData.user._id}`,{
                        method: "PATCH",
                        headers: {
                            "Authorization" : "Bearer " + window.localStorage.getItem("token"),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({"username": username.value})
                    }).then((res1) => {
                        return res1.json();
                    }).then((data) => {
                        if (data.success) {
                            alert("Username is modified successfully.");
                            window.location = window.location.href.replace("/home/settings","/home");
                        } else {
                            alert("Some error occured while modifying Username.");
                            window.location.reload();
                        }
                    })
                })

                // change email
                emailForm.addEventListener("submit",(e) => {
                    e.preventDefault();

                    console.log("Email");
                    // fetch to modify username
                    fetch(`http://localhost:3000/user/settings/email/${userData.user._id}`,{
                        method: "PATCH",
                        headers: {
                            "Authorization" : "Bearer " + window.localStorage.getItem("token"),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({"email": email.value})
                    }).then((res1) => {
                        return res1.json();
                    }).then((data) => {
                        if (data.success) {
                            alert("Email is modified successfully.");
                            window.location = window.location.href.replace("/home/settings","/home");
                        } else {
                            alert("Some error occured while modifying email.");
                            window.location.reload();
                        }
                    })
                })

                // change password
                passwordForm.addEventListener("submit",(e) => {
                    e.preventDefault();

                    console.log("Password");
                    // fetch to modify username
                    fetch(`http://localhost:3000/user/settings/password/${userData.user._id}`,{
                        method: "PATCH",
                        headers: {
                            "Authorization" : "Bearer " + window.localStorage.getItem("token"),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({"password": password.value})
                    }).then((res1) => {
                        return res1.json();
                    }).then((data) => {
                        if (data.success) {
                            alert("Password is modified successfully. Login again!");
                            window.localStorage.clear();
                            window.location = window.location.href.replace("/home/settings","/login");
                        }
                    })
                });

                // Delete user 
                const deleteUser = document.getElementById("deleteAccount");

                deleteUser.addEventListener("click",(e) => {
                    e.preventDefault();

                    // fetch to delete user
                    fetch(`http://localhost:3000/user/settings/deleteUser/${userData.user._id}`,{
                        method: "DELETE",
                        headers: {
                            "Authorization": "Bearer " + window.localStorage.getItem("token")
                        }
                    }).then((res1) => {
                        return res1.json();
                    }).then((deleteData) => {
                        if (deleteData.success) {
                            alert("User is Deleted Successfully");
                            window.localStorage.clear();
                            window.location = window.location.href.replace("/home/settings","");
                        } else {
                            alert("some error occured while removing the user");
                            window.location = window.location.href.replace("/home/settings","/home");
                        }
                    })
                })


            } else {
                alert("You are not authenticated");
                window.localStorage.clear();
                window.location = window.location.href.replace("/home/settings","/login");
            }
         })
    } else {
        alert("You are not authenticated");
        window.localStorage.clear();
        window.location = window.location.href.replace("/home/settings","/login");
    }
}