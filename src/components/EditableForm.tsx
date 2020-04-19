import React from 'react'
import { observer } from 'mobx-react'
import { FormAttrsStore } from '../stores/FormAttrsStore'
import { useDrop } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import formStore, { FormStore } from '../stores/FormStore'
import EditableField from './EditableField'

interface EditableFormProps {
    formAttrs: FormAttrsStore,
    form: FormStore
}

function EditableForm (props: EditableFormProps) {
    const { formAttrs, form } = props

    const [{ isOver, canDrop }, drop ] = useDrop({
        accept: [
            ItemTypes.FIELD
        ],
        drop: (item: any, monitor) => {
            if (item.type === ItemTypes.FIELD) {
                formStore.add(item.name)
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    return (
        <div ref={drop} className="editable-form" style={{
            width: formAttrs.formWidthString
        }}>
            {form.formItems.map(formItem => (
                <EditableField
                    key={formItem.id}
                    formItem={formItem}
                />
            ))}
        </div>
    )
}

export default observer(EditableForm)
