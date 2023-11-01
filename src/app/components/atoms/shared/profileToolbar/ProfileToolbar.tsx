type Props = {
    isVisible: boolean;
    username: string;
}

export const ProfileToolbar = ({isVisible, username}: Props) => {
    return (
        <ul className={`list-none p-0 m-0 ${isVisible? '': 'hidden'} lg:flex lg:align-items-center select-none lg:flex-row surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static`}>
            <li className="border-top-1 surface-border lg:border-top-none">
                <a className="flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer
                        transition-duration-150 transition-colors">
                    <i className="pi pi-user mr-4 text-900 text-lg"></i>
                    <div className="block">
                        <div className="text-900 font-medium">{username}</div>
                    </div>
                </a>
            </li>
        </ul>
    );
}