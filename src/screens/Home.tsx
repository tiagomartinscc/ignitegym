import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

import { Heading, HStack, VStack } from "@gluestack-ui/themed"
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { FlatList } from "react-native"
import { Text } from "@gluestack-ui/themed"
import { ExerciseCard } from "@components/ExerciseCard"

export function Home() {
  const [exercises, setExercises] = useState([
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'Levantamento terra',
  ])
  const [groupSelected, setGroupSelected] = useState('Costas')
  const [groups, setGroups] = useState([
    'Costas', 
    'Bíceps',
    'Tríceps',
    'Ombro'
  ])

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md">
            Exercícios
          </Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
          {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={() => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

      </VStack>
    </VStack>
  )
}