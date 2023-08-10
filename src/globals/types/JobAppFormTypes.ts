import { Dispatch } from "react";
import JobAppFieldsTypes from "./JobAppFieldsTypes";
import DeadlineTypes from "./DeadlineTypes";
import JobAppFormReducerTypes from "./JobAppFormReducerTypes";

export default interface JobAppFormTypes {
    categories: {name: string, color: string}[],
    formState: JobAppFieldsTypes,
    setFormState: Dispatch<JobAppFormReducerTypes>
}