import { ComponentProps } from 'react'
import { Button as GlueStackButton, Text, ButtonSpinner} from '@gluestack-ui/themed'

type Props = ComponentProps<typeof GlueStackButton> & {
  title: string
  variant?: 'solid' | 'outline'
  isLoading?: boolean
}

export function Button ({title, isLoading=false, variant='solid', ...rest}: Props) {
  return (
    <GlueStackButton
      w="$full"
      h="$14"
      bg={variant === 'solid' ? '$green700' : 'transparent' }
      borderWidth={variant === 'solid' ? '$0' : '$1' }
      borderColor='$green500'
      rounded="$sm"
      $active-bg={variant === 'solid' ? '$green500' : '$gray500'}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <ButtonSpinner color='$green500' /> : (
        <Text
          color={variant === 'solid' ? '$white' : '$green500'}
          fontFamily='$heading'
          fontSize='$sm'
        >
          {title}
        </Text>
      )}
    </GlueStackButton>
  )
}

