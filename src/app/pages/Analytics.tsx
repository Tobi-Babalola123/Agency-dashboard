import { motion } from 'motion/react';
import { TrendingUp, Users, Briefcase, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart';

const revenueData = [
  { month: 'Jan', revenue: 85000, expenses: 45000, profit: 40000 },
  { month: 'Feb', revenue: 92000, expenses: 48000, profit: 44000 },
  { month: 'Mar', revenue: 98000, expenses: 52000, profit: 46000 },
  { month: 'Apr', revenue: 105000, expenses: 55000, profit: 50000 },
  { month: 'May', revenue: 124500, expenses: 58000, profit: 66500 },
  { month: 'Jun', revenue: 118000, expenses: 56000, profit: 62000 },
];

const clientGrowthData = [
  { month: 'Jan', clients: 2234 },
  { month: 'Feb', clients: 2456 },
  { month: 'Mar', clients: 2589 },
  { month: 'Apr', clients: 2698 },
  { month: 'May', clients: 2847 },
  { month: 'Jun', clients: 2920 },
];

const projectStatusData = [
  { name: 'Completed', value: 83, color: '#10b981' },
  { name: 'In Progress', value: 45, color: '#3b82f6' },
  { name: 'Pending', value: 28, color: '#f59e0b' },
];

const teamPerformanceData = [
  { member: 'John Doe', tasks: 145, productivity: 95 },
  { member: 'Sarah M.', tasks: 128, productivity: 92 },
  { member: 'Alex B.', tasks: 156, productivity: 88 },
  { member: 'Emma W.', tasks: 187, productivity: 94 },
  { member: 'David L.', tasks: 92, productivity: 85 },
];

const invoiceStatsData = [
  { month: 'Jan', paid: 42, pending: 8, overdue: 2 },
  { month: 'Feb', paid: 48, pending: 6, overdue: 1 },
  { month: 'Mar', paid: 52, pending: 10, overdue: 3 },
  { month: 'Apr', paid: 58, pending: 7, overdue: 2 },
  { month: 'May', paid: 64, pending: 9, overdue: 4 },
];

const kpis = [
  {
    name: 'Total Revenue',
    value: '$622.5K',
    change: '+18.7%',
    icon: DollarSign,
    color: 'emerald',
  },
  {
    name: 'Total Clients',
    value: '2,847',
    change: '+12.5%',
    icon: Users,
    color: 'violet',
  },
  {
    name: 'Active Projects',
    value: '156',
    change: '+8.2%',
    icon: Briefcase,
    color: 'blue',
  },
  {
    name: 'Growth Rate',
    value: '24.3%',
    change: '+5.1%',
    icon: TrendingUp,
    color: 'amber',
  },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6 p-6 sm:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive insights into your business performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.name}
                </CardTitle>
                <div className={`rounded-lg bg-${kpi.color}-500/10 p-2`}>
                  <kpi.icon className={`h-4 w-4 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  {kpi.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue & Expenses Chart */}
      <Card className="border-border/40 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Revenue & Expenses</CardTitle>
          <CardDescription>Monthly financial overview with profit margins</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: { label: 'Revenue', color: 'hsl(var(--chart-1))' },
              expenses: { label: 'Expenses', color: 'hsl(var(--chart-2))' },
              profit: { label: 'Profit', color: 'hsl(var(--chart-3))' },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="rgb(139, 92, 246)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="rgb(239, 68, 68)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="rgb(16, 185, 129)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Client Growth & Project Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Client Growth */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Client Growth</CardTitle>
            <CardDescription>Total clients over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                clients: { label: 'Clients', color: 'hsl(var(--chart-1))' },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={clientGrowthData}>
                  <defs>
                    <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(139, 92, 246)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="rgb(139, 92, 246)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="clients"
                    stroke="rgb(139, 92, 246)"
                    strokeWidth={2}
                    fill="url(#colorClients)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Current project breakdown by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: 'Projects', color: 'hsl(var(--chart-1))' },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance & Invoice Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Team Performance */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Tasks completed by team members</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                tasks: { label: 'Tasks', color: 'hsl(var(--chart-1))' },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="member"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="tasks" fill="rgb(139, 92, 246)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Invoice Statistics */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Invoice Statistics</CardTitle>
            <CardDescription>Monthly invoice status tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                paid: { label: 'Paid', color: 'hsl(var(--chart-1))' },
                pending: { label: 'Pending', color: 'hsl(var(--chart-2))' },
                overdue: { label: 'Overdue', color: 'hsl(var(--chart-3))' },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={invoiceStatsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="paid" fill="rgb(16, 185, 129)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="rgb(245, 158, 11)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="overdue" fill="rgb(239, 68, 68)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
