import DeadlineTypes from "./DeadlineTypes";
import JobAppFieldsTypes from "./JobAppFieldsTypes";

export default interface JobAppFormReducerTypes{
    type: string,
    payload: string | number | DeadlineTypes[] | JobAppFieldsTypes
}