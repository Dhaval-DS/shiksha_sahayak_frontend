import React, { useState } from 'react';
import DashboardHeader from "../components/DashboardHeader";
import { 
  Users, Search, Plus, Download, X, Mail, Phone, Calendar, 
  GraduationCap, Activity, CheckCircle2, MessageSquare, 
  TrendingUp, BookOpen, Clock, ChevronRight
} from "lucide-react";

const Students = () => {
  // 🔷 States
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 🔷 Mock Data (Avatars removed - using initials fallback)
  const [students, setStudents] = useState([
    {
      id: 1, firstName: "Rahul", lastName: "Sharma", rollNumber: "15", class: "10A",
      dob: "2010-02-27", age: 16, parentName: "Suresh Sharma", contact: "+91 98765 43210",
      email: "suresh.s@example.com", language: "English, Hindi", attendance: 92,
      tags: ["Math Ace", "Team Player", "Coding"],
      avatar: null // Option to upload later
    },
    {
      id: 2, firstName: "Priya", lastName: "Patel", rollNumber: "08", class: "9B",
      dob: "2011-08-14", age: 15, parentName: "Rajesh Patel", contact: "+91 91234 56789",
      email: "rajesh.p@example.com", language: "English, Gujarati", attendance: 85,
      tags: ["Creative", "Debate Club"],
      avatar: null
    },
    {
      id: 3, firstName: "Amit", lastName: "Kumar", rollNumber: "22", class: "10A",
      dob: "2010-11-05", age: 15, parentName: "Anita Kumar", contact: "+91 99887 76655",
      email: "anita.k@example.com", language: "Hindi", attendance: 98,
      tags: ["Science Lead", "Punctual"],
      avatar: null
    },
    {
      id: 4, firstName: "Sneha", lastName: "Reddy", rollNumber: "04", class: "8A",
      dob: "2012-04-19", age: 14, parentName: "Venkat Reddy", contact: "+91 98712 34567",
      email: "venkat.r@example.com", language: "English, Telugu", attendance: 76,
      tags: ["Sports Captain", "Needs Attention"],
      avatar: null
    }
  ]);

  // Form State
  const [newStudent, setNewStudent] = useState({
    firstName: '', lastName: '', rollNumber: '', parentName: '', 
    contact: '', email: '', class: '10A', language: 'English', avatar: null
  });

  // 🔷 Handlers
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || s.rollNumber.includes(searchTerm);
    const matchesClass = classFilter === 'All' || s.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = students.length + 1;
    setStudents([...students, { 
      ...newStudent, 
      id: newId, 
      attendance: 100, 
      age: 14, 
      dob: "2012-01-01", 
      tags: ["New Admission"],
    }]);
    setIsAddModalOpen(false);
    alert("UI Layout Mode: Student Added!");
  };

  // Helper for generating Avatar initials
  const AvatarIcon = ({ student, size = "md" }) => {
    const dimensions = size === "md" ? "w-12 h-12 text-lg" : "w-28 h-28 text-4xl";
    if (student.avatar) {
      return <img src={student.avatar} alt={student.firstName} className={`${dimensions} rounded-full object-cover border-2 border-white shadow-sm`} />;
    }
    return (
      <div className={`${dimensions} rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-black border-2 border-white shadow-sm`}>
        {student.firstName.charAt(0)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12 flex flex-col">
      <DashboardHeader title="Student Management" />
      
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8 relative overflow-hidden">
        
        {/* ========================================================= */}
        {/* LEFT PANE: MAIN DIRECTORY */}
        {/* ========================================================= */}
        <div className={`flex-1 transition-all duration-500 ${selectedStudent ? 'hidden lg:block lg:pr-4' : ''}`}>
          
          {/* Header & Stats */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Directory</h1>
            <p className="text-slate-500 mt-1 mb-6">Manage profiles, attendance, and overall performance.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Users size={24}/></div>
                <div><p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Students</p><h3 className="text-2xl font-black text-slate-800">{students.length}</h3></div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><BookOpen size={24}/></div>
                <div><p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Classes</p><h3 className="text-2xl font-black text-slate-800">10</h3></div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Activity size={24}/></div>
                <div><p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Avg Attendance</p><h3 className="text-2xl font-black text-slate-800">88%</h3></div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><TrendingUp size={24}/></div>
                <div><p className="text-sm font-bold text-slate-400 uppercase tracking-wider">New Admissions</p><h3 className="text-2xl font-black text-slate-800">3</h3></div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex-1 flex gap-4 w-full">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" placeholder="Search by first name..." 
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <select 
                value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-700"
              >
                <option value="All">All Classes</option>
                <option value="8A">8A</option>
                <option value="9B">9B</option>
                <option value="10A">10A</option>
              </select>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button onClick={() => setIsAddModalOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-sm">
                <Plus size={18} /> Add Student
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
                <Download size={18} /> PDF
              </button>
            </div>
          </div>

          {/* Simplified Student List */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-0">
              {filteredStudents.map((student, idx) => (
                <div 
                  key={student.id} 
                  onClick={() => setSelectedStudent(student)}
                  className={`flex items-center gap-4 p-5 cursor-pointer transition-all border-b border-r border-slate-100 hover:bg-indigo-50/50 group
                    ${selectedStudent?.id === student.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'}
                  `}
                >
                  {/* Photo Left */}
                  <AvatarIcon student={student} size="md" />
                  
                  {/* First Name & Class Only */}
                  <div className="flex-1">
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {student.firstName}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500 flex items-center gap-1">
                      Class {student.class}
                    </p>
                  </div>
                  
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                </div>
              ))}
            </div>
            {filteredStudents.length === 0 && (
               <div className="p-12 text-center text-slate-500 font-medium">No students found matching your criteria.</div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANE: STUDENT DETAIL SIDEBAR */}
        {/* ========================================================= */}
        {selectedStudent && (
          <div className="w-full lg:w-[480px] xl:w-[500px] flex-shrink-0 bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-right-8 duration-500 h-[calc(100vh-8rem)] sticky top-24">
            
            {/* Header Banner */}
            <div className="h-32 bg-slate-900 relative">
              {/* Optional geometric pattern to make the dark header look modern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 via-transparent to-transparent"></div>
              
              <button 
                onClick={() => setSelectedStudent(null)} 
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 flex-1 overflow-y-auto custom-scrollbar pb-8">
              {/* Profile Avatar & Name */}
              <div className="relative -mt-14 mb-4 flex flex-col items-center text-center">
                <AvatarIcon student={selectedStudent} size="lg" />
                <h2 className="text-2xl font-black text-slate-900 mt-3">{selectedStudent.firstName} {selectedStudent.lastName}</h2>
                <p className="text-indigo-600 font-bold flex items-center justify-center gap-1.5 mt-1 bg-indigo-50 px-3 py-1 rounded-full">
                  <GraduationCap size={16}/> Class {selectedStudent.class}
                </p>
              </div>

              {/* Quick Contact Buttons */}
              <div className="flex justify-center gap-3 mb-6 border-b border-slate-100 pb-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-semibold text-sm border border-slate-200"><Mail size={16}/> Email</button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-semibold text-sm border border-slate-200"><Phone size={16}/> Call</button>
              </div>

              {/* Personal Info Grid */}
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><Users size={14}/> Personal Details</h4>
              <div className="bg-white rounded-2xl border border-slate-200 mb-8 overflow-hidden">
                <div className="grid grid-cols-2 divide-x divide-y divide-slate-100">
                  <div className="p-4"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Roll Number</p><p className="font-bold text-slate-800">{selectedStudent.rollNumber}</p></div>
                  <div className="p-4"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Age / DOB</p><p className="font-bold text-slate-800">{selectedStudent.age} yrs <span className="text-xs text-slate-400 font-medium block">{selectedStudent.dob}</span></p></div>
                  <div className="p-4 col-span-2 border-t"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Parent / Guardian</p><p className="font-bold text-slate-800">{selectedStudent.parentName} <span className="text-sm text-slate-500 font-medium ml-2">{selectedStudent.contact}</span></p></div>
                </div>
              </div>

              {/* Performance Section */}
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><TrendingUp size={14}/> Overall Performance</h4>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Attendance Widget */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col items-center text-center">
                  <h5 className="text-xs font-bold text-slate-500 uppercase w-full text-left mb-2">Attendance</h5>
                  <div className="relative w-20 h-20 my-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                      <circle cx="40" cy="40" r="32" stroke={selectedStudent.attendance > 80 ? "#10b981" : "#f59e0b"} strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="201" strokeDashoffset={201 - (201 * selectedStudent.attendance) / 100} className="transition-all duration-1000" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-black text-slate-800">{selectedStudent.attendance}%</span></div>
                  </div>
                </div>

                {/* Tests Widget */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col">
                  <h5 className="text-xs font-bold text-slate-500 uppercase mb-3">Recent Tests</h5>
                  <div className="space-y-3 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100">
                      <span className="text-xs font-bold text-slate-600">Science</span>
                      <span className="text-xs font-black text-emerald-600">A+</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100">
                      <span className="text-xs font-bold text-slate-600">Math</span>
                      <span className="text-xs font-black text-amber-600">B</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignments Widget */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8">
                <h5 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">Assignments Tracker</h5>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-bold text-slate-700"><span>Algebra Practice 1</span><span className="text-emerald-600">Done</span></div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full w-full"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-bold text-slate-700"><span>Cell Structure Essay</span><span className="text-amber-600">Pending</span></div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden"><div className="bg-amber-400 h-full w-1/3"></div></div>
                  </div>
                </div>
              </div>

              {/* Teacher Notes */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><BookOpen size={14}/> Private Notes</h4>
                <textarea 
                  className="w-full bg-amber-50/30 border border-amber-200 text-slate-700 p-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-amber-700/40"
                  rows="3"
                  placeholder={`Add a quick note about ${selectedStudent.firstName}'s progress...`}
                ></textarea>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* MODAL: ADD STUDENT FORM */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 flex-shrink-0">
              <div>
                <h2 className="text-xl font-black text-slate-900">Add New Student</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">Enter student details to enroll them in a class.</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 bg-white">
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">First Name *</label><input type="text" required value={newStudent.firstName} onChange={e => setNewStudent({...newStudent, firstName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Last Name *</label><input type="text" required value={newStudent.lastName} onChange={e => setNewStudent({...newStudent, lastName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800" /></div>
                
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Roll Number *</label><input type="text" required value={newStudent.rollNumber} onChange={e => setNewStudent({...newStudent, rollNumber: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Parent Name *</label><input type="text" required value={newStudent.parentName} onChange={e => setNewStudent({...newStudent, parentName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800" /></div>
                
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Parent Contact *</label><input type="text" required value={newStudent.contact} onChange={e => setNewStudent({...newStudent, contact: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Parent Email</label><input type="email" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800" /></div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Class *</label>
                  <select value={newStudent.class} onChange={e => setNewStudent({...newStudent, class: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700">
                    <option>8A</option><option>9B</option><option>10A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Preferred Language</label>
                  <select value={newStudent.language} onChange={e => setNewStudent({...newStudent, language: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700">
                    <option>English</option><option>Hindi</option><option>Marathi</option>
                  </select>
                </div>
                
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Student Photo (Optional)</label>
                  <div className="w-full flex items-center px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl border-dashed">
                    <input type="file" accept="image/*" className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-all cursor-pointer"/>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 flex-shrink-0">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-all">Cancel</button>
                <button type="submit" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-sm transition-all flex items-center gap-2"><Plus size={18}/> Enroll Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Students;