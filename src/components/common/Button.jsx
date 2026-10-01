import "./common.css";

export default function Button({
    children,
    type = "button",
    variant = "primary",
    size = "medium",
    disabled = false,
    loading = false,
    onClick,
    className = "",
}) {
    const classes = ["common-button", `common-button--${variant}`, `common-button--${size}`, className]
        .filter(Boolean)
        .join(" ");

    return (
        <button type={type} className={classes} disabled={disabled || loading} onClick={onClick}>
            {loading ? "Loading..." : children}
        </button>
    );
}
