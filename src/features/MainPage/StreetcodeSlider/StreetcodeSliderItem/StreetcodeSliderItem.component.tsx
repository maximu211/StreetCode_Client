import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useMobx from '@stores/root-store';

import useOnScreen from '@/app/common/hooks/scrolling/useOnScreen.hook';
import { useAsync } from '@/app/common/hooks/stateful/useAsync.hook';
import useWindowSize from '@/app/common/hooks/stateful/useWindowSize.hook';
import base64ToUrl from '@/app/common/utils/base64ToUrl.utility';
import { StreetcodeCatalogRecord, StreetcodeMainPage } from '@/models/streetcode/streetcode-types.model';
import './StreetcodeSliderItem.styles.scss';
import Image from '@/models/media/image.model';
import ImagesApi from '@/app/api/media/images.api';
interface Props {
    streetcode: StreetcodeMainPage;
}



const StreetcodeSliderItem = ({ streetcode }: Props) => {
    const { imagesStore } = useMobx();
    const id = streetcode?.id;
    const { handleImageLoad } = imagesStore;
    const [image, setImage] = useState<Image>();

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        const truncatedText = text.substr(0, maxLength);
        return truncatedText.substr(0, truncatedText.lastIndexOf(' ')) + '...';
    };

    const teaserText = truncateText(streetcode?.teaser || '', 340);

    useEffect(() => {
        if (id) {
            ImagesApi.getById(streetcode.imageId)
                .then((imgs) => setImage(imgs))
                .catch((e) => { });
        }

    }, [streetcode]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.location.href = streetcode.transliterationUrl;
    };

    return (
        <div className="mainPageStreetCodeSlider">
            <div className="itemStreetCodeMainPage">
                <div className="leftSlider">
                    <div className="leftSliderContent">
                        <img
                            key={image?.id}
                            src={base64ToUrl(image?.base64, image?.mimeType)}
                            className="StreetcodeMainPageImg"
                            alt={image?.alt}
                            onLoad={handleImageLoad}
                        />
                    </div>
                </div>
                <div className="rightSlider">
                    <div className="streetcodeMainPageContainer">
                        <div>
                            <h2 className="streercodeTitle">
                                {streetcode?.title}
                            </h2>
                            <div className="streetcodeAlias">
                                {streetcode?.alias}
                            </div>
                            <div>
                                <p className="streetcodeTeaser">
                                    {teaserText}
                                </p>
                            </div>
                            <div>
                                <a className="streetcodeLink" href={streetcode.transliterationUrl} onClick={handleLinkClick}>
                                    До стріткоду
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default StreetcodeSliderItem;