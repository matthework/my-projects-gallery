import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { useProjectStore } from "../store/project";

const HomePage = () => {
  const { fetchProjects, projects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r,cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          My Projects
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </SimpleGrid>
        {projects.length === 0 && (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            color={"gray.500"}
          >
            No project found.
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Add new project
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
