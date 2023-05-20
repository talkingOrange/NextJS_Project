import Seo from "@/components/@common/Seo";
import { useEffect, useState } from "react";
import Project from "../components/project/project";

export default function project({ projects }: any) {
  return (
    <div>
      <Seo title="PROJECT" />

      {projects.results?.map((project: any) => (
        <Project data={project} key={project.id} />
      ))}
    </div>
  );
}

//서버에서 찍히는 부분
export async function getStaticProps() {
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      Authorization:
        "Bearer secret_vlMd7yCIqLbNC8RiDIXzeFBEcPJNpIeUTW4zrU1kgKb",
    },
    body: JSON.stringify({ page_size: 100 }),
  };

  const res = await fetch(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    options
  );

  const projects = await res.json();

  return {
    props: { projects }, // will be passed to the page component as props
  };
}
