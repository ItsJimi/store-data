import Store from "../lib"

type StoreType = {
  users: {
    id: number
    name: string
  }[]
  isTest: boolean
}

const state = new Store<StoreType>({ save: false })

state.setSync('isTest', false)

state.setSync('users', [{
  id: 1,
  name: 'Jimi'
}])

const users = state.getSync('users')

console.log(users)
