import DeadlineTypes from "./DeadlineTypes"

export default interface JobAppFieldsTypes {
    category: string,
    color: string,
    date: string,
    company: string,
    position: string,
    link: string,
    recruiterName: string,
    recruiterContact: string,
    notes: string,
    deadlines: DeadlineTypes[]
}