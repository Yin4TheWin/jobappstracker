import JobAppFieldsTypes from "./JobAppFieldsTypes";

export default interface JobAppFormTypes {
    categories: {name: string, color: string}[],
    data: JobAppFieldsTypes["data"]
}