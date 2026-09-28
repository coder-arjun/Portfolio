/** Finoma's modules set like a ledger page: ruled rows, closed with a double rule. */
export function ModuleLedger({ modules }: { modules: { name: string; note: string }[] }) {
  return (
    <table className="w-full text-sm">
      <caption className="sr-only">Finoma modules</caption>
      <tbody>
        {modules.map((m) => (
          <tr key={m.name} className="border-b border-line">
            <th scope="row" className="py-2.5 pr-4 text-left font-medium text-paper">
              {m.name}
            </th>
            <td className="py-2.5 text-right text-graphite">{m.note}</td>
          </tr>
        ))}
      </tbody>
      <tfoot aria-hidden="true">
        <tr>
          <td colSpan={2} className="h-1.5 border-b-[3px] border-double border-line-strong p-0" />
        </tr>
      </tfoot>
    </table>
  );
}
