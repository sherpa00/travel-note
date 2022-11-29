// first check if unauthorized or not
window.onload = () => {
    if (window.localStorage.getItem("token")) {
        fetch("http://localhost:3000/user",{
            method: "get",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.success) {
                // here will be the add login
                const title = document.getElementById("title");
                const travel_location = document.getElementById("location");
                const star = document.getElementById("star");
                const date = document.getElementById("date");
                const note = document.getElementById("note");
                const image = document.getElementById("file");

                const addForm = document.getElementById("addForm");

                // on submit eventk
                addForm.addEventListener("submit",(e) => {
                    e.preventDefault();
                        
                    let formData = new FormData();

                    formData.append("title",title.value);
                    formData.append("location",travel_location.value);
                    formData.append("star",star.value);
                    formData.append("date",date.value);
                    formData.append("note",note.value);
                    formData.append("file",image.files[0]);

                    // fetch the formDate to post note
                    fetch("http://localhost:3000/note/add",{
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + window.localStorage.getItem("token")
                        },
                        body: formData
                    })
                    .then((res1) => {
                        return res1.json();
                    })
                    .then((noteData) => {
                        if (noteData.success) {
                            alert("Successfully added note");
                            window.location = window.location.href.replace("/home/add","/home")
                        } else {
                            alert("some error occurred.");
                            window.location.reload();
                        }
                    })
                })

            } else {
                console.log("Some error occured");
                console.log(data);
            }
        })
    } else {
        alert("you are not authorized");
        window.location = window.location.href.replace("/home/add","/login");
        window.localStorage.clear();
    }
}
