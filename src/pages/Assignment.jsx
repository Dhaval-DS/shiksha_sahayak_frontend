import { useState } from 'react';
import DashboardHeader from "./DashboardHeader";
import { 
  BookOpen, Send, Clock, Activity, Plus, Download, Zap, Bell, 
  Calendar, ChevronRight, X, FileText, CheckCircle, Trash2, Eye
} from "lucide-react";

const Assignment = () => {
  // UI State
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State (Visual only)
  const [newAssignment, setNewAssignment] = useState({
    title: '', description: '', dueDate: '', classId: '', subject: '', grade: ''
  });

  //  MOCK DATA (Replaces API Calls)
  const mockAssignments = [
    {
      id: 1,
      title: "Algebra Practice Set 1",
      status: "active",
      description: "Solve linear equations in one variable. Show all your working steps clearly.",
      subject: "Mathematics",
      grade: "Grade 8A",
      dueDate: "30 Mar 2026",
      completed: 24,
      total: 30,
      progress: 80,
      graded: 15,
    },
    {
      id: 2,
      title: "Cell Structure Essay",
      status: "grading",
      description: "Write a 500-word essay on the differences between plant and animal cells.",
      subject: "Science",
      grade: "Grade 9B",
      dueDate: "25 Mar 2026",
      completed: 28,
      total: 28,
      progress: 100,
      graded: 10,
    },
    {
      id: 3,
      title: "World War II Timeline",
      status: "completed",
      description: "Create a visual timeline of major events during WWII.",
      subject: "History",
      grade: "Grade 10A",
      dueDate: "15 Mar 2026",
      completed: 32,
      total: 32,
      progress: 100,
      graded: 32,
    }
  ];

  const mockRecentSubmissions = [
    { id: 1, studentName: "Rahul Sharma", assignment: "Algebra Practice Set 1", grade: "A", subject: "Mathematics" },
    { id: 2, studentName: "Priya Patel", assignment: "Cell Structure Essay", grade: null, subject: "Science" },
    { id: 3, studentName: "Amit Kumar", assignment: "Algebra Practice Set 1", grade: "B+", subject: "Mathematics" },
    { id: 4, studentName: "Sneha Reddy", assignment: "World War II Timeline", grade: "A+", subject: "History" },
  ];

  const mockClassStudents = [
    { id: 101, firstName: "Rahul", lastName: "Sharma", rollNumber: "12", status: "submitted", grade: "A" },
    { id: 102, firstName: "Priya", lastName: "Patel", rollNumber: "14", status: "submitted", grade: "" },
    { id: 103, firstName: "Amit", lastName: "Kumar", rollNumber: "05", status: "pending", grade: "" },
  ];

  const stats = [
    { label: 'Active Assignments', value: "5", icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Submissions Today', value: "12", icon: Send, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Grading', value: "27", icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Overall Completion', value: "85%", icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  // 🔷 UI HANDLERS
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'grading': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'completed': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    alert("UI Layout Mode: Assignment would be created here.");
    setShowCreateModal(false);
  };

  const handleViewDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setActiveTab('details');
  };

  const handleDelete = () => {
    alert("UI Layout Mode: Assignment would be deleted here.");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <DashboardHeader title="Assignments" />
      
      {/* 🔷 Page Header & Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Assignment Management</h1>
            <p className="text-slate-500 mt-1">Create, distribute, and track student assignments</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <Plus size={18} />
            Create Assignment
          </button>
        </div>

        {/* 🔷 Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-hover hover:shadow-md">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* 🔷 Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* LEFT: Assignments List */}
          <div className="xl:col-span-2 space-y-5">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-600"/> Current Assignments
            </h2>
            
            {mockAssignments.map((assignment) => (
              <div key={assignment.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-indigo-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-slate-900">{assignment.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(assignment.status)} uppercase tracking-wider`}>
                        {assignment.status}
                      </span>
                    </div>
                    <p className="text-slate-500 line-clamp-2">{assignment.description}</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold tracking-wide">
                    {assignment.subject}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold tracking-wide">
                    {assignment.grade}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-2 flex justify-between items-end">
                  <span className="text-sm font-semibold text-slate-600">Completion: {assignment.completed}/{assignment.total}</span>
                  <span className="text-sm font-bold text-indigo-600">{assignment.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${assignment.progress}%` }}></div>
                </div>

                {/* Footer / Buttons */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                  <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                    <Clock size={16} /> Due: {assignment.dueDate}
                  </p>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleDelete}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleViewDetails(assignment)}
                      className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                      <Eye size={16}/> View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="space-y-6">
            
            {/* Recent Submissions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Recent Submissions</h3>
              <div className="space-y-2">
                {mockRecentSubmissions.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between group cursor-pointer p-2.5 -mx-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {sub.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{sub.studentName}</p>
                        <p className="text-xs text-slate-500 w-32 truncate">{sub.assignment}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {sub.grade && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {sub.grade}
                        </span>
                      )}
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-colors font-medium border border-transparent hover:border-slate-100">
                  <Download size={18} /> Bulk Download
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-colors font-medium border border-transparent hover:border-slate-100">
                  <Zap size={18} /> Auto Grade
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-colors font-medium border border-transparent hover:border-slate-100">
                  <Bell size={18} /> Send Reminders
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-colors font-medium border border-transparent hover:border-slate-100">
                  <Calendar size={18} /> Schedule Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔷 Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Create New Assignment</h2>
                <p className="text-sm text-slate-500 mt-1">Set up a new assignment for your students</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
<form onSubmit={handleCreateSubmit}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Assignment Title *</label>
                  <input type="text" placeholder="e.g., Chapter 1 Algebra Practice" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Mathematics</option>
                      <option>Science</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Class *</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                      <option>Grade 8A</option>
                      <option>Grade 9B</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description *</label>
                  <textarea placeholder="Assignment instructions..." rows="3" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>

                {/* 🔷 NEW: Due Date & Points Row */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Due Date *</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Total Points</label>
                    <input 
                      type="number" 
                      placeholder="100" 
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    />
                  </div>
                </div>

              </div>
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-all">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 shadow-sm transition-all">Create Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* 🔷 Assignment Details View */}
      {selectedAssignment && activeTab === 'details' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 bg-slate-50 rounded-t-2xl sticky top-0 z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-slate-900">{selectedAssignment.title}</h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(selectedAssignment.status)} uppercase tracking-wider`}>
                    {selectedAssignment.status}
                  </span>
                </div>
                <p className="text-slate-600 text-sm font-medium">{selectedAssignment.subject} • {selectedAssignment.grade}</p>
              </div>
              <button onClick={() => { setSelectedAssignment(null); setActiveTab('overview'); }} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Left Column (Takes 2/3) - Submissions */}
                <div className="xl:col-span-2">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText size={20} className="text-indigo-600"/> Assignment Description
                  </h3>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-8 text-slate-700 leading-relaxed">
                    {selectedAssignment.description}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-4">Student Grading</h3>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {mockClassStudents.map((student) => (
                      <div key={student.id} className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all duration-300 bg-white">
                        <div className="flex justify-between items-start mb-4 border-b border-slate-50 pb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                              {student.firstName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{student.firstName} {student.lastName}</p>
                              <p className="text-xs text-slate-500 font-medium">Roll: {student.rollNumber}</p>
                            </div>
                          </div>
                          {student.status === 'submitted' && (
                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                              <CheckCircle size={14} /> Submitted
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Assign Grade</label>
                            <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue={student.grade}>
                              <option value="">Select Grade</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Teacher Comments</label>
                            <input type="text" placeholder="Add feedback..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-bold shadow-sm">
                      <CheckCircle size={20} /> Submit Grades
                    </button>
                  </div>
                </div>

                {/* Right Column (Takes 1/3) - Analytics */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Analytics Overview</h3>
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
                    <div className="text-center mb-6">
                      <div className="text-5xl font-extrabold text-indigo-600 mb-1">{selectedAssignment.progress}%</div>
                      <div className="text-slate-500 text-sm font-bold uppercase tracking-wide">Completion Rate</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-slate-600">Completed</span>
                        <span className="text-indigo-700">{selectedAssignment.completed}/{selectedAssignment.total}</span>
                      </div>
                      <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden shadow-inner">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${selectedAssignment.progress}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
                      <div className="text-3xl font-extrabold text-emerald-600 mb-1">{selectedAssignment.graded}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Graded</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
                      <div className="text-3xl font-extrabold text-amber-500 mb-1">{selectedAssignment.total - selectedAssignment.completed}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
};

export default Assignment;