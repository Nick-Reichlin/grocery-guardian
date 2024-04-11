import { Tooltip } from "@nextui-org/react"
import { EditIcon, DeleteIcon} from "@/components/ui/icons"

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
      label: "",
    }
  ];

  export const renderCell = (foodItem: FoodItem, columnkey: React.Key) => {
      const cellValue = foodItem[columnkey as keyof FoodItem];
  
      switch (columnkey) {
        case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{(cellValue).toString()}</p>
          </div>
        );
      case "quantity":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{(cellValue).toString()}</p>
          </div>
        );
        case "expirationDate":
          return (
            <span>{new Date(cellValue).toLocaleDateString()}</span>
          )
        case "actions":
          return (
            <div className="flex items-center gap-2">
              <Tooltip>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
}