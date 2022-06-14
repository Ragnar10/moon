// Styles
import Styles from './styles.module.scss';
// Images
import logo from '../../theme/assets/images/logo.svg';
// Components

const Header = () => {
    return (
        <header className = { Styles.header }>
            <div className = { Styles.header_logo }>
                <img src = { logo } alt = 'logo' />
            </div>
            <button className = { Styles.header_btn_login }>{ 'Login' }</button>
        </header>
    );
};

export default Header;
