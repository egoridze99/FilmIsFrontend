import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Modal,
  Tooltip
} from "@mui/material";

import UserIconPath from "./assets/userIcon.png";
import {
  baseFields,
  passportFields
} from "src/UI/components/Customer/CustomerCard/CustomerCard.config";

import "./customerCard.scss";
import CustomerEditingDialog from "src/UI/components/Customer/CustomerEditingDialog";
import {CustomerComment} from "src/types/shared.types";
import {useCustomerService} from "src/contexts/services/customer.service.context";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {TextField} from "formik-mui";
import {History} from "@mui/icons-material";
import ChangesHistoryModal from "src/UI/pages/workspace/components/ChangesHistoryModal";
import {useChangesHistory} from "src/hooks/useChangesHistory";
import {Customer} from "src/models/customers/customer.model";
import {CustomerRawType} from "src/types/customer/customer.types";

type CustomerCardProps = {
  customer: Customer | null;

  onEdit(data: CustomerRawType): Promise<boolean>;
  onClose(): void;
};

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onClose,
  onEdit
}) => {
  const customerService = useCustomerService();

  const [isEditingDialogOpen, setIsEditingDialogOpen] = React.useState(false);
  const {
    isChangesModalOpen,
    closeChangesModal,
    isChangesLoading,
    loadChangesHistory,
    changesHistory
  } = useChangesHistory((id) => customerService.loadChangesHistory(id as any));

  const [comments, setComments] = React.useState<CustomerComment[]>([]);

  React.useEffect(() => {
    if (!customer?.id) {
      return;
    }

    customerService.getUserComments(customer.id).then((comments) => {
      setComments(comments);
    });
  }, [customer?.id]);

  return (
    <>
      <Dialog
        open={!!customer && !isEditingDialogOpen && !isChangesModalOpen}
        onClose={onClose}
        classes={{paper: "CustomerCard"}}
      >
        <DialogTitle>
          Профиль пользователя
          {(customer?._isAbleToReadAndEdit ||
            customer?.isCustomerHasBlankFields) && (
            <Tooltip title="Показать историю изменений">
              <IconButton
                className="CustomerCard__changes-btn"
                onClick={() => loadChangesHistory(customer?.id as number)}
              >
                <History />
              </IconButton>
            </Tooltip>
          )}
        </DialogTitle>
        <DialogContent className="CustomerCard__content-container">
          <div className="CustomerCard__content">
            <div className="CustomerCard__user-avatar">
              <img src={UserIconPath} alt="Изображение пользователя" />
            </div>

            <div className="CustomerCard__customer-data">
              {(customer?._isAbleToReadAndEdit ||
                customer?.isCustomerHasBlankFields) && (
                <p
                  className="CustomerCard__edit-btn"
                  onClick={() => setIsEditingDialogOpen(true)}
                >
                  Редактировать
                </p>
              )}

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
          <Divider />
          <div className="CustomerCard__comments">
            <div className="CustomerCard__comments-content">
              {comments.map((c) => (
                <div className="CustomerCard__comment">
                  <div className="CustomerCard__comment-info">
                    {c.author} {c.created_at.format("DD-MM-YYYY")}
                  </div>
                  <div className="CustomerCard__comment-text">{c.text}</div>
                  <Divider />
                </div>
              ))}
            </div>

            <Formik
              validateOnMount
              validationSchema={yup
                .object()
                .shape({comment: yup.string().required("Обязательное поле")})}
              initialValues={{comment: ""}}
              onSubmit={async (val, formikHelpers) => {
                const result = await customerService.createUserComment(
                  val.comment,
                  customer?.id as number
                );

                if (result) {
                  setComments((prev) => [result, ...prev]);
                  formikHelpers.resetForm();
                }
              }}
            >
              {({isValid, isSubmitting}) => {
                return (
                  <Form>
                    <Box className={"full-width-form-control"}>
                      <Field
                        component={TextField}
                        name="comment"
                        label="Новый комментарий"
                        variant="standard"
                        rows={3}
                        multiline
                        required
                      />
                    </Box>

                    <div className="CustomerCard__comment-btn">
                      <Button type="submit" disabled={!isValid || isSubmitting}>
                        Отправить комментарий
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
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

      <Modal open={isChangesModalOpen} onClose={closeChangesModal}>
        <ChangesHistoryModal
          changesHistory={changesHistory}
          isLoading={isChangesLoading}
        />
      </Modal>
    </>
  );
};

export default CustomerCard;
