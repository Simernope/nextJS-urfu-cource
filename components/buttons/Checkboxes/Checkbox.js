import Image from "next/image";
import styles from './Checkbox.module.scss'

const Checkbox = ({checked, disabled}) => {

    return (
        <>
            <div className={styles.container}>
                <div className={`
                                ${styles.border}
                                ${checked && styles.border_checked}
                                ${disabled && styles.border_disabled}
                                `}>
                    {checked &&
                        <div className={styles.mark}>
                            <Image src={'/Vector.svg'} width={'15px'} height={'10px'} alt={'mark'}/>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Checkbox