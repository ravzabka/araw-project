import formatTime from "./formatTime"
import "./styles/main.scss"

const durationTime = document.getElementsByClassName("durationTime")
const durationTimearr = [...durationTime]
const el = document.querySelector('[data-id="sort"]')

durationTimearr.forEach(element => {
    element.innerHTML = formatTime(element.innerHTML)
})

formatTime()

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1
    const tBody = table.tBodies[0]
    const rows = Array.from(tBody.querySelectorAll("tr"))

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColumnText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim()
        const bColumnText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim()

        return aColumnText > bColumnText ? 1 * dirModifier : -1 * dirModifier
    })

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild)
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows)

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("asc", "desc"))
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("asc", asc)
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("desc", !asc)
}

el.addEventListener("click", () => {
    let headerCol
    const tableElement = el.parentElement.parentElement.parentElement.parentElement
    const headerIndex = document.getElementsByTagName("th")
    const headerId = [...headerIndex]

    headerId.forEach(element => {
        if (element.contains(el)) {
            headerCol = headerId.indexOf(element)
        }
    })

    const currentIsAscending = el.parentElement.classList.contains("asc")
    sortTableByColumn(tableElement, headerCol, !currentIsAscending)
})
