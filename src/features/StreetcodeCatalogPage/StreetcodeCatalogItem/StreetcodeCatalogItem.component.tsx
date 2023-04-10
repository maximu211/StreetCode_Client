import './StreetcodeCatalogItem.styles.scss';

import { Link } from 'react-router-dom';
import useMobx from '@stores/root-store';

import { useAsync } from '@/app/common/hooks/stateful/useAsync.hook';
import base64ToUrl from '@/app/common/utils/base64ToUrl.utility';
import { StreetcodeCatalogRecord } from '@/models/streetcode/streetcode-types.model';

interface Props {
    streetcode: StreetcodeCatalogRecord;
}

const StreetcodeCatalogItem = ({ streetcode }: Props) => {
    const { imagesStore: { fetchImageByStreetcodeId, getImage } } = useMobx();
    useAsync(() => fetchImageByStreetcodeId(streetcode.id));
    return (
        <Link
            className="catalogItem"
            style={{ backgroundImage: `url(${base64ToUrl(getImage(6)?.base64, getImage(6)?.mimeType)})` }}
            to={`../streetcode/${streetcode.url}`}
        >
            <div className="catalogItemText">
                <div className="heading">
                    <p>{streetcode.title}</p>
                    {
                        streetcode.alias !== null
                            ? (
                                <p className="aliasText">
                                (
                                    {streetcode.alias}
                                )
                                </p>
                            )
                            : undefined
                    }
                </div>
            </div>
        </Link>
    );
};

export default StreetcodeCatalogItem;