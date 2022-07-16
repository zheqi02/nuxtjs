import type { User } from '~/types'

const baseUrl = 'https://api.github.com'
const user = 'zhe-qi'
const url = `${baseUrl}/users/${user}`

export default async() => {
  const user: User = await $fetch(url)
  return user
}