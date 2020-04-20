import React from 'react'
import { Input } from 'antd'
import { observer } from 'mobx-react'
import form, { FormStore, FormItemType, FormItem, InputItem, TextareaItem, CheckboxItem, RadioItem } from '../stores/FormStore'

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

    const renderCheckboxExtraAttrs = (item: CheckboxItem) => {
        return (
            <>
                <div className="attr-item">
                    <div className="label">选项</div>

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
            {itemType === FormItemType.TEXTAREA ?  renderInputExtraAttrs(form.activeItem as TextareaItem) : null}
            {itemType === FormItemType.CHECKBOX ?  renderCheckboxExtraAttrs(form.activeItem as CheckboxItem) : null}
        </div>
    )
}

export default observer(FieldAttrs)
