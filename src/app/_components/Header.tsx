import { Avatar, Box, HStack, Heading, Text } from "@yamada-ui/react"

export const Header = () => {
  return (
    <Box w="full" px="lg" py="md" bg="white">
      <HStack justify="space-between">
        <Heading as="h1" size="md" isTruncated>わたしの法学ノート</Heading>
        <HStack>
          <Avatar
            name="login user"
            src="https://github.com/ayanami77.png"
            bg="gray.100"
          />
          <Text>Seiya Tagami</Text>
        </HStack>
      </HStack>
    </Box>
  )
}