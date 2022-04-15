import { GetOrders } from "./GetOrders";
//This File is used to search the database to return the information about specific months
//Will this need store specific identification?


export function GetMonthInformation(Vdate){
    //passes a month and a year to the database search function (STORE IDENTIFICATION?)
    //returns relavent information about the month

    var monthData = new Date(Vdate);

    const arr = {  //placeholder months data
    month: monthData.toLocaleString('default', { month: 'long' }),
    year: monthData.getFullYear(),
    isPaid: false,
    paidDate: "PAID DATE"
    }


    console.log(arr)
    //console.log("Month is: " + arr.month + " Year is: " + arr.year);

    return arr;
}