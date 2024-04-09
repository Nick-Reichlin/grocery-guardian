'use client'

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { FoodItem, columns } from "@/app/inventory/columns"

// const rows = [
//   {
//     key: "1",
//     name: "Tony Reichert",
//     role: "CEO",
//     status: "Active",
//   },
//   {
//     key: "2",
//     name: "Zoey Lang",
//     role: "Technical Lead",
//     status: "Paused",
//   },
//   {
//     key: "3",
//     name: "Jane Fisher",
//     role: "Senior Developer",
//     status: "Active",
//   },
//   {
//     key: "4",
//     name: "William Howard",
//     role: "Community Manager",
//     status: "Vacation",
//   },
// ];

export default function InventoryTable({ FoodItems }: { FoodItems: FoodItem[] }) {

    
  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={FoodItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
