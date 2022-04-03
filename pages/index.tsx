import React from "react";
import { createClient } from "contentful";
import { generalContext } from "../context/mainContext";
import { ProjectSection } from "../componenets/projectSction";
import { contentfulImageUrlFactory } from "../utils/contentfulImageUrlFactory";
import { useRouter } from "next/router";

type homePageProps = { projects: any[] };
const Home = ({ projects = [] }: homePageProps) => {
  const router = useRouter();
  const { contextData, setContextData }: any = React.useContext(generalContext);

  const onButtonClick = () => {
    setContextData(new Date().toLocaleString());
  };

  return (
    <div className="container" dir="auto">
      <p>{router.locale === "en" ? "Home page" : "الصفحة الرئيسية"}</p>

      {!!projects.length ? (
        projects.map((project: any) => {
          return (
            <ProjectSection
              key={project?.sys?.id || Math.random()}
              id={project?.sys?.id}
              title={
                project?.fields[router.locale === "en" ? "name_en" : "name_ar"]
              }
              thumbnail={contentfulImageUrlFactory(
                project?.fields?.thumbnail?.fields?.file?.url
              )}
              thumbnailWidth={
                project?.fields?.thumbnail?.fields?.file?.details.image.width
              }
              thumbnailHeight={
                project?.fields?.thumbnail?.fields?.file?.details.image.height
              }
              imageAlt={project?.fields?.name}
              description={
                project?.fields[
                  router.locale === "en" ? "description_en" : "description_ar"
                ]
              }
              showDescription={false}
            />
          );
        })
      ) : (
        <p>There are no projects</p>
      )}
      
    </div>
  );
};

export default Home;

// This gets called on every request
export async function getServerSideProps() {
  const contentfulData: { space: string; accessToken: string } = {
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
  };
  const client = createClient(contentfulData);
  const res = await client.getEntries({ content_type: "project" });
  return { props: { projects: res?.items } };
}
