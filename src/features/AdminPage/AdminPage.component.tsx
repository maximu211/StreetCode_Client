import './AdminPage.styles.scss';

import { useState } from 'react';

import PageBar from './PageBar/PageBar.component';
import StreetcodesTable from './StreetcodesTable/StreetcodesTable.component';

const AdminPage = () => (
    <div className="adminPageContainer">
        <PageBar />
        <StreetcodesTable />
    </div>
);

export default AdminPage;
