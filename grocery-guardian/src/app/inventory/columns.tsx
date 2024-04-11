export type FoodItem = {
    id: number
    name: string
    quantity: number
    expirationDate: Date
    createdAt: Date
    userID: number
}

export const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "quantity",
      label: "QUANTITY",
    },
    {
      key: "expirationDate",
      label: "EXPIRATION DATE",
    },
    {
      key: "createdAt",
      label: "DATE CREATED",
    },
    {
      key:"actions",
      label: "ACTIONS",
    }
  ];