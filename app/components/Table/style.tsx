import { Box } from 'rebass'
import styled from 'styled-components'

export default styled<any>(Box)`
  [role='row'] > [role='gridcell'] {
    display: flex;
    align-items: center;

    &:not([col-id='title']) {
      justify-content: center;
    }
  }

  .ag-row {
    [col-id='title'] {
      cursor: pointer;

      &:hover {
        color: #0000ee;
        text-decoration: underline;
      }
    }

    [col-id='price'] {
      color: #097925;
    }

    [col-id='image'] {
      padding: 0;

      figure {
        width: 60px;
        height: 60px;
        margin: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          vertical-align: middle;
        }
      }
    }
  }

  .ag-floating-filter-full-body > div {
    display: flex;
    align-items: center;
    height: 32px !important;

    .ag-input-text-wrapper {
      width: 100%;
    }

    select {
      width: 100%;

      &[value=''] + a {
        visibility: hidden;
      }

      + a {
        margin-left: 0.5em;
      }
    }
  }

  #z-im {
    pointer-events: none;
    z-index: 1000;
    position: fixed;
    top: 0;
    right: 0;
    max-width: 50vw;
    width: auto;
    max-height: 50vh;
    height: auto;
    vertical-align: bottom;

    &:not([src]) {
      display: none;
    }
  }
`
