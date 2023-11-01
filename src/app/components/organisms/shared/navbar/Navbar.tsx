import './Navbar.css';
import {ProfileNavItem, ToggleNavButton} from "../../../molecules";

type Props = {
    username: string;
    changeSidebarVisibility: () => void;
}

/**
 * Navbar is a React component that represents the top navigation bar of the application.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {string} props.username - The username to display in the navigation bar.
 * @param {() => void} props.changeSidebarVisibility - A function to toggle the sidebar visibility.
 * @returns - The rendered React component.
 */
export const Navbar = ({username, changeSidebarVisibility}: Props) => {
    return (
        <div
            className="flex justify-content-between align-items-center px-5 py-2 surface-0 border-bottom-1 surface-border relative lg:static">
            <ToggleNavButton changeSidebarVisibility={changeSidebarVisibility}></ToggleNavButton>
            <ProfileNavItem username={username}></ProfileNavItem>
        </div>
    );
}
