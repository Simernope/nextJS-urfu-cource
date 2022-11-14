import styles from './Button.module.scss'

const Button = ({text, status}) => {
    return(
        <>
            <button className={`
                                ${styles.button} 
                                ${status==='disabled' && styles.button_disabled}
                                
                                `} >
                {text}
          </button>
        </>
    )
}

export default Button