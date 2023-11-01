import {Item, SidebarItem} from "../../../atoms";

export type SectionItems = {
    items: Item[],
    name: string
}

export const SectionSidebarItems = ({items, name}: SectionItems) => {
    return (
        <li>
            <div className="p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                <span className="font-semibold text-800">{name}</span>
            </div>
            <ul className="list-none p-0 m-0 overflow-hidden">
                <li>
                    {items.map((item: Item, index: number) =>
                        <SidebarItem key={index} name={item.name} iconClass={item.iconClass} route={item.route}
                                     action={item.action} isAction={item.isAction}/>)}
                </li>
            </ul>
        </li>
    );
}