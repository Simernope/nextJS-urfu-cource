import QuestionsSide from "../../components/QuestionsSide/QuestionsSide";
import HeaderTest from "../../components/HeaderTest/HeaderTest";
import QuestionArea from "../../components/QuestionArea/QuestionArea";
import {useRouter} from "next/router";




export async function getServerSideProps(context) {
    console.log(context.query['num'])
    const testId = context.query['num'][0]
    console.log(testId)
    const response =await fetch(`http://localhost:3000/api/currentTest/${testId}`)
    const data = await response.json()


    return{
        props:{
            tests:data,
        }
    }

}

export default function Test({tests}) {
    const router = useRouter()
    const path = parseInt(router.query['num'][1])
    const nextPath = parseInt(router.query['num'][1]) + 1
    const testId = parseInt(router.query['num'][0])



    tests = tests.tests
    const currentTest = tests.find(el => el.id === testId)
    return (

        <>
            {currentTest ?
            <>
                <QuestionsSide questions={currentTest.questions} active={path}/>
                <HeaderTest title={currentTest.title} icon={'/profileIcon.svg'} timeLimit={currentTest.timeLimit} testLength={currentTest.questions.length} />
                <QuestionArea test={currentTest} nextPath={nextPath} path={path} testId={testId} title={currentTest.title} />
            </>
                :
                <>
                    Загрузка...
                </>
            }

        </>
    )
}