import React from "react";
import { Button, Form } from "semantic-ui-react";
import { PenaltyButton } from "./PenaltyButton";

type PenaltyButtonGroupProps = {
    roomNumber: number;
}

export const PenaltyButtonGroup = (props: PenaltyButtonGroupProps) => {
    const {roomNumber} = props;
  return (
        <Form.Field inline>
            <Form.Group inline>
            <Button.Group>
                <PenaltyButton penalty="none" roomNumber={roomNumber}/>
                <Button.Or />
                <PenaltyButton penalty="minor" roomNumber={roomNumber}/>
                <Button.Or />
                <PenaltyButton penalty="major" roomNumber={roomNumber}/>
            </Button.Group>
            </Form.Group>
        </Form.Field>
  );
};
