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

  useMemo(() => {
    const addNodeList = nodeList.map(node => addNode(node))

    return () => addNodeList
  }, [addNode, nodeList])

  // Iterate over nodes so we can have them w/ custom styles
  const customNodes = schema.nodes.map(node => ({
    ...node,
    render: CanvasNode,
    data: {coordinates: node.coordinates}
  }))

  return (
    <div style={{height: '550px'}}>
      <Diagram
        schema={{
          links: [],
          nodes: uniqBy(customNodes, 'id')
        }}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default WorkspaceCanvas
