import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./layout.module.scss";
import { GrLanguage } from "react-icons/gr";

export const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header_wrapper}`} dir="auto">
        <div>
          <Link href="/">
            <a>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo_ligne_E_Narbonne.png"
                alt="abou"
              />
            </a>
          </Link>
        </div>

        <div className={styles.navLinks}>
          {router.pathname === "/" ? (
            <>
              <a id="homeHeroSection">
                {router.locale === "ar" ? "الرئيسية" : "Home"}
              </a>
            </>
          ) : (
            <Link href="/">
              <a>{router.locale === "ar" ? "الرئيسية" : "Home"}</a>
            </Link>
          )}

          <Link
            href={router.asPath}
            locale={router.locale === "ar" ? "en" : "ar"}
          >
            <a>
              <span>{router.locale === "ar" ? "English" : "العربية"}</span>
              &nbsp;
              <GrLanguage />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};
