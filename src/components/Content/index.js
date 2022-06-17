// Hooks
import { useToggle } from '../../hooks';
// Styles
import Styles from './styles.module.scss';
// Components
import PopupSignup from '../PopupSignup';

const Content = (props) => {
    const [toggle, setToggle] = useToggle();

    return (
        <>
            { toggle && <PopupSignup onSetToggle = { setToggle } /> }
            <section className = { Styles.content }>
                {
                    props.login
                        ? <h1 className = { Styles.content_title }>
                            <span>{ 'Leveraged' }</span>
                            <span>{ 'x' }</span>
                            <span>{ 'Moon Carl' }</span>
                        </h1>
                        : <h2 className = { Styles.content_connected_title }>{ 'We ‘re preparing to launch' }</h2>
                }
                <p className = { Styles.content_info }>
                    <span>{ 'Welcome to Referral Page of The Moon Carl.' }</span>
                    <span>{ 'To receive a special Bonus at LVRGD Launch please connect your Meta mask!' }</span>
                </p>
                {
                    props.login
                        ? <a
                            href = { 'https://bit.ly/LVRGD_public' }
                            target = '_blank'
                            rel = 'noreferrer'
                            className = { Styles.content_connected_btn }>{ 'Investor Deck' }</a>
                        : <button
                            onClick = { () => setToggle(true) }
                            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</button>
                }
            </section>
        </>
    );
};

export default Content;
