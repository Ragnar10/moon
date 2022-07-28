// Styles
import Styles from './styles.module.scss';


const Earnings = () => {
    return (
        <section className = { Styles.wrapper }>
            <div className = { Styles.flex_sb }>
                <div className = { Styles.title }>
                    <p>Withdrawable earnings</p>
                    <p>Funds ready for withdraw</p>
                </div>

                <button className = { Styles.refresh_btn }>
                    <span />
                </button>
            </div>

            <div className = { Styles.bit_coin }>
                <span />
                <p>5.0000025</p>
                <p>BTC</p>
            </div>

            <div className = { Styles.flex_sb }>
                <div>
                    <div className = { Styles.coin }>
                        <span className = { `${Styles.icon} ${Styles.eth_icon}` } />
                        <p>0.0000</p>
                        <p>ETH</p>
                    </div>

                    <div className = { Styles.coin }>
                        <span className = { `${Styles.icon} ${Styles.trx_icon}` } />
                        <p>0.0000</p>
                        <p>TRX</p>
                    </div>

                    <div className = { Styles.coin }>
                        <span className = { `${Styles.icon} ${Styles.bnb_icon}` } />
                        <p>0.0000</p>
                        <p>BNB</p>
                    </div>

                    <div className = { Styles.coin }>
                        <span className = { `${Styles.icon} ${Styles.cake_icon}` } />
                        <p>0.0000</p>
                        <p>CAKE</p>
                    </div>
                </div>

                <div>
                    <div className = { Styles.coin }>
                        <span className = { `${Styles.icon} ${Styles.busd_icon}` } />
                        <p>0.0000</p>
                        <p>BUSD</p>
                    </div>

                    <div className = { Styles.coin }>
                        <span className = { `${Styles.icon} ${Styles.usdt_icon}` } />
                        <p>0.0000</p>
                        <p>USDT</p>
                    </div>

                    <div className = { Styles.coin }>
                        <span className = { `${Styles.icon} ${Styles.bnb_icon}` } />
                        <p>0.0000</p>
                        <p>BNB</p>
                    </div>

                    <div className = { Styles.coin }>
                        <span className = { `${Styles.icon} ${Styles.cake_icon}` } />
                        <p>0.0000</p>
                        <p>CAKE</p>
                    </div>
                </div>
            </div>

            <button className = { Styles.withdraw_btn }>Withdraw</button>
        </section>
    );
};

export default Earnings;
