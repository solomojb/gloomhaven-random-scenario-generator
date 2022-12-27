import React from "react";

import { Button } from "semantic-ui-react";
import { useScenario } from "../../Providers/ScenarioProvider";

type PenaltyProps = {
    penalty: string;
    roomNumber: number;
  };

export const PenaltyButton = (props: PenaltyProps) => {
    const { penalty, roomNumber } = props;
    const { scenarioData:{penalties}, setPenalty} = useScenario();

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