import React, {useEffect} from 'react'
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams'
import type {DiagramSchema} from 'beautiful-react-diagrams/@types/DiagramSchema'

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
const schemaCreator = (schema: any) => createSchema({...schema})

const WorkspaceCanvas = (chatUserSchema: any) => {
  const initialSchema = schemaCreator(chatUserSchema)
  const [schema, {onChange}] = useSchema(initialSchema)

  const handleOnChange = (newSchema: DiagramSchema<unknown>) => {
    onChange(newSchema)
    console.log('mas mudaste!')
  }

  return (
    <div style={{height: '550px'}}>
      <Diagram schema={schema} onChange={handleOnChange} />
    </div>
  )
}

export default WorkspaceCanvas
