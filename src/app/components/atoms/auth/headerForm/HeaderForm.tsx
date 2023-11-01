type Props = {
    title: string;
    message: string;
}

export const HeaderForm = (props: Props) => {
  return (
      <div className="text-center mb-5">
          <img
              src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.5.4/mercadolibre/logo__large_plus.png"
              alt="logo" className="mb-5 w-10rem"/>
          <div className="text-900 text-3xl font-medium mb-3">{props.title}</div>
          <span className="text-600 font-medium">{props.message}</span>
      </div>
  );
}