interface TableProps {
    columns: string[];
    dataResult: Record<string, unknown>[];
}

export function Table({columns, dataResult}: TableProps) {
    return (
        <table className="flex-1 justify-between border-2">
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={col} className="bg-white border-1">{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="text-center">
            {dataResult.map((row, index) => (
                <tr key={index}>
                    {columns.map((col) => (
                        <td key={col} className="border-spacing-3 text-cyan-300">{row[col] as string}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}