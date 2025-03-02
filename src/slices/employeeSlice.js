import { createSlice } from "@reduxjs/toolkit";


const initialState={
    employee:[]
}



const employeeSlice=createSlice({
    name:'EmpSlice',
    initialState,
    reducers:{
        addEmployee(state,action) {
         const newEmp=state.employee.length>0?[...state.employee, action.payload]:[action.payload]
       
         state.employee = newEmp;
     
        },

    }
})

export const {addEmployee}=employeeSlice.actions

export default employeeSlice.reducer