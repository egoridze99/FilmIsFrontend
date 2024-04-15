import React from "react";
import {Customer} from "src/types/customer.types";
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";

import UserIconPath from "./assets/userIcon.png";
import {
  baseFields,
  passportFields
} from "src/UI/components/Customer/CustomerCard/CustomerCard.config";

import "./customerCard.scss";
import CustomerEditingDialog from "src/UI/components/CustomerEditingDialog";

type CustomerCardProps = {
  customer: Customer | null;

  onEdit(data: Customer): Promise<boolean>;
  onClose(): void;
};

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onClose,
  onEdit
}) => {
  const [isEditingDialogOpen, setIsEditingDialogOpen] = React.useState(false);

  return (
    <>
      <Dialog
        open={!!customer && !isEditingDialogOpen}
        onClose={onClose}
        classes={{paper: "CustomerCard"}}
      >
        <DialogTitle>Профиль пользователя</DialogTitle>
        <DialogContent className="CustomerCard__content-container">
          <div className="CustomerCard__content">
            <div className="CustomerCard__user-avatar">
              <img src={UserIconPath} alt="Изображение пользователя" />
            </div>

            <div className="CustomerCard__customer-data">
              {baseFields.map((i) => (
                <div className="CustomerCard__customer-data-element">
                  <div className="CustomerCard__customer-data-element-title">
                    {i.title}
                  </div>
                  <div className="CustomerCard__customer-data-element-value">
                    {i.render
                      ? i.render(customer)
                      : customer?.[i.field] || "Не заполнено"}
                  </div>
                </div>
              ))}

              <div className="CustomerCard__customer-data-passport">
                {passportFields.map((i) => (
                  <div className="CustomerCard__customer-data-element">
                    <div className="CustomerCard__customer-data-element-title">
                      {i.title}
                    </div>
                    <div className="CustomerCard__customer-data-element-value">
                      {i.render
                        ? i.render(customer)
                        : customer?.[i.field] || "Не заполнено"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="CustomerCard__footer">
            <div className="CustomerCard__footer-item">
              <Button variant="outlined" onClick={onClose}>
                Закрыть
              </Button>
            </div>

            <div className="CustomerCard__footer-item">
              <Button
                variant="contained"
                onClick={() => setIsEditingDialogOpen(true)}
              >
                Редактировать
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {customer && (
        <CustomerEditingDialog
          isEditMode
          defaultData={customer as Customer}
          onClose={() => setIsEditingDialogOpen(false)}
          open={isEditingDialogOpen}
          onApply={onEdit}
        />
      )}
    </>
  );
};

export default CustomerCard;
