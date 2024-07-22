import React, { useContext } from "react";
import classes from "./CopiedDialog.module.css";
import copyFrame from "../../assets/copy-frame.svg";
import googleIcon from "../../assets/google-icon.svg";
import { UserContext } from "../../context/UseContext";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const CopiedDialog = ({ open, closeDialog, params }) => {
  const { companyDetails, suggestionId } = useContext(UserContext);

  const handleGooglePost = async () => {
    const googleReviewURL =
      companyDetails?.googleReviewUrl ||
      "https://g.page/r/CV6hjwVZ7UDsEAI/review";

    try {
      await axios.post(
        `${baseUrl}/review/user/click/${suggestionId}`,
        {},
        {
          headers: {
            ApiKey: params.id
              ? params.id
              : "6eb06707-06ea-4315-993b-5dab4b65f080",
          },
        }
      );
    } catch (err) {
      console.error("Failed to post review: ", err);
    } finally {
      window.open(googleReviewURL, "_blank");
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <div className={classes.divider} />
        <img src={copyFrame} alt="" className={classes.copy_frame} />
        <h5 className={classes.title}>Copied!</h5>
        <p className={classes.desc}>Tap 'Post on Google' and paste the text.</p>
        <div className={classes.btn_wrapper}>
          <button onClick={handleGooglePost} className={classes.google_btn}>
            <img src={googleIcon} alt="" /> Post on Google
          </button>
        </div>
        <div onClick={closeDialog} className={classes.choose_another}>
          Choose another review
        </div>
      </div>
      <div onClick={closeDialog} className={classes.dialog_closer} />
    </div>
  );
};

export default CopiedDialog;
