type Props = {
    changeSidebarVisibility: () => void;
}

/**
 * ToggleNavButton is a React component that renders a button to toggle the visibility of the sidebar.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Function} props.changeSidebarVisibility - A function to toggle the visibility of the sidebar.
 * @returns - The rendered React component.
 */
export const ToggleNavButton = ({changeSidebarVisibility}: Props) => {
    return (
        <div className="flex">
            <div id="btn-toggle"
               onClick={changeSidebarVisibility}
               className="cursor-pointer block lg:hidden text-700 mr-3">
                <i id="icon-toggle" className="pi pi-bars text-lg" />
            </div>
        </div>
    );
}
