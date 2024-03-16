import { UserContext } from '@/app/(tabs)/_layout'
import { useContext } from 'react'

export const useUser = () => {
    const user = useContext(UserContext)
    if (!user) throw new Error("User not found")

    return user
}