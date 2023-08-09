import JobAppFields from "./JobAppFields";

export default interface JobAppFormProps {
    categories: {name: string, color: string}[],
    data: JobAppFields["data"]
}