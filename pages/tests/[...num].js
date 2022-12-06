import QuestionsSide from "../../components/QuestionsSide/QuestionsSide";
import HeaderTest from "../../components/HeaderTest/HeaderTest";
import QuestionArea from "../../components/QuestionArea/QuestionArea";
import {useRouter} from "next/router";




export async function getServerSideProps(context) {
    const response =await fetch('http://localhost:3000/api/mongoTests')
    const data = await response.json()
    /*console.log('context', context)
    const {num} = context.params
    const questionNumber = num[1]
    console.log('questionNumber', questionNumber)


    const response =await fetch('http://localhost:3000/api/tests')
    const data = await response.json()
    console.log(data)
    const response1 =await fetch('http://localhost:3000/api/newTests')
    const data1 = await response1.json()
    console.log(data1)

    console.log(data2)
    const response3 =await getTest(2)
    const data3 = response3
    console.log('response3,', data3)*/



    return{
        props:{
            tests:data,
        /*    newTests: data1,
            testsMongoDb: data2,*/
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
            {currentTest?
            <>
                <QuestionsSide questions={currentTest.questions} active={path}/>
                <HeaderTest title={currentTest.title} icon={'/profileIcon.svg'} timeLimit={currentTest.timeLimit} testLength={currentTest.questions.length} />
                <QuestionArea test={currentTest} nextPath={nextPath} path={path} testId={testId} />
            </>
                :
                <>
                    Загрузка...
                </>
            }

        </>
    )
}