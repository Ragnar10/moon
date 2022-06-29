// Styles
import Styles from './styles.module.scss';

const PresentationContent = () => {
    return (
        <section className = { Styles.content }>
            <h1 className = { Styles.content_connected_title }>{ 'We ‘re preparing to launch' }</h1>
            <p className = { Styles.content_info }>
                <span>{ 'Welcome to Referral Page of The Moon Carl.' }</span>
                <span>{ 'To receive a special Bonus at LVRGD Launch please connect your Meta mask!' }</span>
            </p>
            <a
                href = { 'https://bit.ly/LVRGD_public' }
                target = '_blank'
                rel = 'noreferrer'
                className = { Styles.content_connected_btn }>{ 'Investor Deck' }</a>
        </section>
    );
};

export default PresentationContent;
