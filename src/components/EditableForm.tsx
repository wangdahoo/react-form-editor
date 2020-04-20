import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { FormAttrsStore } from '../stores/FormAttrsStore'
import { useDrop } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import { FormStore } from '../stores/FormStore'
import EditableField from './EditableField'

interface EditableFormProps {
    formAttrs: FormAttrsStore,
    form: FormStore
}

function EditableForm (props: EditableFormProps) {
    const { formAttrs, form } = props
    const moveFormItem = useCallback((dragIndex: number, hoverIndex: number) => form.move(dragIndex, hoverIndex), [form.formItems])

    const [{ isOver, canDrop }, drop ] = useDrop({
        accept: [
            ItemTypes.FIELD
        ],
        drop: (item: any, monitor) => {
            if (item.type === ItemTypes.FIELD) {
                form.add(item.name)
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
            {form.formItems.map((formItem, index) => (
                <EditableField
                    key={formItem.id}
                    formItem={formItem}
                    formItemIndex={index}
                    moveFormItem={moveFormItem}
                />
            ))}
        </div>
    )
}

export default observer(EditableForm)
