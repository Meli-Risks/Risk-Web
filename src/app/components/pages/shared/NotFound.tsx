import {Button} from "primereact/button";
import image from "../../../../assets/images/404.svg";
import {useNavigate} from "react-router-dom";

/**
 * `NotFound` is a component that represents a "Page not found" error page. It is displayed when a user tries to
 * access a resource that does not exist or is not available.
 */
export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
             style={{borderRadius: '53px'}}>
            <div className="flex justify-content-center align-items-center bg-yellow-500 border-circle"
                 style={{height: '3.2rem', width: '3.2rem'}}>
                <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
            </div>
            <h1 className="text-900 font-bold text-5xl mb-2">Page not found</h1>
            <div className="text-600 mb-5">Requested resource is not available.</div>
            <img src={image} alt="" className="mb-5" style={{width: '20rem'}}/>
            <Button icon="pi pi-arrow-left" label="Go back" text onClick={() => navigate(-1)} />
        </div>
    );
}
