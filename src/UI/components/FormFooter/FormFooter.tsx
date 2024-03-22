import React from "react";
import {Button} from "@mui/material";
import {LoadingButton} from "@mui/lab";

import "./formFooter.scss";
import classNames from "classnames";

type PanelFormsFooterProps = {
  className?: string;

  onCancel(): void;

  isLoading?: boolean;
  isSubmitButtonDisabled?: boolean;
  cancelButtonText?: string;
  submitButtonText?: string;
};

const FormFooter: React.FC<PanelFormsFooterProps> = ({
  className,
  onCancel,
  isSubmitButtonDisabled,
  cancelButtonText = "Отмена",
  submitButtonText = "Применить",
  isLoading
}) => {
  return (
    <div className={classNames("FormFooter", className)}>
      <Button onClick={onCancel} variant={"outlined"}>
        {cancelButtonText}
      </Button>
      <LoadingButton
        className="FormFooter__submit-btn"
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

export default FormFooter;
