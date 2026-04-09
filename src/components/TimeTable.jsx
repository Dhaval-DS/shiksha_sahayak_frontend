import React, { useState } from "react";
import { jsPDF } from "jspdf";
import DashboardHeader from "../components/DashboardHeader";
import { Plus, Download, X, Calendar as CalendarIcon, Clock, Users, MapPin } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Updated to use Slate instead of Gray for better UI consistency
const subjectColors = {
  "Mathematics": "bg-blue-50 text-blue-700 border-blue-100",
  "Science": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "English": "bg-purple-50 text-purple-700 border-purple-100",
  "Social Studies": "bg-amber-50 text-amber-700 border-amber-100",
  "Hindi": "bg-pink-50 text-pink-700 border-pink-100",
  "Art": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Computer Science": "bg-cyan-50 text-cyan-700 border-cyan-100",
  "Music": "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
  "Physical Education": "bg-lime-50 text-lime-700 border-lime-100",
  "Games": "bg-orange-50 text-orange-700 border-orange-100",
  "Study Period": "bg-slate-100 text-slate-700 border-slate-200",
  "Library Period": "bg-yellow-50 text-yellow-700 border-yellow-100",
  "Free Period": "bg-white text-slate-400 border-slate-100 border-dashed",
  "Assembly": "bg-blue-50 text-blue-700 border-blue-100",
  "Parent Meeting": "bg-rose-50 text-rose-700 border-rose-100",
  "Lunch Break": "bg-slate-100 text-slate-600 border-slate-200",
  "Half Day": "bg-slate-100 text-slate-600 border-slate-200",
  "Science Lab": "bg-cyan-50 text-cyan-700 border-cyan-100",
  "Art & Craft": "bg-violet-50 text-violet-700 border-violet-100",
  "Study Hall": "bg-slate-100 text-slate-700 border-slate-200",
  "Break": "bg-slate-100 text-slate-600 border-slate-200"
};

