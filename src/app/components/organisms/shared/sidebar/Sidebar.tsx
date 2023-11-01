import './Sidebar.css';
import {LogoSidebar, SidebarProfile} from "../../../atoms";
import {SectionItems, SectionSidebarItems} from "../../../molecules";
import {AuthService} from "../../../../lib";
import {useNavigate} from "react-router-dom";

type Props = {
    username: string;
}

/**
 * Sidebar is a React component that represents the sidebar navigation menu of the application.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {string} props.username - The username to display in the sidebar.
 * @returns - The rendered React component.
 */
export const Sidebar = ({username}: Props) => {

    /**
     * The `navigate` function is provided by the `useNavigate` hook from React Router.
     * It allows for programmatic navigation within the application by updating the URL path.
     */
    const navigate = useNavigate();

    /**
     * Function to handle user logout
     */
    const logout = (): void => {
        AuthService.logout(() => navigate('/login'));
    }

    /**
     * Sidebar sections and navigation items
     */
    const sections: SectionItems[] = [
        {
            name: 'Favoritos',
            items: [
                {
                    isAction: false,
                    name: 'Riesgos',
                    iconClass: 'pi-info-circle',
                    route: 'risks',
                    action: () => {
                    }
                },
                {
                    isAction: false,
                    name: 'Proveedores',
                    iconClass: 'pi-briefcase',
                    route: 'providers',
                    action: () => {
                    }
                }
            ]
        },
        {
            name: 'Aplicación',
            items: [
                {
                    isAction: true,
                    name: 'Logout',
                    iconClass: 'pi-sign-out',
                    route: '',
                    action: logout
                }
            ]
        },
    ];

    return (
        <div className="flex flex-column h-full">
            <LogoSidebar></LogoSidebar>
            <div className="overflow-y-auto">
                <ul className="list-none p-3 m-0">
                    {sections.map((section, index) =>
                        <SectionSidebarItems key={index} items={section.items} name={section.name}/>)}
                </ul>
            </div>
            <SidebarProfile username={username}></SidebarProfile>
        </div>
    );
}
