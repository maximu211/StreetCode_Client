import { DeleteOutlined, PictureOutlined } from '@ant-design/icons';

import RelatedFigure from '../../../../../models/streetcode/related-figure.model';
import EventStreetcode from '../../../../../models/streetcode/related-figure.model';

interface Props {
    relation: EventStreetcode;
    relations: Array<EventStreetcode>;
    setRelations: React.Dispatch<React.SetStateAction<Array<EventStreetcode>>>;
    setFigures: React.Dispatch<React.SetStateAction<RelatedFigure[]>>;
}
const RelatedItem = ({ relation, relations, setRelations, setFigures } : Props) => {
    const deleteRelationHandle = async (id: number) => {
        const newRelatedSCs = relations.filter((rel) => rel.id !== id);
        setRelations(newRelatedSCs);
        setFigures(newRelatedSCs);
    };

    return (
        <div className="relationItem">
            <span className="text">{relation.title}</span>
            <div className="actions">
                <span onClick={() => deleteRelationHandle(relation.id)}>
                    <DeleteOutlined />
                </span>
            </div>
        </div>
    );
};

export default RelatedItem;
