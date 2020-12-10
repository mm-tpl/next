import React from 'react'
import { fireEvent, render } from '../testUtils'
import pg001 from '../../src/pages/pg001'

const PG001 = pg001 as () => JSX.Element
describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<PG001 />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('clicking button triggers alert', () => {
    const { getByText } = render(<PG001 />, {})
    window.alert = jest.fn()
    fireEvent.click(getByText('update'))
  })
})
