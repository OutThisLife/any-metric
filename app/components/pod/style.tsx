import 'react-virtualized/styles.css'

import Panel from '@/components/panel'
import styled from 'styled-components'

export default styled(Panel)`
  > div {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: min-content 1fr;
    height: 100%;
  }

  header {
    grid-row: 1;
    grid-column: 1 / -1;
  }

  header + div[style] {
    grid-row: 2;
    grid-column: ${({ isOpen }: any) => isOpen ? '1 / 1' : '1 / -1'};
    width: 100% !important;

    [style*="width"] {
      width: 100% !important;
    }
  }

  aside {
    grid-row: 2;
    grid-column: 2 / 2;
    transition: .3s ease-in-out;
  }
` as any
