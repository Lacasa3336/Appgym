import React, { useState } from 'react';
import { ViewState } from './types';
import { useGymStore } from './services/store';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Members } from './components/Members';
import { Instructors } from './components/Instructors';
import { Classes } from './components/Classes';
import { Reservations } from './components/Reservations';
import { Dumbbell, LayoutDashboard, Users, UserCheck, Calendar, BookOpen, LogOut, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load Store
  const store = useGymStore();

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard counts={{
          members: store.members.length,
          instructors: store.instructors.length,
          classes: store.classes.length,
          reservations: store.reservations.length
        }} />;
      case 'socios':
        return <Members 
          data={store.members} 
          onAdd={store.addMember} 
          onUpdate={store.updateMember} 
          onDelete={store.deleteMember} 
        />;
      case 'instructores':
        return <Instructors 
          data={store.instructors} 
          onAdd={store.addInstructor} 
          onUpdate={store.updateInstructor} 
          onDelete={store.deleteInstructor} 
        />;
      case 'clases':
        return <Classes 
          data={store.classes} 
          onAdd={store.addClass} 
          onUpdate={store.updateClass} 
          onDelete={store.deleteClass} 
        />;
      case 'reservas':
        return <Reservations 
          reservations={store.reservations}
          members={store.members}
          classes={store.classes}
          onAdd={store.addReservation}
          onDelete={store.deleteReservation}
        />;
      default:
        return <div>View not found</div>;
    }
  };

  const NavItem = ({ view, label, icon: Icon }: { view: ViewState; label: string; icon: any }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors ${
        currentView === view
          ? 'bg-brand-50 text-brand-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${
        currentView === view ? 'text-brand-600' : 'text-gray-400 group-hover:text-gray-500'
      }`} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white pt-5 pb-4">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center px-4">
              <Dumbbell className="h-8 w-8 text-brand-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Gimnasio</span>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                <NavItem view="dashboard" label="Dashboard" icon={LayoutDashboard} />
                <NavItem view="socios" label="Socios" icon={Users} />
                <NavItem view="instructores" label="Instructores" icon={UserCheck} />
                <NavItem view="clases" label="Clases" icon={BookOpen} />
                <NavItem view="reservas" label="Reservas" icon={Calendar} />
              </nav>
            </div>
            <div className="border-t border-gray-200 p-4">
               <button onClick={() => setIsAuthenticated(false)} className="flex items-center text-gray-600 hover:text-red-600 w-full">
                  <LogOut className="mr-3 h-5 w-5" /> Logout
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Static Sidebar for Desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-gray-200 bg-white pt-5 pb-4">
        <div className="flex items-center flex-shrink-0 px-4 mb-5">
          <Dumbbell className="h-8 w-8 text-brand-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">Gimnasio Pro</span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            <NavItem view="dashboard" label="Dashboard" icon={LayoutDashboard} />
            <NavItem view="socios" label="Socios" icon={Users} />
            <NavItem view="instructores" label="Instructores" icon={UserCheck} />
            <NavItem view="clases" label="Clases" icon={BookOpen} />
            <NavItem view="reservas" label="Reservas" icon={Calendar} />
          </nav>
        </div>
        <div className="border-t border-gray-200 p-4">
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center text-gray-600 hover:text-red-600 w-full px-2 py-2 rounded-md hover:bg-red-50 transition-colors">
              <LogOut className="mr-3 h-5 w-5" /> Salir
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1 w-full">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500 lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
               <h1 className="text-lg font-semibold text-gray-900 capitalize">{currentView}</h1>
            </div>
          </div>
        </div>

        <main className="flex-1 pb-8">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
             {renderContent()}
           </div>
        </main>
      </div>
    </div>
  );
};

export default App;
