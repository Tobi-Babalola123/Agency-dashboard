import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'motion/react';
import { Plus, MoreVertical, Calendar, User, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { cn } from '../components/ui/utils';

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  column: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Design homepage mockup',
    description: 'Create high-fidelity mockup for homepage redesign',
    assignee: 'JD',
    priority: 'high',
    dueDate: 'May 18',
    column: 'todo',
  },
  {
    id: 2,
    title: 'Implement authentication',
    description: 'Add JWT-based authentication system',
    assignee: 'SM',
    priority: 'high',
    dueDate: 'May 20',
    column: 'in-progress',
  },
  {
    id: 3,
    title: 'Database migration',
    description: 'Migrate to PostgreSQL from MySQL',
    assignee: 'AB',
    priority: 'medium',
    dueDate: 'May 22',
    column: 'in-progress',
  },
  {
    id: 4,
    title: 'Write API documentation',
    description: 'Document all REST API endpoints',
    assignee: 'EW',
    priority: 'low',
    dueDate: 'May 25',
    column: 'todo',
  },
  {
    id: 5,
    title: 'UI component library',
    description: 'Build reusable component library',
    assignee: 'DL',
    priority: 'medium',
    dueDate: 'May 19',
    column: 'review',
  },
  {
    id: 6,
    title: 'Deploy to production',
    description: 'Set up CI/CD pipeline and deploy',
    assignee: 'JD',
    priority: 'high',
    dueDate: 'May 17',
    column: 'done',
  },
];

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-500' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500' },
  { id: 'review', title: 'Review', color: 'bg-amber-500' },
  { id: 'done', title: 'Done', color: 'bg-emerald-500' },
];

const priorityColors = {
  low: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  high: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

function TaskCard({ task, onMove }: { task: Task; onMove: (taskId: number, newColumn: string) => void }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, column: task.column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-move"
    >
      <Card className="group border-border/40 bg-card/80 backdrop-blur hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Task</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              <Flag className="h-3 w-3 mr-1" />
              {task.priority}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {task.dueDate}
            </div>
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-[10px] text-white">
                {task.assignee}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Column({
  column,
  tasks,
  onMove,
}: {
  column: { id: string; title: string; color: string };
  tasks: Task[];
  onMove: (taskId: number, newColumn: string) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: number; column: string }) => {
      if (item.column !== column.id) {
        onMove(item.id, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={cn(
        'flex-1 min-w-[280px] rounded-lg border border-border/40 bg-accent/20 p-4 transition-colors',
        isOver && 'border-violet-500/50 bg-violet-500/5'
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn('h-2 w-2 rounded-full', column.color)} />
          <h3 className="font-semibold">{column.title}</h3>
          <Badge variant="secondary" className="text-xs">
            {tasks.length}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onMove={onMove} />
        ))}
      </div>
    </div>
  );
}

export function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleMoveTask = (taskId: number, newColumn: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, column: newColumn } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6 p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1">
              Manage tasks with drag-and-drop kanban board
            </p>
          </div>
          <Button className="bg-violet-600 hover:bg-violet-700">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => {
            const columnTasks = tasks.filter((task) => task.column === column.id);
            return (
              <Card key={column.id} className="border-border/40 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <div className={cn('h-2 w-2 rounded-full', column.color)} />
                    {column.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{columnTasks.length}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-min">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.column === column.id)}
                onMove={handleMoveTask}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
