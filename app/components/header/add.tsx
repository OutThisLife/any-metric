import Button from '@/components/button'
import { FaPlusCircle } from 'react-icons/fa'
import styled from 'styled-components'

export default () => (
  <Form method="post" action="javascript:;">
    <Button variant="primary" type="submit">
      <FaPlusCircle />
      Add Product
    </Button>
  </Form>
)

const Form = styled.form`
  display: inline-flex;

  button {
    padding: calc(var(--pad) * 1.9) calc(var(--pad) * 2.7);

    svg {
      margin-right: calc(var(--pad) / 2);
    }
  }
`
