'use client'

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, SortDescriptor, Input} from "@nextui-org/react";
import { FoodItem, columns, renderCell } from "@/app/inventory/columns"
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { SearchIcon } from "lucide-react";


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
  
  // const [page, setPage] = useState(1);
  // const rowsPerPage = 8;

  // const pages = Math.ceil(FoodItems.length / rowsPerPage);

  // const items = useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return FoodItems.slice(start, end);
  // }, [page, FoodItems]);

  const [filterValue, setFilterValue] = useState('')
  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    let filteredUsers = [...FoodItems]

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    }

    return filteredUsers
  }, [FoodItems, filterValue, hasSearchFilter])

  const rowsPerPage = 8
  const [page, setPage] = useState(1)
  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems])

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending'
  })

  const sortedItems = useMemo(() => {
    return [...items].sort((a: FoodItem, b: FoodItem) => {
      const first = a[sortDescriptor.column as keyof FoodItem] as string
      const second = b[sortDescriptor.column as keyof FoodItem] as string
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
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
      topContentPlacement='outside'
      bottomContent={
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            // showControls
            // showShadow
            color='secondary'
            page={page}
            total={pages}
            onChange={page => setPage(page)}
          />
        </div>
      }
      bottomContentPlacement='outside'
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
