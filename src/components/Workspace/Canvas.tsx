import React, {useState, useEffect, useMemo} from 'react'
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams'
import type {DiagramSchema} from 'beautiful-react-diagrams/@types/DiagramSchema'
import uniqBy from 'lodash/uniqBy'

import 'beautiful-react-diagrams/styles.css'
import * as UsersAPI from '../../api/unauthenticatedUsers'
import CanvasNode from './CanvasNode'

const WorkspaceCanvas = () => {
  const [nodeList, setNodeList] = useState([])
  const initialSchema = createSchema({nodes: nodeList, links: []})

  const [schema, {addNode, onChange}] = useSchema(initialSchema)

  const handleOnChange = (newSchema: DiagramSchema<unknown>) => {
    onChange(newSchema)
    setNodeList(newSchema.nodes as any)
  }

  useEffect(() => {
    const unauthUsersNodeList = UsersAPI
      .readUnauthenticatedUsers((currentUsers) => {
        setNodeList(currentUsers as any)
      })

    return () => unauthUsersNodeList
  }, [])

  useEffect(() => {
    if (!nodeList) return

    for (const node of nodeList) {
      addNode(node)
    }
  }, [addNode, nodeList])

  // Iterate over nodes so we can have them w/ custom styles
  const getNodes = () => {
    if (schema.nodes.length === 0) return null

    return schema.nodes.map(node => ({
      ...node,
      render: CanvasNode
    }))
  }

  return (
    <div style={{height: '550px'}}>
      <Diagram
        schema={{
          links: [],
          nodes: uniqBy(getNodes(), 'id')
        }}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default WorkspaceCanvas
