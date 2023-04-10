import './RelatedFigureItemModal.styles.scss';

import { Link } from 'react-router-dom';
import { useAsync } from '@hooks/stateful/useAsync.hook';
import useMobx from '@stores/root-store';
import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import CancelBtn from '@assets/images/utils/Cancel_btn_mobile.svg';
import base64ToUrl from '@/app/common/utils/base64ToUrl.utility';

const RelatedFiguresItemModal = () => {
    const { imagesStore } = useMobx();
    const { fetchImage, getImage } = imagesStore;
    const { relatedFiguresStore: { relatedFiguresMap }, modalStore } = useMobx();
    const { setModal, modalsState: { relatedFigureItem } } = modalStore;

    const relationId = relatedFigureItem.fromCardId!;
    const relation = relatedFiguresMap.get(relationId);

    useAsync(
        () => {
        if (relation)
            fetchImage(relation?.imageId);
        },
        [relation?.imageId],
    );
    
    return (
        <Modal className='mobileModal'
            open={relatedFigureItem.isOpen}
            maskClosable
            centered
            footer={null}
            onCancel={() => setModal('relatedFigureItem')}
            closeIcon={<CancelBtn />}
        >
            <div className='relatedFigureSlide'>
                <div className='figureSlideImage'
                    style={{ backgroundImage: `url(${base64ToUrl(getImage(relation?.imageId ?? 0)?.base64, getImage(relation?.imageId ?? 0)?.mimeType)})` }}
                ></div>
                <div className="figureSlideText">
                    <div className="heading"> 
                        <p>{relation?.title}</p>
                        {
                            relation?.alias !== null ?
                            <p className='aliasText'>
                                ({relation?.alias})
                            </p>
                            : undefined
                        }
                    </div>
                </div>
            </div>
            <Link 
                className='redirectionButton'
                to={`../streetcode/${relation?.url}`} 
                onClick={() => setModal('relatedFigureItem', relation?.id, false)}           
            >
                <p>Перейти на сторінку постаті</p>
            </Link>
        </Modal>
    );
};

export default observer(RelatedFiguresItemModal);