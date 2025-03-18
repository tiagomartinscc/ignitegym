import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { Box } from '@gluestack-ui/themed'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { useAuth } from '@hooks/useAuth'

export function Routes() {
  const { user } = useAuth()
  
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700
  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}