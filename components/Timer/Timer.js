import styles from './Timer.module.scss'
import {useState} from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'




const Timer = ({seconds = 10, quizId, isTimerEndFunction}) => {
    const [timeInSeconds, setTimeInSeconds] = useState(seconds)




    /*useEffect( () => {

        setTimeInSeconds(seconds)
        console.log('timeInSeconds,', timeInSeconds)


    }, [quizId])*/

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    {timeInSeconds &&
                        <CountdownCircleTimer
                            key={quizId}
                            isPlaying={true}
                            duration={timeInSeconds}
                            colors={['#00EAD9']}
                            strokeWidth={2}
                            trailStrokeWidth={0}
                            size={120}
                            onComplete={() => isTimerEndFunction()}
                            onUpdate={()=>setTimeInSeconds(seconds)}
                        >
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                    }

                </div>
            </div>


        </>

    )
}




export default Timer