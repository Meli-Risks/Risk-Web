import {ButtonOptions, ProfileToolbar} from "../../../atoms";
import {useState} from "react";

type Props = {
    username: string;
}

export const ProfileNavItem = ({username}: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

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