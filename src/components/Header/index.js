// Hooks
import { useToggle } from '../../hooks';
// Styles
import Styles from './styles.module.scss';
// Images
import logo from '../../theme/assets/images/logo.svg';
// Components
import PopupLogin from '../PopupLogin';

const Header = (props) => {
    const [toggle, setToggle] = useToggle();

    return (
        <>
            { toggle && <PopupLogin onSetToggle = { setToggle } /> }
            <header className = { Styles.header }>
                <div className = { Styles.header_logo }>
                    <img src = { logo } alt = 'logo' />
                </div>
                {
                    props.login && <button
                        onClick = { () => setToggle(true) }
                        className = { Styles.header_btn_login }>{ 'Login' }</button>
                }
            </header>
        </>
    );
};

export default Header;
