import styles from './Statistic.module.scss'

const StatisticFromLocalStorage = ({testStatistic}) => {
    console.log(testStatistic)
    return (
        <>
            <div className={styles.statistic}>
                {testStatistic.title}
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.th}>Вопрос</th>
                    <th className={styles.th}>Ваш ответ</th>
                    <th className={styles.th}>Правильный ответ</th>
                    <th className={styles.th}>Статус</th>
                </tr>
                </thead>
                <tbody>
                {testStatistic.questions.map(({status, questionTitle, answerTitle, id}) => (


                    <tr key={id}>
                        <td className={styles.td}>{questionTitle}</td>
                        <td className={styles.td}>{answerTitle}</td>
                        <td className={styles.td}>Правильный ответ</td>
                        <td className={styles.td && styles.statusTd}>
                            {
                                status ?
                                    <div className={styles.statusTrue}>ответ верный</div>
                                    :
                                    <div className={styles.statusFalse}>ответ неверный</div>
                            }
                        </td>

                    </tr>

                ))}
                </tbody>
            </table>
        </>
    )
}

export default StatisticFromLocalStorage

