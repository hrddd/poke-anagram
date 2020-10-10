import React from "react";
import { LoadingModalComponent } from "./LoadingModal";
import ReactDOM from "react-dom";
import { selectLoadingModal } from '../../../redux/modules/loadingModal';
import { useSelector } from "react-redux";


export const LoadingModal = () => {
  const { shouldShow } = useSelector(selectLoadingModal)
  const target = document.getElementById('modal')
  return target
    ? ReactDOM.createPortal(<LoadingModalComponent shouldShow={shouldShow} />, target)
    : (<></>)
};
