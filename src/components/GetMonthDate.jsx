export function FirstofMonth(){
    //Function which returns the first of the previous month
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth()-1, 1);
    console.log("first day: " + firstDay);
    
    return 1;
}

export function LastOfMonth(){
    //Function which returns a date for the last day of the previous month
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth(),0);
    console.log("last day: " + lastDay);

    return 1;
}