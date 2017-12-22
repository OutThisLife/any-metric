import styled from 'styled-components'
import Form from '@/components/common/form'
import Button from '@/components/common/button'

const AddNew = styled.div`
padding: 0 calc(var(--grid) * 3);
margin: 0 auto calc(var(--grid) * 2);

a {
  display: block;
}

form {
  position: absolute;
  top: 0;
  left: 110%;
  width: 700px;
  padding: 15px;
  box-shadow: 0 0 25px 5px rgba(0,0,0,.4);
  transition: .2s ease-in-out;
  transform-origin: left center;
  background: var(--bg);

  &:not(.open) {
    opacity: 0;
    pointer-events: none;
    transform: scale(0) translate3d(-10px, 0, 0);
  }
}
`

export default ({ handle }) => (
  <AddNew>
    <Button
      title='Add Target'
      outline
      onClick={({ currentTarget }) => {
        currentTarget.nextElementSibling.classList.toggle('open')
      }}
    />

    <Form action='javascript:;' onSubmit={({ currentTarget }) => {
      const { title, url, parent, price, reviews } = currentTarget

      handle({
        id: Math.random(),
        title: title.value,
        url: url.value,
        selectors: {
          parent: parent.value,
          price: price.value,
          reviews: price.value
        },
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        spider: []
      }).then(() => currentTarget.classList.remove('open'))
    }}>
      <input
        type='text'
        name='title'
        placeholder='Product name'
        required
      />

      <input
        type='text'
        name='url'
        placeholder='//amazon.com/path/to/product/page'
        required
      />

      <div className='row'>
        <input
          type='text'
          name='parent'
          placeholder='Parent selector, eg: .product'
          required
        />

        <input
          type='text'
          name='price'
          placeholder='Price selector'
          required
        />

        <input
          type='text'
          name='reviews'
          placeholder='Review count selector'
        />
      </div>

      <footer>
        <button type='reset' onClick={({ currentTarget }) => {
          currentTarget.offsetParent.classList.remove('open')
        }}>
          Cancel
        </button>

        <button type='submit'>
          Add
        </button>
      </footer>
    </Form>
  </AddNew>
)
