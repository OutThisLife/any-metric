import Button from '@/components/button'
import { IoMdAddCircle } from 'react-icons/io'
import { IconType } from 'react-icons/lib/iconBase'

import Title from './styled'

interface TOutter {
  title: string
  services: IconType[]
}

export default ({ title, services = [() => null] }: TOutter) => (
  <Title>
    <div className="drag-h" />

    <div>
      <small>
        Updated&nbsp;
        <time>6 hours ago</time>
        <span>
          &mdash;
          <a href="javascript:;" onClick={e => e.stopPropagation()}>refresh</a>
          ,&nbsp;
          <a href="javascript:;" onClick={e => e.stopPropagation()}>schedule</a>
        </span>
      </small>
    </div>

    <div>
      <h2>
        <a href="javascript:;">{title}</a>
      </h2>

      <nav>
        {services.length && (
          <figure>
            {[].slice.call(services).map((I: IconType) => (
              <a key={Math.random()} href="javascript:;">
                <I />
              </a>
            ))}
          </figure>
        )}

        <Button href="javascript:;" Icon={<IoMdAddCircle />} />
      </nav>
    </div>
  </Title>
)
