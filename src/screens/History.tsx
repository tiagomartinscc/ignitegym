import { useCallback, useState } from 'react'
import { SectionList } from 'react-native'
import { Heading, VStack, Text, useToast } from '@gluestack-ui/themed'

import { api } from '@services/api'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { ToastMessage } from '@components/ToastMessage'

import { AppError } from '@utils/AppError'
import { useFocusEffect } from '@react-navigation/native'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'
import { Loading } from '@components/Loading'

export function History() {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  async function fetchHistory() {
    try {
      setIsLoading(true)
      const {data} = await api.get('history')
      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível obter o histórico. Tente novamente mais tarde'
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <ToastMessage
            id={id}
            title={title}
            action="error"
            onClose={() => toast.close(id)}
        /> )
      })      
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory()
  }, []))  

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />
      {isLoading ? <Loading /> : (
        <SectionList
          sections={exercises}
          keyExtractor={item => item.id}
          renderItem={({item}) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3">
              {section.title}
            </Heading>
          )}
          style={{ paddingHorizontal: 32 }}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          ListEmptyComponent={() => (
            <Text color="$gray200" textAlign="center">
              Não há exercícios registrados ainda. {'\n'}
              Vamos fazer execícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  )
}