import { Dispatch } from "react";
import DeadlineTypes from "./DeadlineTypes";
import JobAppFormReducerTypes from "./JobAppFormReducerTypes";

export default interface CategoryCardTypes {
    title: string,
    titleColor: string,
    isOwner: boolean | null | undefined,
    toggleModal: any,
    setFormState: Dispatch<JobAppFormReducerTypes>
}