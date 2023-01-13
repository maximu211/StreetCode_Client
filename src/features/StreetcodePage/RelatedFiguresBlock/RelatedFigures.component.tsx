import './RelatedFigures.styles.scss';

import Antonovich from '@images/related-figures/Antonovich.png';
import Ukrainka from '@images/related-figures/Ukrainka.png';
import Mazepa from '@images/related-figures/Mazepa.png';
import Ratushny from '@images/related-figures/Ratushny.png';
import Khmelnytsky from '@images/related-figures/Khmelnytsky.png';

import SlickSlider from '@features/SlickSlider/SlickSlider.component';
import BlockHeading from '@streetcode/HeadingBlock/BlockHeading.component';

import RelatedFigureItem from '@/features/StreetcodePage/RelatedFiguresBlock/RelatedFigureItem/RelatedFigureItem.component';
import useMobx from '@/app/stores/root-store';
import { useRouteId } from '@/app/common/hooks/stateful/useRouter.hook';
import { useAsync } from '@/app/common/hooks/stateful/useAsync.hook';
import RelatedFigure from '@/models/streetcode/related-figure.model';
import { $mobx } from 'mobx';
import { Console } from 'console';

interface Props {

}

// const relatedFigures: RelatedFigure[] = [
//     {
//         id: 1,
//         title: 'Володимир Антонович',
//         image: { id: 1, url: { id: 1, href: Antonovich } },
//         tags: [{ id: 1, title: 'Наукова школа' }, { id: 1, title: 'tag' }]
//     },
//     {
//         id: 2,
//         title: 'Леся Українка',
//         image: { id: 1, url: { id: 1, href: Ukrainka } },
//         tags: [{ id: 1, title: 'tag' }]
//     },
//     {
//         id: 3,
//         title: 'Іван Мазепа',
//         image: { id: 1, url: { id: 1, href: Mazepa } },
//         tags: [{ id: 1, title: 'tag' }]
//     },
//     {
//         id: 4,
//         title: 'Роман Ратушний',
//         image: { id: 1, url: { id: 1, href: Ratushny } },
//         tags: [{ id: 1, title: 'tag' }]
//     },
//     {
//         id: 5,
//         title: 'Богдан хмельницький',
//         image: { id: 1, url: { id: 1, href: Khmelnytsky } },
//         tags: [{ id: 1, title: 'tag' }]
//     }
// ];

const RelatedFiguresComponent = (props: Props) => {
    const { modalStore: { setModal } } = useMobx();
    const { relatedFiguresStore } = useMobx();
    const { fetchRelatedFiguresByStreetcodeId, getRelatedFiguresArray } = relatedFiguresStore;

    const streetcodeId = useRouteId();
    useAsync(
        () => fetchRelatedFiguresByStreetcodeId(streetcodeId),
        [streetcodeId]
    );

    const sliderItems = getRelatedFiguresArray.map(figure => {
        return (
            <RelatedFigureItem
                key={figure.id}
                relatedFigure={figure} />
        );
    });

    return (
        <div
            className={`relatedFiguresWrapper ${(getRelatedFiguresArray.length > 4 ? 'bigWrapper' : 'smallWrapper')}`}>
            <div className="relatedFiguresContainer">
                <BlockHeading headingText="Зв'язки історії"/>
                <div className={'relatedFiguresSliderContainer'}>
                    <div style={{ height: '100%' }}>
                        <SlickSlider
                            className={'heightContainer'}
                            infinite={false}
                            slidesToShow={4}
                            slides={sliderItems}
                            swipe={false}
                            dots={false}
                            swipeOnClick={false}
                        />
                    </div>
                </div>
                <div className="moreInfo">
                    <p onClick={() => setModal('relatedFigures', undefined, true)}>Дивитися всіх</p>
                </div>
            </div>
        </div>
    );
}

export default RelatedFiguresComponent;