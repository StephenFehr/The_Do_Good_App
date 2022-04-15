export function FirstOfMonth(num){
    //Function which returns the first of the previous month
    //Includes a parameter to decrement the number of months in the past
    //when num is 0 it is the current month when num is 1 it is last month

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth()-num, 1);
    
    return firstDay.toISOString();
}

export function LastOfMonth(num){
    //Function which returns a date for the last day of the previous month
    //Includes a parameter to decrement the number of months in the past
    //when num is -1 it is the current month when num is 0 it is last month
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth()-num, 0);

    return lastDay.toISOString();
}