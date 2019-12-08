function lengthOfDiagonal(stroke) {
    xmax=-1*Math.pow(10, 10);
    ymax=-1*Math.pow(10, 10);
    xmin=Math.pow(10, 10);
    ymin=Math.pow(10, 10);
    for (let i = 0; i < stroke.length; i++) {
        if (stroke[i].x < xmin) {
            xmin = stroke[i].x
        }
        if (stroke[i].x > xmax) {
            xmax = stroke[i].x
        }
        if (stroke[i].y < ymin) {
            ymin = stroke[i].y
        }
        if (stroke[i].y > ymax) {
            ymax = stroke[i].y
        }
    }
    diagnonal = Math.sqrt(Math.pow((ymax-ymin),2)+Math.pow((xmax-xmin),2))
    return diagnonal;
}


function diagonalAngle(stroke) {
    xmax=-1*Math.pow(10, 10);
    ymax=-1*Math.pow(10, 10);
    xmin=Math.pow(10, 10);
    ymin=Math.pow(10, 10);
    for (let i = 0; i < stroke.length; i++) {
        if (stroke[i].x < xmin) {
            xmin = stroke[i].x
        }
        if (stroke[i].x > xmax) {
            xmax = stroke[i].x
        }
        if (stroke[i].y < ymin) {
            ymin = stroke[i].y
        }
        if (stroke[i].y > ymax) {
            ymax = stroke[i].y
        }
    }
    diagnonal_angle = Math.atan((ymax-ymin)/(xmax-xmin))
    return diagnonal_angle;
}

function maxSpeed(stroke){
    max_speed = 1
    for (let i = 0; i < stroke.length - 1; i++) {
        speed = (Math.pow((stroke[i+1].x - stroke[i].x),2)+Math.pow((stroke[i+1].y - stroke[i].y),2))/Math.pow((stroke[i+1].time - stroke[i].time),2)
        if (speed < 10000000000 && max_speed <  speed){
            max_speed = speed
        }
    }
    return max_speed;
}

function maxRelativeSpeed(stroke){
    maxSpeed(stroke)/lengthOfDiagonal(stroke)
}

function averageSpeed(stroke) {
    return lengthOfStroke(stroke) / totalTime(stroke);
}

function averageRelativeSpeed(stroke){
    averageSpeed(stroke)/lengthOfDiagonal(stroke)
}
function totalTime(stroke) {
    total_time = stroke[stroke.length - 1].time - stroke[0].time
    if (total_time == 0)
        return 1
    else 
        return total_time;
}

function lengthOfStroke(stroke){
    sum = 0
    for(let i = 0;i < stroke.length - 1; i++){
        sum = Math.sqrt(Math.pow((stroke[i+1].y -stroke[i].y),2) + Math.pow((stroke[i+1].x -stroke[i].x),2)) + sum
    }
    return sum;
}

//mid part(from one third of stroke to two third of stroke) average speed
function midPartAverageSpeed(stroke) {
    part1_l = Math.round((stroke.length - 1) / 3)
    part2_l = Math.round((stroke.length -1)*2/3)
    part_length = 0
    for (let i = part1_l ; i < part2_l; i++) {
        part_length = Math.sqrt(Math.pow((stroke[i + 1].y - stroke[i].y), 2) + Math.pow((stroke[i + 1].x - stroke[i].x), 2)) + part_length
    }

    part_average_speed = part_length / (stroke[part2_l].time - (stroke[part1_l].time))
    if (stroke[part2_l].time - (stroke[part1_l].time) == 0)
        return 1
    else 
        return part_average_speed
}

function midPartRelativeAverageSpeed(stroke){
    midPartAverageSpeed(stroke)/lengthOfDiagonal(stroke)
}