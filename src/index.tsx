import './index.less'
import React from 'react'
import { Layout } from 'antd'
import ComponentList from './ComponentList'
import ComponentAttrs from './ComponentAttrs'

const { Header, Content, Sider } = Layout

interface FormEditorProps {
    style?: React.CSSProperties
}

export function FormEditor (props: FormEditorProps) {
    const { style } = props

    return (
        <Layout className="form-editor" style={style}>
            <Sider theme='light' className="form-editor-components">
                <ComponentList />
            </Sider>
            <Layout className="form-editor-content">
                <Layout className="form-editor-content-main">
                    <Header className="form-editor-toolbar">顶部 toolbar</Header>
                    <Content className="form-editor-editarea">
                        <div className="form-editing"></div>
                    </Content>
                </Layout>
                <Sider theme='light' width={300} className="form-editor-content-attrs">
                    <ComponentAttrs />
                </Sider>
            </Layout>
        </Layout>
    )
}
