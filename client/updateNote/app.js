// authenticate onload
window.onload = () => {
    if (window.localStorage.getItem("token")) {
        // fetch the user
        fetch("http://localhost:3000/user",{
            method: "get",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((userDate) => {
            if (userDate.success) {
                console.log("Good to go");
                console.log(userDate);

                // onsubmit functionality
                const updateForm = document.getElementById("updateForm");

                // values
                const title = document.getElementById("title");
                const travel_location = document.getElementById("location");
                const star = document.getElementById("star");
                const date = document.getElementById("date");
                const note = document.getElementById("note");
                const image = document.getElementById("file");

                updateForm.addEventListener("submit",(e) => {
                    e.preventDefault();

                    // if image file is given then get a new formdata() or else just resobj
                    if (image.files[0]) {
                        let formData = new FormData();

                        formData.append("file",image.files[0]);

                        if (title.value) {
                            formData.append("title",title.value);
                        }
                        if (travel_location.value) {
                            formData.append("location",travel_location.value);
                        }
                        if (star.value) {
                            formData.append("star",star.value);
                        }
                        if (date.value) {
                            formData.append("date",date.value);
                        }
                        if (note.value) {
                            formData.append("note",note.value);
                        }

                        // fetch to update the note with image file
                        fetch(`http://localhost:3000/note/update/${window.localStorage.getItem("noteId")}`,{
                            method: "PATCH",
                            headers: {
                                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                            },
                            body: formData
                        }).then((res1) => {
                            return res1.json();
                        }).then((noteData) => {
                            if (noteData.success) {
                                alert("Your note is updated Successfully");
                                window.localStorage.removeItem("noteId")
                                window.location = window.location.href.replace("/home/update","/home");
                            } else {
                                alert("Some error occured");
                                window.localStorage.removeItem("noteId");
                                window.location = window.location.href.replace("/home/update","/home");
                            }
                        })

                    } else {

                        // simple object for resobj
                        let formData = {};

                        if (title.value) {
                            formData.title = title.value
                        }
                        if (travel_location.value) {
                            formData.location = travel_location.value
                        }
                        if (star.value) {
                            formData.star = star.value
                        }
                        if (date.value) {
                            formData.date = date.value
                        }
                        if (note.value) {
                            formData.note = note.value
                        }

                        // fetch note update containing json without any image files
                        fetch(`http://localhost:3000/note/update/${window.localStorage.getItem("noteId")}`,{
                            method: "PATCH",
                            headers: {
                                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(formData)
                        }).then((res1) => {
                            return res1.json();
                        }).then((noteData) => {
                            if (noteData.success) {
                                alert("Your note is updated Successfully");
                                window.localStorage.removeItem("noteId")
                                window.location = window.location.href.replace("/home/update","/home");
                            } else {
                                alert("Some error occured");
                                window.localStorage.removeItem("noteId");
                                window.location = window.location.href.replace("/home/update","/home");
                            }
                        })
                    } 
                })
            } else {
                console.log("Some error occured");
                console.log(userDate);
            }
        })
    } else {
        alert("You are not authenticated.");
        window.localStorage.clear();
        window.location = window.location.href.replace("/home/update","/login");

    }
}