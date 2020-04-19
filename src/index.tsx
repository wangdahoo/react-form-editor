import './index.less'
import React from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { Layout } from 'antd'
import FieldList from './components/FieldList'
import AttrsPanel from './components/AttrsPanel'
import EditableForm from './components/EditableForm'
import formAttrsStore from './stores/FormAttrsStore'
import formStore from './stores/FormStore'
// https://github.com/mobxjs/mobx-react-lite/#observer-batching
import 'mobx-react-lite/batchingForReactDom'

const { Header, Content, Sider } = Layout

interface FormEditorProps {
    style?: React.CSSProperties
}

export default function FormEditor (props: FormEditorProps) {
    const { style } = props

    return (
        <DndProvider backend={Backend}>
            <Layout className="form-editor" style={style}>
                <Sider theme='light' className="form-editor-components">
                    <FieldList />
                </Sider>
                <Layout className="form-editor-content">
                    <Layout className="form-editor-content-main">
                        <Header className="form-editor-toolbar">顶部 toolbar</Header>
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
