type Props = {
    changeSidebarVisibility: () => void;
}

export const ToggleNavButton = ({changeSidebarVisibility}: Props) => {
    return (
        <div className="flex">
            <a id="btn-toggle"
               onClick={changeSidebarVisibility}
               className="cursor-pointer block lg:hidden text-700 mr-3">
                <i id="icon-toggle" className="pi pi-bars text-lg" />
            </a>
        </div>
    );
}