import React, { useState } from 'react'
import { FormItem, FormItemType, SelectItem, CheckboxItem, RadioItem, TextareaItem, InputItem, TextItem, NumberItem } from '../stores/FormStore'
import { Radio, Input, Select, Checkbox, Divider, Button, InputNumber, Empty } from 'antd'
import classnames from 'classnames'

interface GeneratedFormProps {
    form: {
        items: FormItem[]
        attrs: {
            formWidth: number
            formWidthUnit: '%' | 'px'
            labelAlign: 'left' | 'right' | 'top'
            labelWidth: number
            labelWidthUnit: '%' | 'px'
        }
    },
    onSubmit?: (formValue: GeneratedFormValues) => void
}

type GeneratedFormValues = {
    values: {
        [key: string]: string|string[]|number
    }
    result: -1|0|1
    comment: string
}

const createFormValues = (items: FormItem[]): GeneratedFormValues => {
    const values = items.reduce((values: { [key: string]: string|string[] }, item: FormItem) => {
        if ([
            FormItemType.INPUT,
            FormItemType.TEXTAREA,
            FormItemType.RADIO,
            FormItemType.CHECKBOX,
            FormItemType.SELECT
        ].indexOf(item.itemType) > -1) {
            return {
                ...values,
                [item.id]: (item as any).defaultValue
            }
        }

        return values
    }, {})

    return {
        values,
        result: -1,
        comment: ''
    }
}

interface ValidationResult {
    result: boolean
    errors: { [id: string]: string }
}

const shouldValidateRequired = (item: FormItem) => [
    FormItemType.INPUT,
    FormItemType.TEXTAREA,
    FormItemType.CHECKBOX,
    FormItemType.RADIO
].indexOf(item.itemType) > -1

