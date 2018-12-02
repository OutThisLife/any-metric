import Heading, { HeadingOutterProps } from '@/components/Heading'
import { Box, BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import Module from './style'

export default compose<ModuleProps, ModuleProps>(setDisplayName('module'))(
  ({ children, title, cta, ...props }) => (
    <>
      {title && <Heading title={title} cta={cta} />}

      <Module mt="1rem" {...props}>
        <Box as="div">{children}</Box>
      </Module>
    </>
  )
)

export interface ModuleProps extends BoxProps, HeadingOutterProps {
  as?: any
}
