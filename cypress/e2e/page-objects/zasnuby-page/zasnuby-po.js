import {BasePo} from "../base-po";

export class ZasnubyPo extends BasePo {
    productImage = '.product-image-container'
    nonExpandedWidgetTitle = '.widget__title'
    expandableWidgetTitle = '.widget__collections__show-more'
    checkBoxFilterOption = '.label-container'
    nonCheckBoxFilterOption = '.widget__collections li'

    openExpandableFilters() {
        for(let i = 0; i < 6; i++) {
            cy.get(this.expandableWidgetTitle).eq(i).scrollIntoView().click()
        }
    }
}