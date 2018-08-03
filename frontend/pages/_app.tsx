import React from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
import getConfig from 'next/config'
import { Provider } from 'react-redux'
import moment from 'moment'
import isBefore from 'date-fns/is_before'
import { ToastContainer } from 'react-toastify'

import Layout from 'src/components/layout'
import { mobileRegexp } from 'src/constants/const'
import { withReduxSaga } from 'src/redux/store'
import { setCurrentParcel, setRouteChange, setIsWindows, setUser, setTheme } from 'src/redux/actions'
import { getServerSideToken, getClientSideToken } from 'src/shared/helper/auth-helper'
import { pageview } from 'src/shared/helper/gtag'
import { ThemeState } from 'src/@types/types'

interface Props {
  Component: React.Component
  pageProps: any
  store: any
  theme: ThemeState
}

class MyApp extends App<Props> {
  static async getInitialProps({Component, ctx}) {
    const isServer = ctx.isServer
    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
    const isMobile = mobileRegexp.test(userAgent)
    const isWindows = userAgent.includes('Windows')
    const pathname = ctx.pathname
    const asPath = ctx.asPath

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const info: any = isServer ? getServerSideToken(ctx.req) : getClientSideToken()

    if (!ctx.store.getState().user) {
      ctx.store.dispatch(setUser(info.user || null))
    } else if (!info.user || isBefore(moment.unix(info.user.exp).format(), new Date())) {
      ctx.store.dispatch(setUser(null))
    }

    if (ctx.store.getState().isWindows == null) ctx.store.dispatch(setIsWindows(isWindows))
    let theme = getConfig().publicRuntimeConfig.THEME
    if (isServer) {
      ctx.store.dispatch(setTheme(theme))
    }
    return { pageProps, isMobile, pathname, isWindows, theme, info, asPath }
  }

  public componentDidMount() {
    const { pageProps, store, pathname } = (this as any).props
    const currentParcel = pageProps.id ? pageProps.id : (pageProps.results ? `${pageProps.results.parcel_info.longitude} ${pageProps.results.parcel_info.latitude}` : null)
    if (pathname != '/owners') store.dispatch(setCurrentParcel(currentParcel))
  }

  public componentDidUpdate() {
    const { pageProps, store, pathname } = (this as any).props
    const currentParcel = pageProps.id ? pageProps.id : (pageProps.results ? `${pageProps.results.parcel_info.longitude} ${pageProps.results.parcel_info.latitude}` : null)
    if (pathname != '/owners') store.dispatch(setCurrentParcel(currentParcel))
  }

  public render() {
    const { Component, pageProps, store, isMobile, theme, asPath } = (this as any).props
    Router.onRouteChangeStart = (url) => {
      store.dispatch(setRouteChange())
      pageview(url, getConfig().publicRuntimeConfig.GA_TRACKING_ID)

      setTimeout(() => store.dispatch(setRouteChange()), 100)
    }

    return (
      <Container>
        <Head>
          <title>스터디야</title>
        </Head>
        <ToastContainer
          position="top-center"
          autoClose={10000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Provider store={store}>
          { asPath.split('/')[1] == 'users' ?
          <Component {...pageProps} isMobile={isMobile} theme={theme} />
          :
          <Layout isMobile={isMobile}>
            <Component {...pageProps} isMobile={isMobile} theme={theme} />
          </Layout>
          }
        </Provider>
        <style jsx global>{`{
          body {
            font-family: 'Noto Sans KR', sans-serif !important;
            line-height: 1.2 !important;
          }
          input::-ms-clear {
            display: none;
          }
          .form-control:focus {
            box-shadow: none !important;
          }
          .no-select {
            user-select: none;
          }
          .auth-button {
            height: 50px;
            background-color: #4C7AD7 !important;
            color: #FFF !important;
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            font-weight: lighter;
            cursor: pointer;
          }
          .bg-purple {
            background-color: #6645CE !important;
          }
          .bg-light-orchid {
            background-color: #F3F2FC !important;
          }
          .bg-safety {
            background-color: #FF7151 !important;
          }
          .bg-light-skyblue {
            background-color: #E1EDFF !important;
          }
          .bg-lightindigo {
            background-color: #4C7AD7 !important;
          }
          .bg-lightgrey {
            background-color: #f2f2f2 !important;
          }
          .bg-blue-5 {
            background-color: #8FFCFD !important;
          }
          .bg-grey {
            background-color: #999 !important;
          }
          .big-number {
            font-family: helvetica;
            font-weight: lighter;
          }
          .text-light-orchid {
            color: #634AB2 !important;
          }
          .text-light-orchid-6 {
            color: rgba(255, 255, 255, 0.6) !important;
          }
          .text-purple-9 {
            color: #523E92 !important;
          }
          .text-purple {
            color: #6645CE !important;
          }
          .text-safety {
            color: #FF7151 !important;
          }
          .text-white-purple {
            color: rgba(82, 62, 146, 0.5) !important;
          }
          .text-indigo {
            color: #3874DE !important;
          }
          .text-lightindigo {
            color: #4C7AD7 !important;
          }
          .text-white {
            color: #ffffff;
          }
          .text-white-6 {
            color: rgba(255, 255, 255, 0.6) !important;
          }
          .text-black {
            color: #222222;
          }
          .text-black-5 {
            color: rgba(0, 0, 0, 0.5) !important;
          }
          .text-black-2 {
            color: rgba(0, 0, 0, 0.2) !important;
          }
          .text-blue {
            color: #2D67DC;
          }
          .text-blue-5 {
            color: #8FFCFD !important;
          }
          .text-safety-7 {
            color: rgba(255, 255, 255, 0.7);
          }
          .btn-outline-purple {
            color: #6645CE !important;
            border: 1px solid #6645CE;
            border-radius: 3px;
            text-align: center;
            cursor: pointer;
          }
          .has-other-properties {
            background-color: #EBE4FF;
            cursor: pointer;
          }
          .cursor-pointer {
            cursor: pointer;
          }
          .close-button::before {
            content: '';
            display: block;
            background-image: url(/static/clear.png);
            cursor: pointer;
          }
          .border-white-purple {
            border: 1px solid #947BE5;
          }
          .border-indigo {
            border: 1px solid #3874DE;
          }
          .shadow-2 {
            box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
          }
          .hover-grey {
            background-color: #F8F9FA !important;
          }
          .bg-popover {
            background-color: #FFFDDD !important;
          }
          .popover-header {
          }
          .font-9 {
            font-size: 9px;
          }
          .font-10 {
            font-size: 10px;
          }
          .font-11 {
            font-size: 11px;
          }
          .font-12 {
            font-size: 12px;
          }
          .font-13 {
            font-size: 13px;
          }
          .font-14 {
            font-size: 14px;
          }
          .font-15 {
            font-size: 15px;
          }
          .font-16 {
            font-size: 16px;
          }
          .font-18 {
            font-size: 18px;
          }
          .font-20 {
            font-size: 20px;
          }
          .font-22 {
            font-size: 22px;
          }
          .font-24 {
            font-size: 24px;
          }
          .font-26 {
            font-size: 26px;
          }
          .font-28 {
            font-size: 28px;
          }
        }`}</style>
      </Container>
    )
  }
}

export default withReduxSaga(MyApp)
