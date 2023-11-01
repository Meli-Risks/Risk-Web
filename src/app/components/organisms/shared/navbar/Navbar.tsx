import './Navbar.css';
import {ProfileNavItem, ToggleNavButton} from "../../../molecules";

type Props = {
    username: string;
    changeSidebarVisibility: () => void;
}

export const Navbar = ({username, changeSidebarVisibility}: Props) => {
    return (
        <div
            className="flex justify-content-between align-items-center px-5 py-2 surface-0 border-bottom-1 surface-border relative lg:static">
            <ToggleNavButton changeSidebarVisibility={changeSidebarVisibility}></ToggleNavButton>
            <ProfileNavItem username={username}></ProfileNavItem>
        </div>
    );
}