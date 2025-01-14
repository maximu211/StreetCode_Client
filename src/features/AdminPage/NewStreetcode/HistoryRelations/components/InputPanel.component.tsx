import './components.styles.scss';

import { useEffect, useState } from 'react';

import { AutoComplete, Button } from 'antd';

import RelatedFigure from '@/models/streetcode/related-figure.model';

interface Props {
  relations: RelatedFigure[];
  options: RelatedFigure[];
  handleAdd: (relation: RelatedFigure) => void;
}

const InputPanel = ({ relations, options, handleAdd }: Props) => {
    const [relation, setRelation] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<RelatedFigure[]>(options);

    useEffect(() => {
        if (relations.length > 0) {
            const filtered = options.filter(option => !relations.some(relation => relation.id === option.id));
            setFilteredOptions(filtered);
        }
        else {
            //const filtered = options.filter(option => relation => relation.id === option.id));
            setFilteredOptions(options);
        }
    }, [options, relations]);


    const handleSearch = (value: string) => {
        if (relations.length > 0) {
            const filtered = options.filter(option => !relations.some(relation => relation.id === option.id));
            setFilteredOptions(filtered);
        }
        else {
            setFilteredOptions(options);
        }
    };

    const handleAddItem = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const found = filteredOptions.find((rel) => rel.title === relation);
        if (found !== undefined) {
            handleAdd(found);
            setRelation('');
            setFilteredOptions(options.filter((rel) => !relations.includes(rel) && rel.title != found.title));
        }
    };

    return (
        <form className="input-container">
            <AutoComplete
                placeholder="Знайти стріткод..."
                style={{ width: '100%' }}
                options={filteredOptions.map((option) => ({ value: option.title, label: option.title }))}
                onSearch={handleSearch}
                onChange={(value) => setRelation(value)}
                value={relation}
            />
            <Button onClick={handleAddItem} className='streetcode-custom-button button-margin-left' type="primary">
        Додати
            </Button>
        </form>
    );
};

export default InputPanel;
