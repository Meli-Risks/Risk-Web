import './Footer.css';

export const Footer = () => {
    return (
        <div className="flex justify-content-center my-4">
            <span className="text-500">Copyright © {new Date().getFullYear()} Meli Risks</span>
        </div>
    );
}