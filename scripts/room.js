'use strict';

class Room {
    constructor(password) {
      this.playerList = [];
      this.password = password;
      this.inProgress = false;
    }
  
    getPlayerList() {
      return this.playerList;
    }
  
    getPassword() {
      return this.password;
    }
  
    getInProgress() {
      return this.inProgress;
    }

    setInProgress(bool) {
        this.inProgress = bool;
    }
  
    addPlayer(player) {
      this.playerList.push(player);
    }
}
  