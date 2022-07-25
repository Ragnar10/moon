// Styles
import Styles from './styles.module.scss';

const RewardCard = ({props}) => {
    return (
        <div className = {`${Styles.card_wrapper} ${props.isExpired ? Styles.expired_card : null}` }>
            <div className = { Styles.left_block }>
                <h4 className = { Styles.card_title }>{props.title}</h4>
                <p className = { Styles.description }>{props.description}</p>
                <div className = { Styles.reward_amount }>
                    <div className = { Styles.coin } />
                    <span>{props.rewardAmount}</span>
                </div>

                <div className = { Styles.timeline }>
                    <div className = { Styles.clock } />
                    {props.isExpired 
                        ?
                        <span>Expired</span>
                        :
                        <span>Till {props.time}</span>
                    }
                </div>
            </div>

            <div className = { Styles.right_block }>
                <div className = { Styles.gradient } />
                <div className = { Styles.chest } />
                <button className={ Styles.submit_btn } disabled={props.isExpired}>Submit</button>
            </div>
        </div>
    );
};

export default RewardCard;
