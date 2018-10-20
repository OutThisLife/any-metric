import { IoLogoReddit, IoLogoTwitter } from 'react-icons/io'
import { MdOpenInNew } from 'react-icons/md'

import { Cell } from '.'
import { Link } from './style'

export default ({ cellData: link, rowIndex }: Cell<string>) => (
  <Link
    href={`//twitter.com/${link}`}
    target="_blank"
    rel="noopener"
    className="datasrc">
    {rowIndex % 2 ? <IoLogoTwitter /> : <IoLogoReddit />}
    <MdOpenInNew />
  </Link>
)
