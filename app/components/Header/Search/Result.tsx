import Text from '@/components/Text'
import { moneyFormat } from '@/lib/utils'
import { EbayItem } from '@/server/schema/types'

export default (props: EbayItem) => (
  <a href={props.viewItemURL} target="_blank" rel="noopener">
    <figure>
      {'galleryURL' in props && (
        <img src={props.galleryURL} alt={props.title} />
      )}
    </figure>

    <aside>
      <Text
        as="p"
        css={`
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.5;
          margin: 0;
        `}
        dangerouslySetInnerHTML={{ __html: props.title }}
      />

      {'currentPrice' in props.sellingStatus && (
        <Text
          as="p"
          css={`
            color: ${({ theme }) => theme.colours.muted};
            margin: 0;
          `}>
          {moneyFormat(props.sellingStatus.currentPrice[0].__value__)}
        </Text>
      )}
    </aside>
  </a>
)
