import styles from "./layout.module.scss";
import { useRouter } from "next/router";
import { FiPhone, FiMail } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io5"
import { FaFacebookSquare } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

export const Footer = () => {
    const router = useRouter();
    return (
        <footer className={styles.footer}>
            <div className={styles.miniFooter}>
                <div className={`container`}>
                    <p>{`Abou © Copyrights ${new Date().getFullYear()}. All Rights Reserved.`}</p>
                </div>
            </div>
        </footer>
    );
};