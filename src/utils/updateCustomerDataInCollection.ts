import {Customer} from "src/models/customers/customer.model";

// FIXME удалить
export const updateCustomerDataInCollection = <T extends object>(
  collection: Array<T>,
  customerField: keyof T,
  updatedCustomer: Customer
) => {
  const [itemsWithEditedCustomer, otherItems] = collection.reduce(
    (acc, i) => {
      if ((i[customerField] as Customer).id === updatedCustomer.id) {
        acc[0].push(i);
      } else {
        acc[1].push(i);
      }

      return acc;
    },
    [[] as Array<T>, [] as Array<T>]
  );

  if (!itemsWithEditedCustomer.length) {
    return null;
  }

  const editedItems = itemsWithEditedCustomer.map((item) => ({
    ...item,
    [customerField]: updatedCustomer
  }));

  return [...editedItems, ...otherItems];
};
