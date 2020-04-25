import React, { useRef } from 'react'
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import { Input, Radio, Checkbox, Select, Button, Row, Col } from 'antd'
import formAttrs from '../stores/FormAttrsStore'
import form, { OutputFormItem, FormItemType, InputItem, TextareaItem, RadioItem, CheckboxItem, SelectItem, ResultItem } from '../stores/FormStore'
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
        case FormItemType.RESULT:
            // const resultItem = formItem as (ResultItem & { isActive: boolean })

            return (
                <div>
                    <Radio.Group defaultValue="" style={{
                        height: 32,
                        lineHeight: '32px',
                        marginBottom: 16
                    }}>
                        <Radio value="合格">合格</Radio>
                        <Radio value="不合格">不合格</Radio>
                    </Radio.Group>

                    <Input.TextArea
                        placeholder="备注"
                    />
                </div>
            )

        case FormItemType.SELECT:
            const selectItem = formItem as (SelectItem & { isActive: boolean })

            return (
                <Select
                    value={selectItem.defaultValue}
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
                    value={checkboxItem.defaultValue}
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
                  value={radioItem.defaultValue}
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
                    value={textareaItem.defaultValue}
                    placeholder={textareaItem.placeholder}
                />
            )

        default:
            const inputItem = formItem as (InputItem & { isActive: boolean })

            return (
                <Input
                    value={inputItem.defaultValue || ''}
                    placeholder={inputItem.placeholder}
                />
            )
        }
    }

    if (formItem.itemType === FormItemType.LAYOUT) {
        return (
            <div
                ref={ref}
                className={classnames(
                    'field-editable field-editable-layout',
                    formItem.isActive ? 'field-editable-active' : ''
                )}
                style={{
                    opacity: isDragging ? 0.4 : 1
                }}
                onMouseDown={() => form.activate(formItem.id)}
            >
                {formItem.rows.map((row, rowIndex) => (
                    <Row key={rowIndex} gutter={5}>
                        {row.map((col, colIndex) => (
                            <Col key={colIndex} span={col.span}></Col>
                        ))}
                    </Row>
                ))}

                <Button className="btn-delete" type="danger" size="small" icon="delete" onClick={() => form.delete(formItem.id)}>删除</Button>
            </div>
        )
    }

    if (formItem.itemType === FormItemType.TEXT) {
        return (
            <div
                ref={ref}
                className={classnames(
                    'field-editable field-editable-text',
                    formItem.isActive ? 'field-editable-active' : ''
                )}
                style={{
                    opacity: isDragging ? 0.4 : 1
                }}
                onMouseDown={() => form.activate(formItem.id)}
            >
                <div
                    style={{
                        fontSize: formItem.fontSize,
                        lineHeight: `${formItem.lineHeight}px`,
                        textAlign: formItem.textAlign
                    }}
                >
                    {formItem.content}
                </div>

                <Button className="btn-delete" type="danger" size="small" icon="delete" onClick={() => form.delete(formItem.id)}>删除</Button>
            </div>
        )
    }

    return (
        <div
            ref={ref}
            className={classnames(
                'field-editable',
                formAttrs.labelAlign === 'top' ? 'label-standalone' : '',
                formItem.isActive ? 'field-editable-active' : ''
            )}
            style={{
                opacity: isDragging ? 0.4 : 1
            }}
            onMouseDown={() => form.activate(formItem.id)}
        >
            <div className={classnames('field-editable-label', formAttrs.labelAlign === 'top' ? 'field-standalone' : '')} style={{
                width: formAttrs.labelWidth,
                ...(formAttrs.labelAlign !== 'top' ? {
                    textAlign: formAttrs.labelAlign
                } : {})
            }}>
                {(formItem as any).labelText}
            </div>
            <div className='field-editable-content'>
                {renderFormItem(formItem)}
            </div>

            <Button className="btn-delete" type="danger" size="small" icon="delete" onClick={() => form.delete(formItem.id)}>删除</Button>
        </div>
    )
}

export default observer(EditableField)
