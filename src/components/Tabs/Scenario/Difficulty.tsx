import React, { FormEvent, useState } from "react"
import { CheckboxProps, Form, Radio } from "semantic-ui-react";

type  DifficultyGroupProps = {
    handleChange: (roomNumber: number, penalty: string) => void
    roomNumber: number;
}

const DifficultyGroup = (props: DifficultyGroupProps) => {
    const { handleChange, roomNumber} = props;
    const [penalty, setPenalty] = useState("none")

    const onChange = (e:FormEvent, data: CheckboxProps) => {
        const { value } = data;
        setPenalty(value as string);
        handleChange(roomNumber, value as string);
    }
  
    return (
        <Form>
            <label>{`Room ${roomNumber + 1}`}</label>
            <Form.Field>
                <Radio
                    label='None'
                    name='radioGroup'
                    value='none'
                    checked={penalty === 'none'}
                    onChange={onChange}
                />
            </Form.Field>
            <Form.Field>
                <Radio
                        label='Minor'
                        name='radioGroup'
                        value='minor'
                        checked={penalty === 'minor'}
                        onChange={onChange}
                    />
            </Form.Field>
            <Form.Field>
                <Radio
                        label='Major'
                        name='radioGroup'
                        value='major'
                        checked={penalty === 'major'}
                        onChange={onChange}
                    />
            </Form.Field>
        </Form>
    )
  }

const Difficulty = () => {
    return <Form.Field>
                <Form.Group inline>
                    <label>Difficulty:</label>
                    <DifficultyGroup roomNumber={0} handleChange={console.log}/>
                    <DifficultyGroup roomNumber={1} handleChange={console.log}/>
                    <DifficultyGroup roomNumber={2} handleChange={console.log}/>
                </Form.Group>
            </Form.Field>

}

export default Difficulty;