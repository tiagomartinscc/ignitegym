import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack } from "@gluestack-ui/themed";

export function Home() {
  return (
    <VStack>
      <HomeHeader />
      <Group name="Costas" isActive={false}  />
    </VStack>
  )
}