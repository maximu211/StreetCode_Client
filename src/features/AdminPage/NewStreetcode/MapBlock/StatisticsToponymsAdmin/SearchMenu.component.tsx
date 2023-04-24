import MagnifyingGlass from '@images/header/Magnifying_glass.svg';
import { Button, Input, Select, SelectProps, InputNumber} from "antd";
import './SearchMenu.styles.scss'


interface IProps {
    setTitle: any
    setRequest: () => void
}

const SearchMenu = ({setTitle, setRequest}: IProps) => {

    const handleChangeTitle = (event: any) => {
        setTitle(event.target.value);
    };

    return(
    <>
    <div className='searchMenuToponyms'>
            <div className='searchMenuElement'>
                <Button className='Button' onClick={() => setRequest()}>Пошук Топонімів</Button>
            </div>
            <div className='searchMenuElement'>
                <Input
                    className='searchMenuElementInput'
                    prefix={<MagnifyingGlass />}
                    onChange={handleChangeTitle}
                    placeholder="Назва топоніму"
                />
            </div>

    </div>
    </>
    );
}

export default SearchMenu;