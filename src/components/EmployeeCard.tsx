interface EmployeeCardProps {
    name: string;
    surname: string;
    id: string;
    transfers: number;
    isSelected: boolean;
    onSelect: (id: string) => void
}

const cardBaseStyles = "flex gap-2 bg-amber-300 hover:bg-amber-200 text-zinc-800 text-2xl font-extrabold p-2 cursor-pointer border-solid border-2 border-zinc-100"
const cardSelectedStyles = "bg-red-200"

export const EmployeeCard = ({ name, surname, id, transfers, isSelected, onSelect }: EmployeeCardProps) => {
    return <div className={`${cardBaseStyles} ${isSelected ? cardSelectedStyles : ""}`} onClick={() => onSelect(id)}>
        <span>{name}</span>
        <span>{surname}</span>
        {isSelected && (
            <>
                <span>{id}</span>
                <span>{transfers}</span>
            </>
        )}
    </div>
}