function GeneratedForm (props: GeneratedFormProps) {
    const { items, attrs } = props.form
    const { formWidth, formWidthUnit, labelAlign, labelWidth } = attrs
    const [formValues, setFormValues] = useState(createFormValues(items))
    const [validationResult, setValidationResult] = useState({ result: false, errors: {} })
    const [validateCount, setValidateCount] = useState(0)

    function onSubmit () {
        console.log('form items =>', items)
        console.log('form values =>', formValues)

        const newValidationResult = validate(items, formValues)
        console.log(newValidationResult)

        if (newValidationResult.result) {
            if (props.onSubmit) props.onSubmit(formValues)
            setValidationResult({ result: false, errors: {} })
            setFormValues(createFormValues(items))
        } else {
            setValidationResult(newValidationResult)
        }

        setValidateCount(validateCount + 1)
    }

    function validate (items: FormItem[], formValues: GeneratedFormValues): ValidationResult {
        const { values } = formValues

        return items.reduce(({ result, errors }: ValidationResult, item: FormItem) => {
            // 校验必填项
            if (shouldValidateRequired(item) && (item as any).required) {
                const { id, labelText } = item as any
                const value = values[id]

                if (
                    // 空字符串
                    (typeof value === 'string' && value === '') ||
                    // 空数组
                    (Object.prototype.toString.call(value) === '[object Array]' && (value as string[]).length === 0)
                 ) {
                    errors[id] = `${labelText}为必填项`
                    result = false
                }
            }

            // 检验结果项为必填
            if (item.itemType === FormItemType.RESULT && formValues.result === -1) {
                result === false
            }

            return {
                result,
                errors
            }
        }, {
            result: false,
            errors: {}
        })
    }

    const renderFormItem = (formItem: FormItem) => {
        const { itemType } = formItem

        switch (itemType) {
        case FormItemType.RESULT:
            return (
                <div>
                    <Radio.Group
                        style={{
                            height: 32,
                            lineHeight: '32px',
                            marginBottom: 16
                        }}
                        value={formValues.result}
                        onChange={e => setFormValues({
                            ...formValues,
                            result: e.target.value
                        })}
                    >
                        <Radio value={1}>合格</Radio>
                        <Radio value={0}>不合格</Radio>
                        <span className="err-msg">{validateCount > 0 && formValues.result === -1 ? '检验结果为必填项' : ''}</span>
                    </Radio.Group>

                    <Input.TextArea
                        placeholder="备注"
                        value={formValues.comment}
                        onChange={e => setFormValues({
                            ...formValues,
                            comment: e.target.value
                        })}
                    />
                </div>
            )

        case FormItemType.SELECT:
            const selectItem = formItem as SelectItem

            return (
                <Select
                    value={formValues.values[selectItem.id] as string}
                    onChange={(value: string) => {
                        const values = formValues.values

                        setFormValues({
                            ...formValues,
                            values: {
                                ...values,
                                [selectItem.id]: value
                            }
                        })
                    }}
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
            const checkboxItem = formItem as CheckboxItem

            return (
                <Checkbox.Group
                    value={formValues.values[checkboxItem.id] as string[]}
                    onChange={value => {
                        const values = formValues.values

                        setFormValues({
                            ...formValues,
                            values: {
                                ...values,
                                [checkboxItem.id]: value as string[]
                            }
                        })
                    }}
                >
                    {checkboxItem.options.map((option, optionIndex) => (
                        <Checkbox key={optionIndex} value={option.value}>
                            {option.text}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            )

        case FormItemType.RADIO:
            const radioItem = formItem as RadioItem

            return (
                <Radio.Group
                  value={formValues.values[radioItem.id]}
                  onChange={e => {
                    const values = formValues.values

                    setFormValues({
                        ...formValues,
                        values: {
                            ...values,
                            [radioItem.id]: e.target.value
                        }
                    })
                  }}
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
            const textareaItem = formItem as TextareaItem

            return (
                <Input.TextArea
                    value={formValues.values[textareaItem.id]}
                    onChange={e => {
                        const values = formValues.values

                        setFormValues({
                            ...formValues,
                            values: {
                                ...values,
                                [textareaItem.id]: e.target.value
                            }
                        })
                    }}
                    placeholder={textareaItem.placeholder}
                />
            )

        case FormItemType.NUMBER:
            const numberItem = formItem as NumberItem

            return (
                <InputNumber
                    style={{width: '100%'}}
                    value={formValues.values[numberItem.id] as number}
                    onChange={value => {
                        value = value || numberItem.min

                        const values = formValues.values

                        setFormValues({
                            ...formValues,
                            values: {
                                ...values,
                                [numberItem.id]: value
                            }
                        })
                    }}
                    min={numberItem.min}
                    max={numberItem.max}
                    formatter={value => {
                        if (!value) return `${numberItem.min} ${numberItem.unit}`
                        return `${value} ${numberItem.unit}`
                    }}
                    parser={value => {
                        if (!value) return Number(numberItem.min)
                        return Number(value.replace(` ${numberItem.unit}`, ''))
                    }}
                />
            )

        default:
            const inputItem = formItem as InputItem

            return (
                <Input
                    value={formValues.values[inputItem.id]}
                    onChange={e => {
                        const values = formValues.values

                        setFormValues({
                            ...formValues,
                            values: {
                                ...values,
                                [inputItem.id]: e.target.value
                            }
                        })
                    }}
                    placeholder={inputItem.placeholder}
                />
            )
        }
    }

    if (items.length === 0) return <Empty />

    return (
        <div className="generated-form" style={{
            width: `${formWidth}${formWidthUnit}`
        }}>
            {items.map((item, index) => {
                const { itemType } = item

                if (itemType === FormItemType.TEXT) {
                    const textItem = item as TextItem

                    return (
                        <div
                            key={index}
                            className="form-item form-item-text"
                            style={{
                                fontSize: textItem.fontSize,
                                lineHeight: `${textItem.lineHeight}px`,
                                textAlign: textItem.textAlign
                            }}
                        >
                            <div className="form-item-label">{textItem.content}</div>
                        </div>
                    )
                }

                if ([
                    FormItemType.INPUT,
                    FormItemType.NUMBER,
                    FormItemType.TEXTAREA,
                    FormItemType.RADIO,
                    FormItemType.CHECKBOX,
                    FormItemType.SELECT,
                    FormItemType.RESULT
                ].indexOf(itemType) > -1) {
                    const errMsg: string = (validationResult.errors as any)[item.id]

                    return (
                        <div className="form-item" key={index}>
                            <div className={classnames('form-item-label', labelAlign === 'top' ? 'label-standalone' : '')} style={{
                                width: labelWidth,
                                ...(labelAlign !== 'top' ? {
                                    textAlign: labelAlign
                                } : {})
                            }}>
                                {(item as any).labelText}
                            </div>
                            <div className='form-item-content'>
                                {renderFormItem(item)}
                                <div className="err-msg">
                                    {errMsg}
                                </div>
                            </div>
                        </div>
                    )
                }

                return null
            })}

            <Divider />

            <div style={{ paddingLeft: labelWidth }}>
                <Button type="primary" onClick={onSubmit} style={{ width: 90, marginRight: 16 }}>提 交</Button>
                <Button type="default" onClick={() => setFormValues(createFormValues(items))} style={{ width: 90 }}>重 置</Button>
            </div>
        </div>
    )
}

export default GeneratedForm
