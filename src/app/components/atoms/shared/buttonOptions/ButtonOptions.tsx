type Props = {
    changeVisibility: () => void;
}

/**
 * ButtonOptions component for rendering a button that triggers visibility change.
 *
 * @param props - The component's properties.
 * @param props.changeVisibility - A function to toggle visibility.
 * @returns A component that renders a button to change visibility.
 */
export const ButtonOptions = ({changeVisibility}: Props) => {
  return (
      <div className="cursor-pointer block lg:hidden text-700" onClick={changeVisibility}>
          <i className="pi pi-ellipsis-v text-lg"></i>
      </div>
  );
}
