import styles from './QuestionArea.module.scss'
import RadioButton from "../buttons/RadioButton/RadioButton";
import Button from "../buttons/Button";
import {useState} from "react";
import Timer from "../Timer/Timer";
import {useRouter} from "next/router";


const QuestionArea = ({test, nextPath, path, testId}) => {

    const router = useRouter()

    /*const questionTitle = test.questions[1].questionTitle
    const answers = test.questions[0].answers
    const timeLimit = test.questions[0].timeLimit*/


    const [answerClicked, setAnswerClicked] = useState(false)
    const [isQuestionTrue, setIsQuestionTrue] = useState(undefined)
    const [selected, setSelected] = useState(undefined)
    const [isTimerActive, setIsTimerActive] = useState(true)
    const [isTimerEnd, setIsTimerEnd] = useState(false)

    const [selectedAnswerId, setSelectedAnswerId] = useState(undefined)
    const [selectedQuizStatus, setSelectedQuizStatus] = useState(undefined)

    const handleTimerEnd = () => {
        setIsTimerEnd(true)
    }

    const toClickAnswer = (id, status) => {
        setIsQuestionTrue(status)
        setSelected(id)
        setAnswerClicked(true)
        setSelectedAnswerId(id)
        setSelectedQuizStatus(status)


    }

    const toAnswerQuestion = () => {
        console.log(isTimerActive)
        answerClicked ? console.log('answered', isQuestionTrue) : console.log('вы не выбрали ответ')
        setAnswerClicked(false)
        setIsQuestionTrue(undefined)
        setSelected(undefined)
        setIsTimerActive(false)
        setIsTimerEnd(false)
        if (path >= test.questions.length) {
            router.push(`/tests/${testId}/final`).then()
        } else {
            router.push(`/tests/${testId}/${nextPath}`).then()
        }


        if (!localStorage.tests) {
            localStorage.tests = JSON.stringify([
                {
                    testId: testId,
                    questions:
                        [{
                            id: selectedAnswerId,
                            status: selectedQuizStatus
                        }]
                }])
        } else {
            let tmpData = JSON.parse(localStorage.tests)
            console.log('tmpData', tmpData)
            console.log('tmpData11', tmpData.find((el) => el.testId === testId))
            let myTest = tmpData.find(el => el.testId === testId)
            if(myTest){
                console.log('myTest', myTest)
                myTest.questions[myTest.questions.length ] = {
                    id: selectedAnswerId,
                    status: selectedQuizStatus
                }
                tmpData[tmpData.length - 1] = myTest
                localStorage.tests = JSON.stringify(tmpData)
            }else{
                tmpData[tmpData.length] = {
                    testId: testId,
                    questions:
                        [{
                            id: selectedAnswerId,
                            status: selectedQuizStatus
                        }]
                }
                localStorage.tests =JSON.stringify(tmpData)
            }


        }

    }

    const toSkipQuestion = () => {
        setIsTimerActive(false)
        setIsTimerEnd(false)
        answerClicked ? console.log('нельзя выбрать ответ') : console.log('skipped')
        if (path >= test.questions.length) {
            router.push(`/tests/${testId}/final`).then()
        } else {
            router.push(`/tests/${testId}/${nextPath}`).then()
        }
        localStorage.tests = JSON.stringify([{questions: [{id: selectedAnswerId, status: 'Ответ не выбран'}]}])
    }

    return (

        <>

            {
                !path ?
                    <div className={styles.container}>
                        Вы решили тест!
                    </div>
                    :
                    path > test.questions.length ?
                        <div className={styles.container}>
                            Вы решили тест!
                        </div>
                        :
                        <>
                            <Timer seconds={test.questions[path - 1].timeLimit} active={isTimerActive}
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
                                                         onClick={() => toClickAnswer(id, status)}>

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


/*

import styles from './QuestionArea.module.scss'
import RadioButton from "../buttons/RadioButton/RadioButton";
import Button from "../buttons/Button";
import {useState} from "react";
import Timer from "../Timer/Timer";


*/


/*
const QuestionArea = ({question}) => {
    console.log(question['questions'].length)
    const myQuestion = question['questions'][1]
    console.log(myQuestion)
    const{questionTitle, timelimit, answers} = myQuestion
    const[answerClicked, setAnswerClicked] = useState(false)
    const toClickAnswer = (id) => {
        console.log(id)
        answerClicked ? setAnswerClicked(false) : setAnswerClicked(true)
    }
    const toAnswerQuestion = () => {
        answerClicked ? console.log('answered'): console.log('нельзя выбрать ответ')
    }
    const toSkipQuestion = () => {
        answerClicked ? console.log('нельзя выбрать ответ'): console.log('skipped')
    }
    return (
        <>
            <Timer/>

            <div className={styles.container}>
                <div className={styles.title}>
                    {questionTitle}
                </div>
                <div className={styles.answers} >

                    {answers.map(({answerTitle, status, id}) => (
                            <div className={styles.item} key={id} onClick={() => toClickAnswer(id)}>
                                <RadioButton text={answerTitle} />
                            </div>
                        )
                    )}
                </div>

                <div className={styles.answerButtons}>
                    <div className={styles.item} onClick={() => toSkipQuestion()}>
                        <Button text={'Пропустить'} status={answerClicked? "disabled" : "OK"}/>
                    </div>
                    <div className={styles.item} onClick={() => toAnswerQuestion()}>
                        <Button text={'Ответить'} status={answerClicked? "OK" : "disabled"} redirect={'tests'}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionArea*/
