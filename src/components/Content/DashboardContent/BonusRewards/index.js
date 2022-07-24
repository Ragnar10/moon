// Styles
import Styles from './styles.module.scss';

// Components
import RewardCard from './RewardCard';

const cards = [
    {
        id:          1,
        title:       'Like instagram post',
        description:
      'Like our post on instagram to enter this giveaway and have a chance to win awesome prizes',
        rewardAmount: '100.00',
        time:         '24 June 20:00',
        isExpired:    false,
    },
    {
        id:          2,
        title:       'Like instagram post 1',
        description:
      'Like our post on instagram to enter this giveaway and have a chance to win awesome prizes',
        rewardAmount: '100.00',
        time:         '24 June 20:00',
        isExpired:    true,
    },
    {
        id:          3,
        title:       'Like instagram post',
        description:
      'Like our post on instagram to enter this giveaway and have a chance to win awesome prizes',
        rewardAmount: '100.00',
        time:         '25 June 20:00',
        isExpired:    false,
    },
    {
        id:          4,
        title:       'Like instagram post',
        description:
      'Like our post on instagram to enter this giveaway and have a chance to win awesome prizes',
        rewardAmount: '100.00',
        time:         '24 June 20:00',
        isExpired:    true,
    },
];

const BonusRewards = () => {
    const activeCards = cards.filter((card) => card.isExpired === false);
    const expiredCards = cards.filter((card) => card.isExpired === true);

    return (
        <section className = { Styles.bonus_container }>
            <h3 className = { Styles.title }>KOL Bonus Rewards</h3>
            <div className = { Styles.cards_grid }>
                { activeCards.map((card) => {
                    return <RewardCard key = { card.id } props = { card } />;
                }) }
            </div>

            <h3 className = { Styles.title }>Expired</h3>

            <div className = { Styles.cards_grid }>
                { expiredCards.map((card) => {
                    return <RewardCard key = { card.id } props = { card } />;
                }) }
            </div>
        </section>
    );
};

export default BonusRewards;
