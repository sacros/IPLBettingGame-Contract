pragma solidity ^0.4.23;
import "./Mortal.sol";


contract IPLGame is Mortal {
    uint currentGame = 1;
    mapping(uint=>mapping(string=>address[])) predictions;
    mapping(uint=>mapping(address=>uint)) public betAmount;
    mapping(uint=>string) public teamName;
    event Winner(address winner, uint amount);

    uint minimumAmount = 1 finney;
    function makeBet(uint _matchId, uint _team) public payable {
        require((msg.value >= minimumAmount), "Minimum bet of 1 finney can be placed.");
        predictions[_matchId][teamName[_team]].push(msg.sender);
        betAmount[_matchId][msg.sender] = msg.value;
    }
    function addTeams(uint _index, string _team) onlyOwner(owner) public {
        teamName[_index] = _team;
    }
    function getPredictions(uint _matchId, uint _team) public view returns (address[]) {
        return predictions[_matchId][teamName[_team]];
    }
    function setResult(uint _matchId, uint _winningTeamId, uint _losingTeamId) onlyOwner(owner) public {
        require((_matchId == currentGame), "Only set the results for current game");

        address[] memory losers = predictions[_matchId][teamName[_losingTeamId]];
        uint toDistribute;
        uint total;
        for(uint i = 0; i < losers.length; i++){
            toDistribute += betAmount[_matchId][losers[i]];
        }
        toDistribute = (toDistribute/10)*9;

        address[] memory winners = predictions[_matchId][teamName[_winningTeamId]];
        for(i = 0; i < winners.length; i++){
            total += betAmount[_matchId][winners[i]];
        }
        for(i = 0; i < winners.length; i++){
            uint transferAmount = ((toDistribute/total)+1)*betAmount[_matchId][winners[i]];
            winners[i].transfer(transferAmount);
            emit Winner(winners[i], transferAmount);
        }
        currentGame++;
    }
}