import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'

import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

export function SignUp() {
  const { control, } = useForm()

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleLogin() {
    navigation.navigate('signIn')
  }

  function handleSignUp() {
    console.log({
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
            
            <Controller 
              control={control}
              name="name"
              render={({field: {onChange, value}}) => (
                <Input 
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

          <Controller 
            control={control}
            name="email"
            render={({field: {onChange, value}}) => (
              <Input 
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

        <Controller 
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <Input 
                placeholder="Senha" 
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller 
            control={control}
            name="confirm_password"
            render={({field: {onChange, value}}) => (          
              <Input 
                placeholder="Confirme a senha" 
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />            
            )}
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