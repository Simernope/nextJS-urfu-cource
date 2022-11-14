import QuestionsSide from "../../components/QuestionsSide/QuestionsSide";
import HeaderTest from "../../components/HeaderTest/HeaderTest";
import QuestionArea from "../../components/QuestionArea/QuestionArea";
import {useRouter} from "next/router";

export async function getServerSideProps() {
    const response =await fetch('http://localhost:3000/api/tests')
    const data = await response.json()
    console.log(data)
    return{
        props:{
            tests:data
        }
    }
}

export default function Test({tests}) {
    const router = useRouter()
    const path = parseInt(router.query['num'][1])
    const nextPath = parseInt(router.query['num'][1]) + 1
    const testId = parseInt(router.query['num'][0])
    tests = tests.tests
    console.log(tests)
    return (

        <>
            {tests ?
            <>
                <QuestionsSide questions={tests.questions}/>
                <HeaderTest title={'РУСЬ И ЗОЛОТАЯ ОРДА '} icon={'/profileIcon.svg'} timeLimit={tests.timeLimit} testLength={tests.questions.length} />
                <QuestionArea test={tests} nextPath={nextPath} path={path} testId={testId} />
            </>
                :
                <>
                </>
            }

        </>
    )
}