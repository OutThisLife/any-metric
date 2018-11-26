import Heading from '@/components/Heading'
import { compose, setDisplayName } from 'recompose'

import Categories from './style'

export default compose<{}, {}>(setDisplayName('categories'))(() => (
  <>
    <Heading title="Category Filters" />

    <Categories
      is="ul"
      margin={0}
      padding={0}
      listStyle="none"
      paddingX="var(--pad)">
      <li>
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

          <li>
            <a href="javascript:;">8050 series</a>
          </li>

          <li>
            <a href="javascript:;">8050 series</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="javascript:;">Keyence</a>

        <ul>
          <li>
            <a href="javascript:;">CV</a>
          </li>
        </ul>
      </li>
    </Categories>
  </>
))
