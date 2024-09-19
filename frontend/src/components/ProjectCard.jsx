import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProjectStore } from "../store/project";

const ProjectCard = ({ project }) => {
  const [updatedProject, setUpdatedProject] = useState(project);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  const { deleteProject, updateProject } = useProjectStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toastMessage = (success, message) => {
    if (success) {
      toast({
        // title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteProject = async (pid) => {
    const { success, message } = await deleteProject(pid);
    toastMessage(success, message);
  };

  const handleUpdateProject = async (pid, updatedProject) => {
    const { success, message } = await updateProject(pid, updatedProject);
    onClose();
    toastMessage(success, message);
  };

  return (
    project.show && (
      <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bgColor}
      >
        <Image
          src={project.url_image}
          alt={project.name}
          h={48}
          w={"full"}
          objectFit={"cover"}
        />
        <Box p={4}>
          <Heading as={"h3"} size={"md"} color={textColor} mb={2}>
            {project.name}
          </Heading>
          <Text fontSize={"sm"} color={textColor} mb={2}>
            {project.description}
          </Text>
          {/* <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme={"blue"}
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteProject(project._id)}
              colorScheme={"red"}
            />
          </HStack> */}
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Project Name"
                  name="name"
                  value={updatedProject.name}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Description"
                  name="description"
                  value={updatedProject.description}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject,
                      description: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={updatedProject.url_image}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject,
                      url_image: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Live Preivew URL"
                  name="live preview"
                  value={updatedProject.url_live}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject,
                      url_live: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Source Code URL"
                  name="source code"
                  value={updatedProject.url_code}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject,
                      url_code: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Index"
                  name="index"
                  type="number"
                  value={updatedProject.index}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject,
                      index: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Show or Hide?"
                  name="show"
                  type="boolean"
                  value={updatedProject.show}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject,
                      show: e.target.value,
                    })
                  }
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme={"blue"}
                mr={3}
                onClick={() => handleUpdateProject(project._id, updatedProject)}
              >
                Update
              </Button>
              <Button variant={"ghost"} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    )
  );
};

export default ProjectCard;
