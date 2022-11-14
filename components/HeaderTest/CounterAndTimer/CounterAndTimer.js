import Image from "next/image";
import styles from './CounterAndTimer.module.scss'
const  CounterAndTimer = ({icon, text}) => {
    return(
        <>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <Image src={icon} width={'48px'} height={'48px'} alt={'icon'}/>
                </div>
                <div className={styles.text}>
                    {text}
                </div>
            </div>
        </>
    )
}

export default CounterAndTimer