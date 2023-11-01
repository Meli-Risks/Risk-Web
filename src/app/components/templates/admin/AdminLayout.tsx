import './AdminLayout.css';
import {Footer, Navbar, Sidebar} from "../../organisms";
import {useRef, useState, MouseEvent} from "react";
import {AdminRoutes} from "../../../routes/AdminRoutes";
import {AuthService} from "../../../lib";

export const AdminLayout = () => {
    const mutableRefObject = useRef<HTMLDivElement>(null);
    const username: string = AuthService.getUsername();
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

    const changeSidebarVisibility = (): void => {
      setSidebarVisible(!sidebarVisible);
    }

    const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
        if (mutableRefObject.current?.contains(event.target as Node)) return;
        if (sidebarVisible) setSidebarVisible(false);
    }

    return (
        <div className="min-h-screen flex relative lg:static">
            <div
                className={`surface-section h-full lg:h-auto ${sidebarVisible? '': 'hidden'} lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none surface-ground sidebar-size`}
                style={{width: '250px'}}>
                <Sidebar username={username}></Sidebar>
            </div>
            <div className="min-h-screen flex flex-column relative flex-auto" onClick={handleClick}>
                <Navbar username={username} changeSidebarVisibility={changeSidebarVisibility}></Navbar>
                <div className="flex flex-column flex-auto">
                    <div className="flex-grow-1">
                        <AdminRoutes></AdminRoutes>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

