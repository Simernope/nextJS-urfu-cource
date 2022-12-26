import styles from './QuestionArea.module.scss'
import RadioButton from "../buttons/RadioButton/RadioButton";
import Button from "../buttons/Button";
import {useState} from "react";
import Timer from "../Timer/Timer";
import {useRouter} from "next/router";
import StatisticFromLocalStorage from "../Statistic/StatisticFromLocalStorage";
import StatisticFromMongoDb from "../Statistic/StatisticFromMongoDb";


const QuestionArea = ({test, nextPath, path, testId, title}) => {

    const router = useRouter()

    const [answerClicked, setAnswerClicked] = useState(false)
    const [isQuestionTrue, setIsQuestionTrue] = useState(undefined)
    const [selected, setSelected] = useState(undefined)
    const [isTimerEnd, setIsTimerEnd] = useState(false)
    const [answerTitle, setAnswerTitle] = useState(undefined)
    const [questionTitle, setQuestionTitle] = useState(undefined)
    const [selectedAnswerId, setSelectedAnswerId] = useState(undefined)
    const [selectedQuizStatus, setSelectedQuizStatus] = useState(undefined)

    const [isShowStatistic, setIsShowStatistic] = useState(false)

    const [statisticFromMongoDb, setStatisticFromMongoDb] = useState(undefined)
    const[isShowStatisticFromMongoDb, setIsShowStatisticFromMongoDb] = useState(false)


    const [testStatistic, setTestStatistic] = useState(undefined)
    const handleTimerEnd = () => {
        setIsTimerEnd(true)
    }

    const toClickAnswer = (id, status, answerTitle, questionTitle) => {
        setIsQuestionTrue(status)
        setSelected(id)
        setAnswerClicked(true)
        setSelectedAnswerId(id)
        setSelectedQuizStatus(status)
        setAnswerTitle(answerTitle)
        setQuestionTitle(questionTitle)


    }


    const selectAnswer = async (questionId) => {
        const response = await fetch('http://localhost:3000/api/selectAnswer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                id: questionId,
                selectedAnswerId: selectedAnswerId,
                selectedQuestionTitle: answerTitle,
            })
        })
        const data = await response.json()
        console.log(data)
    }
    const writeAnswerToMongoDb = () => {
         const quizId = parseInt(router.query['num'][0] + router.query['num'][1])
         selectAnswer(quizId).then()
    }


    const writeAnswerToLocalStorage = () => {
        answerClicked ? console.log('answered', isQuestionTrue) : console.log('вы не выбрали ответ')
        setAnswerClicked(false)
        setIsQuestionTrue(undefined)
        setSelected(undefined)
        setIsTimerEnd(false)

        if (!localStorage.tests) {

            localStorage.tests = JSON.stringify([
                {
                    testId: testId,
                    title: title,
                    questions:
                        [{
                            id: selectedAnswerId,
                            status: selectedQuizStatus,
                            answerTitle: answerTitle,
                            questionTitle: questionTitle
                        }]
                }])
        } else {
            let tmpData = JSON.parse(localStorage.tests)
            let myTest = tmpData.find(el => el.testId === testId)
            if (myTest) {
                myTest.questions[myTest.questions.length] = {
                    id: selectedAnswerId,
                    status: selectedQuizStatus,
                    answerTitle: answerTitle,
                    questionTitle: questionTitle
                }
                tmpData[tmpData.length - 1] = myTest
                localStorage.tests = JSON.stringify(tmpData)
            } else {
                tmpData[tmpData.length] = {
                    testId: testId,
                    questions:
                        [{
                            id: selectedAnswerId,
                            status: selectedQuizStatus,
                            answerTitle: answerTitle,
                            questionTitle: questionTitle
                        }]
                }
                localStorage.tests = JSON.stringify(tmpData)
            }


        }
    }

    const redirectToNextPage = () => {
        if (path >= test.questions.length) {
            console.log('path >= test')
            router.push(`/tests/${testId}/final`).then()
        } else {
            console.log('path <= test')
            router.push(`/tests/${testId}/${nextPath}`).then()
        }
    }

    const toAnswerQuestion = () => {
         writeAnswerToLocalStorage()
         console.log('writeAnswerToLocalStorage')
         writeAnswerToMongoDb()
         redirectToNextPage()
         console.log('redirectToNextPage')
        setAnswerTitle(undefined)
        setSelectedAnswerId(undefined)
    }

    const toSkipQuestion = () => {
        setIsTimerEnd(false)
        answerClicked ? console.log('нельзя выбрать ответ') : console.log('skipped')
        toAnswerQuestion()
        if (path >= test.questions.length) {
            router.push(`/tests/${testId}/final`).then()
        } else {
            router.push(`/tests/${testId}/${nextPath}`).then()
        }
        localStorage.tests = JSON.stringify([{questions: [{id: selectedAnswerId, status: 'Ответ не выбран'}]}])
    }

    const showStatistic = () => {
        const testId = router.query.num[0]
        setIsShowStatistic(true)
        const tests = JSON.parse(localStorage.tests)
        setTestStatistic(tests.find(test => test.testId === parseInt(testId)))
        console.log(testStatistic)
    }

    const getStatisticFromMongoDb = async () => {
        setIsShowStatisticFromMongoDb(true)
        const response =await fetch(`http://localhost:3000/api/getResult/${testId}`)
        const data = await response.json()
        await setStatisticFromMongoDb(data)
        console.log(data)
    }

    const closeTestStatistic = () => {
        router.push(`/tests/`).then(() => localStorage.tests = '')
    }

    return (

        <>

            {
                !path ?
                    <div className={styles.container}>
                        <div className={styles.statistic}>
                            Вы решили тест!
                        </div>
                        {
                            isShowStatistic ?
                                <div className={styles.statisticButton} onClick={() => closeTestStatistic()}>
                                    <Button text={'Закрыть статистику и перейти к другим тестам'}/>
                                </div>
                                :
                                <div className={styles.statisticButton} onClick={() => showStatistic()}>
                                    <Button text={'Показать статистику и правильные ответы по тесту'}/>
                                </div>
                        }

                        {testStatistic && isShowStatistic &&
                            <StatisticFromLocalStorage testStatistic={testStatistic}/>
                        }



                        {
                            isShowStatisticFromMongoDb ?
                                <div className={styles.statisticButton} onClick={() => closeTestStatistic()}>
                                    <Button text={'Закрыть статистику MongoDb и перейти к другим тестам'}/>
                                </div>
                                :
                                <div className={styles.statisticButton} onClick={() => getStatisticFromMongoDb()}>
                                    <Button text={'Показать статистику из MongoDb и правильные ответы по тесту'}/>
                                </div>
                        }
                        {isShowStatisticFromMongoDb &&
                            <StatisticFromMongoDb testStatistic={statisticFromMongoDb}/>
                        }


                    </div>
                    :
                    <>
                        <Timer seconds={test.questions[path - 1].timeLimit}
                               quizId={test.questions[path - 1].id} isTimerEndFunction={handleTimerEnd}
                               testId={testId}/>

                        <div className={styles.container}>
                            <div className={styles.title}>
                                {test.questions[path - 1].questionTitle}
                            </div>
                            <div className={styles.answers}>

                                {test.questions[path - 1].answers.map(({answerTitle, status, id}) => (
                                        <div key={id}>
                                            {isTimerEnd ?

                                                <div className={styles.item} key={id}>

                                                    <RadioButton text={answerTitle} checked={id === selected}
                                                                 disabled={isTimerEnd}/>

                                                </div>

                                                :

                                                <div className={styles.item} key={id}
                                                     onClick={() => toClickAnswer(id, status, answerTitle, test.questions[path - 1].questionTitle)}>

                                                    <RadioButton text={answerTitle} checked={id === selected}
                                                                 disabled={isTimerEnd}/>

                                                </div>

                                            }
                                        </div>


                                    )
                                )}
                            </div>
                            {isTimerEnd && !answerClicked ?

                                <div className={styles.answerButtons}>
                                    <div className={styles.item} onClick={() => toSkipQuestion()}>
                                        <Button text={'Пропустить'} status={"OK"}/>
                                    </div>
                                    <div className={styles.item}>
                                        <Button text={'Ответить'} status={"disabled"}/>
                                    </div>
                                </div>

                                :


                                <div className={styles.answerButtons}>
                                    <div className={styles.item} onClick={() => toSkipQuestion()}>
                                        <Button text={'Пропустить'} status={answerClicked ? "disabled" : "OK"}/>
                                    </div>
                                    <div className={styles.item} onClick={() => toAnswerQuestion()}>
                                        <Button text={'Ответить'} status={answerClicked ? "OK" : "disabled"}/>
                                    </div>
                                </div>

                            }

                        </div>
                    </>

            }


        </>
    )
}

export default QuestionArea

