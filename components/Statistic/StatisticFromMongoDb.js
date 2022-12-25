import styles from './Statistic.module.scss'

const StatisticFromLocalStorage = ({testStatistic}) => {
    console.log(testStatistic)

    return (
        <>

            {testStatistic ?
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
                    {testStatistic.questions.map(({
                                                      status = true,
                                                      questionTitle,
                                                      questionId,
                                                      selectedQuestionTitle,
                                                      trueAnswerTitle,
                                                      selectedAnswerId,
                                                      trueAnswerId
                                                  }) => (


                        <tr key={questionId}>
                            <td className={styles.td}>{questionTitle}</td>
                            <td className={styles.td}>{selectedQuestionTitle}</td>
                            <td className={styles.td}>{trueAnswerTitle}</td>
                            <td className={styles.td && styles.statusTd}>
                                {
                                    selectedAnswerId === trueAnswerId ?
                                        <div className={styles.statusTrue}>ответ верный</div>
                                        :
                                        <div className={styles.statusFalse}>ответ неверный</div>
                                }
                            </td>

                        </tr>

                    ))}
                    </tbody>
                </table>
                :
                <>
                    Загрузка...
                </>
            }
        </>
    )
}

export default StatisticFromLocalStorage

