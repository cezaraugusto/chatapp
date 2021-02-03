import React, {useState, useEffect, useMemo} from 'react'
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams'
import type {DiagramSchema} from 'beautiful-react-diagrams/@types/DiagramSchema'
import uniqBy from 'lodash/uniqBy'

import 'beautiful-react-diagrams/styles.css'
import * as UsersAPI from '../../api/unauthenticatedUsers'
// The diagram model
// nodes: [
//   {id: 'node-1', content: 'Node 1', coordinates: [250, 60]},
//   {id: 'node-2', content: 'Node 2', coordinates: [100, 200]},
//   {id: 'node-3', content: 'Node 3', coordinates: [250, 220]},
//   {id: 'node-4', content: 'Node 4', coordinates: [400, 20]}
// ],
// links: [
//   {input: 'node-1', output: 'node-2'},
//   {input: 'node-1', output: 'node-3'},
//   {input: 'node-1', output: 'node-4'}
// ]

const WorkspaceCanvas = () => {
  const [nodeList, setNodeList] = useState([])
  const initialSchema = createSchema({nodes: nodeList, links: []})

  const [schema, {addNode, onChange}] = useSchema(initialSchema)

  const handleOnChange = (newSchema: DiagramSchema<unknown>) => {
    onChange(newSchema)
  }

  useEffect(() => {
    const unauthUsers = UsersAPI
      .readUnauthenticatedUsers((currentUsers) => {
        setNodeList(currentUsers as any)
      })

    return () => unauthUsers
  }, [])

  useMemo(() => {
    const addNodeList = nodeList.map(node => addNode(node))

    return () => addNodeList
  }, [addNode, nodeList])

  return (
    <div style={{height: '550px'}}>
      <Diagram
        schema={{
          links: [],
          nodes: uniqBy(schema.nodes, 'id')
        }}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default WorkspaceCanvas
