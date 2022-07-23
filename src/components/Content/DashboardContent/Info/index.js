import React from "react";
//Styles
import Styles from "./styles.module.scss";

const Info = () => {
  return (
    <section className={Styles.wrapper}>
      <div className={Styles.info}>
        <div className={Styles.cards_wrapper}>
          <div className={Styles.active_card}>
            <div className={`${Styles.background} ${Styles.affilate}`} />
            <span>4</span>
            <div className={Styles.card_description}>
              <div className={Styles.affilates_icon} />
              <span>Clients</span>
            </div>
          </div>

          <div className={Styles.inactive_card}>
            <div className={`${Styles.background} ${Styles.grow}`} />
            <span>N/A</span>

            <div className={Styles.card_description}>
              <span className={Styles.grow_icon} />
              <span>Total Farming Sessions</span>
            </div>
          </div>
        </div>

        <div className={Styles.trades}>
          <span>50%</span>

          <div className={Styles.card_description}>
            <span>Client Trades</span>
            <span>On Leveraged profits on client trades</span>
          </div>
        </div>
      </div>

      <div className={Styles.info}>
        <div className={Styles.cards_wrapper}>
          <div className={Styles.inactive_card}>
            <div className={`${Styles.background} ${Styles.live}`} />
            <span>0</span>
            <div className={Styles.card_description}>
              <div className={Styles.live_icon} />
              <span>Active Farming Sessions</span>
            </div>
          </div>

          <div className={Styles.inactive_card}>
            <div className={`${Styles.background} ${Styles.cross}`} />
            <span>0</span>
            <div className={Styles.card_description}>
              <div className={Styles.cross_icon} />
              <span>Closed Farming Sessions</span>
            </div>
          </div>
        </div>

        <div className={Styles.trades}>
          <span> 0 <span className={Styles.percentage_divider}>up to</span> 10%</span>
          <div className={Styles.card_description}>
            <span>Sub Affiliates</span>
            <span>OOn Sub Affiliate earnings</span>
          </div>
        </div>
      </div>

      <div></div>
    </section>
  );
};

export default Info;
