import { observable, autorun } from 'mobx'
import { generate } from 'shortid'
import update from 'immutability-helper'

export enum FormItemType {
    TEXT = 'text',
    INPUT = 'input',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    SELECT = 'select',
    LAYOUT = 'layout'
}

export type InputItem = {
    id: string
    itemType: FormItemType.INPUT
    labelText: string
    placeholder: string
    defaultValue: string
}

export type TextareaItem = {
    id: string
    itemType: FormItemType.TEXTAREA
    labelText: string
    placeholder: string
    defaultValue: string
}

export type CheckboxItem = {
    id: string
    itemType: FormItemType.CHECKBOX
    labelText: string
    options: {
        value: string|number
        text: string
    }[]
    defaultValue: (string|number) []
}

export type RadioItem = {
    id: string
    itemType: FormItemType.RADIO
    labelText: string
    options: {
        value: string|number
        text: string
    }[]
    defaultValue: string|number
    buttonStyle: 'outline' | 'solid'
}

export type SelectItem = {
    id: string
    itemType: FormItemType.SELECT
    labelText: string
    options: {
        value: string|number
        text: string
    }[]
    defaultValue: string|number
}

export type LayoutItemCol = {
    span: number
}

export type LayoutItem = {
    id: string
    itemType: FormItemType.LAYOUT
    rows: LayoutItemCol[][]
}

export type TextItem = {
    id: string
    itemType: FormItemType.TEXT
    content: string
    fontSize: number
    lineHeight: number
    textAlign: 'center'|'left'|'right'
}

export type FormItem =  InputItem | TextareaItem | CheckboxItem | RadioItem | SelectItem | LayoutItem | TextItem

export type OutputFormItem = FormItem & { isActive: boolean }

const createFormItem = (itemType: string): FormItem => {
    const id = generate()

    switch (itemType) {
        case FormItemType.TEXT:
            return {
                id,
                itemType,
                content: '文字内容',
                fontSize: 14,
                lineHeight: 21,
                textAlign: 'left'
            }

        case FormItemType.LAYOUT:
            return {
                id,
                itemType,
                rows: [
                    [
                        { span: 12 },
                        { span: 12 }
                    ]
                ]
            }

        case FormItemType.SELECT:
            return {
                id,
                itemType,
                labelText: '下拉选择框',
                options: [
                    createOption('选项 1'),
                    createOption('选项 2'),
                    createOption('选项 3')
                ],
                defaultValue: '选项 1'
            }

        case FormItemType.RADIO:
            return {
                id,
                itemType,
                labelText: '单选框',
                options: [
                    createOption('选项 1'),
                    createOption('选项 2')
                ],
                buttonStyle: 'solid',
                defaultValue: ''
            }

        case FormItemType.CHECKBOX:
            return {
                id,
                itemType,
                labelText: '多选框',
                options: [
                    createOption('选项 1')
                ],
                defaultValue: []
            }

        case FormItemType.TEXTAREA:
            return {
                id,
                itemType,
                labelText: '文本域',
                placeholder: '文本域输入提示',
                defaultValue: ''
            }

        default:
            return {
                id,
                itemType: FormItemType.INPUT,
                labelText: '文本框',
                placeholder: '文本框输入提示',
                defaultValue: ''
            }
    }
}

const createOption = (value: string) => ({
    value,
    text: value
})

export class FormStore {
    @observable
    private items: FormItem[] = [
        createFormItem(FormItemType.INPUT),
        createFormItem(FormItemType.TEXTAREA),
        createFormItem(FormItemType.CHECKBOX),
        createFormItem(FormItemType.RADIO),
        createFormItem(FormItemType.SELECT),
        createFormItem(FormItemType.LAYOUT),
        createFormItem(FormItemType.TEXT),
    ]

    @observable
    private activeId: string = ''

    constructor () {
        // autorun(() => console.log('form items: ', this.formItems))
    }

    add (itemType: string) {
        const newItem: FormItem = createFormItem(itemType)
        this.items.push(newItem)
    }

    delete (id: string) {
        this.items = this.items.filter(item => item.id !== id)
    }

