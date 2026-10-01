import "./common.css";

export default function Card({ children, title, description, action, className = "" }) {
    return (
        <section className={`common-card ${className}`}>
            {(title || description || action) && (
                <div className="common-card__header">
                    <div>
                        {title && <h2 className="common-card__title">{title}</h2>}

                        {description && <p className="common-card__description">{description}</p>}
                    </div>

                    {action && <div className="common-card__action">{action}</div>}
                </div>
            )}

            <div className="common-card__content">{children}</div>
        </section>
    );
}
