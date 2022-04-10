export function FirstofMonth(num){
    //Function which returns the first of the previous month
    //Includes a parameter to decrement the number of months in the past

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth()-num, 1);
    console.log("first day: " + firstDay);
    
    return 1;
}

export function LastOfMonth(num){
    //Function which returns a date for the last day of the previous month
    //Includes a parameter to decrement the number of months in the past
    variables: { num: num}
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth()-num, 0);
    console.log("last day: " + lastDay);

    return 1;
}