import { createContext, ReactNode, useState } from "react"
import { UserDTO } from "@dtos/UserDTO"

export type AuthContextDataProps = {
  user: UserDTO
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [user, setUser] = useState({
    user: {
      id: '1',
      name: 'Tiago',
      email: 'tiagomartinscc@hotmail.com',
      avatar: ''
    }
  })

  return (
      <AuthContext.Provider value={user}>
        {children}
      </AuthContext.Provider>
  )
}

