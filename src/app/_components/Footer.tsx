import { Box, HStack, Text } from "@yamada-ui/react"

export const Footer = () => {
  return (
    <Box w="full" mt="xl" px="lg" py="md" bg="white" borderTopWidth="2px" borderColor="gray.100">
      <HStack justify="space-between">
        <Text>© 2024 sample</Text>
      </HStack>
    </Box>
  )
}