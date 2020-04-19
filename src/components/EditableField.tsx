import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import { Input, Radio, Checkbox, Select } from 'antd'
import formAttrs from '../stores/FormAttrsStore'
import { OutputFormItem, FormItemType, InputItem, TextareaItem, RadioItem, CheckboxItem, SelectItem } from '../stores/FormStore'
import { observer } from 'mobx-react'

interface EditableFieldProps {
    formItem: OutputFormItem
}

function EditableField (props: EditableFieldProps) {
    const { formItem } = props

    const [ { isDragging }, drag ]  = useDrag({
        item: { name, type: ItemTypes.EDITABLE_FIELD },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

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
        <div ref={drag} className="field-editable" style={{
            opacity: isDragging ? 0.4 : 1
        }}>
            <div className='field-editable-label' style={{
                width: formAttrs.labelWidth
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
