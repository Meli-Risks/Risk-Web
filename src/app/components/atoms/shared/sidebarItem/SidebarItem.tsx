import {Link} from "react-router-dom";

export type Item = {
    isAction: boolean;
    name: string;
    iconClass: string;
    route: string;
    action: () => void;
}

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