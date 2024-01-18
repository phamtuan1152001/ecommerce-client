"use client"
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export default class SlideInModal extends React.PureComponent {
  static instance = null;

  static show = (
    onShowCb = () => {},
    header = <div />,
    body = <div />,
    footer = <div />,
    closable = true,
    className = ""
  ) => {
    onShowCb();
    if (SlideInModal.instance) {
      (SlideInModal.instance as any).setState({ visible: false }, () => {
        (SlideInModal.instance as any).setState({
          visible: true,
          header,
          body,
          footer,
          closable,
          className,
        });
      });
    }
  };

  static hide = (onHideCb = () => {}) => {
    if (SlideInModal.instance) {
      (SlideInModal.instance as any).setState({ visible: false });
      const timeout = setTimeout(() => {
        onHideCb();
        clearTimeout(timeout);
      }, 300);
    }
  };

  static getIsShow = () => {
    return (SlideInModal.instance as any).state?.visible || false;
  };

  constructor(props: any) {
    super(props);
    (SlideInModal.instance as any) = this;

    this.state = {
      visible: false,
      header: <div />,
      body: <div />,
      footer: <div />,
      closable: true,
      className: "",
    };
  }
  
  render() {    
    return (
      <Dialog
        open={(SlideInModal?.instance as any).state?.visible || false}
        onOpenChange={() => SlideInModal.hide()}
      >
        <DialogContent
          className={cn("flex flex-col justify-start gap-8 rounded-lg", (this.state as any).className)}
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            {(this.state as any).header ? (this.state as any).header : <div />}
          </DialogHeader>
          {(this.state as any).body ? (this.state as any).body : <div />}
          <DialogFooter>
            {(this.state as any).footer ? (this.state as any).footer : <div />}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
