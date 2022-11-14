import styles from '/styles/allTests.module.scss'
import Link from "next/link";


export async function getServerSideProps(){
    const response =await fetch('http://localhost:3000/api/newTests')
    const data = await response.json()
    console.log(data)
    return{
        props:{
            allTests: data
        }
    }
}

const AllTests = ({allTests}) => {
    const{newTests} = allTests
    return(
        <div className={styles.container}>
            Доступные тесты:
            {newTests?
                newTests.map(({title, id}) => (
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