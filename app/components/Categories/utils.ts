import { DataTableFilter } from '@/pages/Dashboard'
import { FakeResult } from '@/server/schema/types'

import { CategoryItem } from './Category'

export const parseData = (initialData: FakeResult[]): CategoryItem[] =>
  initialData
    .filter(d => d.tags.length)
    .map(d => d.tags[0])
    .filter((t, i, s) => s.indexOf(t) === i)
    .map(title => {
      const rel =
        initialData.filter(d => d.tags.length && d.tags.includes(title)) || []

      return {
        title,
        total: rel.length,
        items: rel.reduce(
          (acc, { tags }) =>
            tags.map(
              t =>
                !(acc.find(a => a.title === t) || t === title) &&
                acc.push({
                  title: t,
                  total: (rel.filter(d => d.tags.includes(t)) || []).length
                })
            ) && acc,
          []
        )
      }
    })

export const afterMouseDown = (filter: DataTableFilter) => () => {
  const $checked = document.querySelectorAll(
    '#filters [data-tag][data-checked]'
  )

  if (!$checked.length) {
    return filter({
      value: '',
      action: 'RESET'
    })
  }

  filter({
    action: 'TAG',
    value: [].slice
      .call($checked)
      .reduce((acc, el: HTMLElement) => {
        const $ul = el.offsetParent

        if ($ul instanceof HTMLLIElement) {
          const { tag } = $ul.dataset
          acc.push([tag, el.dataset.tag])
        } else {
          acc.push([el.dataset.tag])
        }

        return acc
      }, [])
      .join(';')
  })
}
