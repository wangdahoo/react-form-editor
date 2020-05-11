import './index.less'
import React, { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { Layout } from 'antd'
import Toolbar from './components/Toolbar'
import FieldList from './components/FieldList'
import AttrsPanel from './components/AttrsPanel'
import EditableForm from './components/EditableForm'
import formAttrsStore, { FormAttrValues } from './stores/FormAttrsStore'
import formStore, { FormItem } from './stores/FormStore'
// https://github.com/mobxjs/mobx-react-lite/#observer-batching
// import 'mobx-react-lite/batchingForReactDom'

export * from './components/GeneratedForm'

const { Header, Content, Sider } = Layout

interface FormEditorProps {
    style?: React.CSSProperties
    defaultFormItems?: FormItem[]
    defaultFormAttrs?: FormAttrValues
    onSave?: (json: string) => void
}

export default function FormEditor (props: FormEditorProps) {
    const { style, defaultFormItems = [], defaultFormAttrs, onSave = console.log } = props

    useEffect(() => {
        formStore.setItems(defaultFormItems)
        if (defaultFormAttrs) {
            console.log('reset defaultFormAttrs')
            formAttrsStore.reset(defaultFormAttrs)
        }
    }, [JSON.stringify(props)])

    return (
        <DndProvider backend={Backend}>
            <Layout className="form-editor" style={style}>
                <Sider theme='light' className="form-editor-components">
                    <FieldList />
                </Sider>
                <Layout className="form-editor-content">
                    <Layout className="form-editor-content-main">
                        <Header className="form-editor-toolbar">
                            <Toolbar formAttrs={formAttrsStore} form={formStore} onSave={onSave} />
                        </Header>
                        <Content className="form-editor-editarea">
                            <EditableForm formAttrs={formAttrsStore} form={formStore}/>
                        </Content>
                    </Layout>
                    <Sider theme='light' width={300} className="form-editor-content-attrs">
                        <AttrsPanel />
                    </Sider>
                </Layout>
            </Layout>
        </DndProvider>
    )
}
