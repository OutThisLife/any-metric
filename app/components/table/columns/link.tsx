import { IoLogoReddit, IoLogoTwitter } from 'react-icons/io'
import { MdOpenInNew } from 'react-icons/md'
import { compose, setDisplayName } from 'recompose'

import { Cell } from '.'
import { Link } from './style'

export default (compose<Cell<string>, Cell<string>>(
  setDisplayName('link')
) as any)(({ cellData: link, rowIndex }) => (
  <Link
    href={`//twitter.com/${link}`}
    target="_blank"
    rel="noopener"
    className="datasrc">
    {rowIndex % 2 ? <IoLogoTwitter /> : <IoLogoReddit />}
    <MdOpenInNew />
  </Link>
))
