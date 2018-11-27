import { BoxProps } from '@/components/Box'
import Form from '@/components/Form'
import Module from '@/components/Module'
import withSelections, { SelectionsProps } from '@/lib/withSelections'
import { BaphoTheme } from '@/theme'
import faker from 'faker'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import Text from '../Text'
import Categories, { Group } from './style'

export default compose<CategoryProps, CategoryProps>(
  setDisplayName('categories'),
  withSelections
)(({ handleMouse, ...props }) => (
  <Module
    title="Category Filters"
    cta={() => (
      <Form.Button variant="basic | pill" marginLeft={20}>
        New Filter
      </Form.Button>
    )}
    maxHeight="calc(100vh * 0.7 / 2.4)"
    overflow="auto">
    <Categories
      is="ul"
      margin={0}
      padding={0}
      listStyle="none"
      onMouseDown={handleMouse}
      {...props}>
      <Filler title="Cognex" />
      <Filler title="Keyence" />
      <Filler title="Equi" />
      <Filler title="Motrox" />
    </Categories>
  </Module>
))

export const Filler = withTheme(
  ({ theme, title, ...props }: CategoryProps & BaphoTheme) => (
    <Group is="li" {...props}>
      <Text is="a" href="javascript:;" display="flex" alignItems="center">
        <Text is="span" backgroundImage={theme.colours.company}>
          {title}
        </Text>

        <Text
          is="span"
          display="inline-block"
          fontSize="0.9em"
          lineHeight={1}
          verticalAlign="middle"
          margin={0}
          paddingX={5}>
          ({faker.random.number({ max: 25 })})
        </Text>
      </Text>

      <ul>
        <li className="row">
          <a href="javascript:;">8050 series</a>

          <ul>
            <li className="row">
              <a href="javascript:;">empty</a>
            </li>

            <li className="row">
              <a href="javascript:;">cables</a>
            </li>
          </ul>
        </li>

        {Math.random() > 0.5 && (
          <li className="row">
            <a href="javascript:;">8050 series</a>
          </li>
        )}

        {Math.random() > 0.5 && (
          <li className="row">
            <a href="javascript:;">8050 series</a>
          </li>
        )}
      </ul>
    </Group>
  )
)

export type CategoryProps = BoxProps<HTMLUListElement> & SelectionsProps
