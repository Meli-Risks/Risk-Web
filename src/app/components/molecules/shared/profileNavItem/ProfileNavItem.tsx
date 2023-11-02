import {ButtonOptions, ProfileToolbar} from "../../../atoms";
import {useState} from "react";

type Props = {
    username: string;
}

/**
 * ProfileNavItem is a React component that represents a profile navigation item with options.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {string} props.username - The username of the profile.
 * @returns - The rendered React component.
 */
export const ProfileNavItem = ({username}: Props) => {
    /**
     * State to control visibility of profile options
     */
    const [isVisible, setIsVisible] = useState<boolean>(false);

    /**
     * Function to toggle visibility of profile options
     */
    const changeVisibility = (): void => {
      setIsVisible(!isVisible);
    }

    return (
        <>
            <ButtonOptions changeVisibility={changeVisibility}></ButtonOptions>
            <ProfileToolbar isVisible={isVisible} username={username}></ProfileToolbar>
        </>
    );
}
