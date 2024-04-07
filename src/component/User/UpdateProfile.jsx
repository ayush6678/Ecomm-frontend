import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CricketBallLoader from "../Layouts/loader/Loader";
import {
  clearErrors,
  updateProfile,
  load_UserProfile,
} from "../../actions/userAction";
import { toast } from 'react-toastify';
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../Layouts/MetaData/MetaData";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import "./LoginFormStyle.css";
import { Link } from "react-router-dom";

function UpdateProfile() {

  // const history = useHistory();
  const navigate = useNavigate();
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profileData
  );
  const { user } = useSelector((state) => state.userData);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidEName] = useState(true);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };


  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsValidEName(event.target.value.length >= 4);
  };

  const UpdateProfileSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);

    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    // let say if user not update name and change other data then we setting all data from prv user data initaily for name , email, avatar

    if (user) {
      // console.log(user, "user");
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // isUpadted is nothing But success message from response. once user updated then pop the message and show profile data
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      // now get user New data from backend
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });

      // now reset all value . eg : isUpdate : false and all
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });

      navigate("/account");

      dispatch(load_UserProfile());
    }
  }, [dispatch, error,
    // alert,
    navigate, user, isUpdated]);

  const isSignInDisabled = !(email && isValidEmail && name && isValidName);

  return (
    <>
      <MetaData title="Update Profile" />
      {loading ? (
        <CricketBallLoader />
      ) : (
    <div className={"formContainer"}>
      <form className={"form"}>
        <Avatar className={"avatar"}>
          <UpdateIcon />
        </Avatar>
        <Typography variant="h5" component="h1" className={"heading"}>
          Update Profile Deatils
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          className="nameInput textField"
          value={name}
          error={!isValidName && name !== ""}
          helperText={
            !isValidName && name !== ""
              ? "Name must be at least 4 characters long."
              : ""
          }
          onChange={handleNameChange}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          className={`${"emailInput"} ${"textField"}`}
          value={email}
          onChange={handleEmailChange}
          error={!isValidEmail && email !== ""}
          helperText={
            !isValidEmail && email !== ""
              ? "Please enter a valid email address."
              : ""
          }
        />


        <Button
          variant="contained"
          className={"loginButton"}
          fullWidth
          disabled={isSignInDisabled}
          style={{ marginTop: "3rem" }}
          onClick={UpdateProfileSubmitHandler}
        >
          Update Profile
        </Button>
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: ".5rem" }}
        >
          <Link to="/account" className={"createAccount"}>
            Cancel
          </Link>
        </Typography>
      </form>
    </div>
    )}
    </>
  );
}

export default UpdateProfile;
