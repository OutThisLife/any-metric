import styled from 'styled-components'
import Form from '@/components/common/form'
import Button from '@/components/common/button'

const AddNew = styled.div`
position: relative;
padding: 0 calc(var(--grid) * 3);
margin: 0 auto calc(var(--grid) * 2);

a {
  display: block;
}

form {
  position: absolute;
  top: 0;
  left: 110%;
  width: 250px;
  padding: 15px;
  box-shadow: 0 0 25px 5px rgba(0,0,0,.4);
  transform: .4s ease-in-out;
  background: var(--bg);

  &:not(.open) {
    opacity: 0;
    pointer-events: none;
    filter: blur(10px);
    transform: scale(0.95) translate3d(-10px, 0, 0);
  }
}
`

export default () => (
  <AddNew>
    <Button
      title='Add Target'
      outline
      onClick={({ currentTarget }) => {
        currentTarget.nextElementSibling.classList.toggle('open')
      }}
    />

    <Form action='javascript:;'>
      <input type='text' name='url' placeholder='Target URL' />
      <input type='text' name='price' placeholder='Price selector' />
      <input type='text' name='reviews' placeholder='Review count selector' />

      <footer>
        <button type='submit'>Cancel</button>
        <button type='submit'>Add</button>
      </footer>
    </Form>
  </AddNew>
)
