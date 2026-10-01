import stickerImg from "../../assets/images/sticker.png";
import "./meowy.css";

const sizeMap = {
    small: 64,
    medium: 96,
    large: 140,
};

export default function Meowy({ size = "medium", message }) {
    const px = sizeMap[size] ?? 64;

    return (
        <div className={`meowy meowy--${size}`}>
            <img
                src={stickerImg}
                alt="Meowy"
                className="meowy__sticker"
                width={px}
                height={px}
                style={{ objectFit: "contain" }}
            />

            {message && <p className="meowy__caption">{message}</p>}
        </div>
    );
}
