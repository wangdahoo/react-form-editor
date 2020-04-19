import React from 'react'
import { InputNumber, Radio } from 'antd'
import { observer } from 'mobx-react'
import { FormAttrsStore } from '../stores/FormAttrsStore'
import { RadioChangeEvent } from 'antd/lib/radio'

interface FormAttrsProps {
    formAttrs: FormAttrsStore
}

@observer
class FormAttrs extends React.Component<FormAttrsProps> {
    render () {
        const { formAttrs } = this.props

        return (
            <div className="attrs">
                <div className="attr-item">
                    <div className="label">表单宽度</div>
                    <InputNumber className="input" value={formAttrs.formWidth} min={0} step={1} onChange={value => {
                        if (value !== undefined) {
                            formAttrs.formWidth = value
                        }
                    }} />
                </div>

                <div className="attr-item">
                    <div className="label">表单宽度单位</div>
                    <Radio.Group className="input" value={formAttrs.formWidthUnit} buttonStyle="solid" onChange={(e: RadioChangeEvent) => {
                        formAttrs.formWidthUnit = e.target.value
                    }}>
                        <Radio.Button value="%">百分比 %</Radio.Button>
                        <Radio.Button value="px">像素 px </Radio.Button>
                    </Radio.Group>
                </div>

                <div className="attr-item">
                    <div className="label">标签宽度</div>
                    <InputNumber className="input" value={formAttrs.labelWidth} min={0} step={1} onChange={value => {
                        if (value !== undefined) {
                            formAttrs.labelWidth = value
                        }
                    }} />
                </div>

                <div className="attr-item">
                    <div className="label">标签宽度单位</div>
                    <Radio.Group className="input" value={formAttrs.labelWidthUnit} buttonStyle="solid" onChange={(e: RadioChangeEvent) => {
                        formAttrs.labelWidthUnit = e.target.value
                    }}>
                        <Radio.Button value="%">百分比 %</Radio.Button>
                        <Radio.Button value="px">像素 px </Radio.Button>
                    </Radio.Group>
                </div>

                <div className="attr-item">
                    <div className="label">标签对齐方式</div>
                    <Radio.Group className="input" value={formAttrs.labelAlign} buttonStyle="solid" onChange={(e: RadioChangeEvent) => {
                        formAttrs.labelAlign = e.target.value
                    }}>
                        <Radio.Button value="left">左对齐</Radio.Button>
                        <Radio.Button value="right">右对齐</Radio.Button>
                        <Radio.Button value="top">顶部对齐</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
        )
    }
}

export default FormAttrs
