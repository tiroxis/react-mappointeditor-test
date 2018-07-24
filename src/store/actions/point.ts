import { createStandardAction } from 'typesafe-actions';
import {default as IPoint} from "../../models/Point";
import cuid from 'cuid';

export enum ActionTypes {
    ADD = 'point/add',
    REMOVE = 'point/remove',
    SAVE = 'point/save',
    REORDER = 'point/reorder',
}

export const add = createStandardAction(ActionTypes.ADD).map(
    (payload: IPoint) => ({
        payload : {
            ...payload,
            id: cuid(),
        }
    })
);
export const save = createStandardAction(ActionTypes.SAVE).map(
    (payload: IPoint) => ({
        payload : {
            ...payload,
        }
    })
);
export const remove = createStandardAction(ActionTypes.REMOVE).map(
    (payload: IPoint) => ({
        payload : {
            ...payload,
        }
    })
);
export const reorder = createStandardAction(ActionTypes.REORDER).map(
    (payload: IPoint) => ({
        payload : {
            ...payload,
        }
    })
);

