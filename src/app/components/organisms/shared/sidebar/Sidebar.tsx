import './Sidebar.css';
import {LogoSidebar, SidebarProfile} from "../../../atoms";
import {SectionItems, SectionSidebarItems} from "../../../molecules";
import {AuthService} from "../../../../lib";
import {useNavigate} from "react-router-dom";

type Props = {
    username: string;
}
export const Sidebar = ({username}: Props) => {
    const navigate = useNavigate();

    const logout = (): void => {
        AuthService.logout(() => navigate('/login'));
    }

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