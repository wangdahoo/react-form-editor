import React from 'react'
import { Row, Col } from 'antd'

import Field from './Field'

const fields = {
    basic: [
        {
            name: 'input',
            text: '文本框'
        },
        {
            name: 'number',
            text: '数字框'
        },
        {
            name: 'textarea',
            text: '文本域'
        },
        {
            name: 'radio',
            text: '单选框'
        },
        {
            name: 'checkbox',
            text: '多选框'
        },
        {
            name: 'select',
            text: '下拉选择框'
        },
        {
            name: 'text',
            text: '文字'
        }
    ],

    advanced: [
        // {
        //     name: 'layout',
        //     text: '布局'
        // },
        {
            name: 'result',
            text: '检验结果'
        }
    ]
}

function FieldList () {
    const renderFields = (label: string, fields: { name: string, text: string }[]) => (
        <div>
            <div className="label">{label}</div>
            {fields.map((_, i, fields) => {
                if (i % 2 === 0) {
                    const fieldsInRow = fields.slice(i, i + 2)

                    return (<Row gutter={10} key={i}>
                        {fieldsInRow.map((field, j) => <Col span={12} key={`${i}-${j}`}>
                        <Field name={field.name} text={field.text} />
                        </Col>)}
                    </Row>)
                }

                return null
            })}
        </div>
    )

    return (
        <>
            {renderFields('通用字段', fields.basic)}
            {renderFields('自定义字段', fields.advanced)}
        </>
    )
}

export default FieldList
