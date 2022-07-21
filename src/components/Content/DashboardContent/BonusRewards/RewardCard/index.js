import { Button } from "@mui/material";
import React from "react";
//Styles
import Styles from "./styles.module.scss";

const RewardCard = () => {
  return (
    <section className={Styles.card_wrapper}>
      <div className={Styles.left_block}>
        <h4 className={Styles.card_title}>Like instagram post</h4>
        <p className={Styles.description}>
          Like our post on instagram to enter this giveaway and have a chance to
          win awesome prizes
        </p>
        <div className={Styles.reward_amount}>
          <div className={Styles.coin} />
          <span>100.00</span>
        </div>

        <div className={Styles.timeline}>
          <div className={Styles.clock} />
          <span>Till 24 June 20:00</span>
        </div>
      </div>

      <div className={Styles.right_block}>
        <div className={Styles.gradient} />
        <div className={Styles.chest} />
        <Button variant="contained">Submit</Button>
      </div>
    </section>
  );
};

export default RewardCard;
