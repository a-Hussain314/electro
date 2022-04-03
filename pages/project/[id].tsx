import React from "react";
import Head from "next/head";
import { createClient } from "contentful";
import { ProjectSection } from "../../componenets/projectSction";
import { contentfulImageUrlFactory } from "../../utils/contentfulImageUrlFactory";
import { useRouter } from "next/router";

type Props = {
  project: any;
};

const ProjectPage = (props: Props) => {
  let router = useRouter();
  let { project } = props;
  let projectImages = project?.fields?.images?.map((image: any) =>
    contentfulImageUrlFactory(image?.fields.file.url)
  );
  return (
    <div className="container">
      <Head>
        <title>
          Electro |{" "}
          {project?.fields[router.locale === "en" ? "name_en" : "name_ar"]}
        </title>
        <meta
          name="description"
          content={
            project?.fields[router.locale === "en" ? "name_en" : "name_ar"] +
            " description"
          }
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={`https://electro-nu.vercel.app/project/${project?.sys?.id}`}
        />
        <meta
          property="og:description"
          content={
            project?.fields[router.locale === "en" ? "name_en" : "name_ar"] +
            " description"
          }
        />
        <meta
          property="og:image"
          content={`${contentfulImageUrlFactory(
            project?.fields?.thumbnail?.fields?.file?.url
          )}`}
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://electro-nu.vercel.app/project/${project?.sys?.id}`}
        />
        <meta
          property="twitter:description"
          content={
            project?.fields[router.locale === "en" ? "name_en" : "name_ar"] +
            " description"
          }
        />
        <meta
          property="twitter:image"
          content={`${contentfulImageUrlFactory(
            project?.fields?.thumbnail?.fields?.file?.url
          )}`}
        />
      </Head>
      <ProjectSection
        key={project?.sys?.id || Math.random()}
        id={project?.sys?.id}
        title={project?.fields[router.locale === "en" ? "name_en" : "name_ar"]}
        thumbnail={contentfulImageUrlFactory(
          project?.fields?.thumbnail?.fields?.file?.url
        )}
        imageAlt={project?.fields?.name}
        description={
          project?.fields[
            router.locale === "en" ? "description_en" : "description_ar"
          ]
        }
        showImages={true}
        images={projectImages}
      />
    </div>
  );
};

export default ProjectPage;

export async function getServerSideProps(context: any) {
  const contentfulData: { space: string; accessToken: string } = {
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || " ",
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY || " ",
  };
  const client = createClient(contentfulData);
  const res = await client.getEntry(context?.params?.id);
  return { props: { project: res } };
}
