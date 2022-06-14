// Hooks
import { useToggle } from '../../hooks';
// Styles
import Styles from './styles.module.scss';
// Images
import logo from '../../theme/assets/images/logo.svg';
// Components
import PopupLogin from '../PopupLogin';

const Header = () => {
    const [toggle, setToggle] = useToggle();

    return (
        <header className = { Styles.header }>
            <div className = { Styles.header_logo }>
                <img src = { logo } alt = 'logo' />
            </div>
            <button
                onClick = { () => setToggle(true) }
                className = { Styles.header_btn_login }>{ 'Login' }</button>
            { toggle && <PopupLogin onSetToggle = { setToggle } /> }
        </header>
    );
};

export default Header;
