import styled from 'styled-components'

export default ({ children, ...props }) => (
  <Form {...props}>
    {children}
  </Form>
)

const Form = styled.form`
margin: 0;
padding: 0;

input {
  display: block;
  width: 100%;
  color: var(--text);
  font: inherit;
  padding: calc(var(--grid)) calc(var(--grid) * 2);
  border: 1px solid rgba(255, 255, 255, .2);
  background: none;

  + input {
    margin-top: var(--grid);
  }

  &:focus {
    border-color: var(--primary);
  }
}

footer {
  display: flex;
  align-items: center;
  padding-top: var(--grid);

  button {
    cursor: pointer;
    display: inline-block;
    color: var(--text);
    font: inherit;
    line-height: 1;
    margin; auto;
    padding: 0;
    border: 0;
    background: none;

    &:first-child:not(:hover) {
      opacity: 0.2;
    }

    + button {
      margin-left: auto;
    }

    &:hover {
      text-decoration: underline;
    }
  }
}

.row {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-top: 10px;

  input {
    width: calc(33.33% - 5px);
    margin: 0;
  }
}
`

