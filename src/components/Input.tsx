import { ComponentProps } from 'react'
import {
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlErrorText,
  FormControlError
} from '@gluestack-ui/themed'

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
}

export function Input ({
  isReadOnly = false, 
  errorMessage = null,
  isInvalid = false,
  ...rest}: Props
) {
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid} w="$full" mb="$4">
      <GluestackInput 
        h="$14"
        borderWidth="$0"
        borderRadius="$md"
        $focus={{
          borderWidth: 1,
          borderColor: '$green500'
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField
          px="$4"
          bg="$gray700"
          color='$white'
          fontFamily='$body'
          placeholderTextColor="$gray300"
          {...rest} 
        />
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText color='$red500'>
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}