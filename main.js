var s1 = require('./data1.js');
var s2 = require('./data2.js');
var s3 = require('./data3.js');
var s4 = require('./data4.js');
var s5 = require('./data5.js');
var s6 = require('./data6.js');
var s7 = require('./data7.js');
var s8 = require('./data8.js');
var s9 = require('./data9.js');
var s10 = require('./data10.js');
var input = require('./input.js');

// length of Diagonal of boudning box
function lengthOfDiagonal(x,y,time) {
    xmax=-1*Math.pow(10, 10);
    ymax=-1*Math.pow(10, 10);
    xmin=Math.pow(10, 10);
    ymin=Math.pow(10, 10);
    for (let i = 0; i < x.length; i++) {
        if (x[i] < xmin) {
            xmin = x[i]
        }
        if (x[i] > xmax) {
            xmax = x[i]
        }
        if (y[i] < ymin) {
            ymin = y[i]
        }
        if (y[i] > ymax) {
            ymax = y[i]
        }
    }
    diagnonal = Math.sqrt(Math.pow((ymax-ymin),2)+Math.pow((xmax-xmin),2))
    return diagnonal;
}
// angle of Diagonal of boudning box
function diagonalAngle(x,y,time) {
    xmax=-1*Math.pow(10, 10);
    ymax=-1*Math.pow(10, 10);
    xmin=Math.pow(10, 10);
    ymin=Math.pow(10, 10);
    for (let i = 0; i < x.length; i++) {
        if (x[i] < xmin) {
            xmin = x[i]
        }
        if (x[i] > xmax) {
            xmax = x[i]
        }
        if (y[i] < ymin) {
            ymin = y[i]
        }
        if (y[i] > ymax) {
            ymax = y[i]
        }
    }
    diagnonal_angle = Math.atan((ymax-ymin)/(xmax-xmin))
    return diagnonal_angle;
}


//max Speed of this stroke
function maxSpeed(x,y,time){
    max_speed = 1
    for (let i = 0; i < x.length - 1; i++) {
        speed = (Math.pow((x[i+1] - x[i-1]),2)+Math.pow((y[i+1] - y[i-1]),2))/Math.pow((time[i+1] - time[i-1]),2)
        if (speed < 10000000000 && max_speed <  speed){
            max_speed = speed
        }
    }
    return max_speed;
}

//max Speed divide by length of diagonal to know the max relative speed
function maxRelativeSpeed(x,y,time){
    return maxSpeed(x,y,time) / (lengthOfDiagonal(x,y,time))
}

//average speed 
function averageSpeed(x,y,time) {
    return lengthOfStroke(x,y,time) / totalTime(x,y,time);
}

//average Speed divide by length of diagonal to know the average relative speed
function averageRelativeSpeed(x,y,time){
    return averageSpeed(x,y,time) / lengthOfDiagonal(x,y,time)
}

//stroke total time
function totalTime(x,y,time) {
    total_time = time[time.length - 1]- time[0]
        return total_time;
}

//length of sorke
function lengthOfStroke(x,y,time){
    sum = 0
    for(let i = 0;i < x.length - 1; i++){
        sum = Math.sqrt(Math.pow((y[i+1] -y[i]),2) + Math.pow((x[i+1] -x[i]),2)) + sum
    }
    return sum;
}

//mid part(from one third of stroke to two third of stroke) average speed
function midPartAverageSpeed(x,y,time) {
    part1_l = Math.round((x.length - 1) / 3)
    part2_l = Math.round((x.length -1)*2/3)
    part_length = 0
    for (let i = part1_l ; i < part2_l; i++) {
        part_length = Math.sqrt(Math.pow((y[i+1] - y[i]), 2) + Math.pow((x[i+1] - x[i]), 2)) + part_length
    }

    part_average_speed = part_length / (time[part2_l] - (time[part1_l]))
        return part_average_speed
}
//divided by length of diagonal to calculate relative average mid part speed
function midPartRelativeAverageSpeed(x,y,time){
    return midPartAverageSpeed(x,y,time)/lengthOfDiagonal(x,y,time)
}


//calculate which part(0-99) has high speed(over double of average)
function highSpeedPoints(x,y,time){
    let output= []
    let tem = []
    let averSpeed= averageSpeed(x,y,time)
    for(let i = 0 ;i<x.length-1;i++){
        if(((Math.pow((x[i+1] - x[i]),2)+Math.pow((y[i+1] - y[i]),2))/Math.pow((time[i+1] - time[i]),2)) > 2*averSpeed){
            output.push(Math.round(i*100/x.length))
        }
    }
    return output
}


let match_point = 0
let hs1= highSpeedPoints(s1.x,s1.y,s1.time)
let hs2= highSpeedPoints(s2.x,s2.y,s2.time)
let hs3= highSpeedPoints(s3.x,s3.y,s3.time)
let hs4= highSpeedPoints(s4.x,s4.y,s4.time)
let hs5= highSpeedPoints(s5.x,s5.y,s5.time)
let hs6= highSpeedPoints(s6.x,s6.y,s6.time)
let hs7= highSpeedPoints(s7.x,s7.y,s7.time)
let hs8= highSpeedPoints(s8.x,s8.y,s8.time)
let hs9= highSpeedPoints(s9.x,s9.y,s9.time)
let hs10= highSpeedPoints(s10.x,s10.y,s10.time)
let mergeHighSpeedPoints= []
let tem_point = 0
    for(let i=0;i<100;i++){
        if(hs1.includes(i)||hs1.includes(i-1)||hs1.includes(i+1)) tem_point++
        if(hs2.includes(i)||hs2.includes(i-1)||hs2.includes(i+1)) tem_point++
        if(hs3.includes(i)||hs3.includes(i-1)||hs3.includes(i+1)) tem_point++
        if(hs4.includes(i)||hs4.includes(i-1)||hs4.includes(i+1)) tem_point++
        if(hs5.includes(i)||hs5.includes(i-1)||hs5.includes(i+1)) tem_point++
        if(hs6.includes(i)||hs6.includes(i-1)||hs6.includes(i+1)) tem_point++
        if(hs7.includes(i)||hs7.includes(i-1)||hs7.includes(i+1)) tem_point++
        if(hs8.includes(i)||hs8.includes(i-1)||hs8.includes(i+1)) tem_point++
        if(hs9.includes(i)||hs9.includes(i-1)||hs9.includes(i+1)) tem_point++
        if(hs10.includes(i)||hs10.includes(i-1)||hs10.includes(i+1)) tem_point++
        if(tem_point>6){
            mergeHighSpeedPoints.push(i)
        }
        tem_point = 0
    }




if(match_point>10)
    console.log("Your signature has been verified")
else
    console.log("Your signature can not be verified, you can try to use message or answer security questions to verify your identity ")


console.log(mergeHighSpeedPoints)
console.log(highSpeedPoints(input.x,input.y,input.time))


