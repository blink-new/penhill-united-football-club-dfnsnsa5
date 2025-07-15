import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DollarSign, TrendingUp, TrendingDown, 
  CreditCard, Receipt, PiggyBank, AlertCircle,
  Calendar, Download, Upload, Filter,
  Plus, Minus, Eye, EyeOff, Settings,
  Target, Users, Trophy, Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { SparkLine, ConfidenceRing } from './icons/SkyIcons'
import { blink } from '../blink/client'

interface FinancialRecord {
  id: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string
  date: Date
  status: 'pending' | 'completed' | 'cancelled'
  paymentMethod?: string
}

interface BudgetCategory {
  id: string
  name: string
  budgeted: number
  spent: number
  remaining: number
  color: string
}

export function FinancialCenter() {
  const [records, setRecords] = useState<FinancialRecord[]>([])
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [showAmounts, setShowAmounts] = useState(true)
  const [isAddingRecord, setIsAddingRecord] = useState(false)
  const [newRecord, setNewRecord] = useState({
    type: 'expense' as 'income' | 'expense',
    category: '',
    amount: '',
    description: '',
    paymentMethod: 'cash'
  })

  useEffect(() => {
    loadFinancialData()
  }, [selectedPeriod])

  const loadFinancialData = async () => {
    try {
      // Load financial records from database
      const financialRecords = await blink.db.financial_records.list({
        orderBy: { created_at: 'desc' },
        limit: 50
      })

      // Transform database records to component format
      const transformedRecords: FinancialRecord[] = financialRecords.map(record => ({
        id: record.id,
        type: record.type as 'income' | 'expense',
        category: record.category,
        amount: Number(record.amount),
        description: record.description,
        date: new Date(record.created_at),
        status: record.status as 'pending' | 'completed' | 'cancelled',
        paymentMethod: record.payment_method
      }))

      setRecords(transformedRecords)

      // Mock budget categories for demonstration
      const mockBudgets: BudgetCategory[] = [
        {
          id: '1',
          name: 'Equipment',
          budgeted: 5000,
          spent: 3200,
          remaining: 1800,
          color: '#0686E1'
        },
        {
          id: '2',
          name: 'Travel & Transport',
          budgeted: 2500,
          spent: 1800,
          remaining: 700,
          color: '#22C55E'
        },
        {
          id: '3',
          name: 'Training Facilities',
          budgeted: 3000,
          spent: 2100,
          remaining: 900,
          color: '#F59E0B'
        },
        {
          id: '4',
          name: 'Registration Fees',
          budgeted: 1500,
          spent: 1500,
          remaining: 0,
          color: '#EF4444'
        },
        {
          id: '5',
          name: 'Fundraising Events',
          budgeted: 8000,
          spent: 2400,
          remaining: 5600,
          color: '#6B46F6'
        }
      ]

      setBudgetCategories(mockBudgets)
    } catch (error) {
      console.error('Failed to load financial data:', error)
    }
  }

  const addFinancialRecord = async () => {
    if (!newRecord.category || !newRecord.amount || !newRecord.description) {
      return
    }

    try {
      const user = await blink.auth.me()
      
      const recordData = {
        id: `fin_${Date.now()}`,
        user_id: user.id,
        type: newRecord.type,
        category: newRecord.category,
        amount: parseFloat(newRecord.amount),
        description: newRecord.description,
        payment_method: newRecord.paymentMethod,
        status: 'completed',
        created_at: new Date().toISOString()
      }

      await blink.db.financial_records.create(recordData)
      
      // Add to local state
      const newFinancialRecord: FinancialRecord = {
        id: recordData.id,
        type: recordData.type as 'income' | 'expense',
        category: recordData.category,
        amount: recordData.amount,
        description: recordData.description,
        date: new Date(recordData.created_at),
        status: 'completed',
        paymentMethod: recordData.payment_method
      }

      setRecords(prev => [newFinancialRecord, ...prev])
      
      // Reset form
      setNewRecord({
        type: 'expense',
        category: '',
        amount: '',
        description: '',
        paymentMethod: 'cash'
      })
      setIsAddingRecord(false)
    } catch (error) {
      console.error('Failed to add financial record:', error)
    }
  }

  const totalIncome = records
    .filter(r => r.type === 'income' && r.status === 'completed')
    .reduce((sum, r) => sum + r.amount, 0)

  const totalExpenses = records
    .filter(r => r.type === 'expense' && r.status === 'completed')
    .reduce((sum, r) => sum + r.amount, 0)

  const netBalance = totalIncome - totalExpenses

  const formatCurrency = (amount: number) => {
    if (!showAmounts) return '••••'
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const getRecentTransactions = () => {
    return records
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 neural-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-display mb-2">
                <span className="stat-gradient">Financial Center</span>
              </h1>
              <p className="text-muted-foreground">
                Comprehensive financial management for Penhill United FC
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAmounts(!showAmounts)}
                className="flex items-center space-x-2"
              >
                {showAmounts ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showAmounts ? 'Hide' : 'Show'} Amounts</span>
              </Button>
              
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Financial Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <Badge variant="outline" className="text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5%
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-display stat-gradient">
                  {formatCurrency(totalIncome)}
                </div>
                <div className="text-sm text-muted-foreground">Total Income</div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingDown className="w-8 h-8 text-red-500" />
                <Badge variant="outline" className="text-red-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  +8.3%
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-display">
                  {formatCurrency(totalExpenses)}
                </div>
                <div className="text-sm text-muted-foreground">Total Expenses</div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <PiggyBank className="w-8 h-8 text-blue-500" />
                <Badge 
                  variant={netBalance >= 0 ? "default" : "destructive"}
                  className="text-xs"
                >
                  {netBalance >= 0 ? 'Positive' : 'Negative'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className={`text-3xl font-bold text-display ${netBalance >= 0 ? 'stat-gradient' : 'text-red-600'}`}>
                  {formatCurrency(netBalance)}
                </div>
                <div className="text-sm text-muted-foreground">Net Balance</div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-purple-500" />
                <Badge variant="outline" className="text-purple-600">
                  On Track
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-display stat-gradient">
                  {formatCurrency(budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0))}
                </div>
                <div className="text-sm text-muted-foreground">Total Budget</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center space-x-2">
              <Receipt className="w-4 h-4" />
              <span>Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Budget</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Recent Transactions */}
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Receipt className="w-5 h-5 text-accent" />
                      <span>Recent Transactions</span>
                    </CardTitle>
                    <Dialog open={isAddingRecord} onOpenChange={setIsAddingRecord}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="sky-gradient text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Transaction
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Transaction</DialogTitle>
                          <DialogDescription>
                            Record a new income or expense transaction.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="type">Type</Label>
                              <Select 
                                value={newRecord.type} 
                                onValueChange={(value: 'income' | 'expense') => 
                                  setNewRecord(prev => ({ ...prev, type: value }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="income">Income</SelectItem>
                                  <SelectItem value="expense">Expense</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="amount">Amount (£)</Label>
                              <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                value={newRecord.amount}
                                onChange={(e) => setNewRecord(prev => ({ ...prev, amount: e.target.value }))}
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select 
                              value={newRecord.category} 
                              onValueChange={(value) => 
                                setNewRecord(prev => ({ ...prev, category: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equipment">Equipment</SelectItem>
                                <SelectItem value="travel">Travel & Transport</SelectItem>
                                <SelectItem value="facilities">Training Facilities</SelectItem>
                                <SelectItem value="registration">Registration Fees</SelectItem>
                                <SelectItem value="fundraising">Fundraising Events</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={newRecord.description}
                              onChange={(e) => setNewRecord(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Enter transaction description..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="payment-method">Payment Method</Label>
                            <Select 
                              value={newRecord.paymentMethod} 
                              onValueChange={(value) => 
                                setNewRecord(prev => ({ ...prev, paymentMethod: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="card">Card</SelectItem>
                                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                <SelectItem value="cheque">Cheque</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddingRecord(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addFinancialRecord} className="sky-gradient text-white">
                            Add Transaction
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {getRecentTransactions().map((record, index) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 micro-transition"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            record.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {record.type === 'income' ? (
                              <Plus className="w-5 h-5 text-white" />
                            ) : (
                              <Minus className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{record.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {record.category} • {record.date.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${
                            record.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {record.type === 'income' ? '+' : '-'}{formatCurrency(record.amount)}
                          </div>
                          <Badge 
                            variant={record.status === 'completed' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {record.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Budget Summary */}
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-accent" />
                      <span>Budget Overview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {budgetCategories.slice(0, 3).map((category) => (
                      <div key={category.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatCurrency(category.spent)} / {formatCurrency(category.budgeted)}
                          </span>
                        </div>
                        <Progress 
                          value={(category.spent / category.budgeted) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-display stat-gradient mb-2">
                      {records.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Transactions</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>All Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Receipt className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
                  <p className="text-muted-foreground mb-6">
                    Detailed transaction management coming soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {budgetCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="glass-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{category.name}</h3>
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-center">
                          <ConfidenceRing 
                            confidence={(category.spent / category.budgeted) * 100} 
                            size={80} 
                          />
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Budgeted:</span>
                            <span className="font-medium">{formatCurrency(category.budgeted)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Spent:</span>
                            <span className="font-medium">{formatCurrency(category.spent)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Remaining:</span>
                            <span className={`font-medium ${
                              category.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {formatCurrency(category.remaining)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Advanced Reporting</h3>
                  <p className="text-muted-foreground mb-6">
                    Comprehensive financial reports and analytics coming soon.
                  </p>
                  <Button className="sky-gradient text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}