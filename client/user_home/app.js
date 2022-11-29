// fetch data

window.onload = () => {
    if (window.localStorage.getItem("token")) {
        console.log(window.localStorage.getItem("token"));
        fetch("http://localhost:3000/user", {
                method: "get",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((userData) => {
                if (userData.success) {
                    // fetch the user's notes here when user is authorized and authenticated
                    fetch("http://localhost:3000/note/show", {
                            method: "get",
                            headers: {
                                "Authorization": "Bearer " + window.localStorage.getItem("token")
                            }
                        })
                        .then((res) => {
                            return res.json();
                        })
                        .then((notesData) => {
                            if (notesData.success) {
                                // if fetch data is successfull add the data to dom html
                                let body = document.querySelector("body");
                                let notesArray = notesData.output;
                                console.log(notesArray);

                                let div = document.createElement("div");
                                div.id = "container"
                                // make the user profile heading
                                div.innerHTML = `
                                <h2>
                                    Welcome Home, ${userData.user.username}
                                </h2>
                    
                                <p>
                                    Email: ${userData.user.email}
                                </p>
                                <p>
                                    Created at: ${userData.user.issued}
                                </p>
                    
                                <div id="btns-group">
                                    <button id="settings">
                                        <a href="/home/settings">Settings</a>
                                    </button>
                                    <button id="logout">
                                        Logout
                                    </button>
                                </div>

                                <button id="add">
                                    <a href="/home/add">+ Add Travel Note</a>
                                </button>
                                <h3>
                                    My Travel Notes
                                </h3>
                            
                        `
                                // iterate the elemnet for each note in output array if not empty
                                if (notesArray.length <= 0) {
                                    let travelDiv = document.createElement("div");
                                    travelDiv.id = "empty";
                                    travelDiv.innerHTML = `
                                        <img src="./empty.gif" alt="so empty" />

                                        <h3> 
                                            So empty add something.
                                        </h3>
                                `
                                    div.appendChild(travelDiv);
                                    body.appendChild(div);
                                } else {
                                    // if notesArray not empty iterate and create elements
                                    let travelDiv = document.createElement("div");
                                    travelDiv.id = "travel-list";

                                    // func to convert buffer array to base64;
                                    function _arrayBufferToBase64( buffer ) {
                                        let binary = '';
                                        let bytes = new Uint8Array( buffer );
                                        let len = bytes.byteLength;
                                        for (let i = 0; i < len; i++) {
                                            binary += String.fromCharCode( bytes[ i ] );
                                        }
                                        return window.btoa( binary );
                                    }

                                    notesArray.forEach((note) => {
                                        let noteDiv = document.createElement("div");
                                        noteDiv.className = "travel-note";

                                        let bufer = note.image.data.data;
                                        let base64Img = _arrayBufferToBase64(bufer).toString('base64');
                                        let mimetype = note.image.contentType;

                                        noteDiv.innerHTML = `
                                            <img src="data:${mimetype};base64,${base64Img}" alt="travlel images" />
                                            <h4>${note.title}</h4>
                                            <hr></hr>
                                            <h5>
                                                <strong>Location: </strong> ${note.location}
                                            </h5>
                                            <h5>
                                                <strong>Review: </strong> ${note.star}/10
                                            </h5>
                                            <h5>
                                                <strong>Date</strong> ${note.date}
                                            </h5>
                                            <p>
                                                ${note.note}
                                            </p>
                                            <div class="travel-btns">
                                                <button class="update" value=${note._id}>Update</button>
                                                <button class="delete" value=${note._id}>Delete</button>
                                            </div>
                                        `
                                        travelDiv.appendChild(noteDiv);
                                    });

                                    div.appendChild(travelDiv);

                                    let clearallBtn = document.createElement('button');
                                    clearallBtn.innerText = "Remove All";
                                    clearallBtn.id = "clearall";
                                    div.appendChild(clearallBtn);

                                    body.appendChild(div);


                                    // removeall functionality 
                                    const removeallBtn = document.getElementById("clearall");

                                    removeallBtn.addEventListener("click",(e) => {
                                        e.preventDefault();

                                        // fetch to clear all notes with userid
                                        fetch(`http://localhost:3000/note/delete/deleteall`,{
                                            method: "DELETE",
                                            headers: {
                                                "Authorization" : "Bearer " + window.localStorage.getItem("token")
                                            }
                                        }).then((res2) => {
                                            return res2.json();
                                        }).then((clearallData) => {
                                            if (clearallData.success) {
                                                alert("Your all notes are cleared");
                                                window.location.reload();
                                            } else {
                                                alert("Some error occured while clearing all notes");
                                                window.location.reload();
                                            }
                                        })
                                    })
                                }

                                // delete note functionality
                                const deleteNotes = document.querySelectorAll(".delete");
                                
                                deleteNotes.forEach((deleteNote) => {
                                    deleteNote.addEventListener("click",(e) => {
                                        e.preventDefault();
                                        let id = e.target.value;

                                        console.log(id);

                                        // fetch to delete the note
                                        
                                        fetch(`http://localhost:3000/note/delete/${id}`,{
                                            method: "delete",
                                            headers: {
                                                "Authorization" : "Bearer " + window.localStorage.getItem("token")
                                            }
                                        })
                                        .then((res2) => {
                                            return res2.json();
                                        })
                                        .then((deleteData) => {
                                            if (deleteData.success) {
                                                console.log(deleteData);
                                                alert("Note is Deleted successfully.");
                                                window.location.reload();
                                            } else {
                                                alert("Some error occured while deleting note.");
                                            }
                                        })
                                    })
                                });

                                // update route to /home/update
                                const update = document.querySelectorAll('.update');
                                update.forEach((ele) => {
                                    ele.addEventListener("click",(e) => {
                                        e.preventDefault();
                                        window.localStorage.setItem("noteId",e.target.value);
                                        window.location = window.location.href.replace("/home","/home/update");
                                    })
                                })

                                // logoff functionality
                                const logoff = document.getElementById("logout");

                                logoff.addEventListener("click", (e) => {
                                    e.preventDefault();

                                    window.localStorage.clear();

                                    window.location.reload();
                                })

                            } else {
                                console.log(data);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }).catch((err) => {
                alert("You are not authorized");
                window.location = window.location.href.replace("/home", "/login");
            })
    } else {
        window.location = window.location.href.replace("/home", "/signup");
    }
};