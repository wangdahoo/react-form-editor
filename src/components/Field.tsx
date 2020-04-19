import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import { observer } from 'mobx-react'

interface FieldProps {
    name: string,
    text: string
}

function Field (props: FieldProps) {
    const { name, text } = props

    const [ { isDragging }, drag ]  = useDrag({
        item: { name, type: ItemTypes.FIELD },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div ref={drag} className="field" style={{
            opacity: isDragging ? 0.4 : 1
        }}>
            {text}
        </div>
    )
}

export default observer(Field)
