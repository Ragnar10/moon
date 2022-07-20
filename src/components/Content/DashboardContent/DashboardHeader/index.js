// Core
import { useSelector } from 'react-redux';
// Styles
import Styles from './styles.module.scss';
// Images
import bnb from '../../../../theme/assets/icons/bnb.svg';
import night from '../../../../theme/assets/icons/night.svg';
import blockchain from '../../../../theme/assets/icons/blockchain.svg';

const DashboardHeader = () => {
    return (
        <div className = { Styles.dashboard_header }>
            <div className = { Styles.header_crypto_btn }>
                <img
                    src = { bnb } className = { Styles.crypto_btn_img }
                    alt = 'icon image' />
                <span className = { Styles.crypto_btn_name }>{ 'BNB' }</span>
                <span className = { Styles.crypto_btn_arrow } />
            </div>
            <div className = { Styles.header_localization_btn }>
                <span className = { Styles.localization_btn_name }>{ 'EN' }</span>
                <span className = { Styles.localization_btn_arrow } />
            </div>
            <div className = { Styles.header_theme_btn }>
                <img
                    src = { night } className = { Styles.theme_btn_img }
                    alt = 'icon image' />
            </div>
            <div className = { Styles.header_settings_btn }>
                <img
                    src = { blockchain } className = { Styles.settings_btn_img }
                    alt = 'icon image' />
                <span className = { Styles.settings_btn_name }>{ '1234567890' }</span>
                <span className = { Styles.settings_btn_arrow } />
            </div>
        </div>
    );
};

export default DashboardHeader;
