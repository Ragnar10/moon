// Core
import { useSelector } from 'react-redux';
// Styles
import Styles from './styles.module.scss';

const Info = () => {
    const affiliateCountUsers = useSelector((state) => state.auth.affiliateCountUsers);

    return (
        <section className = { Styles.wrapper }>
            <div className = { Styles.info }>
                <div className = { Styles.cards_wrapper }>
                    <div className = { Styles.active_card }>
                        <div className = { `${Styles.background} ${Styles.affiliate}` } />
                        <span>{ affiliateCountUsers }</span>
                        <div className = { Styles.card_description }>
                            <div className = { Styles.affiliates_icon } />
                            <span>Clients</span>
                        </div>
                    </div>

                    <div className = { Styles.inactive_card }>
                        <div className = { `${Styles.background} ${Styles.grow}` } />
                        <span>N/A</span>

                        <div className = { Styles.card_description }>
                            <span className = { Styles.grow_icon } />
                            <span>Total Farming Sessions</span>
                        </div>
                    </div>
                </div>

                <div className = { Styles.trades }>
                    <span>N/A</span>

                    <div className = { Styles.card_description }>
                        <span>Client Trades</span>
                        <span>On Leveraged profits on client trades</span>
                    </div>
                </div>
            </div>

            <div className = { Styles.info }>
                <div className = { Styles.cards_wrapper }>
                    <div className = { Styles.inactive_card }>
                        <div className = { `${Styles.background} ${Styles.live}` } />
                        <span>0</span>
                        <div className = { Styles.card_description }>
                            <div className = { Styles.live_icon } />
                            <span>Active Farming Sessions</span>
                        </div>
                    </div>

                    <div className = { Styles.inactive_card }>
                        <div className = { `${Styles.background} ${Styles.cross}` } />
                        <span>0</span>
                        <div className = { Styles.card_description }>
                            <div className = { Styles.cross_icon } />
                            <span>Closed Farming Sessions</span>
                        </div>
                    </div>
                </div>

                <div className = { Styles.trades }>
                    <span> <span className = { Styles.percentage_divider }></span> N/A</span>
                    <div className = { Styles.card_description }>
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
