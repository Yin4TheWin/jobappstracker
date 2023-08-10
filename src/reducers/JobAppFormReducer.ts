import JobAppFieldsTypes from "../globals/types/JobAppFieldsTypes";
import JobAppFormReducerTypes from "../globals/types/JobAppFormReducerTypes";

export default function jobAppFormReducer(data: JobAppFieldsTypes, action : JobAppFormReducerTypes){
    if(typeof action.payload === "string"){
        switch(action.type){
            case "CHANGE_CATEGORY":
                return {...data, category: action.payload};
            case "CHANGE_COLOR":
                return {...data, color: action.payload};
            case "CHANGE_DATE":
                return {...data, date: action.payload};
            case "CHANGE_COMPANY":
                return {...data, company: action.payload};
            case "CHANGE_POSITION":
                return {...data, position: action.payload};
            case "CHANGE_LINK":
                return {...data, link: action.payload};
            case "CHANGE_RECRUITER_NAME":
                return {...data, recruiterName: action.payload};
            case "CHANGE_RECRUITER_CONTACT":
                return {...data, recruiterContact: action.payload};
            case "CHANGE_NOTES":
                return {...data, notes: action.payload};
            default:
                return data;
        }
    } else if (typeof action.payload === "number") {
        switch(action.type){
        case "REMOVE_DEADLINE":
            return {...data, deadlines: data.deadlines.filter((deadline, index)=>index!==action.payload)};
        default:
            return data;
        }
    } else if (Array.isArray(action.payload)){
        switch(action.type){
            case "CHANGE_DEADLINES":
                return {...data, deadlines: action.payload};
            case "ADD_DEADLINE":
                return {...data, deadlines: [...data.deadlines, ...action.payload]};
            default:
                return data;
        }
    } else {
        switch(action.type){
            case "CHANGE_ALL":
                return action.payload;
            default:
                return data;
        }
    }
}