import Checkbox from "../components/buttons/Checkboxes/Checkbox";
import Button from "../components/buttons/Button";
import RadioButton from "../components/buttons/RadioButton/RadioButton";

const elements = () => {
    return(
        <>
            <h1>
                Buttons:
            </h1>
            <h3>
                Button disabled:
            </h3>
            <Button text={'Создать игру'} status={'disabled'}/>
            <h3>
                Button default:
            </h3>
            <Button text={'Создать игру'} />
            <h1>
                Radio buttons:
            </h1>
            <h3>
                Radio button checked:
            </h3>
            <RadioButton text='Grishin Simeon Alexsandrovich' checked={true} disabled={false}/>
            <h3>
                Radio button disabled:
            </h3>
            <RadioButton text='Grishin Simeon Alexsandrovich' checked={false} disabled={true}/>
            <h3>
                Radio button default:
            </h3>
            <RadioButton text='Grishin Simeon Alexsandrovich' checked={false} disabled={false}/>
            <h1>
                Checkboxes:
            </h1>
            <h3>
                Checkbox checked:
            </h3>
            <Checkbox checked={true} disabled={false}/>
            <h3>
                Checkbox default:
            </h3>
            <Checkbox checked={false} disabled={false}/>
            <h3>
                Checkbox disabled:
            </h3>
            <Checkbox checked={false} disabled={true}/>
        </>
    )
}

export default elements