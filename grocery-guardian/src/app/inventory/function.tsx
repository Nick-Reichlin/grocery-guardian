export const onEdit = (id: number) => {
    console.log(`Editing item with id ${id}`);
  };
  
export const onDelete = async (id: number) => {
  try {
      const response = await fetch(`/api/delete-item/${id}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error(`Failed to delete item with id ${id}`);
      }

      console.log(`Item with id ${id} deleted successfully`);
  } catch (error) {
      console.error('Error deleting item:', error);
  }
};