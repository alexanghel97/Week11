"use strict";

function Driver(name, walletMoney) {
  this.name = name;
  this.walletMoney = walletMoney;
}

function Highway(vignetteCost) {
  this.vehicleList = [];
  this.vignetteCost = vignetteCost;
}

Highway.prototype.enterHighway = function (vehicle) {
  if (vehicle instanceof Vehicle) {
    this.vehicleList.push(vehicle);
    vehicle.increaseSpeed(30);
    if (!(vehicle instanceof Police)) {
      vehicle.payVignette(this.vignetteCost);
    }
  }
};

function Vehicle(name, runningSpeed, driver) {
  this.name = name;
  this.runningSpeed = runningSpeed;
  this.driver = driver;
}

Vehicle.prototype.increaseSpeed = function (speed) {
  this.runningSpeed = this.runningSpeed + speed;
};

function Bus(name, runningSpeed, driver) {
  Vehicle.call(this, name, runningSpeed, driver);
  this.constructorName = "Bus";
}
Bus.prototype = Object.create(Vehicle.prototype);
Bus.prototype.constructor = Bus;

function Car(name, runningSpeed, driver) {
  Vehicle.call(this, name, runningSpeed, driver);
  this.constructorName = "Car";
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

function Truck(name, runningSpeed, driver) {
  Vehicle.call(this, name, runningSpeed, driver);
  this.constructorName = "Truck";
}

Truck.prototype = Object.create(Vehicle.prototype);
Truck.prototype.constructor = Truck;

function Police(name, runningSpeed, driver) {
  Vehicle.call(this, name, runningSpeed, driver);
}

Police.prototype = Object.create(Vehicle.prototype);

Police.speedLimitsByVehicleType = {
  Bus: 110,
  Car: 130,
  Truck: 100,
};

Police.fineByVehicleType = {
  Bus: 350,
  Car: 450,
  Truck: 400,
};

Police.prototype.checkVehicleSpeed = function (vehicle) {
  const fine = Police.fineByVehicleType[vehicle.constructorName];
  console.log(
    `Speed limit exceeded by ${vehicle.name}, the fine is ${fine} $!`
  );
};
Highway.prototype.verifySpeedLimits = function () {
  const policeCar = new Police("Police Car", 0, new Driver("Officer", 0));
  for (let i = 0; i < this.vehicleList.length; i++) {
    let vehicle = this.vehicleList[i];
    if (
      vehicle.runningSpeed >
      policeCar.speedLimitsByVehicleType[vehicle.constructorName]
    ) {
      policeCar.checkVehicleSpeed(vehicle);
    }
  }
};

Vehicle.prototype.payVignette = function (cost) {
  if (this.driver.walletMoney >= cost) {
    this.driver.walletMoney = this.driver.walletMoney - cost;
    console.log(
      `${this.driver.name} paid an amount of ${cost}$ for the vignette !`
    );
  } else {
    console.log(
      `${this.driver.name} doesn't have enough money to pay the vignette !`
    );
  }
};

let highway = new Highway(10);

const policeDriver = new Driver("Officer Owens", 0);
const policeCar = new Police("Dacia", 0, policeDriver);

const driverMark = new Driver("Mark", 500);
const car = new Car("BMW", 120, driverMark);

const driverJohn = new Driver("John", 400);
const bus = new Bus("Mercedes", 110, driverJohn);

const driverMike = new Driver("Mike", 780);
const truck = new Truck("Volvo", 110, driverMike);

highway.enterHighway(policeCar);
highway.enterHighway(car);
highway.enterHighway(bus);
highway.enterHighway(truck);

highway.verifySpeedLimits();
