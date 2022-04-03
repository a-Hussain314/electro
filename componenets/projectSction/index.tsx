import Link from "next/link";
import styles from "./projectSection.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

type projectCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  thumbnailWidth?: string | number;
  thumbnailHeight?: string | number;
  imageAlt?: string;
  description?: any;
  showDescription?: boolean;
  images?: string[];
  showImages?: boolean;
};

export const ProjectSection = ({
  id,
  title = " ",
  thumbnail = " ",
  imageAlt = "Project",
  description = {},
  showDescription = true,
  images = [],
  showImages = false,
}: projectCardProps) => {
  return (
    <>
      <div className={styles.projectCard}>
        <div className={styles.thumbnailContainer}>
          <Link href={`/project/${id}`}>
            <a>
              <img
                src={thumbnail}
                alt={imageAlt}
                title={title}
                loading="lazy"
              />
            </a>
          </Link>
        </div>
        <div dir="auto" className={styles.dataContainer}>
          <Link href={`/project/${id}`}>
            <a>
              <h3>{title}</h3>
            </a>
          </Link>
          <div className={styles.description}>
            {!!showDescription && documentToReactComponents(description)}
          </div>
        </div>
      </div>
      {!!showImages && (
        <div className={styles.imagesSection}>
          {images.map((url, index) => {
            return (
              <div className={styles.imageContainer}>
                <img key={index} src={url} alt={"temp"} loading="lazy" />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
