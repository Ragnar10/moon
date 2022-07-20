// Core
import { useEffect, useRef } from 'react';

const TelegramLoginBtn = (props) => {
    const btn = useRef(null);

    useEffect(() => {
        const {
            botName,
            requestAccess,
            dataOnauth,
        } = props;

        window.TelegramLoginWidget = {
            dataOnauth: (user) => dataOnauth(user),
        };

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?9';
        script.setAttribute('data-telegram-login', botName);
        script.setAttribute('data-request-access', requestAccess);
        script.setAttribute(
            'data-onauth',
            'TelegramLoginWidget.dataOnauth(user)',
        );
        script.async = true;
        btn.current.appendChild(script);
    }, []);

    return (
        <div ref = { btn } className = { props.class }>
            { props.children }
        </div>
    );
};

export default TelegramLoginBtn;

