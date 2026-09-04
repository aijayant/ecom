import { useQuery } from '@tanstack/react-query'
import * as userApi from '../api/userApi'

export const useUsers = (params) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: async () => {
      const response = await userApi.getUsers(params)
      return response.data
    },
    // Keep previous data on the screen while fetching the next page
    placeholderData: (previousData) => previousData,
  })
}
