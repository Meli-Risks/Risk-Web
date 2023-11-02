import image from '../../../../../assets/images/logo.jpeg';

type Props = {
    title: string;
    message: string;
}

/**
 * HeaderForm component for displaying a header in a form.
 *
 * @param props - The component's properties.
 * @param props.title - The title to display in the header.
 * @param props.message - The message to display in the header.
 * @returns A header component for a form with a title, message, and an image.
 */
export const HeaderForm = (props: Props) => {
    return (
        <div className="text-center mb-5">
            <img src={image}
                 alt="logo"
                 className="mb-5 w-15rem"/>
            <div className="text-900 text-3xl font-medium mb-3">{props.title}</div>
            <span className="text-600 font-medium">{props.message}</span>
        </div>
    );
}
