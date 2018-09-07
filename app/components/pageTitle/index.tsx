import styled from 'styled-components'

const PageTitle = styled.hgroup`
margin: 0 0 20px;

h1 {
  font-weight: 300;
  font-size: calc(24px + (40 - 24) * (100vw - 400px) / (2000 - 400));
  margin: 0 0 10px;
}

small {
  display: inline-block;
  margin-right: 5px;
}

.oi {
  color: #FFF;
}
`

export default ({ title, children }) => (
  <PageTitle>
    <h1 dangerouslySetInnerHTML={{ __html: title }} />
    {children}
  </PageTitle>
)
