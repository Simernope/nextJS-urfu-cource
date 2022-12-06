import styles from './QuestionsSide.module.scss'
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
//список вопросов
//активный, отвеченный, неотвеченный
const QuestionsSide = ({questions, active}) => {
    const router = useRouter()
    const testPath = router.query['num'][0]
    console.log(testPath)
    return (
        <>
            <div className={styles.container}>
                <div className={styles.leftArrow}>
                    <Image src={'/leftArrow.svg'} width={'18px'} height={'10px'} alt={'leftArrow'}/>
                </div>

                <div className={styles.numbers}>
                    {questions.map(({id}) => (
                        <Link href={`/tests/${testPath}/${id}`} key={id}>
                            <div>
                                <div  className={`
                                ${styles.number} 
                                ${styles.numbers_default}
                                ${active === id && styles.numbers_current}

                                `}>
                                    {id}
                                </div>
                                <div className={styles.border}>

                                </div>
                            </div>
                        </Link>


                    ))}
                </div>
            </div>
        </>
    )
}

export default QuestionsSide