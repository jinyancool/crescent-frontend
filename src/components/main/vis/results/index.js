import React, {useState, useEffect} from 'react'

import * as R from 'ramda'

import {Grid, Menu, Segment, Button, Header, Icon, Divider} from 'semantic-ui-react'

import withRedux from '../../../../redux/hoc'

import ScatterComponent from './Scatter'

const ResultsComponent = withRedux(
  ({
    app: {
      run,
      toggle: {
        vis: {results: {activeResult, availabeGroups}}
      }
    },
    actions: {
      toggle: {}
    }
  }) => {

    return (
      <>
      {
        R.ifElse(
          R.isNil,
          R.always(
            <Segment basic placeholder style={{height: '100%'}}>
              <Header textAlign='center' icon>
                <Icon name='right arrow' />
                Select a visualization on the right
              </Header>
            </Segment>
          ),
          R.always(<ScatterComponent/>)
        )(activeResult)
      }
      </>
    )
  }
)

export default ResultsComponent