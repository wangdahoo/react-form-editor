import React, { useState, useEffect, useRef } from 'react'
import { Tabs, Button } from 'antd'
// import FormEditor from '../dist'
import FormEditor, { GeneratedForm } from '../src'
import { createFormItem, FormItemType } from '../src/stores/FormStore'

const TabPane = Tabs.TabPane

interface Props {
   name: string
}

const initialItems = () => [
    // createFormItem(FormItemType.INPUT),
    // createFormItem(FormItemType.NUMBER),
    // createFormItem(FormItemType.TEXTAREA),
    // createFormItem(FormItemType.CHECKBOX),
    createFormItem(FormItemType.RADIO),
    // createFormItem(FormItemType.SELECT),
    // createFormItem(FormItemType.TEXT),
    createFormItem(FormItemType.RESULT),

    // 暂时不支持 layout
    // createFormItem(FormItemType.LAYOUT),
]

export default function App (props: Props) {
    const persistKey = 'react-form-editor'

    const [state, setState] = useState({
        items: initialItems(),
        attrs: {
            formWidth: 100,
            labelAlign: 'left',
            labelWidth: 200,
            labelWidthUnit: 'px'
        }
    })

    const formRef = useRef()

    useEffect(() => {
        try {
            const newState = JSON.parse(localStorage.getItem(persistKey))

            if (newState) {
                setState(newState)
            }
        } catch (e) {}
    }, [])

    return (
        <Tabs>
            <TabPane tab="表单编辑器" key='editor'>
                <FormEditor
                    style={{
                        height: '100vh'
                    }}
                    defaultFormItems={state.items}
                    defaultFormAttrs={state.attrs as any}
                    onSave={json => {
                        console.log(JSON.parse(json))
                        setState(JSON.parse(json))
                        localStorage.setItem(persistKey, json)
                    }}
                />
            </TabPane>
            <TabPane tab="生成的表单" key='generated-form'>
                <div style={{width: 500, margin: '0 auto'}}>
                    <GeneratedForm form={{
                        items: state.items,
                        attrs: state.attrs as any
                    }} ref={formRef} footer={null} onSubmit={console.log} />
                </div>

                <Button type="primary" onClick={() => {
                    if (formRef.current) {
                        (formRef.current as any).submit()
                    }
                }}>从外部提交</Button>
            </TabPane>
        </Tabs>
    )
}
