import React from 'react'
import { Row, Col, Tag, Divider } from 'antd'

import Field from './Field'

const fields = {
    basic: [
        {
            name: 'input',
            text: '文本框'
        },
        {
            name: 'textarea',
            text: '文本域'
        },
        {
            name: 'checkbox',
            text: '多选框'
        },
        {
            name: 'radio',
            text: '单选框'
        },
        {
            name: 'select',
            text: '下拉选择框'
        }
    ],

    advanced: [
        {
            name: 'layout',
            text: '布局'
        }
    ]
}

function FieldList () {
    return (
        <>
            <div className="label">基础字段</div>
            {fields.basic.map((_, i, fields) => {
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

            <div className="label">高级字段</div>
            {fields.advanced.map((_, i, fields) => {
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
        </>
    )
}

export default FieldList
