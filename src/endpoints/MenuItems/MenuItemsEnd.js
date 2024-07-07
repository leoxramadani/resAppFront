export const GET_ALL_PRODUCTS = `${process.env.REACT_APP_BASE_URL}api/MenuItem/getMenuItemsWithCategories`;

export const GET_ALL_CATEGORIES = `${process.env.REACT_APP_BASE_URL}api/CategoryMenu/getAll`;

export const CREATE_NEW_CATEGORY = `${process.env.REACT_APP_BASE_URL}api/CategoryMenu/create`

export const UPDATE_NEW_CATEGORY = `${process.env.REACT_APP_BASE_URL}api/CategoryMenu/update`

export const DELETE_CATEGORY = `${process.env.REACT_APP_BASE_URL}api/CategoryMenu/delete`

export const GET_ALL_CATEGORIES_BY_ID = `${process.env.REACT_APP_BASE_URL}api/MenuItem/getAllMenuItemsByCategory`

export const CREATE_NEW_PRODUCT = `${process.env.REACT_APP_BASE_URL}api/MenuItem/register`

export const UPDATE_PRODUCT = `${process.env.REACT_APP_BASE_URL}api/MenuItem/update`

export const DELETE_PRODUCT = `${process.env.REACT_APP_BASE_URL}api/MenuItem/delete`