const Timetable = () => {
  const initialTimetable = [
    {
      time: "08:00 - 08:45",
      Monday: { subject: "Mathematics", class: "7A", room: "Room 12" },
      Tuesday: { subject: "Science", class: "7A", room: "Lab 2" },
      Wednesday: { subject: "Social Studies", class: "7A", room: "Room 10" },
      Thursday: { subject: "Hindi", class: "9B", room: "Room 18" },
      Friday: { subject: "Social Studies", class: "7A", room: "Room 16" },
      Saturday: { subject: "Parent Meeting", class: "", room: "Staff Room" }
    },
    {
      time: "08:45 - 09:30",
      Monday: { subject: "Hindi", class: "9B", room: "Room 12" },
      Tuesday: { subject: "Mathematics", class: "9B", room: "Room 15" },
      Wednesday: { subject: "Science", class: "9B", room: "Lab 2" },
      Thursday: { subject: "Free Period", class: "", room: "" },
      Friday: { subject: "Mathematics", class: "7A", room: "Room 12" },
      Saturday: { subject: "Science", class: "7B", room: "Lab 1" }
    },
    {
      time: "09:30 - 10:15",
      Monday: { subject: "Science", class: "8A", room: "Lab 1" },
      Tuesday: { subject: "English", class: "8A", room: "Room 15" },
      Wednesday: { subject: "Mathematics", class: "8A", room: "Room 12" },
      Thursday: { subject: "Art", class: "8A", room: "Art Room" },
      Friday: { subject: "Computer Science", class: "8A", room: "Computer Lab" },
      Saturday: { subject: "English", class: "9A", room: "Room 15" }
    },
    {
      time: "10:15 - 10:30",
      Monday: { subject: "Break", class: "", room: "" },
      Tuesday: { subject: "Break", class: "", room: "" },
      Wednesday: { subject: "Break", class: "", room: "" },
      Thursday: { subject: "Break", class: "", room: "" },
      Friday: { subject: "Break", class: "", room: "" },
      Saturday: { subject: "Break", class: "", room: "" }
    },
    {
      time: "10:30 - 11:15",
      Monday: { subject: "Science Lab", class: "8A", room: "Lab 1" },
      Tuesday: { subject: "Art & Craft", class: "8A", room: "Art Room" },
      Wednesday: { subject: "Music", class: "All", room: "Music Room" },
      Thursday: { subject: "Half Day", class: "", room: "" },
      Friday: { subject: "Physical Education", class: "All", room: "Playground" },
      Saturday: { subject: "Hindi", class: "9A", room: "Room 18" }
    },
    {
      time: "11:15 - 12:00",
      Monday: { subject: "Music", class: "All", room: "Music Room" },
      Tuesday: { subject: "Physical Education", class: "All", room: "Playground" },
      Wednesday: { subject: "Computer Science", class: "8A", room: "Computer Lab" },
      Thursday: { subject: "Games", class: "All", room: "Playground" },
      Friday: { subject: "Study Period", class: "9A", room: "Library" },
      Saturday: { subject: "Social Studies", class: "9A", room: "Room 10" }
    },
    {
      time: "12:00 - 12:45",
      Monday: { subject: "Library Period", class: "7B", room: "Library" },
      Tuesday: { subject: "Study Hall", class: "7B", room: "Library" },
      Wednesday: { subject: "Assembly", class: "All", room: "Hall" },
      Thursday: { subject: "Free Period", class: "", room: "" },
      Friday: { subject: "Science", class: "9A", room: "Lab 1" },
      Saturday: { subject: "Mathematics", class: "8A", room: "Room 12" }
    },
    {
      time: "12:45 - 13:30",
      Monday: { subject: "Lunch Break", class: "", room: "" },
      Tuesday: { subject: "Lunch Break", class: "", room: "" },
      Wednesday: { subject: "Lunch Break", class: "", room: "" },
      Thursday: { subject: "Lunch Break", class: "", room: "" },
      Friday: { subject: "Lunch Break", class: "", room: "" },
      Saturday: { subject: "Lunch Break", class: "", room: "" }
    }
  ];

  const [timetable, setTimetable] = useState(initialTimetable);
  const [editing, setEditing] = useState({ timeSlot: null, day: null });
  const [subjectInput, setSubjectInput] = useState("");
  const [classInput, setClassInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", room: "", color: "" });

  const allSubjects = Object.keys(subjectColors).filter(subject => subject !== "Default");

  const handleCellClick = (timeSlot, day) => {
    setEditing({ timeSlot, day });
    const cell = timetable.find(slot => slot.time === timeSlot)?.[day];
    setSubjectInput(cell?.subject || "");
    setClassInput(cell?.class || "");
    setRoomInput(cell?.room || "");
    setInProgress(cell?.inProgress || false);
  };

  const handleSave = () => {
    if (!subjectInput.trim()) return;
    setTimetable(prev =>
      prev.map(slot =>
        slot.time === editing.timeSlot
          ? {
              ...slot,
              [editing.day]: {
                subject: subjectInput,
                class: classInput,
                room: roomInput,
                inProgress
              }
            }
          : slot
      )
    );
    setEditing({ timeSlot: null, day: null });
    setSubjectInput("");
    setClassInput("");
    setRoomInput("");
    setInProgress(false);
  };

  const handleRemove = () => {
    setTimetable(prev =>
      prev.map(slot =>
        slot.time === editing.timeSlot
          ? { ...slot, [editing.day]: { subject: "", class: "", room: "" } }
          : slot
      )
    );
    setEditing({ timeSlot: null, day: null });
  };

  const handleExportPDF = () => {
    setExporting(true);
    
    try {
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 10;
      const tableWidth = pageWidth - (margin * 2);
      const colWidth = tableWidth / (days.length + 1);
      let yPosition = margin;

      // Add header with background
      doc.setFillColor(30, 41, 59); // Slate-900
      doc.rect(0, 0, pageWidth, 25, 'F');
      
      // Title
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      doc.text("Shiksha Sahayak", pageWidth / 2, 15, { align: "center" });
      
      // Subtitle
      doc.setFontSize(10);
      doc.setTextColor(200, 200, 200);
      doc.text("Weekly Timetable", pageWidth / 2, 22, { align: "center" });

      yPosition = 35;

      // Draw table header
      doc.setFillColor(79, 70, 229); // Indigo-600
      doc.rect(margin, yPosition, tableWidth, 8, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      
      doc.text("Time", margin + (colWidth / 2), yPosition + 5, { align: "center" });
      
      days.forEach((day, index) => {
        const x = margin + colWidth + (index * colWidth);
        doc.text(day, x + (colWidth / 2), yPosition + 5, { align: "center" });
      });

      yPosition += 8;

      // Draw table rows
      timetable.forEach((slot, rowIndex) => {
        if (rowIndex % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, yPosition, tableWidth, 15, 'F');
        }

        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.1);
        
        // Time cell
        doc.rect(margin, yPosition, colWidth, 15);
        doc.setTextColor(79, 70, 229); // Indigo-600
        doc.setFont(undefined, 'bold');
        doc.setFontSize(8);
        doc.text(slot.time, margin + (colWidth / 2), yPosition + 8, { align: "center" });

        // Day cells
        days.forEach((day, dayIndex) => {
          const x = margin + colWidth + (dayIndex * colWidth);
          doc.rect(x, yPosition, colWidth, 15);
          
          const cell = slot[day];
          if (cell?.subject) {
            doc.setTextColor(30, 41, 59); // Slate-800
            doc.setFont(undefined, 'normal');
            let textY = yPosition + 4;
            
            doc.setFontSize(7);
            const subjectLines = doc.splitTextToSize(cell.subject, colWidth - 4);
            subjectLines.forEach(line => {
              doc.text(line, x + (colWidth / 2), textY, { align: "center" });
              textY += 3;
            });
            
            if (cell.class || cell.room) {
              const details = [];
              if (cell.class) details.push(cell.class);
              if (cell.room) details.push(cell.room);
              
              doc.setFontSize(6);
              const detailsText = details.join(' - ');
              const detailsLines = doc.splitTextToSize(detailsText, colWidth - 4);
              detailsLines.forEach(line => {
                doc.text(line, x + (colWidth / 2), textY, { align: "center" });
                textY += 2.5;
              });
            }
          } else {
            doc.setTextColor(148, 163, 184); // Slate-400
            doc.setFontSize(7);
            doc.text("Free", x + (colWidth / 2), yPosition + 8, { align: "center" });
          }
        });

        yPosition += 15;

        // Pagination
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = margin;
          doc.setFillColor(79, 70, 229);
          doc.rect(margin, yPosition, tableWidth, 8, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(9);
          doc.setFont(undefined, 'bold');
          doc.text("Time", margin + (colWidth / 2), yPosition + 5, { align: "center" });
          days.forEach((day, index) => {
            const x = margin + colWidth + (index * colWidth);
            doc.text(day, x + (colWidth / 2), yPosition + 5, { align: "center" });
          });
          yPosition += 8;
        }
      });

      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: "center" });

      doc.save("Shiksha_Sahayak_Timetable.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const getSubjectColor = (subject) => {
    if (!subject) return "bg-white text-slate-400 border border-slate-100 border-dashed hover:bg-slate-50";
    return subjectColors[subject] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <DashboardHeader title="Timetable" />

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 🔷 Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Timetable Management</h1>
            <p className="text-slate-500 mt-1">Manage and export your professional weekly schedule</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              <Plus size={18} /> New Subject
            </button>
            <button 
              onClick={handleExportPDF}
              disabled={exporting}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-wait"
            >
              {exporting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Download size={18} />
              )}
              {exporting ? 'Exporting...' : 'Export PDF'}
            </button>
          </div>
        </div>

        {/* 🔷 Main Timetable Grid */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-8 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar pb-4">
            <table className="min-w-full border-separate border-spacing-3">
              <thead>
                <tr>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-left bg-slate-50 rounded-2xl w-32">
                    Time
                  </th>
                  {days.map(day => (
                    <th key={day} className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center bg-slate-50 rounded-2xl min-w-[140px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable.map((slot) => (
                  <tr key={slot.time}>
                    
                    {/* Time Column */}
                    <td className="p-4 font-bold text-indigo-600 text-sm bg-indigo-50/30 rounded-2xl whitespace-nowrap border border-indigo-50">
                      <div className="flex items-center gap-2"><Clock size={14}/> {slot.time}</div>
                    </td>

                    {/* Day Columns */}
                    {days.map(day => {
                      const cell = slot[day];
                      const styling = getSubjectColor(cell?.subject);
                      
                      return (
                        <td
                          key={day}
                          onClick={() => handleCellClick(slot.time, day)}
                          className={`relative p-3 min-h-[90px] cursor-pointer rounded-2xl transition-all duration-300 border hover:shadow-md hover:scale-[1.02] hover:z-10 group ${styling}`}
                        >
                          {cell?.subject ? (
                            <div className="flex flex-col items-center text-center h-full justify-center space-y-1.5">
                              <span className="font-extrabold text-sm leading-tight">
                                {cell.subject}
                              </span>
                              
                              <div className="flex items-center gap-2 text-[10px] font-bold opacity-80">
                                {cell.class && <span className="flex items-center gap-0.5"><Users size={10}/>{cell.class}</span>}
                                {cell.room && <span className="flex items-center gap-0.5"><MapPin size={10}/>{cell.room}</span>}
                              </div>

                              {cell.inProgress && (
                                <span className="mt-1 text-[9px] px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold uppercase tracking-wider">
                                  In Progress
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full opacity-0 group-hover:opacity-100 transition-opacity">
                              <Plus size={20} className="text-slate-400"/>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🔷 Subject Legend */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
            <CalendarIcon size={14}/> Subject Color Legend
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(subjectColors).map(([subject, color]) => (
              <div
                key={subject}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold text-xs ${color}`}
              >
                <div className="w-2 h-2 rounded-full bg-current opacity-50"></div>
                {subject}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* MODAL: EDIT PERIOD */}
      {/* ========================================================= */}
      {editing.timeSlot !== null && editing.day !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-lg font-black text-slate-900">Edit Period</h3>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mt-1">{editing.day} • {editing.timeSlot}</p>
              </div>
              <button onClick={() => setEditing({ timeSlot: null, day: null })} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"><X size={20}/></button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subject</label>
                <select
                  value={subjectInput}
                  onChange={e => setSubjectInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 bg-slate-50"
                >
                  <option value="">Select Subject (Or Clear)</option>
                  <option value="Break">Break</option>
                  <option value="Lunch Break">Lunch Break</option>
                  <option value="Free Period">Free Period</option>
                  {allSubjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                </select>
              </div>

              {subjectInput && !["Break", "Lunch Break", "Free Period", "Half Day"].includes(subjectInput) && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Class</label>
                      <input
                        type="text" placeholder="e.g. 7A" value={classInput} onChange={e => setClassInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-700 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Room / Lab</label>
                      <input
                        type="text" placeholder="e.g. Lab 2" value={roomInput} onChange={e => setRoomInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-700 bg-slate-50"
                      />
                    </div>
                  </div>
                  
                  <label className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl bg-slate-50 cursor-pointer">
                    <input type="checkbox" checked={inProgress} onChange={e => setInProgress(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                    <span className="text-sm font-bold text-slate-700">Mark as "In Progress"</span>
                  </label>
                </>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
              {timetable.find(slot => slot.time === editing.timeSlot)?.[editing.day]?.subject && (
                <button onClick={handleRemove} className="px-6 py-3 text-rose-600 font-bold hover:bg-rose-50 rounded-xl transition-all border border-rose-100">Clear</button>
              )}
              <div className="flex-1"></div>
              <button onClick={() => setEditing({ timeSlot: null, day: null })} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-all">Cancel</button>
              <button onClick={handleSave} disabled={!subjectInput.trim()} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-sm transition-all disabled:opacity-50">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD NEW SUBJECT */}
      {/* ========================================================= */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-lg font-black text-slate-900">New Subject</h3>
                <p className="text-xs font-bold text-slate-500 mt-1">Add a custom subject to your roster</p>
              </div>
              <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"><X size={20}/></button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subject Name</label>
                <input
                  type="text" placeholder="e.g. Robotics" value={newSubject.name} onChange={e => setNewSubject(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 bg-slate-50"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Color Theme</label>
                <select
                  value={newSubject.color}
                  onChange={e => setNewSubject(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 bg-slate-50"
                >
                  <option value="">Select Color</option>
                  <option value="bg-blue-50 text-blue-700 border-blue-100">Blue</option>
                  <option value="bg-emerald-50 text-emerald-700 border-emerald-100">Green</option>
                  <option value="bg-purple-50 text-purple-700 border-purple-100">Purple</option>
                  <option value="bg-amber-50 text-amber-700 border-amber-100">Yellow</option>
                  <option value="bg-pink-50 text-pink-700 border-pink-100">Pink</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setShowAddForm(false)} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-all">Cancel</button>
              <button 
                onClick={() => {
                  if (!newSubject.name.trim()) return;
                  subjectColors[newSubject.name] = newSubject.color || "bg-slate-100 text-slate-700 border-slate-200";
                  setNewSubject({ name: "", room: "", color: "" });
                  setShowAddForm(false);
                }}
                disabled={!newSubject.name.trim()}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <Plus size={18}/> Add Subject
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Timetable;