type Props = {
    username: string;
}

/**
 * SidebarProfile component for rendering a user profile in the sidebar.
 * This component displays the user's profile information, including their username.
 *
 * @param {Props} props - An object containing the properties of the user profile.
 * @param {string} props.username - The username of the user to display in the profile.
 * @returns A component that renders the user profile in the sidebar.
 */
export const SidebarProfile = ({username}: Props) => {
  return (
      <div className="mt-auto">
          <hr className="mb-3 mx-3 border-top-1 surface-border"/>
          <div
              className="m-3 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors">
              <i className="pi pi-user mr-4 text-900 text-xl"></i>
              <span className="font-medium">{username}</span>
          </div>
      </div>
  );
}
