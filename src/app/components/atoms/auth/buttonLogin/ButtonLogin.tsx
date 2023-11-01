import './ButtonLogin.css';
import {Button} from "primereact/button";

type Props = {
  loading: boolean;
}

/**
 * ButtonLogin component for login action.
 *
 * @param props - The component's properties.
 * @param props.loading - A boolean indicating whether the button is in a loading state.
 * @returns A button component for login with optional loading indicator.
 */
export const ButtonLogin = (props: Props) => {
  return (
      <div className="text-center">
        <Button severity="info"
                type="submit"
                className="w-full"
                disabled={props.loading}
                label={props.loading? 'Cargando...': 'Login'}
                loading={props.loading}
                rounded />
      </div>
  );
}
