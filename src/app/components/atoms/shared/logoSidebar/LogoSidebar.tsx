import image from '../../../../../assets/images/logo.jpeg';

export const LogoSidebar = () => {
  return (
      <div className="flex align-items-center px-5 my-2 flex-shrink-0" style={{height: '60px'}}>
          <img alt="logo" width="85%" src={image}/>
      </div>
  );
}