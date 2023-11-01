import {Link} from "react-router-dom";

export type Item = {
    isAction: boolean;
    name: string;
    iconClass: string;
    route: string;
    action: () => void;
}

/**
 * SidebarItem component for rendering an item in the sidebar.
 * This component displays a sidebar item, which can either be a navigation link or an action item, depending on the `isAction` prop.
 *
 * @param {Item} props - An object containing the properties of the sidebar item.
 * @param {boolean} props.isAction - A boolean flag indicating whether the item is an action item (true) or a navigation link (false).
 * @param {string} props.name - The name or label of the sidebar item.
 * @param {string} props.iconClass - The CSS class for the icon associated with the sidebar item.
 * @param {string} props.route - The route to navigate to if the item is not an action item.
 * @param {Function} props.action - The action to perform when the item is clicked if it is an action item.
 * @returns A component that renders a sidebar item as either a navigation link or an action item.
 */
export const SidebarItem = (props: Item) => {
    return (
        <>
            {props.isAction ?
                <span
                    className="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors no-decoration"
                    onClick={props.action}>
                    <i className={`pi ${props.iconClass} mr-2`}></i>
                    <span className="font-medium">{props.name}</span>
                </span>
                : <Link
                    className="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors no-decoration"
                    to={props.route}>
                    <i className={`pi ${props.iconClass} mr-2`}></i>
                    <span className="font-medium">{props.name}</span>
                </Link>
            }
        </>
    );
}
