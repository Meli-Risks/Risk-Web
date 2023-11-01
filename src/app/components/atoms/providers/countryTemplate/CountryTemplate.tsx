import {CountryResponse} from "../../../../lib";

type Props = {
    option: CountryResponse;
}

/**
 * CountryTemplate component for rendering a country option.
 *
 * @param props - The component's properties.
 * @param props.option - The country option to be displayed.
 * @returns A component for rendering a country option with its flag and name.
 */
export const CountryTemplate = ({option}: Props) => {
  return (
      <div className="flex align-items-center">
          <div>{option.flag} {option.name}</div>
      </div>
  );
}