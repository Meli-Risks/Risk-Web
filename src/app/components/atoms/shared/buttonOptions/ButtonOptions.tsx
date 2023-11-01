type Props = {
    changeVisibility: () => void;
}
export const ButtonOptions = ({changeVisibility}: Props) => {
  return (
      <a className="cursor-pointer block lg:hidden text-700" onClick={changeVisibility}>
          <i className="pi pi-ellipsis-v text-lg"></i>
      </a>
  );
}