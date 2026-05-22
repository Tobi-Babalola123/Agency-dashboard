import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/Dashboard';
import { ClientsPage } from './pages/Clients';
import { ProjectsPage } from './pages/Projects';
import { TasksPage } from './pages/Tasks';
import { InvoicesPage } from './pages/Invoices';
import { FilesPage } from './pages/Files';
import { MessagesPage } from './pages/Messages';
import { TeamPage } from './pages/Team';
import { AnalyticsPage } from './pages/Analytics';
import { SettingsPage } from './pages/Settings';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="files" element={<FilesPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}
