export default ({ i, size, onClick }) => (
  <span
    className='oi'
    data-glyph={i}
    onClick={onClick || (() => {})}
    style={{
      fontSize: size || '50%',
      transition: 'none'
    }}
  />
)
