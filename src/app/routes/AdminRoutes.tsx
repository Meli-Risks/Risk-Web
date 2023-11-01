import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {NotFound, ProviderAdmin} from "../components/pages";
import {RiskAdmin} from "../components/pages";

const LazyRiskAdmin = lazy(() => import('../components/pages/risks/RiskAdmin')
    .then(() => ({default: RiskAdmin})));

const LazyProviderAdmin = lazy(() => import('../components/pages/providers/ProviderAdmin')
    .then(() => ({default: ProviderAdmin})));

const LazyNotFound = lazy(() => import('../components/pages/shared/NotFound')
    .then(() => ({default: NotFound})));

export const AdminRoutes = () => {
    return (
        <Suspense>
            <Routes>
                <Route path="risks" element={<LazyRiskAdmin/>}/>
                <Route path="providers" element={<LazyProviderAdmin/>}/>
                <Route path={'/'} element={<LazyRiskAdmin/>}/>
                <Route path={'*'} element={<LazyNotFound/>}/>
            </Routes>
        </Suspense>
    );
};