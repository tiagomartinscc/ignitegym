import { useState } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { VStack, Text, Center, Heading, useToast } from "@gluestack-ui/themed"

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { ToastMessage } from '@components/ToastMessage'
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuth } from '@hooks/useAuth'

type FormDataProps = {
  name: string
  email: string
  password: string
  old_password: string
  confirm_password: string
}

const profileSchema = yup.object({
  name: yup.string().required('Informe seu nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido'),
})

export function Profile({name, email}: FormDataProps) {
  const toast = useToast()
  const { user } = useAuth()
  console.log(user)
  const [userPhoto, setUserPhoto] = useState('https://github.com/tiagomartinscc.png')
  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email
    }
  })  

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })
      if (photoSelected.canceled) {
        return
      }
  
      const photoUri = photoSelected.assets[0].uri
      if (photoUri) {
        const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
          size: number
        }
        if(photoInfo.size && (photoInfo.size / 1024/ 1024) > 5) {
          return toast.show({
            placement: 'top',
            render: ({id}) => (
              <ToastMessage
                id={id}
                title="Essa Mensagem é muito grande"
                description="Escolha um aimagem com até 5MB."
                action="error"
                onClose={() => toast.close(id)}
            />              
            )
          })
        }
        setUserPhoto(photoUri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36}}>
        <Center mt="$6" px="$10">
          <UserPhoto 
            source={{uri: userPhoto}} 
            alt='Foto do usuário'
            size="xl"
          />
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize='$md'
              mt='$2'
              mb='$8'
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

        <Center w="$full" gap="$4">
          <Controller 
              control={control}
              name="name"
              render={({field: {onChange, value}}) => (
                <Input 
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  bg="$gray600"
                  errorMessage={errors.name?.message}                  
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
                  bg="$gray600"
                  isReadOnly={true}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}                  
                />
              )}
            />

        </Center>

        <Heading 
          alignSelf="flex-start"
          fontFamily="$heading"
          color="$gray200"
          fontSize="$md"
          mt="$12"
          mb="$2"
        >
          Alterar Senha
        </Heading>

        <Center w="$full" gap="$4">
          <Controller 
            control={control}
            name="old_password"
            render={({field: {onChange}}) => (
              <Input 
                placeholder="Senha antiga"
                bg="$gray600" 
                onChangeText={onChange}
                secureTextEntry 
                errorMessage={errors.old_password?.message} 
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({field: {onChange}}) => (
              <Input 
                placeholder="Nova senha"
                bg="$gray600" 
                onChangeText={onChange}
                secureTextEntry 
                errorMessage={errors.password?.message} 
              />
            )}
          />

          <Controller 
            control={control}
            name="confirm_password"
            render={({field: {onChange}}) => (
              <Input 
                placeholder="Confirme a nova senha"
                bg="$gray600" 
                onChangeText={onChange}
                secureTextEntry 
                errorMessage={errors.confirm_password?.message} 
              />
            )}
          />                 
          
          <Button 
            title="Atualizar" 
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>

        </Center>
      </ScrollView>
    </VStack>
  )
}