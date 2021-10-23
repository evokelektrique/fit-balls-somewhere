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

/**
 * Convert meter to inch
 *
 * @param  {Integer} meter
 * @return {Integer}       Inch
 */
const to_inch = (meter) => {
   return meter * 39.37;
}

/**
 * Get element by ID
 *
 * @param  {String} id Element ID
 * @return {Object}    Element
 */
function get(id) {
   return document.getElementById(id);
}

/**
 * Calculate
 */
function draw() {
   const ball_diameter  = to_inch(parseFloat(get('b-diameter').value) || 0);
   const vehicle_name   = get('v-name').value;
   const vehicle_width  = to_inch(parseFloat(get('v-width').value) || 0);
   const vehicle_height = to_inch(parseFloat(get('v-height').value) || 0);
   const vehicle_length = to_inch(parseFloat(get('v-length').value) || 0);
   const result         = get('result');

   // Create a vehicle object and setup its properties in inches,
   // And I know these numbers don't make any sense but yeah.
   const v  = Vehicle;
   v.name   = vehicle_name;
   v.width  = vehicle_width;
   v.height = vehicle_height;
   v.length = vehicle_length;

   // Calcualte ball volume
   const ball_volume = Ball.calculate(ball_diameter);

   // Calculate vehicle volume
   const vehicle_volume = v.calculate();

   // Calcualte how many balls can fit in a vehicle
   const total_balls_to_fit = Math.floor(calculate_obstacles(ball_volume, vehicle_volume));

   const message = `You can fit <span class='green'>${total_balls_to_fit}</span> balls in a <span class='green'>${v.name}</span>`;
   result.innerHTML = message;
}

// Add an event listener to each input so whenever
// they have been changed draw a new result in DOM.
Array.from(document.querySelectorAll('input')).forEach(input => {
   input.addEventListener('keyup', draw);
   input.addEventListener('change', draw);
});

// Draw result at start
draw();
