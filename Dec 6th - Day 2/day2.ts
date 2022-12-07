// Define a class in TypeScript
class Point{
    xAxis?: number;  // The question mark says that xAxis field is optional
    yAxis?: number;
}

// Declaration of an interface
interface Mobile{
    modelNumber: string;
    modelName: string;
}

// Implementation of the Mobile interface
class p implements Mobile{
    modelNumber!: string; // The exclamation mark after the variable name indicates that the value is always truthy and never falsy
    modelName!: string;
    
}

// These are naive TypeScript declarations, 
//they are not intended to yeild any form of output whatsoever, 
//so no command to run these TypeScript files.