import Button from '@/components/button'
import { FiPlus } from 'react-icons/fi'
import styled from 'styled-components'

export default () => (
  <Form method="post" action="javascript:;">
    <Button primary={true} type="submit">
      <FiPlus />
      Add Product
    </Button>
  </Form>
)

const Form = styled.form`
  display: inline-flex;

  button {
    padding-right: calc(var(--pad) * 1.7);

    svg {
      font-size: 2em;
      stroke: ${({ theme }) => theme.links.colour};
      margin-right: calc(var(--pad) / 2);
    }
  }
`
