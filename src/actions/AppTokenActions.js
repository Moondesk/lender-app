import { NavigationActions } from 'react-navigation'

import * as types from './Types'
import Expo, { SecureStore } from 'expo'
import { Auth0Service } from '../services'

export const lenderAppInitToken = () => {
  return (dispatch) => {
    dispatch({
      type: types.APP_TOKEN_INIT
    })
    Auth0Service().initClientCredentials()
      .then(response => handleAppTokenInit(dispatch, JSON.stringify(response)))
      .catch((error) => {
        lenderAppTokenInitFail(dispatch, error)
      })
  }
}

const lenderAppTokenInitFail = (dispatch, errorCode) => {
  dispatch({
    type: types.APP_TOKEN_FAILURE,
    payload: errorCode
  })
}

const handleAppTokenInit = async(dispatch, data) => {
  console.log('lenderAppTokenInitSuccess() WOOHOO!')
  console.log(data)

  dispatch({
    type: types.APP_TOKEN_SUCCESS,
    payload: data
  })
  dispatch(NavigationActions.navigate({
    routeName: 'Register',
    actions: [
      NavigationActions.navigate({ routeName: 'Register' })
    ]
  }))
}