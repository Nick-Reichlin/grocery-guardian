import { Tooltip } from "@nextui-org/react"
import { EditIcon, DeleteIcon} from "@/components/ui/icons"
import { onEdit, onDelete } from "./function";


export type FoodItem = {
    id: number
    name: string
    quantity: number
    expirationDate: Date
    expired: Boolean,
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
      key: "expired",
      label: "EXPIRED",
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

      const tooltipStyle = {
        backgroundColor: '#ffffff', // Set the background color to white
        color: '#333',              // Text color for readability
        padding: '5px 10px',        // Padding around the text
        borderRadius: '5px',        // Rounded corners for aesthetics
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)' // Optional: adds shadow for depth
      };

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
        );
        case "expired":
        return (
          <span style={{ color: cellValue ? 'red' : 'green' }}>
            {cellValue ? "Expired" : "Fresh"}
          </span>
        );
        case "createdAt":
          return (
            <span>{new Date(cellValue).toLocaleDateString()}</span>
        );
        case "actions":
          return (
            <div className="flex items-center gap-2">
              <Tooltip content={<div style={tooltipStyle}>Edit</div>}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => onEdit(foodItem.id)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content={<div style={tooltipStyle}>Delete</div>}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => onDelete(foodItem.id)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
          default:
            return cellValue as string | number | React.ReactNode;
      }
}