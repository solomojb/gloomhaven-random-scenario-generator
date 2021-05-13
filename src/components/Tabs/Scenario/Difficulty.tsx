import React from "react"
import { Button, Form} from "semantic-ui-react";
import { useScenario } from "../../Providers/ScenarioProvider";

  type PenaltyProps = {
    penalty: string;
    roomNumber: number;
  };

  const PenaltyButton = (props: PenaltyProps) => {
    const { penalty, roomNumber } = props;
    const { penalties, setPenalty } = useScenario();
    return (
      <Button
        positive={penalties[roomNumber] === penalty}
        onClick={() => {
            setPenalty(roomNumber, penalty);}
        }
      >
        {`${penalty}`}
      </Button>
    );
  };

  type PenaltyButtonGroupProps = {
      roomNumber: number;
  }

  const PenaltyButtonGroup = (props: PenaltyButtonGroupProps) => {
      const {roomNumber} = props;
    return (
          <Form.Field inline>
              <Form.Group inline>
              <label>{`Room ${roomNumber}`}</label>
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
  

const Difficulty = () => {
    return <Form>
            <Form.Field>
                <label>Difficulty:</label>
                <PenaltyButtonGroup roomNumber={0}/>
                <PenaltyButtonGroup roomNumber={1}/>
                <PenaltyButtonGroup roomNumber={2}/>
            </Form.Field>
        </Form>

}

export default Difficulty;