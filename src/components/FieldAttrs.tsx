import React from 'react'
import { Input, List, Button, Select, InputNumber, Radio } from 'antd'
import { observer } from 'mobx-react'
import { FormStore, FormItemType, FormItem, InputItem, TextareaItem, CheckboxItem, RadioItem, SelectItem, LayoutItem, TextItem, NumberItem } from '../stores/FormStore'

interface FieldAttrsProps {
    form: FormStore
}

function FieldAttrs (props: FieldAttrsProps) {
    const { form } = props
    const { id, itemType } = form.activeItem as any
    const labelText = (form.activeItem as any).labelText

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

    const renderNumberExtraAttrs = (item: NumberItem) => {
        return (
            <>
                <div className="attr-item">
                    <div className="label">最小值</div>
                    <InputNumber className="input" value={item.min} onChange={value => onChangeAttrs({
                        ...item,
                        min: Number(value)
                    })} />
                </div>

                <div className="attr-item">
                    <div className="label">最大值</div>
                    <InputNumber className="input" value={item.max} onChange={value => onChangeAttrs({
                        ...item,
                        max: Number(value)
                    })} />
                </div>

                <div className="attr-item">
                    <div className="label">默认值</div>
                    <InputNumber className="input" value={item.defaultValue} min={item.min} max={item.max} onChange={value => onChangeAttrs({
                        ...item,
                        defaultValue: Number(value)
                    })} />
                </div>

                <div className="attr-item">
                    <div className="label">单位</div>
                    <Input className="input" value={item.unit} onChange={e => onChangeAttrs({
                        ...item,
                        unit: e.target.value
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

    const renderLayoutExtraAttrs = (item: LayoutItem) => {
        const { rows } = item

        return (
            <>
                {rows.map((row, rowIndex) => {
                    return (
                        <div className="attr-item" key={rowIndex}>
                            <div className="label">列宽</div>

                            <List
                                size="small"
                                itemLayout="horizontal"
                                dataSource={row}
                                renderItem={(col, colIndex) => (
                                    <List.Item key={colIndex}>
                                        <div className="attr-item-option">
                                            <InputNumber
                                                className="input"
                                                value={col.span}
                                                min={1}
                                                max={24}
                                                step={1}
                                                onChange={value => {
                                                    form.updateColSpan(item.id, rowIndex, colIndex, Number(value))
                                                }}
                                            />
                                            <Button type="danger" icon="delete" className="btn-delete-option" onClick={() => form.deleteCol(item.id, rowIndex, colIndex)}>删除</Button>
                                        </div>
                                    </List.Item>
                                )}
                            />

                            <Button type="primary" onClick={() => form.addCol(item.id, rowIndex)} icon="plus">添加列</Button>
                        </div>
                    )
                })}
            </>
        )
    }

    const renderTextExtraAttrs = (item: TextItem) => {
        const { id, content, fontSize, lineHeight, textAlign } = item

        return (
            <>
                <div className="attr-item">
                    <div className="label">文字内容</div>

                    <Input.TextArea
                        value={content}
                        onChange={e => form.updateTextItem(id, e.target.value, fontSize, lineHeight, textAlign)}
                    />
                </div>

                <div className="attr-item">
                    <div className="label">文字大小</div>

                    <InputNumber
                        className="input"
                        value={fontSize}
                        min={12}
                        max={100}
                        step={1}
                        onChange={newFontSize => form.updateTextItem(id, content, Number(newFontSize), lineHeight, textAlign)}
                    />
                </div>

                <div className="attr-item">
                    <div className="label">文字行高</div>

                    <InputNumber
                        className="input"
                        value={lineHeight}
                        min={12}
                        max={100}
                        step={1}
                        onChange={newLineHeight => form.updateTextItem(id, content, fontSize, Number(newLineHeight), textAlign)}
                    />
                </div>


                <div className="attr-item">
                    <div className="label">对齐方式</div>

                    <Select
                        style={{ width: '100%' }}
                        value={textAlign}
                        onChange={(newTextAlign: 'left'|'right'|'center') => form.updateTextItem(id, content, fontSize, lineHeight, newTextAlign)}
                    >
                        <Select.Option value={'left'}>左对齐</Select.Option>
                        <Select.Option value={'right'}>右对齐</Select.Option>
                        <Select.Option value={'center'}>居中</Select.Option>
                    </Select>
                </div>
            </>
        )
    }

    const renderValidationAttrs = (item: InputItem|TextareaItem|CheckboxItem|RadioItem) => {
        return (
            <>
                <div className="attr-item">
                    <div className="label">是否必填</div>

                    <Radio.Group
                        value={item.required}
                        onChange={e => form.setRequired(item.id, e.target.value)}
                    >
                        <Radio value={true}>必填</Radio>
                        <Radio value={false}>选填</Radio>
                    </Radio.Group>
                </div>
            </>
        )
    }

    const hasLabelText = [
        FormItemType.INPUT,
        FormItemType.NUMBER,
        FormItemType.TEXTAREA,
        FormItemType.CHECKBOX,
        FormItemType.RADIO,
        FormItemType.SELECT
    ].indexOf(itemType) > -1

    const hasValidationAttrs = [
        FormItemType.INPUT,
        FormItemType.TEXTAREA,
        FormItemType.CHECKBOX,
        FormItemType.RADIO
    ].indexOf(itemType) > -1

    return (
        <div className="attrs">
            <div className="attr-item">
                <div className="label">标识</div>
                <Input className="input" value={id} disabled={true} />
            </div>

            {hasLabelText ? (
                <div className="attr-item">
                    <div className="label">标签文字</div>
                    <Input className="input" value={labelText} onChange={e => onChangeAttrs({
                        ...form.activeItem,
                        ...(labelText ? {

                        } : {})
                    })} />
                </div>
            ) : null}

            {itemType === FormItemType.INPUT ? renderInputExtraAttrs(form.activeItem as InputItem) : null}
            {itemType === FormItemType.NUMBER ? renderNumberExtraAttrs(form.activeItem as NumberItem) : null}
            {itemType === FormItemType.TEXTAREA ? renderInputExtraAttrs(form.activeItem as TextareaItem) : null}

            {itemType === FormItemType.CHECKBOX ? renderItemOptions(form.activeItem as CheckboxItem) : null}
            {itemType === FormItemType.CHECKBOX ? renderCheckboxExtraAttrs(form.activeItem as CheckboxItem) : null}

            {itemType === FormItemType.RADIO ? renderItemOptions(form.activeItem as RadioItem) : null}
            {itemType === FormItemType.RADIO ? renderRadioExtraAttrs(form.activeItem as RadioItem) : null}

            {itemType === FormItemType.SELECT ? renderItemOptions(form.activeItem as SelectItem) : null}
            {itemType === FormItemType.SELECT ? renderSelectExtraAttrs(form.activeItem as SelectItem) : null}

            {itemType === FormItemType.LAYOUT ? renderLayoutExtraAttrs(form.activeItem as LayoutItem) : null}

            {itemType === FormItemType.TEXT ? renderTextExtraAttrs(form.activeItem as TextItem) : null}

            {hasValidationAttrs ? renderValidationAttrs(form.activeItem as any) : null}
        </div>
    )
}

export default observer(FieldAttrs)
