import React, { useState, useRef } from 'react';
import DashboardHeader from "../components/DashboardHeader";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
    BookOpen, Layers, Clock, CheckSquare, Settings, Sparkles,
    Download, Printer, Save, FileText, ChevronDown, ListChecks, HelpCircle
} from "lucide-react";

const TestGenerator = () => {
    // 🔷 UI States
    const [isGenerating, setIsGenerating] = useState(false);
    const [paperGenerated, setPaperGenerated] = useState(false);

    // Form States
    const [config, setConfig] = useState({
        classId: '10A',
        subject: 'Science',
        totalMarks: 50,
        duration: 90, // minutes
        difficulty: 'Medium',
    });

    const [questionTypes, setQuestionTypes] = useState({
        mcq: true,
        shortAnswer: true,
        longAnswer: false,
        trueFalse: false
    });

    // Mock Chapters (Interactive Tags)
    const [chapters, setChapters] = useState([
        { id: 1, name: "Chemical Reactions", selected: true },
        { id: 2, name: "Acids, Bases and Salts", selected: true },
        { id: 3, name: "Metals and Non-Metals", selected: false },
        { id: 4, name: "Carbon Compounds", selected: false },
    ]);

    const toggleChapter = (id) => {
        setChapters(chapters.map(c => c.id === id ? { ...c, selected: !c.selected } : c));
    };

    const handleToggleType = (type) => {
        setQuestionTypes(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setPaperGenerated(false);

        // Simulate AI Generation Delay
        setTimeout(() => {
            setIsGenerating(false);
            setPaperGenerated(true);
        }, 2500);
    };

    // Create a reference to the paper element
    const paperRef = useRef(null);

    // The function that actually generates the PDF
    const handleDownloadPDF = async () => {
        const element = paperRef.current;
        if (!element) return;

        try {
            // 1. Take a high-quality screenshot of the paper area
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');

            // 2. Calculate dimensions for A4 size paper
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // 3. Add the image to the PDF and download it
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${config.subject}_Test_Paper_${config.classId}.pdf`);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF.");
        }


    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-12">
            <DashboardHeader title="Test Generator" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* 🔷 Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                            AI Test Generator
                        </h1>
                        <p className="text-slate-500 mt-1">Configure your parameters and let AI draft the perfect assessment.</p>
                    </div>

                    {paperGenerated && (
                        <div className="flex gap-3 w-full md:w-auto animate-in fade-in duration-300">
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
                                <Printer size={18} /> Print
                            </button>
                            <button
                                onClick={handleDownloadPDF} // <-- ADD THIS
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm">
                                <Download size={18} /> Download PDF
                            </button>
                        </div>
                    )}
                </div>

                {/* 🔷 Main Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* ========================================== */}
                    {/* LEFT COLUMN: CONFIGURATION PANEL (5 cols) */}
                    {/* ========================================== */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* 1. Basic Details */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                                <Settings size={18} className="text-indigo-600" /> Basic Details
                            </h2>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Class</label>
                                    <select
                                        value={config.classId}
                                        onChange={e => setConfig({ ...config, classId: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-700"
                                    >
                                        <option value="8A">Grade 8A</option>
                                        <option value="9B">Grade 9B</option>
                                        <option value="10A">Grade 10A</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                                    <select
                                        value={config.subject}
                                        onChange={e => setConfig({ ...config, subject: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-700"
                                    >
                                        <option>Science</option>
                                        <option>Mathematics</option>
                                        <option>English</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <CheckSquare size={14} /> Total Marks
                                    </label>
                                    <input
                                        type="number"
                                        value={config.totalMarks}
                                        onChange={e => setConfig({ ...config, totalMarks: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <Clock size={14} /> Duration (Mins)
                                    </label>
                                    <input
                                        type="number"
                                        value={config.duration}
                                        onChange={e => setConfig({ ...config, duration: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Syllabus & Topics */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                                <BookOpen size={18} className="text-indigo-600" /> Chapters / Topics
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {chapters.map(chapter => (
                                    <button
                                        key={chapter.id}
                                        onClick={() => toggleChapter(chapter.id)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${chapter.selected
                                                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                                                : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
                                            }`}
                                    >
                                        {chapter.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Question Configuration */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <Layers size={18} className="text-indigo-600" /> Question Types
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${questionTypes.mcq ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                                    <input type="checkbox" checked={questionTypes.mcq} onChange={() => handleToggleType('mcq')} className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                                    <span className="text-sm font-bold text-slate-700">MCQs</span>
                                </label>
                                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${questionTypes.shortAnswer ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                                    <input type="checkbox" checked={questionTypes.shortAnswer} onChange={() => handleToggleType('shortAnswer')} className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                                    <span className="text-sm font-bold text-slate-700">Short Answer</span>
                                </label>
                                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${questionTypes.longAnswer ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                                    <input type="checkbox" checked={questionTypes.longAnswer} onChange={() => handleToggleType('longAnswer')} className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                                    <span className="text-sm font-bold text-slate-700">Long Answer</span>
                                </label>
                                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${questionTypes.trueFalse ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                                    <input type="checkbox" checked={questionTypes.trueFalse} onChange={() => handleToggleType('trueFalse')} className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                                    <span className="text-sm font-bold text-slate-700">True / False</span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Overall Difficulty</label>
                                <div className="flex bg-slate-100 p-1 rounded-xl">
                                    {['Easy', 'Medium', 'Hard'].map(level => (
                                        <button
                                            key={level}
                                            onClick={() => setConfig({ ...config, difficulty: level })}
                                            className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-all ${config.difficulty === level ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* GENERATE BUTTON */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`w-full py-4 rounded-2xl font-extrabold text-lg shadow-md transition-all flex items-center justify-center gap-3 ${isGenerating
                                    ? 'bg-slate-200 text-slate-500 cursor-wait'
                                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:scale-[1.02]'
                                }`}
                        >
                            {isGenerating ? (
                                <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-500"></div> Generating Magic...</>
                            ) : (
                                <><Sparkles size={22} /> Generate Test Paper</>
                            )}
                        </button>

                    </div>

                    {/* ========================================== */}
                    {/* RIGHT COLUMN: LIVE PREVIEW (7 cols)        */}
                    {/* ========================================== */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 ml-2">Live Preview</h2>

                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 min-h-[700px] overflow-hidden flex flex-col relative">

                                {/* Empty State */}
                                {!isGenerating && !paperGenerated && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 p-8 text-center">
                                        <FileText size={64} className="mb-4 text-slate-200" />
                                        <h3 className="text-xl font-bold text-slate-600 mb-2">Paper Preview</h3>
                                        <p className="max-w-xs">Configure your test settings on the left and click Generate to see the magic happen.</p>
                                    </div>
                                )}

                                {/* Loading State */}
                                {isGenerating && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
                                        <Sparkles size={48} className="text-indigo-400 animate-pulse mb-6" />
                                        <h3 className="text-xl font-bold text-slate-800 tracking-wider animate-pulse">CURATING QUESTIONS...</h3>
                                        <p className="text-sm text-slate-500 mt-2">Matching syllabus and difficulty levels</p>

                                        {/* Simulated loading bar */}
                                        <div className="w-64 h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden">
                                            <div className="h-full bg-indigo-600 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
                                        </div>
                                    </div>
                                )}

                                {/* The Paper Component */}
                                {paperGenerated && (
                                    <div ref={paperRef} 
                                    className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 h-[700px] overflow-y-auto custom-scrollbar">

                                        {/* Paper Header */}
                                        <div className="border-b-2 border-slate-800 pb-6 mb-8 text-center">
                                            <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2 uppercase">Shiksha Sahayak </h1>
                                            <h2 className="text-lg font-serif font-semibold text-slate-700 mb-4">Unit Test - {config.subject}</h2>

                                            <div className="flex justify-between items-end text-sm font-semibold text-slate-600">
                                                <div className="text-left">
                                                    <p>Class: {config.classId}</p>
                                                    <p>Date: ____________</p>
                                                </div>
                                                <div className="text-right">
                                                    <p>Max Marks: {config.totalMarks}</p>
                                                    <p>Time: {config.duration} Mins</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* General Instructions */}
                                        <div className="mb-8">
                                            <p className="text-sm font-bold underline mb-2">General Instructions:</p>
                                            <ul className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                                                <li>All questions are compulsory.</li>
                                                <li>The question paper consists of two sections: Section A (MCQs) and Section B (Short Answer).</li>
                                                <li>Read questions carefully before answering.</li>
                                            </ul>
                                        </div>

                                        {/* Section A: MCQs */}
                                        {questionTypes.mcq && (
                                            <div className="mb-8">
                                                <h3 className="font-bold text-lg border-b border-slate-200 pb-2 mb-4">SECTION A: Multiple Choice Questions <span className="float-right text-sm font-normal text-slate-500">(10 Marks)</span></h3>

                                                <div className="space-y-6">
                                                    <div>
                                                        <p className="font-semibold text-slate-800 mb-3"><span className="mr-2">1.</span> Which of the following is a physical change?</p>
                                                        <div className="grid grid-cols-2 gap-3 pl-5 text-slate-700 text-sm">
                                                            <p>(a) Rusting of iron</p>
                                                            <p>(b) Combustion of magnesium</p>
                                                            <p>(c) Melting of ice</p>
                                                            <p>(d) Burning of candle</p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-slate-800 mb-3"><span className="mr-2">2.</span> The chemical formula for sulfuric acid is:</p>
                                                        <div className="grid grid-cols-2 gap-3 pl-5 text-slate-700 text-sm">
                                                            <p>(a) HCl</p>
                                                            <p>(b) H₂SO₄</p>
                                                            <p>(c) HNO₃</p>
                                                            <p>(d) NaCl</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Section B: Short Answer */}
                                        {questionTypes.shortAnswer && (
                                            <div className="mb-8">
                                                <h3 className="font-bold text-lg border-b border-slate-200 pb-2 mb-4">SECTION B: Short Answer Questions <span className="float-right text-sm font-normal text-slate-500">(20 Marks)</span></h3>

                                                <div className="space-y-6">
                                                    <div className="flex justify-between items-start">
                                                        <p className="font-semibold text-slate-800"><span className="mr-2">3.</span> Explain the process of neutralization with an example.</p>
                                                        <span className="text-sm font-bold text-slate-500">[3]</span>
                                                    </div>

                                                    <div className="flex justify-between items-start">
                                                        <p className="font-semibold text-slate-800 max-w-xl"><span className="mr-2">4.</span> Why are metals good conductors of electricity? Briefly describe the electron sea model.</p>
                                                        <span className="text-sm font-bold text-slate-500">[4]</span>
                                                    </div>

                                                    <div className="flex justify-between items-start">
                                                        <p className="font-semibold text-slate-800 max-w-xl"><span className="mr-2">5.</span> State two differences between an exothermic and an endothermic reaction.</p>
                                                        <span className="text-sm font-bold text-slate-500">[2]</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-center text-slate-400 mt-16 font-serif italic">
                                            *** End of Paper ***
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Loading Animation Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes loading {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 50%; margin-left: 25%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}} />
        </div>
    );
};

export default TestGenerator;