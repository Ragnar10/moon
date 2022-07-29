// Styles
import Styles from './styles.module.scss';

const Socials = (props) => {
    return (
        <ul className = { `${Styles.socials} ${props.class}` }>

            <li>
                <a
                    href = { 'https://t.me/lvrgd' } target = { '_blank' }
                    rel = 'noreferrer'
                    className = { Styles.socials_telegram } />
            </li>
            <li>
                <a
                    href = { 'https://twitter.com/LeveragedIO' } target = { '_blank' }
                    rel = 'noreferrer'
                    className = { Styles.socials_twitter } />
            </li>
            <li>
                <a
                    href = { 'https://medium.com/@leveragedIO' } target = { '_blank' }
                    rel = 'noreferrer'
                    className = { Styles.socials_medium } />
            </li>
            <li>
                <a
                    href = { '' } target = { '_blank' }
                    rel = 'noreferrer'
                    className = { Styles.socials_discord } />
            </li>
            <li>
                <a
                    href = { '' } target = { '_blank' }
                    rel = 'noreferrer'
                    className = { Styles.socials_reddit } />
            </li>

        </ul>
    );
};

export default Socials;
