type Props = {
    username: string;
}

export const SidebarProfile = ({username}: Props) => {
  return (
      <div className="mt-auto">
          <hr className="mb-3 mx-3 border-top-1 surface-border"/>
          <a
              className="m-3 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors">
              <i className="pi pi-user mr-4 text-900 text-xl"></i>
              <span className="font-medium">{username}</span>
          </a>
      </div>
  );
}