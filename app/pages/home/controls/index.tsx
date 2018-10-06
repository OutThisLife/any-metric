import { Layout } from 'react-grid-layout'
import { IoIosFunnel, IoIosList, IoMdApps } from 'react-icons/io'

interface TOutter {
  setter: (layout: Layout[]) => void
}

export default (props: TOutter) => (
  <nav>
    <div>
      <a href="javascript:;">
        <IoMdApps />
      </a>

      <a href="javascript:;">
        <IoIosList />
      </a>
    </div>

    <div>
      <a href="javascript:;">
        <IoIosFunnel />
      </a>
    </div>
  </nav>
)
