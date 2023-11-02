import './Footer.css';

/**
 * Footer is a React component that displays the copyright information at the bottom of the page.
 *
 * @component
 * @returns - The rendered React component.
 */
export const Footer = () => {
    return (
        <div className="flex justify-content-center my-4">
            <span className="text-500">Copyright © {new Date().getFullYear()} Meli Risks</span>
        </div>
    );
}
