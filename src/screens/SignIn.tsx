
import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed"
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { Controller, useForm } from "react-hook-form"

type FormDataProps = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido'),
  password: yup.string().required('Informe seua senha.')
})

export function SignIn() {
  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  })

  function handleSignIn({email, password}: FormDataProps) {
    console.log({email, password});
  }    

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
                  errorMessage={errors.email?.message}                  
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
                  errorMessage={errors.password?.message}                     
                  />
                )}
            />

            <Button 
              title="Acessar"  
              onPress={handleSubmit(handleSignIn)}              
            />
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