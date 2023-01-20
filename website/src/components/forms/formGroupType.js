import { Button, ButtonGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ErorMessage from "./Error";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function FormGroupType(props) {
    function onKey(e) {
        if (e.key === 'Enter') {
            let next = null
            e.target.type === 'text'?
            next = e.target.parentElement.parentElement.nextElementSibling 
            :(e.target.type==='tel'? 
                next = e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling
                :(e.target.type==='button'?
                    next = e.target.parentElement.parentElement.parentElement.nextElementSibling
                    :
                    next = e.target.parentElement.parentElement.nextElementSibling 
                )
            )
            if (next) {
                e.preventDefault()
                const nextToFocus = next.getElementsByTagName('input')[0] || next.getElementsByTagName('select')[0] || next.getElementsByTagName('button')[0]
                nextToFocus.focus()
            }
            e.target.tagName !== 'SELECT' && props.onblur(e)
        }
    }

    const type = () => {
        if (props.type !== 'option' && props.type !== 'button') {
            return (<>
                {props.type == 'phone' ? <div>
                    <PhoneInput
                        country={'il'}
                        inputProps={{ name: props.name }}
                        value={props.value}
                        onBlur={props.onblur}
                        onKeyDown={onKey}
                        enableSearch={true}
                        placeholder='972 052 367 8910'
                        inputClass="phoneClass"
                    />
                </div>
                    : <Form.Control
                        type={props.type.includes('password') ? props.viewed : props.type}
                        min={props.min}
                        placeholder={props.placeholder}
                        defaultValue={props.value}
                        name={props.name}
                        onKeyPress={onKey}
                        onInput={props.onInput}
                        onBlur={props.onblur}
                        autoComplete={props.type.includes('password') ? 'off' : ''}
                    />}
                {
                    props.type.includes('password') &&
                    <InputGroup.Text className={`bi bi-eye`} onClick={(e) => props.view(e)}></InputGroup.Text>
                }
            </>)
        }
        else if (props.type === 'option') {
            return (<Form.Control onKeyDown={onKey} onClick={(e) => props.optioneror(e, props.name)} defaultValue={props.value} as='select'>
                <option value=''>{props.placeholder}</option>
                {returnOptions('option')}
            </Form.Control>)
        }
        else if (props.type === 'button') {
            return (<ButtonGroup aria-label="Basic example" onKeyDown={onKey}>
                {returnOptions('button')}
            </ButtonGroup>)
        }
    }

    function returnOptions(type) {
        const array = []
        if (type === 'button') {
            for (const str of props.options) {
                if (props.value && props.value === str) {
                    array.push(<Button key={str} className='choicesbuttons choosen' name={props.name} value={str} onClick={(e) => props.changeButton(e, props.name)}>{str}</Button>)
                }
                else {
                    array.push(<Button key={str} className='choicesbuttons' name={props.name} value={str} onClick={(e) => props.changeButton(e, props.name)}>{str}</Button>)
                }
            }
        }
        else {
            for (const str of props.options) {
                array.push(<option key={str} onKeyDown={onKey} name={props.name} value={str}>{str}</option>)
            }
        }
        return (array)
    }

    return (
        <Form.Group md="4" controlId={`validationCustom${props.label}`} className={props.class}>
            {props.iconName ? <Form.Label>{props.label}</Form.Label> : ''}
            <InputGroup>
                <InputGroup.Text className={`bi bi-${props.iconName}`}>{props.iconName ? '' : props.label}</InputGroup.Text>
                {type()}
                {props.validate.require ? <span className="red star">*</span> : ''}
            </InputGroup>
            <ErorMessage id={props.id} eror={props.eror}></ErorMessage>
        </Form.Group>
    )
}
export default FormGroupType