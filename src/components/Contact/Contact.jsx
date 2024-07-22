import React from "react";
import classes from "./Contact.module.css";

const Contact = () => {
  const handleContactClick = () => {
    window.open("https://bottleandwire.com/", "_blank");
  };

  return (
    <div className={classes.main}>
      <p className={classes.text}>Get this Review System for Your Business</p>
      <button onClick={handleContactClick} className={classes.contact_btn}>
        <span>Contact</span>
      </button>
    </div>
  );
};

export default Contact;
