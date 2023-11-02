import './AdminLayout.css';
import {Footer, Navbar, Sidebar} from "../../organisms";
import {useRef, useState, MouseEvent} from "react";
import {AdminRoutes} from "../../../routes/AdminRoutes";
import {AuthService} from "../../../lib";

/**
 * AdminLayout is a React component that defines the layout structure for the admin section of the application.
 *
 * @component
 * @returns - The rendered React component.
 */
export const AdminLayout = () => {

    /**
     * `mutableRefObject` is a mutable ref object used to handle clicks for controlling the visibility of the sidebar.
     */
    const mutableRefObject = useRef<HTMLDivElement>(null);

    /**
     * `username` is a string representing the username of the currently logged-in user, obtained from AuthService.
     */
    const username: string = AuthService.getUsername();

    /**
     * `sidebarVisible` is a state variable used to control the visibility of the sidebar within the layout.
     */
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

    /**
     * `changeSidebarVisibility` is a function that toggles the visibility of the sidebar by updating the `sidebarVisible` state.
     */
    const changeSidebarVisibility = (): void => {
        setSidebarVisible(!sidebarVisible);
    }

    /**
     * `handleClick` is a function that handles clicks outside the sidebar to close it. It checks whether a click occurred
     * within the layout and, if not, hides the sidebar by setting `sidebarVisible` to `false`.
     *
     * @param {MouseEvent<HTMLDivElement>} event - The mouse event when clicking within the layout.
     */
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
