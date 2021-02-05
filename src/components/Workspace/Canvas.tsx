import React, {useState, useEffect} from 'react'
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams'
import type {Node, DiagramSchema} from 'beautiful-react-diagrams/@types/DiagramSchema'
import uniqBy from 'lodash/uniqBy'

import 'beautiful-react-diagrams/styles.css'
import * as AuthAPI from '../../api/auth'
import CanvasNode from './CanvasNode'
import type {IChat} from '../../types'

interface IWorkspaceCanvas {
  id: string
  chats: IChat[]
}

const WorkspaceCanvas = ({id, chats}: IWorkspaceCanvas) => {
  const [nodeList, setNodeList] = useState([] as Array<Node<unknown>>)
  const initialSchema = createSchema({nodes: nodeList, links: []})

  const [schema, {addNode, onChange}] = useSchema(initialSchema)

  const handleOnChange = (newSchema: DiagramSchema<unknown>) => {
    onChange(newSchema)
    setNodeList(newSchema.nodes as [])
  }

  useEffect(() => {
    const unauthUsersNodeList = AuthAPI
      .readUnauthenticatedUsers((currentUsers: any[]) => {
        setNodeList(currentUsers)
      })

    return () => unauthUsersNodeList
  }, [])

  useEffect(() => {
    if (!nodeList) return

    for (const node of nodeList) {
      addNode(node)
    }
  }, [addNode, nodeList])

  const getUserLastMessage = (userId: string) => {
    const userMessages = chats.filter(user => user.uid === userId)

    if (
      userMessages.length >= 1 &&
      userMessages[userMessages.length - 1]
    ) {
      return userMessages[userMessages.length - 1].content
    }
    return 'Hello!'
  }

  // Iterate over nodes so we can have them w/ custom styles
  const getNodes = () => {
    if (schema.nodes.length === 0) return null

    return schema.nodes.map(node => ({
      ...node,
      render: CanvasNode,
      data: {
        lastMessage: getUserLastMessage(node.id),
        isCurrentNode: node.id === id
      },
      // We can only drag the active user
      disableDrag: node.id !== id
    }))
  }

  return (
    <Diagram
      schema={{
        links: [],
        nodes: uniqBy(getNodes(), 'id') as any
      }}
      onChange={handleOnChange}
    />
  )
}

export default WorkspaceCanvas
