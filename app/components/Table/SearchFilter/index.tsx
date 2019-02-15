import { FloatingFilterProps } from '..'

export default ({ label, api }: FloatingFilterProps) => (
  <input
    type="text"
    placeholder={label}
    className="ag-floating-filter-input"
    onInput={({ target }) =>
      target instanceof HTMLInputElement &&
      window.requestAnimationFrame(() => api.setQuickFilter(target.value))
    }
  />
)
