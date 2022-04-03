import styles from "./layout.module.scss";

export const Footer = () => {
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