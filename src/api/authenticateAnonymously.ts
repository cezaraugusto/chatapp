import {auth} from './firebase'

export const authenticateAnonymously = async (): Promise<void> => {
  if (!auth().currentUser) {
    try {
      await auth().signInAnonymously()
    } catch (error) {
      console.error({error})
    }
  }
}
