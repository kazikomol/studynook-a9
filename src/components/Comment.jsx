import React from "react";
import {  FaUserGraduate, FaLightbulb } from "react-icons/fa";

const Comment = () => {
  const comments= [
    {
      quote:
        "StudyNook help me booking my room for my team studies about our project",
      author: "Asif Rahman",
      role: "CS UG Student",
      icon: <FaUserGraduate className="w-5 h-5" />,
    },
    {
      quote:
        "I just earn from my unused space .it is unbelievable",
      author: "Nahid ",
      role: "Study Room Owner",
      icon: <FaLightbulb className="w-5 h-5" />,
    },
  ];

  return (
    <section className="container mx-auto px-2  pb-12">
        <h2 className="text-4xl text-center font-bold text-italic m-4 ">Comment about our system</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {comments.map((comments, i) => (
          <div
            key={i}
            className="group relative p-8 md:p-10 bg-default rounded-[2rem] border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              
              <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200 mb-8 leading-relaxed">
                {comments.quote};
              </p>
            </div>

            <div className="flex items-center gap-4 border-t border-slate-200/60 dark:border-slate-800 pt-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {comments.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {comments.author}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {comments.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comment;