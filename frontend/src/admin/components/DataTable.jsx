import { cn } from "../utils/formatters";

export default function DataTable({
  bodyClassName = "",
  columns,
  headClassName = "",
  rows,
  tableClassName = "",
  renderRow,
}) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full text-left", tableClassName)}>
        <thead className={headClassName}>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={cn("px-6 py-4", column.className)}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={bodyClassName}>{rows.map(renderRow)}</tbody>
      </table>
    </div>
  );
}
