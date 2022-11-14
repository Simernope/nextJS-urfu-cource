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
    const [isTimerActive , setIsTimerActive] = useState(true)


    const toClickAnswer = (id, status) => {
        setIsQuestionTrue(status)
        setSelected(id)
        setAnswerClicked(true)


    }

    const toAnswerQuestion = () => {
        console.log(isTimerActive)
        answerClicked ? console.log('answered', isQuestionTrue) : console.log('вы не выбрали ответ')
        setAnswerClicked(false)
        setIsQuestionTrue(undefined)
        setSelected(undefined)
        setIsTimerActive(false)
        router.push(`/tests/${testId}/${nextPath}`).then()

        /*  if(path >= test.questions.length){
              router.push(`/tests/${testId}/final`).then()
          }else {
              router.push(`/tests/${testId}/${nextPath}`).then()
          }*/
    }

    const toSkipQuestion = () => {
        setIsTimerActive(false)
        answerClicked ? console.log('нельзя выбрать ответ') : console.log('skipped')
        if(path >= test.questions.length){
            router.push(`/tests/${testId}/final`).then()
        }else {
            router.push(`/tests/${testId}/${nextPath}`).then()
        }
    }

    return (

        <>

            {
                !path ?
                    <>Подождите</>
                    :
                        path > test.questions.length?
                    <div className={styles.container}>
                        Вы решили тест!
                    </div>
            :
                    <>
                        <Timer seconds={test.questions[path - 1].timeLimit} active={isTimerActive} quizId={test.questions[path - 1].id}/>

                        <div className={styles.container}>
                            <div className={styles.title}>
                                {test.questions[path - 1].questionTitle}
                            </div>
                            <div className={styles.answers}>

                                {test.questions[path - 1].answers.map(({answerTitle, status, id}) => (
                                        <div className={styles.item} key={id} onClick={() => toClickAnswer(id, status)}>

                                                <RadioButton text={answerTitle} checked={id === selected}/>

                                        </div>
                                    )
                                )}
                            </div>
                            {path >= test.questions.length ?
                                <>
                                    <div className={styles.answerButtons}>
                                        <div className={styles.item} onClick={() => toSkipQuestion()}>
                                            <Button text={'Пропустить'} status={answerClicked ? "disabled" : "OK"}/>
                                        </div>
                                        <div className={styles.item} onClick={() => toAnswerQuestion()}>
                                            <Button text={'Ответить'} status={answerClicked ? "OK" : "disabled"}/>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={styles.answerButtons}>
                                        <div className={styles.item} onClick={() => toSkipQuestion()}>
                                            <Button text={'Пропустить'} status={answerClicked ? "disabled" : "OK"}/>
                                        </div>
                                        <div className={styles.item} onClick={() => toAnswerQuestion()}>
                                            <Button text={'Ответить'} status={answerClicked ? "OK" : "disabled"}/>
                                        </div>
                                    </div>
                                </>
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
