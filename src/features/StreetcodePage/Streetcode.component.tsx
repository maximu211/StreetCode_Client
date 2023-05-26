import './Streetcode.styles.scss';

import { observer } from 'mobx-react-lite';
import React, {
    lazy, Suspense, useEffect, useRef, useState,
} from 'react';
import { redirect, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ScrollToTopBtn from '@components/ScrollToTopBtn/ScrollToTopBtn.component';
import ProgressBar from '@features/ProgressBar/ProgressBar.component';
import Footer from '@layout/footer/Footer.component';
import useMobx from '@stores/root-store';
import DonateBtn from '@streetcode/DonateBtn/DonateBtn.component';
import MainBlock from '@streetcode/MainBlock/MainBlock.component';
import QRBlock from '@streetcode/QRBlock/QR.component';
import SourcesBlock from '@streetcode/SourcesBlock/Sources.component';
import TextBlockComponent from '@streetcode/TextBlock/TextBlock.component';
import TickerBlock from '@streetcode/TickerBlock/Ticker.component';
import dayjs from 'dayjs';

import StatisticRecordApi from '@/app/api/analytics/statistic-record.api';
import StreetcodesApi from '@/app/api/streetcode/streetcodes.api';
import TagsModalComponent from '@/app/common/components/modals/Tags/TagsModal.component';
import FRONTEND_ROUTES from '@/app/common/constants/frontend-routes.constants';
import { useRouteUrl } from '@/app/common/hooks/stateful/useRouter.hook';

import ArtGalleryBlockComponent from './ArtGalleryBlock/ArtGalleryBlock.component';
import InterestingFactsComponent from './InterestingFactsBlock/InterestingFacts.component';
import MapComponent from './MapBlock/Map/Map.component';
import MapBlock from './MapBlock/MapBlock.component';
import PartnersComponent from './PartnersBlock/Partners.component';
import RelatedFiguresComponent from './RelatedFiguresBlock/RelatedFigures.component';
import TimelineBlockComponent from './TimelineBlock/TimelineBlock.component';

const StreetcodeContent = () => {
    const { imageLoaderStore, streetcodeStore } = useMobx();
    const { setCurrentStreetcodeId } = streetcodeStore;
    const { imagesLoadedPercentage, loadedImagesCount } = imageLoaderStore;
    const [slideCloneCountAdded, setSlideCloneCountAdded] = useState(0);

    const streetcodeUrl = useRouteUrl();

    const [activeTagId, setActiveTagId] = useState(0);
    const [activeBlock, setActiveBlock] = useState(0);
    const [loading, setLoading] = useState(true);

    const [textBlockState, setTextBlockState] = useState(false);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const checkExist = async (qrId: number) => {
        const exist = await StatisticRecordApi.existByQrId(qrId);
        return exist;
    };

    const checkStreetcodeExist = async (url: string) => {
        const exist = await StreetcodesApi.existWithUrl(url);
        return exist;
    };

    const addCount = async (qrId: number) => {
        await StatisticRecordApi.update(qrId);
    };

    useEffect(() => {
        Promise.all([checkStreetcodeExist(streetcodeUrl)]).then(
            (resp) => {
                if (!resp.at(0)) {
                    navigate(`${FRONTEND_ROUTES.OTHER_PAGES.ERROR404}`, { replace: true });
                }
                setCurrentStreetcodeId(streetcodeUrl).then((st) => {
                    if (st?.status !== 1 && !location.pathname.includes(`${FRONTEND_ROUTES.ADMIN.BASE}`)) {
                        navigate(`${FRONTEND_ROUTES.OTHER_PAGES.ERROR404}`, { replace: true });
                    }
                });
            },
        );
        const idParam = searchParams.get('qrid');
        if (idParam !== null) {
            const tempId = +idParam;
            Promise.all([checkExist(tempId), addCount(tempId)]).then(
                (resp) => {
                    if (resp.at(0) && resp.at(1) !== null) {
                        searchParams.delete('qrid');
                        setSearchParams(searchParams);
                    }
                },
            ).catch(
                () => {
                    navigate(`${FRONTEND_ROUTES.OTHER_PAGES.ERROR404}`, { replace: true });
                },
            );
        }
    }, [streetcodeUrl]);
    useEffect(() => {
        // for cloned images in sliders
        if (slideCloneCountAdded === 0) {
            const slideClonedImgs = document.querySelectorAll('.slick-cloned img');
            const slideCloneCount = slideClonedImgs.length;
            imageLoaderStore.totalImagesToLoad += slideCloneCount;
            setSlideCloneCountAdded(slideCloneCount);
        }

        if (imagesLoadedPercentage >= 90 && textBlockState) {
            setLoading(false);
            const anchorId = window.location.hash.substring(1);
            const blockElement = document.getElementById(anchorId);
            if (blockElement) {
                blockElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [textBlockState, loadedImagesCount]);

    return (
        <div className="streetcodeContainer">
            {loading && (
                <div className="loader-container">
                    <img
                        className="spinner"
                        alt=""
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
                    />
                </div>
            )}
            <ProgressBar>
                <MainBlock
                    setActiveTagId={setActiveTagId}
                    setActiveBlock={setActiveBlock}
                />
                <TextBlockComponent setTextBlockState={setTextBlockState} />
                <InterestingFactsComponent />
                <TimelineBlockComponent />
                <MapBlock />
                <ArtGalleryBlockComponent />
                <RelatedFiguresComponent setActiveTagId={setActiveTagId} />
                <SourcesBlock />
            </ProgressBar>
            <QRBlock />
            <PartnersComponent />
            <div className="sticky">
                <div className="sticky-content">
                    <ScrollToTopBtn />
                    <DonateBtn />
                </div>
            </div>
            <TickerBlock />
            <TagsModalComponent
                activeTagId={activeTagId}
                setActiveTagId={setActiveTagId}
                activeTagBlock={activeBlock}
            />
        </div>
    );
};

export default observer(StreetcodeContent);
