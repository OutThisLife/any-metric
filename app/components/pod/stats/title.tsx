import { Heading, Icon, Text } from 'evergreen-ui'
import { compose } from 'recompose'

interface TOutter {
  title: string | JSX.Element
  stat?: {
    title: string | number
    rate: string | number
    intent: 'danger' | 'success' | string
    icon: string
  }
}

export default compose<TOutter, TOutter>(({ title, stat }) => (
  <hgroup>
    <Heading is="h2" size={400} color="muted">
      {title}
    </Heading>

    {stat && (
      <>
        <Text size={600}>{stat.title}</Text>
        <Text size={500} color={stat.intent}>
          <Icon icon={stat.icon} marginRight={4} marginLeft={4} />
          {stat.rate}
        </Text>
      </>
    )}
  </hgroup>
))
