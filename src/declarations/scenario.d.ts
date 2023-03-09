type RoomData = {
    dungeonName: string;
    monsterName: string;
    chosenEntrance: string;
    chosenExit:string;
}
type ScenarioData = {
    rooms: RoomData[];
    penaltyChosen: Record<number, string>;
    gamesIncluded: string[]
    infiniteRooms: boolean;
}
