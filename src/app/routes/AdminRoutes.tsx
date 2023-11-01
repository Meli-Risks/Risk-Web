import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {NotFound, ProviderAdmin, RiskAdmin} from "../components/pages";

const LazyRiskAdmin = lazy(() => import('../components/pages/risks/RiskAdmin').then(() => ({default: RiskAdmin})));
const LazyProviderAdmin = lazy(() => import('../components/pages/providers/ProviderAdmin').then(() => ({default: ProviderAdmin})));
const LazyNotFound = lazy(() => import('../components/pages/shared/NotFound').then(() => ({default: NotFound})));

/**
 * Component for defining routes within the admin section of the application.
 *
 * @returns A JSX element representing the admin routes.
 */
export const AdminRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="risks" element={<LazyRiskAdmin/>}/>
                <Route path="providers" element={<LazyProviderAdmin/>}/>
                <Route path={'/'} element={<LazyRiskAdmin/>}/>
                <Route path={'*'} element={<LazyNotFound/>}/>
            </Routes>
        </Suspense>
    );
};
