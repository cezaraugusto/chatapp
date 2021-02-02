
import {db} from './firebase'

export function readUnauthenticatedUsers () {
  const chatHistory: string[] = []

  db.ref('unauthenticatedUsers').on('value', snapshot => {
    if (!snapshot || !snapshot.val()) return

    const currentChatHistory: string[] = Object.values(snapshot.val())

    for (const chat of currentChatHistory) {
      chatHistory.push(chat)
    }
  })

  return chatHistory
}

interface IUnauthenticatedUserNode {
  username: string
  uid: string
  coordinates: number[]
}

export function setUnauthenticatedUserNode (
  {username, uid, coordinates}: IUnauthenticatedUserNode
) {
  db.ref('unauthenticatedUsers')
    .push({
      node: {
        id: uid,
        content: username,
        coordinates
      },
      link: [
        {input: null, output: null}
      ]
    })
}
