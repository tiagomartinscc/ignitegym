import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'

import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from 'react';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleLogin() {
    navigation.navigate('signIn')
  }

  function handleSignUp() {
    console.log({
      name,
      email,
      password,
      passwordConfirm
    });
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
          <Center gap="$2" flex={1}>
            <Heading color="$gray100">
              Crie sua conta
            </Heading>
            
            <Input 
              placeholder="Nome"
              onChangeText={setName}
            />

            <Input 
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
            />

            <Input 
              placeholder="Senha" 
              secureTextEntry
              onChangeText={setPassword}
            />

            <Input 
              placeholder="Confirme a senha" 
              secureTextEntry
              onChangeText={setPasswordConfirm}
            />            

            <Button 
              title="Criar e acessar"
              onPress={handleSignUp}
            />
          </Center>

          <Button 
            title="Voltar para o login"
            variant="outline"
            mt="$12"
            onPress={handleLogin}  
          />
        </VStack>

      </VStack>
    </ScrollView>
  )
}