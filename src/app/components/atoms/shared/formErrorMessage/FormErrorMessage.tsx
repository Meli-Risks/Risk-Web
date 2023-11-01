import {DeepRequired, FieldErrorsImpl, FieldValues, GlobalError} from "react-hook-form";

export type ErrorType = Partial<FieldErrorsImpl<DeepRequired<FieldValues>>> & {
    root?: Record<string, GlobalError> & GlobalError
};

type Props = {
    name: string;
    errorsForm: ErrorType;
}
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