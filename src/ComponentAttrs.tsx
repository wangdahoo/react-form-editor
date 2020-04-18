import React, { useState } from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs

interface ComponentAttrsProps {
    onChangeFormAttrs?: (formAttrs: FormAttrs) => void
}

interface FormAttrs {
    formWidth: number,
    formWidthUnit: '%' | 'px'
    labelAlign: 'left' | 'right' | 'top'
    labelWidth: number
    labelUnit: '%' | 'px'
}

const initialFormAttrs = () => ({
    formWidth: 100,
    formWidthUnit: '%',
    labelAlign: 'left',
    labelWidth: 100,
    labelWidthUnit: 'px'
})

function ComponentAttrs (props: ComponentAttrsProps) {
    const [formAttrs, setFormAttrs] = useState(initialFormAttrs())

    function onChangeTab (activeTab: string) {
        console.log(activeTab)
    }

    return (
        <>
            <Tabs onChange={onChangeTab} animated={false}>
                <TabPane tab="字段属性" key="field-attrs">

                </TabPane>
                <TabPane tab="表单属性" key="form-attrs">

                </TabPane>
            </Tabs>
        </>
    )
}

export default ComponentAttrs
