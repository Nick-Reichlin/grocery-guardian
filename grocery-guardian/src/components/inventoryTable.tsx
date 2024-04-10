'use client'

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { columns } from "@/app/inventory/columns"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


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
    
  return (
    <Table isStriped>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key} className='text-center'>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} items={FoodItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell className='text-center'>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
