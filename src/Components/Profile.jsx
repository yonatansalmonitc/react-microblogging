// import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useAuth, upload, db, userRef} from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

const Profile = (props) => {
  const [profileName, setProfileName] = useState();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth()
  const [photoURL, setPhotoURL] = useState(null)
    const onNameChange = (event) => {
    setProfileName(event.target.value);
  };

function handleChange(event) {
  if (event.target.files[0]) {
     setPhoto(event.target.value)
  }
}
function handleClick() {
  upload(photo, currentUser, setLoading)
  const userRef = doc(userRef, "users", currentUser.uid);
  setDoc(userRef, { displayName: "displayName", userId: currentUser.uid, image: photoURL });
}
useEffect(() => {
  if (currentUser) {
  setPhotoURL(currentUser.photoURL)
  console.log(currentUser.photoURL)
  }
}, [currentUser])

 return (
    <Container>
      <div className="pageContainer d-flex flex-column align-items-center">
        <div className="container d-flex flex-column">
          <div className="testme">
            <h1 className="d-6 text-white font-weight-normal">Profile</h1>
            <h6 className="text-white font-weight-light">User Name</h6>
          </div>
          <form>
            <div className="inputData">
              <input
                onChange={onNameChange}
                placeholder="Insert Name"
                value={profileName}
                type="text"
                className="inputControl"
              ></input>
            </div>
            <div className="inputData">
                <div className="d-flex">
                  <input type="file" onChange={handleChange} className="text-white"></input>   
                  <button disabled={loading || !photo } className="btn btn-primary mx-5" onClick={handleClick}>Upload</button>
                  <img src={"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt="avatar" className="avatar text-white" />
                </div>
              </div>
            <div className="d-flex flex-row-reverse">
              <button
                className="btn btn-primary my-3"
                onClick={() =>
                  localStorage.setItem(
                    "new-Username",
                    JSON.stringify(profileName),
                    setProfileName("")
                  )
                }
              >
                Save
              </button>
            </div>
             
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
