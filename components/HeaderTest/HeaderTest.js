import Image from "next/image";
import styles from './HeaderTest.module.scss'
import CounterAndTimer from "./CounterAndTimer/CounterAndTimer";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const HeaderTest = ({title, icon, timeLimit, testLength}) => {

    const router = useRouter()
    const currentQuestion = router.query['num'][1]

    const [timeInSeconds, setTimeInSeconds] = useState(timeLimit)


    useEffect(() => {
        const timer = setInterval(() => {
            if(currentQuestion === 'final'){
                return () => clearInterval(timer)
            }
            if (timeInSeconds > 0) {
                setTimeInSeconds(timeInSeconds - 1);
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [timeInSeconds]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.item}>
                    {
                       parseInt(currentQuestion)  ?
                            <CounterAndTimer icon={'/timerIcon.svg'} text={`${currentQuestion}/${testLength}`}/>
                            :
                            <CounterAndTimer icon={'/timerIcon.svg'} text={`${testLength}/${testLength}`}/>
                    }

                    <CounterAndTimer icon={'/questionIcon.svg'} text={timeInSeconds}/>

                </div>
                <div className={styles.item}>
                    <div className={styles.containerForTitle}>
                        <div className={styles.header}>{title}</div>
                    </div>
                </div>

                <div className={styles.item}>
                    <Image src={icon} width={'64px'} height={'64px'} alt={'icon'}/>
                </div>
            </div>
        </>
    )
}

export default HeaderTest