import Router from 'next/router'
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

export default ({ data, handle }) => (
  <AddNew>
    <Button
      title='Add Target'
      outline
      onClick={({ currentTarget }) => {
        currentTarget.nextElementSibling.classList.toggle('open')
      }}
    />

    <Form
      action='javascript:;'
      onSubmit={({ currentTarget }) => {
        const { title, url, parent, price, reviews } = currentTarget

        data.push({
          id: Math.random(),
          title: title.value,
          url: url.value,
          selectors: {
            parent: parent.value,
            title: 'h2@html',
            image: 'img@src',
            price: `${price.value}@html`,
            reviews: `${reviews.value}@html`,
          },
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          spider: []
        })

        handle(data, ({ id }) => {
          currentTarget.classList.remove('open')
        })
      }}
      onReset={({ currentTarget }) => currentTarget.classList.remove('open')}
    >
      <input
        type='text'
        name='title'
        placeholder='Product name'
        defaultValue='ipad @ amazon'
        required
      />

      <input
        type='text'
        name='url'
        placeholder='//amazon.com/path/to/product/page'
        defaultValue='https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=ipad'
        required
      />

      <div className='row'>
        <input
          type='text'
          name='parent'
          placeholder='Parent selector, eg: .product'
          defaultValue='.s-item-container'
          required
        />

        <input
          type='text'
          name='price'
          placeholder='Price selector'
          defaultValue='.a-span7 .a-size-base'
          required
        />

        <input
          type='text'
          name='reviews'
          placeholder='Review count selector'
          defaultValue='.a-span-last .a-size-small'
        />
      </div>

      <footer>
        <button type='reset'>
          Cancel
        </button>

        <button type='submit'>
          Add
        </button>
      </footer>
    </Form>
  </AddNew>
)
