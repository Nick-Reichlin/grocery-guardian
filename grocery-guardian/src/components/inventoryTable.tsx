'use client'

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination} from "@nextui-org/react";
import { columns, renderCell } from "@/app/inventory/columns"
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";


function getFoodItems(userID: unknown) {
  const [foodItems, setFoodItems] = useState([]);
  useEffect(() => {
    async function fetchFoodItems() {
      try {
        const response = await fetch(`/api/inventoryRowsData?userID=${userID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch food items');
        }
        const data = await response.json();
        setFoodItems(data.foodItems);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    }
    if (userID) {
      fetchFoodItems();
    }
    fetchFoodItems();
  }, [userID]);

  return foodItems;
}

export default function InventoryTable() {
  const { data: session } = useSession();
  const FoodItems = getFoodItems(session?.user?.id);
  
  // const [filterValue, setFilterValue] = useState('')
  // const hasSearchFilter = Boolean(filterValue)

  // const filteredItems = useMemo(() => {
  //   let filteredFoodItems = [...FoodItems]

  //   if (hasSearchFilter) {
  //     filteredFoodItems = filteredFoodItems.filter(FoodItem =>
  //       FoodItem.name.toLowerCase().includes(filterValue.toLowerCase)
  //     )
  //   }

  //   return filteredFoodItems
  // }, [FoodItems, filterValue, hasSearchFilter])
  
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(FoodItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return FoodItems.slice(start, end);
  }, [page, FoodItems]);

  return (
    <Table 
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => 
          <TableColumn key={column.key} className='text-center'>{column.label} </TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} items={items}>
        {(item) => (
          <TableRow key={item.id} className="hover:bg-gray-100">
            {(columnKey) => <TableCell className='text-center'>{renderCell(item, columnKey)}
</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
