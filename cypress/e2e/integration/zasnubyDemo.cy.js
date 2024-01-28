import {BasePo} from "../page-objects/base-po";
import {Constants} from "../fixtures/constants";
import {ZasnubyPo} from "../page-objects/zasnuby-page/zasnuby-po";


const basePage = new BasePo()
const zasnubyPage = new ZasnubyPo()


const zasnubyHeaderButton = basePage.transformDynamicSelector(basePage.navigationButton + ' ' + basePage.baseLink,
    Constants.dynamicSelectorPart,  Constants.navigationButtonWays[0])
const jewelryItem = basePage.transformDynamicSelector(zasnubyPage.productImage + ' ' + basePage.baseLink,
    Constants.dynamicSelectorPart, Constants.navigationButtonWays[2])
const jewelryAdButton = basePage.transformDynamicSelector(basePage.navigationButton, Constants.dynamicSelectorPart, Constants.navigationButtonWays[3])

describe('Zasnuby: demo', () => {
  it('Should check navigation + filters on zasnuby-page page & check requests status codes', () => {
    basePage.interceptRequest(Constants.requestsTypes[0], Constants.requestsEndpoints[0])
    basePage.clickElement(zasnubyHeaderButton, 0)
    basePage.checkInterceptedRequest(Constants.requestsTypes[0], Constants.requestsEndpoints[0], Constants.statusCodes[1])
    basePage.checkElementVisibility(jewelryAdButton)
    basePage.checkElementVisibility(jewelryItem)
    basePage.clickElement(jewelryItem)
    basePage.checkElementVisibility(basePage.breadcrumbsList)
    basePage.checkMultipleElementsWithTextVisibility(Constants.nonExpandedFiltersNames, zasnubyPage.nonExpandedWidgetTitle)
    basePage.checkElementsQuantity(zasnubyPage.expandableWidgetTitle, 6)
    basePage.checkMultipleElementsWithTextVisibility(Constants.nonExpandedFiltersOptionsNames, zasnubyPage.nonCheckBoxFilterOption)
    basePage.checkMultipleElementsWithTextVisibility(Constants.nonExpandedCheckboxFiltersOptionsNames, zasnubyPage.checkBoxFilterOption)
    zasnubyPage.openExpandableFilters()
    basePage.checkMultipleElementsWithTextVisibility(Constants.expandedNonCheckboxFilters, zasnubyPage.nonCheckBoxFilterOption)
    basePage.checkMultipleElementsWithTextVisibility(Constants.expandedCheckboxFilters, zasnubyPage.checkBoxFilterOption)
  })
})