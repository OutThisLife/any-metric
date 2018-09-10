import { Input } from '@/components/input'
import { TextareaHTMLAttributes } from 'react'

export default (props: TextareaHTMLAttributes<any>) => <Textarea spellCheck={false} {...props} />

const Textarea = Input.extend`
  resize: ${({ resize = 'none' }: any) => resize};

  &::-webkit-scrollbar {
    width: 7px;
  }
`.withComponent('textarea')
