import { getCollection, render } from "astro:content";
import { getGitInfo } from "../remark/remark-git-info";

const projectsCollection = await getCollection("projects");
const projectsContentCollection = await getCollection("projectsContent");

export const defaultProjectsCollection = await Promise.all(
  projectsContentCollection.map(async (content) => {
    const project = projectsCollection.find((project) => project.data.contentPath === content.data.contentPath);
    if (!project) {
      throw new Error(`Project not found for contentPath: ${content.data.contentPath}`);
    }
    const { remarkPluginFrontmatter } = await render(content);
    const gitInfo = getGitInfo(remarkPluginFrontmatter);
    return {
      ...content,
      data: {
        gitInfo,
        ...project.data,
        ...content.data,
      },
    };
  }),
);
