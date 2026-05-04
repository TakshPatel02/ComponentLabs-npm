import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_TASKS = [
  { id: "1", column: "backlog", tag: "SYSTEM", title: "Optimize oklab border rendering for high-density displays" },
  { id: "2", column: "backlog", tag: "CORE", title: "Refine jjannon swash alternates in editorial blocks" },
  { id: "3", column: "backlog", tag: "VISUAL", title: "Audit atmospheric shadow bleed on modal transitions" },
  { id: "4", column: "todo", tag: "LOGIC", title: "Implement staggered motion primitives for list entry" },
  { id: "5", column: "todo", tag: "DB", title: "Normalize schema for collaborative real-time editing" },
  { id: "6", column: "in-progress", tag: "PERF", title: "Calibrate layout engine for oklab-consistent depth" },
  { id: "7", column: "in-progress", tag: "DEVEX", title: "Inject visual tokens into downstream build pipeline" },
  { id: "8", column: "in-progress", tag: "UI", title: "Draft secondary pill variations for metadata tags" },
  { id: "9", column: "complete", tag: "SHIPPED", title: "Configure tailwind oklab color primitives" },
  { id: "10", column: "complete", tag: "SHIPPED", title: "Establish 8px grid baseline spacing rhythm" },
];

const COLUMNS = [
  { id: 'backlog', title: 'BACKLOG', canAdd: true },
  { id: 'todo', title: 'TODO' },
  { id: 'in-progress', title: 'IN PROGRESS' },
  { id: 'complete', title: 'COMPLETE' },
  { id: 'trash', title: 'CLEAN UP', isTrash: true }
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    // Slight delay to prevent the dragged ghost image from disappearing
    setTimeout(() => {
      // We can add a class here if needed to style the original card while dragging
    }, 0);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setActiveColumnId(columnId);
  };

  const handleDragLeave = () => {
    setActiveColumnId(null);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    setActiveColumnId(null);
    
    if (!draggedTaskId) return;

    if (targetColumnId === 'trash') {
      setTasks(tasks.filter(t => t.id !== draggedTaskId));
    } else {
      setTasks(tasks.map(t => 
        t.id === draggedTaskId ? { ...t, column: targetColumnId } : t
      ));
    }
    setDraggedTaskId(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setActiveColumnId(null);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) {
      setIsAdding(false);
      return;
    }
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      column: "backlog",
      tag: "DRAFT",
      title: newTaskText.trim()
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText("");
    setIsAdding(false);
  };

  return (
    <div className="w-full bg-surface-container/60 min-h-[600px] p-4 sm:p-6 md:p-10 rounded-xl oklab-border flex flex-col font-ui-body transition-colors">
      
      {/* Kanban Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 oklab-border border-b gap-4">
        <h2 className="font-section-heading text-xl md:text-2xl tracking-tight text-primary">
          ENGINEERED<span className="font-normal opacity-60">KANBAN</span>
        </h2>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-system-micro tracking-widest uppercase text-on-surface-variant/60">
          <span className="text-primary border-b border-primary pb-1">Board</span>
          <span className="hover:text-primary cursor-pointer pb-1 transition-colors">Team</span>
          <span className="hover:text-primary cursor-pointer pb-1 transition-colors">Analytics</span>
          <span className="hover:text-primary cursor-pointer pb-1 transition-colors">Archive</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-[16px]">notifications</span>
          </div>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex flex-1 gap-4 overflow-x-auto no-scrollbar pb-4">
        {COLUMNS.map(col => {
          const colTasks = tasks.filter(t => t.column === col.id);
          const isTrash = col.isTrash;
          
          return (
            <div 
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`flex-1 min-w-[280px] max-w-[320px] flex flex-col transition-colors duration-200 ${
                activeColumnId === col.id ? 'bg-black/5 rounded-xl' : ''
              }`}
            >
              <div className="flex justify-between items-center px-2 mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-system-micro text-[12px] tracking-widest font-bold text-primary">
                    {col.title}
                  </h3>
                  {!isTrash && (
                    <span className="bg-on-surface/10 text-on-surface-variant font-mono text-[10px] px-2 py-0.5 rounded-full">
                      {String(colTasks.length).padStart(2, '0')}
                    </span>
                  )}
                </div>
                {col.canAdd && (
                  <button 
                    onClick={() => setIsAdding(true)}
                    className="text-on-surface-variant/40 hover:text-primary transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                )}
                {!col.canAdd && !isTrash && (
                  <span className="text-[#888]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-3 px-2">
                {col.canAdd && isAdding && (
                  <form onSubmit={handleAddTask} className="mb-2">
                    <input
                      type="text"
                      autoFocus
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      onBlur={() => {
                        if(!newTaskText.trim()) setIsAdding(false);
                      }}
                      placeholder="Enter task description..."
                      className="w-full bg-surface oklab-border rounded-lg p-4 font-editorial-standard text-[16px] outline-none focus:border-on-surface-variant/40 shadow-sm text-primary"
                    />
                  </form>
                )}

                {!isTrash ? (
                  <AnimatePresence>
                    {colTasks.map(task => (
                      <motion.div
                        layout
                        layoutId={task.id}
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onDragEnd={handleDragEnd}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className={`bg-surface rounded-[10px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] oklab-border cursor-grab active:cursor-grabbing hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all ${
                          draggedTaskId === task.id ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className={`font-system-micro text-[10px] tracking-widest uppercase ${
                            task.column === 'complete' ? 'text-emerald-500/70' : 'text-on-surface-variant/50'
                          }`}>
                            {task.tag}
                          </span>
                          {task.column === 'complete' ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-500/70" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                          ) : (
                            <span className="text-on-surface-variant/30">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                            </span>
                          )}
                        </div>
                        <p className={`font-editorial-standard text-[16px] leading-relaxed ${
                          task.column === 'complete' ? 'text-on-surface-variant/40 line-through decoration-on-surface-variant/20' : 'text-primary/90'
                        }`}>
                          {task.title}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className={`h-[300px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-colors ${
                    activeColumnId === col.id ? 'border-on-surface-variant/40 bg-on-surface/5' : 'border-on-surface-variant/20'
                  }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={activeColumnId === col.id ? 'text-primary/60' : 'text-on-surface-variant/30'} strokeWidth="1.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    <span className="font-system-micro text-[10px] tracking-widest uppercase text-on-surface-variant/40">
                      Trash Drop Zone
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
