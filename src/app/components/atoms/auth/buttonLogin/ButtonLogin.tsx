import './ButtonLogin.css';
import {Button} from "primereact/button";

type Props = {
  loading: boolean;
}

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