import React, { useEffect, useState } from 'react';
import PartnersStore from '@stores/partners-store';

import { Button, Select } from 'antd';

import PartnerModal from '@/features/AdminPage/PartnersPage/PartnerModal/PartnerModal.component';
import { PartnerShort } from '@/models/partners/partners.model';

const PartnerBlockAdmin:React.FC<{ partners: PartnerShort[],
setPartners: React.Dispatch<React.SetStateAction<PartnerShort[]>> }> = ({ partners, setPartners }) => {
    const [allPartnersShort, setAllPartnerShort] = useState<PartnerShort[]>([]);
    const [modalAddOpened, setModalAddOpened] = useState<boolean>(false);

    useEffect(() => {
        Promise.all([
            PartnersStore.getAllPartnerShort()
                .then((parts) => setAllPartnerShort(parts)),
        ]);
    }, []);

    const onPartnerSelect = (value:number) => {
        const index = allPartnersShort.findIndex((c) => c.id === value);
        setPartners([...partners, allPartnersShort[index]]);
    };
    const onPartnerDeselect = (value:number) => {
        setPartners(partners.filter((c) => c.id !== value));
    };
    return (
        <div className="adminContainer-block">
            <h2>Партнери</h2>
            <div className="display-flex-row">
                <Select
                    mode="multiple"
                    onSelect={onPartnerSelect}
                    value={partners.map((x) => x.id)}
                    onDeselect={onPartnerDeselect}
                >
                    {allPartnersShort
                        .map((s) => <Select.Option key={`${s.id}`} value={s.id}>{s.title}</Select.Option>)}
                </Select>

                <Button
                    className="streetcode-custom-button button-margin-left"
                    onClick={() => setModalAddOpened(true)}
                >
                     Додати
                </Button>
            </div>
            <PartnerModal
                open={modalAddOpened}
                setIsModalOpen={setModalAddOpened}
                isStreetcodeVisible={false}
                afterSubmit={
                    (partner) => {
                        setAllPartnerShort([...allPartnersShort, { id: partner.id, title: partner.title }]);
                        setPartners([...partners, { id: partner.id, title: partner.title }]);
                    }
                }
            />
        </div>
    );
};
export default PartnerBlockAdmin;
