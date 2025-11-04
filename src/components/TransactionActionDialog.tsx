import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Download, Mail, Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

interface Transaction {
  orderId: string;
  userName: string;
  userEmail: string;
  courseName: string;
  amount: number;
  status: string;
  date: string;
  paymentMethod: string;
  channel: string;
}

type ActionType = "view" | "invoice" | "contact" | "refund";

interface TransactionActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: ActionType;
  transaction: Transaction | null;
  onSubmit: (data: any) => void;
}

export const TransactionActionDialog: React.FC<TransactionActionDialogProps> = ({
  isOpen,
  onClose,
  actionType,
  transaction,
  onSubmit,
}) => {
  const [refundReason, setRefundReason] = useState("");
  const [removeAccess, setRemoveAccess] = useState("no");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [invoiceFormat, setInvoiceFormat] = useState("pdf");
  const [includeDetails, setIncludeDetails] = useState({
    taxBreakdown: true,
    paymentMethod: true,
    courseDetails: true,
    billingAddress: false,
  });

  const handleClose = () => {
    // Reset all form states
    setRefundReason("");
    setRemoveAccess("no");
    setContactMessage("");
    setContactSubject("");
    setInvoiceFormat("pdf");
    setIncludeDetails({
      taxBreakdown: true,
      paymentMethod: true,
      courseDetails: true,
      billingAddress: false,
    });
    onClose();
  };

  const handleSubmit = () => {
    const data: any = { transaction };
    
    switch (actionType) {
      case "refund":
        data.reason = refundReason;
        data.removeAccess = removeAccess === "yes";
        break;
      case "contact":
        data.subject = contactSubject;
        data.message = contactMessage;
        break;
      case "invoice":
        data.format = invoiceFormat;
        data.includeDetails = includeDetails;
        break;
    }
    
    onSubmit(data);
    handleClose();
  };

  const renderContent = () => {
    if (!transaction) return null;

    switch (actionType) {
      case "view":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Order ID</Label>
                <p className="font-mono text-sm mt-1">{transaction.orderId}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Status</Label>
                <div className="mt-1">
                  <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <Label className="text-muted-foreground">Customer Name</Label>
                <p className="font-medium mt-1">{transaction.userName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Email Address</Label>
                <p className="font-medium mt-1">{transaction.userEmail}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <Label className="text-muted-foreground">Course Purchased</Label>
                <p className="font-medium mt-1">{transaction.courseName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Amount</Label>
                  <p className="font-semibold text-lg mt-1">₹{transaction.amount.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Payment Method</Label>
                  <p className="font-medium mt-1">{transaction.paymentMethod}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Transaction Date</Label>
                <p className="font-medium mt-1">{transaction.date}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Channel</Label>
                <p className="font-medium mt-1">{transaction.channel}</p>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Transaction processed successfully. Customer has been granted access to the course.
              </AlertDescription>
            </Alert>
          </div>
        );

      case "invoice":
        return (
          <div className="space-y-4">
            <Alert>
              <Download className="h-4 w-4" />
              <AlertDescription>
                Generate and download invoice for this transaction
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div>
                <Label className="text-muted-foreground">Order ID</Label>
                <p className="font-mono text-sm mt-1">{transaction.orderId}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Customer</Label>
                <p className="font-medium mt-1">{transaction.userName}</p>
                <p className="text-sm text-muted-foreground">{transaction.userEmail}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Amount</Label>
                <p className="font-semibold text-lg mt-1">₹{transaction.amount.toLocaleString()}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Invoice Format</Label>
                <Select value={invoiceFormat} onValueChange={setInvoiceFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="html">HTML Page</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Include in Invoice</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="taxBreakdown"
                      checked={includeDetails.taxBreakdown}
                      onCheckedChange={(checked) =>
                        setIncludeDetails({ ...includeDetails, taxBreakdown: checked as boolean })
                      }
                    />
                    <label htmlFor="taxBreakdown" className="text-sm cursor-pointer">
                      Tax Breakdown (GST/VAT)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="paymentMethod"
                      checked={includeDetails.paymentMethod}
                      onCheckedChange={(checked) =>
                        setIncludeDetails({ ...includeDetails, paymentMethod: checked as boolean })
                      }
                    />
                    <label htmlFor="paymentMethod" className="text-sm cursor-pointer">
                      Payment Method Details
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="courseDetails"
                      checked={includeDetails.courseDetails}
                      onCheckedChange={(checked) =>
                        setIncludeDetails({ ...includeDetails, courseDetails: checked as boolean })
                      }
                    />
                    <label htmlFor="courseDetails" className="text-sm cursor-pointer">
                      Course Details & Description
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="billingAddress"
                      checked={includeDetails.billingAddress}
                      onCheckedChange={(checked) =>
                        setIncludeDetails({ ...includeDetails, billingAddress: checked as boolean })
                      }
                    />
                    <label htmlFor="billingAddress" className="text-sm cursor-pointer">
                      Billing Address
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                Send a message to the customer regarding this transaction
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div>
                <Label className="text-muted-foreground">Customer Email</Label>
                <p className="font-medium mt-1">{transaction.userEmail}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Order Reference</Label>
                <p className="font-mono text-sm mt-1">{transaction.orderId}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message to the customer..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {contactMessage.length} / 1000 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label>Quick Templates</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setContactSubject("Course Access Issue");
                      setContactMessage(`Dear ${transaction.userName},\n\nWe noticed you might be having trouble accessing your course. Our support team is here to help you get started.\n\nBest regards,\nSupport Team`);
                    }}
                  >
                    Access Issue
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setContactSubject("Thank You for Your Purchase");
                      setContactMessage(`Dear ${transaction.userName},\n\nThank you for purchasing ${transaction.courseName}. We hope you enjoy the course!\n\nBest regards,\nTeam`);
                    }}
                  >
                    Thank You
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setContactSubject("Payment Confirmation");
                      setContactMessage(`Dear ${transaction.userName},\n\nThis is to confirm that we have received your payment of ₹${transaction.amount.toLocaleString()} for ${transaction.courseName}.\n\nOrder ID: ${transaction.orderId}\n\nBest regards,\nTeam`);
                    }}
                  >
                    Confirmation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "refund":
        return (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> This refund is to keep this platform synced with Payment Gateway. 
                User won't be getting their money back with this. To return user's money, you need to refund using Payment Gateway.
              </AlertDescription>
            </Alert>

            <div className="space-y-3 bg-muted p-4 rounded-lg">
              <div>
                <Label className="text-muted-foreground">Order ID</Label>
                <p className="font-mono text-sm mt-1">{transaction.orderId}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">User Email</Label>
                <p className="font-medium mt-1">{transaction.userEmail}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Amount</Label>
                <p className="font-semibold text-lg mt-1">₹{transaction.amount.toLocaleString()}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="refundReason">Reason for Refund *</Label>
                <Textarea
                  id="refundReason"
                  placeholder="Please provide a detailed reason for this refund..."
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="removeAccess">Remove Access of Courses</Label>
                <Select value={removeAccess} onValueChange={setRemoveAccess}>
                  <SelectTrigger id="removeAccess">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No - Keep Access</SelectItem>
                    <SelectItem value="yes">Yes - Remove Access</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Note: Always choose NO in case of duplicate transaction
                </p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This action will mark the transaction as refunded in the system. 
                  Make sure you have processed the actual refund through your payment gateway first.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getDialogTitle = () => {
    switch (actionType) {
      case "view":
        return "Transaction Details";
      case "invoice":
        return "Generate Invoice";
      case "contact":
        return "Contact User";
      case "refund":
        return "Refund Transaction";
      default:
        return "";
    }
  };

  const getDialogDescription = () => {
    switch (actionType) {
      case "view":
        return "Complete transaction information and customer details";
      case "invoice":
        return "Generate and download invoice for this transaction";
      case "contact":
        return "Send an email to the customer";
      case "refund":
        return "Process refund and update transaction status";
      default:
        return "";
    }
  };

  const canSubmit = () => {
    switch (actionType) {
      case "view":
        return false; // No submit for view
      case "invoice":
        return true;
      case "contact":
        return contactSubject.trim() !== "" && contactMessage.trim() !== "";
      case "refund":
        return refundReason.trim() !== "";
      default:
        return false;
    }
  };

  const getSubmitButtonText = () => {
    switch (actionType) {
      case "invoice":
        return "Generate & Download";
      case "contact":
        return "Send Message";
      case "refund":
        return "Process Refund";
      default:
        return "Submit";
    }
  };

  const getSubmitButtonIcon = () => {
    switch (actionType) {
      case "invoice":
        return <Download className="h-4 w-4 mr-2" />;
      case "contact":
        return <Send className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          {renderContent()}
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {actionType === "view" ? "Close" : "Cancel"}
          </Button>
          {actionType !== "view" && (
            <Button onClick={handleSubmit} disabled={!canSubmit()}>
              {getSubmitButtonIcon()}
              {getSubmitButtonText()}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
