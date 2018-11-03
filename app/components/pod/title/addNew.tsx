import Button from '@/components/button'
import { Pane, Popover, SelectField, TextInputField } from 'evergreen-ui'
import { compose, setDisplayName, withState } from 'recompose'

interface TOutter {
  [key: string]: any
}

export default compose<TOutter, TOutter>(
  setDisplayName('add-new'),
  withState('isLoading', 'setLoading', false)
)(({ variant, setLoading, isLoading, ...props }) => (
  <Popover
    {...props}
    minWidth={0}
    minHeight={0}
    onCloseComplete={() => setLoading(false)}
    content={({ close }) => (
      <>
        <Pane padding={15} paddingBottom={0}>
          {variant === 'select' ? (
            <>
              <SelectField label="Refetch Time Interval" disabled={isLoading}>
                <option disabled>5 minutes</option>
                <option disabled>15 minutes</option>
                <option>30 minutes</option>
                <option>every hour</option>
                <option>every 4 hours</option>
                <option>once per day</option>
                <option>once per week</option>
              </SelectField>
            </>
          ) : (
            <TextInputField
              disabled={isLoading}
              name="source-url"
              label="Choose a 'target' to scrape"
              placeholder="Source URL"
              required
            />
          )}
        </Pane>

        <Pane padding={16} borderTop="muted" clearfix>
          <Pane float="right">
            <Button type="reset" title="Cancel" onClick={close} />
            <Button
              type="submit"
              title="Submit"
              appearance="primary"
              marginLeft={8}
              isLoading={isLoading}
              onClick={() => setLoading(!isLoading)}
            />
          </Pane>
        </Pane>
      </>
    )}
  />
))
