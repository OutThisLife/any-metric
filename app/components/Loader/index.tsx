import { AtomSpinner } from 'react-epic-spinners'
import { Flex, FlexProps } from 'rebass'

export default ({ size = 60, ...props }: FlexProps & any) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    css={`
      overflow: hidden;

      @media (max-width: 1025px) {
        padding: var(--pad);
      }
    `}>
    <AtomSpinner
      className="chart-spinner"
      color="#ddd"
      animationDuration={668}
      size={size}
      style={{}}
      {...props}
    />
  </Flex>
)
