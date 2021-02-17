import React from "react";
import { Button, Form } from "semantic-ui-react";
import { usePlayerCount } from "../../Providers/PlayerCountProvider";

type PlayerButtonProps = {
  count: number;
};

const PlayerButton = (props: PlayerButtonProps) => {
  const { playerCount, setPlayerCount } = usePlayerCount();
  const { count } = props;
  return (
    <Button
      positive={playerCount === count}
      onClick={() => {
        console.log("setting count to ", count);
        setPlayerCount(count);}
      }
    >
      {`${count}${count > 3 ? "+" : ""}`}
    </Button>
  );
};

const PlayerCount = () => {
  return (
    <Form.Field>
      <Form.Group inline>
        <label>Number of players:</label>
        <Button.Group>
          <PlayerButton count={2} />
          <Button.Or />
          <PlayerButton count={3} />
          <Button.Or />
          <PlayerButton count={4} />
        </Button.Group>
      </Form.Group>
    </Form.Field>
  );
};

export default PlayerCount;
