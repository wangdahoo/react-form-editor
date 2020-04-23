import { observable, computed, autorun } from 'mobx'

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
}

export default new FormAttrsStore()
