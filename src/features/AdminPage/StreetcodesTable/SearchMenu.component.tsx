import FRONTEND_ROUTES from "@/app/common/constants/frontend-routes.constants";
import MagnifyingGlass from '@images/header/Magnifying_glass.svg';
import { Button, Input, Select, SelectProps, InputNumber} from "antd";
import './StreetcodesTable.styles.scss';

interface IProps {
    setStatus: any
    setTitle: any
    setRequest: () => void
}

const SearchMenu = ({setStatus, setTitle, setRequest}: IProps) => {

    const options: SelectProps['options'] = [
        { value: 'Published', label: 'опублікований' },
        { value: 'Draft', label: 'чернетка' },
        { value : 'Deleted', label: 'видалений' }
      ];

    const handleChangeStatus = (value: string) => {
        console.log(`selected ${value}`);
        setStatus(value);
    };

    const handleChangeTitle = (event: any) => {
        console.log(`selected ${event.target.value}`);
        setTitle(event.target.value);
    };

    return(
    <>
    <div className='searchMenu'>
            <div className='searchMenuElement'>
                <Button className='Button' onClick={() => setRequest()}>Пошук стріткодів</Button>
            </div>
            <div className='searchMenuElement'>
                <Input
                    className='searchMenuElementInput'
                    prefix={<MagnifyingGlass />}
                    onChange={handleChangeTitle}
                    placeholder="Назва або індекс"
                />
            </div>
                <div className='searchMenuElement'>
                    <Select
                        mode="multiple"
                        allowClear
                        className='searchMenuStatusSelected'
                        placeholder="Статус стріткодів"
                        onChange={handleChangeStatus}
                        options={options}
                    />
                </div>
                <div className='searchMenuElement'>
                    <Button className='Button' onClick={() => window.open(`${FRONTEND_ROUTES.STREETCODE.BASE}/new-streetcode`,'_blank')}>Новий стріткод</Button>
                </div>
    </div>
    </>
    );
}

export default SearchMenu;