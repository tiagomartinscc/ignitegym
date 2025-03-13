import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'

import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  const navigator = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigator.navigate('signUp')
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1}}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          w="$full"
          h={624}
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          position="absolute"
        />
        <Center my="$24">
          <Logo />

          <Text color="$gray100" fontSize="$sm">
            Treine a sua mente e seu corpo
          </Text>
        </Center>

        <VStack flex={1} px="$10" pb="$16">
          <Center gap="$2">
            <Heading color="$gray100">
              Acesse a conta
            </Heading>
            <Input 
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input 
              placeholder="Senha" 
              secureTextEntry
            />

            <Button title="Acessar"/>
          </Center>

          <Center flex={1} justifyContent="flex-end" mt='$4'>
            <Text color="$gray100" fontSize='$sm' mb='$3' fontFamily="$body" >Ainda não tem acesso?</Text>
            <Button 
              title="Criar conta" 
              variant="outline"
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>

      </VStack>
    </ScrollView>
  )
}