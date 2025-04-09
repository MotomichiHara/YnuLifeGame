'use strict';

class Player {
    constructor(playerName) {
      // プレイヤ名
      this.playerName = playerName;
      // 学部
      this.major;
      // 生活スタイル
      this.lifestyle;
      // サークル
      this.circle;
      // バイト
      this.ptjob;
      // 進路
      this.course;
      // 所持金
      this.money = 0;
      // 単位
      this.credit = 0;
      // 社交性
      this.sociability = 0;
      // 行動力
      this.energy = 0;
      // 専門性
      this.specialty = 0;
      // 経験値
      this.exp = 0;
      // 学籍番号
      this.studentID;
      // 選択したアイコン（コマ）の種類
      this.icon;
    }
  
    // 各変数のゲッター
    getPlayerName() {
      return this.playerName;
    }
  
    getMajor() {
      return this.major;
    }
  
    getLifestyle() {
      return this.lifestyle;
    }
  
    getCircle() {
      return this.circle;
    }
  
    getPtjob() {
      return this.ptjob;
    }
  
    getCourse() {
      return this.course;
    }
  
    getMoney() {
      return this.money;
    }
  
    getCredit() {
      return this.credit;
    }
  
    getSociability() {
      return this.sociability;
    }
  
    getEnergy() {
      return this.energy;
    }
  
    getSpecialty() {
      return this.specialty;
    }
  
    getExp() {
      return this.exp;
    }
  
    getStudentID() {
      return this.studentID;
    }
  
    getIcon() {
      return this.icon;
    }
  
    // 各変数のセッター
    setPlayerName(name) {
      this.playerName = name;
    }
  
    setMajor(major) {
      this.major = major;
    }
  
    setLifestyle(lifestyle) {
      this.lifestyle = lifestyle;
    }
  
    setCircle(circle) {
      this.circle = circle;
    }
  
    setPtjob(ptjob) {
      this.ptjob = ptjob;
    }
  
    setCourse(course) {
      this.course = course;
    }
  
    setMoney(money) {
      this.money = money;
    }
  
    setCredit(credit) {
      this.credit = credit;
    }
  
    setSociability(sociability) {
      this.sociability = sociability;
    }
  
    setEnergy(energy) {
      this.energy = energy;
    }
  
    setSpecialty(specialty) {
      this.specialty = specialty;
    }
  
    setExp(exp) {
      this.exp = exp;
    }
  
    setStudentID(id) {
      this.studentID = id;
    }
  
    setIcon(icon) {
      this.icon = icon;
    }
  
    // 増減する変数の計算
    calcMoney(num) {
      this.money += num;
    }

    calcCredit(num) {
        this.credit += num;
    }

    calcSociability(num) {
        this.sociability += num;
    }

    calcEnergy(num) {
      this.energy += num;
      if(this.energy > 200)
      {
        this.energy = 200;
      }
    }

    calcSpecialty(num) {
        this.specialty += num;
    }

    calcExp(num) {
        this.exp += num;
    }
}
  