import styles from '/styles/allTests.module.scss'
import Link from "next/link";


export async function getStaticProps(){
    const response =await fetch('http://localhost:3000/api/mongoTests')
    const data = await response.json()

    if(!data){
        return {
            notFound: true,
        }
    }
    return{
        props:{
            allTests: data
        }
    }
}

const AllTests = ({allTests}) => {
    const {tests} = allTests


    return(
        <div className={styles.container}>
            Доступные тесты:
            {tests?
                tests.map(({title, id}) => (
                    <div key={id} className={styles.test}>
                        <Link href={`tests/${id}/1`}>
                            {title}
                        </Link>
                    </div>
                ))
                :
                <>
                    Тесты не найдены
                </>
            }
        </div>
    )
}

export default AllTests