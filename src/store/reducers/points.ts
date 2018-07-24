import { getType } from 'typesafe-actions';
import {add, remove, reorder, save} from "../actions/point";
import IPoint from "../../models/Point";

export const initialState = {
    list: [] as IPoint[]
};

const pointReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case getType(add):
                return {
                    ...state,
                    ...{
                        list: [
                            ...state.list,
                            action.payload
                        ]
                    }
                };

        case getType(save):

            const updatedItems = state.list.map(point => {
                if(point.id === action.payload.id){
                    return { ...point, ...action.payload }
                }
                return point
            });
            return {
                ...state,
                ...{
                    list: updatedItems
                }
            }

        case getType(reorder):
            console.log(action,state)
            return {
                ...state,
                ...{
                    list: action.payload.list
                }
            }

        case getType(remove):
            state.list = state.list.filter(point => point.id !== action.payload.id)
            console.log(state.list);
            return {
                ...state
            };

        default:
            return state;
    }
};

export default pointReducer;