import { InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

export default (props: InputHTMLAttributes<any>) => <Input {...props} />

export const inputStyles = css`
  display: inline-block;
  color: ${({ theme }) => theme.inputs.colour};
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.inputs.border};
  border-radius: ${({ theme }) => theme.inputs.radius};
  background: ${({ theme }) => theme.inputs.bg};

  &:focus {
    border-color: ${({ theme }) => theme.inputs.focus.border};
  }
`

export const Input = styled.input`
  ${inputStyles};
`
