import React, { InputHTMLAttributes } from 'react'
import { FormGroup, Label } from 'reactstrap'
import { InputType } from 'reactstrap/lib/Input'
import classNames from 'classnames'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  type: InputType
  inputClass?: string
  formGroupClass?: string
  required?: boolean
  input?: any
  meta?: any
  autoFocus?: boolean
  others?: any
}

class FormGroupInput extends React.Component<Props> {
  private inputRef: any

  public constructor(props: Props) {
    super(props)
    this.inputRef = React.createRef()
  }

  public componentDidMount() {
    const { autoFocus } = this.props
    autoFocus && setTimeout(() => {
      this.inputRef.current.focus()
    }, 0)
  }

  render() {
    const { label, type, inputClass, formGroupClass, input, meta: { touched, error }, required, autoFocus, ...others } = this.props
    return (
      <FormGroup className={formGroupClass}>
        {label && <Label for={name}>{label}</Label>}
        <input
          {...input}
          type={type}
          className={classNames('form-control', inputClass, { 'border border-danger' : touched && error })}
          required={required}
          autoFocus={autoFocus}
          ref={this.inputRef}
          autoCorrect="off"
          autoCapitalize="none"
          {...others}
        />
      { touched && error && <div className="font-10 text-danger pl-2 py-1">{error}</div> }
      </FormGroup>
    )
  }
}

export default FormGroupInput
