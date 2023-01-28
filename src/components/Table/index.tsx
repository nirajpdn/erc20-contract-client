import React, { DetailedHTMLProps, TableHTMLAttributes } from "react";

interface IHead {
  key: string;
  value: any;
}
interface ITableProps
  extends DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  headings: IHead[];
  data: any[];
}

const Table: React.FC<ITableProps> = (props) => {
  const { headings, data, ...rest } = props;
  return (
    <table
      className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      {...rest}
    >
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {headings.map((heading, index) => (
            <th key={index} scope="col" className="px-6 py-3">
              {heading.value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            {headings.map((heading, index) => (
              <td key={index} className="px-6 py-4 text-gray-800 font-semibold">
                {row[heading.key] || ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
