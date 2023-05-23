import { useState } from "react"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import User from "./User"

export default function App() {

  const [people, setPeople] = useState([
    {name: "Jhon", id: 1},
    {name: "Peter", id: 2},
    {name: "Sue", id: 3},
  ])


  const handleDragEnd = (event) => {
    const {active, over} = event //detecting new and old elements
    //set elements in index and return new array
    setPeople((people) => {
      const oldIndex = people.findIndex(person => person.id === active.id) 
      const newIndex = people.findIndex(person => person.id === over.id)

      return arrayMove(people, oldIndex, newIndex)
      
      //to send it to a DB: 
      const newOrder = arrayMove(people, oldIndex, newIndex);
      fetch("",newOrder )
    })  
  }


  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      
      <h1 className="text-2xl font-bold">
        Dragable List
      </h1>

      <SortableContext
        items={people}
        strategy={verticalListSortingStrategy}
      >
        {people.map((user) => (
          <User user={user }  key={user.id}/>
        ))}
        
      </SortableContext>

    </DndContext>
  )
}
