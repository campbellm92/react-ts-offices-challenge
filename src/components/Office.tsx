import type { Employee } from "../types/Employee";
import { EmployeeCard } from "./EmployeeCard";

interface OfficeProps {
    title: string
    employees: Employee[]
    selectedEmployeeId: string | null
    onSelect: (id: string) => void

}

const officeTitleStyles = "text-3xl font-extrabold mb-2"
const employeesWrapperStyles = "flex flex-col gap-2"

export const Office = ({ title, employees, selectedEmployeeId, onSelect }: OfficeProps) => {
    return <div>
        <h2 className={officeTitleStyles}>{title}</h2>

        <div className={employeesWrapperStyles}>
            {employees.map(({ id, name, surname, transfers }) => (
                <EmployeeCard
                    key={id}
                    name={name}
                    surname={surname}
                    id={id}
                    transfers={transfers}
                    isSelected={id === selectedEmployeeId}
                    onSelect={onSelect}
                />
            ))}
        </div>
    </div>
}
