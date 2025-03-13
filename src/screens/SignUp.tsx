import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignUp() {
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
          <Center gap="$2" flex={1}>
            <Heading color="$gray100">
              Crie sua conta
            </Heading>
            
            <Input 
              placeholder="Nome" 
            />

            <Input 
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input 
              placeholder="Senha" 
              secureTextEntry
            />

            <Button title="Criar e acessar"/>
          </Center>

          <Button title="Voltar para o login" variant="outline" mt="$12"/>
        </VStack>

      </VStack>
    </ScrollView>
  )
}