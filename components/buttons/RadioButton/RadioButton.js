import styles from './Radio.module.scss'


const RadioButton = ({text, checked, disabled}) => {
    return(
        <div className={`
                        ${styles.container}
                        ${disabled && styles.container_disabled}    
                        `}>
            {checked === true}
            <div className={styles.radio}>
                <div className={`
                                ${styles.radio__outer}
                                ${disabled && styles.radio__outer_disabled}  
                                ${checked && styles.radio__outer_checked}
                                `}>
                    <div className={`
                        ${styles.radio__dot} 
                        ${checked===true && styles.radio__dot_checked}
                        `}>

                    </div>
                </div>
            </div>
            <div className={styles.text}>
                {text}
            </div>
        </div>
    )
}

export default RadioButton