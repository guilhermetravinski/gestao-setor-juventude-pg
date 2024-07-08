/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import InputMask from 'react-input-mask'

import { Input, InputProps } from '@/components/ui/input'

interface MaskedInputProps extends InputProps {
  mask: string
}

const MaskedInput: React.FC<MaskedInputProps> = ({ mask, ...props }) => {
  return (
    <InputMask mask={mask} {...props}>
      {(inputProps: any) => <Input {...inputProps} />}
    </InputMask>
  )
}

export default MaskedInput
