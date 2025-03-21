import React, { useState } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { VStack, Text, Center, Heading, useToast } from "@gluestack-ui/themed"

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuth } from '@hooks/useAuth'
import { AppError } from "@utils/AppError"
import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import { api } from "@services/api"

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { ToastMessage } from '@components/ToastMessage'
import { yupResolver } from "@hookform/resolvers/yup"


type FormDataProps = {
  name: string
  email: string
  password: string
  old_password: string
  confirm_password: string
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.'),
  password: yup.string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable()
    .transform((value) => !!value ? value : null),
  old_password: yup.string().nullable(),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', (passwordValue, schema) => {
      if (passwordValue[0] == null || passwordValue[0] == undefined) {
        return schema
      }
      return schema
        .required('Informe a confirmação da senha.')
        .transform((value) => !!value ? value : null)
    }),
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const toast = useToast()
  const { user, updateUserProfile } = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({ 
    defaultValues: { 
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema) 
  });
  

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

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

        const fileExtension = photoUri.split('.').pop()
        const photoFile = {
          name: `${user.name}.${fileExtension}`.trim().toLowerCase().replaceAll(' ', '_'),
          uri: photoUri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        } as any

        console.log(photoFile)

        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append('avatar', photoFile)

        const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        const userUpdated = user
        userUpdated.avatar = avatarUpdatedResponse.data.avatar
        updateUserProfile(userUpdated)

        toast.show({
          placement: 'top',
          render: ({id}) => (
            <ToastMessage
              id={id}
              title="Upload da foto realizado com sucesso"
              action="success"
              onClose={() => toast.close(id)}
          />              
          )
        })

        // setUserPhoto(photoUri)
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? 
        error.message : 
        'Não foi possível carregar a imagem. Tente novamente mais tarde.'
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
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true)
      
      const userUpdated = user
      userUpdated.name = user.name

      await api.put('/users', data)

      await updateUserProfile(userUpdated)

      toast.show({
        placement: 'top',
        render: ({id}) => (
          <ToastMessage
            id={id}
            title="Perfil atualizado com sucesso!"
            action="success"
            onClose={() => toast.close(id)}
        />              
        )
      })      
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? 
        error.message : 
        'Não foi possível atualizar seu perfil. Tente novamente mais tarde.'
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
      setIsUpdating(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36}}>
        <Center mt="$6" px="$10">
          <UserPhoto 
            source={
              user.avatar 
                ? {uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} 
                : defaultUserPhotoImg} 
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
            render={({field: {onChange, value}}) => (
              <Input 
                placeholder="Senha antiga"
                bg="$gray600" 
                onChangeText={onChange}
                value={value}
                secureTextEntry 
                errorMessage={errors.old_password?.message} 
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <Input 
                placeholder="Nova senha"
                bg="$gray600" 
                onChangeText={onChange}
                value={value}
                secureTextEntry 
                errorMessage={errors.password?.message} 
              />
            )}
          />

          <Controller 
            control={control}
            name="confirm_password"
            render={({field: {onChange, value}}) => (
              <Input 
                placeholder="Confirme a nova senha"
                bg="$gray600" 
                onChangeText={onChange}
                value={value}
                secureTextEntry 
                errorMessage={errors.confirm_password?.message} 
              />
            )}
          />                 
          
          <Button 
            title="Atualizar" 
            isLoading={isUpdating}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>

        </Center>
      </ScrollView>
    </VStack>
  )
}