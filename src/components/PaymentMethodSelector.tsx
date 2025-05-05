
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { IndianRupee, CreditCard, Wallet } from "lucide-react";

export type PaymentMethod = 'card' | 'upi' | 'wallet';

interface PaymentMethodSelectorProps {
  onSelectMethod: (method: PaymentMethod) => void;
  selectedMethod: PaymentMethod;
}

const PaymentMethodSelector = ({ onSelectMethod, selectedMethod }: PaymentMethodSelectorProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <RadioGroup value={selectedMethod} onValueChange={value => onSelectMethod(value as PaymentMethod)}>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center cursor-pointer">
                <CreditCard className="h-4 w-4 mr-2" />
                Credit/Debit Card
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center cursor-pointer">
                <IndianRupee className="h-4 w-4 mr-2" />
                UPI Payment
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="wallet" id="wallet" />
              <Label htmlFor="wallet" className="flex items-center cursor-pointer">
                <Wallet className="h-4 w-4 mr-2" />
                Digital Wallet
              </Label>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodSelector;
