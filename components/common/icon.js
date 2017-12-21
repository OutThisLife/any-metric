export default ({ i, size }) => (
  <span
    className='oi'
    data-glyph={i}
    style={{
      fontSize: size || '50%',
      transition: 'none'
    }}
  />
)
