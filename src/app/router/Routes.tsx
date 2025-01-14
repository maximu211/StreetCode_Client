import {
    createBrowserRouter, createRoutesFromElements, Link, Navigate, Route,
} from 'react-router-dom';
import FRONTEND_ROUTES from '@constants/frontend-routes.constants';
import ForFansMainPage from '@features/AdminPage/ForFansPage/ForFansMainPage.component';
import App from '@layout/app/App.component';
import StreetcodeContent from '@streetcode/Streetcode.component';

import ProtectedComponent from '@/app/common/components/ProtectedComponent.component';
import ContactUs from '@/features/AdditionalPages/ContactUsPage/ContanctUs.component';
import NotFound from '@/features/AdditionalPages/NotFoundPage/NotFound.component';
import PartnersPage from '@/features/AdditionalPages/PartnersPage/Partners.component';
import PrivatePolicy from '@/features/AdditionalPages/PrivatePolicyPage/PrivatePolicy.component';
import SupportUs from '@/features/AdditionalPages/SupportUsPage/SupportUs.component';
import AdminPage from '@/features/AdminPage/AdminPage.component';
import Analytics from '@/features/AdminPage/Analytics/Analytics.component';
import AdminLogin from '@/features/AdminPage/Login/AdminLogin.component';
import News from '@/features/AdminPage/NewsPage/News.component';
import NewStreetcode from '@/features/AdminPage/NewStreetcode/MainNewStreetcode.component';
import Partners from '@/features/AdminPage/PartnersPage/Partners.component';
import TeamPage from '@/features/AdminPage/TeamPage/TeamPage.component';
import TermDictionary from '@/features/AdminPage/TermDictionary/TermDictionary.component';
import StreetcodeCatalog from '@/features/StreetcodeCatalogPage/StreetcodeCatalog.component';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={FRONTEND_ROUTES.BASE} element={<App />}>
        <Route
            index
            path={`${FRONTEND_ROUTES.ADMIN.BASE}`}
            element={<ProtectedComponent><AdminPage /></ProtectedComponent>}
        />
        <Route
            index
            path={`${FRONTEND_ROUTES.ADMIN.BASE}/:id`}
            element={<ProtectedComponent><StreetcodeContent /></ProtectedComponent>}
        />
        <Route
            index
            path={`${FRONTEND_ROUTES.ADMIN.EDIT_STREETCODE}/:id`}
            element={<ProtectedComponent><NewStreetcode /></ProtectedComponent>}
        />
        <Route
            index
            path={FRONTEND_ROUTES.ADMIN.NEW_STREETCODE}
            element={<ProtectedComponent><NewStreetcode /></ProtectedComponent>}
        />
        <Route
            index
            path={FRONTEND_ROUTES.ADMIN.FOR_FANS}
            element={<ProtectedComponent><ForFansMainPage /></ProtectedComponent>}
        />
        <Route
            index
            path={FRONTEND_ROUTES.ADMIN.PARTNERS}
            element={<ProtectedComponent><Partners /></ProtectedComponent>}
        />
        <Route
            index
            path={`${FRONTEND_ROUTES.ADMIN.ANALYTICS}/:id`}
            element={<Analytics />}
        />
        <Route
            index
            path={FRONTEND_ROUTES.ADMIN.DICTIONARY}
            element={(
                <ProtectedComponent>
                    <TermDictionary />
                </ProtectedComponent>
            )}
        />
        <Route
            index
            path={FRONTEND_ROUTES.ADMIN.NEWS}
            element={<ProtectedComponent><News /></ProtectedComponent>}
        />
        <Route index path={FRONTEND_ROUTES.OTHER_PAGES.CATALOG} element={<StreetcodeCatalog />} />
        <Route
            index
            path={FRONTEND_ROUTES.ADMIN.TEAM}
            element={(
                <ProtectedComponent>
                    <TeamPage />
                </ProtectedComponent>
            )}
        />
        <Route index path={FRONTEND_ROUTES.ADMIN.LOGIN} element={<AdminLogin />} />
        <Route path={FRONTEND_ROUTES.OTHER_PAGES.ERROR404} element={<NotFound />} />
        <Route path={FRONTEND_ROUTES.OTHER_PAGES.PRIVACY_POLICY} element={<PrivatePolicy />} />
        <Route path={FRONTEND_ROUTES.OTHER_PAGES.CONTACT_US} element={<ContactUs />} />
        <Route path={FRONTEND_ROUTES.OTHER_PAGES.PARTNERS} element={<PartnersPage />} />
        <Route path={FRONTEND_ROUTES.OTHER_PAGES.SUPPORT_US} element={<SupportUs />} />
        <Route index path="/:id" element={<StreetcodeContent />} />
    </Route>,
));

export default router;
