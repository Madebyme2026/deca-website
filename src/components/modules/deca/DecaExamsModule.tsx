import React, { useState } from 'react';
import { useSimulationStore } from '../../../store/simulationStore';
import { Award, CheckCircle2, XCircle, Clock, BookOpen, ChevronRight, RotateCcw, Filter, Target, Sparkles } from 'lucide-react';

export const DecaExamsModule: React.FC = () => {
  const { examQuestions } = useSimulationStore();

  const [selectedCluster, setSelectedCluster] = useState<string>('ALL');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter questions based on cluster selection
  const filteredQuestions = examQuestions.filter((q) => {
    if (selectedCluster === 'ALL') return true;
    return q.decaCluster === selectedCluster;
  });

  const activeQuestion = filteredQuestions[currentIdx] || filteredQuestions[0];

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optIdx });
  };

  const handleClusterChange = (cluster: string) => {
    setSelectedCluster(cluster);
    setCurrentIdx(0);
  };

  const handleResetExam = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / filteredQuestions.length) * 100);
  };

  const answeredCount = filteredQuestions.filter((q) => selectedAnswers[q.id] !== undefined).length;

  const clustersList = ['ALL', 'Financial Analysis', 'Economic Principles', 'Corporate Finance', 'Accounting & Governance', 'Investments & Risk', 'Business Law & Ethics'];

  return (
    <div className="flex flex-col gap-4 text-[#fafafa] font-mono">
      {/* Banner */}
      <div className="bg-[#18181b] border border-[#27272a] p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white uppercase tracking-wider">
                DECA Cluster Exam Arena (Finance & Economics)
              </h1>
              <span className="bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/40 px-2 py-0.5 text-[10px] font-bold uppercase">
                {filteredQuestions.length} Questions Bank
              </span>
            </div>
            <p className="text-xs text-[#71717a]">
              Timed Standardized Exam Arena aligned with Official DECA Performance Indicators & PIs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono bg-[#09090b] border border-[#27272a] px-3 py-1.5 text-[#eab308] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Answered: {answeredCount}/{filteredQuestions.length}</span>
          </span>

          {isSubmitted ? (
            <div className="flex items-center gap-2">
              <div
                className={`font-bold px-3 py-1.5 text-xs uppercase border ${
                  calculateScore() >= 70
                    ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]'
                    : 'bg-[#f43f5e]/20 text-[#f43f5e] border-[#f43f5e]'
                }`}
              >
                Score: {calculateScore()}% {calculateScore() >= 70 ? '(DECA QUALIFIED)' : '(NEEDS REVIEW)'}
              </div>
              <button
                onClick={handleResetExam}
                className="bg-[#27272a] hover:bg-[#3f3f46] text-white px-3 py-1.5 text-xs font-bold uppercase transition-colors flex items-center gap-1 cursor-pointer"
                title="Retake Exam"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSubmitted(true)}
                disabled={answeredCount === 0}
                className="bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] font-bold px-4 py-1.5 text-xs uppercase cursor-pointer disabled:opacity-50"
              >
                Submit Exam
              </button>
              {answeredCount > 0 && (
                <button
                  onClick={handleResetExam}
                  className="bg-[#27272a] hover:bg-[#3f3f46] text-[#71717a] hover:text-white px-2.5 py-1.5 text-xs cursor-pointer"
                  title="Clear Answers"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cluster Category Filter Pills */}
      <div className="bg-[#18181b] border border-[#27272a] p-3 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs text-[#71717a] font-bold uppercase flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span>DECA Cluster:</span>
        </span>
        {clustersList.map((cluster) => (
          <button
            key={cluster}
            onClick={() => handleClusterChange(cluster)}
            className={`px-3 py-1 text-[11px] font-bold uppercase border transition-colors cursor-pointer shrink-0 ${
              selectedCluster === cluster
                ? 'bg-[#eab308] text-[#09090b] border-[#eab308]'
                : 'bg-[#09090b] text-[#71717a] border-[#27272a] hover:border-[#71717a] hover:text-white'
            }`}
          >
            {cluster === 'ALL' ? `ALL CLUSTERS (${examQuestions.length})` : cluster}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Question Navigator Panel */}
        <div className="col-span-12 md:col-span-3 bg-[#18181b] border border-[#27272a] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[#27272a] pb-2">
              <h2 className="text-xs font-bold text-[#71717a] uppercase tracking-wider">
                Question Index
              </h2>
              <span className="text-[10px] text-[#eab308] font-bold">
                {currentIdx + 1} / {filteredQuestions.length}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
              {filteredQuestions.map((qItem, idx) => {
                const isAnswered = selectedAnswers[qItem.id] !== undefined;
                const isCurrent = currentIdx === idx;
                const isCorrect = isSubmitted && selectedAnswers[qItem.id] === qItem.correctIndex;

                return (
                  <button
                    key={qItem.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`p-2 text-xs font-bold font-mono border transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#eab308] text-[#09090b] border-[#eab308]'
                        : isSubmitted
                        ? isCorrect
                          ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]'
                          : 'bg-[#f43f5e]/20 text-[#f43f5e] border-[#f43f5e]'
                        : isAnswered
                        ? 'bg-[#27272a] text-white border-[#3f3f46]'
                        : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exam Summary Box */}
          <div className="mt-4 pt-3 border-t border-[#27272a] text-[10px] space-y-1 text-[#71717a]">
            <div className="flex justify-between">
              <span>Total Questions:</span>
              <span className="text-white font-bold">{filteredQuestions.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Answered:</span>
              <span className="text-[#eab308] font-bold">{answeredCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining:</span>
              <span className="text-white font-bold">{filteredQuestions.length - answeredCount}</span>
            </div>
          </div>
        </div>

        {/* Question Display Card */}
        {activeQuestion ? (
          <div className="col-span-12 md:col-span-9 bg-[#18181b] border border-[#27272a] p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-[#27272a] pb-2">
                <span className="text-xs font-bold text-[#eab308] uppercase">
                  QUESTION #{currentIdx + 1} OF {filteredQuestions.length}
                </span>
                <span className="text-[10px] text-[#eab308] bg-[#09090b] px-2.5 py-0.5 border border-[#eab308]/30 font-bold uppercase">
                  CLUSTER: {activeQuestion.decaCluster}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-5 leading-relaxed font-mono">
                {activeQuestion.question}
              </h3>

              {/* Answer Options */}
              <div className="space-y-2.5 mb-6">
                {activeQuestion.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[activeQuestion.id] === optIdx;
                  const isCorrectOption = activeQuestion.correctIndex === optIdx;

                  let optStyle = 'bg-[#09090b] border-[#27272a] text-[#fafafa] hover:border-[#eab308]';

                  if (isSelected) {
                    optStyle = 'bg-[#eab308]/20 border-[#eab308] text-white font-bold';
                  }

                  if (isSubmitted) {
                    if (isCorrectOption) {
                      optStyle = 'bg-[#10b981]/20 border-[#10b981] text-[#10b981] font-bold';
                    } else if (isSelected) {
                      optStyle = 'bg-[#f43f5e]/20 border-[#f43f5e] text-[#f43f5e]';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(activeQuestion.id, optIdx)}
                      className={`w-full text-left p-3.5 text-xs border font-mono transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                    >
                      <span className="leading-normal">
                        <strong className="mr-2 text-[#eab308]">{String.fromCharCode(65 + optIdx)}.</strong> {opt}
                      </span>
                      {isSubmitted && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 ml-2" />}
                      {isSubmitted && isSelected && !isCorrectOption && <XCircle className="w-4 h-4 text-[#f43f5e] shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box when Submitted */}
              {isSubmitted && (
                <div className="bg-[#09090b] border border-[#eab308]/40 p-4 font-mono text-xs mb-4">
                  <div className="text-[10px] text-[#eab308] font-bold uppercase mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>DECA Performance Indicator Explanation:</span>
                  </div>
                  <div className="text-[#d4d4d8] mb-2 leading-relaxed">{activeQuestion.explanation}</div>
                  <div className="text-[10px] text-[#71717a] bg-[#18181b] p-1.5 border border-[#27272a]">
                    <strong className="text-white">Performance Indicator:</strong> {activeQuestion.performanceIndicator}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center border-t border-[#27272a] pt-4">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="bg-[#27272a] hover:bg-[#3f3f46] text-white px-4 py-2 text-xs font-bold disabled:opacity-40 cursor-pointer"
              >
                ← Previous Question
              </button>
              <button
                disabled={currentIdx === filteredQuestions.length - 1}
                onClick={() => setCurrentIdx(currentIdx + 1)}
                className="bg-[#eab308] hover:bg-[#ca8a04] text-[#09090b] px-4 py-2 text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="col-span-12 md:col-span-9 bg-[#18181b] border border-[#27272a] p-10 text-center text-[#71717a]">
            No questions found for cluster "{selectedCluster}".
          </div>
        )}
      </div>
    </div>
  );
};

