import React from 'react'
import { Row, Col, Tag } from 'antd'

const fields = [
    {
        type: 'input',
        text: '单行文本'
    },
    {
        type: 'textarea',
        text: '多行文本'
    },
    {
        type: 'checkbox',
        text: '多选框'
    },
    {
        type: 'radio',
        text: '单选框'
    },
    {
        type: 'text',
        text: '文字'
    },
    {
        type: 'textarea',
        text: '多行文本'
    }
]

function ComponentList () {

    return (
        <>
            <div className="label">字段类型</div>
            {fields.map((_, i, fields) => {
                if (i % 2 === 0) {
                    const fieldsInRow = fields.slice(i, i + 2)

                    return (<Row gutter={10} key={i}>
                        {fieldsInRow.map((field, j) => <Col span={12} key={`${i}-${j}`}>
                            <Tag color="blue">{field.text}</Tag>
                        </Col>)}
                    </Row>)
                }

                return null
            })}
        </>
    )
}

export default ComponentList
