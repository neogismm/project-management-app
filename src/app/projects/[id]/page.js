'use client'

import React from 'react'
import CustomKanban from '@/components/KanbanBoard'

const Kanban = ({ params }) => {
  return (
    <div> <CustomKanban projectId={params.id} /> </div>
  )
}

export default Kanban