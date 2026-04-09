import React, { useState, useRef } from 'react';
import DashboardHeader from "../components/DashboardHeader";
import { 
  Camera, UploadCloud, ScanLine, CheckCircle2, XCircle, 
  AlertCircle, Users, Save, RefreshCw, Check, X
} from "lucide-react";

const SmartAttendance = () => {
  // UI States: 'idle' | 'analyzing' | 'review'
  const [scanState, setScanState] = useState('idle');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // 🔷 MOCK DATA
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Sharma", roll: "01", status: "unmarked", confidence: 0 },
    { id: 2, name: "Priya Patel", roll: "02", status: "unmarked", confidence: 0 },
    { id: 3, name: "Amit Kumar", roll: "03", status: "unmarked", confidence: 0 },
    { id: 4, name: "Sneha Reddy", roll: "04", status: "unmarked", confidence: 0 },
    { id: 5, name: "Vikram Singh", roll: "05", status: "unmarked", confidence: 0 },
    { id: 6, name: "Ananya Desai", roll: "06", status: "unmarked", confidence: 0 },
  ]);

  // 🔷 HANDLERS
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a local URL so we can display the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setScanState('analyzing');

      // 🔷 MOCK AI ANALYSIS DELAY (Simulating 3 seconds of processing)
      setTimeout(() => {
        // Mock AI Results: Randomly detect some students, miss others
        const aiResults = students.map(student => {
          // 80% chance the AI finds them
          const isDetected = Math.random() > 0.2; 
          return {
            ...student,
            status: isDetected ? 'present' : 'absent',
            // Assign a fake confidence score (85% to 99%)
            confidence: isDetected ? Math.floor(Math.random() * 15) + 85 : 0 
          };
        });
        setStudents(aiResults);
        setScanState('review');
      }, 3000);
    }
  };

  const handleManualToggle = (id, newStatus) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleReset = () => {
    setScanState('idle');
    setSelectedImage(null);
    setStudents(students.map(s => ({ ...s, status: 'unmarked', confidence: 0 })));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = () => {
    alert("UI Layout Mode: AI Attendance successfully saved to database!");
    handleReset();
  };

  // Derived Stats
  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <DashboardHeader title="Smart Attendance" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              AI Vision Attendance <span className="bg-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Beta</span>
            </h1>
            <p className="text-slate-500 mt-1">Upload a classroom photo to instantly mark attendance using AI.</p>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* STATE 1: IDLE / UPLOAD */}
        {/* ------------------------------------------------------------------ */}
        {scanState === 'idle' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-16 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="max-w-xl mx-auto">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
                <Camera size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Upload Classroom Photo</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Make sure the classroom is well-lit and students' faces are visible. Our AI will scan the image and cross-reference it with your student database.
              </p>
              
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleImageUpload}
              />
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md"
                >
                  <UploadCloud size={20} /> Browse Files
                </button>
                <button className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-600 hover:text-indigo-600 px-8 py-3.5 rounded-xl font-bold transition-all">
                  <Camera size={20} /> Open Camera
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-6 font-medium tracking-wide uppercase">Supported Formats: JPG, PNG, WEBP</p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* STATE 2: ANALYZING (Processing Animation) */}
        {/* ------------------------------------------------------------------ */}
        {scanState === 'analyzing' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col items-center justify-center py-20 animate-in fade-in duration-300">
            
            {/* Image Preview with Scanning Overlay */}
            <div className="relative w-full max-w-2xl aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl mb-8">
              {selectedImage && (
                <img src={selectedImage} alt="Classroom" className="w-full h-full object-cover opacity-60" />
              )}
              {/* Scanning Laser Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
              
              <div className="absolute inset-0 flex items-center justify-center flex-col text-white">
                <ScanLine size={48} className="animate-pulse text-blue-400 mb-4" />
                <h3 className="text-xl font-bold tracking-widest">ANALYZING FACES</h3>
                <p className="text-sm text-blue-200 mt-2">Cross-referencing student database...</p>
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* STATE 3: REVIEW RESULTS */}
        {/* ------------------------------------------------------------------ */}
        {scanState === 'review' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 duration-500">
            
            {/* Left: Image & Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
                <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden">
                  {selectedImage && (
                    <img src={selectedImage} alt="Classroom Analyzed" className="w-full h-full object-cover" />
                  )}
                  {/* Mock Bounding Boxes could go here */}
                  <div className="absolute top-4 left-4 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-2 shadow-lg">
                    <ScanLine size={14} /> AI Scan Complete
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-extrabold text-emerald-600 mb-1">{presentCount}</div>
                  <div className="text-xs font-bold text-emerald-700/60 uppercase tracking-wider">Detected (Present)</div>
                </div>
                <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl text-center">
                  <div className="text-3xl font-extrabold text-rose-600 mb-1">{absentCount}</div>
                  <div className="text-xs font-bold text-rose-700/60 uppercase tracking-wider">Missing (Absent)</div>
                </div>
              </div>
            </div>

            {/* Right: Verification List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[600px]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Users size={18} className="text-indigo-600"/> Verify Results
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">Please review the AI's findings before submitting.</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {students.map(student => (
                  <div 
                    key={student.id} 
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      student.status === 'present' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        student.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{student.name}</h3>
                        <p className="text-xs font-medium text-slate-500">
                          Roll: {student.roll} 
                          {student.status === 'present' && <span className="ml-2 text-emerald-600 font-semibold">• {student.confidence}% Match</span>}
                        </p>
                      </div>
                    </div>

                    {/* Manual Override Buttons */}
                    <div className="flex bg-white rounded-lg p-1 border shadow-sm">
                      <button
                        onClick={() => handleManualToggle(student.id, 'present')}
                        className={`p-1.5 rounded-md transition-all ${student.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-400 hover:text-slate-700'}`}
                        title="Mark Present"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => handleManualToggle(student.id, 'absent')}
                        className={`p-1.5 rounded-md transition-all ${student.status === 'absent' ? 'bg-rose-100 text-rose-700' : 'text-slate-400 hover:text-slate-700'}`}
                        title="Mark Absent"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex gap-3">
                <button 
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all"
                >
                  <RefreshCw size={18} /> Rescan
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-sm transition-all"
                >
                  <Save size={18} /> Confirm & Save Attendance
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
      

      {/* Animation Styles injected directly for the scanning laser */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default SmartAttendance;