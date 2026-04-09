import React, { useState } from 'react';
import DashboardHeader from "../components/DashboardHeader";
import { 
  Users, Calendar as CalendarIcon, CheckCircle, Clock, XCircle, 
  Search, Save, FileText, Smartphone, History, ChevronLeft, ChevronRight, X
} from "lucide-react";

const AttendancePage = () => {
  // UI State
  const [selectedClass, setSelectedClass] = useState('8A');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showHistory, setShowHistory] = useState(false);

  // 🔷 MOCK DATA
  const mockClasses = [
    { id: '8A', name: 'Grade 8A' },
    { id: '9B', name: 'Grade 9B' },
    { id: '10A', name: 'Grade 10A' },
  ];

  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Sharma", roll: "01", status: "present", time: "08:45 AM" },
    { id: 2, name: "Priya Patel", roll: "02", status: "late", time: "09:15 AM" },
    { id: 3, name: "Amit Kumar", roll: "03", status: "absent", time: "--:--" },
    { id: 4, name: "Sneha Reddy", roll: "04", status: "present", time: "08:40 AM" },
    { id: 5, name: "Vikram Singh", roll: "05", status: "present", time: "08:50 AM" },
    { id: 6, name: "Ananya Desai", roll: "06", status: null, time: "--:--" }, // Unmarked
  ]);

  const mockHistory = [
    { date: "2026-03-26", present: 28, late: 2, absent: 0 },
    { date: "2026-03-25", present: 25, late: 1, absent: 4 },
    { date: "2026-03-24", present: 29, late: 0, absent: 1 },
  ];

  //  UI HANDLERS
  const handleStatusChange = (studentId, newStatus) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
  };

  const handleMarkAllPresent = () => {
    setStudents(students.map(s => ({ ...s, status: 'present' })));
  };

  const handleActionClick = (actionName) => {
    alert(`UI Layout Mode: ${actionName} functionality would trigger here.`);
  };

  //  CALENDAR LOGIC
  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Note: When you connect the backend, you would call fetchAttendanceForDate(date) right here!
  };

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay(); // 0 is Sunday
    const daysInMonth = lastDay.getDate();

    const days = [];
    
    // Fill previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month - 1, prevMonthLastDay - i), isCurrentMonth: false });
    }
    
    // Fill current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Fill next month days (up to 42 cells for a perfect 6x7 grid)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  };

  // Derived Stats
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.roll.includes(searchTerm)
  );

  const presentCount = students.filter(s => s.status === 'present').length;
  const lateCount = students.filter(s => s.status === 'late').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const markedCount = presentCount + lateCount + absentCount;
  
  const attendanceRate = markedCount > 0 ? Math.round(((presentCount + lateCount) / students.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <DashboardHeader title="Attendance" />
      
      {/* 🔷 Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Attendance Management</h1>
            <p className="text-slate-500 mt-1">Mark and track daily student attendance</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => setShowHistory(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-full font-medium hover:bg-slate-50 transition-all shadow-sm"
            >
              <History size={18} /> View History
            </button>
            <button 
              onClick={() => handleActionClick("Submit Attendance")}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-sm hover:shadow-md"
            >
              <Save size={18} /> Submit
            </button>
          </div>
        </div>

        {/* 🔷 Top Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Users size={20} />
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-700 w-full sm:w-48"
            >
              {mockClasses.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              <CheckCircle size={16} /> {presentCount} Present
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
              <Clock size={16} /> {lateCount} Late
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg border border-rose-100">
              <XCircle size={16} /> {absentCount} Absent
            </div>
          </div>
        </div>

        {/* 🔷 Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Student List */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Mark Attendance</h2>
                
                {/* Dynamically updates based on selected calendar date */}
                <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
                  <CalendarIcon size={16} />
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search students by name or roll..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* List */}
              <div className="space-y-3">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:shadow-sm transition-all bg-white gap-4">
                    
                    {/* Student Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{student.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">Roll No: {student.roll} • {student.time}</p>
                      </div>
                    </div>

                    {/* Segmented Control Toggle */}
                    <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
                      <button
                        onClick={() => handleStatusChange(student.id, 'present')}
                        className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                          student.status === 'present' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'late')}
                        className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                          student.status === 'late' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        Late
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'absent')}
                        className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                          student.status === 'absent' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        Absent
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="space-y-6">

            {/* 🔷 NEW: Calendar Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Date</h3>
                <div className="flex gap-1">
                  <button onClick={() => navigateMonth(-1)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => navigateMonth(1)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              
              <div className="text-center font-extrabold text-slate-800 mb-4">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getCalendarDays().map((day, idx) => {
                  const isSelected = day.date.toDateString() === selectedDate.toDateString();
                  const isToday = day.date.toDateString() === new Date().toDateString();

                  return (
                    <button 
                      key={idx}
                      onClick={() => handleDateSelect(day.date)}
                      className={`
                        aspect-square flex items-center justify-center text-sm font-semibold rounded-full transition-all
                        ${!day.isCurrentMonth ? 'text-slate-300 hover:bg-slate-50' : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'}
                        ${isToday && !isSelected ? 'border-2 border-indigo-200 text-indigo-600' : ''}
                        ${isSelected ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:text-white' : ''}
                      `}
                    >
                      {day.date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Chart Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 self-start w-full">Today's Rate</h3>
              
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#4f46e5" /* Indigo-600 */
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="439.8"
                    strokeDashoffset={439.8 - (439.8 * attendanceRate) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-slate-900">{attendanceRate}%</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-4 font-medium">{students.length - markedCount} students left to mark</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleMarkAllPresent}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl transition-colors font-bold"
                >
                  <CheckCircle size={18} /> Mark All Present
                </button>
                <button 
                  onClick={() => handleActionClick("Generate PDF Report")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors font-bold border border-slate-200 hover:border-indigo-100"
                >
                  <FileText size={18} /> Generate Report
                </button>
                <button 
                  onClick={() => handleActionClick("Send SMS")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors font-bold border border-slate-200 hover:border-indigo-100"
                >
                  <Smartphone size={18} /> SMS Absentees
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 🔷 Simple History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Attendance History</h2>
                <p className="text-sm text-slate-500 mt-1">Class {selectedClass} • Last 7 Days</p>
              </div>
              <button onClick={() => setShowHistory(false)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto bg-white space-y-4">
              {mockHistory.map((record, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:shadow-sm transition-all">
                  <div className="font-bold text-slate-800">
                    {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex gap-3 text-sm font-semibold">
                    <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{record.present} P</span>
                    <span className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{record.late} L</span>
                    <span className="text-rose-600 bg-rose-50 px-3 py-1 rounded-full">{record.absent} A</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;