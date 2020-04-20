import React, { useRef } from 'react'
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import { Input, Radio, Checkbox, Select } from 'antd'
import formAttrs from '../stores/FormAttrsStore'
import { OutputFormItem, FormItemType, InputItem, TextareaItem, RadioItem, CheckboxItem, SelectItem } from '../stores/FormStore'
import { observer } from 'mobx-react'
import classnames from 'classnames'

interface EditableFieldProps {
    formItem: OutputFormItem
    formItemIndex: number
    moveFormItem: (dragIndex: number, hoverIndex: number) => void
}

function EditableField (props: EditableFieldProps) {
    const { formItem, formItemIndex, moveFormItem } = props

    const ref = useRef(null)

    const [, drop] = useDrop({
        accept: [ ItemTypes.EDITABLE_FIELD ],
        hover (item, monitor) {
            if (ref.current === null) {
                return
            }

            const dragIndex = (item as (DragObjectWithType & { index: number })).index
            const hoverIndex = formItemIndex
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = (ref.current as any).getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            if (clientOffset === null) return

            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveFormItem(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            ;(item as (DragObjectWithType & { index: number })).index = hoverIndex
        }
    })

    const [ { isDragging }, drag ]  = useDrag({
        item: { index: formItemIndex, type: ItemTypes.EDITABLE_FIELD },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    drag(drop(ref))

    const renderFormItem = (formItem: OutputFormItem) => {
        const { itemType } = formItem

        switch (itemType) {
        case FormItemType.SELECT:
            const selectItem = formItem as (SelectItem & { isActive: boolean })

            return (
                <Select
                    defaultValue={selectItem.defaultValue}
                    style={{width: '100%'}}
                >
                    {selectItem.options.map((option, optionIndex) => (
                        <Select.Option key={optionIndex} value={option.value}>
                            {option.text}
                        </Select.Option>
                    ))}
                </Select>
            )

        case FormItemType.CHECKBOX:
            const checkboxItem = formItem as (CheckboxItem & { isActive: boolean })

            return (
                <Checkbox.Group
                    defaultValue={checkboxItem.defaultValue}
                >
                    {checkboxItem.options.map((option, optionIndex) => (
                        <Checkbox key={optionIndex} value={option.value}>
                            {option.text}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            )

        case FormItemType.RADIO:
            const radioItem = formItem as (RadioItem & { isActive: boolean })

            return (
                <Radio.Group
                  defaultValue={radioItem.defaultValue}
                  buttonStyle={radioItem.buttonStyle}
                >
                  {radioItem.options.map((option, optionIndex) => (
                    <Radio.Button key={optionIndex} value={option.value}>
                      {option.text}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              )

        case FormItemType.TEXTAREA:
            const textareaItem = formItem as (TextareaItem & { isActive: boolean })

            return (
                <Input.TextArea
                    defaultValue={textareaItem.defaultValue}
                    placeholder={textareaItem.placeholder}
                />
            )

        default:
            const inputItem = formItem as (InputItem & { isActive: boolean })

            return (
                <Input
                    defaultValue={inputItem.defaultValue || ''}
                    placeholder={inputItem.placeholder}
                />
            )
        }
    }

    return (
        <div ref={ref} className={classnames('field-editable', formAttrs.labelAlign === 'top' ? 'label-standalone' : '')} style={{
            opacity: isDragging ? 0.4 : 1
        }}>
            <div className={classnames('field-editable-label', formAttrs.labelAlign === 'top' ? 'field-editable-label-top' : '')} style={{
                width: formAttrs.labelWidth,
                ...(formAttrs.labelAlign !== 'top' ? {
                    textAlign: formAttrs.labelAlign
                } : {})
            }}>
                {formItem.labelText}
            </div>
            <div className='field-editable-content'>
                {renderFormItem(formItem)}
            </div>
        </div>
    )
}

export default observer(EditableField)
