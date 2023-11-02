import {DeepRequired, FieldErrorsImpl, FieldValues, GlobalError} from "react-hook-form";

export type ErrorType = Partial<FieldErrorsImpl<DeepRequired<FieldValues>>> & {
    root?: Record<string, GlobalError> & GlobalError
};

type Props = {
    name: string;
    errorsForm: ErrorType;
}

/**
 * FormErrorMessage component for rendering error messages in a form.
 *
 * @param props - The component's properties.
 * @param props.name - The name of the form field to display the error message for.
 * @param props.errorsForm - The errors object from react-hook-form.
 * @returns A component that displays an error message for a specified form field.
 */
export const FormErrorMessage = ({name, errorsForm}: Props) => {
    return (
        <>
            {errorsForm[name] ?
                // @ts-ignore
                <small className="p-error">{errorsForm[name].message}</small>
                : <small className="p-error">&nbsp;</small>}
        </>
    );
}
