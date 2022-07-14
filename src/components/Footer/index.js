// Styles
import Styles from './styles.module.scss';
// Images
import logo from '../../theme/assets/images/logo_white.svg';
// Components
import Socials from '../Socials';


const Footer = () => {
    return (
        <footer className = { Styles.footer }>
            <div className = { Styles.wrapper }>
                <div className = { Styles.footer_logo_rights }>
                    <div className = { Styles.footer_logo }>
                        <img src = { logo } alt = 'logo' />
                    </div>
                    <div className = { Styles.footer_rights }>{ '©2022-2023. All rights reserved' }</div>
                </div>
                <Socials class = { Styles.footer_socials } />
                { /* <div className = { Styles.footer_counter_buy }> */ }
                { /*     <span className = { Styles.footer_counter_icon } /> */ }
                { /*     <span className = { Styles.footer_counter }>{ '98.22M' }</span> */ }
                { /*     <button className = { Styles.footer_buy_btn }>{ 'Buy' }</button> */ }
                { /* </div> */ }
            </div>
        </footer>
    );
};

export default Footer;
