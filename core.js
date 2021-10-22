/**
 * Defining the vehicle we're going use to
 * calculate how many balls can we fit in it.
 * Note: We're going to use "Inch" unit length.
 *
 * @type {Object}
 */
let Vehicle = {
   name:  "",
   width:  0,
   height: 0,
   length: 0,

   /**
    * Calculate vehicle volume
    *
    * @return {Integer} Vehicle volume
    */
   calculate() {
      return this.width * this.height * this.length;
   }
};

/**
 * Ball / Any object to fit in somewhere
 *
 * @type {Object}
 */
let Ball = {
   /**
    * Calculate sphere volume
    *
    * @param  {Integer} diameter
    * @return {Integer}          Volume
    */
   calculate(diameter) {
      let radius = diameter  / 2;
      let volume = 4 / 3 * Math.PI * radius**3
      return Math.floor(volume);
   }
};

/**
 * Reduse the vehicle volume by half because of
 * obstacles are in the vehicle and reduce half
 * again because there is air between our balls.
 *
 * @param  {Integer} ball_volume
 * @param  {Integer} vehicle_volume
 * @return {Integer}                Total balls to fit in a vehicle
 */
function calculate_obstacles(ball_volume, vehicle_volume) {
   const volume = (vehicle_volume * 0.5) * 0.5;
   const total_balls_to_fit = volume / ball_volume;

   return total_balls_to_fit;
}

// Create a vehicle object and setup its properties in inches,
// And I know these numbers don't make any sense but yeah.
const v  = Vehicle;
v.name   = "car";
v.width  = 100;
v.height = 50;
v.length = 1000;

// Calcualte ball volume
const diameter    = 2;
const ball_volume = Ball.calculate(diameter);

// Calculate vehicle volume
const vehicle_volume = v.calculate();

// Calcualte how many balls can fit in a vehicle
const total_balls_to_fit = calculate_obstacles(ball_volume, vehicle_volume);

console.log(`We can fit ${total_balls_to_fit} balls in a ${v.name}`);