    update (newItem: FormItem) {
        this.items = this.items.map((item) => {
            return item.id === newItem.id
                ? newItem
                : item
        })
    }

    activate (id: string) {
        if (this.items.filter(item => item.id === id).length > 0) {
            this.activeId = id
        }
    }

    move (dragIndex: number, hoverIndex: number) {
        const dragItem = this.items[dragIndex]

        this.items = update(this.items, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragItem],
            ],
        })
    }

    addOption (id: string) {
        this.items = this.items.map(item => {
            if (item.id === id && [FormItemType.CHECKBOX, FormItemType.RADIO, FormItemType.SELECT].indexOf(item.itemType) > -1) {
                const value = ``
                ;(item as any).options.push(createOption(value))
            }

            return item
        })
    }

    deleteOption (id: string, optionIndex: number) {
        this.items = this.items.map(item => {
            if (item.id === id && [FormItemType.CHECKBOX, FormItemType.RADIO, FormItemType.SELECT].indexOf(item.itemType) > -1) {
                (item as any).options.splice(optionIndex, 1)
            }

            return item
        })
    }

    updateOption (id: string, optionIndex: number, value: string) {
        this.items = this.items.map(item => {
            if (item.id === id && [FormItemType.CHECKBOX, FormItemType.RADIO, FormItemType.SELECT].indexOf(item.itemType) > -1) {
                (item as any).options.splice(optionIndex, 1, createOption(value))
            }

            return item
        })
    }

    setCheckboxDefaultOption(id: string, values: string[]) {
        this.items = this.items.map(item => {
            if (item.id === id && FormItemType.CHECKBOX === item.itemType) {
                (item as CheckboxItem).defaultValue = values
            }

            return item
        })
    }

    setRadioDefaultOption(id: string, value: string) {
        this.items = this.items.map(item => {
            if (item.id === id && FormItemType.RADIO === item.itemType) {
                (item as RadioItem).defaultValue = value
            }

            return item
        })
    }

    setSelectDefaultOption(id: string, value: string) {
        this.items = this.items.map(item => {
            if (item.id === id && FormItemType.SELECT === item.itemType) {
                (item as SelectItem).defaultValue = value
            }

            return item
        })
    }

    addCol (id: string, rowIndex: number) {
        this.items = this.items.map(item => {
            if (item.id === id && FormItemType.LAYOUT === item.itemType) {
                (item as LayoutItem).rows[rowIndex].push({
                    span: 12
                })
            }

            return item
        })
    }

    updateColSpan (id: string, rowIndex: number, colIndex: number, span: number) {
        this.items = this.items.map(item => {
            if (item.id === id && FormItemType.LAYOUT === item.itemType) {
                (item as LayoutItem).rows[rowIndex].splice(colIndex, 1, { span })
            }

            return item
        })
    }

    deleteCol (id: string, rowIndex: number, colIndex: number) {
        this.items = this.items.map(item => {
            if (item.id === id && FormItemType.LAYOUT === item.itemType) {
                (item as LayoutItem).rows[rowIndex].splice(colIndex, 1)
            }

            return item
        })
    }

    updateTextItem (id: string, content: string, fontSize: number, lineHeight: number, textAlign: 'center'|'left'|'right') {
        this.items = this.items.map(item => {
            if (item.id === id && FormItemType.TEXT === item.itemType) {
                ;(item as TextItem).content = content
                ;(item as TextItem).fontSize = fontSize
                ;(item as TextItem).lineHeight = lineHeight
                ;(item as TextItem).textAlign = textAlign
            }

            return item
        })
    }

    get formItems (): OutputFormItem[] {
        return this.items.map(item => ({
            ...item,
            isActive: item.id === this.activeId
        }))
    }

    get activeItem (): FormItem {
        return find(this.items, this.activeId) as FormItem
    }
}

function find(items: FormItem[], id: string) {
    let result = null

    for (let i = 0, len = items.length; i < len; i++) {
        const item = items[i]
        if (item.id === id) {
            result = item
            break
        }
    }

    return result || {}
}

export default new FormStore()
