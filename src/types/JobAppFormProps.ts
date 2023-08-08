export default interface JobAppFormProps {
    categories: {name: string, color: string}[],
    data: {
        category: string,
        date: string | null | undefined
    }
}