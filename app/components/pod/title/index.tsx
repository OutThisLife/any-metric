import Button from '@/components/button'
import Title from '@/components/pod/title/style'
import { IconType } from 'react-icons/lib/iconBase'
import { MdLibraryAdd } from 'react-icons/md'
import { compose, setDisplayName } from 'recompose'

interface TOutter {
  title: string
  services: IconType[]
}

export default compose<TOutter, TOutter>(setDisplayName('pod-title'))(
  ({ title, services = [] }) => (
    <Title>
      <div className="drag-h" />

      <div>
        <h2>{title}</h2>

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

          <Button
            href="javascript:;"
            Icon={<MdLibraryAdd />}
            data-tip="Add Source"
          />
        </nav>
      </div>

      <div>
        <small>
          Updated&nbsp;
          <time>6 hours ago</time>
          <span>
            &mdash;
            <a href="javascript:;" onClick={e => e.stopPropagation()}>
              refresh
            </a>
            ,&nbsp;
            <a href="javascript:;" onClick={e => e.stopPropagation()}>
              schedule
            </a>
          </span>
        </small>
      </div>
    </Title>
  )
)
