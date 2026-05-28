import { Check, EllipsisVertical } from 'lucide-react'
import styles from './cards.module.css'

// const Cards = () => {
//     return (
//         // <div className={styles.cards}>
//             <Card />
//         // </div>
//     )
// }

// export default Cards


const Card = ({ id, duration, title, views, setCurrent }: {
    id: string, duration: string, title: string, views: string, setCurrent: React.Dispatch<React.SetStateAction<{
        id: string;
        title: string;
    }>>
}) => {
    const imgUrl = `http://223.178.107.50:8000/api/image/${id}`
    return (
        <div className={styles.card} onClick={() => setCurrent({ id, title })}>
            <div className={styles.thumbnailWrapper}>
                <img src={imgUrl} />
                <span className={styles.duration}>{duration}</span>
            </div>
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <span className={styles.title}>{title}</span>
                    <div className={styles.channelNameWrapper}>
                        <span className={styles.channelName}>Code with Pratham</span>
                        <span className={styles.verifiedIcon}><Check strokeWidth={'2.4px'} /> </span>
                    </div>
                    <div className={styles.extraInfo}>
                        <span>{views} views</span>
                    </div>
                </div>
                <button className={styles.optionsButton}>
                    <EllipsisVertical />
                </button>
            </div>

        </div>
    )
}

export default Card
