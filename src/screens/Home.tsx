import { useState } from "react";
import { HStack, VStack } from "@gluestack-ui/themed";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList } from "react-native";

export function Home() {
  const [groupSelected, setGroupSelected] = useState('Costas')
  const [groups, setGroups] = useState([
    'Costas', 
    'Bíceps',
    'Tríceps',
    'Ombro'
  ])

  return (
    <VStack>
      <HomeHeader />
      <HStack>

        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({item}) =>
            <Group 
              name={item}
              isActive={groupSelected === item}  
              onPress={() => setGroupSelected(item)}
            /> 
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 32}}
          style={{marginVertical: 40, maxHeight: 44, minHeight: 44}}
        />
       
      </HStack>
    </VStack>
  )
}