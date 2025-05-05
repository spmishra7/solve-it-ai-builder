
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, IndianRupee, CreditCard, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import UpiPayment from "./UpiPayment";
import { useToast } from "@/hooks/use-toast";

const PaymentSimulator = () => {
  const [activeRole, setActiveRole] = useState("user");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();
  
  const handlePaymentFlowDemo = async () => {
    setPaymentStatus("processing");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, randomly succeed or fail the payment
      const isSuccessful = Math.random() > 0.2; // 80% success rate
      
      if (isSuccessful) {
        setPaymentStatus("success");
        toast({
          title: "Payment Successful",
          description: "The transaction was completed successfully",
        });
      } else {
        setPaymentStatus("failed");
        toast({
          title: "Payment Failed",
          description: "There was an issue with the payment",
          variant: "destructive"
        });
      }
      
    } catch (error) {
      setPaymentStatus("failed");
    }
  };
  
  const resetDemo = () => {
    setPaymentStatus("idle");
    setShowDetails(false);
  };
  
  const viewFromProvider = (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Payment Gateway Dashboard</CardTitle>
          <Badge>RazorPay Simulation</Badge>
        </div>
        <CardDescription>Monitoring UPI transactions in real-time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 border rounded-lg">
          <h3 className="text-sm font-medium mb-2">Latest Transaction</h3>
          {paymentStatus === "idle" ? (
            <p className="text-gray-500 text-sm">No recent transactions</p>
          ) : paymentStatus === "processing" ? (
            <div className="flex items-center text-amber-600">
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              Processing transaction...
            </div>
          ) : paymentStatus === "success" ? (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Transaction ID #UPI8276453 completed
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-4 w-4 mr-2" />
              Transaction failed - Insufficient funds
            </div>
          )}
        </div>
        
        {paymentStatus === "success" && showDetails && (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 font-medium">Transaction Details</div>
            <div className="p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span>UPI8276453</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span>₹499.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">UPI ID:</span>
                <span>user@paytm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Successful</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-2 justify-end">
          {paymentStatus === "success" && !showDetails && (
            <Button variant="outline" onClick={() => setShowDetails(true)}>
              View Details
            </Button>
          )}
          
          {(paymentStatus !== "idle" || showDetails) && (
            <Button variant="outline" onClick={resetDemo}>
              Reset Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
  
  const viewFromCustomer = (
    <div className="space-y-4">
      {paymentStatus === "success" ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto bg-green-100 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-green-800">Payment Successful</h3>
              <p className="text-green-600 mt-1">Your transaction has been completed</p>
              
              <div className="mt-6 text-left p-4 bg-white rounded-lg border border-green-200">
                <div className="flex justify-between text-sm mb-2">
                  <span>Amount Paid:</span>
                  <span className="font-medium">₹499.00</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Transaction ID:</span>
                  <span className="font-medium">UPI8276453</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Date:</span>
                  <span className="font-medium">{new Date().toLocaleString()}</span>
                </div>
              </div>
              
              <Button className="mt-6" onClick={resetDemo}>
                Back to Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : paymentStatus === "failed" ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto bg-red-100 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-red-800">Payment Failed</h3>
              <p className="text-red-600 mt-1">We couldn't process your payment</p>
              
              <div className="mt-6 text-left p-4 bg-white rounded-lg border border-red-200">
                <p className="text-sm text-gray-600">
                  Your payment couldn't be processed due to insufficient funds or a bank-side issue. 
                  Please try again with an alternative payment method or contact your bank.
                </p>
              </div>
              
              <div className="mt-6 flex gap-3 justify-center">
                <Button variant="outline" onClick={resetDemo}>
                  Try Again
                </Button>
                <Button variant="default">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <UpiPayment 
          amount={499} 
          onSuccess={() => handlePaymentFlowDemo()} 
          isTestMode={true}
        />
      )}
    </div>
  );
  
  const viewFromBusiness = (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Business Dashboard</CardTitle>
          <Badge>Administrator View</Badge>
        </div>
        <CardDescription>Monitor payment metrics and transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600">Total Transactions</p>
            <p className="text-2xl font-bold text-blue-800">{paymentStatus !== "idle" ? "157" : "156"}</p>
            <p className="text-xs text-blue-500 mt-1">+3.2% from last week</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-sm text-green-600">Revenue</p>
            <p className="text-2xl font-bold text-green-800">
              ₹{paymentStatus === "success" ? "78,349" : "77,850"}
            </p>
            <p className="text-xs text-green-500 mt-1">+5.4% from last week</p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <p className="text-sm text-amber-600">Conversion Rate</p>
            <p className="text-2xl font-bold text-amber-800">68%</p>
            <p className="text-xs text-amber-500 mt-1">+1.2% from last week</p>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden mt-4">
          <div className="bg-gray-100 px-4 py-2 font-medium">Recent Transactions</div>
          <div className="max-h-48 overflow-y-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paymentStatus === "success" && (
                  <tr className="bg-green-50">
                    <td className="px-4 py-3 font-medium">UPI8276453</td>
                    <td className="px-4 py-3">{new Date().toLocaleString()}</td>
                    <td className="px-4 py-3">₹499.00</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                )}
                {paymentStatus === "failed" && (
                  <tr className="bg-red-50">
                    <td className="px-4 py-3 font-medium">UPI8276453</td>
                    <td className="px-4 py-3">{new Date().toLocaleString()}</td>
                    <td className="px-4 py-3">₹499.00</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                        Failed
                      </span>
                    </td>
                  </tr>
                )}
                {/* Previous transactions */}
                <tr>
                  <td className="px-4 py-3 font-medium">UPI8276452</td>
                  <td className="px-4 py-3">2023-05-04 14:35:22</td>
                  <td className="px-4 py-3">₹499.00</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">UPI8276451</td>
                  <td className="px-4 py-3">2023-05-04 13:22:10</td>
                  <td className="px-4 py-3">₹499.00</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">UPI8276450</td>
                  <td className="px-4 py-3">2023-05-04 12:15:45</td>
                  <td className="px-4 py-3">₹499.00</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                      Failed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="flex justify-end">
          {(paymentStatus !== "idle") && (
            <Button variant="outline" onClick={resetDemo}>
              Reset Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card className="shadow-lg border-brand-100">
      <CardHeader className="bg-gradient-to-r from-brand-50 to-blue-50 border-b">
        <CardTitle>UPI Payment Integration Simulator</CardTitle>
        <CardDescription>
          Explore the UPI payment system from different perspectives
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="user">Customer View</TabsTrigger>
            <TabsTrigger value="business">Business View</TabsTrigger>
            <TabsTrigger value="provider">Gateway View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user" className="mt-0">
            {viewFromCustomer}
          </TabsContent>
          
          <TabsContent value="business" className="mt-0">
            {viewFromBusiness}
          </TabsContent>
          
          <TabsContent value="provider" className="mt-0">
            {viewFromProvider}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 border-t pt-4">
          <h3 className="font-medium mb-2">How UPI Integration Works:</h3>
          <ol className="text-sm space-y-2 text-gray-600 list-decimal pl-4">
            <li>Customer initiates payment with their UPI ID</li>
            <li>Payment request is sent to the UPI gateway (e.g., Razorpay)</li>
            <li>Gateway routes the request to the customer's UPI app</li>
            <li>Customer authenticates the payment in their UPI app</li>
            <li>Payment confirmation is sent back to the business</li>
            <li>Business system validates and completes the transaction</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSimulator;
