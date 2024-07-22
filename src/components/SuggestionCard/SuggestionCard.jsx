import React from "react";
import classes from "./SuggestionCard.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const SuggestionCard = ({ isLoading, text, onClick }) => {

  return (
    <div className={classes.main}>
      {isLoading ? (
        <>
          <div className={classes.text_skeleton} />
          <div className={classes.text_skeleton} style={{ width: "50%" }} />
        </>
      ) : (
        <p className={classes.text}>{text || ""}</p>
      )}
      {isLoading ? (
        <div className={`${classes.text_skeleton} ${classes.btn_skeleton}`} />
      ) : (
        <CopyToClipboard text={text} onCopy={onClick}>
          <button className={classes.copy_btn}>Copy</button>
        </CopyToClipboard>
      )}
    </div>
  );
};

export default SuggestionCard;
