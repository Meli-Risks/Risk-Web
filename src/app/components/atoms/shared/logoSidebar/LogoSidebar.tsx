import image from '../../../../../assets/images/logo.jpeg';

/**
 * LogoSidebar component for rendering the sidebar logo.
 * This component displays the logo image in the sidebar.
 *
 * @returns A component that renders the logo in the sidebar.
 */
export const LogoSidebar = () => {
  return (
      <div className="flex align-items-center px-5 my-2 flex-shrink-0" style={{height: '60px'}}>
          <img alt="logo" width="85%" src={image}/>
      </div>
  );
}
