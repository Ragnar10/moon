// Core
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Routing
import { useNavigate } from 'react-router-dom';
// Hooks
import { useToggle } from '../../../../hooks';
// Utils
import { deleteCookie, getCookie } from '../../../../utils';
// Actions
import { authActions } from '../../../../actions/authActions';
import { setAffiliateData } from '../../../../reducers/authSlice';
// Styles
import Styles from './styles.module.scss';
// Images
// import bnb from '../../../../theme/assets/icons/bnb.svg';
// import night from '../../../../theme/assets/icons/night.svg';
import blockchain from '../../../../theme/assets/icons/blockchain.svg';

const DashboardHeader = () => {
    const dispatch = useDispatch();
    const affiliateData = useSelector((state) => state.auth.affiliateData);
    const navigate = useNavigate();
    const [toggle, setToggle] = useToggle();

    useEffect(() => {
        const refresh = getCookie('refresh');

        if (refresh) {
            const data = {
                refresh,
            };
            dispatch(authActions.refreshLogin(data));
        }
    }, []);

    useEffect(() => {
        if (affiliateData.ref) {
            const data = {
                ref:   affiliateData.ref,
                token: affiliateData.access,
            };
            dispatch(authActions.getAffiliateUsers(data));
        }
    }, []);

    const onLogout = () => {
        dispatch(setAffiliateData({}));
        deleteCookie('refresh');
        navigate('/');
    };

    const arrowClass = !toggle ? Styles.settings_btn_arrow : Styles.settings_btn_arrow_open;
    const dropdownList = !toggle ? Styles.user_menu_list : Styles.user_menu_list_open;

    return (
        <div className = { Styles.dashboard_header }>
            { /* <div className = { Styles.header_crypto_btn }> */ }
            { /*     <img */ }
            { /*         src = { bnb } className = { Styles.crypto_btn_img } */ }
            { /*         alt = 'icon image' /> */ }
            { /*     <span className = { Styles.crypto_btn_name }>{ 'BNB' }</span> */ }
            { /*     <span className = { Styles.crypto_btn_arrow } /> */ }
            { /* </div> */ }
            { /* <div className = { Styles.header_localization_btn }> */ }
            { /*     <span className = { Styles.localization_btn_name }>{ 'EN' }</span> */ }
            { /*     <span className = { Styles.localization_btn_arrow } /> */ }
            { /* </div> */ }
            { /* <div className = { Styles.header_theme_btn }> */ }
            { /*     <img */ }
            { /*         src = { night } className = { Styles.theme_btn_img } */ }
            { /*         alt = 'icon image' /> */ }
            { /* </div> */ }
            <div className = { Styles.header_user_menu }>
                <div
                    onClick = { () => setToggle(!toggle) }
                    className = { Styles.user_menu_settings_btn }>
                    <img
                        src = { blockchain } className = { Styles.settings_btn_img }
                        alt = 'icon image' />
                    <span className = { Styles.settings_btn_name }>{ affiliateData.first_name || 'Name' }</span>
                    <span className = { arrowClass } />
                </div>
                <ul className = { dropdownList }>
                    <li className = { Styles.list_item }>
                        <span>{ affiliateData.first_name || 'Name' }</span>
                    </li>
                    <li
                        onClick = { () => onLogout() }
                        className = { Styles.list_item }>
                        <span>{ 'Log out' }</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardHeader;
