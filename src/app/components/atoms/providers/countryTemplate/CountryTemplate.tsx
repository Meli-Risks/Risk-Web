import {CountryResponse} from "../../../../lib";

type Props = {
    option: CountryResponse;
}

export const CountryTemplate = ({option}: Props) => {
  return (
      <div className="flex align-items-center">
          <div>{option.flag} {option.name}</div>
      </div>
  );
}