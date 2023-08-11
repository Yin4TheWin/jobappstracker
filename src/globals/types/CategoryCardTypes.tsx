import { Dispatch } from "react";
import DeadlineTypes from "./DeadlineTypes";
import JobAppFormReducerTypes from "./JobAppFormReducerTypes";
import JobAppFieldsTypes from "./JobAppFieldsTypes";

export default interface CategoryCardTypes {
    title: string,
    titleColor: string,
    isOwner: boolean | null | undefined,
    toggleModal: any,
    setFormState: Dispatch<JobAppFormReducerTypes>,
    jobs: {
        [category: string]: {
            [job: string]: JobAppFieldsTypes
        }
    } | undefined,
    username: string,
    listId: string,
}