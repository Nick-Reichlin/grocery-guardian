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

    fetchFoodItems();
  }, [userID]); // Add userID as a dependency to useEffect

  return foodItems;
}

export default  function InventoryTable() {
  const { data: session } = useSession();
  const FoodItems = getFoodItems(session?.user?.id);
    
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
