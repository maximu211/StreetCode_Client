import { observer } from 'mobx-react-lite';
import React from 'react';

import { Modal } from 'antd';

import useMobx from '@/app/stores/root-store';

const ConfirmationModal = () => {
    const { modalStore: { setConfirmationModal, modalsState: { confirmation } } } = useMobx();
    return (
        <Modal
            title="Підтведження"
            open={confirmation.isOpen}
            onOk={() => {
                if (confirmation.confirmationProps?.onSubmit) {
                    confirmation.confirmationProps.onSubmit();
                }
            }}
            onCancel={() => setConfirmationModal('confirmation')}
        >
            {(confirmation.confirmationProps?.text)
                ? <p>{confirmation.confirmationProps.text}</p> : <p>Ви впевнені, що хочете видалити цей елемент?</p>}
        </Modal>
    );
};
export default observer(ConfirmationModal);