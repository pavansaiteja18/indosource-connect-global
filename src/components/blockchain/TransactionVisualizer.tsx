
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { useBlockchain } from "@/contexts/BlockchainContext";
import { Badge } from "@/components/ui/badge";

const TransactionVisualizer = () => {
  const { transactions, isConnected } = useBlockchain();
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  
  if (!isConnected) {
    return (
      <Card className="bg-gray-50 border-dashed border">
        <CardHeader>
          <CardTitle className="text-xl">Blockchain Transactions</CardTitle>
          <CardDescription>Connect your wallet to view your transaction history</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <div className="text-center">
            <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-gray-500">Blockchain visualization will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Blockchain Transactions</CardTitle>
        <CardDescription>Visualized secure transaction history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((tx, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                selectedTransaction === tx.id 
                  ? 'border-marketplace-blue shadow-sm bg-blue-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedTransaction(tx.id === selectedTransaction ? null : tx.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{tx.description}</p>
                  <p className="text-xs text-gray-500">{new Date(tx.timestamp).toLocaleString()}</p>
                </div>
                <Badge className={tx.from === tx.to ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                  {tx.amount.toFixed(4)} ETH
                </Badge>
              </div>
              
              {selectedTransaction === tx.id && (
                <div className="mt-3 pt-3 border-t border-gray-200 animate-fade-in">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Transaction Hash</p>
                      <p className="font-mono text-xs truncate">{tx.hash || '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Block</p>
                      <p>{tx.block || Math.floor(Math.random() * 1000000)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">From</p>
                      <p className="font-mono text-xs truncate">{tx.from}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">To</p>
                      <p className="font-mono text-xs truncate">{tx.to}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Gas Fee</p>
                      <p>{tx.gasFee || (0.001 + Math.random() * 0.002).toFixed(5)} ETH</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Confirmed</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-1">
                      {Array(6).fill(0).map((_, i) => (
                        <div key={i} className="flex-1">
                          <div className={`h-1 rounded-full ${i <= 5 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                          <div className="text-center text-xs mt-1">{['Initiated', 'Pending', 'Mined', 'Confirmed', 'Finalized', 'Complete'][i]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 text-xs">
        <p>Blockchain transactions are immutable and verified across the network</p>
      </CardFooter>
    </Card>
  );
};

export default TransactionVisualizer;
