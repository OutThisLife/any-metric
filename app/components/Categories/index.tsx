import { BoxProps } from '@/components/Box'
import Form from '@/components/Form'
import Module from '@/components/Module'
import { compose, setDisplayName } from 'recompose'

import Categories, { Group } from './style'

export default compose<CategoryProps, CategoryProps>(
  setDisplayName('categories')
)(props => (
  <Module
    title="Category Filters"
    cta={() => <Form.Button variant="basic | pill">New Filter</Form.Button>}
    maxHeight="calc(100vh * 0.7 / 2.2)"
    overflow="auto">
    <Categories
      is="ul"
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      gridGap="var(--pad)"
      alignItems="flex-start"
      margin={0}
      padding={0}
      listStyle="none"
      {...props}>
      <Filler />
      <Filler className="active" />
      <Filler />
      <Filler />
    </Categories>
  </Module>
))

export const Filler = props => (
  <Group is="li" {...props}>
    <a href="javascript:;">Cognex DataMan</a>

    <ul>
      <li>
        <a href="javascript:;">8050 series</a>

        <ul>
          <li>
            <a href="javascript:;">empty</a>
          </li>

          <li>
            <a href="javascript:;">cables</a>
          </li>
        </ul>
      </li>

      <li className="active">
        <a href="javascript:;">8050 series</a>
      </li>

      <li>
        <a href="javascript:;">8050 series</a>
      </li>
    </ul>
  </Group>
)

export type CategoryProps = BoxProps<HTMLUListElement>
