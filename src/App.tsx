import { useState } from "react"
import type { Employee } from "./types/Employee";
import employees from "./data/employees.json"
import { Office } from "./components/Office";
import Button from "./components/Button"


function App() {
  const [officeA, setOfficeA] = useState<Employee[]>(employees.slice(0, 3))
  const [officeB, setOfficeB] = useState<Employee[]>(employees.slice(3, 6))
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null)
  const [totalTransfers, setTotalTransfers] = useState(0)

  const handleEmployeeSelect = (id: string) => {
    setSelectedEmployeeId(prev => prev === id ? null : id)
  }

  const handleTransferEmployee = () => {
    if (!selectedEmployeeId) {
      setWarning("You haven't selected an employee.")
      return
    }

    const employeeInA = officeA.find(employee => employee.id === selectedEmployeeId)
    const employeeInB = officeB.find(employee => employee.id === selectedEmployeeId)

    const employee = employeeInA || employeeInB
    if (!employee) return
    if (employee.transfers >= 10) {
      setWarning("This employee has reached the maximum number of transfers.")
      return
    }

    if (employeeInA && employeeInA.transfers < 10) {
      const newOfficeA = officeA.filter((employee) => employee.id !== selectedEmployeeId)
      const updatedEmployee = {
        ...employeeInA,
        transfers: employeeInA.transfers + 1
      }
      const newOfficeB = [...officeB, updatedEmployee]
      setOfficeA(newOfficeA)
      setOfficeB(newOfficeB)
      setTotalTransfers(prev => prev + 1)
      setSelectedEmployeeId(null)
      setWarning(null)
    } else if (employeeInB && employeeInB.transfers < 10) {
      const newOfficeB = officeB.filter((employee) => employee.id !== selectedEmployeeId)
      const updatedEmployee = {
        ...employeeInB,
        transfers: employeeInB.transfers + 1
      }
      const newOfficeA = [...officeA, updatedEmployee]
      setOfficeA(newOfficeA)
      setOfficeB(newOfficeB)
      setTotalTransfers(prev => prev + 1)
      setSelectedEmployeeId(null)
      setWarning(null)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="font-extrabold">{totalTransfers}</p>
      <div className="flex items-center gap-4">
        <Office
          title="Office A"
          employees={officeA}
          selectedEmployeeId={selectedEmployeeId}
          onSelect={handleEmployeeSelect}
        />
        <div className="flex flex-col gap-2">
          <Button onClick={handleTransferEmployee}>{"🔁"}</Button>
        </div>
        <Office
          title="Office B"
          employees={officeB}
          selectedEmployeeId={selectedEmployeeId}
          onSelect={handleEmployeeSelect}
        />
      </div>
      {warning && (
        <p>{warning}</p>
      )}
    </div>
  )
}

export default App