import {BasePo} from "../page-objects/base-po";
import {Constants} from "../fixtures/constants";
import {InitialPo} from "../page-objects/initial-page/initial-po";

const basePage = new BasePo()
const initialPage = new InitialPo()


const initialHeaderButton = basePage.transformDynamicSelector(basePage.navigationButton + ' ' + basePage.baseLink,
    Constants.dynamicSelectorPart,  Constants.navigationButtonWays[4])
const initialJewelryItem = basePage.transformDynamicSelector(basePage.baseLink,
    Constants.dynamicSelectorPart, Constants.navigationButtonWays[5])

describe('Initial: demo', () => {
  it('Should check that item can be added to cart/wishlist + check requests status codes', () => {
    basePage.clickElement(initialHeaderButton, 0)
    basePage.checkElementWitTextVisibility(initialJewelryItem, Constants.initialItemName)
    basePage.interceptRequest(Constants.requestsTypes[1], Constants.requestsEndpoints[3])
    basePage.interceptRequest(Constants.requestsTypes[1], Constants.requestsEndpoints[4])
    basePage.interceptRequest(Constants.requestsTypes[1], Constants.requestsEndpoints[5])
    basePage.interceptRequest(Constants.requestsTypes[1], Constants.requestsEndpoints[6])
    basePage.clickElementByText(initialJewelryItem, Constants.initialItemName)
    basePage.checkInterceptedRequest(Constants.requestsTypes[1], Constants.requestsEndpoints[3], Constants.statusCodes[0], true)
    basePage.checkInterceptedRequest(Constants.requestsTypes[1], Constants.requestsEndpoints[4], Constants.statusCodes[0], true)
    basePage.checkInterceptedRequest(Constants.requestsTypes[1], Constants.requestsEndpoints[5], Constants.statusCodes[0], true)
    basePage.checkInterceptedRequest(Constants.requestsTypes[1], Constants.requestsEndpoints[6], Constants.statusCodes[0], true)
    basePage.checkElementVisibility(basePage.breadcrumbsList)
    basePage.interceptRequest(Constants.requestsTypes[0], Constants.requestsEndpoints[1])
    basePage.interceptRequest(Constants.requestsTypes[0], Constants.requestsEndpoints[2])
    basePage.checkMultipleElementsWithTextVisibility(Constants.addToBaseButtonsStates, basePage.baseButton)
    basePage.clickMultipleElementsByText(Constants.addToBaseButtonsStates, basePage.baseButton)
    basePage.checkInterceptedRequest(Constants.requestsTypes[0], Constants.requestsEndpoints[1], Constants.statusCodes[0], true)
    basePage.checkInterceptedRequest(Constants.requestsTypes[0], Constants.requestsEndpoints[2], Constants.statusCodes[2], true)
    basePage.checkElementWitTextVisibility(basePage.baseButton, Constants.addToCartText)
    basePage.checkElementVisibility(initialPage.addToComparingSuccessState)
  })
})