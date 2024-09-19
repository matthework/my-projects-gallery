import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProjectStore } from "../store/project";

const CreatePage = () => {
  const [newProject, setNewProject] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();

  const { createProject } = useProjectStore();

  const handleAddProject = async () => {
    const { success, message } = await createProject(newProject);
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "Errors",
        description: message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Project
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Project Name"
              name="name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              name="desc"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProject.url_image}
              onChange={(e) =>
                setNewProject({ ...newProject, url_image: e.target.value })
              }
            />
            <Input
              placeholder="Live View URL"
              name="live"
              value={newProject.url_live}
              onChange={(e) =>
                setNewProject({ ...newProject, url_live: e.target.value })
              }
            />
            <Input
              placeholder="Source Code URL"
              name="code"
              value={newProject.url_code}
              onChange={(e) =>
                setNewProject({ ...newProject, url_code: e.target.value })
              }
            />
            <Input
              placeholder="Index"
              name="index"
              type="number"
              value={newProject.index}
              onChange={(e) =>
                setNewProject({ ...newProject, index: e.target.value })
              }
            />
            <Input
              placeholder="Show or Hide?"
              name="show"
              type="boolean"
              value={newProject.show}
              onChange={(e) =>
                setNewProject({ ...newProject, show: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProject} w="full">
              Add Project
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
