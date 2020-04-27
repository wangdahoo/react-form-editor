import { observable, computed } from 'mobx'

export interface FormAttrValues {
    formWidth: number
    labelAlign: 'left' | 'right' | 'top'
    labelWidth: number
    labelWidthUnit: '%' | 'px'
}

export class FormAttrsStore {
    @observable
    formWidth: number = 100

    @observable
    formWidthUnit: '%' | 'px' = '%'

    @observable
    labelAlign: 'left' | 'right' | 'top' = 'left'

    @observable
    labelWidth: number = 100

    @observable
    labelWidthUnit: '%' | 'px' = 'px'

    @computed
    get formWidthString () {
        return `${this.formWidth}${this.formWidthUnit}`
    }

    @computed
    get labelWidthString () {
        return `${this.labelWidth}${this.labelWidthUnit}`
    }

    reset (attrs: FormAttrValues) {
        this.formWidth = attrs.formWidth || 100
        this.labelAlign = attrs.labelAlign || 'left'
        this.labelWidth = attrs.labelWidth || 100
        this.labelWidthUnit = attrs.labelWidthUnit || 'px'
    }
}

export default new FormAttrsStore()
