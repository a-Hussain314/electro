import React from "react";
import { createClient } from "contentful";
import { generalContext } from "../context/mainContext";
import { ProjectSection } from "../componenets/projectSction";
import { contentfulImageUrlFactory } from "../utils/contentfulImageUrlFactory";
import { useRouter } from "next/router";
import Head from "next/head";

type homePageProps = { projects: any[] };
const Home = ({ projects = [] }: homePageProps) => {
  const router = useRouter();
  const { contextData, setContextData }: any = React.useContext(generalContext);

  const onButtonClick = () => {
    setContextData(new Date().toLocaleString());
  };

  return (
    <>
      <Head>
        <title>Electro</title>
        <meta name="description" content={"electro website description"} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://electro-nu.vercel.app`} />
        <meta
          property="og:description"
          content={"electro website description"}
        />
        <meta
          property="og:image"
          content={"https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo_ligne_E_Narbonne.png"}
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://electro-nu.vercel.app`}
        />
        <meta
          property="twitter:description"
          content={"electro website description"}
        />
        <meta
          property="twitter:image"
          content={"https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo_ligne_E_Narbonne.png"}
        />
      </Head>
      <div className="container" dir="auto">
        <p>{router.locale === "en" ? "Home page" : "الصفحة الرئيسية"}</p>

        {!!projects.length ? (
          projects.map((project: any) => {
            return (
              <ProjectSection
                key={project?.sys?.id || Math.random()}
                id={project?.sys?.id}
                title={
                  project?.fields[
                    router.locale === "en" ? "name_en" : "name_ar"
                  ]
                }
                thumbnail={contentfulImageUrlFactory(
                  project?.fields?.thumbnail?.fields?.file?.url
                )}
                imageAlt={project?.fields?.name}
                showDescription={false}
              />
            );
          })
        ) : (
          <p>There are no projects</p>
        )}
      </div>
    </>
  );
};

export default Home;

// This gets called on every request
export async function getServerSideProps() {
  const contentfulData: { space: string; accessToken: string } = {
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || " ",
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY || " ",
  };
  const client = createClient(contentfulData);
  const res = await client.getEntries({ content_type: "project" });
  return { props: { projects: res?.items } };
}
