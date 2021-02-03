
import {db} from './firebase'

interface IReadUsers {
  (unauthenticatedUsers: any[]): void
}

export function readUnauthenticatedUsers (userCb: IReadUsers) {
  db.ref('unauthenticatedUsers').on('value', snapshot => {
    if (!snapshot || !snapshot.val()) return

    const unauthenticatedUsers: any[] = []
    const currentUsers: any[] = Object.values(snapshot.val())

    for (const user of currentUsers) {
      unauthenticatedUsers.push(user)
    }

    userCb(unauthenticatedUsers)
  })
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
      id: `${uid}-${username}`,
      content: username,
      coordinates
    })
}
