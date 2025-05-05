
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, IndianRupee, QrCode } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UpiPaymentProps {
  amount: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  isTestMode?: boolean;
}

const UpiPayment = ({ 
  amount, 
  onSuccess, 
  onError,
  isTestMode = true 
}: UpiPaymentProps) => {
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Simulate UPI payment process
  const handlePayment = async () => {
    if (!upiId || !upiId.includes('@')) {
      toast({
        title: "Invalid UPI ID",
        description: "Please enter a valid UPI ID (e.g., name@upi)",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // In test mode we simulate the payment API call
      if (isTestMode) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate successful payment
        toast({
          title: "Payment Successful",
          description: `₹${amount.toFixed(2)} paid successfully via UPI`,
        });
        
        if (onSuccess) onSuccess();
      } else {
        // This would be replaced with actual Razorpay UPI implementation
        // await razorpayUpiPayment(amount, upiId);
        
        toast({
          title: "Payment Request Initiated",
          description: "Please check your UPI app to complete the payment",
        });
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "There was an error processing your payment",
        variant: "destructive"
      });
      
      if (onError) onError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQR = () => {
    toast({
      title: "QR Code Generated",
      description: "Scan this QR code with any UPI app to make payment",
    });
    // In a real implementation, this would generate and display a UPI QR code
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IndianRupee className="h-5 w-5" />
          UPI Payment
          {isTestMode && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              Test Mode
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
            <IndianRupee className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-lg font-medium">{amount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="upi-id">UPI ID</Label>
          <div className="flex gap-2">
            <Input 
              id="upi-id"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleGenerateQR}>
                    <QrCode className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate QR Code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-xs text-gray-500">Enter your UPI ID like name@paytm, number@ybl</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <IndianRupee className="mr-2 h-4 w-4" />
              Pay with UPI
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpiPayment;
