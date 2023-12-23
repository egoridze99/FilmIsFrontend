import React from "react";
import {Button} from "@mui/material";
import {LoadingButton} from "@mui/lab";

import "./panelFormsFooter.scss";

type PanelFormsFooterProps = {
  onCancel(): void;

  isLoading?: boolean;
  isSubmitButtonDisabled?: boolean;
  cancelButtonText?: string;
  submitButtonText?: string;
};

const PanelFormsFooter: React.FC<PanelFormsFooterProps> = ({
  onCancel,
  isSubmitButtonDisabled,
  cancelButtonText = "Отмена",
  submitButtonText = "Применить",
  isLoading
}) => {
  return (
    <div className="PanelFormsFooter">
      <Button onClick={onCancel} variant={"outlined"}>
        {cancelButtonText}
      </Button>
      <LoadingButton
        className="PanelFormsFooter__submit-btn"
        loading={isLoading}
        loadingPosition="end"
        type="submit"
        variant="contained"
        disabled={isSubmitButtonDisabled}
      >
        {submitButtonText}
      </LoadingButton>
    </div>
  );
};

export default PanelFormsFooter;
