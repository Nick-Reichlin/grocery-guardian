'use client'

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, SortDescriptor, Input} from "@nextui-org/react";
import { FoodItem, columns, renderCell } from "@/app/inventory/columns"
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { SearchIcon } from "lucide-react";

async function updateExpiredItems() {
  try {
    const response = await fetch('/api/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update expired items');
    }

    const result = await response.json();
    console.log('Expired items updated successfully:', result);
  } catch (error) {
    console.error('Error updating expired items:', error);
  }
}
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

  const [filterValue, setFilterValue] = useState('')
  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    let filteredFood = [...FoodItems]

    if (hasSearchFilter) {
      filteredFood = filteredFood.filter(item =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    }

    return filteredFood
  }, [FoodItems, filterValue, hasSearchFilter])

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending'
  })

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: FoodItem, b: FoodItem) => {
      const first = a[sortDescriptor.column as keyof FoodItem] as string
      const second = b[sortDescriptor.column as keyof FoodItem] as string
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, filteredItems])

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex items-end justify-between gap-3'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Search by name...'
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    )
  }, [filterValue, onSearchChange, onClear])


  return (
    <Table 
      topContent={topContent}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      classNames={{
        wrapper: 'min-h-[222px]'
      }}
    >
      <TableHeader columns={columns}>
        {(column) => 
          <TableColumn key={column.key} 
            {...(column.key !== 'actions' ? { allowsSorting: true } : {})}
            className='text-center'>
              {column.label} 
          </TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id} className="hover:bg-gray-100">
            {(columnKey) =>
              <TableCell className='text-center'> {renderCell(item, columnKey)} </TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
