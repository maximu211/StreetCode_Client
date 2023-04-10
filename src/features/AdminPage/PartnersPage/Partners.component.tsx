import './Partners.styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, StarOutlined } from '@ant-design/icons';
import facebook from '@assets/images/partners/facebook.png';
import instagram from '@assets/images/partners/instagram.png';
import twitter from '@assets/images/partners/twitter.png';
import youtube from '@assets/images/partners/youtube.png';
import ImageStore from '@stores/image-store';
import useMobx from '@stores/root-store';

import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';

import PageBar from '@/features/AdminPage/PartnersPage/PartnerLink.component';
import Partner, { PartnerSourceLink } from '@/models/partners/partners.model';

import PartnerModal from './PartnerModal/PartnerModal.component';

const LogoType = [twitter, instagram, facebook, youtube];

const Partners:React.FC = observer(() => {
    const { partnersStore, modalStore } = useMobx();

    const [modalAddOpened, setModalAddOpened] = useState<boolean>(false);
    const [modalEditOpened, setModalEditOpened] = useState<boolean>(false);
    const [partnerToEdit, setPartnerToedit] = useState<Partner>();

    const updatedPartners = () => {
        Promise.all([
            partnersStore?.fetchPartnersAll(),
        ]).then(() => {
            partnersStore?.PartnerMap.forEach((val, key) => {
            // eslint-disable-next-line no-param-reassign
                ImageStore.getImageById(val.logoId).then((logo) => {
                    partnersStore.PartnerMap.set(
                        key,
                        { ...partnersStore.PartnerMap.get(key)!, logo },
                    );
                });
            });
        });
    };
    useEffect(() => {
        updatedPartners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const columns: ColumnsType<Partner> = [
        {
            title: 'Назва',
            dataIndex: 'title',
            key: 'title',
            render(value, record) {
                return (
                    <div key={`${value}${record.id}`} className="partner-table-item-name">
                        <p>{value}</p>
                        {record.isKeyPartner ? <StarOutlined /> : ''}
                    </div>
                );
            },
        },
        {
            title: 'Посилання на сайт',
            dataIndex: 'targetUrl',
            key: 'url',
            width: '28%',
            render: (targeteurl) => (
                <a
                    className="site-link"
                    key={`${targeteurl.href}`}
                    href={targeteurl.href}
                >
                    {targeteurl.title ?? targeteurl.href}
                </a>
            ),
        },
        {
            title: 'Лого',
            dataIndex: 'logo',
            key: 'logo',
            onCell: () => ({
                style: { padding: '0', margin: '0' },
            }),
            render: (logo, record) => (
                <img
                    key={`${record.id}${record.logo?.id}}`}
                    className="partners-table-logo"
                    src={logo?.url.href}
                    alt={logo?.alt}
                />
            ),

        },
        {
            title: 'Соц. мережі',
            dataIndex: 'partnerSourceLinks',
            key: 'partnerSourceLinks',
            width: '12%',
            render: (links:PartnerSourceLink[], partner) => (
                <div key={`${links.length}${partner.id}${partner.logoId}`} className="partner-links">
                    {links.map((link) => (
                        <a
                            key={`${link.id}${link.targetUrl}`}
                            rel="noreferrer"
                            target="_blank"
                            className="sourceLink"
                            href={link.targetUrl.href}
                        >
                            <img
                                key={link.id * link.logoType}
                                src={LogoType[link.logoType]}
                                alt={link.targetUrl.title}
                            />
                        </a>
                    ))}
                </div>
            ),
        },
        { title: 'Дії',
          dataIndex: 'action',
          key: 'action',
          width: '10%',
          render: (value, partner, index) => (
              <div key={`${partner.id}${index}`} className="partner-page-actions">
                  <DeleteOutlined
                      key={`${partner.id}${index}111`}
                      className="actionButton"
                      onClick={() => {
                          console.log(modalStore);
                          modalStore.setConfirmationModal('confirmation', () => {
                              partnersStore.deletePartner(partner.id).then(() => {
                                  partnersStore.PartnerMap.delete(partner.id);
                              }).catch((e) => {
                                  console.log(e);
                              });
                              modalStore.setConfirmationModal('confirmation');
                          }, 'Ви впевнені, що хочете видалити цього партнера?');
                      }}
                  />
                  <EditOutlined
                      key={`${partner.id}${index}222`}
                      className="actionButton"
                      onClick={() => {
                          setPartnerToedit(partner);
                          setModalEditOpened(true);
                      }}
                  />

              </div>
          ) },
    ];
    return (
        <>
            <PageBar />
            <div className="partners-page-container">
                <Button
                    className="streetcode-custom-button"
                    onClick={() => setModalAddOpened(true)}
                >
                Додати
                </Button>
                <Table
                    pagination={{ pageSize: 10 }}
                    className="partners-table"
                    columns={columns}
                    dataSource={partnersStore?.getPartnerArray}
                    rowKey="id"
                />
            </div>
            <PartnerModal open={modalAddOpened} setIsModalOpen={setModalAddOpened} isStreetcodeVisible />
            <PartnerModal
                open={modalEditOpened}
                setIsModalOpen={setModalEditOpened}
                partnerItem={partnerToEdit}
                isStreetcodeVisible
            />
        </>

    );
});
export default Partners;