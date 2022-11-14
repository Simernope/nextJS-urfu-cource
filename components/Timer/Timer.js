import styles from './Timer.module.scss'
import {useState, useEffect} from "react";

const Timer = ({minutes = 0, seconds = 10, active = true, quizId}) => {
    const [timeInSeconds, setTimeInSeconds] = useState(minutes * 60 + seconds)
    const [isActive, setIsActive] = useState(active)

    useEffect(() => {
        console.log('Cработал useEffect')
        setTimeInSeconds(seconds)
        let interval = null;

        interval = setInterval(() => {
            if (isActive) {
                setTimeInSeconds(timeInSeconds => timeInSeconds - 1);
                console.log('Внутри интервала')
                if (timeInSeconds < 0) {
                    console.log('Время вышло!')
                    setIsActive(false)
                }
            } else {
                clearInterval(interval);
            }
        }, 1000);


        return () => clearInterval(interval);
    }, [active, seconds, quizId])
    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    {timeInSeconds}
                </div>
            </div>

        </>

    )
}

export default Timer