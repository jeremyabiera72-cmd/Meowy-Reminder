import "./common.css";

export default function Loading({ message = "Loading..." }) {
    return (
        <div className="common-loading" role="status">
            <span className="common-loading__spinner" />
            <span className="common-loading__message">{message}</span>
        </div>
    );
}
