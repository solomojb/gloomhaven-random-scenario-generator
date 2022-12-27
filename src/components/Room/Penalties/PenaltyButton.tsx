import React from "react";

import { Button } from "semantic-ui-react";
import { useScenario } from "../../Providers/ScenarioProvider";

type PenaltyProps = {
    penalty: string;
    roomNumber: number;
  };

export const PenaltyButton = (props: PenaltyProps) => {
    const { penalty, roomNumber } = props;
    const { scenarioData:{penaltyChosen}, setPenaltyChosen} = useScenario();
    const penaltyForRoom = penaltyChosen[roomNumber] || "none";

    return (
      <Button
        positive={penaltyForRoom === penalty}
        onClick={() => {
            setPenaltyChosen(roomNumber, penalty);}
        }
      >
        {`${penalty}`}
      </Button>
    );
  };