import { render } from '@testing-library/react'
import { ComponentType, FunctionComponent, ReactElement } from 'react'
// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

function Providers({ children }: { children: ReactElement<any, any> }) {
  return children
  // return (
  //   <ThemeProvider theme="light">
  //     <TranslationProvider messages={defaultStrings}>
  //       {children}
  //     </TranslationProvider>
  //   </ThemeProvider>
  // )
}

const customRender = (ui: JSX.Element, options = {}) =>
  render(ui, { wrapper: Providers as FunctionComponent<{}>, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
