import './HeaderDrawerItem.styles.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    id: number;
    text: string;
    parentActive: number;
    link: string;
    toggleState: () => void;
}

const HeaderDrawerItem = ({
    id, parentActive, text, link, toggleState,
}: Props) => {
    const [isActive, setActive] = useState(false);
    const handleClick = () => {
        setActive(true);
        toggleState();
    };
    useEffect(() => {
        if (parentActive !== id) {
            setActive(false);
        }
    }, [id, parentActive]);
    return (
        <div>
            <button
                className="headerItem"
                onClick={handleClick}
                type="button"
                id={isActive ? 'active' : ''}
            >
                <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>{text}</Link>
            </button>
        </div>
    );
};
export default HeaderDrawerItem;
