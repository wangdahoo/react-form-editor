import React from 'react'
import { Input, List, Button, Select } from 'antd'
import { observer } from 'mobx-react'
import form, { FormStore, FormItemType, FormItem, InputItem, TextareaItem, CheckboxItem, RadioItem, SelectItem } from '../stores/FormStore'

interface FieldAttrsProps {
    form: FormStore
}

function FieldAttrs (props: FieldAttrsProps) {
    const { form } = props
    const { id, labelText, itemType } = form.activeItem

    function onChangeAttrs (newItem: FormItem) {
        form.update(newItem)
    }

    const renderInputExtraAttrs = (item: InputItem|TextareaItem) => {
        return (
            <>
                <div className="attr-item">
                    <div className="label">输入提示</div>
                    <Input className="input" value={item.placeholder} onChange={e => onChangeAttrs({
                        ...item,
                        placeholder: e.target.value
                    })} />
                </div>

                <div className="attr-item">
                    <div className="label">默认值</div>
                    <Input className="input" value={item.defaultValue} onChange={e => onChangeAttrs({
                        ...item,
                        defaultValue: e.target.value
                    })} />
                </div>
            </>
        )
    }

    const renderItemOptions = (item: CheckboxItem|RadioItem|SelectItem) => {
        const { options } = item

        return (
            <>
                <div className="attr-item">
                    <div className="label">选项</div>

                    <List
                        size="small"
                        itemLayout="horizontal"
                        dataSource={options}
                        renderItem={(option, optionIndex) => (
                            <List.Item key={optionIndex}>
                                <div className="attr-item-option">
                                    <Input value={option.value} onChange={e => {
                                        form.updateOption(item.id, optionIndex, e.target.value)
                                    }}/>
                                    <Button type="danger" icon="delete" className="btn-delete-option" onClick={() => form.deleteOption(item.id, optionIndex)}>删除</Button>
                                </div>
                            </List.Item>
                        )}
                    />

                    <Button type="primary" onClick={() => form.addOption(item.id)} icon="plus">添加选项</Button>
                </div>
            </>
        )
    }

    const renderCheckboxExtraAttrs = (item: CheckboxItem) => {
        return (
            <>
                <div className="attr-item">
                    <div className="label">默认值</div>

                    <Select mode="tags" value={item.defaultValue as string[]} style={{ width: '100%' }} onChange={(values: string[]) => form.setCheckboxDefaultOption(item.id, values)}>
                        {item.options.map((option, optionIndex) => <Select.Option key={optionIndex} value={option.value}>{option.value}</Select.Option>)}
                    </Select>
                </div>
            </>
        )
    }

    const renderRadioExtraAttrs = (item: RadioItem) => {
        return (
            <>
                <div className="attr-item">
                    <div className="label">默认值</div>

                    <Select value={item.defaultValue as string} style={{ width: '100%' }} onChange={(value: string) => form.setRadioDefaultOption(item.id, value)}>
                        {item.options.map((option, optionIndex) => <Select.Option key={optionIndex} value={option.value}>{option.value}</Select.Option>)}
                    </Select>
                </div>
            </>
        )
    }

    const renderSelectExtraAttrs = (item: SelectItem) => {
        return (
            <>
                <div className="attr-item">
                    <div className="label">默认值</div>

                    <Select value={item.defaultValue as string} style={{ width: '100%' }} onChange={(value: string) => form.setSelectDefaultOption(item.id, value)}>
                        {item.options.map((option, optionIndex) => <Select.Option key={optionIndex} value={option.value}>{option.value}</Select.Option>)}
                    </Select>
                </div>
            </>
        )
    }

    return (
        <div className="attrs">
            <div className="attr-item">
                <div className="label">标识</div>
                <Input className="input" value={id} disabled={true} />
            </div>

            <div className="attr-item">
                <div className="label">标签文字</div>
                <Input className="input" value={labelText} onChange={e => onChangeAttrs({
                    ...form.activeItem,
                    labelText: e.target.value
                })} />
            </div>

            {itemType === FormItemType.INPUT ? renderInputExtraAttrs(form.activeItem as InputItem) : null}
            {itemType === FormItemType.TEXTAREA ? renderInputExtraAttrs(form.activeItem as TextareaItem) : null}

            {itemType === FormItemType.CHECKBOX ? renderItemOptions(form.activeItem as CheckboxItem) : null}
            {itemType === FormItemType.CHECKBOX ? renderCheckboxExtraAttrs(form.activeItem as CheckboxItem) : null}

            {itemType === FormItemType.RADIO ? renderItemOptions(form.activeItem as RadioItem) : null}
            {itemType === FormItemType.RADIO ? renderRadioExtraAttrs(form.activeItem as RadioItem) : null}

            {itemType === FormItemType.SELECT ? renderItemOptions(form.activeItem as SelectItem) : null}
            {itemType === FormItemType.SELECT ? renderSelectExtraAttrs(form.activeItem as SelectItem) : null}
        </div>
    )
}

export default observer(FieldAttrs)
