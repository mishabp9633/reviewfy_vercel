import React, { useContext } from "react";
import classes from "./PostGoogleCard.module.css";
import googleIcon from "../../assets/google-color-icon.svg";
import { UserContext } from "../../context/UseContext";

const PostGoogleCard = () => {
  const { companyDetails } = useContext(UserContext);

  const googleReviewUrl =
    companyDetails?.googleReviewUrl ||
    "https://g.page/r/CV6hjwVZ7UDsEAI/review";

  const handleGooglePost = () => {
    window.open(googleReviewUrl, "_blank");
  };
  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <h2 className={classes.main_text}>
          Choose your favourite review about us and share it on Google!
        </h2>
        <button onClick={handleGooglePost} className={classes.google_btn}>
          Post to Google
          <img src={googleIcon} alt="google icon" width={"20px"} />
        </button>
      </div>
    </div>
  );
};

export default PostGoogleCard;
