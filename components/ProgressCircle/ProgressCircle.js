import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import styles from './ProgressCircle.module.scss'
import 'react-circular-progressbar/dist/styles.css';
import {useState} from "react";




const ProgressCircle = ({testStatistic}) => {

    const [maxValue, setMaxValue] = useState(testStatistic.questions.length)
    const [trueValue, setTrueValue] = useState(testStatistic.questions.map((question) => question.trueAnswerId === question.selectedAnswerId).reduce((n, x) => n + (x === true), 0))
    return(
        <>
            <div className={styles.container}>
                {testStatistic?
                    <div className={styles.statValues}>
                        <div className={styles.circle}>
                            <CircularProgressbar value={trueValue} maxValue={maxValue} text={`${(trueValue/maxValue*100).toFixed(1)}%`}  styles={buildStyles({pathColor: '#3AB8BC'})}/>
                        </div>
                        <div className={styles.numbers}>
                            <div className={styles.numbersChild}>
                                Правильных ответов - {
                                trueValue
                            }
                            </div>
                            <div className={styles.numbersChild}>
                                Неправильных ответов - {
                                maxValue - trueValue - testStatistic.questions.map((question) => question.selectedAnswerId === null).reduce((n, x) => n + (x === true), 0)

                            }
                            </div>
                            <div className={styles.numbersChild}>
                               Пропущено заданий - {
                                testStatistic.questions.map((question) => question.selectedAnswerId === null).reduce((n, x) => n + (x === true), 0)
                            }
                            </div>
                        </div>
                    </div>

                    :
                    <>Данные не пришли</>
                }
            </div>
        </>

    )
}


export default ProgressCircle