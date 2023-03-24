import './TimelineBlock.styles.scss';

import { observer } from 'mobx-react-lite';
import { useAsync } from '@hooks/stateful/useAsync.hook';
import useMobx from '@stores/root-store';
import BlockHeading from '@streetcode/HeadingBlock/BlockHeading.component';
import TimelineSlideCard from '@streetcode/TimelineBlock/TimelineItem/TimelineItem.component';
import TimelineReelOutline from '@streetcode/TimelineBlock/TimelineReelOutline/TimelineReelOutline.component';
import TimelineSlider from '@streetcode/TimelineBlock/TimelineSlider.component';
import TimelineTimespan from '@streetcode/TimelineBlock/Timespan/Timespan.component';

const TimelineBlock = () => {
    const { timelineItemStore, streetcodeStore: { getStreetCodeId } } = useMobx();
    const { fetchTimelineItemsByStreetcodeId, getTimelineItemArray } = timelineItemStore;

    useAsync(
        () => fetchTimelineItemsByStreetcodeId(getStreetCodeId ?? 1),
        [getStreetCodeId],
    );

    return (
        <div className="timelineContainer">
            <BlockHeading headingText="Хронологія" />
            <TimelineTimespan />
            <div className="timelineContentContainer">
                <TimelineReelOutline />
                <TimelineSlider
                    dots={false}
                    arrows={false}
                    centerMode
                    swipeOnClick
                    infinite={false}
                    variableWidth
                    swipeToSlide
                    slidesToScroll={1}
                >
                    {getTimelineItemArray.map((timelineItem) => (
                        <TimelineSlideCard
                            key={timelineItem.id}
                            timelineItem={timelineItem}
                        />
                    ))}
                </TimelineSlider>
                <TimelineReelOutline />
            </div>
        </div>
    );
};

export default observer(TimelineBlock);
