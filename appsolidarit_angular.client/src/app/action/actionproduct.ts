export enum ProductActionType {
  GET_ALL_PRODUCT = " [PRODUCT] get all product ",
  GET_ALL_PRODUCT_SELECTED = " [PRODUCT] get all product selected ",
  GET_ALL_PRODUCT_SEARCH = " [PRODUCT] get all product search ",
  NEW_PRODUCT = " [PRODUCT] new product ",
  ON_CHANGE_STATUS_PRODUCT = " [PRODUCT] on change status product ",
  ON_EDIT_PRODUCT = "[PRODUCT] on edit product ",
  ON_DELETE_PRODUCT = " [PRODUCT] on delete product "
}




export interface ActionProduct<T> {
  type: ProductActionType
  payload?: T
}
