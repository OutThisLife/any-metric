import styled from 'styled-components'

export default styled.form`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;

  input,
  select {
    display: block;
    width: 100%;
  }

  > section {
    z-index: 100;
    position: fixed;
    top: 40px;
    left: 25px;
    right: 25px;
    padding: 10px;
    border: 1px solid #bdc3c7;
    background: #fff;

    nav {
      margin: 10px auto;
      padding: 25px;
      border: 1px solid #bdc3c7;
      background: #f5f7f7;
    }

    nav > div {
      display: flex;
      align-items: center;

      + div {
        margin-top: 5px;
      }

      figure {
        width: 40px;
        height: 40px;
        margin: auto;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      aside {
        flex: 1;
        padding-left: 1em;

        a {
          display: inline-block;
          margin: 0 0 4px;
        }
      }
    }
  }
`
