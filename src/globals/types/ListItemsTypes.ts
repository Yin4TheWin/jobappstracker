import JobAppFieldsTypes from "./JobAppFieldsTypes"

export default interface ListItems{
    private: boolean,
    jobs: {
        [category: string]: {
            [job: string]: JobAppFieldsTypes
        }
    }
}
